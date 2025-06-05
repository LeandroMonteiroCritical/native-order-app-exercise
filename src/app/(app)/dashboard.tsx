import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { mockClient, mockOrders } from "../../data/mock";
import { useAuth } from "../../contexts/auth";
import { Badge, Button, SafeContainer, AnimatedHeader } from "../../components";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";

function OrderCard({ order, index }) {
  const router = useRouter();
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
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <AnimatedTouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          console.log("Navigating to order:", order.id);
          router.push(`/orders/${order.id}`);
        }}
        style={animatedStyle}
        className="bg-background-secondary p-4 rounded-lg shadow-sm mb-3 border border-border-light"
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-medium text-text-primary">
              Order #{order.id}
            </Text>
            <Text className="text-text-secondary text-xs mt-1">
              {order.date}
            </Text>
          </View>
          <Badge
            variant={getStatusVariant(order.status)}
            label={order.status}
          />
        </View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
}

export default function DashboardScreen() {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <SafeContainer>
      <AnimatedHeader
        mode="dashboard"
        title={mockClient.name}
        badge={{
          variant: mockClient.classification.toLowerCase(),
          label: mockClient.classification,
        }}
        onLogout={logout}
      />
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4 text-text-primary">
          Recent Orders
        </Text>
        {mockOrders.map((order, index) => (
          <OrderCard key={order.id} order={order} index={index} />
        ))}
      </ScrollView>
    </SafeContainer>
  );
}
