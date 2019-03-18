export const metadataConst = {
    default: 'default',
    global: 'global',
    component: 'component',
    element: 'element'
}

export function get(metadata, path) {
    return (metadata[metadataConst.element] || {});
}