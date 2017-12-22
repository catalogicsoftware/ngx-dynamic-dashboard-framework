export class EndPoint {
    public id: number;
    public name: string;
    public address: string;
    public user: string;
    public credentialType: string;
    public credential: string;
    public description: string;
    public tokenAPI: string;
    public tokenAPIProperty: string;
    public tokenAPIHeader: string;

    constructor(name: string,
                address: string,
                user: string,
                credential: string,
                credentialType: string,
                description: string,
                tokenAPI: string,
                tokenAPIProperty: string,
                tokenAPIHeader: string) {

        this.name = name;
        this.address = address;
        this.user = user;
        this.credential = credential;
        this.credentialType = credentialType;
        this.description = description;
        this.tokenAPI = tokenAPI;
        this.tokenAPIProperty = tokenAPIProperty;
        this.tokenAPIHeader = tokenAPIHeader;
        this.id = 0;
    }

}

export const credentialScheme = ['password', 'ssh key', 'OAuth Secret'];

