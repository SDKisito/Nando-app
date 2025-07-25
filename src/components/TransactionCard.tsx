import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../config/theme';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  recipient?: string;
  sender?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

export default function TransactionCard({ transaction, onPress }: TransactionCardProps) {
  const { type, amount, recipient, sender, date, status } = transaction;
  const isSent = type === 'sent';
  
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return colors.success[500];
      case 'pending':
        return colors.warning[500];
      case 'failed':
        return colors.error[500];
      default:
        return colors.neutral[400];
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: isSent ? colors.error[50] : colors.success[50] }]}>
          {isSent ? (
            <ArrowUpRight size={20} color={colors.error[500]} />
          ) : (
            <ArrowDownLeft size={20} color={colors.success[500]} />
          )}
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>
            {isSent ? `To ${recipient}` : `From ${sender}`}
          </Text>
          <Text style={[styles.amount, { color: isSent ? colors.error[500] : colors.success[500] }]}>
            {isSent ? '-' : '+'}${amount.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.date}>{date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  amount: {
    fontSize: typography.body.fontSize,
    fontWeight: '700',
  },
  date: {
    fontSize: typography.caption.fontSize,
    color: colors.neutral[500],
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[50],
    textTransform: 'capitalize',
  },
});