import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { mockClient, mockOrders } from "../../data/mock";
import { useAuth } from "../../contexts/auth";
import { Badge, Button, SafeContainer } from "../../components";

function OrderCard({ order }) {
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
    <Link href={`/orders/${order.id}`} asChild>
      <TouchableOpacity className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-medium">Order #{order.id}</Text>
            <Text className="text-gray-500 text-xs mt-1">{order.date}</Text>
          </View>
          <Badge
            variant={getStatusVariant(order.status)}
            label={order.status}
          />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function DashboardScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <SafeContainer className="bg-gray-50">
      <View className="bg-white border-b border-gray-200">
        <View className="px-4 py-4 flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <Text className="text-xl font-bold">{mockClient.name}</Text>
            <Badge
              variant={mockClient.classification.toLowerCase() as any}
              label={mockClient.classification}
            />
          </View>
          <Button variant="ghost" onPress={logout}>
            Logout
          </Button>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4">Recent Orders</Text>
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </SafeContainer>
  );
}
