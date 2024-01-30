import { IDataAdapter } from "../adapters/data";

export class LocalStorage {
    getItem<T = any>(key: string, adapter?: IDataAdapter<T>): T | null {
        const value = localStorage.getItem(key);
        return value
            ? adapter
                ? adapter.from(value)
                : JSON.parse(value)
            : null;
    }
    setItem(key: string, value: any, adapter?: IDataAdapter<string>): void {
        const data = adapter ? adapter.from(value) : JSON.stringify(value);
        localStorage.setItem(key, data);
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    clear(): void {
        localStorage.clear();
    }
}
