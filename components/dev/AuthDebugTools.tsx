import { useState } from "react";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/text";
import { SecureStoreTokenManager } from "~/lib/api/tokenManager";
import { useAuth } from "~/lib/contexts/AuthContext";

export function AuthDebugTools() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated } = useAuth();
  const tokenManager = SecureStoreTokenManager.getManager();

  const handleCheckTokens = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      await tokenManager.debugLogTokens();

      const accessToken = await tokenManager.getAccessToken();

      if (accessToken) {
        const accessPreview = `${accessToken.substring(0, 20)}...${accessToken.substring(accessToken.length - 10)}`;
        setApiResponse(
          `✅ Access token stored\n\nPreview: ${accessPreview}\n\n✅ Full token logged to console\n\nℹ️ This is a fake JWT token for demo purposes`
        );
      } else {
        setApiResponse("❌ No access token stored");
      }
    } catch (err) {
      setError(
        `Error checking tokens: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearTokens = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      await tokenManager.clearTokens();
      setApiResponse("🧹 All tokens cleared from storage");
    } catch (err) {
      setError(
        `Error clearing tokens: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="gap-2">
      <P className="mb-2">
        Auth Status:{" "}
        {isAuthenticated ? "✅ Authenticated" : "❌ Not authenticated"}
      </P>
      {user && (
        <P className="mb-2 text-xs">
          Email: {user.email} | Name: {user.name}
        </P>
      )}

      <View className="flex-row flex-wrap gap-2 mb-4">
        <Button onPress={handleCheckTokens} variant="outline" size="sm">
          <P>Check Tokens</P>
        </Button>
        <Button onPress={handleClearTokens} variant="outline" size="sm">
          <P>Clear Tokens</P>
        </Button>
      </View>

      {error && (
        <View className="bg-red-100 dark:bg-red-900/20 p-3 rounded-md mb-4">
          <P className="text-red-800 dark:text-red-200">{error}</P>
        </View>
      )}

      {apiResponse && (
        <View>
          <P className="font-bold mb-1">Response:</P>
          <View className="bg-muted p-3 rounded-md border border-border">
            <P className="font-mono text-xs">{apiResponse}</P>
          </View>
        </View>
      )}
    </View>
  );
}
