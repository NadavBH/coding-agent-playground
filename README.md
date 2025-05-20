
# Contoso Toyland

Welcome to Contoso Toyland, a modern e-commerce demonstration application showcasing a fictional toy store. This React.js website was built with Vite and Chakra UI to provide a responsive, accessible user interface with a clean design.

## Features

- **Dynamic Product Display:** Randomized toy store items on each page visit to simulate a changing inventory
- **Admin Dashboard:** Secure admin interface for managing store inventory
  - Add new toys with name, price, and image URL
  - Changes reflected immediately in the store display
- **Responsive Design:** Fully responsive layout that works on mobile, tablet, and desktop devices
- **Accessible UI:** Built with accessibility in mind using Chakra UI components

## Technologies Used

- **React 19:** Modern UI library for building component-based interfaces
- **Vite:** Next-generation frontend tooling for fast development and optimized builds
- **Chakra UI:** Component library with accessibility and responsive design built-in
- **React Hooks:** For state management and component lifecycle

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/contoso-toyland.git
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

4. Open your browser to the displayed URL (usually http://localhost:5173)

## Project Structure

```
contoso-toyland/
├── public/            # Static assets and favicon
├── src/
│   ├── App.jsx        # Main application component
│   ├── App.css        # Application-specific styles
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point with app providers
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

## Admin Access

The application includes an admin interface to demonstrate content management:

1. Scroll to the bottom of the page to find the admin login form
2. Use the following credentials:
   - Username: `admin`
   - Password: `toyland123`
3. After successful login, the admin form will change to a "Add New Toy" form
4. Fill out the form to add new toys to the store display

> ⚠️ **Note:** These credentials are for demonstration purposes only. In a real application, never store credentials in client-side code.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code
- `npm run preview` - Preview production build locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [Chakra UI](https://chakra-ui.com/) for UI components.
