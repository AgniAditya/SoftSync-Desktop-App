export class apiError extends Error {
    public success: boolean;

    constructor(
        public statusCode: number,
        public message: string = 'Something Went wrong',
        public errors: any[] = [],
        public stack: string = ""
    ) {
        super(message);
        this.name = "apiError";
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.errors = errors
    }
}