// /components/Button.tsx
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgColor?: string; // 背景色
  textColor?: string; // 文字颜色
}

export default function Button({
  title,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`${bgColor} py-3 rounded-lg mt-2 ${className}`}
      {...props}
    >
      <Text className={`${textColor} text-center font-semibold text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
