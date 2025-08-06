# Technology Stack

## Framework & Runtime
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library with TypeScript support
- **TypeScript 5** - Type-safe JavaScript development
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI component library for accessibility
- **Lucide React** - Icon library
- **next-themes** - Dark/light theme management
- **class-variance-authority (CVA)** - Component variant management
- **tailwind-merge + clsx** - Conditional CSS class handling

## Charts & Data Visualization
- **Recharts** - React charting library for analytics dashboards
- **date-fns** - Date manipulation and formatting

## Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

## UI Enhancement
- **Sonner** - Toast notifications
- **Embla Carousel** - Carousel/slider components
- **React Resizable Panels** - Resizable layout panels
- **Vaul** - Drawer/modal components

## Development Tools
- **ESLint** - Code linting (build errors ignored in config)
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Common Commands

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Package Management
- Uses **pnpm** as package manager
- Lock file: `pnpm-lock.yaml`

## Build Configuration
- ESLint errors ignored during builds
- TypeScript build errors ignored
- Images unoptimized for static export compatibility
- Path aliases: `@/*` maps to project root