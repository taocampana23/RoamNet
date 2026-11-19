import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return <><StatusBar barStyle="dark-content" backgroundColor={colors.background} /><Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="index" /><Stack.Screen name="explore" /><Stack.Screen name="events" /><Stack.Screen name="profile" /><Stack.Screen name="artist/[id]" /><Stack.Screen name="release/[id]" /></Stack></>;
}
