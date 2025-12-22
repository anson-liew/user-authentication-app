// /components/Button.tsx
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

export default function Button({
  title,
  bgColor = "#3366FF",
  textColor = "#FFFFFF",
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className="py-3 rounded-lg mt-2"
      style={{
        backgroundColor: bgColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        ...style,
      }}
      {...props}
    >
      <Text
        className="text-center font-semibold text-lg"
        style={{ color: textColor }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
