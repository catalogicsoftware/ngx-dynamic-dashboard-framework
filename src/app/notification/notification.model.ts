export class Notification {
    public id: number;
    public name: string;
    public description: string;
    public state: string;
    public icon: string;
    public when: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
    setState(state: string) {
        this.state = state;
    }
    getState() {
        return this.state;
    }

    setIcon(icon: string) {
        this.icon = icon;
    }
    getIcon() {
        return this.icon;
    }

    setWhen(when: string) {
        this.when = when;
    }
    getWhen() {
        return this.when;
    }

}
