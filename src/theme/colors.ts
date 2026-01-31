export const Colors = {
  light: {
    background: '#f3f4f6',
    card: '#ffffff',

    text: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',

    primary: '#2563eb',
    primaryLight: '#dbeafe',

    error: '#dc2626',
    errorLight: '#fee2e2',
    success: '#16a34a',

    border: '#e5e7eb',

    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    background: '#111827',
    card: '#1f2937',

    text: '#f9fafb',
    textSecondary: '#9ca3af',
    textTertiary: '#6b7280',

    primary: '#3b82f6',
    primaryLight: '#1e3a5f',

    error: '#ef4444',
    errorLight: '#7f1d1d',
    success: '#22c55e',

    border: '#374151',

    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export type ThemeColors = typeof Colors.light;
