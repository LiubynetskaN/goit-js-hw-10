export function fetchCountries(name) {
    
    const BASE_URL = 'https://restcountries.com/v3.1/name/';

    const searchParams = new URLSearchParams({
        fields: 'name,capital,population,flags,languages',
    });
    return fetch(`${BASE_URL}${name}?${searchParams}`)
        .then(res => {
            if (res.status === 404) {
                return Promise.reject(new Error());
            }
            return res.json()
        })
}