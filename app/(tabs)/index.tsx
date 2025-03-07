import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "../../styles/auth.style.js";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={style.container}>
      <Link href="/notifications">Feed screen in tabs</Link>
    </View>
  );
}
