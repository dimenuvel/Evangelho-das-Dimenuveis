import { DIMENUVEIS_SOUNDS, DimenuvelSound } from '../data/soundLabData';

export type DurationOption = null | 5 | 10 | 15 | 20 | 30 | 45 | 60;

export interface SoundLabState {
  isPlaying: boolean;
  activeDimenuvelId: number;
  volume: number; // 0 to 1
  durationMinutes: DurationOption;
  remainingSeconds: number | null; // null if continuous
}

type StateListener = (state: SoundLabState) => void;

class SoundLabAudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscLeft: OscillatorNode | null = null;
  private oscRight: OscillatorNode | null = null;
  private pannerLeft: StereoPannerNode | null = null;
  private pannerRight: StereoPannerNode | null = null;

  private isPlayingState: boolean = false;
  private activeDimenuvelIdState: number = 1; // Default Dimenúvel 1 (Silêncio - 64 Hz)
  private volumeState: number = 0.7; // Default 70%
  private durationMinutesState: DurationOption = null; // Default Continuous
  private remainingSecondsState: number | null = null;

  private timerInterval: any = null;
  private listeners: Set<StateListener> = new Set();
  private isTransitioningFrequency: boolean = false;

  constructor() {
    // Lazy audio context initialization on gesture
  }

  public getSnapshot(): SoundLabState {
    return {
      isPlaying: this.isPlayingState,
      activeDimenuvelId: this.activeDimenuvelIdState,
      volume: this.volumeState,
      durationMinutes: this.durationMinutesState,
      remainingSeconds: this.remainingSecondsState,
    };
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    // Call immediately with current state
    listener(this.getSnapshot());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const snapshot = this.getSnapshot();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  private initAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private getActiveDimenuvel(): DimenuvelSound {
    return (
      DIMENUVEIS_SOUNDS.find((d) => d.id === this.activeDimenuvelIdState) ||
      DIMENUVEIS_SOUNDS[0]
    );
  }

  public async play(): Promise<void> {
    if (this.isPlayingState && !this.isTransitioningFrequency) {
      return;
    }

    const ctx = this.initAudioContext();
    const now = ctx.currentTime;

    // Clean up any existing oscillators first
    this.stopOscillatorsImmediate();

    // Create Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, now); // Start at 0 for fade-in
    this.masterGain.connect(ctx.destination);

    const dimenuvel = this.getActiveDimenuvel();
    const baseFreq = dimenuvel.frequency;
    const binauralBeat = 3.0; // Slow 3 Hz binaural difference
    const leftFreq = Math.max(1, baseFreq - binauralBeat / 2);
    const rightFreq = baseFreq + binauralBeat / 2;

    // Create Left & Right Oscillators
    this.oscLeft = ctx.createOscillator();
    this.oscRight = ctx.createOscillator();

    this.oscLeft.type = 'sine';
    this.oscRight.type = 'sine';

    this.oscLeft.frequency.setValueAtTime(leftFreq, now);
    this.oscRight.frequency.setValueAtTime(rightFreq, now);

    // Create Stereo Panners
    if (typeof ctx.createStereoPanner === 'function') {
      this.pannerLeft = ctx.createStereoPanner();
      this.pannerRight = ctx.createStereoPanner();
      this.pannerLeft.pan.setValueAtTime(-1, now);
      this.pannerRight.pan.setValueAtTime(1, now);

      this.oscLeft.connect(this.pannerLeft);
      this.pannerLeft.connect(this.masterGain);

      this.oscRight.connect(this.pannerRight);
      this.pannerRight.connect(this.masterGain);
    } else {
      // Fallback if StereoPanner is unsupported (connect both to master gain)
      this.oscLeft.connect(this.masterGain);
      this.oscRight.connect(this.masterGain);
    }

    // Start Oscillators
    this.oscLeft.start(now);
    this.oscRight.start(now);

    // Smooth Fade-In (1.0 second ramp)
    const targetVolume = this.volumeState;
    this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + 1.0);

    this.isPlayingState = true;

    // Setup timer if duration is specified
    if (this.durationMinutesState !== null) {
      if (this.remainingSecondsState === null || this.remainingSecondsState <= 0) {
        this.remainingSecondsState = this.durationMinutesState * 60;
      }
      this.startTimer();
    } else {
      this.remainingSecondsState = null;
      this.clearTimer();
    }

    this.notify();
  }

  public async pause(): Promise<void> {
    if (!this.isPlayingState) return;

    this.clearTimer();

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      const currentGain = this.masterGain.gain.value;
      this.masterGain.gain.setValueAtTime(currentGain, now);
      // Smooth fade-out over 0.8 seconds before stopping
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

      setTimeout(() => {
        this.stopOscillatorsImmediate();
        this.isPlayingState = false;
        this.notify();
      }, 820);
    } else {
      this.stopOscillatorsImmediate();
      this.isPlayingState = false;
      this.notify();
    }
  }

  public async stop(): Promise<void> {
    this.clearTimer();
    this.remainingSecondsState = this.durationMinutesState !== null ? this.durationMinutesState * 60 : null;

    if (this.ctx && this.masterGain && this.isPlayingState) {
      const now = this.ctx.currentTime;
      const currentGain = this.masterGain.gain.value;
      this.masterGain.gain.setValueAtTime(currentGain, now);
      // Smooth fade-out over 1.0 second before stopping
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);

      setTimeout(() => {
        this.stopOscillatorsImmediate();
        this.isPlayingState = false;
        this.notify();
      }, 1020);
    } else {
      this.stopOscillatorsImmediate();
      this.isPlayingState = false;
      this.notify();
    }
  }

  public async selectDimenuvel(dimenuvelId: number): Promise<void> {
    if (this.activeDimenuvelIdState === dimenuvelId) return;

    this.activeDimenuvelIdState = dimenuvelId;

    if (this.isPlayingState) {
      this.isTransitioningFrequency = true;
      // 1. Soft fade-out current volume
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        const currentGain = this.masterGain.gain.value;
        this.masterGain.gain.setValueAtTime(currentGain, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);

        setTimeout(() => {
          if (this.ctx && this.isPlayingState) {
            const nextNow = this.ctx.currentTime;
            const dimenuvel = this.getActiveDimenuvel();
            const baseFreq = dimenuvel.frequency;
            const binauralBeat = 3.0;
            const leftFreq = Math.max(1, baseFreq - binauralBeat / 2);
            const rightFreq = baseFreq + binauralBeat / 2;

            if (this.oscLeft && this.oscRight) {
              this.oscLeft.frequency.setValueAtTime(leftFreq, nextNow);
              this.oscRight.frequency.setValueAtTime(rightFreq, nextNow);
            }

            // 2. Smooth fade-in back to target volume
            if (this.masterGain) {
              this.masterGain.gain.setValueAtTime(0.0001, nextNow);
              this.masterGain.gain.linearRampToValueAtTime(this.volumeState, nextNow + 0.5);
            }
          }
          this.isTransitioningFrequency = false;
          this.notify();
        }, 420);
      }
    } else {
      this.notify();
    }
  }

  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volumeState = clamped;

    if (this.ctx && this.masterGain && this.isPlayingState && !this.isTransitioningFrequency) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(clamped, now + 0.1);
    }
    this.notify();
  }

  public setDuration(duration: DurationOption): void {
    this.durationMinutesState = duration;
    if (duration !== null) {
      this.remainingSecondsState = duration * 60;
      if (this.isPlayingState) {
        this.startTimer();
      }
    } else {
      this.remainingSecondsState = null;
      this.clearTimer();
    }
    this.notify();
  }

  private startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.remainingSecondsState !== null && this.remainingSecondsState > 0) {
        this.remainingSecondsState -= 1;
        this.notify();

        if (this.remainingSecondsState <= 0) {
          // Duration reached zero -> Fade out and stop cleanly
          this.stop();
        }
      }
    }, 1000);
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private stopOscillatorsImmediate() {
    if (this.oscLeft) {
      try {
        this.oscLeft.stop();
        this.oscLeft.disconnect();
      } catch (e) {}
      this.oscLeft = null;
    }

    if (this.oscRight) {
      try {
        this.oscRight.stop();
        this.oscRight.disconnect();
      } catch (e) {}
      this.oscRight = null;
    }

    if (this.pannerLeft) {
      try {
        this.pannerLeft.disconnect();
      } catch (e) {}
      this.pannerLeft = null;
    }

    if (this.pannerRight) {
      try {
        this.pannerRight.disconnect();
      } catch (e) {}
      this.pannerRight = null;
    }

    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch (e) {}
      this.masterGain = null;
    }
  }
}

export const soundLabAudioService = new SoundLabAudioService();
