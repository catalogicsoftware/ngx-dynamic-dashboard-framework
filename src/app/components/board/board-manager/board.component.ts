import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../../../services/configuration.service';


/**a
 * Board component
 *
 */
@Component({
    moduleId: module.id,
    templateUrl: 'board.html',
    styleUrls: ['styles-board.css']


})
export class BoardComponent implements OnInit {

    dashboardList: any[] = [];
    selectedBoard = '';

    constructor(private _configurationService: ConfigurationService) {
    }

    ngOnInit() {
        this.updateDashboardMenu('');
    }

    updateDashboardMenu(selectedBoard: string) {

        this._configurationService.getBoards().subscribe(data => {

            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;
                data.forEach(board => {

                    me.dashboardList.push(board.title);

                });

                if (selectedBoard === '') {

                    this.selectBoard(this.dashboardList[0]);

                } else {

                    this.selectBoard(selectedBoard);
                }
            }
        });
    }


    selectBoard(selectedBoard: string) {
        this.selectedBoard = selectedBoard;
    }

}
