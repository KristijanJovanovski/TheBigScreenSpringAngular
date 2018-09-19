export interface Page<T> {
    data: T[];
    current: number;
    hasNext: boolean;
    total: number;
}
