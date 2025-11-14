# Design Specifications

This document contains the design specifications extracted from the Figma design. Use these values to match the visual design as closely as possible.

## Colors

### Primary Colors
```css
/* Primary Blue (Links, Active states) */
--primary-blue: #3B7FBF;
--primary-blue-hover: #2B6FA8;

/* Success Green (Active filters, status badges) */
--success-green: #10B981;
--success-green-light: #D1FAE5;

/* Danger Red (Remove actions) */
--danger-red: #EF4444;
```

### Neutral Colors
```css
/* Text Colors */
--text-primary: #111827;        /* Dark gray - main text */
--text-secondary: #6B7280;      /* Medium gray - secondary text */
--text-tertiary: #9CA3AF;       /* Light gray - placeholder text */

/* Background Colors */
--bg-white: #FFFFFF;
--bg-gray-50: #F9FAFB;          /* Light background */
--bg-gray-100: #F3F4F6;         /* Sidebar background */
--bg-gray-200: #E5E7EB;         /* Dividers, borders */

/* Border Colors */
--border-gray: #D1D5DB;
--border-light: #E5E7EB;
```

### Status Colors
```css
/* Status badges */
--status-active: #10B981;       /* Green */
--status-pending: #F59E0B;      /* Orange */
--status-rejected: #EF4444;     /* Red */
--status-neutral: #6B7280;      /* Gray */
```

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Font Sizes
```css
/* Headings */
--text-2xl: 24px;    /* Page title */
--text-xl: 20px;     /* Section headings */
--text-lg: 18px;     /* Subsection headings */

/* Body */
--text-base: 16px;   /* Regular text */
--text-sm: 14px;     /* Small text, labels */
--text-xs: 12px;     /* Captions, metadata */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## Spacing

### Container Spacing
```css
/* Page padding */
--page-padding-x: 24px;
--page-padding-y: 56px;

/* Sidebar width */
--sidebar-width: 200px;

/* Main content padding */
--content-padding: 24px;
```

### Component Spacing
```css
/* Gaps between elements */
--gap-xs: 4px;
--gap-sm: 8px;
--gap-md: 12px;
--gap-lg: 16px;
--gap-xl: 24px;
--gap-2xl: 32px;

/* Component internal padding */
--padding-xs: 4px;
--padding-sm: 8px;
--padding-md: 12px;
--padding-lg: 16px;
--padding-xl: 20px;
```

## Border Radius
```css
--radius-sm: 4px;      /* Inputs, buttons */
--radius-md: 6px;      /* Cards, containers */
--radius-lg: 8px;      /* Larger containers */
--radius-full: 9999px; /* Pills, circles */
```

## Shadows
```css
/* Subtle shadow for cards */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Medium shadow for dropdowns */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Large shadow for modals */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

## Component-Specific Specifications

### Header
```
Height: 57px
Background: #FFFFFF
Border bottom: 1px solid #E5E7EB
Logo width: 175px
Nav link spacing: 16px between items
```

### Sidebar
```
Width: 200px
Background: #FFFFFF
Padding: 0 (components have internal padding)
Border right: 1px solid #E5E7EB
```

### Search Input
```
Height: 32px
Border: 1px solid #D1D5DB
Border radius: 4px
Padding: 7px 10px 7px 30px (space for icon)
Font size: 14px
Icon size: 18px
Icon left position: 8px
```

### Dropdown
```
Height: 36px
Border: 1px solid #D1D5DB
Border radius: 4px
Padding: 8px 12px
Font size: 14px
Arrow icon: 14px
```

### Collapsible Section Header
```
Height: 40px
Padding: 11px 0
Font size: 14px
Font weight: 600
Icon size: 14px
Border bottom: 1px solid #E5E7EB
```

### Button - Primary
```
Height: 37px
Padding: 10px 20px
Border radius: 4px
Background: #3B7FBF
Color: #FFFFFF
Font size: 14px
Font weight: 500
Hover: #2B6FA8
```

