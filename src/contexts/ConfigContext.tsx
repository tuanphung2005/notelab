import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { AppConfig, ConfigContextType, ConfigProviderProps } from '../types';
import { configService } from '../services/configService';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const applyTheme = (theme: AppConfig['theme']) => {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  } else {
    root.classList.remove('light', 'dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  const loadConfig = async () => {
    try {
      const loadedConfig = await configService.loadConfig();

      setConfig(loadedConfig);

      applyTheme(loadedConfig.theme);
      return loadedConfig;
    } catch (error) {
      console.error('Failed to load config:', error);
      return null;
    }
  };

  const debouncedSave = useCallback(async (configToSave: AppConfig) => {
    try {
      await configService.saveConfig(configToSave);
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }, []);

  const updateConfig = useCallback((updates: Partial<AppConfig>) => {
    if (!config) return;
    
    const newConfig = {
      ...config,
      ...updates,
      font: { ...config.font, ...updates.font },
    };

    setConfig(newConfig);
    
    // theme change
    if (updates.theme) {
      applyTheme(updates.theme);
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      debouncedSave(newConfig);
    }, 500); // save
  }, [config, debouncedSave]);

  const reloadConfig = async () => {
    await loadConfig();
  };

  useEffect(() => {
    loadConfig();
  }, []);

  // system theme change listener testttest
  useEffect(() => {
    if (!config || config.theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (config.theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [config?.theme]);

  // cleanup
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, reloadConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};