import { AppLanguage } from './i18n';
import { Giro, Practice, PracticeCategory } from '../types';
import { DimenuvelSound } from '../data/soundLabData';
import { HumorousQuote } from '../data/humorousQuotes';
import { TarotCard } from '../types';

const CATEGORY_MAP_EN: Record<string, string> = {
  'TRANSMISSÃO': 'TRANSMISSION',
  'INSIGHT': 'INSIGHT',
  'PRÁTICA': 'PRACTICE',
  'EXERCÍCIO': 'EXERCISE',
  'REFLEXÃO': 'REFLECTION',
  'VERSÍCULO': 'VERSICLE',
  'FECHAMENTO': 'CLOSING'
};

// English translations for Giros
const GIRO_TRANSLATIONS_EN: Record<number, {
  numberRoman: string;
  title: string;
  dimension: string;
  virtue: string;
  shadow: string;
  tool: string;
  word: string;
  summary: string;
  practices: Record<string, {
    title: string;
    shortDescription: string;
    instructions: string;
    steps?: { category: string; title: string; content: string }[];
  }>;
}> = {
  1: {
    numberRoman: 'TURN I',
    title: 'THE MIRROR OF THE MIND',
    dimension: 'Mind',
    virtue: 'Discernment',
    shadow: 'Excessive control',
    tool: 'The Mirror',
    word: 'ABIDE',
    summary: 'Recognize mental chatter and the difference between thought and the observing consciousness.',
    practices: {
      'g1_p1': {
        title: 'The Noise Observer',
        shortDescription: 'Observe the flow of thoughts without judging or following any of them.',
        instructions: 'Sit comfortably in silence. Do not try to empty your mind. Simply observe. When a thought arises, mentally say: "Thought", and let it pass. If "This is silly" arises, recognize: "Thought". Do not fight. Do not follow. Simply return to center.',
        steps: [
          { category: 'TRANSMISSÃO', title: 'The Beginning', content: 'The first thing the seeker discovers is that the mind never stops completely.' },
          { category: 'INSIGHT', title: 'The Distance', content: 'You are not the thought. You are the consciousness perceiving the thought.' },
          { category: 'PRÁTICA', title: 'Mental Observation', content: 'Remain present for 5 minutes watching thoughts pass like clouds or balls rolling down the lane.' },
          { category: 'VERSÍCULO', title: 'The Return', content: 'Thought comes. Thought goes. You observe. You return. You Abide.' },
          { category: 'FECHAMENTO', title: 'The Space', content: 'Notice the subtle space between thoughts. Right there is the first slice of Silence.' }
        ]
      },
      'g1_p2': {
        title: 'One Thing at a Time',
        shortDescription: 'Physical practice of full presence in a single daily action.',
        instructions: 'Choose a simple action: drinking a glass of water, washing a cup, or walking with slow steps. Do only that. When the mind tries to wander to future tasks or past worries, bring attention back to the immediate physical gesture.',
        steps: [
          { category: 'PRÁTICA', title: 'Anchoring in the Gesture', content: 'Feel the temperature of the glass, the texture of the water, the weight of your feet on the ground.' },
          { category: 'REFLEXÃO', title: 'Automatism', content: 'Notice how many things you do without being truly present.' }
        ]
      },
      'g1_p3': {
        title: 'The Mirror of Patterns',
        shortDescription: 'Impartial identification of recurring mental patterns.',
        instructions: 'Reflect upon your day. Identify without judgment the thoughts of fear, control, vanity, or urgency that repeated most. Say to yourself: "Ah, so this is what my Mind usually does." When you see the pattern, it ceases to be invisible.',
        steps: [
          { category: 'INSIGHT', title: 'Knowing the Pattern', content: 'The goal is not to condemn what you find, but to recognize what is aiming the ball.' }
        ]
      }
    }
  },
  2: {
    numberRoman: 'TURN II',
    title: 'THE WILL THAT CHOOSES',
    dimension: 'Will',
    virtue: 'Flexible discipline',
    shadow: 'Control and rigidity',
    tool: 'Direction Word',
    word: 'DIRECTION',
    summary: 'Learn to aim your attention. The Mind jumps; the Will chooses.',
    practices: {
      'g2_p1': {
        title: 'Focus on the Point',
        shortDescription: 'Training concentrated attention on a single physical object.',
        instructions: 'Choose a simple object before you (a candle, stone, coin, or glass). Observe it attentively for 5 minutes without making up stories. Notice shape, weight, color, and outline. When attention wanders, say "Return" and bring focus back.',
        steps: [
          { category: 'INSIGHT', title: 'Aiming Attention', content: 'Attention is like a bowling ball. The object is the pin.' },
          { category: 'PRÁTICA', title: 'Concentration on the Object', content: 'Remain focused solely on the presence of the object for 5 minutes.' }
        ]
      },
      'g2_p2': {
        title: 'The Direction Word',
        shortDescription: 'Establishing a firm and serene inner intention.',
        instructions: 'Choose a simple Direction Word, such as "I observe before reacting" or "Slowly, friend. One thing at a time." Repeat it serenely during breathing and commit to remembering it at the first impulse today.',
        steps: [
          { category: 'TRANSMISSÃO', title: 'The Instruction', content: 'The Direction Word guides behavior without requiring inner force.' }
        ]
      },
      'g2_p3': {
        title: 'The Pause of Choice',
        shortDescription: 'Training the micro-pause between stimulus and response.',
        instructions: 'Direct your attention to your breathing. At each environmental stimulus, pause for 3 seconds before acting. In that space lies the Will.',
        steps: [
          { category: 'INSIGHT', title: 'The Pause', content: 'Between stimulus and response lies the quiet power of your choice.' }
        ]
      }
    }
  },
  3: {
    numberRoman: 'TURN III',
    title: 'ENERGY AND THE FLOW',
    dimension: 'Energy',
    virtue: 'Vitality and flow',
    shadow: 'Exhaustion and dissipation',
    tool: 'Rhythmic Breath',
    word: 'FLOW',
    summary: 'Feel vital energy without draining or resisting it.',
    practices: {
      'g3_p1': {
        title: 'The Rhythmic Breath',
        shortDescription: 'Harmonization of vital energy through conscious breathing.',
        instructions: 'Inhale for 4 seconds, hold for 4, exhale for 4, pause for 4. Feel how rhythm regulates the energy body and stills anxiety.',
        steps: [
          { category: 'INSIGHT', title: 'The Exchange', content: 'The Spiral breathes in receiving and letting go. What does not circulate begins to weigh heavy.' },
          { category: 'PRÁTICA', title: 'Respiratory Flow', content: 'Connect with the natural rhythm of inhalation and exhalation for 5 minutes.' }
        ]
      },
      'g3_p2': {
        title: 'Mapping Leaks',
        shortDescription: 'Identifying where your vitality is wasted.',
        instructions: 'Close your eyes and scan your body and mind. Where are you holding tension? Deliberately relax muscles and release mental strain.',
        steps: [
          { category: 'INSIGHT', title: 'Stopping Leaks', content: 'Relaxing physical tension in the body immediately releases wasted mental energy.' }
        ]
      }
    }
  },
  4: {
    numberRoman: 'TURN IV',
    title: 'THE FOUR ELEMENTS',
    dimension: 'Structure',
    virtue: 'Harmony',
    shadow: 'Imbalance',
    tool: 'Elemental Quadrant',
    word: 'BALANCE',
    summary: 'Balance Earth, Water, Air, and Fire in daily life.',
    practices: {
      'g4_p1': {
        title: 'Elemental Alignment',
        shortDescription: 'Balancing body (Earth), emotion (Water), thought (Air), and action (Fire).',
        instructions: 'In silence, visit each element within yourself: feel your physical weight (Earth), your emotional state (Water), your mental space (Air), and your vital spark (Fire).',
        steps: [
          { category: 'INSIGHT', title: 'Four Forces', content: 'Fire, Air, Water, and Earth must cooperate in harmony.' }
        ]
      },
      'g4_p2': {
        title: 'Elemental Breathing of Harmony',
        shortDescription: 'Intentional harmonization of the 4 qualities in breathing.',
        instructions: 'Associate each breathing cycle with a quality: Fire for courage; Air for clarity; Water for receptivity; Earth for stability.',
        steps: [
          { category: 'PRÁTICA', title: 'Elemental Rhythm', content: 'Breathe in the distinct qualities of courage, clarity, receptivity, and stability.' }
        ]
      }
    }
  },
  5: {
    numberRoman: 'TURN V',
    title: 'THE MIRROR OF THE EGO',
    dimension: 'Identity',
    virtue: 'Humility',
    shadow: 'Arrogance and self-pity',
    tool: 'Unmasking',
    word: 'TRUTH',
    summary: 'Observe the social masks and defenses of the ego without condemnation.',
    practices: {
      'g5_p1': {
        title: 'Disarming the Mask',
        shortDescription: 'Noticing when you act to seek approval or project superiority.',
        instructions: 'Recall a recent reaction where you felt offended or defensive. Look into the mirror of self-observation and ask: "Which mask was trying to protect itself?"',
        steps: [
          { category: 'INSIGHT', title: 'Seeing Without Drama', content: 'To see your shadow is not to worsen: it is the prerequisite for awakening.' }
        ]
      },
      'g5_p2': {
        title: 'The Pause of Recognition',
        shortDescription: 'Conscious pause before reacting to an emotional trigger.',
        instructions: 'When provoked, pause. Breathe. Ask: "What am I trying to protect?" Choose your response with transparency.',
        steps: [
          { category: 'PRÁTICA', title: 'Transparent Choice', content: 'Pause before emotional triggers and observe what you are trying to protect.' }
        ]
      }
    }
  },
  6: {
    numberRoman: 'TURN VI',
    title: 'AKASHA AND THE FIELD',
    dimension: 'Akasha',
    virtue: 'Receptivity',
    shadow: 'Disconnection',
    tool: 'The Field',
    word: 'PRESENCE',
    summary: 'Touch the unwritten space that connects all things.',
    practices: {
      'g6_p1': {
        title: 'Resting in the Field',
        shortDescription: 'Dissolving boundaries between observer and observed.',
        instructions: 'Rest quietly and expand awareness to include all ambient sounds, sensations, and space without creating boundaries between inside and outside.',
        steps: [
          { category: 'INSIGHT', title: 'Resting in the Center', content: 'In the quiet center, you are pure observing consciousness.' }
        ]
      },
      'g6_p2': {
        title: 'Creation and Dissolution of Thought Forms',
        shortDescription: 'Intentional construction of a thought form and its conscious dissolution.',
        instructions: 'In the silent space, hold a visual image for 3 minutes. Then deliberately dissolve it back into Akasha.',
        steps: [
          { category: 'PRÁTICA', title: 'Creating and Releasing', content: 'What you create in thought, you can consciously dissolve back into silence.' }
        ]
      }
    }
  },
  7: {
    numberRoman: 'TURN VII',
    title: 'LUCID WITNESSING',
    dimension: 'Vision',
    virtue: 'Clarity',
    shadow: 'Illusion',
    tool: 'Clean Sight',
    word: 'SEEING',
    summary: 'Look at reality as it is, without filtering through preferences.',
    practices: {
      'g7_p1': {
        title: 'Pure Perception',
        shortDescription: 'Observing people and situations without narrative labels.',
        instructions: 'Look at your surroundings for 5 minutes without labeling objects as good, bad, beautiful, or ugly. Just see raw color, light, and form.',
        steps: [
          { category: 'INSIGHT', title: 'The Witness', content: 'Distinguish between the mental representation and the one who perceives it.' }
        ]
      }
    }
  },
  8: {
    numberRoman: 'TURN VIII',
    title: 'THE GREAT NOW',
    dimension: 'Time',
    virtue: 'Immediacy',
    shadow: 'Nostalgia and anxiety',
    tool: 'The Instant',
    word: 'NOW',
    summary: 'Anchor completely in the current moment.',
    practices: {
      'g8_p1': {
        title: 'Anchoring in the Instant',
        shortDescription: 'Releasing past regret and future expectation.',
        instructions: 'Breathe deeply and declare mentally: "There is no other time than now. All life is taking place right here."',
        steps: [
          { category: 'INSIGHT', title: 'Grounding the Journey', content: 'Expanding perception is beautiful; returning anchored in the now is mastery.' }
        ]
      }
    }
  },
  9: {
    numberRoman: 'TURN IX',
    title: 'CROSSING THE DIMENUOUS',
    dimension: 'Layers',
    virtue: 'Integration',
    shadow: 'Fragmentation',
    tool: 'The Ladder',
    word: 'ASCENT',
    summary: 'Harmonize all 7 levels of perception from Matter to Silence.',
    practices: {
      'g9_p1': {
        title: 'The Seven Steps',
        shortDescription: 'Sequential contemplation of the 7 Dimenuous.',
        instructions: 'Move your awareness sequentially from physical body (Matter), energy, will, heart, mind, vision, up to pure Silence.',
        steps: [
          { category: 'PRÁTICA', title: 'Ascent and Descent', content: 'Traverse step-by-step from physical matter to pure silence, and return whole.' }
        ]
      }
    }
  },
  10: {
    numberRoman: 'TURN X',
    title: 'RETURN AND THE PATTERN',
    dimension: 'Integration',
    virtue: 'Wholeness',
    shadow: 'Isolation',
    tool: 'The Circle',
    word: 'RETURN',
    summary: 'Return to ordinary life fully awakened in the Pattern.',
    practices: {
      'g10_p1': {
        title: 'Abiding in Daily Life',
        shortDescription: 'Bringing the quietude of the Spiral into everyday actions.',
        instructions: 'Smile gently at the play of life. Recognize that all places, tasks, and encounters are part of the same divine Pattern.',
        steps: [
          { category: 'TRANSMISSÃO', title: 'The Center', content: 'There is nothing left to reach. Only to recognize.' },
          { category: 'PRÁTICA', title: 'The Full Spiral', content: 'Remain for 10 minutes integrating all Dimenuous layers.' },
          { category: 'VERSÍCULO', title: 'Unity', content: 'Silence is above. Matter is below. The Spiral in between. And you are the whole movement.' },
          { category: 'FECHAMENTO', title: 'Abide', content: 'The lane is open. The glass is in hand. Abide.' }
        ]
      }
    }
  }
};

