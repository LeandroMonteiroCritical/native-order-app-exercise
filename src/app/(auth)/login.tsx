import React, { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../contexts/auth";
import { Button, Input, SafeContainer } from "../../components";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  ZoomIn,
} from "react-native-reanimated";

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
        <Animated.View
          entering={FadeInUp.duration(600)}
          className="w-full max-w-sm space-y-6"
        >
          <Animated.View
            entering={SlideInLeft.delay(200).duration(500)}
            className="space-y-5 text-center"
          >
            <Text className="text-3xl font-bold tracking-tighter text-text-primary">
              Welcome back
            </Text>
            <Text className="text-text-secondary mt-4">
              Enter your phone number to continue
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            className="space-y-4"
          >
            <Input
              label="Phone number"
              placeholder="+1234567890"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              error={error}
            />
            <Animated.View entering={ZoomIn.delay(600).duration(400)}>
              <Button
                onPress={handleLogin}
                loading={isLoading}
                disabled={!phone.trim()}
                fullWidth
                className="mt-4 bg-primary-500"
              >
                <Text>Continue</Text>
              </Button>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeContainer>
  );
}
