import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SpeechButton } from "../components";
import { speechTexts } from "../constants/speechTexts";
import { mockClient, mockOrders } from "../data/mock";

export const TextToSpeechDemo = () => {
  const sampleOrder = mockOrders[0];
  const total = sampleOrder.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <ScrollView className="flex-1 p-4 bg-background-primary">
      <Text className="text-2xl font-bold text-text-primary mb-6">
        Text-to-Speech Demo
      </Text>

      <View className="space-y-4">
        {/* Welcome Speech */}
        <View className="bg-background-secondary p-4 rounded-lg border border-border-light">
          <Text className="text-lg font-semibold text-text-primary mb-2">
            Welcome Message
          </Text>
          <SpeechButton
            text={speechTexts.welcome(
              mockClient.name,
              mockClient.classification
            )}
            variant="primary"
          />
        </View>

        {/* Order Summary Speech */}
        <View className="bg-background-secondary p-4 rounded-lg border border-border-light">
          <Text className="text-lg font-semibold text-text-primary mb-2">
            Order Summary
          </Text>
          <SpeechButton
            text={speechTexts.orderSummary(sampleOrder)}
            variant="secondary"
          />
        </View>

        {/* Order Details Speech */}
        <View className="bg-background-secondary p-4 rounded-lg border border-border-light">
          <Text className="text-lg font-semibold text-text-primary mb-2">
            Full Order Details
          </Text>
          <SpeechButton
            text={speechTexts.orderDetails(sampleOrder, total)}
            variant="primary"
          />
        </View>

        {/* Product Details Speech */}
        <View className="bg-background-secondary p-4 rounded-lg border border-border-light">
          <Text className="text-lg font-semibold text-text-primary mb-2">
            Product Information
          </Text>
          <SpeechButton
            text={speechTexts.productDetails(
              sampleOrder.products[0].name,
              sampleOrder.products[0].quantity,
              sampleOrder.products[0].price * sampleOrder.products[0].quantity
            )}
            variant="secondary"
          />
        </View>

        {/* Icon variant */}
        <View className="bg-background-secondary p-4 rounded-lg border border-border-light">
          <Text className="text-lg font-semibold text-text-primary mb-2">
            Icon Speech Button
          </Text>
          <SpeechButton
            text="This is an icon-style speech button with compact design"
            variant="icon"
          />
        </View>

        {/* Custom speech with different language */}
        <View className="bg-background-secondary p-4 rounded-lg border border-border-light">
          <Text className="text-lg font-semibold text-text-primary mb-2">
            Custom Text (Spanish)
          </Text>
          <SpeechButton
            text="Bienvenido a nuestra aplicación de gestión de pedidos"
            language="es-ES"
            variant="primary"
          />
        </View>
      </View>
    </ScrollView>
  );
};
