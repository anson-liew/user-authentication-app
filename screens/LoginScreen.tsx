import Button from "@/components/Button";
import TextRedirect from "@/components/TextRedirect";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormInput from "../components/FormInput";
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

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!authContext) return null;

  const handleLogin = async () => {
    // reset errors
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@gmail\.com$/.test(email)) {
      setEmailError("Email must end with @gmail.com");
      hasError = true;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    const result = await authContext.login(email, password);

    if (!result.success) {
      setPasswordError(result.message || "Login failed");
      return;
    }

    navigation.replace("Home");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-6 bg-white">
            <Text className="text-3xl font-bold text-center mb-6">Login</Text>

            <FormInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              autoCapitalize="none"
              error={emailError}
            />

            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              error={passwordError}
            />

            <Button title="Login" onPress={handleLogin} />
            <TextRedirect
              className="mt-4"
              onPress={() => navigation.replace("Signup")}
            >
              Go to Signup
            </TextRedirect>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
