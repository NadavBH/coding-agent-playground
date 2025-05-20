
# Contoso Toyland

Welcome to Contoso Toyland, a modern React.js application for a toy store built with Vite and Chakra UI. This interactive demo showcases a toy store with admin functionality for managing inventory.

## Features

- **Randomized Product Display**: Shows a different selection of toys on each page load
- **Admin Panel**: Secure admin access for inventory management
- **Add New Products**: Admins can add new toys to the store inventory
- **Toast Notifications**: User-friendly feedback for all actions
- **Responsive Design**: Optimized for all device sizes with Chakra UI's responsive grid system
- **Accessible UI**: Built with accessibility in mind using Chakra UI's accessible components

## Technologies

- **React.js** v19.1.0 - Frontend library
- **Vite** v6.3.5 - Build tool and development server
- **Chakra UI** v3.19.1 - Component library with built-in accessibility
- **Emotion** - CSS-in-JS styling solution
- **Framer Motion** - Animation library for UI interactions

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/contoso-toyland.git
   cd contoso-toyland
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`

### Scripts

- **Development**: `npm run dev` - Start development server
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
