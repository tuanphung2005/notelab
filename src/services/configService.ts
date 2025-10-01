import { invoke } from "@tauri-apps/api/core";
import type { AppConfig } from "../types";
import { DEFAULT_CONFIG } from "../types";

export const configService = {
  async loadConfig(): Promise<AppConfig> {
    try {
      const configJson = await invoke<string>('read_config');
      const config = JSON.parse(configJson) as AppConfig;
      // merge if missing props
      return {
        ...DEFAULT_CONFIG,
        ...config,
        font: { ...DEFAULT_CONFIG.font, ...config.font },
      };
    } catch (error) {
      console.error('Failed to load config:', error);
      return DEFAULT_CONFIG;
    }
  },

  async saveConfig(config: AppConfig): Promise<void> {
    try {
      const configJson = JSON.stringify(config, null, 2);
      await invoke('save_config', { config: configJson });
    } catch (error) {
      console.error('Failed to save config:', error);
      throw error;
    }
  },

  async updateConfig(updates: Partial<AppConfig>): Promise<AppConfig> {
    const currentConfig = await this.loadConfig();
    const newConfig = {
      ...currentConfig,
      ...updates,
      font: { ...currentConfig.font, ...updates.font },
    };
    await this.saveConfig(newConfig);
    return newConfig;
  }
};