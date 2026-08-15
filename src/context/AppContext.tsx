import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationTab, Practice, PracticeLog, TarotReading, GiroState, UserProfile } from '../types';
import { GIROS_DATA, getGiroById } from '../data/girosData';
import { AppLanguage, getTranslation } from '../utils/i18n';

export type AppTheme = 'night' | 'day';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  activeGiroId: number;
  setActiveGiroId: (id: number) => void;
  unlockedGiros: number[];
  completedGiros: number[];
  completedPractices: string[];
  practiceLogs: PracticeLog[];
  tarotReadings: TarotReading[];
  activePractice: Practice | null;
  isTimerOpen: boolean;
  isTourOpen: boolean;
  isSplashOpen: boolean;
  isProfileModalOpen: boolean;
  profiles: UserProfile[];
  activeProfileId: string | null;
  activeProfile: UserProfile | null;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  
  // Actions
  navigateTo: (tab: NavigationTab) => void;
  openPracticeTimer: (practice: Practice) => void;
  closePracticeTimer: () => void;
  openTour: () => void;
  closeTour: () => void;
  completedGiroToShare: number | null;
  openGiroShareModal: (giroId?: number) => void;
  closeGiroShareModal: () => void;
  openSplash: () => void;
  closeSplash: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  createProfile: (data: { name: string; age?: string; sex?: string }) => UserProfile;
  switchProfile: (profileId: string) => void;
  deleteProfile: (profileId: string) => void;
  completePractice: (practiceId: string, durationMinutes: number, notes?: string) => void;
  getGiroStatus: (giroId: number) => GiroState;
  getNextPracticeForGiro: (giroId: number) => Practice | null;
  getNextPracticeInSequence: (currentPracticeId: string) => Practice | null;
  advanceToNextPractice: (currentPracticeId: string) => Practice | null;
  getPraticaDeHoje: () => { practice: Practice; giroTitle: string; giroNumber: string } | null;
  saveTarotReading: (reading: TarotReading) => void;
  resetProgress: () => void;
  exportProfile: (profileId?: string) => void;
  importProfilesFromJSON: (jsonString: string) => { success: boolean; message: string; importedCount: number };
}

