# Contoso Toyland - React E-Commerce Application

A modern, responsive React e-commerce website for a toy store built with React 18, React Router v7, and Zustand state management. The application features product browsing, shopping cart functionality, and an admin dashboard for inventory management.

## 🎯 Features

### Customer Features
- **Product Browsing**: Responsive grid layout showcasing 6 toy products with images and prices
- **Product Details**: Detailed product page with images, descriptions, and shipping information
- **Shopping Cart**: Add/remove items, adjust quantities (1-10), and view totals
- **Responsive Design**: Mobile-first design that works on 320px to 1024px+ screens

### Admin Features
- **Admin Login**: Secure login interface (demo credentials for testing)
- **Inventory Management**: Add new toys with name, price, and image URL
- **Form Validation**: Real-time validation with error messages and visual feedback
- **Success Notifications**: Confirmation messages when toys are added

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with React Router v7
- **State Management**: Zustand (lightweight, centralized store)
- **Build Tool**: Vite (fast development server and production builds)
- **Styling**: Inline CSS only (React style objects, no external frameworks)
- **Development Runtime**: Node.js 18+
- **Deployment**: Azure App Service

## 📦 Project Structure

```
src/
├── App.jsx                 # Main navigation and layout component
├── main.jsx               # React entry point with BrowserRouter
├── store.js               # Zustand centralized state management
├── index.css              # Global responsive styles
├── pages/
│   ├── Home.jsx           # Product grid showcase
│   ├── Product.jsx        # Product detail page
│   ├── Cart.jsx           # Shopping cart management
│   └── Admin.jsx          # Admin login and inventory panel
└── assets/                # Images and static files
```

## 🏗️ Architecture

### State Management (Zustand)

The `store.js` file contains all global application state:

```javascript
// Initial 6 toys with product images
toys: [
  { id: 1, name: 'Classic Teddy Bear', price: 24.99, image: '...' },
  { id: 2, name: 'Wooden Building Blocks', price: 34.99, image: '...' },
  // ... 4 more toys
]

// Shopping cart items
cart: []

// Store methods
- addToy(toy)              // Add new toy to inventory
- addToCart(toy)           // Add item to cart
- removeFromCart(index)    // Remove item by index
- getToyById(id)           // Retrieve toy by ID
```

### Component Architecture

#### `App.jsx` - Navigation Layout
- Dark header with Contoso logo
- Navigation links: Home, Cart, Admin
- Cart badge showing item count
- Active page highlighting

#### `Home.jsx` - Product Grid
- Displays all toys in responsive CSS Grid
- Grid adapts: `repeat(auto-fill, minmax(250px, 1fr))`
- Card hover effects with shadow and transform
- Links to product detail pages

#### `Product.jsx` - Product Details
- Responsive flex layout (stacks on mobile)
- Large product image with alt text
- Quantity selector (1-10)
- Add to Cart button with loading state
- Info box with shipping/guarantee details
- Continue Shopping link

#### `Cart.jsx` - Shopping Cart
- List of cart items with images and prices
- Quantity controls (+/- buttons and input)
- Remove item functionality
- Real-time total calculation
- Proceed to Payment button
- Empty cart state with helpful messaging

#### `Admin.jsx` - Admin Panel
- **Login Screen**: Username/password authentication
  - Demo credentials for testing
  - Error messages for invalid login
- **Admin Dashboard**: After authentication
  - Form with name, price, and image URL fields
  - Real-time form validation
  - Error messages with red borders
  - Success notification after adding toy
  - Logout button

## 🎨 Design System

### Colors
- **Primary Green**: `#16a34a` (buttons, CTAs)
- **Dark Green**: `#15803d` (button hover)
- **Primary Blue**: `#2563eb` (links, secondary buttons)
- **Dark Blue**: `#1d4ed8` (blue hover)
- **Error Red**: `#dc2626` (destructive actions)
- **Light Red**: `#fee2e2` (error backgrounds)
- **Text Dark**: `#1f2937` (primary text)
- **Text Gray**: `#6b7280` (secondary text)
- **Borders**: `#e5e7eb` (light gray)

### Responsive Breakpoints
- **Mobile**: 320px - 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px+

### Fluid Typography
Using CSS `clamp()` for responsive font sizes:
```javascript
fontSize: 'clamp(1.5rem, 5vw, 2rem)' // min, preferred, max
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NadavBH/coding-agent-playground.git

# Navigate to project
cd coding-agent-playground

# Install dependencies
npm install
```

### Development

```bash
# Start Vite dev server (http://localhost:5174)
npm run dev
```

The dev server supports hot module replacement (HMR) for instant updates.

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📝 How the Code Works

### Adding Items to Cart

**Flow**: Product.jsx → Store.addToCart() → Cart.jsx

```javascript
// User clicks "Add to Cart" button
const handleAddToCart = () => {
  for (let i = 0; i < quantity; i++) {
    addToCart(toy);  // Add item to Zustand store
  }
};

// Store updates cart state
addToCart: (toy) => set(state => ({ 
  cart: [...state.cart, toy] 
}))

// Cart.jsx reads from store and displays items
const cart = useStore(s => s.cart);
```

