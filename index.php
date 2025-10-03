<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
</head>

<body>
    <div id="doctors-slider-1" data-doctors-slider="doctors-slider-1"></div>
    <script>
        // Example options object (matches production template.php structure)
        const options = {
            filter_types: [
                {
                    id: 'speciality',
                    label: 'Специальность',
                    action: 'getSpecialities'
                },
                {
                    id: 'branch',
                    label: 'Филиал',
                    action: 'getBranches'
                },
                {
                    id: 'category',
                    label: 'Категория',
                    action: 'getCategories'
                }
            ],
            fetch_options: {
                component: 'travelsoft:ts.react.doctors.slider',
                action: 'getDoctors',
                mode: 'class',
                data: {},
                signedParameters: '',
                siteId: 's1',
                endpoint: '/bitrix/services/main/ajax.php',
                params: {
                    csrfToken: 'dev-csrf-token-12345'
                }
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                420: {
                    slidesPerView: 2
                },
                576: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                992: {
                    slidesPerView: 4
                },
            },
            spaceBetween: 20,
            speed: 200,
            initialData: {
                doctors: [],
                page: 1,
                totalPages: 1,
                imagePlaceholderBase64: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'><rect width='250' height='250' fill='%23f2f2f2'/></svg>"
            }
        };

        document.getElementById('doctors-slider-1').setAttribute('data-options', JSON.stringify(options));
    </script>
    <script type="module" src="/src/main.jsx"></script>
</body>

</html>