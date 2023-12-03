import { CustomApiError } from "./CustomApiError";

export class UnauthenticatedError extends CustomApiError {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    }
}
