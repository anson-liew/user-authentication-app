// /components/TextRedirect.tsx
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface TextRedirectProps extends TouchableOpacityProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextRedirect({
  children,
  className = "",
  ...props
}: TextRedirectProps) {
  return (
    <TouchableOpacity {...props}>
      <Text className={`text-center text-[#3366FF] mt-4 ${className}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
