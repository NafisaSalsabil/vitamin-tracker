import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'myvitals_profile';

export type Profile = {
  name: string;
  ageRange: string;
  sexAssignedAtBirth: string;
  ethnicity: string;
  region: string;
  diet: string;
  pregnancyStatus: string;
};

export const emptyProfile: Profile = {
  name: '',
  ageRange: '',
  sexAssignedAtBirth: '',
  ethnicity: '',
  region: '',
  diet: '',
  pregnancyStatus: '',
};

export async function getProfile(): Promise<Profile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) return emptyProfile;
    return { ...emptyProfile, ...JSON.parse(raw) } as Profile;
  } catch (err) {
    console.error('Failed to load profile:', err);
    return emptyProfile;
  }
}

export async function saveProfile(profile: Profile): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
}