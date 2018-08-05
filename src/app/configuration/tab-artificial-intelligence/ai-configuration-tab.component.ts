/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    Component
} from '@angular/core';

import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-ai-config-tab',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']
})
export class AIConfigurationTabComponent {

    token;
    ibmwatsonuid;
    ibmwatsonpwd;
    ibmwatsoncid;

    ai_engines = [
        {value: 'watson', viewValue: 'Watson'},
        {value: 'witai', viewValue: 'WitAI'},
        {value: ' ', viewValue: ' '}
    ];
    selectedAIEngineValue: string;
    env: any;

    constructor() {
        /**
         * todo - get this information from a backend store
         * **/

        this.env = environment;

        if (this.env.experimental) {

            this.token = localStorage.getItem('Wit.aiToken');
            this.ibmwatsonuid = localStorage.getItem('ibmwatsonuid');
            this.ibmwatsonpwd = localStorage.getItem('ibmwatsonpwd');
            this.ibmwatsoncid = localStorage.getItem('ibmwatsoncid');
            this.selectedAIEngineValue = localStorage.getItem('ai_engine');
        }
    }

    selectChange(selectControl) {

        console.log(selectControl.value);
        this.selectedAIEngineValue = selectControl.value;
        localStorage.setItem('ai_engine', selectControl.value);

    }

    save() {

        /**
         * todo - get this information from a backend store
         * **/
        if (!environment.production) {
            localStorage.setItem('Wit.aiToken', this.token);
            localStorage.setItem('ibmwatsonuid', this.ibmwatsonuid);
            localStorage.setItem('ibmwatsonpwd', this.ibmwatsonpwd);
            localStorage.setItem('ibmwatsoncid', this.ibmwatsoncid);
        }
    }

}
