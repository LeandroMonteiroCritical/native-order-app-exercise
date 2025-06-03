import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { mockOrders } from "../../../data/mock";
import { Badge, Button, SafeContainer } from "../../../components";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <SafeContainer className="bg-white">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-xl font-medium text-gray-900 mb-4">
            Order not found
          </Text>
          <Button variant="outline" onPress={() => router.back()}>
            Go Back
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
    <SafeContainer className="bg-gray-50">
      <View className="bg-white border-b border-gray-200">
        <View className="px-4 py-4">
          <Button
            variant="ghost"
            onPress={() => router.back()}
            className="mb-4 self-start -ml-2"
          >
            ← Back to Orders
          </Button>

          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold">Order #{order.id}</Text>
            <Badge
              variant={getStatusVariant(order.status)}
              label={order.status}
            />
          </View>
          <Text className="text-gray-500 mt-1">{order.date}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4">Products</Text>
        <View className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          {order.products.map((product, index) => (
            <View
              key={index}
              className={`flex-row justify-between py-3 ${
                index !== order.products.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="flex-1">
                <Text className="font-medium">{product.name}</Text>
                <Text className="text-gray-500 text-sm">
                  Quantity: {product.quantity}
                </Text>
              </View>
              <Text className="text-gray-900">
                ${(product.price * product.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row justify-between">
              <Text className="font-semibold">Total</Text>
              <Text className="font-semibold">${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeContainer>
  );
}
