export class NotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message || "Content Not Found.");
        this.statusCode = 404;
    }
}
