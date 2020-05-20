export default class CustomErorr extends Error {
    code: number;

    constructor({ message, code }: { message?: string; code?: number }) {
        super(message);
        this.code = code;
    }
}
