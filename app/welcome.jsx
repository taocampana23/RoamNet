import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Brand, Page, PrimaryButton, SecondaryButton } from '../src/components/ui';
import { colors } from '../src/theme/colors';

export default function WelcomeScreen() {
  return (
    <Page contentStyle={styles.page}>
      <Brand />
      <View style={styles.hero}>
        <View style={styles.skyline}>
          {[34, 58, 42, 78, 50, 68, 34].map((height, i) => <View key={i} style={[styles.building, { height }]} />)}
        </View>
        <View style={styles.wifiArcOne} />
        <View style={styles.wifiArcTwo} />
        <View style={styles.wifiArcThree} />
        <View style={styles.phone}>
          <View style={styles.phoneScreen}>
            <View style={styles.phoneSpeaker} />
            <View style={styles.phoneLine} />
            <View style={[styles.phoneLine, { width: '58%', opacity: 0.55 }]} />
            <View style={styles.phoneCard}><Text style={styles.check}>✓</Text></View>
            <View style={styles.phoneButton} />
          </View>
        </View>
        <View style={styles.heroCaption}><Text style={styles.heroCaptionText}>Wi-Fi, wherever your day takes you</Text></View>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Stay connected{'\n'}beyond home.</Text>
        <Text style={styles.body}>Discover participating Wi-Fi hotspots while you're on the move.</Text>
      </View>
      <View style={styles.actions}>
        <PrimaryButton title="Get started" onPress={() => router.push('/create-account')} />
        <SecondaryButton title="I already have an account" onPress={() => router.push('/sign-in')} />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, paddingTop: 12, paddingBottom: 18, gap: 24 },
  hero: { height: 280, backgroundColor: '#DDF1EA', borderRadius: 28, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  skyline: { position: 'absolute', bottom: 0, left: 18, right: 18, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', opacity: 0.3 },
  building: { width: 27, backgroundColor: colors.teal, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  wifiArcOne: { position: 'absolute', width: 205, height: 120, borderTopWidth: 2, borderColor: 'rgba(27,170,145,0.35)', borderRadius: 120, top: 26 },
  wifiArcTwo: { position: 'absolute', width: 150, height: 90, borderTopWidth: 2, borderColor: 'rgba(27,170,145,0.5)', borderRadius: 100, top: 49 },
  wifiArcThree: { position: 'absolute', width: 92, height: 54, borderTopWidth: 2, borderColor: 'rgba(27,170,145,0.7)', borderRadius: 70, top: 73 },
  phone: { width: 76, height: 150, borderRadius: 16, backgroundColor: colors.navy, padding: 5, marginTop: 24, elevation: 8 },
  phoneScreen: { flex: 1, backgroundColor: colors.teal, borderRadius: 12, padding: 10, alignItems: 'flex-start', gap: 8 },
  phoneSpeaker: { width: 17, height: 4, borderRadius: 4, backgroundColor: colors.navy, alignSelf: 'center', marginBottom: 4 },
  phoneLine: { height: 5, width: '100%', borderRadius: 5, backgroundColor: colors.white },
  phoneCard: { width: '100%', height: 47, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.24)', alignItems: 'center', justifyContent: 'center' },
  check: { color: colors.white, fontSize: 24, fontWeight: '800' },
  phoneButton: { width: '100%', height: 8, backgroundColor: colors.white, borderRadius: 8, marginTop: 2 },
  heroCaption: { position: 'absolute', bottom: 12, alignSelf: 'center' },
  heroCaptionText: { color: '#3F7C70', fontSize: 11, fontWeight: '600' },
  copy: { gap: 12 },
  title: { color: colors.navy, fontSize: 31, lineHeight: 37, fontWeight: '800', letterSpacing: -0.7 },
  body: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  actions: { marginTop: 'auto', gap: 12 },
});
