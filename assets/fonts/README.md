# Font Configuration

This project now uses **Google Fonts** instead of custom font files for better compatibility and easier setup.

## Current Font Setup

### Inter (replacing Cirka)

- Used for headings, titles, and display text
- Available weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Automatically loaded via `@expo-google-fonts/inter`

### Poppins (replacing Gilroy)

- Used for body text and general content
- Available weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Automatically loaded via `@expo-google-fonts/poppins`

### Overpass Mono

- Used for monospace text
- Available weights: Regular (400), SemiBold (600), Bold (700)
- Automatically loaded via `@expo-google-fonts/overpass-mono`

## Font Aliases

For backward compatibility, the following aliases are maintained:

- `Cirka-Regular` → `Inter_400Regular`
- `Cirka-Bold` → `Inter_700Bold`
- `Gilroy-Regular` → `Poppins_400Regular`
- `Gilroy-Medium` → `Poppins_500Medium`
- `Gilroy-SemiBold` → `Poppins_600SemiBold`
- `Gilroy-Bold` → `Poppins_700Bold`

## Usage in Components

You can use these fonts with Tailwind classes:

- **Headings/Titles**: `font-heading`, `font-title`, `font-display`, `font-inter`
- **Body text**: `font-body`, `font-sans`, `font-gilroy`, `font-poppins`
- **Monospace**: `font-mono`, `font-overpass`

## Adding Custom Fonts (Optional)

If you want to add custom fonts in the future:

1. Place font files (.otf or .ttf) in this directory
2. Update the font loading in `App.jsx`
3. Update the Tailwind configuration in `tailwind.config.js`
4. Restart your Expo development server

## Benefits of Google Fonts

- ✅ No need to download and manage font files
- ✅ Automatic loading and caching
- ✅ Consistent cross-platform rendering
- ✅ Reduced bundle size
- ✅ Better performance
