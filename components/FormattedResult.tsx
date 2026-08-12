import { StyleSheet, Text, View } from 'react-native';

import { parseMarkdownBullets } from '@/utils/parseMarkdownBullets';

const DOT_COLORS = ['#E8A33D', '#C1493D', '#8FAE8B', '#D9C36A', '#6B8F71'];

export default function FormattedResult({
  text,
  textColor = '#1A1A1A',
  mutedColor = 'rgba(0,0,0,0.6)',
}: {
  text: string;
  textColor?: string;
  mutedColor?: string;
}) {
  const { intro, bullets, outro } = parseMarkdownBullets(text);

  // Fallback: if parsing found no bullets at all, just show the raw text
  if (bullets.length === 0) {
    return <Text style={[styles.plain, { color: textColor }]}>{text}</Text>;
  }

  return (
    <View style={styles.container}>
      {!!intro && (
        <Text style={[styles.intro, { color: textColor }]}>{intro}</Text>
      )}

      {bullets.map((bullet, i) => (
        <View key={i} style={styles.bulletRow}>
          <View
            style={[
              styles.dot,
              { backgroundColor: DOT_COLORS[i % DOT_COLORS.length] },
            ]}
          />
          <Text style={styles.bulletText}>
            {bullet.segments.map((seg, j) => (
              <Text
                key={j}
                style={{
                  color: textColor,
                  fontWeight: seg.bold ? '700' : '400',
                }}>
                {seg.text}
              </Text>
            ))}
          </Text>
        </View>
      ))}

      {!!outro && (
        <Text style={[styles.outro, { color: mutedColor }]}>{outro}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  plain: {
    fontSize: 15,
    lineHeight: 22,
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  outro: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    marginTop: 4,
  },
});