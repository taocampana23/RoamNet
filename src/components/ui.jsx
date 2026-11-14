import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '../theme/colors';

export function Page({ children, scroll = true, dark = false, contentStyle }) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.pageContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.pageContent, contentStyle]}>{children}</View>
  );

  return <SafeAreaView style={[styles.safe, dark && styles.dark]}>{content}</SafeAreaView>;
}

export function Brand({ compact = false, light = false }) {
  return (
    <View style={styles.brandRow}>
      <View style={styles.brandMark}>
        <Text style={styles.brandWifi}>⌁</Text>
        <View style={styles.brandDot} />
      </View>
      <Text style={[styles.brandName, compact && styles.brandNameCompact, light && styles.brandLight]}>
        roamnet
      </Text>
    </View>
  );
}

export function PrimaryButton({ title, onPress, disabled = false, loading = false, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.primaryButton,
        style,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryButtonText}>{title}</Text>}
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.secondaryButton, style, pressed && styles.pressed]}
    >
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </Pressable>
  );
}

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftText,
  rightText,
  onRightPress,
  multiline = false,
}) {
  return (
    <View style={styles.fieldWrap}>
      {!!label && <Text style={styles.fieldLabel}>{label}</Text>}
      <View style={[styles.inputBox, multiline && styles.multilineBox]}>
        {!!leftText && <Text style={styles.inputPrefix}>{leftText}</Text>}
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8A9699"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {!!rightText && (
          <Pressable accessibilityRole="button" onPress={onRightPress}>
            <Text style={styles.inputRight}>{rightText}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function ScreenTitle({ title, subtitle, back = false, right }) {
  return (
    <View style={styles.screenTitleWrap}>
      <View style={styles.titleTopRow}>
        {back ? (
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        ) : <View />}
        {right || null}
      </View>
      {!!title && <Text style={styles.screenTitle}>{title}</Text>}
      {!!subtitle && <Text style={styles.screenSubtitle}>{subtitle}</Text>}
    </View>
  );
}

export function HotspotCard({ hotspot, onPress }) {
  const available = hotspot.status === 'Available';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress || (() => router.push({ pathname: '/hotspot-details', params: { id: hotspot.id } }))}
      style={({ pressed }) => [styles.hotspotCard, pressed && styles.pressed]}
    >
      <View style={[styles.hotspotIcon, !available && styles.hotspotIconMuted]}>
        <Text style={styles.hotspotIconText}>⌁</Text>
      </View>
      <View style={styles.hotspotInfo}>
        <Text numberOfLines={1} style={styles.hotspotName}>{hotspot.name}</Text>
        <Text style={styles.hotspotMeta}>{hotspot.area} · {hotspot.distance} away</Text>
        <View style={[styles.statusPill, available ? styles.statusAvailable : styles.statusBusy]}>
          <View style={[styles.statusDot, { backgroundColor: available ? colors.green : colors.muted }]} />
          <Text style={[styles.statusText, { color: available ? colors.green : colors.muted }]}>{hotspot.status}</Text>
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export function BottomNav({ active = 'Home' }) {
  const items = [
    { label: 'Home', icon: '⌂', path: '/home' },
    { label: 'Explore', icon: '◎', path: '/explore' },
    { label: 'Connections', icon: '⌁', path: '/connection-status' },
    { label: 'Profile', icon: '○', path: null },
  ];

  return (
    <SafeAreaView edges={['bottom']} style={styles.bottomSafe}>
      <View style={styles.bottomNav}>
        {items.map((item) => {
          const selected = active === item.label;
          return (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              onPress={() =>
                item.path
                  ? router.replace(item.path)
                  : Alert.alert('Profile', 'Profile settings will be added in a later RoamNet update.')
              }
              style={styles.navItem}
            >
              <View style={[styles.navIconWrap, selected && styles.navIconActive]}>
                <Text style={[styles.navIcon, selected && styles.navIconSelected]}>{item.icon}</Text>
              </View>
              <Text style={[styles.navLabel, selected && styles.navLabelSelected]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export function DemoNotice({ children = 'Demo interface · sample data · no live Wi-Fi connection' }) {
  return <Text style={styles.demoNotice}>{children}</Text>;
}

export function SectionHeading({ title, action, onAction }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {!!action && (
        <Pressable accessibilityRole="button" onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  dark: { backgroundColor: colors.navy },
  pageContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28, gap: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  brandWifi: { color: colors.white, fontSize: 25, lineHeight: 28, fontWeight: '700', transform: [{ rotate: '90deg' }] },
  brandDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.white, position: 'absolute', bottom: 7 },
  brandName: { color: colors.navy, fontSize: 20, fontWeight: '800', letterSpacing: -0.6 },
  brandNameCompact: { fontSize: 18 },
  brandLight: { color: colors.white },
  primaryButton: { minHeight: 54, borderRadius: 14, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  secondaryButton: { minHeight: 54, borderRadius: 14, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  secondaryButtonText: { color: colors.navy, fontSize: 16, fontWeight: '700' },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  fieldWrap: { gap: 8 },
  fieldLabel: { color: colors.navy, fontSize: 13, fontWeight: '700' },
  inputBox: { minHeight: 52, flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, paddingHorizontal: 15 },
  input: { flex: 1, color: colors.navy, fontSize: 15, paddingVertical: 12 },
  inputPrefix: { color: colors.navy, fontWeight: '700', paddingRight: 12, borderRightWidth: 1, borderRightColor: colors.border, marginRight: 12 },
  inputRight: { color: colors.muted, fontWeight: '700', padding: 6 },
  multilineBox: { minHeight: 100, alignItems: 'flex-start' },
  multilineInput: { minHeight: 84, width: '100%' },
  screenTitleWrap: { gap: 8, marginTop: 4 },
  titleTopRow: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 30, color: colors.navy, lineHeight: 32, marginTop: -4 },
  screenTitle: { color: colors.navy, fontSize: 27, fontWeight: '800', letterSpacing: -0.7 },
  screenSubtitle: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  hotspotCard: { minHeight: 88, padding: 13, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', gap: 12 },
  hotspotIcon: { width: 58, height: 58, borderRadius: 14, backgroundColor: colors.tealLight, alignItems: 'center', justifyContent: 'center' },
  hotspotIconMuted: { backgroundColor: colors.soft },
  hotspotIconText: { fontSize: 35, color: colors.teal, transform: [{ rotate: '90deg' }] },
  hotspotInfo: { flex: 1, gap: 4 },
  hotspotName: { color: colors.navy, fontSize: 14, fontWeight: '800' },
  hotspotMeta: { color: colors.muted, fontSize: 12 },
  statusPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 3, marginTop: 2 },
  statusAvailable: { backgroundColor: '#E8F4ED' },
  statusBusy: { backgroundColor: colors.soft },
  statusDot: { width: 6, height: 6, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '800' },
  chevron: { fontSize: 27, color: colors.muted, paddingHorizontal: 4 },
  bottomSafe: { backgroundColor: colors.white },
  bottomNav: { height: 66, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 8 },
  navItem: { width: '25%', alignItems: 'center', gap: 2 },
  navIconWrap: { width: 48, height: 27, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  navIconActive: { backgroundColor: '#E6F5F1' },
  navIcon: { fontSize: 21, color: colors.muted, fontWeight: '500' },
  navIconSelected: { color: colors.teal, fontWeight: '800' },
  navLabel: { fontSize: 10, color: colors.muted },
  navLabelSelected: { color: colors.teal, fontWeight: '800' },
  demoNotice: { color: colors.muted, fontSize: 11, textAlign: 'center', lineHeight: 16 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { color: colors.navy, fontSize: 17, fontWeight: '800' },
  sectionAction: { color: colors.teal, fontSize: 13, fontWeight: '700' },
});
