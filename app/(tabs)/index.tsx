import { TouchableOpacity, View, Text } from "react-native";
import { style } from "@/styles/auth.style";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: "white" }}>Signout</Text>
      </TouchableOpacity>
    </View>
  );
}
