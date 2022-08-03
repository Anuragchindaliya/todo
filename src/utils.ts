export const getDataFromLocalStorage = (key: string) => {
    const data: string | null = localStorage.getItem(key);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return []
        }
    }
    return []
}