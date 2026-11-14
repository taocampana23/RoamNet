import React, { useMemo } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { DemoNotice, Page, PrimaryButton, ScreenTitle, SecondaryButton } from '../src/components/ui';
import { HOTSPOTS } from '../src/data/hotspots';
import { useRoam } from '../src/context/RoamContext';
import { colors } from '../src/theme/colors';

export default function HotspotDetailsScreen() {
  const { id } = useLocalSearchParams();
  const hotspot = useMemo(() => HOTSPOTS.find((item) => item.id === id) || HOTSPOTS[2], [id]);
  const { startDemoConnection } = useRoam();

  const checkEligibility = () => Alert.alert(
    'Provider access check',
    'RoamNet is currently using sample hotspot records. Live eligibility can only be verified after a Wi-Fi provider authorizes an integration.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Preview connection screen', onPress: () => { startDemoConnection(hotspot); router.push('/connection-status'); } },
    ],
  );

  const directions = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotspot.address)}`;
    try { await Linking.openURL(url); } catch { Alert.alert('Could not open maps', 'Please try again on a device with a maps app or browser.'); }
  };

  return (
    <Page contentStyle={styles.page}>
      <ScreenTitle title="" back right={<Text style={styles.more}>•••</Text>} />
      <View style={styles.hero}>
        <View style={styles.ringOne} /><View style={styles.ringTwo} /><View style={styles.ringThree} />
        <View style={styles.wifiIcon}><Text style={styles.wifi}>⌁</Text></View>
        <View style={styles.availableTag}><View style={styles.greenDot} /><Text style={styles.availableText}>{hotspot.status}</Text></View>
      </View>
      <View style={styles.nameBlock}>
        <Text style={styles.title}>{hotspot.name}</Text>
        <Text style={styles.address}>{hotspot.address} · {hotspot.distance}</Text>
        <View style={styles.sampleBadge}><Text style={styles.sampleText}>SAMPLE DATA</Text></View>
      </View>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Availability</Text><Text style={styles.value}>{hotspot.status} · Sample</Text></View>
        <View style={styles.separator} />
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Access</Text><Text style={styles.value}>Provider authorization required</Text></View>
        <View style={styles.separator} />
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Type</Text><Text style={styles.value}>{hotspot.type}</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Check your access</Text>
      <View style={styles.eligibilityCard}>
        <View style={styles.shield}><Text style={styles.shieldText}>✓</Text></View>
        <View style={styles.eligibilityCopy}><Text style={styles.eligibilityTitle}>Eligibility not checked</Text><Text style={styles.eligibilitySub}>We'll verify with the provider when an integration is available.</Text></View>
      </View>
      <View style={styles.note}><Text style={styles.noteText}>Provider access depends on authorization and integration being available. Viewing this listing does not connect your device to Wi-Fi.</Text></View>
      <PrimaryButton title="Check eligibility" onPress={checkEligibility} />
      <SecondaryButton title="Get directions" onPress={directions} />
      <Text style={styles.report} onPress={() => Alert.alert('Report a problem', 'Problem reporting will be connected to the RoamNet support service in a later version.')}>Report a problem</Text>
      <DemoNotice />
    </Page>
  );
}

const styles = StyleSheet.create({
  page: { paddingTop: 7, paddingBottom: 20, gap: 14 },
  more: { color: colors.navy, fontSize: 20, letterSpacing: 3, paddingHorizontal: 10 },
  hero: { height: 160, borderRadius: 20, backgroundColor: colors.tealLight, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  ringOne: { position: 'absolute', width: 130, height: 130, borderRadius: 70, borderWidth: 1, borderColor: 'rgba(27,170,145,0.24)' },
  ringTwo: { position: 'absolute', width: 95, height: 95, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(27,170,145,0.4)' },
  ringThree: { position: 'absolute', width: 58, height: 58, borderRadius: 30, borderWidth: 1.5, borderColor: 'rgba(27,170,145,0.55)' },
  wifiIcon: { width: 48, height: 48, backgroundColor: colors.white, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  wifi: { color: colors.teal, fontSize: 31, fontWeight: '900', transform: [{ rotate: '90deg' }] },
  availableTag: { position: 'absolute', top: 14, left: 14, borderRadius: 15, backgroundColor: colors.white, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
  greenDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: colors.green },
  availableText: { color: colors.navy, fontSize: 11, fontWeight: '800' },
  nameBlock: { gap: 6 },
  title: { color: colors.navy, fontSize: 23, fontWeight: '800', letterSpacing: -0.5 },
  address: { color: colors.muted, fontSize: 12 },
  sampleBadge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 10, backgroundColor: colors.soft, marginTop: 2 },
  sampleText: { color: colors.muted, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  infoCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, gap: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  infoLabel: { color: colors.muted, fontSize: 12 },
  value: { color: colors.navy, fontSize: 11, fontWeight: '700', textAlign: 'right', flexShrink: 1 },
  separator: { height: 1, backgroundColor: colors.soft },
  sectionTitle: { color: colors.navy, fontSize: 17, fontWeight: '800', marginTop: 2 },
  eligibilityCard: { padding: 14, borderRadius: 14, backgroundColor: colors.soft, flexDirection: 'row', alignItems: 'center', gap: 12 },
  shield: { width: 36, height: 36, borderRadius: 20, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  shieldText: { color: colors.teal, fontWeight: '900', fontSize: 18 },
  eligibilityCopy: { flex: 1, gap: 3 },
  eligibilityTitle: { color: colors.navy, fontSize: 13, fontWeight: '800' },
  eligibilitySub: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  note: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12 },
  noteText: { color: colors.muted, fontSize: 10, lineHeight: 15 },
  report: { color: colors.red, textAlign: 'center', fontSize: 13, fontWeight: '700', padding: 2 },
});
