import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

import AppHeader from "@/components/AppHeader";

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16302A",
  },
  content: {
    flex: 1,
  },
});
