# Mobile Order Management App

A React Native application built with Expo, showcasing a simple order management system with authentication, client information display, and order tracking.

## 🚀 Features

- **Authentication**

  - Phone number-based login (mocked)
  - Session persistence with AsyncStorage
  - Protected routes with automatic navigation

- **Dashboard**

  - Client information display with animated header
  - Client classification badge (Gold/Silver/Bronze)
  - Order list with status indicators and smooth animations
  - Real-time order status updates
  - Staggered card animations for enhanced user experience

- **Order Management**

  - Detailed order view with product breakdown
  - Product list with quantities and pricing
  - Order status tracking with visual indicators
  - Total amount calculation and tax breakdown
  - Smooth fade-in animations for content

- **Text-to-Speech Accessibility**

  - 🔊 Comprehensive voice narration throughout the app
  - Welcome messages with client name and classification
  - Order summaries with status and product counts
  - Detailed product information spoken aloud
  - Multi-language support (English, Spanish, etc.)
  - Haptic feedback for enhanced accessibility
  - Three speech button variants (primary, secondary, icon)
  - Global speech context with state management
  - Centralized speech content management

- **Design System**
  - Centralized color scheme with semantic naming
  - Consistent typography and spacing
  - Reusable UI components with smooth animations
  - Responsive design principles
  - Dark theme with consistent background handling

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based navigation
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations and gestures
- [Expo Speech](https://docs.expo.dev/versions/latest/sdk/speech/) - Text-to-speech functionality
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) - Tactile feedback for accessibility
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local data persistence
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better development experience

## ✨ Key Features

- **Type-Safe Development** - Full TypeScript support for better code quality
- **Responsive Design** - NativeWind for consistent styling across devices
- **Smooth Animations** - React Native Reanimated for enhanced user experience
- **Centralized Theming** - Comprehensive color system with semantic naming
- **File-based Routing** - Expo Router for intuitive navigation structure
- **State Management** - React Context for authentication and app state
- **Accessibility Features** - Comprehensive text-to-speech with haptic feedback
- **Multi-language Support** - TTS in multiple languages with centralized content
- **Consistent UI** - Dark theme with proper background handling and no visual glitches

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

   - View client information with animated header
   - Browse order list with smooth card animations
   - Click on orders for details with consistent navigation

3. **Order Details**
   - View product list with fade-in animations
   - Check order status with visual indicators
   - See total amount calculation
   - Navigate back with consistent right-to-left animation
   - 🔊 Use speech buttons to hear order and product details

4. **Text-to-Speech Features**
   - 🔊 Tap any speech button to hear content read aloud
   - Welcome messages announce client name and classification
   - Order cards can be spoken with status and basic info
   - Detailed product information with pricing
   - Multi-language support (try Spanish: "Bienvenido...")
   - Haptic feedback confirms speech button activation

## 🎨 UI Components

The app uses a set of reusable components built with NativeWind and React Native Reanimated:

- `Button` - Custom button with various styles and states
- `Badge` - Status and classification indicators
- `Input` - Form input fields
- `SafeContainer` - Safe area wrapper for screens
- `AnimatedHeader` - Dynamic header with smooth animations and context-aware content
- `SpeechButton` - Text-to-speech button with three variants and haptic feedback
- `TextToSpeechDemo` - Comprehensive demo component showcasing TTS features

## 🎨 Design System

### Centralized Color Scheme

The app implements a comprehensive color system with a **single source of truth** approach:

**Color Categories:**

- **Primary Colors** - Main brand colors (50-900 shades)
- **Secondary Colors** - Supporting colors (50-900 shades)
- **Semantic Colors** - Success, Error, Warning (50-900 shades each)
- **Background Colors** - Primary, Secondary, Tertiary backgrounds
- **Text Colors** - Primary, Secondary, Tertiary, Inverse text
- **Border Colors** - Light, Medium, Dark borders

**Single Source Architecture:**

- All colors are defined once in `src/constants/colors.ts`
- `tailwind.config.js` imports colors from the constants file
- No duplication - update colors in one place, they update everywhere

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

- `src/constants/colors.ts` - Single source of truth for all colors
- `src/hooks/useTheme.ts` - Theme hook for JavaScript usage
- `tailwind.config.js` - Imports colors from constants (no duplication)

## 🗣️ Text-to-Speech Architecture

### Comprehensive Accessibility System

The app implements a full-featured text-to-speech system designed for accessibility:

**Core Components:**

- **`useSpeech` Hook** - Core TTS functionality with state management
- **`SpeechButton` Component** - Reusable speech button with three variants
- **`SpeechProvider` Context** - Global speech state management
- **`speechTexts` Constants** - Centralized speech content management

**Speech Button Variants:**

1. **Icon Variant** (`variant="icon"`) - Compact 🔊/⏸ button for inline use
2. **Primary Variant** (`variant="primary"`) - Full button with "Listen/Stop" text
3. **Secondary Variant** (`variant="secondary"`) - Outlined button style

**Features:**

- **Multi-language Support** - Configurable language per speech instance
- **Haptic Feedback** - Tactile confirmation for accessibility
- **Animation Integration** - Smooth scaling animations with Reanimated
- **State Management** - Global speech state prevents conflicts
- **Error Handling** - Graceful fallbacks for speech failures
- **Accessibility Labels** - Screen reader compatible

**Usage Example:**

```tsx
import { SpeechButton } from "../components";
import { speechTexts } from "../constants/speechTexts";

// Basic usage
<SpeechButton 
  text="Hello world" 
  variant="icon" 
/>

// Advanced usage with custom language
<SpeechButton 
  text="Bienvenido a nuestra aplicación"
  language="es-ES"
  variant="primary"
/>

// Using centralized speech texts
<SpeechButton 
  text={speechTexts.welcome(clientName, classification)}
  variant="secondary"
/>
```

**Files:**

- `src/hooks/useSpeech.ts` - Core TTS hook with state management
- `src/components/SpeechButton.tsx` - Reusable speech button component
- `src/contexts/speech.tsx` - Global speech context provider
- `src/constants/speechTexts.ts` - Centralized speech content
- `src/hooks/useAccessibilityAnnouncements.ts` - Accessibility helper functions
- `src/components/TextToSpeechDemo.tsx` - Demo showcasing all TTS features

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
