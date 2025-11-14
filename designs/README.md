# Design Reference

## Figma Design

**Reference Design**: [View in Figma](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11)

This is the "All Candidates Page" from Greenhouse that you should replicate.

## What's Included

- **specs.md** - Detailed design specifications including:
  - Colors (primary, neutral, status colors)
  - Typography (font sizes, weights, line heights)
  - Spacing (padding, margins, gaps)
  - Component specifications (buttons, inputs, cards, etc.)
  - Hover and focus states
  - Tailwind CSS utility references

## Key Design Elements

### Layout
- Sidebar: 200px fixed width on the left
- Main content: Flexible width, fills remaining space
- Background: Light gray (#F9FAFB)

### Components to Implement
1. **Sidebar**
   - Search input
   - Toggle switch (Full Text Search)
   - Dropdown (Sort by Last Activity)
   - Collapsible filter sections
   - Reset Filters button

2. **Main Content**
   - Results summary with filter tags
   - Action buttons (Generate Report, Add Candidate, Bulk Actions)
   - Candidate cards/rows
   - Pagination

3. **Candidate Cards**
   - Name (clickable link)
   - Position/Company
   - Job Title
   - Status badge
   - Availability section (if applicable)
   - Interview stages list (if applicable)

## Color Palette

### Primary
- Primary Blue: `#3B7FBF`
- Primary Blue Hover: `#2B6FA8`

### Neutral
- Text Primary: `#111827`
- Text Secondary: `#6B7280`
- Border: `#D1D5DB`
- Background: `#FFFFFF`

### Status
- Success Green: `#10B981`
- Warning Orange: `#F59E0B`
- Danger Red: `#EF4444`

## Tips

1. **Use Tailwind utilities** - Most styling can be done with Tailwind classes
2. **Match spacing precisely** - Pay attention to padding and margins in the design
3. **Hover states matter** - Links should underline on hover, buttons should change color
4. **Focus states** - Add proper focus rings for accessibility
5. **Borders** - Most borders are 1px solid #E5E7EB

## Questions?

Refer to `specs.md` for detailed measurements and specifications.
