import { useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { ApiClient } from "~/lib/api/apiClient";
import { useAppState } from "~/lib/stores/appState";
import { Logger } from "~/lib/utils/logger";
import { AuthService } from "~/services/authService";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { setUser, setLoading, clearUser } = useAppState().actions;

  const handleAuthFailure = useCallback(() => {
    clearUser();
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace("/");
  }, [router, clearUser]);

  const checkAuthState = useCallback(async () => {
    setLoading(true);
    try {
      const user = await AuthService.checkAuthState();
      setUser(user);
    } catch (error) {
      Logger.error("Error checking auth state:", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, clearUser]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      setLoading(true);
      try {
        const user = await AuthService.signIn(email, password);
        setUser(user);
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string): Promise<void> => {
      setLoading(true);
      try {
        const user = await AuthService.signUp(email, password, name);
        setUser(user);
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await AuthService.signOut();
    } catch (error) {
      Logger.error("Sign out error:", error);
    } finally {
      clearUser();
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/(auth)/login");
      setLoading(false);
    }
  }, [router, clearUser, setLoading]);

  useEffect(() => {
    const apiClient = ApiClient.getClient();
    apiClient.setAuthFailureCallback(handleAuthFailure);
  }, [handleAuthFailure]);

  useEffect(() => {
    void checkAuthState();
  }, [checkAuthState]);

  const contextValue: AuthContextType = {
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, isLoading, isAuthenticated } = useAppState();

  return {
    user,
    isLoading,
    isAuthenticated,
    ...context,
  };
}
