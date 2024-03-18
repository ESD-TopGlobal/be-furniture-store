class AppResponse {
    constructor() {
        this.statusCode = 200; // Default to 200 OK
        this.isSuccess = null;
        this.message = null;
        this.data = null;
    }

    success(message, data, statusCode = 200) {
        this.isSuccess = true;
        this.message = message || 'Request successful';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }

    error(message, data, statusCode = 400) {
        this.isSuccess = false;
        this.message = message || 'An error occurred';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }

    send(res) {
        res.status(this.statusCode).json({
            success: this.isSuccess,
            message: this.message,
            data: this.data
        });
    }
}

module.exports = AppResponse;