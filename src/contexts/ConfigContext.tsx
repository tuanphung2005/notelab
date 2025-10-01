import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { AppConfig, ConfigContextType, ConfigProviderProps } from '../types';
import { configService } from '../services/configService';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

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