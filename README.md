# Shopify Theme - Week5

A modern, responsive Shopify theme built with Liquid templating language, featuring advanced e-commerce functionality and customizable components.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Custom Sections**: Modular section system for easy content management
- **Advanced Cart System**: Real-time cart updates with drawer functionality
- **Product Variants**: Comprehensive product variant picker with swatches
- **Search & Filtering**: Advanced search with predictive suggestions
- **Multi-language Support**: Built-in internationalization (i18n)
- **Performance Optimized**: Lazy loading, optimized assets, and fast loading times

### Custom Sections
- **Image Comparison**: Interactive before/after image slider
- **Collage Layout**: Dynamic image collage with customizable layouts
- **Featured Collections**: Showcase collections with custom styling
- **Newsletter Signup**: Email capture with customizable banners
- **Contact Forms**: Custom contact form with validation
- **Video Sections**: Embedded video support with modal functionality
- **Rich Text**: Advanced text formatting with custom styling

### E-commerce Features
- **Quick Add**: Bulk product addition to cart
- **Wishlist**: Product wishlist functionality
- **Product Recommendations**: Related products display
- **Inventory Management**: Real-time stock level display
- **Payment Integration**: Multiple payment gateway support
- **Shipping Calculator**: Real-time shipping cost calculation

## 📁 Project Structure

```
Week5/
├── assets/                 # Static assets (CSS, JS, images)
│   ├── *.css              # Component-specific stylesheets
│   ├── *.js               # JavaScript functionality
│   └── *.svg              # Icon assets
├── config/                 # Theme configuration
│   ├── settings_data.json # Theme settings data
│   └── settings_schema.json # Theme settings schema
├── layout/                 # Layout templates
│   ├── theme.liquid       # Main theme layout
│   └── password.liquid    # Password page layout
├── locales/               # Internationalization files
│   └── *.json            # Language-specific translations
├── sections/              # Custom sections
│   ├── *.liquid          # Section templates
│   └── *.json           # Section group configurations
├── snippets/              # Reusable code snippets
│   └── *.liquid          # Component snippets
└── templates/             # Page templates
    ├── *.json            # Template configurations
    └── customers/        # Customer account templates
```

## 🛠️ Setup Instructions

### Prerequisites
- Shopify Partner account
- Shopify CLI installed
- Node.js (for development tools)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Week5
   ```

2. **Install Shopify CLI** (if not already installed)
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

3. **Login to Shopify**
   ```bash
   shopify auth login
   ```

4. **Connect to your store**
   ```bash
   shopify theme dev --store=your-store.myshopify.com
   ```

### Development Workflow

1. **Start development server**
   ```bash
   shopify theme dev
   ```

2. **Preview changes**
   - Changes are automatically synced to your development theme
   - Use the preview URL to test changes

3. **Deploy to production**
   ```bash
   shopify theme push
   ```

## 🎨 Customization

### Theme Settings
The theme includes extensive customization options accessible through the Shopify admin:

- **Colors**: Custom color schemes with CSS custom properties
- **Typography**: Google Fonts integration with custom font weights
- **Layout**: Flexible page width options (default, fluid, stretch, full)
- **Sections**: Modular section system for easy content management

### Custom Sections

#### Image Comparison Section
```liquid
{% section 'image-comparison' %}
```
Features:
- Interactive before/after image slider
- Customizable image ratios
- Responsive design
- Touch and mouse support
- Customizable labels and styling

#### Adding New Sections
1. Create a new `.liquid` file in the `sections/` directory
2. Define the section schema with settings and blocks
3. Add the section to your template files

### CSS Customization
- Component-specific stylesheets in `assets/`
- CSS custom properties for easy theming
- Responsive breakpoints and mobile-first design

## 🔧 Development Guidelines

### Code Standards
- **Liquid**: Follow Shopify's Liquid coding standards
- **CSS**: Use BEM methodology for class naming
- **JavaScript**: ES6+ with modern browser support
- **Accessibility**: WCAG 2.1 AA compliance

### File Naming Conventions
- **Sections**: `kebab-case.liquid`
- **Snippets**: `kebab-case.liquid`
- **Assets**: `component-name.css/js`

### Performance Best Practices
- Optimize images for web delivery
- Minimize CSS and JavaScript bundles
- Use lazy loading for images and videos
- Implement proper caching strategies

## 📱 Responsive Design

The theme is built with a mobile-first approach:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Breakpoint System
```css
/* Mobile first approach */
.element {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .element {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .element {
    /* Desktop styles */
  }
}
```

## 🌐 Internationalization

The theme supports multiple languages through the `locales/` directory:

- **English**: `en.default.json`
- **Spanish**: `es.json`
- **French**: `fr.json`
- **German**: `de.json`
- And many more...

### Adding New Languages
1. Create a new `.json` file in `locales/`
2. Translate all text strings
3. Update the language selector in the theme

## 🔍 SEO Features

- **Meta Tags**: Automatic meta tag generation
- **Structured Data**: Product and organization schema
- **Sitemap**: Automatic sitemap generation
- **Canonical URLs**: Proper canonical URL handling
- **Open Graph**: Social media sharing optimization

## 🚀 Performance Features

- **Lazy Loading**: Images and videos load on demand
- **Asset Optimization**: Minified CSS and JavaScript
- **CDN Integration**: Fast content delivery
- **Caching**: Browser and server-side caching
- **Image Optimization**: WebP format support

## 🛡️ Security

- **XSS Protection**: Input sanitization
- **CSRF Protection**: Cross-site request forgery prevention
- **Content Security Policy**: CSP headers implementation
- **HTTPS Enforcement**: Secure connections only

## 📊 Analytics Integration

- **Google Analytics**: Built-in GA4 support
- **Facebook Pixel**: Social media tracking
- **Conversion Tracking**: E-commerce event tracking
- **Custom Events**: Custom event tracking support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Checklist
- [ ] Code follows Shopify best practices
- [ ] Responsive design tested on all devices
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] Cross-browser compatibility verified

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check the Shopify theme documentation
- **Issues**: Create an issue in the repository
- **Shopify Support**: Contact Shopify support for platform-specific issues

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added image comparison section
- **v1.2.0**: Enhanced cart functionality
- **v1.3.0**: Performance optimizations

---

**Built with ❤️ for the Shopify ecosystem**
