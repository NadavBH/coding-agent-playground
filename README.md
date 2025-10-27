# 🧸 Contoso Toyland

A modern React.js e-commerce web application for a toy store featuring a clean, polished UI with professional animations and an intuitive admin management system.

## ✨ Features

- **Product Browsing**: Browse featured toys with hover effects and detailed product pages
- **Shopping Cart**: Add items to cart with inline quantity adjustment controls
- **Admin Panel**: Secure admin dashboard for inventory management
- **Add New Products**: Admins can add new toys with name, price, and image URL
- **Responsive Design**: Optimized layout that works seamlessly across all device sizes
- **Polished UI**: Professional animations and interactive feedback throughout
- **Form Validation**: Client-side validation with error messaging on admin forms
- **Inline CSS Styling**: All styling uses React inline CSS objects (no external frameworks)

## 🛠️ Tech Stack

- **Frontend**: React 18 with React Router v7
- **Build Tool**: Vite v6+
- **State Management**: Zustand
- **Styling**: Inline CSS (React style objects only)
- **Deployment**: Azure App Service (Linux)
- **Languages**: JavaScript ES2025 with JSX

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nadavbh/coding-agent-playground.git
   cd coding-agent-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`

4. Build for production:
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

## 📁 Project Structure

```
src/
├── pages/
│   ├── App.jsx          # Main navigation and routing container
│   ├── Home.jsx         # Product grid with featured toys
│   ├── Product.jsx      # Individual product detail page
│   ├── Cart.jsx         # Shopping cart with quantity management
│   └── Admin.jsx        # Admin panel for inventory management
├── store.js             # Zustand state management
├── main.jsx             # Application entry point
└── index.css            # Global styles
public/                  # Static assets
package.json             # Project dependencies and scripts
vite.config.js           # Vite configuration
server.js                # Node.js HTTP server for production
```

## 🎨 UI Features

### Navigation
- Active page highlighting with smooth border transitions
- Cart badge showing item count
- Clean dark navbar with responsive layout

### Product Cards
- **Hover Effects**: 4px depth lift with shadow enhancement
- **Image Display**: 200px height with cover fit
- **Pricing**: Prominent green color (#16a34a) for prices
- **Call-to-Action**: View Details button with hover effects

### Product Page
- Large product image with 45% flex layout
- Detailed product information and pricing
- Quantity selector (1-10 items)
- Add to Cart and Continue Shopping buttons
- Info box with shipping and guarantee details
- Loading spinner animation during data fetch
- Error state with user-friendly messaging

### Shopping Cart
- Cart items with product image and details
- Inline quantity controls: − input + buttons
- Remove item functionality
- Cart summary with total calculation
- Empty cart state with helpful messaging
- Professional checkout button

### Admin Panel
- Secure login page (demo credentials below)
- Admin dashboard with authentication indicator
- Add New Toy form with validation
- Error messages with red border highlights
- Form field validation for name, price, and image URL

## 🔐 Admin Access

The application includes a demo admin panel:

**Demo Credentials:**
- **Username**: `admin`
- **Password**: `toyland123`

**Admin Functions:**
- Add new toys to inventory
- Set toy name (2-50 characters)
- Set toy price ($0.01-$999.99)
- Provide image URL (PNG, JPG, GIF, WebP)

## 🎯 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Buttons, links, accents
- **Success Green**: `#16a34a` - Prices, positive actions
- **Error Red**: `#dc2626` - Errors, destructive actions
- **Neutral Gray**: `#6b7280` - Secondary text
- **Dark Gray**: `#1f2937` - Primary text, headings

### Animations
- **Timing**: 200-300ms with cubic-bezier easing
- **Hover Effects**: 4px lift, shadow enhancement
- **Loading Spinner**: 0.8s linear rotation
- **Transitions**: Smooth color and transform changes

### Typography
- **Headings**: Bold (700) with increased size
- **Body Text**: Regular (500-600) for readability
- **Labels**: Semi-bold (600) for form fields
- **Emphasis**: Font weight 700 for prices and totals

## 📱 Responsive Design

The application uses CSS Grid and Flexbox for responsive layouts:

```javascript
// Product grid example
gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
// Adapts from 1-6 columns based on screen width
```

All components work seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop screens (1200px+)

## ♿ Accessibility

- **Semantic HTML**: Proper use of form elements, labels, and headings
- **Focus Management**: Clear focus indicators on interactive elements
- **Color Contrast**: WCAG AA compliant color combinations
- **Keyboard Navigation**: All features accessible via keyboard
- **Error Messages**: Clear, descriptive validation feedback
- **ARIA Labels**: Proper labeling for screen readers

## 🚢 Deployment

The application is configured for deployment on Azure App Service:

1. Build the project:
   ```bash
   npm run build
   ```

2. The `server.js` file serves the SPA with proper routing fallback

3. Deploy the `dist/` folder to Azure App Service

4. Set environment variables as needed (PORT, NODE_ENV)

## 📚 State Management

Using Zustand for simple, efficient state management:

```javascript
const useStore = create((set) => ({
  toys: [],
  cart: [],
  addToCart: (toy) => set(state => ({ 
    cart: [...state.cart, toy] 
  })),
  // ... other actions
}));
```

All state is centralized in `src/store.js` for easy management and testing.

## 🔧 Development Workflow

1. **Start Dev Server**: `npm run dev`
2. **Make Changes**: Edit files in `src/pages/`
3. **Hot Module Reload**: Changes apply instantly
4. **Check Errors**: Run `npm run lint` for code quality
5. **Build for Production**: `npm run build` creates optimized bundle

## 📦 Dependencies

Key dependencies (see `package.json` for complete list):
- `react@^18` - UI library
- `react-router-dom@^7` - Client-side routing
- `zustand` - State management
- `vite@^6` - Build tool and dev server
- `eslint` - Code quality

## 📝 Styling Guidelines

This project uses **inline CSS only** - no CSS files or external frameworks:

```javascript
// Preferred pattern
const buttonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#16a34a',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.2s ease',
};

return <button style={buttonStyle}>Click Me</button>;
```

Maintain consistency by referencing existing component styling patterns.

## 🤝 Contributing

This project follows specific architectural guidelines:

- **Component Structure**: Functional components with hooks only
- **Styling**: Inline CSS objects (NO external frameworks)
- **File Naming**: `PascalCase.jsx` for components, `camelCase.js` for utilities
- **State**: Zustand for global state management
- **Security**: No hardcoded secrets; use environment variables

See `.github/copilot-instructions.md` for detailed contribution guidelines.

## 📄 License

This project is provided as-is for educational and demonstration purposes.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev)
- [JavaScript ES2025 Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

**Last Updated**: October 27, 2025

Built with ❤️ as a demonstration of modern React development practices with inline CSS styling and professional UI/UX design.
