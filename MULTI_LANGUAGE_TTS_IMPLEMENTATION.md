# Multi-Language Text-to-Speech Implementation

## Overview

This document outlines the implementation of multi-language text-to-speech (TTS) functionality in the React Native Order App. The system automatically adapts to the user's selected language and provides natural speech synthesis in English, French, and Portuguese.

## Architecture

### 1. Language Detection & Mapping (`src/constants/ttsLanguages.ts`)

```typescript
export const getTTSLanguage = (languageCode: string): string => {
  const languageMap: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    pt: "pt-BR",
  };
  return languageMap[languageCode] || "en-US";
};
```

**Key Features:**

- Maps i18n language codes to TTS-specific locale codes
- Provides fallback to English for unsupported languages
- Language-specific speech parameters (pitch, rate) for natural pronunciation

### 2. Intelligent Speech Button (`src/components/SpeechButton.tsx`)

The `SpeechButton` component automatically detects the current app language and applies appropriate TTS settings:

```typescript
const handlePress = async () => {
  const currentLang = language || getCurrentLanguage();
  const ttsOptions = getTTSOptions(currentLang);
  await speak(text, ttsOptions);
};
```

**Features:**

- Auto-detects current language from i18n context
- Applies language-specific speech parameters
- Supports manual language override
- Haptic feedback and visual animations

### 3. Translatable Speech Content (`src/constants/speechTexts.ts`)

All speech content is now fully translatable and uses the i18n system:

```typescript
export const speechTexts = {
  welcome: (clientName: string, classification: string) => {
    const welcomeText = i18n.t("dashboard.welcomeBack", { name: clientName });
    const memberText = i18n.t("dashboard.member");
    return `${welcomeText}. ${i18n.t("speech.youAre")} ${classification} ${memberText}.`;
  },
  // ... more speech functions
};
```

## Supported Languages

| Language   | TTS Code | Speech Parameters      |
| ---------- | -------- | ---------------------- |
| English    | `en-US`  | Pitch: 1.0, Rate: 1.0  |
| French     | `fr-FR`  | Pitch: 1.1, Rate: 0.9  |
| Portuguese | `pt-BR`  | Pitch: 1.0, Rate: 0.95 |

## Translation Keys

### Speech-Specific Keys (Added to all language files)

```json
{
  "speech": {
    "youAre": "You are a",
    "orderNumber": "Order number {{id}}",
    "placedOn": "placed on {{date}}",
    "statusIs": "status is {{status}}",
    "orderDetails": "Order details for order number {{id}}",
    "containsProducts": "This order contains {{count}} product",
    "containsProducts_plural": "This order contains {{count}} products",
    "totalAmount": "with a total amount of {{amount}} dollars",
    "productDetails": "{{name}}, quantity {{quantity}}, price {{price}} dollars",
    "orderDelivered": "This order has been delivered successfully",
    "orderPending": "This order is pending and will be processed soon",
    "orderCancelled": "This order has been cancelled"
  }
}
```

## Implementation Strategy

### ✅ **Simple & Effective Approach**

1. **Single Source of Truth**: Uses existing i18n system for all speech content
2. **Automatic Language Detection**: Speech adapts when user changes app language
3. **Language-Specific Optimization**: Different speech parameters per language
4. **Zero Configuration**: No additional setup required for new languages

### Usage Examples

#### Basic Usage (Auto-detects current language)

```tsx
<SpeechButton text={speechTexts.welcome("John", "Premium")} />
```

#### With Language Override

```tsx
<SpeechButton text={speechTexts.orderSummary(order)} language="fr-FR" />
```

#### Dynamic Content

```tsx
const welcomeText = speechTexts.welcome(user.name, user.tier);
<SpeechButton text={welcomeText} />;
```

## Benefits

### 🎯 **User Experience**

- Natural pronunciation in user's preferred language
- Consistent with app's UI language selection
- Improved accessibility for international users

### 🔧 **Developer Experience**

- Minimal code changes required
- Leverages existing translation infrastructure
- Easy to add new languages
- Type-safe implementation

### 🌐 **Internationalization**

- Seamless integration with i18n system
- Pluralization support for dynamic content
- Consistent terminology across UI and speech

## Future Enhancements

1. **Voice Selection**: Allow users to choose different voices per language
2. **Speed Controls**: User-configurable speech rate settings
3. **Offline Support**: Pre-download language packs for offline TTS
4. **Regional Variants**: Support for pt-PT, en-GB, etc.
5. **Custom Pronunciations**: Override pronunciation for specific terms

## Testing

The implementation supports easy testing across languages:

1. Change app language using the flag selector
2. Tap any speech button to hear content in the selected language
3. Verify pronunciation quality and speech parameters
4. Test dynamic content with different data sets

This implementation provides a robust foundation for multi-language text-to-speech functionality while maintaining simplicity and leveraging existing internationalization infrastructure.
