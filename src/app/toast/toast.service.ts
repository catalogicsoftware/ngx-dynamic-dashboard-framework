import {Injectable} from '@angular/core';
import {Message} from './message';

@Injectable()
export class ToastService {

    messages: Array<Message> = [];

    constructor() {
    }

    getMessages() {
        return this.messages;
    }

    sendMessage(content, style) {

        const message = new Message(content, this.messages.length + 1, style);
        this.messages.push(message);

    }

    dismissMessage(messageKey) {

        this.purgeDismissedMessages();

        this.messages.forEach(message => {
            if (message.id === messageKey) {
                message.dismissed = true;
            }
        });
    }

    purgeDismissedMessages  () {
        this.messages.forEach(function (message, index, object) {

            if (message.dismissed) {
                object.splice(index, 1);
            }
        });
    }


}
