
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProjectSettings {
  image: string;
  link: string;
}

interface AppSettings {
  heroImage: string;
  profileImage: string;
  project1: ProjectSettings;
  project2: ProjectSettings;
  project3: ProjectSettings;
  standardPdfLink: string;
  premiumPdfLink: string;
}

interface AppStateContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  isAdminMode: boolean;
  setAdminMode: (val: boolean) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  heroImage: 'https://picsum.photos/800/1200?random=1',
  profileImage: 'https://picsum.photos/200/200?random=10',
  project1: {
    image: 'https://picsum.photos/400/800?random=1',
    link: '#'
  },
  project2: {
    image: 'https://picsum.photos/400/800?random=2',
    link: '#'
  },
  project3: {
    image: 'https://picsum.photos/400/800?random=3',
    link: '#'
  },
  standardPdfLink: '#',
  premiumPdfLink: '#'
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isAdminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_hq_settings_v3');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('vibe_hq_settings_v3', JSON.stringify(updated));
  };

  return (
    <AppStateContext.Provider value={{ settings, updateSettings, isAdminMode, setAdminMode }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
};
