import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { mockOrders } from "../../../data/mock";
import {
  Badge,
  Button,
  SafeContainer,
  AnimatedHeader,
  SpeechButton,
} from "../../../components";
import { speechTexts } from "../../../constants/speechTexts";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    return (
      <SafeContainer>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-xl font-medium text-text-primary mb-4">
            Order not found
          </Text>
          <Button variant="outline" onPress={() => router.back()}>
            <Text>Go Back</Text>
          </Button>
        </View>
      </SafeContainer>
    );
  }

  const total = order.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

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
  return (
    <SafeContainer>
      <AnimatedHeader
        mode="order-details"
        title={`Order #${order.id}`}
        subtitle={order.date}
        badge={{
          variant: getStatusVariant(order.status),
          label: order.status,
        }}
        showBackButton={true}
        onBackPress={() => router.push("/dashboard")}
      />
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-text-primary">
            Products
          </Text>
          <SpeechButton
            text={speechTexts.orderDetails(order, total)}
            variant="secondary"
          />
        </View>
        <Animated.View
          entering={FadeIn.duration(600)}
          className="bg-background-secondary rounded-lg p-4 shadow-sm border border-border-light"
        >
          {order.products.map((product, index) => (
            <View
              key={index}
              className={`flex-row justify-between items-center py-3 ${
                index !== order.products.length - 1
                  ? "border-b border-border-light"
                  : ""
              }`}
            >
              <View className="flex-1">
                <Text className="font-medium text-text-primary">
                  {product.name}
                </Text>
                <Text className="text-text-secondary text-sm">
                  Quantity: {product.quantity}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <SpeechButton
                  text={speechTexts.productDetails(
                    product.name,
                    product.quantity,
                    product.price * product.quantity
                  )}
                  variant="icon"
                />
                <Text className="text-text-primary">
                  ${(product.price * product.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <View className="mt-4 pt-4 border-t border-border-light">
            <View className="flex-row justify-between">
              <Text className="font-semibold text-text-primary">Total</Text>
              <Text className="font-semibold text-text-primary">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeContainer>
  );
}
