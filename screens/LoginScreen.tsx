// /screens/LoginScreen.tsx
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!authContext) return null;

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    const result = await authContext.login(email, password);
    if (!result.success) setError(result.message || "Login failed");
    else navigation.replace("Home");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center p-5 bg-white">
            <Text className="text-2xl font-bold text-center mb-5">Login</Text>
            {error ? (
              <Text className="text-red-500 text-center mb-3">{error}</Text>
            ) : null}

            <TextInput
              className="border border-gray-300 rounded p-3 mb-3"
              placeholder="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <View className="flex-row items-center border border-gray-300 rounded mb-3">
              <TextInput
                className="flex-1 p-3"
                placeholder="Password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="px-3"
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <Button title="Login" onPress={handleLogin} />

            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              className="mt-3"
            >
              <Text className="text-blue-500 text-center">Go to Signup</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
