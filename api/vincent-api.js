export const fetchIt = (url, options, timeout) => {
    let myTimeout = timeout || 20000;

    let allOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        ...options
    };

    function fetchWithTimeout(url, options, timeout) {
        return new Promise((resolve, reject) => {
            let timer = setTimeout(
                () => reject(new Error('Request timed out')),
                timeout
            );

            fetch(url, options).then(
                response => resolve(response),
                err => reject(err)
            ).finally(() => clearTimeout(timer));
        });
    }

    return fetchWithTimeout(url, allOptions, myTimeout) 
        .then(response => {
            if (!response.ok) {
                return Promise.reject({
                    message: `fetch failed with status ${response.status}: ${response.statusText}`,
                    status: response.status
                });
            }

            if (response.status !== 204) {
                return response.json();
            } else {
                return Promise.resolve();
            }
        })
        .catch(err => {
            return Promise.reject(
                err.message ? err : { message: err }
            );
        });
}