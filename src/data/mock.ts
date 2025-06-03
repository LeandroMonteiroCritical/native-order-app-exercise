export interface Client {
  id: string;
  name: string;
  classification: "Gold" | "Silver" | "Bronze";
  phone: string;
}

export interface Order {
  id: string;
  clientId: string;
  date: string;
  status: "Pending" | "Delivered" | "Cancelled";
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

export const mockClient: Client = {
  id: "1",
  name: "John Doe",
  classification: "Gold",
  phone: "+1234567890",
};

export const mockOrders: Order[] = [
  {
    id: "1",
    clientId: "1",
    date: "2024-03-01",
    status: "Delivered",
    products: [
      { name: "Product 1", price: 99.99, quantity: 2 },
      { name: "Product 2", price: 49.99, quantity: 1 },
    ],
  },
  {
    id: "2",
    clientId: "1",
    date: "2024-03-15",
    status: "Pending",
    products: [{ name: "Product 3", price: 199.99, quantity: 1 }],
  },
  {
    id: "3",
    clientId: "1",
    date: "2024-03-20",
    status: "Cancelled",
    products: [
      { name: "Product 1", price: 99.99, quantity: 1 },
      { name: "Product 4", price: 149.99, quantity: 2 },
    ],
  },
];
