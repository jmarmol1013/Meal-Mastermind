export type APIResponse<T = unknown> = {
    data?: T;
    statusCode: number;
    message: string;
};
