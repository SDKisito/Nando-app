import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard, Shield, Bell, CircleHelp as HelpCircle, Settings, LogOut, ChevronRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, shadows } from '@/src/config/theme';
import Header from '@/src/components/Header';
import Button from '@/src/components/Button';

const menuItems = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: User,
    onPress: () => console.log('Personal Info'),
  },
  {
    id: 'cards',
    title: 'Cards & Accounts',
    icon: CreditCard,
    onPress: () => console.log('Cards'),
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    onPress: () => console.log('Security'),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    onPress: () => console.log('Notifications'),
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    onPress: () => console.log('Help'),
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    onPress: () => console.log('Settings'),
  },
];

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <Text style={styles.memberSince}>Member since Dec 2023</Text>
          </View>
        </View>

        {/* Account Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Account Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Account Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Verified</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monthly Limit</Text>
            <Text style={styles.summaryValue}>$5,000</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Used This Month</Text>
            <Text style={styles.summaryValue}>$1,247.50</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.8}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <item.icon size={20} color={colors.primary[500]} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            style={{ borderColor: colors.error[500] }}
            textStyle={{ color: colors.error[500] }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: colors.neutral[50],
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  editButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[50],
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.body.fontSize,
    color: colors.neutral[600],
    marginBottom: spacing.xs,
  },
  memberSince: {
    fontSize: typography.caption.fontSize,
    color: colors.neutral[500],
  },
  summaryCard: {
    backgroundColor: colors.neutral[50],
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  summaryTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.neutral[900],
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.body.fontSize,
    color: colors.neutral[600],
  },
  summaryValue: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  statusBadge: {
    backgroundColor: colors.success[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[50],
  },
  menuSection: {
    backgroundColor: colors.neutral[50],
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuItemText: {
    fontSize: typography.body.fontSize,
    fontWeight: '500',
    color: colors.neutral[900],
  },
  logoutSection: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});