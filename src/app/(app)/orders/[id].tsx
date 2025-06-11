import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { mockOrders } from "../../../data/mock";
import {
  SafeContainer,
  AnimatedHeader,
  SpeechButton,
  Button,
} from "../../../components";
import { speechTexts } from "../../../constants/speechTexts";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OrderDetailsScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = mockOrders.find((o) => o.id === id);

  const currencySymbol = "$";
  const colonSymbol = ":";

  if (!order) {
    return (
      <SafeContainer>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-xl font-medium text-text-primary mb-4">
            {t("orders.orderNotFound")}
          </Text>
          <Button variant="outline" onPress={() => router.back()}>
            <Text>{t("common.back")}</Text>
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
        title={t("orders.orderNumber", { id: order.id })}
        subtitle={t("orders.placedOn", { date: order.date })}
        badge={{
          variant: getStatusVariant(order.status),
          label: t(`orders.status.${order.status.toLowerCase()}`),
        }}
        showBackButton={true}
        onBackPress={() => router.push("/dashboard")}
      />
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-text-primary">
            {t("orders.products")}
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
                  {t("common.quantity")}
                  {colonSymbol} {product.quantity}
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
                  {currencySymbol}
                  {(product.price * product.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <View className="mt-4 pt-4 border-t border-border-light">
            <View className="flex-row justify-between">
              <Text className="font-semibold text-text-primary">
                {t("common.total")}
              </Text>
              <Text className="font-semibold text-text-primary">
                {currencySymbol}
                {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeContainer>
  );
}
