export class EndPoint {
    public id: number;
    public name: string;
    public address: string;
    public user: string;
    public credentialType: string;
    public credential: string;
    public description: string;

    constructor(name: string, address: string, user: string, credential: string, credentialType: string, description: string) {
        this.name = name;
        this.address = address;
        this.user = user;
        this.credential = credential;
        this.credentialType = credentialType;
        this.description = description;
        this.id = 0;
    }

}

export const credentialScheme = ['password', 'ssh key', 'OAuth Secret'];

