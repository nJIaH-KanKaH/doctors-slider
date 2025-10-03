import { useState } from 'react';
import './App.scss';
import DoctorSlider from './components/DoctorsSlider/DoctorsSlider';
import BaseDoctorSelect from './components/DoctorSelect/BaseDoctorSelect';
function App({
    filter_types,
    breakpoints,
    fetch_options,
    spaceBetween = 20,
    speed = 200,
    initialData = { doctors: [], page: 1, totalPages: 1, imagePlaceholderBase64: '' },
}) {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (filterId) => (selectedOption) => {
        setFilters(prev=>{
            return {...prev, [filterId]: selectedOption?.value ||''};
        });
    };
    return (
        <div className="app-container">
            <div className="filters-container" suppressHydrationWarning>
                {filter_types.map((filter) => (
                    <div key={filter.id} className="filters-container__item">
                        <label className="filters-container__label">{filter.label}</label>
                        <BaseDoctorSelect
                            component={fetch_options.component}
                            signedParameters={fetch_options.signedParameters}
                            action={filter.action}
                            value={filters[filter.id]??''}
                            onChange={handleFilterChange(filter.id)}
                            placeholder={`Выберите ${filter.label.toLowerCase()}`}
                            className="filters-container__select"
                            csrfToken={fetch_options.params.csrfToken}
                        />
                    </div>
                ))}
            </div>
            <DoctorSlider
                component={fetch_options.component}
                action={fetch_options.action}
                signedParameters={fetch_options.signedParameters}
                filters={filters}
                breakpoints={breakpoints}
                spaceBetween={spaceBetween}
                speed={speed}
                csrfToken={fetch_options.params.csrfToken}
                initialDoctors={initialData?.doctors || []}
                initialPage={initialData?.page || 1}
                initialTotalPages={initialData?.totalPages || 1}
                imagePlaceholderBase64={initialData?.imagePlaceholderBase64 || ''}
            />
        </div>
    );
}

export default App;
