import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
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
import Toast from "react-native-toast-message";
import { AuthContext } from "../contexts/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

export default function SignupScreen({ navigation }: Props) {
  const authContext = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [loading, setLoading] = useState(false);

  if (!authContext) return null;

  const handleSignup = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let hasError = false;

    if (!name) {
      setNameError("Name is required");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      setEmailError("Invalid Email format, must end with @gmail.com");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    const result = await authContext.signup(name, email, password);

    if (!result.success) {
      setLoading(false);
      setPasswordError(result.message || "Signup failed");
      return;
    }

    setTimeout(() => {
      setLoading(false);

      Toast.show({
        type: "success",
        text1: "Signup successfully!",
        position: "top",
        visibilityTime: 2000,
      });

      navigation.replace("Home");
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-6 bg-white">
            <Text className="text-3xl font-bold text-center mb-6">Signup</Text>

            {generalError ? (
              <Text className="text-red-500 text-center mb-3">
                {generalError}
              </Text>
            ) : null}

            <FormInput
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              error={nameError}
            />

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

            <Button
              title="Signup"
              className="mt-5"
              onPress={handleSignup}
              loading={loading}
            />

            <TextRedirect
              className="mt-4"
              onPress={() => navigation.replace("Login")}
            >
              Go to Login
            </TextRedirect>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
