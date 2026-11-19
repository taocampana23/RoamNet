import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ArtistCard, BottomNav, Chip, DemoFootnote, Page, ReleaseCard, ScreenHeader } from '../src/components/ui';
import { ARTISTS, GENRES, RELEASES } from '../src/data/music';
import secondPage from '../src/screens/secondpage.json';
import { colors } from '../src/theme/colors';

export default function ExploreScreen() {
  const [genre, setGenre] = useState('All');
  const [query, setQuery] = useState('');
  const filteredArtists = useMemo(() => ARTISTS.filter((a) => (genre === 'All' || a.genre.toLowerCase().includes(genre.toLowerCase())) && a.name.toLowerCase().includes(query.toLowerCase())), [genre, query]);
  const filteredReleases = useMemo(() => RELEASES.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.artist.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <View style={styles.root}>
      <Page contentStyle={styles.page}>
        <ScreenHeader eyebrow="Discover Rwanda" title={secondPage.title} subtitle={secondPage.subtitle} />
        <View style={styles.search}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search an artist or a song" placeholderTextColor={colors.muted} style={styles.input} /></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{GENRES.map((g) => <Chip key={g} label={g} selected={genre === g} onPress={() => setGenre(g)} />)}</ScrollView>
        <View style={styles.heading}><Text style={styles.headingText}>{secondPage.artistsTitle}</Text><Text style={styles.count}>{filteredArtists.length} artists</Text></View>
        <View style={styles.artistList}>{filteredArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} horizontal />)}{filteredArtists.length === 0 && <Text style={styles.empty}>No artists match your search. Try another name or genre.</Text>}</View>
        <Text style={styles.headingText}>{secondPage.releasesTitle}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.releaseList}>{filteredReleases.map((release) => <ReleaseCard key={release.id} release={release} />)}</ScrollView>
        <DemoFootnote />
      </Page>
      <BottomNav />
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  page: { paddingTop: 9, gap: 17 },
  search: { minHeight: 49, paddingHorizontal: 14, borderRadius: 13, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchIcon: { color: colors.muted, fontSize: 25 },
  input: { flex: 1, color: colors.ink, fontSize: 13 },
  chips: { gap: 8, paddingRight: 20 },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headingText: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  count: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  artistList: { gap: 9 },
  releaseList: { gap: 11, paddingRight: 20 },
  empty: { color: colors.muted, fontSize: 13, padding: 15 }
});
