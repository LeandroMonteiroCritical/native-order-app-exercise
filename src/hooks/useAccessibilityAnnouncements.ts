import { useSpeech } from "../hooks/useSpeech";
import { Order, Client } from "../data/mock";
import { speechTexts } from "../constants/speechTexts";

export const useAccessibilityAnnouncements = () => {
  const { speak } = useSpeech();

  const announcePage = (pageName: string) => {
    speak(
      speechTexts.navigation[pageName as keyof typeof speechTexts.navigation]
    );
  };

  const announceOrderList = (orders: Order[]) => {
    const orderCount = orders.length;
    const announcement = `You have ${orderCount} orders. ${orders
      .map((order) => speechTexts.orderSummary(order))
      .join(". ")}`;
    speak(announcement);
  };

  const announceClientInfo = (client: Client) => {
    speak(speechTexts.welcome(client.name, client.classification));
  };

  const announceOrderDetails = (order: Order) => {
    const total = order.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const productDetails = order.products
      .map((product) =>
        speechTexts.productDetails(
          product.name,
          product.quantity,
          product.price * product.quantity
        )
      )
      .join(". ");

    const fullAnnouncement = `${speechTexts.orderDetails(
      order,
      total
    )}. Products: ${productDetails}`;
    speak(fullAnnouncement);
  };

  return {
    announcePage,
    announceOrderList,
    announceClientInfo,
    announceOrderDetails,
  };
};
