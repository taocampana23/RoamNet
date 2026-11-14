import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Brand, DemoNotice, Page, PrimaryButton, ScreenTitle, SecondaryButton, TextField } from '../src/components/ui';
import { useRoam } from '../src/context/RoamContext';
import { colors } from '../src/theme/colors';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { setProfile } = useRoam();

  const signIn = () => {
    if (!email.trim() || !password) return Alert.alert('Missing information', 'Enter your email or phone number and password to continue.');
    setProfile({ name: email.split('@')[0] || 'RoamNet user', email: email.trim() });
    router.replace('/home');
  };

  return (
    <Page contentStyle={styles.page}>
      <Brand />
      <ScreenTitle title="Welcome back" subtitle="Sign in to continue to RoamNet." back />
      <View style={styles.form}>
        <TextField label="Email or phone number" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <TextField label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry={!showPassword} rightText={showPassword ? 'Hide' : 'Show'} onRightPress={() => setShowPassword((v) => !v)} />
      </View>
      <View style={styles.options}>
        <Pressable onPress={() => setRemember((v) => !v)} style={styles.rememberRow}>
          <View style={[styles.checkbox, remember && styles.checkboxOn]}>{remember && <Text style={styles.tick}>✓</Text>}</View>
          <Text style={styles.optionText}>Remember me</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Password recovery', 'Password recovery will be enabled when a secure authentication service is connected.')}>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>
      </View>
      <PrimaryButton title="Sign in" onPress={signIn} />
      <View style={styles.orRow}><View style={styles.line} /><Text style={styles.or}>or</Text><View style={styles.line} /></View>
      <SecondaryButton title="Create an account" onPress={() => router.push('/create-account')} />
      <DemoNotice>Prototype sign-in · local demo only · no password is sent to a server</DemoNotice>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, paddingTop: 10, gap: 22 },
  form: { gap: 20, marginTop: 2 },
  options: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: colors.teal, borderColor: colors.teal },
  tick: { color: colors.white, fontSize: 13, fontWeight: '800' },
  optionText: { color: colors.muted, fontSize: 13 },
  link: { color: colors.teal, fontSize: 13, fontWeight: '700' },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 2 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  or: { color: colors.muted, fontSize: 12 },
});
