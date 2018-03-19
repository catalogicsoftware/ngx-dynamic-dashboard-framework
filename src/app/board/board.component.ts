import { Component,  OnInit} from '@angular/core';
import {ConfigurationService} from '../services/configuration.service';


declare var jQuery: any;


/**a
 * Board component
 *
 */
@Component({
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles-board.css']

})
export class BoardComponent implements OnInit {

    constructor(private _configurationService: ConfigurationService) {
    }

    ngOnInit() {

    }

}
