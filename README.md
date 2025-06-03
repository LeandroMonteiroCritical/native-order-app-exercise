# Mobile Order Management App

A React Native application built with Expo, showcasing a simple order management system with authentication, client information display, and order tracking.

## 🚀 Features

- **Authentication**

  - Phone number-based login (mocked)
  - Session persistence with AsyncStorage
  - Protected routes

- **Dashboard**

  - Client information display
  - Client classification badge (Gold/Silver/Bronze)
  - Order list with status indicators

- **Order Management**
  - Detailed order view
  - Product list with quantities
  - Order status tracking
  - Total amount calculation

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based navigation
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local data persistence

## 📁 Project Structure

```
src/
  ├── app/                 # Application routes
  │   ├── (auth)/         # Authentication routes
  │   └── (app)/          # Protected app routes
  ├── components/         # Shared UI components
  ├── contexts/          # React Context providers
  └── data/             # Mock data and types
```

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/LeandroMonteiroCritical/native-order-app-exercise.git
   cd native-order-app-exercise
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your device**
   - Install Expo Go on your device
   - Scan the QR code from the terminal
   - Or run on simulator/emulator: `npm run ios` or `npm run android`

## 📱 Usage

1. **Login**

   - Use phone number: `+1234567890` (mock credentials)
   - Wait for the simulated authentication

2. **Dashboard**

   - View client information
   - Browse order list
   - Click on orders for details

3. **Order Details**
   - View product list
   - Check order status
   - See total amount

## 🎨 UI Components

The app uses a set of reusable components built with NativeWind:

- `Button` - Custom button with various styles and states
- `Badge` - Status and classification indicators
- `Input` - Form input fields
- `SafeContainer` - Safe area wrapper for screens

## 💾 Data Persistence

The app uses AsyncStorage for:

- Storing authentication state
- Persisting session information

## 🧪 Mock Data

The app includes mock data for:

- Client information
- Order list
- Product details

## 📚 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is MIT licensed.
