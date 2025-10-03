export const defaultOptions = {
    filter_types: [
        { id: 'speciality', label: 'Специальность', action: 'getSpecialities' },
        { id: 'branch', label: 'Филиал', action: 'getBranches' },
        { id: 'category', label: 'Категория', action: 'getCategories' }
    ],
    fetch_options: {
        component: "ts.react.doctors.slider",
        action: "getDoctors",
        mode: 'class',
        data: {}, 
        signedParameters: '',
        siteId: 's1',
        endpoint: '/bitrix/services/main/ajax.php',
        params: {
            csrfToken: ''
        }
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        421: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 }
    },
    spaceBetween: 20,
    speed: 200,
    csrfToken: '',
    initialData: {
        doctors: [],
        page: 1,
        totalPages: 1,
        imagePlaceholderBase64: ''
    }
};