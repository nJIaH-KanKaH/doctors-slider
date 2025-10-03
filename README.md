## Doctors Slider Component

A React-based interactive doctors slider/carousel component with filtering capabilities, built for integration with Bitrix CMS.

## Features

- **Dynamic Slider**: Responsive carousel powered by Swiper.js with custom navigation controls
- **Advanced Filtering**: Multi-select filters for doctor specialties, medical branches, and patient age groups
- **Lazy Loading**: Progressive image loading with base64 placeholders for better performance
- **Infinite Scroll**: Automatic pagination with "load more" functionality
- **Mock API Server**: Built-in Express server for development and testing (not included in repo for security)
- **SSR Support** *(Work in Progress)*: Attempting to implement server-side rendering with `hydrateRoot`
- **Responsive Design**: Adaptive breakpoints for all device sizes (desktop, tablet, mobile)
- **Bitrix Integration**: Designed to work seamlessly with Bitrix CMS components

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

## 🚀 Development

### Development Mode (Vite Only)

Start the development server with hot module replacement:

```bash
npm run dev
# or
yarn dev
```

This runs Vite dev server on `http://localhost:5173`

### Development with Mock API

Start with the mock API server (requires `server.js` - not included in repo):

```bash
npm start
# or
yarn start
```

This runs both Vite dev server and Express API server concurrently.

## 🏗 Build

Build for production:

```bash
npm run build
# or
yarn build
```

This generates optimized bundles in the `dist/` directory:
- UMD bundle for direct browser usage
- ES module bundle for modern bundlers
- Minified and optimized CSS

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

## 👨‍💻 Author

Built as a learning project while working on modernizing legacy code. Part of my journey in mastering React and modern frontend development practices.

---

## 📂 Repository Context

This project is part of the [learning-reactjs](https://github.com/nJIaH-KanKaH/learning-reactjs) repository, where I document my progress learning React and modern frontend development. While I missed the original deadlines for Rolling Scopes School 2025 Q1 tasks, I'm continuing to study and build real-world projects.

**Original Use Case**: Production-grade alternative slider solution for Lode Medical Center ([lode.by](https://lode.by))

**Status**: Development/Learning - May or may not be deployed to production site

---

### 💡 For Reviewers/Learners

I tried to write a wrapper for swiper library, i've added couple of react-select nodes that will add filter requests by doctor speciality, the center address where doctor works, the doctor patients age, i also wrote a function based on bitrix ajax.js (if i'm not mistaken) that takes parameters in almost the same way as BX.runcomponentAction works.
The reason i tried is because the existing jquery and php code was quite hard for me to support|extend.
I didn't publish any server-related code except an example inside of index.html, as i thought it could be a vulnerability(?).
There is still a lot of space for improvements, for example the integration with server-side rendered code via hydrateRoot falls with error(at least for now, i think i'll keep trying to let it work).

If you're reviewing this code or learning from it:
- Focus on the component architecture in `src/components/`
- Check out the custom fetch implementation in `src/services/FetchData/`(couple of implementations)
- See how Swiper is integrated with React in `DoctorsSlider/`
- Examine the lazy loading implementation in `LazyImage/`

This component was written as an alternative for existing jquery slider solution for lode medical center site(lode.by), and i don't know if i will ever update site with this a bit newer thing.
Feel free to use this code for learning purposes or as a reference for your own projects!