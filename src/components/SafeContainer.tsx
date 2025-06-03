import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SafeContainer({
  children,
  className = "",
}: SafeContainerProps) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 ${className}`}
      style={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      {children}
    </View>
  );
}