### Product Lookup

**Flow**: Product.jsx → Store.getToyById() → Toy details displayed

```javascript
// URL param: /product/:id
const { id } = useParams();

// Get toy from store
const getToyById = useStore(s => s.getToyById);
const toy = getToyById(id);

// Render product details
```

### Admin Adding New Toy

**Flow**: Admin.jsx → Form Validation → Store.addToy() → Inventory updated

```javascript
// User submits form
const handleSubmit = (e) => {
  const errors = validateForm(formData);  // Client-side validation
  
  if (errors) {
    setFormErrors(errors);  // Show errors
    return;
  }
  
  addToy(newToy);  // Add to store
  setSuccessMessage('Toy added successfully!');
};

// Store adds toy to inventory
addToy: (toy) => set(state => ({ 
  toys: [...state.toys, toy] 
}))
```

### Calculating Cart Total

**Flow**: Cart.jsx → Quantity map → Reduce function

```javascript
// For each item, multiply price by quantity
const totalAmount = cart.reduce((total, item, idx) => 
  total + (item.price * (quantities[idx] || 1)), 
  0
);

// Display formatted total
<div>${totalAmount.toFixed(2)}</div>
```

## 🎭 Styling Approach

All styling uses **inline CSS objects** (no external frameworks):

```javascript
// Style objects defined in component
const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '1.5rem',
};

// Applied to JSX
<div style={containerStyle}>
  Content
</div>

// Hover effects using onMouseEnter/onMouseLeave
onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
```

## ♿ Accessibility Features

- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- Descriptive alt text for all images
- Proper form labels with `htmlFor` attributes
- Focus states for keyboard navigation
- Minimum 44px touch target sizes
- Color contrast meeting WCAG guidelines

## 🔒 Security Notes

- **Demo Credentials**: Admin login uses demo credentials for testing only
- **No Backend Auth**: This is a frontend demo; production requires real authentication
- **No Sensitive Data**: No credentials or API keys in code

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

### Azure App Service

The project includes infrastructure-as-code for Azure deployment:

```bash
# Build for production
npm run build

# Deploy to Azure App Service
# (See deploy.sh or deploy.ps1 scripts)
```

## 📚 Key Patterns

### Zustand Store Usage

```javascript
// Access store values
const toys = useStore(s => s.toys);
const cart = useStore(s => s.cart);

// Call store methods
const addToCart = useStore(s => s.addToCart);
addToCart(toy);
```

### React Router Navigation

```javascript
// Navigate to route
<Link to="/product/1">View Details</Link>

// Get URL parameters
const { id } = useParams();
```

### Responsive Flexbox

```javascript
const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem',
  // Stacks on mobile, side-by-side on desktop
};
```

## 🐛 Troubleshooting

### Dev server not starting
```bash
npm run dev
# Check if port 5174 is available
# Or specify different port: npm run dev -- --port 5175
```

### Images not loading
- Verify image URLs are correct and accessible
- Check image URL format in store.js
- Ensure image URLs use HTTPS

### Cart not updating
- Check browser console for errors
- Verify Zustand store is properly initialized
- Ensure `useStore` hook is imported in component

### Admin form validation failing
- Check form field names match validation rules
- Verify URL format is correct
- Ensure price is numeric and positive

## 📖 Code Quality

- **ESLint**: Configured for React best practices
- **Functional Components**: All components use React hooks
- **Custom Hooks**: Reusable logic extracted when needed
- **JSDoc Comments**: Key functions documented
- **No External CSS Frameworks**: Pure inline CSS for full control

## 🤝 Contributing

To add features to Contoso Toyland:

1. Follow the inline CSS styling pattern
2. Keep components under 300 lines
3. Add JSDoc comments for complex logic
4. Test responsive design at 320px, 640px, 768px, 1024px
5. Ensure accessibility standards are met

## 📄 License

This project is part of the Contoso Toyland demo application.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Built with**: React 18 + Vite + Zustand
- **Build**: `npm run build` - Create production build
- **Preview**: `npm run preview` - Preview production build locally
- **Lint**: `npm run lint` - Run ESLint to check code quality

## Project Structure

- `src/` - Source code directory
  - `App.jsx` - Main application component with toy store logic
  - `main.jsx` - Application entry point with React and ChakraProvider setup
  - `index.css` - Global CSS styles
- `public/` - Static assets
- `eslint.config.js` - ESLint configuration

## Admin Access

The application includes an admin panel for managing the toy inventory:

- **Username**: `admin`
- **Password**: `toyland123`

Admin functionality includes:
- Adding new toys to the store inventory
- Setting toy name, price, and image URL

## Responsive Design

The application uses Chakra UI's responsive features:
- Responsive grid: `<SimpleGrid columns={[1, 2, 3]} spacing={6}>`
- The grid displays 1 column on mobile, 2 on tablet, and 3 on desktop

## Accessibility Features

- Semantic HTML structure
- Form labels properly associated with inputs
- Color contrast compliance
- Focus management
- Screen reader friendly components from Chakra UI

---

This project was built with [Vite](https://vitejs.dev/) and [Chakra UI](https://chakra-ui.com/).
