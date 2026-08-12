import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  emptyProfile,
  getProfile,
  Profile,
  saveProfile,
} from '@/utils/profileStorage';

const COLORS = {
  forest: '#16302A',
  forestDeep: '#0F211C',
  gold: '#E8A33D',
  rust: '#C1493D',
  sage: '#8FAE8B',
  textPrimary: '#FBF7F0',
  textMuted: 'rgba(251, 247, 240, 0.65)',
  cardBorder: 'rgba(251, 247, 240, 0.15)',
};

const FIELD_LABELS: { key: keyof Profile; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'ageRange', label: 'Age range' },
  { key: 'sexAssignedAtBirth', label: 'Sex assigned at birth' },
  { key: 'ethnicity', label: 'Ethnic background' },
  { key: 'region', label: 'Where you live' },
  { key: 'diet', label: 'Diet' },
  { key: 'pregnancyStatus', label: 'Pregnancy / breastfeeding status' },
];

function OptionRow({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.optionRow}>
      {options.map((opt) => (
        <Pressable
          key={opt}
          style={[styles.option, selected === opt && styles.optionSelected]}
          onPress={() => onSelect(opt)}>
          <Text
            style={[
              styles.optionText,
              selected === opt && styles.optionTextSelected,
            ]}>
            {opt}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSavedProfile, setHasSavedProfile] = useState(false);

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      const filled = !!p.name && !!p.ageRange;
      setHasSavedProfile(filled);
      setIsEditing(!filled);
    });
  }, []);

  const update = (patch: Partial<Profile>) => {
    setProfile({ ...profile, ...patch });
  };

  const handleSave = async () => {
    await saveProfile(profile);
    setHasSavedProfile(true);
    setIsEditing(false);
  };

  const showPregnancy = profile.sexAssignedAtBirth === 'Female';

  // ---------- VIEW MODE ----------
  if (!isEditing && hasSavedProfile) {
    const rows = FIELD_LABELS.filter(({ key }) => {
      if (key === 'pregnancyStatus') return showPregnancy && profile[key];
      return !!profile[key];
    });

    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>PROFILE</Text>
        <Text style={styles.headline}>Your details</Text>

        <View style={styles.summaryCard}>
          {rows.map(({ key, label }, i) => (
            <View
              key={key}
              style={[
                styles.summaryRow,
                i === rows.length - 1 && styles.summaryRowLast,
              ]}>
              <Text style={styles.summaryLabel}>{label}</Text>
              <Text style={styles.summaryValue}>{profile[key]}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          This information stays on your device and is only used to
          personalize your check-in results.
        </Text>
      </ScrollView>
    );
  }

  // ---------- EDIT MODE ----------
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>MYVITALS · PROFILE</Text>
      <Text style={styles.headline}>Your details</Text>
      <Text style={styles.body}>
        Saved on this device so you don't have to re-enter it every
        check-in.
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor="rgba(251, 247, 240, 0.35)"
          value={profile.name}
          onChangeText={(v) => update({ name: v })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Age range</Text>
        <OptionRow
          options={['Under 18', '18–30', '31–50', '51–70', '70+']}
          selected={profile.ageRange}
          onSelect={(v) => update({ ageRange: v })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Sex assigned at birth</Text>
        <OptionRow
          options={['Female', 'Male', 'Intersex', 'Prefer not to say']}
          selected={profile.sexAssignedAtBirth}
          onSelect={(v) => update({ sexAssignedAtBirth: v })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Ethnic background</Text>
        <OptionRow
          options={[
            'Black / African',
            'East Asian',
            'South Asian',
            'Hispanic / Latino',
            'Middle Eastern',
            'White / European',
            'Indigenous',
            'Mixed / Other',
            'Prefer not to say',
          ]}
          selected={profile.ethnicity}
          onSelect={(v) => update({ ethnicity: v })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Where you live</Text>
        <OptionRow
          options={[
            'Northern (e.g. Canada, N. Europe)',
            'Temperate (e.g. US, S. Europe)',
            'Tropical / Equatorial',
            'Southern Hemisphere',
          ]}
          selected={profile.region}
          onSelect={(v) => update({ region: v })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Diet</Text>
        <OptionRow
          options={[
            'Omnivore',
            'Vegetarian',
            'Vegan',
            'Pescatarian',
            'Other / Restricted',
          ]}
          selected={profile.diet}
          onSelect={(v) => update({ diet: v })}
        />
      </View>

      {showPregnancy && (
        <View style={styles.field}>
          <Text style={styles.label}>Pregnancy / breastfeeding status</Text>
          <OptionRow
            options={[
              'Not applicable',
              'Pregnant',
              'Breastfeeding',
              'Trying to conceive',
            ]}
            selected={profile.pregnancyStatus}
            onSelect={(v) => update({ pregnancyStatus: v })}
          />
        </View>
      )}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save profile</Text>
      </Pressable>

      {hasSavedProfile && (
        <Pressable
          style={styles.cancelButton}
          onPress={() => setIsEditing(false)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      )}

      <Text style={styles.disclaimer}>
        This information stays on your device and is only used to
        personalize your check-in results.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.forest,
  },
  content: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  eyebrow: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  optionSelected: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  optionText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  optionTextSelected: {
    color: COLORS.forestDeep,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 100,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: COLORS.forestDeep,
    fontWeight: '700',
    fontSize: 15,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(251, 247, 240, 0.4)',
    marginTop: 4,
  },
  // Summary / view mode
  summaryCard: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    gap: 12,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  editButton: {
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  editButtonText: {
    color: COLORS.gold,
    fontWeight: '700',
    fontSize: 15,
  },
});