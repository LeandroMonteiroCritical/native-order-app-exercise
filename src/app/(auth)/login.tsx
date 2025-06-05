import React, { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../contexts/auth";
import { Button, Input, SafeContainer } from "../../components";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  async function handleLogin() {
    try {
      setError("");
      await login(phone);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }
  return (
    <SafeContainer>
      <View className="flex-1 justify-center items-center p-4 bg-background-primary">
        <View className="w-full max-w-sm space-y-6">
          <View className="space-y-5 text-center">
            <Text className="text-3xl font-bold tracking-tighter text-text-primary">
              Welcome back
            </Text>
            <Text className="text-text-secondary">
              Enter your phone number to continue
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              label="Phone number"
              placeholder="+1234567890"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              error={error}
            />
            <Button
              onPress={handleLogin}
              loading={isLoading}
              disabled={!phone.trim()}
              fullWidth
              className="mt-4 bg-primary-500"
            >
              <Text>Continue</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeContainer>
  );
}
