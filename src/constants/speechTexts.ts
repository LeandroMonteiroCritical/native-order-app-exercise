import { Order, Client } from "../data/mock";

export const speechTexts = {
  // Dashboard texts
  welcome: (clientName: string, classification: string) =>
    `Welcome back ${clientName}. You are a ${classification} member.`,

  // Order texts
  orderSummary: (order: Order) =>
    `Order number ${order.id}, placed on ${order.date}, status is ${order.status}`,

  orderDetails: (order: Order, total: number) =>
    `Order details for order number ${order.id}. This order contains ${
      order.products.length
    } products with a total amount of ${total.toFixed(2)} dollars.`,

  productDetails: (productName: string, quantity: number, price: number) =>
    `${productName}, quantity ${quantity}, price ${price.toFixed(2)} dollars`,

  // Status texts
  orderStatus: (status: string) => {
    switch (status) {
      case "Delivered":
        return "This order has been delivered successfully";
      case "Pending":
        return "This order is pending and will be processed soon";
      case "Cancelled":
        return "This order has been cancelled";
      default:
        return `Order status is ${status}`;
    }
  },

  // Navigation texts
  navigation: {
    dashboard: "You are on the dashboard page",
    orderDetails: "You are viewing order details",
    backToDashboard: "Going back to dashboard",
  },

  // Accessibility texts
  accessibility: {
    speakOrder: "Tap to hear order details",
    speakProduct: "Tap to hear product information",
    stopSpeaking: "Tap to stop speech",
  },
};

export type SpeechTextKey = keyof typeof speechTexts;
