import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  forest: "#16302A",
  forestDeep: "#0F211C",
  parchment: "#F6EFE4",
  gold: "#E8A33D",
  rust: "#C1493D",
  sage: "#8FAE8B",
  textPrimary: "#FBF7F0",
  textMuted: "rgba(251, 247, 240, 0.65)",
};

const SPECTRUM = [
  { label: "D", color: COLORS.gold },
  { label: "C", color: COLORS.rust },
  { label: "B12", color: "#D9C36A" },
  { label: "Fe", color: "#B85C38" },
  { label: "Mg", color: COLORS.sage },
  { label: "K", color: "#6B8F71" },
];

const FEATURES = [
  { color: COLORS.gold, text: "Weighted by your sun exposure and region" },
  { color: COLORS.rust, text: "Accounts for diet and ethnic background" },
  { color: COLORS.sage, text: "Stored only on your device" },
];

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>HOME · NUTRIENT CHECK-IN</Text>

        <View style={styles.spectrumBar}>
          {SPECTRUM.map((item) => (
            <View key={item.label} style={styles.spectrumSegment}>
              <View
                style={[styles.spectrumBlock, { backgroundColor: item.color }]}
              />
              <Text style={styles.spectrumLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.headline}>What's your body been asking for?</Text>

        <Text style={styles.body}>
          Answer a few quick questions about you and how you've been feeling.
          We'll map it against known deficiency patterns — by diet, region, and
          background — to give you a real starting point.
        </Text>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => router.push("/checkin")}
        >
          <Text style={styles.ctaText}>Start My Check-in</Text>
        </Pressable>
        {/*<Text style={styles.ctaCaption}>~60 SECONDS · 7 QUESTIONS</Text>*/}
        <View style={styles.featureList}>
          {FEATURES.map((f) => (
            <View key={f.text} style={styles.featureRow}>
              <View style={[styles.featureDot, { backgroundColor: f.color }]} />
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.disclaimer}>
        General nutrition information, not a diagnosis. Talk to a healthcare
        provider before changing your supplements or diet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.forest,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  content: {
    gap: 18,
  },
  eyebrow: {
    fontFamily: "SpaceMono",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  spectrumBar: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  spectrumSegment: {
    alignItems: "center",
    gap: 6,
  },
  spectrumBlock: {
    width: 34,
    height: 44,
    borderRadius: 6,
  },
  spectrumLabel: {
    fontFamily: "SpaceMono",
    fontSize: 10,
    color: COLORS.textMuted,
  },
  headline: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textMuted,
  },
  cta: {
    backgroundColor: COLORS.gold,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    color: COLORS.forestDeep,
    fontWeight: "700",
    fontSize: 16,
  },
  ctaCaption: {
    fontFamily: "SpaceMono",
    fontSize: 10,
    letterSpacing: 1.5,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: -6,
  },
  featureList: {
    gap: 12,
    marginTop: 18,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 13,
    color: COLORS.textMuted,
    flex: 1,
  },
  disclaimer: {
    fontSize: 11,
    lineHeight: 16,
    color: "rgba(251, 247, 240, 0.4)",
  },
});
