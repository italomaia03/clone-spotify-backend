export class CustomApiError extends Error {
    statusCode?: number;
    constructor(message: string) {
        super(message);
    }
}
