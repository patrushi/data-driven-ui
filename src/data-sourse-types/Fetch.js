export function get(url, headers, callback, errorCallback) {
    fetch(url, headers)
        .then(response => {
            if (response.status !== 200) throw new Error(response.statusText);
            return response.json()
        })
        .then(data => callback(data))
        .catch(e => errorCallback(e));
}