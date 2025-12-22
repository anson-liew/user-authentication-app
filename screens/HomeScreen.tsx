// /screens/HomeScreen.tsx
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) return null;

  const handleLogout = () => {
    authContext.logout();
    navigation.replace("Login");
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">
        Welcome, {authContext.user.name}!
      </Text>

      <Text className="text-lg text-gray-600 mb-8">
        {authContext.user.email}
      </Text>

      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-lg">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
