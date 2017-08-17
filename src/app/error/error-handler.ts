import {ErrorObject, SolutionObject} from './error-model';
/**
 * Created by jayhamilton on 7/5/17.
 */
export class ErrorHandler {

    static getErrorObject(errMsg: string) {

        return new ErrorObject(errMsg, 'Some description', ErrorHandler.getSolutionList(errMsg));

    }

    /**
     * todo - fix this error handling logic. Move it to its own class.
     * @param errMsg
     * @returns {SolutionObject[]}
     */
    static getSolutionList(errMsg: string) {

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
            case 'ERR_CONNECTION_TIMEOUT':
                solutionList.push(new SolutionObject(
                    'A timeout occurred. The default timeout on a connection is 60 seconds. ' +
                    'Check the endpoint to see if you are able to access the ip and port using ping. ' +
                    'If 60 seconds is to short of a timeout go into configuration and increase it.', 0, 'http://link1'));
                break;
            default: {
                solutionList.push(new SolutionObject('Error occurred!', 0, 'http://link1'));
            }
        }

        return solutionList;
    }

    static getErrorType(errMsg: string): string {
        console.debug(errMsg);

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
        return ' ';
    }
}
