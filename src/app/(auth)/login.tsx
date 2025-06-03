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
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <View className="w-full max-w-sm space-y-6">
          <View className="space-y-2 text-center">
            <Text className="text-3xl font-bold tracking-tighter">
              Welcome back
            </Text>
            <Text className="text-gray-500">
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
            >
              Continue
            </Button>
          </View>
        </View>
      </View>
    </SafeContainer>
  );
}