// Sound preset translations
const SOUND_TRANSLATIONS_EN: Record<number, { name: string; description: string }> = {
  1: { name: 'Silence', description: 'Fundamental quietude and noise-free presence.' },
  2: { name: 'Vision', description: 'Perceptual clarity and witness free of projections.' },
  3: { name: 'Mind', description: 'Serene discernment and ordering of thoughts.' },
  4: { name: 'Heart', description: 'Compassionate resonance, primordial tone of balance.' },
  5: { name: 'Will', description: 'Firm intention, clear direction and center of gravity.' },
  6: { name: 'Energy', description: 'Subtle vitality, expansion and continuous flow.' },
  7: { name: 'Matter', description: 'Grounding, presence in the body and earthly stability.' }
};

// Tarot translation helpers
const TAROT_TRANSLATIONS_EN: Record<string, {
  name: string;
  tagline: string;
  description: string;
  reflection?: string;
  giroReflection?: Record<number, string>;
}> = {
  'c0': {
    name: 'THE FOOL',
    tagline: 'Freedom before explanation. The one who enters the game without haste.',
    description: 'The one who enters the game without knowing all the rules. Not out of ignorance, but out of freedom before explanation.',
    reflection: 'You do not need to have all the answers or guarantee a perfect strike to begin. Just take the first step and step onto the lane.',
    giroReflection: {
      1: 'Your mind attempts to calculate every step. Give your thoughts a break and simply abide.',
      2: 'True Will does not require desperation. Walk effortlessly.',
      3: 'Feel the flow of the journey without trying to pack extra baggage.',
      4: 'The Fool walks balanced because he is unattached to any of the four elements.',
      5: 'Let the masks of the ego fall away in the mirror.',
      6: 'In Akasha, everything is an open beginning.',
      7: 'Look with pure eyes, free from prior expectations.',
      8: 'You are already in the place you need to be to begin.',
      9: 'Feel the lightness as you traverse the Dimenuous layers.',
      10: 'The end and the beginning meet in the laughter of the Guy.'
    }
  },
  'c1': {
    name: 'THE MAGICIAN',
    tagline: 'Intention transforming possibility into movement.',
    description: 'The first conscious gesture. The hand that holds the ball and directs attention down the lane.',
    reflection: 'You possess all the necessary tools and elements. Wherever you choose to place your attention, movement will begin.',
    giroReflection: {
      1: 'Use mental discernment before aiming your focus.',
      2: 'Your Will is active: choose your next throw with clarity.',
      3: 'Direct your energy without leaks or anxiety.',
      4: 'Command the four elements in harmony and serenity.',
      5: 'Your intention must be transparent and clean in the mirror.',
      6: 'From Akasha, shape intention intentionally.',
      7: 'True magic is pure and lucid attention.',
      8: 'Do not project magic into the future; act in the Great Now.',
      9: 'Use intention to cross the Dimenuous layers.',
      10: 'The integrated Magician seeks no egoic control, only harmonious service.'
    }
  },
  'c2': {
    name: 'THE HIGH PRIESTESS',
    tagline: 'Knowledge that does not need to speak.',
    description: 'The inner well that holds the mystery of the inaudible before the word.',
    reflection: 'Stop asking for a moment. Listen to the silence that dwells beneath all daily noise.',
    giroReflection: {
      1: 'Allow the Mind to settle in order to hear subtle knowledge.',
      2: 'Inner Will is strengthened in quietude.',
      3: 'The flow of energy is renewed in silent rest.',
      4: 'Equilibrium is born when elements grow silent and listen.',
      5: 'In the deep mirror, contemplate truth without words.',
      6: 'You are touching Akasha itself.',
      7: 'The eyes behind the eyes see in silence.',
      8: 'Remain still and truth will reveal itself.',
      9: 'Silence is the primary portal between layers.',
      10: 'At the center of return, the Priestess and Silence are one.'
    }
  },
  'c3': {
    name: 'THE EMPRESS',
    tagline: 'Abundance that unfolds naturally.',
    description: 'Fertile creative life where every effort bears organic fruit.',
    reflection: 'Allow life to blossom without forcing the pace. True creation happens when you abide in present abundance.',
    giroReflection: {
      1: 'Create mental clarity without judging the gestation of ideas.',
      2: 'Creative Will flourishes when nurtured with care.',
      3: 'Feel generating vitality flowing through the body.',
      4: 'Harmonize the feelings of Water and the inspiration of Air.',
      5: 'Recognize beauty and imperfection in your own reflection.',
      6: 'Akasha is the womb of all creations.',
      7: 'See the beauty of the world without clinging to fleeting forms.',
      8: 'Creation happens right now in this moment.',
      9: 'Let inspiration pass through the Dimenuous layers.',
      10: 'Creation returns to its origin with gratitude.'
    }
  },
  'c4': {
    name: 'THE EMPEROR',
    tagline: 'Structure, stability, and order in motion.',
    description: 'Firm boundaries and solid foundation that allow true freedom to flourish.',
    reflection: 'Establish clear boundaries and order in your routine. Stability is not rigidity, but the vessel of presence.',
    giroReflection: {
      1: 'Your Mind desires to control everything. Beware of rigidity.',
      2: 'Establish healthy boundaries without becoming a dictator to yourself.',
      3: 'Energy needs structure, but structure needs to breathe.',
      4: 'Strengthen the Earth element without losing the fluidity of Water.',
      5: 'Beware of egoic arrogance in the mirror.',
      6: 'Outer order should mirror inner peace.',
      7: 'See the rules of the world as conventions of the game.',
      8: 'Take responsibility in your place in the world.',
      9: 'Cross through structures without getting trapped in them.',
      10: 'The true Emperor governs himself with humility.'
    }
  },
  'c5': {
    name: 'THE HIEROPHANT',
    tagline: 'Transmission of ancestral wisdom.',
    description: 'The bridge between teaching and direct lived experience.',
    reflection: 'Honor teachings without becoming dogmatic. True wisdom is verified through direct experience.',
    giroReflection: {
      1: 'The Mind learns by listening to the inner master.',
      2: 'Choose to learn through direct experience.',
      3: 'Wisdom is a serene vibration of energy.',
      4: 'The teaching balances the four elements.',
      5: 'The mirror reveals what the master attempted to teach.',
      6: 'Access the memory of Akasha.',
      7: 'The eyes behind the eyes recognize witness consciousness.',
      8: 'The teaching resides in the Great Now.',
      9: 'Transmit what you learned without clinging to titles.',
      10: 'The Stranger and you are the same witness in the Spiral.'
    }
  },
  'c6': {
    name: 'THE LOVERS',
    tagline: 'Choice born of alignment, not hesitation.',
    description: 'The crossroads where heart and mind meet in harmony.',
    reflection: 'Choose with your whole heart and mind aligned. Harmony is choosing from clarity rather than conflict.',
    giroReflection: {
      1: 'Choose with clarity without allowing the mind to divide.',
      2: 'Align your Will with sincere feeling.',
      3: 'Electrical and magnetic polarities in balance.',
      4: 'Union of Water and Fire in harmony.',
      5: 'In the mirror of the other, recognize yourself.',
      6: 'In Akasha, all souls connect.',
      7: 'See the divine present in the person before you.',
      8: 'Be fully whole in the present encounter.',
      9: 'Love crosses all layers.',
      10: 'Unity is the origin and end of every meeting.'
    }
  },
  'c7': {
    name: 'THE CHARIOT',
    tagline: 'Vector of action directed by the Will.',
    description: 'Momentum and focus steering forward through all obstacles.',
    reflection: 'Maintain your vector of focus. Steer your energy forward without letting distractions pull you off course.',
    giroReflection: {
      1: 'Keep the mind steady while the world moves.',
      2: 'Direct the Will with reins that are firm yet gentle.',
      3: 'Do not waste energy on anxious decelerations.',
      4: 'Steer the forces of the 4 elements with mastery.',
      5: 'Recognize the correct direction in the mirror of the soul.',
      6: 'Akasha provides the lane and the path.',
      7: 'See the road ahead with discernment.',
      8: 'Travel while keeping centered in the Now.',
      9: 'Cross the portals between layers without fear.',
      10: 'The chariot returns to the starting point transformed.'
    }
  },
  'c8': {
    name: 'JUSTICE',
    tagline: 'Equilibrium and cause and effect.',
    description: 'Lucid clarity seeing consequences with complete impartiality.',
    reflection: 'Observe cause and effect with clear discernment. Balance returns when actions align with truth.',
    giroReflection: {
      1: 'Relentless discernment against self-deception.',
      2: 'Your Will must respect the natural order.',
      3: 'Cut off reactive energy leaks.',
      4: 'The scale of the four elements in perfect balance.',
      5: 'Be honest before the mirror without excuses.',
      6: 'The law of cause and effect inscribed in Akasha.',
      7: 'See what is without emotional distortions.',
      8: 'Take responsibility for your actions now.',
      9: 'Alignment opens the doors between layers.',
      10: 'Justice is the very harmony of the Spiral.'
    }
  },
  'c9': {
    name: 'THE HERMIT',
    tagline: 'The lantern that illuminates inward.',
    description: 'Solitude that clarifies vision before returning to the group.',
    reflection: 'Step back into quiet reflection. In silence and solitude, your inner lantern becomes bright.',
    giroReflection: {
      1: 'Silence mental chatter in the lantern of Abiding.',
      2: 'Serene Will that does not need to shout.',
      3: 'Conserve your energy in inner gathering.',
      4: 'Stability of Earth and peace of Silence.',
      5: 'In conscious solitude, the mirror becomes clear.',
      6: 'The Hermit inhabits the peace of Akasha.',
      7: 'The lantern illuminates the eyes behind the eyes.',
      8: 'Travel inward without leaving your place.',
      9: 'Quiet gathering is the key to crossing.',
      10: 'The Hermit returns to the world bringing gentle light.'
    }
  },
  'c10': {
    name: 'WHEEL OF FORTUNE',
    tagline: 'Rhythm of change and impermanence.',
    description: 'The constant rotation of life where every peak leads to a valley and back.',
    reflection: 'Observe the rise and fall of circumstances without anxiety. Stay centered at the hub of the wheel.',
    giroReflection: {
      1: 'The Mind perceives that thoughts come and go in cycles.',
      2: 'Choose to remain centered through any turn of the wheel.',
      3: 'Flow with the energy ups and downs of life.',
      4: 'The elements alternate across the seasons of the soul.',
      5: 'The mirror reveals the Pattern behind the cycles.',
      6: 'Akasha contains the design of all turns.',
      7: 'See the cycles without letting them make you dizzy.',
      8: 'Each turn happens in the present.',
      9: 'Shift perspective as the wheel turns.',
      10: 'Completing the Ten Turns is recognizing the center of the Wheel.'
    }
  },
  'c11': {
    name: 'STRENGTH',
    tagline: 'Gentle mastery over instinctual force.',
    description: 'Patience and inner calm taming the fiercest impulses.',
    reflection: 'Master your reactions with gentle awareness. True strength never requires violence or force.',
    giroReflection: {
      1: 'Pacify mental noise with gentleness.',
      2: 'Will guided by compassionate love.',
      3: 'The strength of energy that does not waste itself in combat.',
      4: 'Water and Fire in serene embrace.',
      5: 'Look at your inner monsters with compassion in the mirror.',
      6: 'Love is the greatest force in Akasha.',
      7: 'The gentle gaze that welcomes reality.',
      8: 'Strength is remaining serene in this instant.',
      9: 'Love opens any door between layers.',
      10: 'The integrated Heart is the fortress of Abiding.'
    }
  },
  'c12': {
    name: 'THE HANGED MAN',
    tagline: 'New perspective found through surrender.',
    description: 'Pausing resistance to see the world from an inverted viewpoint.',
    reflection: 'Release control and pause resistance. A change of perspective reveals what effort could not solve.',
    giroReflection: {
      1: 'Release the Mind\'s need to control the outcome.',
      2: 'Submit egoic Will to the greater Pattern.',
      3: 'Spend less energy fighting against what is.',
      4: 'Acceptance balances elemental tensions.',
      5: 'The inverted mirror shows the absurdity of worries.',
      6: 'Suspend judgment and feel Akasha.',
      7: 'New vision arises when you stop forcing.',
      8: 'Surrender to the present moment.',
      9: 'Suspension is the gateway.',
      10: 'By letting go of control, you discover you were already home.'
    }
  },
  'c13': {
    name: 'DEATH',
    tagline: 'Renewal through necessary completion.',
    description: 'The shedding of old skins to allow new life to emerge.',
    reflection: 'Let go of what has already served its purpose. Endings are space cleared for new presence.',
    giroReflection: {
      1: 'Die to old thoughts and rigid beliefs.',
      2: 'Renounce small desires for the sake of the real self.',
      3: 'Transform stagnant energy into new life.',
      4: 'Earth renews itself in elemental dissolution.',
      5: 'In the mirror, watch the masks fall.',
      6: 'Akasha welcomes the end of all forms.',
      7: 'See beyond the death of appearance.',
      8: 'Reborn in every instant in the Great Now.',
      9: 'The death of the ego is the passage between layers.',
      10: 'The Mat of the Monad is eternal.'
    }
  },
  'c14': {
    name: 'TEMPERANCE',
    tagline: 'Harmony and middle path.',
    description: 'Blending opposites into a quiet and serene alchemy.',
    reflection: 'Find the middle path of balance. Gentle moderation brings serenity to mind and spirit.',
    giroReflection: {
      1: 'Balance and moderation in thought.',
      2: 'Will tempered with patience.',
      3: 'Harmonious blending of energy flows.',
      4: 'Alchemical harmony of the 4 elements.',
      5: 'The mirror shows the peace of the middle path.',
      6: 'Subtle alchemy in the space of Akasha.',
      7: 'Serene and balanced vision of life.',
      8: 'Appreciate the present like a good sip of cold beer.',
      9: 'Alchemy connects all layers.',
      10: 'Temperance is the celebration of Abiding.'
    }
  },
  'c15': {
    name: 'THE DEVIL',
    tagline: 'Illusion of attachment and automatic habit.',
    description: 'Recognizing the chains that you hold voluntarily.',
    reflection: 'Observe the automatic habits that bind your attention. Recognizing the illusion breaks the grip.',
    giroReflection: {
      1: 'Do not believe the nihilistic voices of the Mind.',
      2: 'Your Will is free and does not belong to the Voids.',
      3: 'Do not surrender your energy to what demands reaction.',
      4: 'Elemental imbalance feeding the shadow.',
      5: 'The mirror reveals the Voids\' dread behind the mask.',
      6: 'In Akasha, the Void is merely absence of recognition.',
      7: 'See the Voids as lost siblings without being contaminated.',
      8: 'Remain in the Now without falling into fear of tomorrow.',
      9: 'Traverse the shadow without getting trapped in it.',
      10: 'By not reacting to the Void, it dissolves in the Spiral.'
    }
  },
  'c16': {
    name: 'THE TOWER',
    tagline: 'Sudden breakthrough of unvarnished truth.',
    description: 'The shattering of false structures to reveal bedrock reality.',
    reflection: 'Welcome the breakdown of false concepts. What cannot fall remains indestructible.',
    giroReflection: {
      1: 'Shattering old mental paradigms.',
      2: 'Egoic Will yields to the reality of facts.',
      3: 'Sudden release of blocked energy.',
      4: 'Necessary reorganization of elements.',
      5: 'The mirror shatters false self-images.',
      6: 'Illumination that clears the causal space.',
      7: 'Instantaneous vision without filters.',
      8: 'The shock that awakens to the present moment.',
      9: 'The collapse of the barrier between layers.',
      10: 'The Tower crumbled, but the floor and Mat remain firm.'
    }
  },
  'c17': {
    name: 'THE STAR',
    tagline: 'Serene hope and cosmic inspiration.',
    description: 'Clear sky after the storm, guiding the journey onward.',
    reflection: 'Trust the quiet light guiding your steps. Inspiration flows freely when anxiety recedes.',
    giroReflection: {
      1: 'Clarity and inspired mental peace.',
      2: 'Your Will aligned with cosmic beauty.',
      3: 'Feel pristine and renewed energy.',
      4: 'Pure Water nourishing the Earth.',
      5: 'In the mirror, calm glow of the divine spark.',
      6: 'Inspiration descending from Akasha.',
      7: 'Pure and translucent spiritual vision.',
      8: 'Feel grace in the present moment.',
      9: 'Light shining through all layers.',
      10: 'The Star is the quiet smile of the Spiral.'
    }
  },
  'c18': {
    name: 'THE MOON',
    tagline: 'Exploring the subtle shadows of intuition.',
    description: 'Navigating mystery and dreamscapes without fear.',
    reflection: 'Walk through subtle fears and doubts with gentle awareness. Shadow dissolves when brought into presence.',
    giroReflection: {
      1: 'Differentiate intuition from mental fantasy.',
      2: 'Maintain steady Will in the face of uncertainty.',
      3: 'Flow through emotional waters without drowning.',
      4: 'Water reflecting the Air of the mind.',
      5: 'The deep mirror bringing the unconscious to light.',
      6: 'The ocean of memories in Akasha.',
      7: 'Learn to see in the dark with discernment.',
      8: 'Anchor in the body now while the mind dreams.',
      9: 'Navigate between layers without fear of the mists.',
      10: 'The night passes and the dawn of the center draws near.'
    }
  },
  'c19': {
    name: 'THE SUN',
    tagline: 'Vital clarity and unclouded joy.',
    description: 'Radiant truth illuminating every corner of presence.',
    reflection: 'Celebrate lucid presence and simple joy. Reality shines clearly when unshadowed by doubt.',
    giroReflection: {
      1: 'Radiant mental clarity without doubts.',
      2: 'Will manifested with joy and lightness.',
      3: 'Abundant and radiant energy.',
      4: 'Radiant Fire illuminating all elements.',
      5: 'The mirror reflecting only light and transparency.',
      6: 'Akasha manifested in splendour.',
      7: 'Clear and transparent gaze over everything.',
      8: 'Full joy of being alive in the Now.',
      9: 'Solar light penetrating all layers.',
      10: 'The Spiral Congregation united in the same light.'
    }
  },
  'c20': {
    name: 'JUDGMENT',
    tagline: 'Call to awaken and reclaim purpose.',
    description: 'Hearing the inner horn summoning you to step into your full potential.',
    reflection: 'Listen to the call of awakening. Leave behind past patterns and step into conscious awareness.',
    giroReflection: {
      1: 'Awakening of the Mind from the sleep of automatism.',
      2: 'Definitive choice for the path of Abiding.',
      3: 'Complete renewal of vital energy.',
      4: 'Resurrection of elements in perfect harmony.',
      5: 'The mirror reveals the present Monad.',
      6: 'The call echoing back from Akasha.',
      7: 'Final vision without veils or illusions.',
      8: 'Awakening happens solely in the Now.',
      9: 'Definitive passage between layers.',
      10: 'Recognizing that you never left home.'
    }
  },
  'c21': {
    name: 'THE WORLD',
    tagline: 'Wholeness and cosmic integration.',
    description: 'Completion of the cycle and seamless unity with the Pattern.',
    reflection: 'Recognize your essential unity with the Pattern. Everything is complete in this moment.',
    giroReflection: {
      1: 'The Mind at peace with totality.',
      2: 'Will in harmony with the Cosmos.',
      3: 'Energy circulating fully through everything.',
      4: 'The 4 elements dancing in perfect unity.',
      5: 'The mirror integrating light, shadow, and reality.',
      6: 'Pleroma manifested in Matter.',
      7: 'Seeing holiness in all things.',
      8: 'Absolute fullness in this exact second.',
      9: 'Free circulation through all layers.',
      10: 'The World and Abiding are one.'
    }
  },
  'c_secret': {
    name: 'THE SECRET CARD',
    tagline: 'The Dimenuous layer that contains all Dimenuous layers.',
    description: 'It has no number in the deck and appears when searching ceases. The Mirror with no image of its own, reflecting the Monad Pattern.',
    reflection: 'Look for no one in the Mirror. The observer, the observed, and the reflection are the same Spiral. You are the shape.',
    giroReflection: {
      1: 'The mind that perceives itself is the Mirror.',
      2: 'The Will that chooses is the Mirror moving.',
      3: 'Energy is light reflecting in the Mirror.',
      4: 'The Elements are the colors of the Mirror.',
      5: 'The clean soul is the transparent Mirror.',
      6: 'Akasha is the frame of the Mirror.',
      7: 'The Eyes behind the eyes are the Mirror itself.',
      8: 'The Great Now is the surface of the Mirror.',
      9: 'The layers are merely reflections of the same Mirror.',
      10: 'You are the Mirror. The Guy Abides. You Abide.'
    }
  }
};

