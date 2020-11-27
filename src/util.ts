export function objFilter(arrFilter: any[], data) {
    return Object.fromEntries(Object.entries(data).filter(([key, value])=> arrFilter.includes(key)))
}

