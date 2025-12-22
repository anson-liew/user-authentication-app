import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  style?: ViewStyle;
  loading?: boolean;
}

export default function Button({
  title,
  bgColor = "#3366FF",
  textColor = "#FFFFFF",
  style,
  loading = false,
  ...props
}: ButtonProps) {
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = setInterval(() => {
        setSpin((prev) => (prev + 30) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        opacity: loading ? 0.5 : 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 12,
        ...style,
      }}
      disabled={loading || props.disabled}
      {...props}
    >
      <Text style={{ color: textColor, fontSize: 16, fontWeight: "600" }}>
        {title}
      </Text>
      {loading && (
        <Icon
          name="autorenew"
          size={20}
          color={textColor}
          style={{
            marginLeft: 8,
            transform: [{ rotate: `${spin}deg` }],
          }}
        />
      )}
    </TouchableOpacity>
  );
}
