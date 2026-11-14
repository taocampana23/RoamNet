import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BottomNav, DemoNotice, Page, PrimaryButton } from '../src/components/ui';
import { useRoam } from '../src/context/RoamContext';
import { colors } from '../src/theme/colors';

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
}

export default function ConnectionStatusScreen() {
  const { connection, disconnect } = useRoam();
  const [elapsed, setElapsed] = useState(0);
  const connected = Boolean(connection);

  useEffect(() => {
    if (!connection) { setElapsed(0); return undefined; }
    const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - connection.startedAt) / 1000)));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [connection]);

  const startedAt = useMemo(() => connection ? new Date(connection.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—', [connection]);

  const endConnection = () => Alert.alert('Disconnect?', 'This ends the simulated RoamNet session. It does not change your device Wi-Fi settings.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Disconnect', style: 'destructive', onPress: disconnect },
  ]);

  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <View style={styles.signalArea}>
          <View style={styles.halo} /><View style={styles.outerRing} /><View style={styles.middleRing} /><View style={styles.innerRing} />
          <View style={styles.signalCircle}><Text style={styles.signalIcon}>⌁</Text></View>
        </View>
        <Text style={styles.heading}>{connected ? "You're connected" : 'No active connection'}</Text>
        <Text style={styles.location}>{connected ? connection.hotspot.name : 'Connect to a participating hotspot'}</Text>
        <View style={[styles.connectionBadge, !connected && styles.offBadge]}><View style={[styles.badgeDot, !connected && styles.offDot]} /><Text style={[styles.badgeText, !connected && styles.offText]}>{connected ? 'Demo session active' : 'Not connected'}</Text></View>
        {connected ? (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statCard}><Text style={styles.statLabel}>Duration</Text><Text style={styles.statValue}>{formatDuration(elapsed)}</Text></View>
              <View style={styles.statCard}><Text style={styles.statLabel}>Started at</Text><Text style={styles.statValue}>{startedAt}</Text></View>
            </View>
            <View style={styles.qualityCard}><Text style={styles.qualityLabel}>Quality</Text><View style={styles.bars}><View style={[styles.bar, { height: 10 }]} /><View style={[styles.bar, { height: 18 }]} /><View style={[styles.bar, { height: 18 }]} /><View style={[styles.bar, { height: 18, opacity: 0.25 }]} /></View><Text style={styles.qualityValue}>Illustrative</Text><Text style={styles.qualityNote}>Sample only</Text></View>
            <PrimaryButton title="Manage connection" onPress={() => Alert.alert('Connection management', 'Session details and provider controls will appear here after a live provider integration is added.')} />
            <Text style={styles.disconnect} onPress={endConnection}>Disconnect</Text>
          </>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Your connection will appear here</Text>
            <Text style={styles.emptyText}>Open a hotspot and choose “Preview connection screen” to explore this screen with a clearly labelled demo session.</Text>
            <PrimaryButton title="Explore hotspots" onPress={() => router.replace('/explore')} />
          </View>
        )}
        <Text style={styles.help}>Need help? <Text style={styles.helpLink} onPress={() => Alert.alert('Report a problem', 'Support reporting will be connected in a later version.')}>Report a problem</Text></Text>
        <DemoNotice>Demo connection only · this app does not turn on or join Wi-Fi networks</DemoNotice>
      </Page>
      <BottomNav active="Connections" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { flexGrow: 1, paddingTop: 12, paddingBottom: 16, alignItems: 'stretch', gap: 16 },
  signalArea: { height: 235, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 245, height: 245, borderRadius: 130, backgroundColor: '#DDF1EA' },
  outerRing: { position: 'absolute', width: 195, height: 195, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(27,170,145,0.22)' },
  middleRing: { position: 'absolute', width: 158, height: 158, borderRadius: 90, borderWidth: 1.5, borderColor: 'rgba(27,170,145,0.35)' },
  innerRing: { position: 'absolute', width: 120, height: 120, borderRadius: 70, borderWidth: 2, borderColor: 'rgba(27,170,145,0.5)' },
  signalCircle: { width: 96, height: 96, borderRadius: 50, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  signalIcon: { color: colors.teal, fontSize: 56, fontWeight: '800', transform: [{ rotate: '90deg' }] },
  heading: { color: colors.navy, fontSize: 25, textAlign: 'center', fontWeight: '800', letterSpacing: -0.5 },
  location: { color: colors.muted, fontSize: 14, textAlign: 'center' },
  connectionBadge: { alignSelf: 'center', borderRadius: 20, backgroundColor: '#E8F4ED', paddingHorizontal: 12, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 7 },
  badgeDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: colors.green },
  badgeText: { color: colors.green, fontSize: 11, fontWeight: '800' },
  offBadge: { backgroundColor: colors.soft },
  offDot: { backgroundColor: colors.muted },
  offText: { color: colors.muted },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  statCard: { flex: 1, height: 88, backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, justifyContent: 'space-between' },
  statLabel: { color: colors.muted, fontSize: 12 },
  statValue: { color: colors.navy, fontSize: 23, fontWeight: '800', letterSpacing: -0.5 },
  qualityCard: { height: 56, paddingHorizontal: 15, borderRadius: 14, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 10 },
  qualityLabel: { color: colors.muted, fontSize: 12, marginRight: 'auto' },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 24 },
  bar: { width: 4, backgroundColor: colors.teal, borderRadius: 2 },
  qualityValue: { color: colors.navy, fontSize: 12, fontWeight: '800' },
  qualityNote: { color: colors.muted, fontSize: 9 },
  disconnect: { color: colors.red, fontSize: 14, textAlign: 'center', fontWeight: '800', paddingVertical: 3 },
  emptyCard: { backgroundColor: colors.white, borderRadius: 17, borderWidth: 1, borderColor: colors.border, padding: 16, gap: 12, marginTop: 7 },
  emptyTitle: { color: colors.navy, fontWeight: '800', fontSize: 15 },
  emptyText: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  help: { color: colors.muted, fontSize: 12, textAlign: 'center' },
  helpLink: { color: colors.teal, fontWeight: '800' },
});