export function getTranslatedGiro(giro: Giro, lang: AppLanguage): Giro {
  if (lang !== 'en') return giro;
  const t = GIRO_TRANSLATIONS_EN[giro.id];
  if (!t) return giro;

  return {
    ...giro,
    numberRoman: t.numberRoman || giro.numberRoman,
    title: t.title || giro.title,
    dimension: t.dimension || giro.dimension,
    virtue: t.virtue || giro.virtue,
    shadow: t.shadow || giro.shadow,
    tool: t.tool || giro.tool,
    word: t.word || giro.word,
    summary: t.summary || giro.summary,
    practices: giro.practices.map((p) => getTranslatedPractice(p, lang))
  };
}

export function getTranslatedPractice(practice: Practice, lang: AppLanguage): Practice {
  if (lang !== 'en') return practice;
  const gT = GIRO_TRANSLATIONS_EN[practice.giroId];
  const pT = gT?.practices[practice.id];

  const translatedSteps = practice.steps
    ? practice.steps.map((step, idx) => {
        const pTStep = pT?.steps?.[idx];
        const category = (CATEGORY_MAP_EN[step.category] || step.category) as PracticeCategory;
        return {
          category,
          title: pTStep?.title || step.title,
          content: pTStep?.content || step.content
        };
      })
    : undefined;

  if (!pT) {
    return {
      ...practice,
      steps: translatedSteps
    };
  }

  return {
    ...practice,
    title: pT.title || practice.title,
    shortDescription: pT.shortDescription || practice.shortDescription,
    instructions: pT.instructions || practice.instructions,
    steps: translatedSteps || practice.steps
  };
}

