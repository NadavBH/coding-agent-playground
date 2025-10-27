<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# GitHub Copilot Instructions for Contoso Toyland

## Project Overview

Contoso Toyland is a modern React.js e-commerce website for a toy store. The site features product browsing, shopping cart functionality, and an admin dashboard for inventory management. The application uses inline CSS styling (no external UI frameworks) and Zustand for state management.

## Technology Stack

- **Frontend Framework:** React 18 with React Router v7
- **State Management:** Zustand (centralized store for toys and shopping cart)
- **Build Tool:** Vite (development server on port 5174)
- **Styling:** Inline CSS only (React style objects, NO external frameworks like Chakra UI or Bootstrap)
- **Deployment:** Azure App Service for real!
- **Development Runtime:** Node.js 18+

## General Guidelines

### Coding Style

- **Language:** Use modern JavaScript (ES6+) with functional components and React hooks
- **Indentation:** Use 2 spaces for indentation (JavaScript/JSX standard)
- **Naming Conventions:** 
  - Use `camelCase` for variables, functions, and methods
  - Use `PascalCase` for React component names
  - Use `UPPER_SNAKE_CASE` for constants
- **Modularity:** 
  - Keep components small and focused on a single responsibility
  - Extract reusable logic into custom hooks or utility functions
  - Avoid creating components larger than 300 lines

### Comments & Documentation

- Add comments only for complex logic or non-obvious code sections
- Do not over-comment simple, self-explanatory code
- Use JSDoc format for function documentation: `/** @description ... */`
- Keep comments concise and meaningful

## Styling Guidelines

### Critical: Inline CSS Only

- **NO external CSS frameworks** (no Chakra UI, Bootstrap, Tailwind, etc.)
- **NO separate CSS files** except for global styles in `src/index.css`
- **Use React inline style objects** for all component styling
- All style objects should be defined within the component function
- Use `clamp()` for fluid responsive sizing (e.g., `fontSize: 'clamp(1.5rem, 5vw, 2rem)'`)
- Use flexbox and CSS Grid for layouts
- Ensure mobile-first responsive design with proper padding/margin on smaller screens

### Color Palette

- **Primary Blue:** `#2563eb` (links, secondary buttons, accents)
- **Dark Blue:** `#1d4ed8` (hover state for blue)
- **Success Green:** `#16a34a` (primary buttons, CTAs)
- **Dark Green:** `#15803d` (button hover)
- **Error Red:** `#ef4444`, `#dc2626` (destructive actions)
- **Light Red:** `#fee2e2` (error backgrounds)
- **Text Dark:** `#1f2937` (primary text)
- **Text Gray:** `#6b7280` (secondary text)
- **Borders:** `#e5e7eb` (light gray borders)
- **Light Blue Background:** `#dbeafe` (info boxes)

### Accessibility & Responsive Design

- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Add proper focus states for keyboard navigation
- Ensure button/link outlines with `outline: 2px solid #2563eb`
- Test layouts at 320px, 640px, 768px, and 1024px breakpoints
- Use descriptive alt text for all images
- Maintain minimum 44px touch target sizes for interactive elements

## Architecture

### Directory Structure

```
src/
├── pages/          # Page components (Home, Product, Cart, Admin)
├── assets/         # Images, logos, icons
├── store.js        # Zustand state management
├── App.jsx         # Navigation/layout component
├── main.jsx        # Entry point
├── index.css       # Global styles
└── App.css         # Legacy (minimal usage)
```

### Component Structure

Each component should:
1. Import necessary dependencies
2. Define inline style objects within the component
3. Use `useState` and `useEffect` for local state
4. Use Zustand's `useStore()` hook for global state
5. Return JSX with inline styles applied

Example:
```javascript
export default function ComponentName() {
  const storeValue = useStore(s => s.property);
  
  const containerStyle = {
    display: 'flex',
    padding: '1.5rem',
  };
  
  return <div style={containerStyle}>Content</div>;
}
```

### State Management with Zustand

- Store is located at `src/store.js`
- All global state (toys array, shopping cart) lives in the store
- Use `useStore(state => state.property)` to access state
- Keep store methods simple: `addToy()`, `addToCart()`, `removeFromCart()`, `getToyById()`
- Initial data: 6 toy items with `{ id, name, price, image }`

## Task-Specific Instructions

### Code Generation

