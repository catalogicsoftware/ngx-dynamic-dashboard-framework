import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ConfigurationService} from '../services/configuration.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
    animations: [

        trigger('accordion', [
            state('in', style({
                opacity: '1'
            })),
            state('out', style({
                opacity: '0'
            })),
            transition('in => out', animate('50ms ease-in-out')),
            transition('out => in', animate('100ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                height: '0px'
            })),
            transition('in => out', animate('100ms ease-in-out')),
            transition('out => in', animate('50ms ease-in-out'))
        ])
    ]
})
export class MenuComponent implements OnInit {

    @Output() boardChangeLayoutEvent: EventEmitter<any> = new EventEmitter();
    @Output() boardSelectionEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() boardCreateEvent: EventEmitter<any> = new EventEmitter();
    @Output() boardEditEvent: EventEmitter<any> = new EventEmitter();
    @Output() boardDeleteEvent: EventEmitter<any> = new EventEmitter();
    @Output() boardAddGadgetEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() boardAIAddGadgetEvent: EventEmitter<any> = new EventEmitter<any>();

    dashboardList: any[] = [];
    selectedBoard = '';
    placeHolderText = 'Ask the board to do something!';
    searchList: Array<string> = [];

    detailMenuOpen = 'out';

    @ViewChild('notificationSideBar_tag') notificationSideBarRef: ElementRef;
    @ViewChild('layoutSideBar_tag') layoutSideBarRef: ElementRef;
    @ViewChild('stickymenu_tag') stickyMenuRef: ElementRef;

    notificationSideBar: any;
    layoutSideBar: any;
    stickyMenu: any;

    typeAheadIsInMenu = true;

    layoutId = 0;

    constructor(private _configurationService: ConfigurationService) {
    }

    ngOnInit() {
        this.updateDashboardMenu('');
        this.stickyMenu = jQuery(this.stickyMenuRef.nativeElement);
        this.stickyMenu.sticky();
    }

    emitBoardChangeLayoutEvent(event) {
        this.boardChangeLayoutEvent.emit(event);
    }

    emitBoardSelectEvent(event) {
        this.boardSelect(event);
        this.boardSelectionEvent.emit(event);
    }

    emitBoardCreateEvent(event) {
        this.boardCreateEvent.emit(event);
    }

    emitBoardEditEvent(event) {
        this.boardEditEvent.emit(event);
    }

    emitBoardDeleteEvent(event) {
        this.boardDeleteEvent.emit(event);
    }

    emitBoardAddGadgetEvent(event) {
        this.boardAddGadgetEvent.emit(event);
    }

    emitBoardAIAddGadgetEvent(event) {
        this.boardAIAddGadgetEvent.emit(event);
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

    toggleAccordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

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
}
