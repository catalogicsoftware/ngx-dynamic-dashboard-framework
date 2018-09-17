import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigurationService} from '../services/configuration.service';
import {MenuEventService} from './menu-service';
import {environment} from '../../environments/environment';


declare var jQuery: any;


/**a
 * Menu component
 *
 */
@Component({
    moduleId: module.id,
    selector: 'app-menu-component',
    templateUrl: './view.html',
    styleUrls: ['./styles.css'],

})
export class MenuComponent implements OnInit {

    host = window.location.host;
    dashboardList: any[] = [];
    selectedBoard = '';
    placeHolderText = 'Ask the board to do something!';
    searchList: Array<string> = [];
    env: any;

    @ViewChild('notificationSideBar_tag') notificationSideBarRef: ElementRef;
    @ViewChild('layoutSideBar_tag') layoutSideBarRef: ElementRef;
    @ViewChild('aboutSideBar_tag') aboutSideBarRef: ElementRef;
    @ViewChild('stickymenu_tag') stickyMenuRef: ElementRef;

    notificationSideBar: any;
    layoutSideBar: any;
    aboutSideBar:any;
    stickyMenu: any;

    typeAheadIsInMenu = true;

    layoutId = 0;

    constructor(private _configurationService: ConfigurationService,
                private _menuEventService: MenuEventService) {

        this._menuEventService.unSubscribeAll();

        this.setupEventListeners();
        this.env = environment;
    }

    setupEventListeners() {
       let gridEventSubscription =  this._menuEventService.listenForGridEvents().subscribe((event: IEvent) => {

            const edata = event['data'];

            switch (event['name']) {
                case 'boardUpdateEvent':
                    this.updateDashboardMenu(edata);
                    break;
            }

        });

       this._menuEventService.addSubscriber(gridEventSubscription);

    }

    ngOnInit() {
        this.updateDashboardMenu('');
        this.stickyMenu = jQuery(this.stickyMenuRef.nativeElement);
        this.stickyMenu.sticky();
    }

    emitBoardChangeLayoutEvent(event) {
        this._menuEventService.raiseMenuEvent({name: 'boardChangeLayoutEvent', data: event});
    }

    emitBoardSelectEvent(event) {
        this.boardSelect(event);
        this._menuEventService.raiseMenuEvent({name: 'boardSelectEvent', data: event});
    }

    emitBoardCreateEvent(event) {
        this._menuEventService.raiseMenuEvent({name: 'boardCreateEvent', data: event});
        this.updateDashboardMenu(event);
    }

    emitBoardEditEvent(event) {
        this._menuEventService.raiseMenuEvent({name: 'boardEditEvent', data: event});
    }

    emitBoardDeleteEvent(event) {
        this._menuEventService.raiseMenuEvent({name: 'boardDeleteEvent', data: event});
        this.updateDashboardMenu('');
    }

    emitBoardAddGadgetEvent(event) {
        this._menuEventService.raiseMenuEvent({name: 'boardAddGadgetEvent', data: event});
    }

    emitBoardAIAddGadgetEvent(event) {
        this._menuEventService.raiseMenuEvent({name: 'boardAIAddGadgetEvent', data: event});
    }

    updateDashboardMenu(selectedBoard: string) {

        this._configurationService.getBoards().subscribe(data => {

            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;


                // sort boards
                data.sort((a: any, b: any) => a.boardInstanceId - b.boardInstanceId);

                data.forEach(board => {

                    me.dashboardList.push(board.title);

                });

                if (selectedBoard === '') {

                    this.boardSelect(this.dashboardList[0]);

                } else {

                    this.boardSelect(selectedBoard);
                }
            }
        });
    }

    boardSelect(selectedBoard: string) {
        this.selectedBoard = selectedBoard;
    }

    toggleLayoutSideBar() {
        this.layoutSideBar = jQuery(this.layoutSideBarRef.nativeElement);
        this.layoutSideBar.sidebar('setting', 'transition', 'overlay');
        this.layoutSideBar.sidebar('toggle');
        this.layoutId = this._configurationService.currentModel.id;
    }

    toggleNotificationSideBar() {
        this.notificationSideBar = jQuery(this.notificationSideBarRef.nativeElement);
        this.notificationSideBar.sidebar('setting', 'transition', 'overlay');
        this.notificationSideBar.sidebar('toggle');
    }
    toggleAboutSideBar() {
        this.aboutSideBar = jQuery(this.aboutSideBarRef.nativeElement);
        this.aboutSideBar.sidebar('setting', 'transition', 'overlay');
        this.aboutSideBar.sidebar('toggle');
    }


    public showDocumentation() {

        window.location.href = 'http://' + window.location.host + '/assets/documentation/index.html';
    }

}
