class AppError extends Error{
    constructor(name,message = "Something went wrong", explaination = "Application layer explanation", statusCodes = 500){
        super();
        this.name = name;
        this.message = message;
        this.explaination = explaination;
        this.statusCodes= statusCodes;
    }
}

module.exports = AppError;