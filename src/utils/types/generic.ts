export type SelectFields<T> = Partial<{ [key in keyof T]: 1 | -1 }>;