### Button - Secondary
```
Height: 36px
Padding: 8px 16px
Border: 1px solid #D1D5DB
Border radius: 4px
Background: #FFFFFF
Color: #374151
Font size: 14px
Hover: #F9FAFB background
```

### Candidate Card
```
Border: 1px solid #E5E7EB
Border radius: 0 (square edges)
Padding: 20px 15px
Min height: varies by content
Row gap: 12px between sections
```

### Candidate Name (Link)
```
Font size: 20px
Font weight: 400
Color: #3B7FBF
Text decoration: none
Hover: underline
```

### Candidate Position/Company
```
Font size: 16px
Font weight: 400
Color: #6B7280
Line height: 1.5
```

### Job Title
```
Font size: 14px
Font weight: 400
Color: #111827
```

### Status Badge
```
Display: inline-block
Padding: 4px 10px
Border radius: 4px
Font size: 13px
Font weight: 400
Background: varies by status
```

### Pagination
```
Height: 36px
Gap between page numbers: 8px
Page number size: 41px × 35px
Font size: 16px
Current page background: #F3F4F6
Current page border: 1px solid #D1D5DB
```

### Action Links
```
Font size: 14px
Font weight: 400
Color: #3B7FBF
Text decoration: none
Hover: underline
```

### Interview Row
```
Padding: 9px 8px
Border bottom: 1px solid #E5E7EB
Font size: 13px
Link spacing: 8px gap
Divider: | character in gray
```

## Icons

### Icon Sizes
```
Small: 14px × 14px (chevrons, close buttons)
Medium: 18px × 18px (search, filter icons)
Large: 24px × 24px (nav icons, settings)
```

### Common Icons Needed
- Search (magnifying glass)
- Chevron down (dropdown indicators)
- Chevron right (collapsed state)
- Chevron down (expanded state)
- Close/X (remove filter tags)
- Plus (add actions)
- Info (tooltip icon)
- Settings gear
- Help question mark
- User avatar circle
- Left arrow (pagination)
- Right arrow (pagination)
- Ellipsis (more options)

## Responsive Breakpoints

For this assessment, focus on desktop only (1920px design). If time permits:

```css
/* Desktop */
@media (min-width: 1024px) {
  /* Full layout with sidebar */
}

/* Tablet (optional) */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Collapsible sidebar or stacked layout */
}

/* Mobile (optional) */
@media (max-width: 767px) {
  /* Mobile-first layout */
}
```

## Hover & Focus States

### Links
```
Default: color: #3B7FBF
Hover: text-decoration: underline
Focus: outline: 2px solid #3B7FBF, outline-offset: 2px
```

### Buttons
```
Default: solid background
Hover: slightly darker background (-10% brightness)
Active: even darker (-15% brightness)
Focus: outline ring
```

### Inputs
```
Default: border: #D1D5DB
Focus: border: #3B7FBF, ring: 2px #3B7FBF with opacity
```

## Accessibility Notes

- Ensure all interactive elements have focus states
- Maintain minimum contrast ratio of 4.5:1 for text
- Include proper ARIA labels for icon-only buttons
- Ensure keyboard navigation works for all interactive elements
- Add alt text for images (if any)

## Tailwind CSS Utility Reference

Common utilities you'll use:

```html
<!-- Colors -->
text-gray-900, text-gray-600, text-blue-600
bg-white, bg-gray-50, bg-gray-100
border-gray-300

<!-- Spacing -->
p-4, px-6, py-2, m-4, space-y-4, gap-4

<!-- Typography -->
text-sm, text-base, text-lg, text-xl, text-2xl
font-normal, font-medium, font-semibold

<!-- Layout -->
flex, flex-col, items-center, justify-between
grid, grid-cols-2

<!-- Borders -->
border, border-b, rounded, rounded-md

<!-- States -->
hover:bg-gray-50, focus:ring-2, active:bg-gray-200
```

## Notes

- The design uses a clean, professional aesthetic similar to modern SaaS applications
- Maintain consistent spacing throughout
- Use subtle transitions (150-200ms) for hover states
- Keep interactive elements clearly distinguishable
- Prioritize readability and scannability in the candidate list
