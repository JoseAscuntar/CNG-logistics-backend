const { NOT_FOUND } = require("../constants/httpStatusCodes");

class CustomNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = NOT_FOUND;
        this.name = 'NotFoundError';
    }
}

module.exports = CustomNotFoundError;
