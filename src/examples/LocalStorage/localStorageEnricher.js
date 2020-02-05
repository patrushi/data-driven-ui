export default function localStorageEnrich(storage, mappings) {
    // eslint-disable-next-line
    for (let [key, items] of Object.entries(storage)) {
        for (let itemI in items) {
            let item = items[itemI];
            for (let [name, value] of Object.entries(item)) {
                if (name.toUpperCase() !== "ID" && name.toUpperCase().endsWith("Id")) {
                    let n = name.slice(0, -2)
                    let sn = n
                    if (mappings) {
                        let mapping = mappings[n]
                        if (mapping !== undefined) sn = mapping
                    }
                    if (storage[sn] === undefined) console.log('storage[sn] is undefined, sn = ', sn)
                    if (sn) item[n] = storage[sn].filter(e => e.Id === value)[0]
                }
            }
        }
    }
}