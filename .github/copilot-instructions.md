# Yami Sabonetes - AI Coding Guidelines

## Project Overview
This is a static React SPA for Yami Sabonetes, an artisanal soap brand. Built with Vite, TypeScript, and shadcn/ui components. No backend - all data is static, purchases redirect to WhatsApp.

## Architecture
- **Single Page Application** with React Router (only Index and NotFound pages)
- **Static product catalog** in `src/pages/Index.tsx` as a hardcoded array
- **Component library**: All shadcn/ui components pre-installed in `src/components/ui/`
- **Styling**: Tailwind CSS with custom color palette and fonts
- **State management**: Minimal (React Query, Zustand installed but unused)

## Key Files & Structure
- `src/pages/Index.tsx`: Main page with hero, products grid, about, contact sections
- `src/App.tsx`: Router setup with QueryClient and Toaster providers
- `src/lib/utils.ts`: `cn()` function for class merging
- `src/hooks/`: `useIsMobile()` and toast hooks
- `public/assets/`: Images for products and branding

## Styling Conventions
- **Colors**: 
  - Primary pink: `#c26072`
  - Light blue: `#c4dcf0`
  - White backgrounds, gray text
- **Fonts**:
  - Titles: `fontFamily: 'Floane, serif'`
  - Body: `fontFamily: 'Aileron, sans-serif'`
  - Applied as inline styles: `style={{ fontFamily: 'Floane, serif' }}`
- **Layout**: Container with `mx-auto px-4`, responsive grid (`md:grid-cols-3 lg:grid-cols-4`)
- **Cards**: Hover effects with `hover:shadow-2xl transform hover:-translate-y-2`

## Component Patterns
- **Product cards**: Image aspect-square, title, description, badges for benefits, price + buy button
- **Buy button**: Opens WhatsApp link `https://wa.me/5519991743043`
- **Sections**: ID anchors for navigation (`id="produtos"`)
- **Icons**: Lucide React icons (Leaf, Sparkles, Heart, etc.)

## Development Workflow
- **Package manager**: pnpm (scripts: `pnpm i`, `pnpm add`, `pnpm run dev`)
- **Build**: `pnpm run build` (outputs to dist/)
- **Lint**: `pnpm run lint` (ESLint with React rules)
- **Preview**: `pnpm run preview`
- **Alias**: `@/` resolves to `src/`

## Adding Products
Edit the `products` array in `src/pages/Index.tsx`:
```tsx
{
  name: 'Sabonete de Lavanda',
  description: 'Anti-inflamatório e relaxante',
  price: 'R$ 15,00',
  image: '/assets/soap-lavanda.jpg',
  benefits: ['Relaxante', 'Anti-inflamatório', 'Calmante'],
}
```
- Place images in `public/assets/`
- Update product count in section header

## TypeScript Notes
- Don't re-export types you're already importing (per README)
- Strict mode enabled
- Component props use shadcn patterns

## Deployment
Static site - deploy `dist/` folder after build. No server required.