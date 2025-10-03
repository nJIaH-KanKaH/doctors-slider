# Doctors Slider Component

A React-based interactive doctors slider/carousel component with filtering capabilities, built for integration with Bitrix CMS.

## Features

- **Dynamic Slider**: Responsive carousel powered by Swiper.js with custom navigation controls
- **Advanced Filtering**: Multi-select filters for specialties, branches, and other doctor attributes
- **Lazy Loading**: Progressive image loading with base64 placeholders
- **Infinite Scroll**: Automatic pagination with "load more" on scroll
- **/*TODO*/ SSR Support**: Server-side rendering compatible for better SEO and performance
- **Responsive Design**: Adaptive breakpoints for all device sizes
- **Bitrix Integration**: Seamless integration with Bitrix CMS components

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Swiper 11** - Touch-enabled slider
- **React Select** - Accessible dropdown filters
- **Sass** - CSS preprocessing

## Installation

```bash
npm install
```

## Development

Start the development server with hot module replacement:

```bash
npm run dev
```

Start with mock API server:

```bash
npm start
```

## Build

Build for production:

```bash
npm run build
```

This generates optimized UMD and ES module bundles in the `dist/` directory.

## Usage

The component is designed to be integrated into Bitrix CMS pages via PHP configuration:

```php
// config.php
return [
    'css' => './doctors-slider/dist/doctors-slider.css',
    'js' => './doctors-slider/dist/doctors-slider.js',
];
```

### Component Props

**App Component:**

- `filter_types` - Array of filter configurations
- `breakpoints` - Responsive breakpoint settings
- `fetch_options` - API fetch configuration
- `spaceBetween` - Space between slides (default: 20)
- `speed` - Transition speed in ms (default: 200)
- `initialData` - Server-rendered initial data

**DoctorSlider Component:**

- `component` - Bitrix component name
- `action` - API action endpoint
- `signedParameters` - Signed parameters for secure requests
- `filters` - Active filter values
- `csrfToken` - CSRF token for security
- `initialDoctors` - Pre-loaded doctors array
- `imagePlaceholderBase64` - Base64 placeholder for lazy images

## Project Structure

```
doctors-slider/
├── src/
│   ├── components/
│   │   ├── DoctorsSlider/      # Main slider component
│   │   ├── DoctorSelect/        # Filter select components
│   │   ├── LazyImage/           # Lazy loading image component
│   │   └── Icons/               # SVG icon components
│   ├── services/
│   │   └── FetchData/           # API fetch utilities
│   ├── App.jsx                  # Root application component
│   └── App.scss                 # Global styles
├── dist/                        # Production build output
└── package.json
```

## License

MIT License - Free to use, modify, and distribute.

<h2>By the author</h2>

I tried to write a wrapper for swiper library, i've added couple of react-select nodes that will add filter requests
