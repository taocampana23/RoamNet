import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { Brand } from '../src/components/ui';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/welcome'), 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glow} />
      <View style={styles.content}>
        <View style={styles.orbitOuter}><View style={styles.orbitInner}><Brand light /></View></View>
        <Text style={styles.tagline}>Internet that moves with you.</Text>
      </View>
      <View style={styles.loading}><ActivityIndicator color={colors.teal} /><Text style={styles.loadingText}>Connecting possibilities</Text></View>
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 32 },
  glow: { position: 'absolute', width: 340, height: 340, borderRadius: 200, backgroundColor: '#1BAA91', opacity: 0.1, top: '19%' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  orbitOuter: { width: 170, height: 170, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(27,170,145,0.25)', alignItems: 'center', justifyContent: 'center' },
  orbitInner: { width: 130, height: 130, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(27,170,145,0.45)', alignItems: 'center', justifyContent: 'center' },
  tagline: { color: colors.teal, fontSize: 14, letterSpacing: 0.2 },
  loading: { alignItems: 'center', gap: 8 },
  loadingText: { color: '#A9BCC4', fontSize: 12 },
  homeIndicator: { width: 132, height: 5, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.45)', marginTop: 26 },
});
