
export class ServiceModel {

    host: string;
    ports:Array<string>;

    constructor(host: string, ports: Array<string>) {

        this.host = host;
        this.ports = ports;

    }
}