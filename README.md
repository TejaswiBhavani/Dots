# Dots - Connecting Arts to Hearts

A sophisticated e-commerce platform for authentic Indian handicrafts and artisan products, built with modern web technologies and enhanced with AI assistance.

## 🎨 Overview

Dots is a marketplace that bridges the gap between talented Indian artisans and art lovers worldwide. Our platform showcases traditional and contemporary crafts while providing a seamless shopping experience enhanced by AI-powered assistance.

## ✨ Features

### 🤖 AI Assistant
- **Intelligent Chat Support**: Contextual assistance for art discovery and product recommendations
- **Cultural Knowledge**: Deep understanding of Indian craft traditions and techniques
- **Personalized Recommendations**: AI-powered suggestions based on user preferences
- **Artisan Stories**: Learn about the artists and cultural significance behind each piece

### 🛒 E-commerce Functionality
- **Product Catalog**: Comprehensive catalog with advanced search and filtering
- **Shopping Cart**: Full cart management with local storage persistence
- **User Authentication**: Secure login/logout with member profiles
- **Order Management**: Complete order processing and history tracking
- **Wishlist**: Save favorite items for later
- **Custom Orders**: Commission personalized artworks from artisans

### 🎭 Product Categories
- **Pottery & Ceramics**: Traditional terracotta and modern ceramic pieces
- **Paintings**: Madhubani, Warli, and contemporary Indian art
- **Embroidery & Textiles**: Mirror work, thread art, and traditional fabrics
- **Metal Crafts**: Brass sculptures, jewelry, and decorative items
- **Wood Crafts**: Carved dolls, furniture, and decorative pieces
- **Vintage Collections**: Antique and heritage pieces

### 🌟 User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Performance**: Optimized loading and caching strategies
- **Accessibility**: WCAG compliant design for inclusive access
- **Multi-language Support**: English and regional Indian languages (coming soon)

## 🚀 Technology Stack

### Frontend
- **Framework**: Astro.js with React components
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **UI Components**: Radix UI primitives with custom styling

### Backend Integration
- **CMS**: Wix Headless CMS for content management
- **E-commerce**: Wix Stores for product and order management
- **Authentication**: Wix Members for user management
- **Media**: Wix Media for image optimization and delivery

### AI & Services
- **AI Assistant**: Custom service with OpenAI/Anthropic integration support
- **Search**: Advanced product search with filters and suggestions
- **Notifications**: Toast notification system for user feedback
- **Analytics**: Google Analytics 4 integration ready

### Development Tools
- **Build Tool**: Vite for fast development and optimized builds
- **Type Safety**: TypeScript for better developer experience
- **Linting**: ESLint with React and Astro plugins
- **Testing**: Vitest for unit and integration testing

## 🏗️ Architecture

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── pages/           # Page-specific components
│   └── AIAssistant.tsx  # AI chat widget
├── lib/                 # Utility libraries and services
│   ├── ai-assistant.ts  # AI service
│   ├── product-service.ts # Product catalog management
│   ├── cart-service.ts  # Shopping cart functionality
│   ├── config.ts        # Configuration management
│   └── notifications.ts # User notification system
├── integrations/        # External service integrations
│   ├── cms/            # Content management
│   └── members/        # User authentication
├── styles/             # Global styles and themes
└── pages/              # Astro page routes
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/TejaswiBhavani/Dots.git
   cd Dots
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.dots.com
VITE_WIX_API_KEY=your_wix_api_key

# AI Assistant
VITE_AI_PROVIDER=local  # openai | anthropic | local
VITE_AI_API_KEY=your_ai_api_key
VITE_AI_MODEL=gpt-3.5-turbo

# Feature Flags
VITE_FEATURE_AI_ASSISTANT=true
VITE_FEATURE_CUSTOM_ORDERS=true
VITE_FEATURE_WISHLIST=true

# Business Configuration
VITE_CURRENCY=INR
VITE_DEFAULT_SHIPPING_COST=100
VITE_FREE_SHIPPING_THRESHOLD=2000
VITE_SUPPORT_EMAIL=support@dots.com
```

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run check           # Type check with Astro

# Testing
npm run test:run        # Run unit tests
npm run test:watch      # Run tests in watch mode

# Wix Integration
npm run env             # Pull environment from Wix
npm run release         # Deploy to Wix Studio
```

## 🎯 Key Features in Detail

### AI Assistant

The AI assistant provides intelligent support for users browsing the platform:

- **Contextual Responses**: Understands Indian craft traditions and terminology
- **Product Discovery**: Helps users find products based on occasions, preferences, and needs
- **Artisan Information**: Shares stories about artists and craft techniques
- **Shopping Assistance**: Guides users through the purchase process
- **Cultural Education**: Educates about the heritage and significance of various crafts

### Product Management

Comprehensive product catalog with:

- **Advanced Search**: Full-text search with intelligent filters
- **Category Browsing**: Organized by craft type, region, and occasion
- **Dynamic Loading**: Optimized loading with pagination and lazy loading
- **Rich Media**: High-quality images with zoom and gallery views
- **Artist Profiles**: Detailed information about each artisan

### Shopping Experience

Seamless e-commerce functionality:

- **Smart Cart**: Persistent cart with item management
- **Secure Checkout**: Integrated payment processing
- **Order Tracking**: Real-time order status updates
- **Wishlist Management**: Save and organize favorite items
- **Custom Requests**: Commission personalized artworks

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

### Quick Deploy Options

1. **Wix Studio** (Recommended for production)
   ```bash
   npm run build
   npm run release
   ```

2. **Vercel** (Great for development/demo)
   - Connect GitHub repository to Vercel
   - Configure build command: `npm run build`
   - Set environment variables in Vercel dashboard

3. **Netlify**
   - Connect GitHub repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🤝 Contributing

We welcome contributions to improve the Dots platform! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use the existing component patterns
- Add tests for new functionality
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Artisans**: The talented craftspeople who create these beautiful pieces
- **Wix Studio**: For providing the robust backend infrastructure
- **Open Source Community**: For the amazing tools and libraries used in this project
- **Contributors**: Everyone who has helped improve this platform

## 📞 Support

For support, email support@dots.com or join our community discussions.

## 🔗 Links

- **Live Demo**: [dots-demo.vercel.app](https://dots-demo.vercel.app)
- **Documentation**: [docs.dots.com](https://docs.dots.com)
- **API Reference**: [api.dots.com/docs](https://api.dots.com/docs)
- **Community**: [community.dots.com](https://community.dots.com)

---

**Dots - Where Art Meets Heart** ❤️