const LEGACY_STORAGE_KEY = 'dimenuveis_app_progress_v2';
const PROFILES_STORAGE_KEY = 'dimenuveis_app_profiles_v4';
const ACTIVE_PROFILE_KEY = 'dimenuveis_active_profile_id_v4';
const TOUR_SEEN_KEY = 'dimenuveis_tour_seen_v1';
const THEME_STORAGE_KEY = 'dimenuveis_theme_v1';
const LANGUAGE_STORAGE_KEY = 'dimenuveis_language_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activeGiroId, setActiveGiroId] = useState<number>(1);
  const [unlockedGiros, setUnlockedGiros] = useState<number[]>([1]);
  const [completedGiros, setCompletedGiros] = useState<number[]>([]);
  const [completedPractices, setCompletedPractices] = useState<string[]>([]);
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>([]);
  const [tarotReadings, setTarotReadings] = useState<TarotReading[]>([]);
  const [activePractice, setActivePractice] = useState<Practice | null>(null);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isSplashOpen, setIsSplashOpen] = useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [completedGiroToShare, setCompletedGiroToShare] = useState<number | null>(null);

  const openGiroShareModal = (giroId?: number) => {
    setCompletedGiroToShare(giroId ?? activeGiroId);
  };

  const closeGiroShareModal = () => {
    setCompletedGiroToShare(null);
  };

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return (saved === 'day' || saved === 'night') ? saved : 'night';
    } catch {
      return 'night';
    }
  });

  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return (saved === 'en' || saved === 'pt') ? saved : 'pt';
    } catch {
      return 'pt';
    }
  });

  const setLanguage = (newLang: AppLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch (e) {
      console.error('Failed to save language setting:', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error('Failed to save theme setting:', e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'night' ? 'day' : 'night');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'day') {
      document.documentElement.classList.add('day-mode');
      document.documentElement.classList.remove('night-mode');
    } else {
      document.documentElement.classList.add('night-mode');
      document.documentElement.classList.remove('day-mode');
    }
  }, [theme]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || null;

  const openSplash = () => setIsSplashOpen(true);
  const closeSplash = () => setIsSplashOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  // Load profiles and progress on mount
  useEffect(() => {
    try {
      const tourSeen = localStorage.getItem(TOUR_SEEN_KEY);
      if (!tourSeen) {
        setIsTourOpen(true);
      }

      let loadedProfiles: UserProfile[] = [];
      const savedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
      const savedActiveId = localStorage.getItem(ACTIVE_PROFILE_KEY);

      if (savedProfiles) {
        loadedProfiles = JSON.parse(savedProfiles);
      }

      // Migration: if no profiles exist but legacy progress exists
      if (loadedProfiles.length === 0) {
        const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacySaved) {
          try {
            const parsed = JSON.parse(legacySaved);
            const migratedProfile: UserProfile = {
              id: 'profile_' + Date.now(),
              name: 'Praticante',
              createdAt: new Date().toISOString(),
              unlockedGiros: Array.isArray(parsed.unlockedGiros) ? parsed.unlockedGiros : [1],
              completedGiros: Array.isArray(parsed.completedGiros) ? parsed.completedGiros : [],
              completedPractices: Array.isArray(parsed.completedPractices) ? parsed.completedPractices : [],
              activeGiroId: parsed.activeGiroId || 1,
              practiceLogs: Array.isArray(parsed.practiceLogs) ? parsed.practiceLogs : [],
              tarotReadings: Array.isArray(parsed.tarotReadings) ? parsed.tarotReadings : []
            };
            loadedProfiles = [migratedProfile];
          } catch (e) {
            console.error('Failed to parse legacy progress', e);
          }
        }
      }

      if (loadedProfiles.length > 0) {
        setProfiles(loadedProfiles);
        const targetId = (savedActiveId && loadedProfiles.some((p) => p.id === savedActiveId))
          ? savedActiveId
          : loadedProfiles[0].id;
        setActiveProfileId(targetId);

        const activeP = loadedProfiles.find((p) => p.id === targetId) || loadedProfiles[0];
        setUnlockedGiros(activeP.unlockedGiros || [1]);
        setCompletedGiros(activeP.completedGiros || []);
        setCompletedPractices(activeP.completedPractices || []);
        setActiveGiroId(activeP.activeGiroId || 1);
        setPracticeLogs(activeP.practiceLogs || []);
        setTarotReadings(activeP.tarotReadings || []);
      }
    } catch (e) {
      console.error('Failed to initialize profiles from storage:', e);
    }
  }, []);

  // Sync state changes to active profile in profiles array and save to localStorage
  useEffect(() => {
    if (!activeProfileId) return;

    setProfiles((prevProfiles) => {
      const updated = prevProfiles.map((p) => {
        if (p.id === activeProfileId) {
          return {
            ...p,
            unlockedGiros,
            completedGiros,
            completedPractices,
            activeGiroId,
            practiceLogs,
            tarotReadings
          };
        }
        return p;
      });

      try {
        localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem(ACTIVE_PROFILE_KEY, activeProfileId);
      } catch (e) {
        console.error('Failed to sync active profile to localStorage:', e);
      }

      return updated;
    });
  }, [unlockedGiros, completedGiros, completedPractices, activeGiroId, practiceLogs, tarotReadings, activeProfileId]);

  const createProfile = (data: { name: string; age?: string; sex?: string }) => {
    const newProfile: UserProfile = {
      id: 'profile_' + Date.now(),
      name: data.name,
      age: data.age,
      sex: data.sex,
      createdAt: new Date().toISOString(),
      unlockedGiros: [1],
      completedGiros: [],
      completedPractices: [],
      activeGiroId: 1,
      practiceLogs: [],
      tarotReadings: []
    };

    const nextProfiles = [...profiles, newProfile];
    setProfiles(nextProfiles);
    setActiveProfileId(newProfile.id);

    // Set active state for new profile
    setUnlockedGiros(newProfile.unlockedGiros);
    setCompletedGiros(newProfile.completedGiros);
    setCompletedPractices(newProfile.completedPractices);
    setActiveGiroId(newProfile.activeGiroId);
    setPracticeLogs(newProfile.practiceLogs);
    setTarotReadings(newProfile.tarotReadings);

    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(nextProfiles));
      localStorage.setItem(ACTIVE_PROFILE_KEY, newProfile.id);
    } catch (e) {
      console.error('Failed to save created profile:', e);
    }

    return newProfile;
  };

  const switchProfile = (profileId: string) => {
    const target = profiles.find((p) => p.id === profileId);
    if (!target) return;

    setActiveProfileId(target.id);
    setUnlockedGiros(target.unlockedGiros || [1]);
    setCompletedGiros(target.completedGiros || []);
    setCompletedPractices(target.completedPractices || []);
    setActiveGiroId(target.activeGiroId || 1);
    setPracticeLogs(target.practiceLogs || []);
    setTarotReadings(target.tarotReadings || []);

    try {
      localStorage.setItem(ACTIVE_PROFILE_KEY, target.id);
    } catch (e) {
      console.error('Failed to set active profile key:', e);
    }
  };

  const deleteProfile = (profileId: string) => {
    const nextProfiles = profiles.filter((p) => p.id !== profileId);
    setProfiles(nextProfiles);

    if (activeProfileId === profileId) {
      if (nextProfiles.length > 0) {
        switchProfile(nextProfiles[0].id);
      } else {
        setActiveProfileId(null);
        setUnlockedGiros([1]);
        setCompletedGiros([]);
        setCompletedPractices([]);
        setActiveGiroId(1);
        setPracticeLogs([]);
        setTarotReadings([]);
        setIsProfileModalOpen(true);
      }
    }

    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(nextProfiles));
    } catch (e) {
      console.error('Failed to save profiles after deletion:', e);
    }
  };

  const exportProfile = (profileId?: string) => {
    const targetProfiles = profileId
      ? profiles.filter((p) => p.id === profileId)
      : profiles.length > 0
      ? profiles
      : activeProfile ? [activeProfile] : [];

    if (targetProfiles.length === 0) return;

    const mainProfile = targetProfiles[0];
    const sanitizedName = (mainProfile.name || 'praticante')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');

    const backupPayload = {
      app: 'Evangelho das Dimenúveis',
      version: '1.2',
      exportedAt: new Date().toISOString(),
      profiles: targetProfiles.map((p) => {
        if (p.id === activeProfileId) {
          return {
            ...p,
            unlockedGiros,
            completedGiros,
            completedPractices,
            activeGiroId,
            practiceLogs,
            tarotReadings
          };
        }
        return p;
      })
    };

    const fileName = targetProfiles.length === 1
      ? `praticante_${sanitizedName}_backup_${new Date().toISOString().slice(0, 10)}.json`
      : `dimenuveis_praticantes_backup_${new Date().toISOString().slice(0, 10)}.json`;

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importProfilesFromJSON = (jsonString: string): { success: boolean; message: string; importedCount: number } => {
    try {
      const parsed = JSON.parse(jsonString);
      let incomingProfiles: UserProfile[] = [];

      if (parsed && typeof parsed === 'object') {
        if (Array.isArray(parsed.profiles)) {
          incomingProfiles = parsed.profiles;
        } else if (Array.isArray(parsed)) {
          incomingProfiles = parsed;
        } else if (parsed.name || parsed.completedPractices || parsed.unlockedGiros) {
          incomingProfiles = [parsed];
        }
      }

      if (!incomingProfiles || incomingProfiles.length === 0) {
        return {
          success: false,
          message: language === 'en'
            ? 'The backup file does not contain any valid practitioner profile.'
            : 'O arquivo de backup não contém nenhum perfil válido de praticante.',
          importedCount: 0
        };
      }

      const sanitizedProfiles: UserProfile[] = incomingProfiles.map((p, idx) => {
        const profileId = p.id && !profiles.some((existing) => existing.id === p.id)
          ? p.id
          : 'profile_imp_' + Date.now() + '_' + idx;

        return {
          id: profileId,
          name: p.name && typeof p.name === 'string'
            ? p.name
            : (language === 'en' ? `Restored Practitioner ${idx + 1}` : `Praticante Restaurado ${idx + 1}`),
          age: p.age,
          sex: p.sex,
          createdAt: p.createdAt || new Date().toISOString(),
          unlockedGiros: Array.isArray(p.unlockedGiros) && p.unlockedGiros.length > 0 ? p.unlockedGiros : [1],
          completedGiros: Array.isArray(p.completedGiros) ? p.completedGiros : [],
          completedPractices: Array.isArray(p.completedPractices) ? p.completedPractices : [],
          activeGiroId: typeof p.activeGiroId === 'number' ? p.activeGiroId : 1,
          practiceLogs: Array.isArray(p.practiceLogs) ? p.practiceLogs : [],
          tarotReadings: Array.isArray(p.tarotReadings) ? p.tarotReadings : []
        };
      });

      const mergedProfiles = [...profiles];

      sanitizedProfiles.forEach((newP) => {
        const existingIdx = mergedProfiles.findIndex(
          (p) => p.id === newP.id || (p.name.trim().toLowerCase() === newP.name.trim().toLowerCase() && p.name.trim() !== '')
        );
        if (existingIdx >= 0) {
          mergedProfiles[existingIdx] = newP;
        } else {
          mergedProfiles.push(newP);
        }
      });

      setProfiles(mergedProfiles);

      const activeToSet = sanitizedProfiles[0];
      setActiveProfileId(activeToSet.id);
      setUnlockedGiros(activeToSet.unlockedGiros);
      setCompletedGiros(activeToSet.completedGiros);
      setCompletedPractices(activeToSet.completedPractices);
      setActiveGiroId(activeToSet.activeGiroId);
      setPracticeLogs(activeToSet.practiceLogs);
      setTarotReadings(activeToSet.tarotReadings);

      try {
        localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(mergedProfiles));
        localStorage.setItem(ACTIVE_PROFILE_KEY, activeToSet.id);
      } catch (e) {
        console.error('Failed to write imported profiles to localStorage:', e);
      }

      return {
        success: true,
        message: language === 'en'
          ? `${sanitizedProfiles.length} practitioner profile(s) successfully restored!`
          : `${sanitizedProfiles.length} perfil(is) de praticante restaurado(s) com sucesso!`,
        importedCount: sanitizedProfiles.length
      };
    } catch (err) {
      console.error('Import JSON parse error:', err);
      return {
        success: false,
        message: language === 'en'
          ? 'Error reading JSON file. Make sure to upload a valid backup file.'
          : 'Erro ao ler o arquivo JSON. Certifique-se de carregar um arquivo de backup válido.',
        importedCount: 0
      };
    }
  };

  const navigateTo = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPracticeTimer = (practice: Practice) => {
    setActivePractice(practice);
    setIsTimerOpen(true);
  };

  const closePracticeTimer = () => {
    setIsTimerOpen(false);
  };

  const openTour = () => {
    setIsTourOpen(true);
  };

  const closeTour = () => {
    setIsTourOpen(false);
    try {
      localStorage.setItem(TOUR_SEEN_KEY, 'true');
    } catch (e) {
      console.error('Failed to set tour seen in localStorage:', e);
    }

    // Prompt for user profile creation after the tour
    if (profiles.length === 0) {
      setIsProfileModalOpen(true);
    }
  };

  const getGiroStatus = (giroId: number): GiroState => {
    const giro = getGiroById(giroId);
    const allPracticesDone = !!(giro && giro.practices.length > 0 && giro.practices.every((p) => completedPractices.includes(p.id)));
    if (completedGiros.includes(giroId) || allPracticesDone) {
      return 'CONCLUÍDO';
    }
    if (unlockedGiros.includes(giroId)) {
      return 'EM PRÁTICA';
    }
    return 'BLOQUEADO';
  };

  const getNextPracticeForGiro = (giroId: number): Practice | null => {
    const giro = getGiroById(giroId);
    if (!giro) return null;
    const uncompleted = giro.practices.find((p) => !completedPractices.includes(p.id));
    return uncompleted || giro.practices[0] || null;
  };

  const getNextPracticeInSequence = (currentPracticeId: string): Practice | null => {
    let currentGiroIdx = -1;
    let currentPracticeIdx = -1;

    for (let gIdx = 0; gIdx < GIROS_DATA.length; gIdx++) {
      const pIdx = GIROS_DATA[gIdx].practices.findIndex((p) => p.id === currentPracticeId);
      if (pIdx !== -1) {
        currentGiroIdx = gIdx;
        currentPracticeIdx = pIdx;
        break;
      }
    }

    if (currentGiroIdx === -1) return null;

    const currentGiro = GIROS_DATA[currentGiroIdx];
    // Next practice in same Giro
    if (currentPracticeIdx < currentGiro.practices.length - 1) {
      return currentGiro.practices[currentPracticeIdx + 1];
    }

    // First practice of next Giro
    if (currentGiroIdx < GIROS_DATA.length - 1) {
      const nextGiro = GIROS_DATA[currentGiroIdx + 1];
      return nextGiro.practices[0] || null;
    }

    return null;
  };

  const advanceToNextPractice = (currentPracticeId: string): Practice | null => {
    const nextPractice = getNextPracticeInSequence(currentPracticeId);
    if (nextPractice) {
      setActivePractice(nextPractice);
      return nextPractice;
    }
    return null;
  };

  const getPraticaDeHoje = () => {
    let targetGiroId = activeGiroId;
    const targetGiro = getGiroById(targetGiroId);
    const targetDone = !!(targetGiro && targetGiro.practices.every((p) => completedPractices.includes(p.id)));
    if (completedGiros.includes(targetGiroId) || targetDone) {
      const incompleteUnlocked = unlockedGiros.find((id) => {
        const g = getGiroById(id);
        return g && !g.practices.every((p) => completedPractices.includes(p.id));
      });
      if (incompleteUnlocked) {
        targetGiroId = incompleteUnlocked;
      }
    }

    const giro = getGiroById(targetGiroId);
    if (!giro) return null;
    const practice = getNextPracticeForGiro(targetGiroId);
    if (!practice) return null;

    return {
      practice,
      giroTitle: giro.title,
      giroNumber: giro.numberRoman
    };
  };

  const completePractice = (practiceId: string, durationMinutes: number, notes?: string) => {
    let newCompletedPractices = completedPractices;
    if (!completedPractices.includes(practiceId)) {
      newCompletedPractices = [...completedPractices, practiceId];
      setCompletedPractices(newCompletedPractices);
    }

    const practiceGiro = GIROS_DATA.find((g) => g.practices.some((p) => p.id === practiceId));
    const targetGiroId = practiceGiro ? practiceGiro.id : activeGiroId;

    if (practiceGiro) {
      const allDone = practiceGiro.practices.every((p) => newCompletedPractices.includes(p.id));
      if (allDone) {
        const wasAlreadyCompleted = completedGiros.includes(targetGiroId);
        setCompletedGiros((prev) => (prev.includes(targetGiroId) ? prev : [...prev, targetGiroId]));

        const nextGiroId = targetGiroId + 1;
        if (nextGiroId <= 10) {
          setUnlockedGiros((prev) => (prev.includes(nextGiroId) ? prev : [...prev, nextGiroId]));
          setActiveGiroId(nextGiroId);
        }

        // Open share modal automatically when a full Giro is newly completed
        if (!wasAlreadyCompleted) {
          setCompletedGiroToShare(targetGiroId);
        }
      }
    }

    const log: PracticeLog = {
      id: 'log_' + Date.now(),
      practiceId,
      giroId: targetGiroId,
      completedAt: new Date().toISOString(),
      durationMinutes,
      notes
    };
    setPracticeLogs((prev) => [log, ...prev]);
  };

  const saveTarotReading = (reading: TarotReading) => {
    setTarotReadings((prev) => [reading, ...prev]);
  };

  const resetProgress = () => {
    setUnlockedGiros([1]);
    setCompletedGiros([]);
    setCompletedPractices([]);
    setActiveGiroId(1);
    setPracticeLogs([]);
    setTarotReadings([]);
    localStorage.removeItem(PROFILES_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        activeGiroId,
        setActiveGiroId,
        unlockedGiros,
        completedGiros,
        completedPractices,
        practiceLogs,
        tarotReadings,
        activePractice,
        isTimerOpen,
        isTourOpen,
        isSplashOpen,
        isProfileModalOpen,
        completedGiroToShare,
        openGiroShareModal,
        closeGiroShareModal,
        profiles,
        activeProfileId,
        activeProfile,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        toggleLanguage,
        t,
        navigateTo,
        openPracticeTimer,
        closePracticeTimer,
        openTour,
        closeTour,
        openSplash,
        closeSplash,
        openProfileModal,
        closeProfileModal,
        createProfile,
        switchProfile,
        deleteProfile,
        completePractice,
        getGiroStatus,
        getNextPracticeForGiro,
        getNextPracticeInSequence,
        advanceToNextPractice,
        getPraticaDeHoje,
        saveTarotReading,
        resetProgress,
        exportProfile,
        importProfilesFromJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
