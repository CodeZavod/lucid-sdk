
const util = require('util'),
    isEmpty = require('lodash.isempty'),
    request = require('request'),
    uuid = require('uuid'),
    Constants = require('./Constants'),
    Errors = require('./Errors'),
    debugLog = util.debuglog('lucid-sdk'),
    defaultRequestOptions = {
        timeout: 60000,
        gzip: true,
    },
    successStatusCodes = new Set([200, 201, 202, 204, 304]),
    log = debugLog.bind(debugLog, 'Request: ');

class Request {
    constructor(url, sdk) {
        this.url = url;
        this.sdk = sdk;
        this.requestId = uuid.v4();
        this.method = 'GET';
        this.query = this.body = {};
        this.headers = {
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Accept-Encoding': Constants.ACCEPT_ENCODING,
            'Accept-Language': Constants.ACCEPT_LANGUAGE,
            'Authorization': sdk.apiKey,
        };
        this.checkStatusCode = true;
    }

    setQuery(query) {
        this.query = query;

        return this;
    }

    setBody(body) {
        this.body = body;

        return this;
    }

    setMethod(method) {
        this.method = method;

        return this;
    }

    then() {
        this.cachedSendPromise = this.cachedSendPromise || this.send();

        return this.cachedSendPromise.then(...arguments);
    }

    catch() {
        this.cachedSendPromise = this.cachedSendPromise || this.send();

        return this.cachedSendPromise.catch(...arguments);
    }

    tap() {
        this.cachedSendPromise = this.cachedSendPromise || this.send();

        return this.cachedSendPromise.tap(...arguments);
    }

    send() {
        const requestOptions = Object.assign({}, defaultRequestOptions, {
            baseUrl: this.sdk.apiHost,
            url: this.url,
            qs: Request._normalizeQueryParams(this.query),
            method: this.method,
            auth: this.sdk.auth,
            json: true,
        });

        return new Promise((resolve, reject) => {
            if (!isEmpty(this.body)) {
                requestOptions.body = this.body;

                log(`(${this.requestId}) Request.send: request with body:`, this.body);
            }

            requestOptions.headers = this.headers;
            log(`(${this.requestId}) Request.send: request with params:`, requestOptions);

            const requester = request[this.method.toLowerCase()];

            requester(requestOptions, (err, res, resData) => {
                if (err) {
                    err.res = {requestId: this.requestId};

                    return reject(err);
                }

                res.requestId = this.requestId;

                log(`(${this.requestId}) Request.send: response statusCode:`, res.statusCode);
                log(`(${this.requestId}) Request.send: response headers:`, res.headers);

                if (this.checkStatusCode && !successStatusCodes.has(res.statusCode)) {
                    let invalidStatusCodeError = new Errors.InvalidStatusCodeError();

                    invalidStatusCodeError.resData = resData;
                    invalidStatusCodeError.res = res;

                    return reject(invalidStatusCodeError);
                }

                resolve(resData);
            });
        });
    }

    static _normalizeQueryParams(query) {
        let out = {};

        for (let i in query) {
            if (Object.prototype.hasOwnProperty.call(query, i)) {
                if (query[i] !== undefined && query[i] !== null) {
                    out[i] = query[i];
                }
            }
        }

        return out;
    }
}

module.exports = Request;
