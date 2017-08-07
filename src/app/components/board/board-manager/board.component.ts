import {Component} from '@angular/core';
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
export class BoardComponent {

    gadgetLibraryData: any[] = [];
    dashboardList: any[] = [];
    currentBoardId = '';

    constructor( private _configurationService: ConfigurationService) {

    }

    updateDashboardMenu(tabItemToSelect: string) {

        this._configurationService.getConfigurationModels().subscribe(data => {

            if (data.storeIds) {
                this.dashboardList.length = 0;

                const me = this;
                data.storeIds.forEach(function (item) {

                    if (item.storeId !== 'endpoint') {

                        me.dashboardList.push(item);
                    }
                });
            }
            this.setCurrentTab(tabItemToSelect);
        });
    }


    setCurrentTab(_currentTab: string) {
        this.currentBoardId = _currentTab;
    }

}
