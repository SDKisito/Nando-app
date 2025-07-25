import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Valeurs de style en dur
const colors = {
  primary: { 500: '#4f46e5', 700: '#4338ca' },
  neutral: { 50: '#ffffff', 200: '#e5e7eb' },
  secondary: { 500: '#10b981' }
};

const spacing = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48
};

const borderRadius = {
  full: 1000,
  xl: 16
};

const typography = {
  body: { fontSize: 16 },
  caption: { fontSize: 12 }
};

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo / Branding */}
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>💳</Text>
            </View>
            <Text style={styles.brandName}>Nando</Text>
            <Text style={styles.brandTagline}>Smart money transfers made simple</Text>
          </View>

          {/* Hero image */}
          <View style={styles.heroSection}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg'
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureText}>Instant transfers</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureText}>Bank-level security</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌍</Text>
              <Text style={styles.featureText}>Global reach</Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.ghostButton]}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.secondaryButtonText}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between'
  },
  brandSection: {
    alignItems: 'center',
    paddingTop: spacing.xxxl
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg
  },
  logoText: {
    fontSize: 32
  },
  brandName: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.neutral[50],
    marginBottom: spacing.sm
  },
  brandTagline: {
    fontSize: typography.body.fontSize,
    color: colors.neutral[200],
    textAlign: 'center'
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: spacing.xl
  },
  heroImage: {
    width: 280,
    height: 200,
    borderRadius: borderRadius.xl
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg
  },
  feature: {
    alignItems: 'center',
    flex: 1
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: spacing.sm
  },
  featureText: {
    fontSize: typography.caption.fontSize,
    color: colors.neutral[200],
    textAlign: 'center',
    fontWeight: '500'
  },
  actionSection: {
    paddingBottom: spacing.xl,
    gap: spacing.md
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center'
  },
  primaryButton: {
    backgroundColor: colors.secondary[500]
  },
  ghostButton: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  },
  secondaryButtonText: {
    color: colors.neutral[200],
    fontSize: 16
  }
});