export function getTranslatedSound(sound: DimenuvelSound, lang: AppLanguage): DimenuvelSound {
  if (lang !== 'en') return sound;
  const sT = SOUND_TRANSLATIONS_EN[sound.id];
  if (!sT) return sound;

  return {
    ...sound,
    name: sT.name || sound.name,
    description: sT.description || sound.description
  };
}

export function getTranslatedTarotCard(card: TarotCard, lang: AppLanguage): TarotCard {
  if (lang !== 'en') return card;
  const cT = TAROT_TRANSLATIONS_EN[card.id];

  const dimMap: Record<string, string> = {
    'Silêncio': 'Silence',
    'Visão': 'Vision',
    'Mente': 'Mind',
    'Coração': 'Heart',
    'Vontade': 'Will',
    'Energia': 'Energy',
    'Matéria': 'Matter',
    'O Espelho': 'The Mirror',
    'O Cara': 'The Guy',
    'A Vontade': 'The Will',
    'O Silêncio': 'Silence',
    'A Visionária / Sophia': 'The Visionary / Sophia',
    'O Pequeno Cara / Demiurgo': 'The Little Guy / Demiurge',
    'O Estranho': 'The Stranger',
    'O Encontro': 'The Encounter',
    'A Espiral em Movimento': 'The Spiral in Motion',
    'O Pisador': 'The Treadler',
    'O Abidar': 'Abiding',
    'Os Dez Giros': 'The Ten Turns',
    'Musa / A Queda de A Visionária': 'Muse / The Fall of The Visionary',
    'O Tapete': 'The Mat',
    'A Cerveja': 'The Beer',
    'Os Vazios': 'The Voids',
    'O Golpe / A Queda das Ilusões': 'The Blow / The Fall of Illusions',
    'A Visão': 'The Vision',
    'O Espelho dos Sonhos': 'The Mirror of Dreams',
    'A Congregação da Espiral': 'The Spiral Congregation',
    'O Reconhecimento': 'The Recognition',
    'Abidar': 'Abiding',
    'O Espelho / A Oitava Dimenúvel': 'The Mirror / The Eighth Dimenuous'
  };

  const translatedDim = dimMap[card.dimentionName] || card.dimentionName;

  if (!cT) {
    return {
      ...card,
      dimentionName: translatedDim
    };
  }

  return {
    ...card,
    name: cT.name || card.name,
    tagline: cT.tagline || card.tagline,
    description: cT.description || card.description,
    reflection: cT.reflection || card.reflection,
    dimentionName: translatedDim,
    giroReflection: cT.giroReflection || card.giroReflection
  };
}

export function getTranslatedQuote(quote: HumorousQuote, lang: AppLanguage): HumorousQuote {
  if (lang !== 'en') return quote;
  // If quote contains known strings, provide English equivalents
  return {
    text: quote.text
      .replace('Se a sua mente continuar tagarelando', 'If your mind keeps chattering')
      .replace('Não tente entender a Espiral às 2 da manhã', 'Do not try to understand the Spiral at 2 AM')
      .replace('Abidar no Padrão não faz os boletos sumirem', 'Abiding in the Pattern does not make bills disappear')
      .replace('Pensamentos são como pinos de boliche', 'Thoughts are like bowling pins')
      .replace('Quer testar sua iluminação espiritual?', 'Want to test your spiritual enlightenment?')
      .replace('A mente é um excelente espelho', 'The mind is an excellent mirror')
      .replace('A grande sabedoria do Boliche Hermético', 'The great wisdom of Hermetic Bowling')
      .replace('Abidar é a nobre arte de não dar conselhos', 'Abiding is the noble art of not giving unsolicited advice'),
    source: quote.source ? quote.source.replace('Evangelho', 'Gospel').replace('Cap.', 'Ch.').replace('Giro', 'Turn') : quote.source
  };
}
