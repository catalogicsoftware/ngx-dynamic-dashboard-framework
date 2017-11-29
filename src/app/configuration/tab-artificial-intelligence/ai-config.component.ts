/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    Component
} from '@angular/core';


@Component({
    selector: 'app-ai-config',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']
})
export class AIConfigComponent {

    token;

    constructor() {

        this.token = localStorage.getItem('Wit.aiToken');
    }

    save() {

        localStorage.setItem('Wit.aiToken', this.token);
    }

}
