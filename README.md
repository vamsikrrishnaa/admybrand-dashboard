# ADmyBRAND Insights 📊

A modern, fully responsive analytics dashboard for brand insights and digital marketing performance tracking. Built with Next.js 14, React 18, and TypeScript.

![ADmyBRAND Insights Dashboard](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📱 **Fully Mobile Responsive**
- Mobile-first design with adaptive layouts
- Touch-friendly navigation and interactions
- Responsive charts and data visualizations
- Mobile-optimized data tables with card views

### 📈 **Real-time Analytics Dashboard**
- Live data updates with real-time metrics
- Interactive charts and visualizations using Recharts
- Key performance indicators (KPIs) tracking
- Revenue, user growth, and conversion analytics

### 🎯 **Campaign Management**
- Complete CRUD operations for marketing campaigns
- Campaign performance tracking and optimization
- Multi-platform campaign support (Google Ads, Facebook, etc.)
- Budget tracking and ROI analysis

### 🎨 **Modern UI/UX**
- Dark/light theme support with system preference detection
- Smooth animations and transitions
- Accessible design following WCAG guidelines
- Clean, professional interface built with Radix UI

### 📊 **Advanced Data Visualization**
- Multiple chart types: Bar, Line, Pie, Funnel, Heatmap
- Interactive tooltips and hover effects
- Responsive chart containers
- Export functionality (PDF/CSV)

### 🔍 **Enhanced Data Tables**
- Advanced filtering and search capabilities
- Sortable columns with multi-level sorting
- Pagination with customizable page sizes
- Bulk operations and row selection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vamsikrrishnaa/admybrand-dashboard.git
   cd admybrand-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library with TypeScript support
- **TypeScript 5** - Type-safe JavaScript development

### **Styling & UI**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI component library for accessibility
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light theme management
- **class-variance-authority (CVA)** - Component variant management

### **Charts & Data Visualization**
- **Recharts** - React charting library for analytics dashboards
- **date-fns** - Date manipulation and formatting

### **Forms & Validation**
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### **UI Enhancement**
- **Sonner** - Toast notifications
- **Embla Carousel** - Carousel/slider components
- **React Resizable Panels** - Resizable layout panels
- **Vaul** - Drawer/modal components

## 📁 Project Structure

```
admybrand-dashboard/
├── app/                          # Next.js App Router
│   ├── analytics/               # Analytics deep-dive page
│   ├── calendar/                # Calendar/scheduling interface
│   ├── campaigns/               # Campaign management
│   ├── help/                    # Help and documentation
│   ├── reports/                 # Report generation and viewing
│   ├── revenue/                 # Revenue analysis
│   ├── settings/                # Application settings
│   ├── users/                   # User management
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main dashboard
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components (Radix UI + Tailwind)
│   ├── *-chart.tsx             # Chart components
│   ├── *-card.tsx              # Card components
│   ├── data-table.tsx          # Data table components
│   ├── sidebar.tsx             # Navigation sidebar
│   └── header.tsx              # Header with search and navigation
├── lib/                         # Utilities and data
│   ├── utils.ts                # Common utilities
│   ├── mock-data.ts            # Mock data for development
│   └── enhanced-mock-data.ts   # Extended mock data sets
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
└── public/                      # Static assets
```

## 🎯 Key Pages & Features

### **Dashboard Overview** (`/`)
- Real-time metrics with live updates
- Revenue, users, conversions, and growth tracking
- Interactive charts with multiple data views
- Mobile-responsive metric cards with carousel

### **Analytics** (`/analytics`)
- Deep-dive analytics and insights
- Advanced filtering and date range selection
- Performance comparisons and trends

### **Campaign Management** (`/campaigns`)
- Create, edit, and manage marketing campaigns
- Performance tracking and optimization
- Budget management and ROI analysis
- Multi-platform campaign support

### **Revenue Tracking** (`/revenue`)
- Revenue breakdown and analysis
- Source attribution and performance
- Financial KPIs and trends

### **User Analytics** (`/users`)
- User behavior and engagement metrics
- Segmentation and cohort analysis
- Growth tracking and retention

## 📱 Mobile Responsiveness

The dashboard is built with a mobile-first approach:

- **Responsive Navigation**: Collapsible sidebar on desktop, slide-out menu on mobile
- **Adaptive Charts**: Charts automatically resize and optimize for different screen sizes
- **Mobile Data Tables**: Card-based view for better mobile experience
- **Touch-Friendly**: All interactions optimized for touch devices
- **Responsive Typography**: Text scales appropriately across devices

## 🎨 Theming

- **Dark/Light Mode**: Automatic system preference detection
- **Custom CSS Variables**: Easy theme customization
- **Consistent Design System**: Unified color palette and spacing
- **Accessible Colors**: WCAG compliant color contrasts

## 🔧 Development

### **Available Scripts**

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### **Build Configuration**
- ESLint errors ignored during builds for faster development
- TypeScript strict mode enabled
- Path aliases: `@/*` maps to project root
- Images unoptimized for static export compatibility

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### **Netlify**
1. Build the project: `pnpm build`
2. Deploy the `out` folder to Netlify

### **Other Platforms**
The project supports static export and can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Recharts](https://recharts.org/) for beautiful React charts
- [Lucide](https://lucide.dev/) for the icon library

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation in the `/help` page
- Contact the development team

---

**Built with ❤️ by [Vamsi Krishna](https://github.com/vamsikrrishnaa)**

⭐ **Star this repository if you found it helpful!**