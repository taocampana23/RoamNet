import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Brand, DemoNotice, Page, PrimaryButton, ScreenTitle, TextField } from '../src/components/ui';
import { useRoam } from '../src/context/RoamContext';
import { colors } from '../src/theme/colors';

export default function CreateAccountScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setProfile } = useRoam();

  const createAccount = () => {
    if (!name.trim() || !phone.trim() || !email.trim() || !password || !confirm) return Alert.alert('Complete the form', 'Please fill in all fields.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return Alert.alert('Check your email', 'Enter a valid email address.');
    if (password.length < 8) return Alert.alert('Password too short', 'Use at least 8 characters for this demo form.');
    if (password !== confirm) return Alert.alert('Passwords do not match', 'Check both password fields and try again.');
    if (!accepted) return Alert.alert('Terms required', 'Please agree to the Terms and Privacy Policy to continue.');
    setProfile({ name: name.trim(), email: email.trim() });
    Alert.alert('Demo account created', 'Your profile is available in this running preview. A real account requires a secure authentication backend.', [
      { text: 'Continue', onPress: () => router.replace('/home') },
    ]);
  };

  return (
    <Page contentStyle={styles.page}>
      <Brand />
      <ScreenTitle title="Create account" subtitle="Set up your RoamNet access in a minute." back />
      <View style={styles.form}>
        <TextField label="Full name" value={name} onChangeText={setName} placeholder="Your full name" autoCapitalize="words" />
        <TextField label="Phone number" value={phone} onChangeText={setPhone} placeholder="788 123 456" keyboardType="phone-pad" leftText="+250" />
        <TextField label="Email address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <TextField label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry={!showPassword} rightText={showPassword ? 'Hide' : 'Show'} onRightPress={() => setShowPassword((v) => !v)} />
        <TextField label="Confirm password" value={confirm} onChangeText={setConfirm} placeholder="Re-enter your password" secureTextEntry={!showPassword} />
      </View>
      <Pressable style={styles.termsRow} onPress={() => setAccepted((v) => !v)}>
        <View style={[styles.checkbox, accepted && styles.checkboxOn]}>{accepted && <Text style={styles.tick}>✓</Text>}</View>
        <Text style={styles.termsText}>I agree to the <Text style={styles.link}>Terms</Text> &amp; <Text style={styles.link}>Privacy Policy</Text>.</Text>
      </Pressable>
      <PrimaryButton title="Create account" onPress={createAccount} />
      <Text style={styles.footer}>Already have an account? <Text style={styles.link} onPress={() => router.push('/sign-in')}>Sign in</Text></Text>
      <DemoNotice>Prototype registration · profile stays in this app session</DemoNotice>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, paddingTop: 8, gap: 15 },
  form: { gap: 14 },
  termsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 3 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: colors.border, borderRadius: 5, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: colors.teal, borderColor: colors.teal },
  tick: { color: colors.white, fontWeight: '800' },
  termsText: { flex: 1, color: colors.muted, fontSize: 12 },
  link: { color: colors.teal, fontWeight: '700' },
  footer: { textAlign: 'center', color: colors.muted, fontSize: 13, marginTop: 4 },
});
