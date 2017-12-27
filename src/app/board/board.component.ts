import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigurationService} from '../services/configuration.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

declare var jQuery: any;


/**a
 * Board component
 *
 */
@Component({
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles-board.css'],
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
export class BoardComponent implements OnInit {


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

    constructor(private _configurationService: ConfigurationService) {
    }

    ngOnInit() {
        this.updateDashboardMenu('');
        this.stickyMenu = jQuery(this.stickyMenuRef.nativeElement);
        this.stickyMenu.sticky();
    }

    updateDashboardMenu(selectedBoard: string) {

        this._configurationService.getBoards().subscribe(data => {

            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;


                // sort boards
                data.sort((a: any, b: any) => a.id - b.id);

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

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    toggleLayoutSideBar() {
        this.layoutSideBar = jQuery(this.layoutSideBarRef.nativeElement);
        this.layoutSideBar.sidebar('setting', 'transition', 'overlay');
        this.layoutSideBar.sidebar('toggle');
    }

    toggleNotificationSideBar() {
        this.notificationSideBar = jQuery(this.notificationSideBarRef.nativeElement);
        this.notificationSideBar.sidebar('setting', 'transition', 'overlay');
        this.notificationSideBar.sidebar('toggle');
    }
}
