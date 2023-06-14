import { CustomApiError } from "./CustomApiError";

export class NotFoundError extends CustomApiError {
    statusCode: number;

    constructor(message: string) {
        super(message || "Content Not Found.");
        this.statusCode = 404;
    }
}
