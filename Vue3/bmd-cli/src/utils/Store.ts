// Store.ts
const Store = {
    /**
     * 向缓存中存
     * @param key     键
     * @param value   值
     */
    set(key: string, value: object) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },

    get(key: string): any {
        let s = <string>sessionStorage.getItem(key)
        return JSON.parse(s)
    },
}

export default Store
