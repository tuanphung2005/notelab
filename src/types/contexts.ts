/**
 * Context interfaces for React contexts
 */
import { ReactNode } from 'react';
import type { AppConfig } from './config';

export interface ConfigContextType {
  config: AppConfig | null;
  updateConfig: (updates: Partial<AppConfig>) => void;
  reloadConfig: () => Promise<void>;
}

export interface ConfigProviderProps {
  children: ReactNode;
}