export class Message {

    id: number;
    content: string;
    style: string;
    dismissed = false;

    constructor(content, id, style?) {
        this.content = content;
        this.style = style || 'info';
        this.id = id;
    }

}
