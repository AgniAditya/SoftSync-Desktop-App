// Custom error class to standardize API error handling
export class apiError extends Error {
    public success: boolean; // Indicates operation failure (always false for errors)

    constructor(
        public statusCode: number,                  // HTTP-like status code for the error
        public message: string = 'Something Went wrong', // Default error message
        public errors: any[] = [],                  // Optional array of detailed errors
        public stack: string = "",                  // Optional stack trace info
        public data : null = null
    ) {
        super(message);                             // Call parent Error constructor with message
        this.name = "apiError";                     // Set custom error name
        this.statusCode = statusCode;               // Store provided status code
        this.message = message;                     // Store provided message
        this.success = false;                       // Mark as unsuccessful response
        this.errors = errors;                       // Store error details
        this.data = null
    }
}