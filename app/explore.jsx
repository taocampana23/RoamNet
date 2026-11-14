import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { BottomNav, DemoNotice, HotspotCard, Page, PrimaryButton } from '../src/components/ui';
import { HOTSPOTS } from '../src/data/hotspots';
import { colors } from '../src/theme/colors';

export default function ExploreScreen() {
  const [mode, setMode] = useState('Map');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(HOTSPOTS[2]);
  const filtered = useMemo(() => HOTSPOTS.filter((item) => `${item.name} ${item.area}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <View style={styles.headerRow}><Text style={styles.title}>Explore</Text><View style={styles.toggle}><Pressable onPress={() => setMode('List')} style={[styles.toggleButton, mode === 'List' && styles.toggleActive]}><Text style={[styles.toggleText, mode === 'List' && styles.toggleTextActive]}>List</Text></Pressable><Pressable onPress={() => setMode('Map')} style={[styles.toggleButton, mode === 'Map' && styles.toggleActive]}><Text style={[styles.toggleText, mode === 'Map' && styles.toggleTextActive]}>Map</Text></Pressable></View></View>
        <View style={styles.search}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search locations" placeholderTextColor={colors.muted} style={styles.input} /></View>
        {mode === 'Map' ? (
          <View style={styles.mapArea}>
            <View style={[styles.road, styles.roadOne]} /><View style={[styles.road, styles.roadTwo]} /><View style={[styles.road, styles.roadThree]} />
            <View style={[styles.road, styles.roadFour]} /><View style={[styles.road, styles.roadFive]} />
            <View style={styles.park}><Text style={styles.parkLabel}>GREEN SPACE</Text></View>
            <View style={styles.water} />
            {filtered.map((spot, index) => {
              const positions = [{ top: '18%', left: '14%' }, { top: '42%', left: '72%' }, { top: '66%', left: '37%' }];
              const pos = positions[HOTSPOTS.findIndex((h) => h.id === spot.id)] || positions[index % positions.length];
              const active = selected?.id === spot.id;
              return <Pressable key={spot.id} onPress={() => setSelected(spot)} style={[styles.pin, pos, active && styles.pinActive]}><Text style={styles.pinText}>⌁</Text></Pressable>;
            })}
            <View style={styles.mapLabel}><Text style={styles.mapLabelText}>Illustrative map · sample data</Text></View>
            <Pressable style={styles.recenter} onPress={() => setSelected(HOTSPOTS[2])}><Text style={styles.recenterText}>◎</Text></Pressable>
          </View>
        ) : (
          <View style={styles.listArea}>{filtered.map((spot) => <HotspotCard key={spot.id} hotspot={spot} onPress={() => setSelected(spot)} />)}{filtered.length === 0 && <Text style={styles.empty}>No locations match your search.</Text>}</View>
        )}
        <View style={styles.selectedCard}>
          <Text style={styles.eyebrow}>SELECTED HOTSPOT</Text>
          <Text style={styles.selectedName}>{selected?.name || 'Choose a hotspot'}</Text>
          <Text style={styles.selectedMeta}>{selected ? `${selected.address} · ${selected.distance}` : 'Select a location to see its details.'}</Text>
          {!!selected && <View style={styles.status}><View style={[styles.dot, { backgroundColor: selected.status === 'Available' ? colors.green : colors.muted }]} /><Text style={styles.statusText}>{selected.status}</Text><Text style={styles.sample}>Illustrative</Text></View>}
          <PrimaryButton title="View details" onPress={() => selected && router.push({ pathname: '/hotspot-details', params: { id: selected.id } })} disabled={!selected} />
        </View>
        <DemoNotice />
      </Page>
      <BottomNav active="Explore" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { paddingTop: 8, gap: 14, paddingBottom: 14 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: colors.navy, fontSize: 25, fontWeight: '800' },
  toggle: { flexDirection: 'row', padding: 3, borderRadius: 10, backgroundColor: colors.soft },
  toggleButton: { minWidth: 49, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, alignItems: 'center' },
  toggleActive: { backgroundColor: colors.white, elevation: 1 },
  toggleText: { color: colors.muted, fontSize: 12 },
  toggleTextActive: { color: colors.navy, fontWeight: '800' },
  search: { height: 48, borderRadius: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 9 },
  searchIcon: { color: colors.muted, fontSize: 25 },
  input: { flex: 1, color: colors.navy, fontSize: 14 },
  mapArea: { height: 360, overflow: 'hidden', borderRadius: 16, backgroundColor: '#E8EEE9', position: 'relative' },
  road: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 30 },
  roadOne: { left: -35, right: -30, top: 70, height: 17, transform: [{ rotate: '7deg' }] },
  roadTwo: { left: -25, right: -30, top: 190, height: 17, transform: [{ rotate: '-5deg' }] },
  roadThree: { left: -30, right: -25, top: 295, height: 14, transform: [{ rotate: '4deg' }] },
  roadFour: { width: 15, top: -20, bottom: -15, left: '30%', transform: [{ rotate: '4deg' }] },
  roadFive: { width: 13, top: -20, bottom: -15, right: '26%', transform: [{ rotate: '-4deg' }] },
  park: { position: 'absolute', left: 17, top: 25, width: 87, height: 86, borderRadius: 35, backgroundColor: '#D4E6CB', alignItems: 'center', justifyContent: 'center' },
  parkLabel: { color: '#72926F', fontSize: 8, fontWeight: '800', textAlign: 'center' },
  water: { position: 'absolute', right: -22, top: 25, width: 35, height: 300, borderRadius: 25, backgroundColor: '#C8DBE8', transform: [{ rotate: '9deg' }] },
  pin: { position: 'absolute', width: 38, height: 38, borderRadius: 22, backgroundColor: colors.teal, borderColor: colors.white, borderWidth: 3, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  pinActive: { width: 48, height: 48, borderRadius: 26, backgroundColor: colors.navy, borderWidth: 4 },
  pinText: { color: colors.white, fontSize: 22, fontWeight: '800', transform: [{ rotate: '90deg' }] },
  mapLabel: { position: 'absolute', left: 12, bottom: 10, backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7 },
  mapLabelText: { color: colors.muted, fontSize: 9 },
  recenter: { position: 'absolute', right: 12, bottom: 12, backgroundColor: colors.white, width: 38, height: 38, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  recenterText: { color: colors.teal, fontSize: 23 },
  selectedCard: { backgroundColor: colors.white, borderRadius: 19, padding: 16, gap: 9, marginTop: -2 },
  eyebrow: { color: colors.teal, fontSize: 10, fontWeight: '900', letterSpacing: 0.9 },
  selectedName: { color: colors.navy, fontSize: 16, fontWeight: '800' },
  selectedMeta: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { color: colors.green, fontWeight: '800', fontSize: 11 },
  sample: { color: colors.muted, fontSize: 10, backgroundColor: colors.soft, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9 },
  listArea: { gap: 10 },
  empty: { color: colors.muted, padding: 18 },
});
