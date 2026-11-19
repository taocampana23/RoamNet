import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomNav, Brand, DemoFootnote, Page, ScreenHeader } from '../src/components/ui';
import { colors } from '../src/theme/colors';

export default function ProfileScreen() {
  const options = [
    ['♡', 'Favorite artists', 'Keep the artists you love close.'],
    ['♫', 'Saved music', 'Your saved releases will appear here.'],
    ['▦', 'Saved events', 'Events you save will be easy to find.'],
    ['⚙', 'Settings', 'App preferences and notifications.']
  ];
  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <Brand />
        <ScreenHeader eyebrow="Your music space" title="Your profile" subtitle="Make MusicConnect Rwanda your home for local music." />
        <View style={styles.profileCard}><View style={styles.avatar}><Text style={styles.avatarText}>MC</Text></View><Text style={styles.name}>Music fan</Text><Text style={styles.sub}>Guest profile · Demo</Text></View>
        {options.map(([icon, title, sub]) => <Pressable key={title} style={styles.option} onPress={() => Alert.alert(title, 'This section is a prototype and will be expanded in a later version.')}><Text style={styles.optionIcon}>{icon}</Text><View style={{ flex: 1 }}><Text style={styles.optionTitle}>{title}</Text><Text style={styles.optionSub}>{sub}</Text></View><Text style={styles.arrow}>›</Text></Pressable>)}
        <DemoFootnote />
      </Page>
      <BottomNav />
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { paddingTop: 9, gap: 17 },
  profileCard: { alignItems: 'center', backgroundColor: colors.ink, borderRadius: 22, padding: 23, gap: 5 },
  avatar: { width: 72, height: 72, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  avatarText: { color: colors.ink, fontSize: 22, fontWeight: '900' },
  name: { color: colors.white, fontSize: 18, fontWeight: '900' },
  sub: { color: '#CCD5D2', fontSize: 11 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 13, borderBottomWidth: 1, borderBottomColor: colors.line, paddingVertical: 13 },
  optionIcon: { color: colors.primaryDark, fontSize: 22, width: 30, textAlign: 'center' },
  optionTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' },
  optionSub: { color: colors.muted, fontSize: 10, marginTop: 3 },
  arrow: { color: colors.muted, fontSize: 24 }
});
