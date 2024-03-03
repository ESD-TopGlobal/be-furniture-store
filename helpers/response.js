class AppResponse {
    constructor() {
        this.statusCode = 200; // Default to 200 OK
        this.success = null;
        this.message = null;
        this.data = null;
    }

    success(message, data, statusCode = 200) {
        this.success = true;
        this.message = message || 'Request successful';
        this.data = data || {};
        this.statusCode = statusCode;
        return this;
    }

    error(message, data, statusCode = 400) {
        this.success = false;
        this.message = message || 'An error occurred';
        this.data = data || {};
        this.statusCode = statusCode;
        return this;
    }

    send(res) {
        res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data
        });
    }
}

module.exports = AppResponse;