import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { BottomNav, Brand, DemoNotice, HotspotCard, Page, SectionHeading } from '../src/components/ui';
import { HOTSPOTS } from '../src/data/hotspots';
import { useRoam } from '../src/context/RoamContext';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { profile } = useRoam();
  const results = useMemo(() => HOTSPOTS.filter((item) => `${item.name} ${item.area}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const firstName = (profile.name || 'there').split(' ')[0];

  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <View style={styles.top}><Brand compact /><View style={styles.avatar}><Text style={styles.avatarText}>{(firstName[0] || 'G').toUpperCase()}</Text></View></View>
        <View style={styles.heading}><Text style={styles.greeting}>Good morning, {firstName}</Text><Text style={styles.title}>Find your hotspot</Text></View>
        <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Find a hotspot" placeholderTextColor={colors.muted} style={styles.searchInput} /><Pressable onPress={() => router.push('/explore')}><Text style={styles.filter}>☷</Text></Pressable></View>
        <View style={styles.locationPill}><Text style={styles.locationPin}>●</Text><Text style={styles.locationText}>Kigali, Rwanda</Text><Text style={styles.down}>⌄</Text></View>
        <View style={styles.infoBanner}>
          <View style={styles.bannerIcon}><Text style={styles.bannerWifi}>⌁</Text></View>
          <View style={styles.bannerText}><Text style={styles.bannerTitle}>Access to participating hotspots</Text><Text style={styles.bannerSub}>Availability varies by provider.</Text><Text style={styles.bannerSmall}>Sample data — not verified live coverage.</Text></View>
          <View style={styles.demoBadge}><Text style={styles.demoBadgeText}>DEMO</Text></View>
        </View>
        <SectionHeading title="Nearby hotspots" action="View on map →" onAction={() => router.push('/explore')} />
        <View style={styles.cards}>{results.slice(0, 3).map((hotspot) => <HotspotCard key={hotspot.id} hotspot={hotspot} />)}</View>
        {results.length === 0 && <Text style={styles.noResults}>No matching hotspots. Try another search.</Text>}
        <View style={styles.savedBlock}>
          <Text style={styles.savedLabel}>SAVED</Text>
          <View style={styles.savedRow}><Pressable style={styles.savedChip} onPress={() => setQuery('Library')}><Text style={styles.savedText}>★ Home library</Text></Pressable><Pressable style={styles.savedChip} onPress={() => setQuery('Convention')}><Text style={styles.savedText}>★ Campus</Text></Pressable></View>
        </View>
        <DemoNotice />
      </Page>
      <BottomNav active="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { paddingTop: 8, paddingBottom: 20, gap: 18 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.tealLight, borderWidth: 1, borderColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.teal, fontWeight: '800', fontSize: 15 },
  heading: { gap: 3 },
  greeting: { color: colors.muted, fontSize: 13 },
  title: { color: colors.navy, fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  searchBox: { minHeight: 50, borderRadius: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 10 },
  searchIcon: { fontSize: 25, color: colors.muted },
  searchInput: { flex: 1, color: colors.navy, fontSize: 14 },
  filter: { color: colors.teal, fontSize: 23, paddingHorizontal: 3 },
  locationPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 8 },
  locationPin: { color: colors.teal, fontSize: 10 },
  locationText: { color: colors.navy, fontWeight: '600', fontSize: 12 },
  down: { color: colors.muted, marginLeft: 9 },
  infoBanner: { backgroundColor: colors.navy, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  bannerIcon: { width: 38, height: 38, borderRadius: 20, backgroundColor: 'rgba(27,170,145,0.18)', alignItems: 'center', justifyContent: 'center' },
  bannerWifi: { color: colors.teal, fontSize: 28, transform: [{ rotate: '90deg' }] },
  bannerText: { flex: 1, gap: 3 },
  bannerTitle: { color: colors.white, fontSize: 12, fontWeight: '700' },
  bannerSub: { color: '#AFC0C6', fontSize: 11 },
  bannerSmall: { color: '#8FA5AF', fontSize: 10 },
  demoBadge: { position: 'absolute', top: 10, right: 10, borderRadius: 9, paddingHorizontal: 7, paddingVertical: 3, backgroundColor: 'rgba(27,170,145,0.18)' },
  demoBadgeText: { color: colors.teal, fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  cards: { gap: 10 },
  noResults: { color: colors.muted, fontSize: 13, padding: 14 },
  savedBlock: { gap: 9 },
  savedLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  savedRow: { flexDirection: 'row', gap: 8 },
  savedChip: { borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  savedText: { color: colors.navy, fontSize: 11, fontWeight: '600' },
});
