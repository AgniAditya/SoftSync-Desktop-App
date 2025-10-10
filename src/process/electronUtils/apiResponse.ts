// Custom class to standardize successful API responses
export class apiResponse {
    public success: boolean; // Indicates if the request was successful (true if statusCode < 400)

    constructor(
        public statusCode: number, // HTTP-like status code for the response
        public data: any,          // Main response payload or data
        public message: string,    // Informational message about the response
    )
    {
        this.data = data;                 // Assign response data
        this.message = message;           // Assign response message
        this.statusCode = statusCode;     // Assign response status code
        this.success = statusCode < 400;  // Mark success based on status code
    }
}
