import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BottomNav, Brand, ArtistCard, ReleaseCard, EventCard, Page, SectionTitle, DemoFootnote } from '../src/components/ui';
import { ARTISTS, RELEASES, EVENTS } from '../src/data/music';
import landingPage from '../src/screens/landingpage.json';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <View style={styles.topbar}>
          <Brand />
          <Pressable onPress={() => router.push('/profile')} style={styles.profileButton}><Text style={styles.profileIcon}>☺</Text></Pressable>
        </View>
        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <Text style={styles.heroEyebrow}>DISCOVER · LISTEN · CONNECT</Text>
          <Text style={styles.heroTitle}>{landingPage.headline}</Text>
          <Text style={styles.heroSubtitle}>{landingPage.subtitle}</Text>
          <Pressable style={styles.heroButton} onPress={() => router.push('/explore')}><Text style={styles.heroButtonText}>{landingPage.primaryAction}  →</Text></Pressable>
          <Text style={styles.heroNote}>RWANDAN MUSIC, ALL IN ONE PLACE</Text>
        </View>
        <View style={styles.stats}>
          <View><Text style={styles.statNumber}>RW</Text><Text style={styles.statLabel}>Local sound</Text></View>
          <View style={styles.statDivider} />
          <View><Text style={styles.statNumber}>6+</Text><Text style={styles.statLabel}>Artists to discover</Text></View>
          <View style={styles.statDivider} />
          <View><Text style={styles.statNumber}>LIVE</Text><Text style={styles.statLabel}>Events & culture</Text></View>
        </View>
        <View style={styles.section}>
          <SectionTitle title={landingPage.featuredArtistsTitle} action="See all →" onAction={() => router.push('/explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>{ARTISTS.slice(0, 5).map((artist) => <ArtistCard artist={artist} key={artist.id} />)}</ScrollView>
        </View>
        <View style={styles.section}>
          <SectionTitle title={landingPage.newReleasesTitle} action="Explore →" onAction={() => router.push('/explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>{RELEASES.map((release) => <ReleaseCard release={release} key={release.id} />)}</ScrollView>
        </View>
        <View style={styles.section}>
          <SectionTitle title={landingPage.upcomingEventsTitle} action="All events →" onAction={() => router.push('/events')} />
          {EVENTS.slice(0, 2).map((event) => <EventCard event={event} key={event.id} />)}
        </View>
        <DemoFootnote />
      </Page>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { gap: 21, paddingTop: 8, paddingBottom: 22 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileButton: { width: 39, height: 39, borderRadius: 20, backgroundColor: colors.softGreen, alignItems: 'center', justifyContent: 'center' },
  profileIcon: { color: colors.secondary, fontSize: 21, fontWeight: '900' },
  hero: { minHeight: 250, borderRadius: 24, overflow: 'hidden', padding: 21, backgroundColor: colors.ink, justifyContent: 'center', gap: 11 },
  heroGlow: { position: 'absolute', width: 230, height: 230, borderRadius: 130, backgroundColor: colors.secondary, opacity: 0.45, right: -75, top: -65 },
  heroEyebrow: { color: '#F5C981', fontSize: 9, fontWeight: '900', letterSpacing: 1.8 },
  heroTitle: { color: '#FFFFFF', fontSize: 29, lineHeight: 34, fontWeight: '900', maxWidth: 270, letterSpacing: -0.7 },
  heroSubtitle: { color: '#E1E6E3', fontSize: 12, lineHeight: 18, maxWidth: 280 },
  heroButton: { alignSelf: 'flex-start', marginTop: 4, paddingHorizontal: 16, paddingVertical: 11, backgroundColor: colors.primary, borderRadius: 12 },
  heroButtonText: { color: colors.ink, fontWeight: '900', fontSize: 12 },
  heroNote: { color: '#C5D0CA', fontSize: 8, fontWeight: '900', letterSpacing: 1.5, marginTop: 4 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  statNumber: { color: colors.ink, fontSize: 17, fontWeight: '900', textAlign: 'center' },
  statLabel: { color: colors.muted, fontSize: 9, textAlign: 'center', marginTop: 3 },
  statDivider: { width: 1, height: 31, backgroundColor: colors.line },
  section: { gap: 12 },
  horizontalList: { gap: 10, paddingRight: 20 },
});
