class Response {
    constructor(status, data, error) {
        this.status = status;
        this.data = data;
        this.message = error;
    }
}

module.exports = Response;