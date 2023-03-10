function Responder() {
    this.sendFailureMessage = (res, message, code) => {
        let result = {};
        res.setHeader('content-type', 'application/json');
        result.success = false;
        result.message = message;
        result.code = code != null ? code : "failure";
        res.end(JSON.stringify(result));
    }
    this.sendSuccessMessage = (res, message) => {
        let result = {};
        res.setHeader('content-type', 'application/json');
        result.success = true;
        result.message = message;
        res.end(JSON.stringify(result));
    }
    this.sendSuccessData = (res, message, data) => {
        let result = {};
        res.setHeader('content-type', 'application/json');
        result.success = true;
        result.message = message;
        result.data = data;
        res.end(JSON.stringify(result));
    }
}
module.exports = new Responder();