import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  autoCapitalize = "none",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View className="mb-4">
      {/* Label */}
      <Text className="mb-1 text-gray-700 font-medium">{label}</Text>

      {/* Input */}
      <View
        className={`flex-row items-center border rounded-lg px-4 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <TextInput
          className="flex-1 py-3"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize={autoCapitalize}
        />

        {/* Eye icon for password */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error */}
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
