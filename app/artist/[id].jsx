import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArtistAvatar, BottomNav, DemoFootnote, Page, ReleaseCard, SectionTitle } from '../../src/components/ui';
import { ARTISTS, RELEASES } from '../../src/data/music';
import { colors } from '../../src/theme/colors';

export default function ArtistScreen() {
  const { id } = useLocalSearchParams();
  const artist = useMemo(() => ARTISTS.find((a) => a.id === id) || ARTISTS[0], [id]);
  const releases = RELEASES.filter((r) => r.artistId === artist.id);
  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹  Back</Text></Pressable>
        <View style={styles.hero}>
          <ArtistAvatar artist={artist} size={112} />
          <Text style={styles.name}>{artist.name}</Text>
          <Text style={styles.genre}>{artist.genre}</Text>
          <Text style={styles.bio}>{artist.bio}</Text>
          <Pressable style={styles.follow} onPress={() => {}}><Text style={styles.followText}>+ Follow artist</Text></Pressable>
        </View>
        <SectionTitle title="Music and releases" />
        <View style={styles.releases}>{releases.map((r) => <ReleaseCard key={r.id} release={r} />)}</View>
        {releases.length === 0 ? <Text style={styles.empty}>New music listings will appear here.</Text> : null}
        <DemoFootnote />
      </Page>
      <BottomNav />
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { gap: 18, paddingTop: 12 },
  back: { color: colors.secondary, fontWeight: '900', fontSize: 14 },
  hero: { backgroundColor: colors.ink, borderRadius: 23, alignItems: 'center', padding: 23, gap: 10 },
  name: { color: colors.white, fontSize: 24, fontWeight: '900' },
  genre: { color: '#F5C981', fontSize: 12, fontWeight: '800' },
  bio: { color: '#E0E5E2', textAlign: 'center', fontSize: 12, lineHeight: 18 },
  follow: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 18, marginTop: 4 },
  followText: { color: colors.ink, fontSize: 12, fontWeight: '900' },
  releases: { flexDirection: 'row', flexWrap: 'wrap', gap: 13 },
  empty: { color: colors.muted, fontSize: 12 }
});
