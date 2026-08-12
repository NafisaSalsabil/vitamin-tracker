import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import FormattedResult from '@/components/FormattedResult';

const COLORS = {
  forest: '#16302A',
  forestDeep: '#0F211C',
  gold: '#E8A33D',
  textPrimary: '#FBF7F0',
  textMuted: 'rgba(251, 247, 240, 0.65)',
  cardBorder: 'rgba(251, 247, 240, 0.15)',
};

export default function ResultsScreen() {
  const { result, symptoms } = useLocalSearchParams<{
    result: string;
    symptoms: string;
  }>();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.title}>Your Insights</Text>
      <Text style={styles.symptoms}>Based on: "{symptoms}"</Text>

      <View style={styles.resultBlock}>
        <FormattedResult
          text={result ?? ''}
          textColor={COLORS.textPrimary}
          mutedColor={COLORS.textMuted}
        />
      </View>

      <Text style={styles.disclaimer}>
        This is general information, not a medical diagnosis. Talk to a
        healthcare provider before making changes based on these results.
      </Text>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Check in again</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.forest,
  },
  container: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 14,
  },
  eyebrow: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  symptoms: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  resultBlock: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    padding: 18,
  },
  disclaimer: {
    fontSize: 12,
    lineHeight: 17,
    color: 'rgba(251, 247, 240, 0.45)',
  },
  button: {
    backgroundColor: COLORS.gold,
    borderRadius: 100,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.forestDeep,
    fontWeight: '700',
    fontSize: 15,
  },
});