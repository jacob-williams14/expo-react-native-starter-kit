import * as SecureStore from "expo-secure-store";

import { Logger } from "~/lib/utils/logger";

const ACCESS_TOKEN_KEY = "auth_access_token";

export interface TokenManager {
  getAccessToken: () => Promise<string | null>;
  setTokens: (accessToken: string) => Promise<void>;
  clearTokens: () => Promise<void>;
}

export class SecureStoreTokenManager implements TokenManager {
  private static instance: SecureStoreTokenManager | null = null;

  private constructor() {}

  public static getManager(): SecureStoreTokenManager {
    if (!SecureStoreTokenManager.instance) {
      SecureStoreTokenManager.instance = new SecureStoreTokenManager();
    }
    return SecureStoreTokenManager.instance;
  }

  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
      Logger.error("Error getting access token:", error);
      return null;
    }
  }

  async setTokens(accessToken: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    } catch (error) {
      Logger.error("Error storing tokens:", error);
      throw error;
    }
  }

  async clearTokens(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
      Logger.error("Error clearing tokens:", error);
    }
  }

  async debugLogTokens(): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();

      Logger.info("=== DEBUG: CURRENT TOKENS ===");
      Logger.info(
        "Access Token:",
        accessToken ? `${accessToken.substring(0, 10)}...` : "null"
      );
      Logger.info("Full Access Token:", accessToken);
      Logger.info("=============================");
    } catch (error) {
      Logger.error("Error logging tokens:", error);
    }
  }
  /**
   * Debug function to manually expire the access token
   */
  async debugExpireAccessToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      Logger.info("=== DEBUG: ACCESS TOKEN EXPIRED ===");
      Logger.info("Access token has been manually expired for testing");
      Logger.info("Make an API request to trigger the refresh flow");
      Logger.info("===================================");
    } catch (error) {
      Logger.error("Error expiring access token:", error);
    }
  }
}
