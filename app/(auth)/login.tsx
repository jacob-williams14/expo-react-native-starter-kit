import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { H1, P } from "~/components/ui/text";
import { useAuth } from "~/lib/contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    setError(null);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    }
  };

  const handleGuestLogin = async () => {
    setError(null);
    try {
      await signIn("guest@example.com", "guest");
      router.replace("/(tabs)");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Guest login failed");
    }
  };

  return (
    <View className="flex-1 bg-background px-6 justify-center">
      <View className="mb-8">
        <H1 className="text-center mb-2">Welcome</H1>
        <P className="text-center text-neutral-600">
          Sign in or create an account to continue
        </P>
      </View>

      <View className="gap-4">
        <View>
          <P className="mb-2 text-sm font-medium">Email</P>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View>
          <P className="mb-2 text-sm font-medium">Password</P>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        {error && (
          <View className="bg-red-100 p-3 rounded-md">
            <P className="text-red-800 text-sm">{error}</P>
          </View>
        )}

        <View className="gap-3 mt-2">
          <Button
            onPress={handleSignIn}
            disabled={isLoading || !email || !password}
          >
            <P className="text-white font-medium">Sign In</P>
          </Button>

          <Button
            variant="outline"
            onPress={handleGuestLogin}
            disabled={isLoading}
          >
            <P className="font-medium">Continue as Guest</P>
          </Button>
        </View>

        <View className="mt-4">
          <P className="text-xs text-neutral-500 text-center">
            This is a demo auth flow with fake tokens stored in Expo Secure
            Store. Any email/password will work.
          </P>
        </View>
      </View>
    </View>
  );
}
