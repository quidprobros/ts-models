export declare function objFilter(arrFilter: any[], data: {}): {
    [k: string]: unknown;
};
export declare const registry: {
    getUniq(namespace: string): number;
    push(input: any, namespace: string): void;
};
