import { IDataAdapter } from "../adapters/data";

export interface IStorage {
    getItem<T = any>(key: string, adapter?: IDataAdapter<T>): T | null;
    setItem(key: string, value: any, adapter?: IDataAdapter<string>): void;
    removeItem(key: string): void;
    clear(): void;
}

export class LocalStorage implements IStorage {
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

export class SessionStorage implements IStorage {
    getItem<T = any>(key: string, adapter?: IDataAdapter<T>): T | null {
        const value = sessionStorage.getItem(key);
        return value
            ? adapter
                ? adapter.from(value)
                : JSON.parse(value)
            : null;
    }
    setItem(key: string, value: any, adapter?: IDataAdapter<string>): void {
        const data = adapter ? adapter.from(value) : JSON.stringify(value);
        sessionStorage.setItem(key, data);
    }
    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    }
    clear(): void {
        sessionStorage.clear();
    }
}
