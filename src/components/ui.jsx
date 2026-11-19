import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { colors, radius } from '../theme/colors';

export function Page({ children, contentStyle }) {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={[styles.page, contentStyle]} showsVerticalScrollIndicator={false}>{children}</ScrollView></SafeAreaView>;
}

export function Brand() {
  return <View style={styles.brand}><View style={styles.brandIcon}><Text style={styles.brandSymbol}>♫</Text></View><View><Text style={styles.brandName}>MusicConnect</Text><Text style={styles.brandSub}>RWANDA</Text></View></View>;
}

export function ScreenHeader({ eyebrow, title, subtitle }) {
  return <View style={styles.header}>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text> : null}<Text style={styles.pageTitle}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>;
}

export function SectionTitle({ title, action, onAction }) {
  return <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{title}</Text>{action ? <Text onPress={onAction} style={styles.action}>{action}</Text> : null}</View>;
}

export function ArtistAvatar({ artist, size = 70 }) {
  return <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: artist.color }]}><Text style={{ color: '#fff', fontSize: size * 0.28, fontWeight: '900' }}>{artist.initials}</Text><Text style={styles.avatarNote}>♫</Text></View>;
}

export function ArtistCard({ artist, horizontal = false }) {
  return <Pressable onPress={() => router.push({ pathname: '/artist/[id]', params: { id: artist.id } })} style={[styles.artistCard, horizontal && styles.artistHorizontal]}><ArtistAvatar artist={artist} size={horizontal ? 58 : 76} /><View style={horizontal ? { flex: 1, gap: 4 } : { alignItems: 'center', gap: 4 }}><Text numberOfLines={1} style={styles.cardName}>{artist.name}</Text><Text style={styles.cardMeta}>{artist.genre}</Text></View>{horizontal ? <Text style={styles.action}>View →</Text> : null}</Pressable>;
}

export function ReleaseCard({ release }) {
  return <Pressable onPress={() => router.push({ pathname: '/release/[id]', params: { id: release.id } })} style={styles.releaseCard}><View style={[styles.cover, { backgroundColor: release.color }]}><Text style={styles.coverNote}>♫</Text><Text style={styles.coverTitle}>MUSIC{String.fromCharCode(10)}CONNECT</Text><Text style={styles.coverType}>{release.type.toUpperCase()}</Text></View><Text numberOfLines={1} style={styles.cardName}>{release.title}</Text><Text style={styles.cardMeta}>{release.artist}</Text><Text style={styles.demoText}>DEMO LISTING</Text></Pressable>;
}

export function EventCard({ event }) {
  return <View style={styles.eventCard}><View style={[styles.eventArt, { backgroundColor: event.color }]}><Text style={styles.eventArtTop}>MUSICCONNECT RWANDA</Text><Text style={styles.eventArtIcon}>♫</Text><Text style={styles.eventArtBottom}>LIVE · CULTURE · SOUND</Text></View><View style={styles.eventInfo}><Text style={styles.eventDate}>{event.date.toUpperCase()}</Text><Text style={styles.eventTitle}>{event.title}</Text><Text style={styles.cardMeta}>{event.venue}</Text><Text style={styles.demoText}>DEMO EVENT · DETAILS UNCONFIRMED</Text></View></View>;
}

export function Chip({ label, selected, onPress }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}><Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text></Pressable>;
}

export function BottomNav() {
  const path = usePathname();
  const items = [{ label: 'Home', icon: '⌂', route: '/' }, { label: 'Artists', icon: '♫', route: '/explore' }, { label: 'Events', icon: '▦', route: '/events' }, { label: 'Profile', icon: '○', route: '/profile' }];
  return <SafeAreaView edges={['bottom']} style={styles.navSafe}><View style={styles.nav}>{items.map((item) => { const active = item.route === '/' ? path === '/' : path.startsWith(item.route); return <Pressable key={item.label} onPress={() => router.replace(item.route)} style={styles.navItem}><Text style={[styles.navIcon, active && styles.navActive]}>{item.icon}</Text><Text style={[styles.navLabel, active && styles.navActive]}>{item.label}</Text></Pressable>; })}</View></SafeAreaView>;
}

export function DemoFootnote() {
  return <Text style={styles.footnote}>Prototype content. Music releases, event dates and venues are illustrative and must be verified before publication.</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  page: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28, gap: 20 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  brandSymbol: { fontSize: 25, color: colors.ink, fontWeight: '900' },
  brandName: { color: colors.ink, fontSize: 18, fontWeight: '900', letterSpacing: -0.6 },
  brandSub: { color: colors.secondary, fontSize: 9, fontWeight: '900', letterSpacing: 2.2, marginTop: -1 },
  header: { gap: 7 },
  eyebrow: { color: colors.secondary, fontSize: 10, fontWeight: '900', letterSpacing: 1.7 },
  pageTitle: { color: colors.ink, fontSize: 29, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  action: { color: colors.secondary, fontSize: 11, fontWeight: '900' },
  avatar: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarNote: { position: 'absolute', right: 3, bottom: 2, width: 18, height: 18, borderRadius: 10, backgroundColor: '#fff', color: colors.ink, textAlign: 'center', lineHeight: 18, fontSize: 11, fontWeight: '900' },
  artistCard: { width: 110, alignItems: 'center', gap: 6, backgroundColor: colors.surface, padding: 12, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line },
  artistHorizontal: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  cardName: { color: colors.ink, fontSize: 12, fontWeight: '900' },
  cardMeta: { color: colors.muted, fontSize: 11 },
  releaseCard: { width: 142, gap: 5 },
  cover: { width: 142, height: 142, borderRadius: 17, padding: 12, justifyContent: 'space-between' },
  coverNote: { color: '#fff', fontSize: 25, fontWeight: '900' },
  coverTitle: { color: '#fff', fontSize: 15, lineHeight: 16, fontWeight: '900', letterSpacing: 0.8 },
  coverType: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1.3 },
  demoText: { color: colors.primaryDark, fontSize: 8, letterSpacing: 0.6, fontWeight: '900' },
  eventCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  eventArt: { height: 105, padding: 13, justifyContent: 'space-between' },
  eventArtTop: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 1.4 },
  eventArtIcon: { color: '#fff', fontSize: 37, fontWeight: '900', textAlign: 'center' },
  eventArtBottom: { color: '#fff', fontSize: 8, fontWeight: '900', letterSpacing: 1.5, textAlign: 'right' },
  eventInfo: { padding: 13, gap: 5 },
  eventDate: { color: colors.primaryDark, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  eventTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 99, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  chipSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { color: colors.muted, fontSize: 11, fontWeight: '800' },
  chipTextSelected: { color: '#fff' },
  footnote: { color: colors.muted, fontSize: 10, lineHeight: 15, textAlign: 'center' },
  navSafe: { backgroundColor: colors.surface },
  nav: { height: 61, borderTopWidth: 1, borderTopColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  navItem: { flex: 1, alignItems: 'center', gap: 3 },
  navIcon: { color: colors.muted, fontSize: 20, fontWeight: '800' },
  navLabel: { color: colors.muted, fontSize: 10, fontWeight: '700' },
  navActive: { color: colors.primaryDark, fontWeight: '900' },
});
