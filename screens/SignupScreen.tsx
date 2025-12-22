import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import TextRedirect from "@/components/TextRedirect";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
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
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  if (!authContext) return null;

  const handleSignup = async () => {
    const newErrors: typeof errors = {};

    if (!name) newErrors.name = "Name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      newErrors.email = "Invalid Email format, must end with @gmail.com";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const result = await authContext.signup(name, email, password);

    if (!result.success) {
      setErrors({ general: result.message });
      return;
    }

    navigation.replace("Home");
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-6">Signup</Text>

      {errors.general && (
        <Text className="text-red-500 text-center mb-3">{errors.general}</Text>
      )}

      <FormInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        error={errors.name}
      />

      <FormInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="example@gmail.com"
        error={errors.email}
      />

      <FormInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your name password"
        secureTextEntry
        error={errors.password}
      />

      <Button title="Signup" onPress={handleSignup} />
      <TextRedirect onPress={() => navigation.replace("Login")}>
        Go to Login
      </TextRedirect>
    </View>
  );
}
