import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, GestureResponderEvent, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
  small?: boolean;
}

export const AppButton: React.FC<Props> = ({ title, onPress, loading, disabled, variant = 'primary', style, small }) => {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        small && styles.small,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size={small ? 'small' : 'small'} color={variant === 'outline' ? Colors.light.tint : '#fff'} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'outline' && { color: Colors.light.tint },
            variant === 'ghost' && { color: Colors.light.tint },
            small && styles.labelSmall,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 22,
    gap: 8,
  },
  primary: {
    backgroundColor: Colors.light.tint,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelSmall: { fontSize: 13, fontWeight: '600' },
  small: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
});

export default AppButton;
