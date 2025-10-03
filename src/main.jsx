import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import { defaultOptions } from './defaults/defaultOptions.js';
import { deepMerge } from './services/deepMerge.js';

export function mountDoctorsSlider(element, options = {}) {
    const mergedOptions = deepMerge(options, defaultOptions);
    const app = (
        <App {...mergedOptions} />
    );
    const hasInitial =
        Array.isArray(mergedOptions?.initialData?.doctors) &&
        mergedOptions.initialData.doctors.length > 0;
    const hasServerMarkup = element.querySelector('.slider-container');

    if (hasInitial && hasServerMarkup) {
        hydrateRoot(element, app, {
            onRecoverableError(error, info) {
                console.group('Hydration warning');
                console.error('Error:', error);
                console.log('Digest:', info?.digest);
                console.log('Component stack:', info?.componentStack);
                console.log('HTML element:', info?.value);
                console.groupEnd();
            },
        });
    } else {
        createRoot(element).render(app);
    }
}
const sliderContainers = document.querySelectorAll('[data-doctors-slider]');
sliderContainers.forEach((container) => {
    const mountId = container.getAttribute('data-doctors-slider') || 'doctors-slider';
    const autoMountElement = document.getElementById(mountId);
    let options = {};
    try {
        const dataOptions = autoMountElement.getAttribute('data-options');
        if (dataOptions) {
            options = JSON.parse(dataOptions);
        }
    } catch (e) {
        console.warn('Failed to parse data-options:', e);
    }
    if (autoMountElement) {
        mountDoctorsSlider(autoMountElement, options);
    }
});
