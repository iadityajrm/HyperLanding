---
name: Minimalist Organic
colors:
  surface: '#fcf9f6'
  surface-dim: '#dcd9d7'
  surface-bright: '#fcf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f0'
  surface-container: '#f0edea'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e5e2df'
  on-surface: '#1c1c1a'
  on-surface-variant: '#50453b'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f3f0ed'
  outline: '#82756a'
  outline-variant: '#d4c4b7'
  surface-tint: '#7c5730'
  primary: '#79542e'
  on-primary: '#ffffff'
  primary-container: '#956c44'
  on-primary-container: '#fffbff'
  inverse-primary: '#eebd8e'
  secondary: '#586154'
  on-secondary: '#ffffff'
  secondary-container: '#d9e3d2'
  on-secondary-container: '#5c6558'
  tertiary: '#68594a'
  on-tertiary: '#ffffff'
  tertiary-container: '#827261'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#eebd8e'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#61401b'
  secondary-fixed: '#dce5d4'
  secondary-fixed-dim: '#c0c9b9'
  on-secondary-fixed: '#161e13'
  on-secondary-fixed-variant: '#41493d'
  tertiary-fixed: '#f4dfcb'
  tertiary-fixed-dim: '#d7c3b0'
  on-tertiary-fixed: '#241a0e'
  on-tertiary-fixed-variant: '#524436'
  background: '#fcf9f6'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2df'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system is built upon the principles of modern minimalism, seeking to evoke a sense of calm, sophistication, and unobtrusive elegance. It is designed for users who appreciate clarity and a quiet digital environment. 

The aesthetic blends clean, technical precision with an organic, earthy warmth. By utilizing generous whitespace and a "less is more" philosophy, the UI breathes, allowing content to take center stage without competing with the interface elements. The emotional response should be one of serenity and focus—a digital sanctuary that feels grounded and high-end.

## Colors
The palette is derived from natural, earthy elements, moving away from sterile whites and harsh blacks toward a more sophisticated "off-white" and "soft stone" foundation.

- **Primary (Warm Clay):** A muted terracotta used sparingly for primary actions and key highlights.
- **Secondary (Muted Sage):** A desaturated green used for success states, secondary accents, and subtle categorization.
- **Tertiary (Sand):** A warm, neutral tone used for decorative elements, subtle backgrounds, and non-interactive dividers.
- **Neutral (Soft Stone):** The foundation of the UI. It provides a warmer, more inviting backdrop than pure white, reducing eye strain and reinforcing the organic feel.

## Typography
The design system utilizes **Geist** across all levels to maintain a clean, modern, and technical edge that balances the warmth of the color palette. 

The typographic hierarchy emphasizes vertical rhythm and legibility. Headlines use lighter weights and tighter letter-spacing for a sophisticated "editorial" look. Body text is set with generous line heights (1.6) to enhance readability and contribute to the overall airy feel of the layout. Labels use slightly heavier weights and increased tracking to ensure they remain distinct despite their smaller scale.

## Layout & Spacing
This design system employs a **fixed-width centered grid** for desktop to ensure content remains readable and focused, transitioning to a fluid layout for mobile devices.

The spacing rhythm is based on an 8px scale, but emphasizes larger increments (LG and XL) to create the "airy" feel requested. 
- **Desktop:** 12-column grid with a maximum container width of 1200px.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Whitespace should be used intentionally to separate sections rather than relying on heavy dividers or borders. "Negative space" is treated as a first-class design element to guide the user's eye.

## Elevation & Depth
Depth in this design system is achieved through **soft shadows** and **low-contrast outlines** rather than heavy tonal layering. 

- **Surface Tiers:** Backgrounds use the Neutral Soft Stone color. Interactive cards or modals use a pure white surface to subtly lift them from the background.
- **Shadows:** Use extremely diffused, long-range shadows with low opacity (e.g., `box-shadow: 0 10px 30px rgba(166, 124, 82, 0.05)`). The shadow color should be slightly tinted with the Primary Warm Clay to maintain the organic feel.
- **Borders:** Subtle 1px borders in a shade just slightly darker than the background (e.g., Tertiary Sand) are used to define boundaries without creating visual noise.

## Shapes
The shape language is "Rounded," utilizing a 0.5rem (8px) base radius. This strikes a balance between the precision of minimalism and the friendliness of the organic theme. 

- **Small elements (Checkboxes, Tags):** 4px radius.
- **Standard components (Buttons, Inputs, Cards):** 8px radius.
- **Large containers (Modals, Featured Sections):** 16px or 24px radius to emphasize a softer, more approachable architecture.
- Avoid pill-shaped buttons; the 8px radius maintains a more sophisticated, architectural structure.

## Components
- **Buttons:** Primary buttons use a solid Warm Clay fill with white text. Secondary buttons use a ghost style with a subtle Sand border and Clay text. Hover states should involve a gentle shift in background opacity rather than a dramatic color change.
- **Input Fields:** Use a 1px Sand border and Soft Stone background. On focus, the border transitions to Muted Sage. Avoid heavy inner shadows.
- **Cards:** Cards should have no border, a pure white background, and the "Ambient Shadow" defined in the Elevation section. Padding within cards should be generous (24px or 32px).
- **Chips/Tags:** Small, 4px rounded shapes with a light Muted Sage background and darker Sage text. Used for categorization without drawing excessive attention.
- **Lists:** Lists should feature significant vertical padding (16px+) between items and thin, low-opacity Sand dividers that do not span the full width of the container.
- **Progress Indicators:** Use the Muted Sage color for a calm, non-urgent sense of movement or completion.