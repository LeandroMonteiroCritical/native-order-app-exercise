# Mobile Order Management App

A React Native application built with Expo, showcasing a simple order management system with authentication, client information display, and order tracking.

## 🚀 Features

- **Authentication**

  - Phone number-based login (mocked)
  - Session persistence with AsyncStorage
  - Protected routes with automatic navigation

- **Dashboard**

  - Client information display
  - Client classification badge (Gold/Silver/Bronze)
  - Order list with status indicators
  - Real-time order status updates

- **Order Management**

  - Detailed order view with product breakdown
  - Product list with quantities and pricing
  - Order status tracking with visual indicators
  - Total amount calculation and tax breakdown

- **Design System**
  - Centralized color scheme with semantic naming
  - Consistent typography and spacing
  - Reusable UI components
  - Responsive design principles

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based navigation
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local data persistence
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better development experience

## ✨ Key Features

- **Type-Safe Development** - Full TypeScript support for better code quality
- **Responsive Design** - NativeWind for consistent styling across devices
- **Centralized Theming** - Comprehensive color system with semantic naming
- **File-based Routing** - Expo Router for intuitive navigation structure
- **State Management** - React Context for authentication and app state

## 📁 Project Structure

```
src/
  ├── app/                 # Application routes
  │   ├── (auth)/         # Authentication routes
  │   └── (app)/          # Protected app routes
  ├── components/         # Shared UI components
  ├── constants/          # App constants and configuration
  │   └── colors.ts       # Centralized color scheme
  ├── contexts/          # React Context providers
  ├── data/             # Mock data and types
  └── hooks/            # Custom React hooks
      └── useTheme.ts   # Theme and color utilities
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

## 🎨 Design System

### Centralized Color Scheme

The app implements a comprehensive color system for consistent theming:

**Color Categories:**

- **Primary Colors** - Main brand colors (50-900 shades)
- **Secondary Colors** - Supporting colors (50-900 shades)
- **Semantic Colors** - Success, Error, Warning (50-900 shades each)
- **Background Colors** - Primary, Secondary, Tertiary backgrounds
- **Text Colors** - Primary, Secondary, Tertiary, Inverse text
- **Border Colors** - Light, Medium, Dark borders

**Usage Options:**

1. **NativeWind Classes (Recommended)**

   ```tsx
   <View className="bg-primary-500 border-border-light">
     <Text className="text-text-primary">Primary text</Text>
     <Text className="text-text-secondary">Secondary text</Text>
   </View>
   ```

2. **useTheme Hook**

   ```tsx
   const theme = useTheme();
   <View style={{ backgroundColor: theme.semantic.primary }}>
   ```

3. **Direct Import**
   ```tsx
   import { colors } from "../constants/colors";
   ```

**Files:**

- `src/constants/colors.ts` - Color definitions
- `src/hooks/useTheme.ts` - Theme hook for JavaScript usage
- `tailwind.config.js` - NativeWind color configuration

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
