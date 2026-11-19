import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { BottomNav, DemoFootnote, Page } from '../../src/components/ui';
import { RELEASES } from '../../src/data/music';
import { colors } from '../../src/theme/colors';

export default function ReleaseScreen() {
  const { id } = useLocalSearchParams();
  const release = useMemo(() => RELEASES.find((r) => r.id === id) || RELEASES[0], [id]);
  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹  Back</Text></Pressable>
        <View style={[styles.cover, { backgroundColor: release.color }]}>
          <Text style={styles.note}>♫</Text>
          <Text style={styles.coverName}>MUSIC{String.fromCharCode(10)}CONNECT{String.fromCharCode(10)}RWANDA</Text>
          <Text style={styles.type}>{release.type.toUpperCase()} · DEMO ARTWORK</Text>
        </View>
        <Text style={styles.title}>{release.title}</Text>
        <Text style={styles.artist}>{release.artist}</Text>
        <Text style={styles.info}>Demo release listing. The official release date, artwork, credits and streaming links should be added after verification with the artist or rights holder.</Text>
        <Pressable style={styles.button} onPress={() => Alert.alert('Streaming link', 'A verified music platform link will be added here.')}><Text style={styles.buttonText}>Listen to music  →</Text></Pressable>
        <DemoFootnote />
      </Page>
      <BottomNav />
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { gap: 17, paddingTop: 12 },
  back: { color: colors.secondary, fontSize: 14, fontWeight: '900' },
  cover: { width: '100%', aspectRatio: 1, borderRadius: 25, padding: 24, justifyContent: 'space-between', alignSelf: 'center', maxWidth: 340 },
  note: { color: '#FFFFFF', fontSize: 47, fontWeight: '900' },
  coverName: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', lineHeight: 34, letterSpacing: 1 },
  type: { color: '#FFFFFF', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.ink, fontSize: 26, fontWeight: '900' },
  artist: { color: colors.secondary, fontSize: 15, fontWeight: '800' },
  info: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  button: { backgroundColor: colors.primary, borderRadius: 13, padding: 15, alignItems: 'center' },
  buttonText: { color: colors.ink, fontSize: 14, fontWeight: '900' }
});
