export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    accent: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      900: '#0f172a',
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    hero: 'bg-gradient-to-br from-blue-50 via-white to-green-50',
    section: 'bg-gradient-to-b from-blue-50/30 to-white',
    card: 'bg-gradient-to-br from-white to-blue-50/30',
  },
  shadows: {
    soft: 'shadow-lg shadow-blue-500/10',
    elegant: 'shadow-xl shadow-blue-500/20',
    glow: 'shadow-2xl shadow-blue-500/30',
  },
  animations: {
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in',
    float: 'animate-float',
    glow: 'animate-glow',
  }
} as const;

export type Theme = typeof theme;