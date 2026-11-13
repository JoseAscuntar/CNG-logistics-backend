const { BAD_REQUEST } = require("../constants/httpStatusCodes");

class CustomBadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = BAD_REQUEST;
        this.name = "BadRequestError";
    }
}

module.exports = CustomBadRequestError;
