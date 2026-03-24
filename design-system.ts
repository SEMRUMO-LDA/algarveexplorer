/**
 * Design System - Algarve Explorer
 * Senior UX/UI Standards for Consistency
 */

export const designSystem = {
  // Spacing Scale (rem based for accessibility)
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    xxl: '4rem',     // 64px
    xxxl: '6rem',    // 96px
    section: {
      mobile: '4rem',   // 64px
      tablet: '6rem',   // 96px
      desktop: '8rem',  // 128px
    }
  },

  // Typography Scale
  typography: {
    // Font Sizes
    fontSize: {
      xs: '0.625rem',   // 10px - Legal text, badges
      sm: '0.6875rem',  // 11px - Small buttons, labels
      base: '1rem',     // 16px - Body text
      lg: '1.125rem',   // 18px - Large body
      xl: '1.25rem',    // 20px - Small headings
      '2xl': '1.5rem',  // 24px - Card titles
      '3xl': '2rem',    // 32px - Section headings mobile
      '4xl': '2.5rem',  // 40px - Section headings tablet
      '5xl': '3rem',    // 48px - Section headings desktop
      '6xl': '3.5rem',  // 56px - Hero mobile
      '7xl': '4.5rem',  // 72px - Hero tablet
      '8xl': '6rem',    // 96px - Hero desktop
    },
    // Line Heights
    lineHeight: {
      tight: '1.1',
      snug: '1.2',
      normal: '1.5',
      relaxed: '1.7',
      loose: '2',
    },
    // Letter Spacing
    tracking: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
      widest: '0.2em',
      ultrawide: '0.3em',
    }
  },

  // Touch Targets (WCAG AAA Standard)
  touchTargets: {
    minimum: '44px',     // iOS Human Interface Guidelines
    recommended: '48px', // Material Design
    comfortable: '56px', // Extra comfortable for elderly users
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1600px',
  },

  // Animation Durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    full: '9999px',
  },

  // Shadows (Consistent elevation)
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 20px rgba(0,0,0,0.1)',
    xl: '0 20px 40px rgba(0,0,0,0.15)',
    '2xl': '0 25px 50px rgba(0,0,0,0.2)',
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    overlay: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  }
};

// Mobile-First Component Standards
export const componentStandards = {
  button: {
    minHeight: '48px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '24px',
  },
  card: {
    padding: {
      mobile: '24px',
      tablet: '32px',
      desktop: '40px',
    },
    gap: {
      mobile: '16px',
      tablet: '20px',
      desktop: '24px',
    }
  },
  section: {
    padding: {
      mobile: 'py-16', // 64px
      tablet: 'md:py-24', // 96px
      desktop: 'lg:py-32', // 128px
    }
  }
};