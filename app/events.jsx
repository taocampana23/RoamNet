import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomNav, DemoFootnote, EventCard, Page, ScreenHeader } from '../src/components/ui';
import { EVENTS } from '../src/data/music';
import { colors } from '../src/theme/colors';

export default function EventsScreen() {
  const [saved, setSaved] = useState([]);
  const toggleSave = (id) => setSaved((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);
  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <ScreenHeader eyebrow="What's happening" title="Music events" subtitle="Find live performances, music nights and cultural events around Rwanda." />
        <View style={styles.banner}><Text style={styles.bannerIcon}>♫</Text><View style={{ flex: 1 }}><Text style={styles.bannerTitle}>Feel the music live</Text><Text style={styles.bannerText}>Discover performances and save events to your list.</Text></View></View>
        <View style={styles.row}><Text style={styles.heading}>Upcoming in Rwanda</Text><Text style={styles.demo}>DEMO LISTINGS</Text></View>
        {EVENTS.map((event) => <View key={event.id} style={styles.eventWrap}><EventCard event={event} /><Pressable onPress={() => toggleSave(event.id)} style={styles.saveButton}><Text style={styles.saveText}>{saved.includes(event.id) ? '✓ Saved' : '+ Save event'}</Text></Pressable></View>)}
        <DemoFootnote />
      </Page>
      <BottomNav />
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { paddingTop: 9, gap: 16 },
  banner: { backgroundColor: colors.ink, borderRadius: 18, padding: 17, flexDirection: 'row', gap: 13, alignItems: 'center' },
  bannerIcon: { fontSize: 33, color: colors.primary },
  bannerTitle: { color: colors.white, fontSize: 15, fontWeight: '900' },
  bannerText: { color: '#CAD5D0', fontSize: 11, lineHeight: 16, marginTop: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  demo: { color: colors.primaryDark, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  eventWrap: { gap: 7 },
  saveButton: { alignSelf: 'flex-end', backgroundColor: colors.softOrange, borderRadius: 99, paddingHorizontal: 13, paddingVertical: 7 },
  saveText: { color: colors.primaryDark, fontSize: 11, fontWeight: '900' }
});
