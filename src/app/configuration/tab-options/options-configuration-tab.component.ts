/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    Component
} from '@angular/core';
import {OptionsService} from "./service";


@Component({
    selector: 'app-options-config-tab',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']
})
export class OptionsConfigurationTabComponent {

    enableHover: boolean;

    constructor(private _optionsService: OptionsService) {

        this.enableHover = this._optionsService.getBoardOptions()['enableHover'];
    }

    onHooverOptionChange(value) {

        this._optionsService.setBoardOptions({"enableHover": value['checked']})


    }
}
