import {ErrorObject, SolutionObject} from './error-model';

/**
 * Created by jayhamilton on 7/5/17.
 */
export class ErrorHandler {

    static getErrorObject(errMsg: any) {
        return new ErrorObject(
            errMsg.statusText,
            'Some description',
            ErrorHandler.getSolutionList(
                errMsg.status
                + ' '
                + errMsg.statusText),
            errMsg.resource);
    }

    /**
     * todo - fix this error handling logic. Move it to its own class.
     * @param errMsg
     * @returns {SolutionObject[]}
     */
    static getSolutionList(errMsg: string) {

        console.log("ERROR CONDITION:  " + errMsg )

        const solutionList: SolutionObject[] = [];

        switch (ErrorHandler.getErrorType(errMsg.toLowerCase())) {

            case 'ERR_CERTIFICATE':
                solutionList.push(new SolutionObject('Check to see if your browser has accepted the certificate', 0, 'http://link1'));
                break;
            case 'ERR_CROSS_ORIGIN_RESOURCE_SHARING':
                solutionList.push(new SolutionObject('Check to see if your browser has accepted the certificate', 0, 'http://link1'));
                break;
            case 'ERR_CONNECTION_REFUSED':
                solutionList.push(new SolutionObject(
                    'Check to see if the host/service you are attempting to connect to is up.', 0, 'http://link1'));
                break;
            case 'ERR_NOT_FOUND':
                solutionList.push(new SolutionObject(
                    'Resource not found.', 0, 'http://link1'));
                break;
            case 'ERR_CONNECTION_TIMEOUT':
                solutionList.push(new SolutionObject(
                    'A timeout occurred. The default timeout on a connection is 60 seconds. ' +
                    'Check the endpoint to see if you are able to access the ip and port using ping. ' +
                    'If 60 seconds is to short of a timeout go into configuration and increase it.', 0, 'http://link1'));
                break;
            default: {
                solutionList.push(new SolutionObject(errMsg, 0, 'http://link1'));
            }
        }

        return solutionList;
    }

    static getErrorType(errMsg: string): string {

        if (errMsg.indexOf('trust') > -1) {
            return 'ERR_CERTIFICATE';
        }
        if (errMsg.indexOf('cors') > -1) {
            return 'ERR_CROSS_ORIGIN_RESOURCE_SHARING';
        }
        if (errMsg.indexOf('refuse') > -1) {
            return 'ERR_CONNECTION_REFUSED';
        }
        if (errMsg.indexOf('timeout') > -1) {
            return 'ERR_CONNECTION_TIMEOUT';
        }
        if (errMsg.indexOf('404') > -1) {
            return 'ERR_NOT_FOUND';
        }
        return errMsg;
    }

    static getWebSocketErrorReason(error: any) {

        let reason = 'There was probably a problem with an attempt to connect to the endpoint!';
        switch (error.code) {
            case 1000:
                reason = 'Normal closure';
                break;
            case 1001:
                reason = 'An endpoint is going away';
                break;
            case 1002:
                reason = 'An endpoint is terminating the connection due to a protocol error.';
                break;
            case 1003:
                reason = 'An endpoint is terminating the connection because it has received a type of data it cannot accept';
                break;
            case 1004:
                reason = 'Reserved. The specific meaning might be defined in the future.';
                break;
            case 1005:
                reason = 'No status code was actually present';
                break;
            case 1006:
                reason = 'The connection was closed abnormally';
                break;
            case 1007:
                reason = 'The endpoint is terminating the connection because a message was received that contained inconsistent data';
                break;
            case 1008:
                reason = 'The endpoint is terminating the connection because it received a message that violates its policy';
                break;
            case 1009:
                reason = 'The endpoint is terminating the connection because a data frame was received that is too large';
                break;
            case 1010:
                reason = 'The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn\'t.';
                break;
            case 1011:
                reason = 'The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
                break;
            case 1012:
                reason = 'The server is terminating the connection because it is restarting';
                break;
            case 1013:
                reason = 'The server is terminating the connection due to a temporary condition';
                break;
            case 1015:
                reason = 'The connection was closed due to a failure to perform a TLS handshake';
                break;
        }
        return reason;
    }
}
