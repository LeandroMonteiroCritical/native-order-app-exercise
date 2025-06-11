import { Order } from "../data/mock";
import i18n from "../locales/i18n";

export const speechTexts = {
  // Dashboard texts - now uses translations
  welcome: (clientName: string, classification: string) => {
    const welcomeText = i18n.t("dashboard.welcomeBack", { name: clientName });
    const memberText = i18n.t("dashboard.member");
    return `${welcomeText}. ${i18n.t("speech.youAre")} ${classification} ${memberText}.`;
  },

  // Order texts - now uses translations
  orderSummary: (order: Order) => {
    const orderText = i18n.t("speech.orderNumber", { id: order.id });
    const placedText = i18n.t("speech.placedOn", { date: order.date });
    const statusText = i18n.t("speech.statusIs", {
      status: i18n.t(`orders.status.${order.status.toLowerCase()}`),
    });
    return `${orderText}, ${placedText}, ${statusText}`;
  },
  orderDetails: (order: Order, total: number) => {
    const detailsText = i18n.t("speech.orderDetails", { id: order.id });
    const productsText = i18n.t("speech.containsProducts", {
      count: order.products.length,
    });
    const totalText = i18n.t("speech.totalAmount", {
      amount: total.toFixed(2),
    });
    return `${detailsText}. ${productsText} ${totalText}.`;
  },

  productDetails: (productName: string, quantity: number, price: number) =>
    i18n.t("speech.productDetails", {
      name: productName,
      quantity: quantity,
      price: price.toFixed(2),
    }),

  // Status texts - now uses translations
  orderStatus: (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return i18n.t("speech.orderDelivered");
      case "pending":
        return i18n.t("speech.orderPending");
      case "cancelled":
        return i18n.t("speech.orderCancelled");
      default:
        return i18n.t("speech.statusIs", { status: status });
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