- Follow existing directory structure and naming conventions
- Prioritize reusability; extract common patterns into shared functions/styles
- Include error handling for network requests and edge cases
- For new components, provide loading and error states
- Always use inline styles; never import external CSS frameworks

### Code Review

- Identify potential bugs in state management (side effects, re-renders)
- Check for responsive design issues across all breakpoints
- Verify inline styles are properly structured and not duplicated
- Ensure accessibility best practices are followed
- Flag any import of external CSS frameworks

### Bug Fixes

- Test on multiple screen sizes (mobile, tablet, desktop)
- Verify button interactions and form submissions work
- Check that Zustand state updates propagate correctly
- Ensure images load from correct URLs
- Validate cart operations (add, remove, quantity updates)

### Image URLs

Product images are sourced from DepositPhotos:
- Classic Teddy Bear: `https://static4.depositphotos.com/1016383/320/i/950/depositphotos_3207311-stock-photo-teddy-bear.jpg`
- Wooden Building Blocks: `https://st.depositphotos.com/1837549/1445/i/600/depositphotos_14455295-stock-photo-last-brick-on-the-wall.jpg`
- Action Figure Set: `https://st3.depositphotos.com/4147207/32948/i/600/depositphotos_329480942-stock-photo-kuala-lumpur-malaysia-april-2018.jpg`
- Remote Control Car: `https://st.depositphotos.com/2702761/3300/i/600/depositphotos_33005961-stock-photo-remote-controlled-toy-car-with.jpg`
- Puzzle Game Set: `https://static7.depositphotos.com/1007298/717/i/600/depositphotos_7179193-stock-photo-jigsaw-puzzle.jpg`
- Board Game Collection: `https://st5.depositphotos.com/78102430/74650/i/600/depositphotos_746501320-stock-photo-man-playing-board-game-chess.jpg`

Logo: `/contosologo.png` (public folder)

## Feature Specifications

### Pages

1. **Home.jsx** - Product grid with logo header
   - Display 6 toy items in responsive grid
   - Responsive grid: `repeat(auto-fill, minmax(250px, 1fr))`
   - Card hover effects with shadow enhancement

2. **Product.jsx** - Product detail page
   - Large product image with details
   - Quantity selector (1-10)
   - "Add to Cart" button (green)
   - "Continue Shopping" link (blue)
   - Info box with shipping/guarantee details

3. **Cart.jsx** - Shopping cart management
   - Display cart items with images
   - Quantity controls (+/−)
   - Remove item functionality
   - Cart total calculation
   - "Proceed to Payment" button

4. **Admin.jsx** - Admin inventory management
   - Login form (demo credentials: admin/toyland123)
   - Add New Toy form with validation
   - Form error messages with red borders
   - Success notifications

### Navigation (App.jsx)

- Dark header with Contoso logo
- Navigation links: Home, Cart, Admin
- Cart badge showing item count
- Active page highlighting with bottom border

## Common Patterns

### Responsive Style Object

```javascript
const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '1.5rem',
};
```

### Fluid Font Sizing

```javascript
fontSize: 'clamp(1.5rem, 5vw, 2rem)' // min, preferred, max
```

### Button Hover Effects

```javascript
onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
```

## Commit Messages

- **Format:** `<type>: <description>`
- **Types:** `feat` (feature), `fix` (bug fix), `style` (CSS/styling), `refactor`, `docs`
- **Examples:**
  - `feat: Add responsive product detail page layout`
  - `fix: Correct getToyById implementation in Zustand store`
  - `style: Improve mobile layout for buttons and text overflow`

## Deployment & Building

- **Development:** `npm run dev` (runs Vite dev server on http://localhost:5174/)
- **Build:** `npm run build` (generates optimized production build)
- **Preview:** `npm run preview` (preview production build locally)
- **Target:** Azure App Service (infrastructure in `/infrastructure` folder)

## Troubleshooting Checklist

- [ ] Are you using inline CSS objects, not external frameworks?
- [ ] Do style objects have consistent naming (containerStyle, buttonStyle, etc.)?
- [ ] Is the layout responsive (tested at 320px, 640px, 768px, 1024px)?
- [ ] Are images loading from correct DepositPhotos URLs?
- [ ] Does Zustand store properly initialize with 6 toy items?
- [ ] Are button clicks properly calling store methods?
- [ ] Is cart count badge updating correctly?
- [ ] Do all links use React Router navigation?
