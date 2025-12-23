import { randomUUID } from "expo-crypto";
import * as SecureStore from "expo-secure-store";

import { SecureStoreTokenManager } from "~/lib/api/tokenManager";
import { Logger } from "~/lib/utils/logger";

export interface User {
  id: string;
  email: string;
  name: string;
}

const tokenManager = SecureStoreTokenManager.getManager();

const USER_DATA_KEY = "auth_user_data";

const generateFakeToken = (): string => {
  return `fake-jwt-${randomUUID()}`;
};

const storeUserData = async (user: User): Promise<void> => {
  await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
};

const getUserData = async (): Promise<User | null> => {
  const data = await SecureStore.getItemAsync(USER_DATA_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
};

const clearUserData = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(USER_DATA_KEY);
};

const checkAuthState = async (): Promise<User | null> => {
  try {
    const token = await tokenManager.getAccessToken();
    if (!token) {
      return null;
    }
    return await getUserData();
  } catch (error) {
    Logger.debug("Error checking auth state:", error);
    await tokenManager.clearTokens();
    await clearUserData();
    return null;
  }
};

const signIn = async (email: string, _password: string): Promise<User> => {
  try {
    const token = generateFakeToken();
    await tokenManager.setTokens(token);

    const user: User = {
      id: randomUUID(),
      email,
      name: email.split("@")[0],
    };

    await storeUserData(user);
    Logger.debug("User signed in:", user.email);
    return user;
  } catch (error) {
    Logger.error("Sign in failed:", error);
    await tokenManager.clearTokens();
    throw error;
  }
};

const signUp = async (
  email: string,
  _password: string,
  name: string
): Promise<User> => {
  try {
    const token = generateFakeToken();
    await tokenManager.setTokens(token);

    const user: User = {
      id: randomUUID(),
      email,
      name,
    };

    await storeUserData(user);
    Logger.debug("User signed up:", user.email);
    return user;
  } catch (error) {
    Logger.error("Sign up failed:", error);
    await tokenManager.clearTokens();
    throw error;
  }
};

const signOut = async (): Promise<void> => {
  try {
    await tokenManager.clearTokens();
    await clearUserData();
    Logger.debug("User signed out");
  } catch (error) {
    Logger.error("Sign out failed:", error);
    await tokenManager.clearTokens();
    await clearUserData();
    throw error;
  }
};

export const AuthService = {
  checkAuthState,
  signIn,
  signUp,
  signOut,
};
