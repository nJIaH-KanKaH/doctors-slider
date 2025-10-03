export interface DoctorExperience {
    num: number;
    type: string;
}

export interface Doctor {
    doctor_id: number;
    doctor_img_url: string;
    doctor_img__local_url: string;
    doctor_url: string;
    doctor_lastname: string;
    doctor_firstname: string;
    doctor_patient_age_type: string;
    doctor_position: string;
    doctor_category: string;
    doctor_experience: DoctorExperience;
    date_saved: string;
}

export interface DoctorsData {
    doctors: Doctor[];
}

export async function fetchData(
    serverUrl: string,
    queryObject?: { search?: string; page?: number },
    filters?: { [key: string]: string|number },
    csrfToken?: string
): Promise<DoctorsData> {
    const url = new URL(serverUrl);
    
    const searchParams = new URLSearchParams();
    if (queryObject) {
        Object.entries(queryObject).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(key, value.toString());
            }
        });
    }

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(`filters[${key}]`, value.toString());
            }
        });
    }
    
    if (csrfToken) {
        searchParams.append('sessid', csrfToken);
    }
    url.search = searchParams.toString();

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DoctorsData = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching doctors data:', error);
        throw error;
    }
}

// Internal helper that mirrors BX.ajax.runComponentAction via fetch
export async function runComponentActionFetch(options: {
    component: string;
    action: string;
    mode?: 'class' | 'ajax';
    method?: 'POST';
    data?: any;
    signedParameters?: string;
    siteId?: string;
    sessid?: string;
    endpoint?: string;
    params?:{
        queryObject?: { search?: string; page?: number },
        filters?: { [key: string]: string|number },
        csrfToken?: string
    }
}): Promise<any> {
    const {
        component,
        action,
        mode = 'class',
        method = 'POST',
        data = {},
        signedParameters,
        siteId,
        sessid: sessidFromOptions,
        endpoint = '/bitrix/services/main/ajax.php',
        params
    } = options;
    if (!component || !action) {
        throw new Error('component and action are required');
    }


    const urlSearch = new URLSearchParams();
    urlSearch.append('c', component);
    urlSearch.append('action', action);
    urlSearch.append('mode', mode);
    if (signedParameters) urlSearch.append('signedParameters', signedParameters);
    const requestUrl = endpoint + (urlSearch ? ('?' + urlSearch) : '');

    // Build payload to send as JSON instead of FormData
    const payload: any = {};
    if (siteId) payload.siteId = siteId;
    if (params?.queryObject) {
        Object.entries(params.queryObject).forEach(([key, value]) => {
            if (value !== undefined) {
                data[key] = value.toString();
            }
        });
    }

    if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
            if (value !== undefined) {
                data[`filters[${key}]`] = value.toString();
            }
        });
    }
    if (signedParameters) data.signedParameters = signedParameters;
    let sessid = '';
    if (params?.csrfToken) {
        data.sessid = params.csrfToken;
        sessid = params.csrfToken;
    }
    payload.data = data || {};

    const res = await fetch(requestUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 
            'Content-Type': 'application/json',
            'X-Bitrix-Csrf-Token': sessid
        },
        body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (json && json.status === 'success') return json.data;
    const errors = (json && json.errors) || [];
    const message = errors.map((e: any) => e.message || e).join('; ') || 'Bitrix action error';
    const error: any = new Error(message);
    error.details = json;
    throw error;
}

// Overloaded raw fetch:
// 1) Backward-compatible URL-based signature (returns raw JSON)
// 2) Bitrix runComponentAction-style signature via options object
export async function fetchDataRaw(
    serverUrlOrOptions: string | {
        component: string;
        action: string;
        mode?: 'class' | 'ajax';
        data?: any;
        signedParameters?: string;
        siteId?: string;
        endpoint?: string;
    },
    queryObject?: { search?: string; page?: number },
    filters?: { [key: string]: string|number },
    csrfToken?: string
): Promise<any> {
    // New behavior: if first arg is an object, treat it as runComponentAction options
    if (typeof serverUrlOrOptions === 'object') {
        return runComponentActionFetch({mode: 'class', method: 'POST', ...serverUrlOrOptions, params:{queryObject,filters,csrfToken}} as any);
    }

    // Legacy behavior: plain GET with query and filters
    const serverUrl = serverUrlOrOptions as string;
    const url = new URL(serverUrl);

    const searchParams = new URLSearchParams();
    if (queryObject) {
        Object.entries(queryObject).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(key, value.toString());
            }
        });
    }

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(`filters[${key}]`, value.toString());
            }
        });
    }

    if (csrfToken) {
        searchParams.append('sessid', csrfToken);
    }
    url.search = searchParams.toString();

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}