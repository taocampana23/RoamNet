import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { RoamProvider } from '../src/context/RoamContext';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <RoamProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="create-account" />
        <Stack.Screen name="home" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="hotspot-details" />
        <Stack.Screen name="connection-status" />
      </Stack>
    </RoamProvider>
  );
}
