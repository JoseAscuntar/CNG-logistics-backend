const { CONFLICT } = require("../constants/httpStatusCodes");

class CustomConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = CONFLICT;
        this.name = 'ConflictError';
    }
}

module.exports = CustomConflictError;
