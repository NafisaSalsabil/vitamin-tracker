import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    TextInput,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

// IMPORTANT: 'localhost' only works when testing in a web browser.
// If you're testing on a physical phone via Expo Go, replace this with
// your computer's LAN IP address, e.g. 'http://192.168.1.42:3000'
// Find it by running 'ipconfig' on Windows and looking for IPv4 Address.
const API_URL = "http://localhost:3000/api/ai-symptoms";

export default function CheckInScreen() {
  const colorScheme = useColorScheme();
  const [symptomText, setSymptomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!symptomText.trim()) {
      setError("Please describe your symptoms first.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptomText: symptomText.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push({
        pathname: "/results",
        params: { result: data.result, symptoms: symptomText.trim() },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not reach the server. Make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Start Check-in
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Describe what you're feeling — tiredness, aches, mood, sleep, anything
        physical or mental you've noticed lately.
      </ThemedText>

      <TextInput
        style={[
          styles.input,
          {
            color: colorScheme === "dark" ? "#fff" : "#000",
            borderColor: colorScheme === "dark" ? "#3A5C52" : "#C8E8E0",
          },
        ]}
        multiline
        numberOfLines={5}
        placeholder="e.g. fatigue, brittle nails, low mood..."
        placeholderTextColor={colorScheme === "dark" ? "#999" : "#888"}
        value={symptomText}
        onChangeText={setSymptomText}
        editable={!loading}
      />

      {error && <ThemedText style={styles.error}>{error}</ThemedText>}

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>Get Insights</ThemedText>
        )}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    gap: 12,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 16,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
  },
  error: {
    color: "#D14343",
  },
  button: {
    backgroundColor: "#2E7D6B",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});