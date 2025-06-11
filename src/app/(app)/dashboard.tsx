import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { mockClient, mockOrders } from "../../data/mock";
import { useAuth } from "../../contexts/auth";
import {
  Badge,
  SafeContainer,
  AnimatedHeader,
  SpeechButton,
} from "../../components";
import { speechTexts } from "../../constants/speechTexts";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from "react-native-reanimated";

function OrderCard({ order, index }) {
  const router = useRouter();
  const { t } = useTranslation();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "info";
    }
  };

  // Animation values
  const scale = useSharedValue(1);
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const handlePress = () => {
    router.push(`/orders/${order.id}`);
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <AnimatedTouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={animatedStyle}
        className="bg-background-secondary p-4 rounded-lg shadow-sm mb-3 border border-border-light"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-sm font-medium text-text-primary">
              {t("orders.orderNumber", { id: order.id })}
            </Text>
            <Text className="text-text-secondary text-xs mt-1">
              {t("orders.placedOn", { date: order.date })}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <SpeechButton
              text={speechTexts.orderSummary(order)}
              variant="icon"
            />
            <Badge
              variant={getStatusVariant(order.status)}
              label={t(`orders.status.${order.status.toLowerCase()}`)}
            />
          </View>
        </View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
}

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <SafeContainer>
      <AnimatedHeader
        mode="dashboard"
        title={`${t("dashboard.welcomeBack")} ${mockClient.name}`}
        badge={{
          variant: mockClient.classification.toLowerCase(),
          label: `${mockClient.classification} ${t("dashboard.member")}`,
        }}
        speechText={speechTexts.welcome(
          mockClient.name,
          mockClient.classification
        )}
        onLogout={logout}
      />
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4 text-text-primary">
          {t("dashboard.orders")}
        </Text>
        {mockOrders.map((order, index) => (
          <OrderCard key={order.id} order={order} index={index} />
        ))}
      </ScrollView>
    </SafeContainer>
  );
}
