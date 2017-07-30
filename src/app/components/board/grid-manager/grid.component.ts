import {Component, Output, EventEmitter} from '@angular/core';
import {GadgetInstanceService} from './grid.service';
import {ConfigurationService} from '../../../services/configuration.service';
import {GadgetConfigModel} from '../../gadgets/_common/gadget-config-model';


@Component({
    moduleId: module.id,
    selector: 'app-grid-component',
    templateUrl: 'grid.html',
    styleUrls: ['styles-grid.css']
})
export class GridComponent {
    @Output() boardUpdateEvent: EventEmitter<any> = new EventEmitter();

    model: any = {};
    noGadgets = true;
    dashedStyle: {};
    dropZone1: any = null;
    dropZone2: any = null;
    dropZone3: any = null;

    gridInsertionPosition = {
        x: 0,
        y: 0
    };

    /**
     * Todo - split model and board operations. This class should really focus on an individual board model's operations
     * within the grid. The board specific operations should be moved to the board component.
     * @param _gadgetInstanceService
     * @param _procmonConfigurationService
     */

    constructor(private _gadgetInstanceService: GadgetInstanceService,
                private _configurationService: ConfigurationService) {

        this._gadgetInstanceService.listenForInstanceRemovedEventsFromGadgets().subscribe((message: string) => {
            this.saveBoard('Gadget Removed From Board: ' + message, false)
        });

        this.initializeBoard();

    }

    updateGadgetPositionInBoard($event, columnNumber, rowNumber, type) {

        this.getModel().rows.forEach(row => {

            let colpos = 0;

            row.columns.forEach(column => {

                let gadgetpos = 0;

                if (column.gadgets) {

                    column.gadgets.forEach(gadget => {

                        if (gadget.instanceId === $event.dragData) {

                            const gadget = column.gadgets.splice(gadgetpos, 1);


                            if (!this.getModel().rows[rowNumber].columns[columnNumber].gadgets) {
                                this.getModel().rows[rowNumber].columns[columnNumber].gadgets = [];
                            }
                            this.getModel().rows[rowNumber].columns[columnNumber].gadgets.push(gadget[0]);
                            this.saveBoard('drag drop operation', false);
                            return;

                        }
                        gadgetpos++;
                    });
                    colpos++;
                }
            });
        });
    }

    public createBoard(name: string) {
        this.loadNewBoard(name);
    }

    public editBoard(name: string) {

    }

    public deleteBoard(name: string) {

        this._configurationService.deleteBoard(name).subscribe(data => {

                this.initializeBoard();

            },
            error => console.error('Deletion error', error),
            () => console.debug('Board Deletion: ' + name));

    }

    public addGadget(gadget: any) {

        const _gadget = Object.assign({}, gadget);

        _gadget.instanceId = new Date().getTime();
        _gadget.config = new GadgetConfigModel(gadget.config);

        this.setGadgetInsertPosition();

        const x = this.gridInsertionPosition.x;
        const y = this.gridInsertionPosition.y;

        if (!this.getModel().rows[x].columns[y].gadgets) {

            this.getModel().rows[x].columns[y].gadgets = [];
        }
        this.getModel().rows[x].columns[y].gadgets.push(_gadget);

        this.saveBoard('Adding Gadget To The Board', false);

    }

    public updateBoardLayout(structure) {

        const _model = Object.assign({}, this.getModel());

        const columns: any[] = this.readColumnsFromOriginalModel(_model);

        // reset the original model's rows and columns based on the new structure
        _model.rows.length = 0;

        _model.rows = structure.rows;
        _model.structure = structure.structure;
        _model.id = structure.id;

        let counter = 0;

        while (counter < columns.length) {
            counter = this.fillGridStructure(_model, columns, counter);
        }

        this.setModel(_model);

        // clear temporary object
        for (const member in  _model) {
            delete  _model[member];
        }

        this.saveBoard('Grid Layout Update', false);
    }

    private updateGridState() {

        let gadgetCount = 0;

        if (this.getModel().rows) {
            this.getModel().rows.forEach(function (row) {
                row.columns.forEach(function (column) {
                    if (column.gadgets) {
                        column.gadgets.forEach(function (gadget) {
                            gadgetCount++;
                        });
                    }
                });
            });
        }

        this.noGadgets = !gadgetCount;

        this.dashedStyle = {
            'border-style': this.noGadgets ? 'dashed' : 'none',
            'border-width': this.noGadgets ? '2px' : 'none',
            'border-color': this.noGadgets ? 'darkgray' : 'none',
            'padding': this.noGadgets ? '5px' : 'none'
        };
    }

    private readColumnsFromOriginalModel(_model) {

        const columns = [];
        _model.rows.forEach(function (row) {
            row.columns.forEach(function (col) {
                columns.push(col);
            });
        });
        return columns;

    }

    private fillGridStructure(_model, columns: any[], counter: number) {

        let me = this;
        _model.rows.forEach(function (row) {
            row.columns.forEach(function (column) {
                if (!column.gadgets) {
                    column.gadgets = [];
                }
                if (columns[counter]) {
                    me.copyGadgets(columns[counter], column);
                    counter++;
                }
            });
        });
        return counter;

    }

    private copyGadgets(source, target) {

        if (source.gadgets && source.gadgets.length > 0) {
            let w = source.gadgets.shift();
            while (w) {
                target.gadgets.push(w);
                w = source.gadgets.shift();
            }
        }
    }

    public enableConfigMode() {

        this._gadgetInstanceService.enableConfigureMode();
    }

    private initializeBoard() {

        this._configurationService.getBoards().subscribe(board => {

            if (board && board instanceof Array && board.length) {
                this.loadBoard(board[0].title);
            } else {

                this.loadDefaultBoard();
            }
        });
    }

    private loadBoard(boardTitle: string) {

        this.clearGridModelAndGadgetInstanceStructures();

        this._configurationService.getBoardByTitle(boardTitle).subscribe(board => {

                this.setModel(board);
                this.updateServicesAndGridWithModel();
                this.boardUpdateEvent.emit(boardTitle);
            },
            error => {
                console.error(error);
                this.loadDefaultBoard();

            });

    }

    private loadDefaultBoard() {

        this.clearGridModelAndGadgetInstanceStructures();

        this._configurationService.getDefaultBoard().subscribe(board => {

            console.log('loading default board');
            this.setModel(board);
            this.updateServicesAndGridWithModel();
            this.saveBoard('Initialization of a default board', true);


        });
    }

    private loadNewBoard(name: string) {

        this.clearGridModelAndGadgetInstanceStructures();

        this._configurationService.getDefaultBoard().subscribe(res => {

            this.setModel(res);
            this.getModel().title = name;

            this.updateServicesAndGridWithModel();
            this.saveBoard('Initialization of a new board', true);


        });
    }

    private updateServicesAndGridWithModel() {
        this._gadgetInstanceService.setCurrentModel(this.getModel());
        this._configurationService.setCurrentModel(this.getModel());
        this.updateGridState();
    }

    private saveBoard(operation: string, alertBoardListenerThatTheMenuShouldBeUpdated: boolean) {

        this.updateServicesAndGridWithModel();

        this._configurationService.saveBoard(this.getModel()).subscribe(result => {


                if (alertBoardListenerThatTheMenuShouldBeUpdated) {
                    this.boardUpdateEvent.emit(this.getModel().title);
                }
            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!'));

    }

    private clearGridModelAndGadgetInstanceStructures() {
        // clear gadgetInstances
        this._gadgetInstanceService.clearAllInstances();
        // clear current model
        for (const prop in this.getModel()) {
            if (this.model.hasOwnProperty(prop)) {
                delete this.model[prop];
            }
        }
    }

    private setGadgetInsertPosition() {

        for (let x = 0; x < this.getModel().rows.length; x++) {

            for (let y = 0; y < this.getModel().rows[x].columns.length; y++) {

                if (this.getModel().rows[x].columns[y].gadgets && this.getModel().rows[x].columns[y].gadgets.length === 0) {

                    this.gridInsertionPosition.x = x;
                    this.gridInsertionPosition.y = y;
                    return;

                }
            }
        }
        // we go here because the board is either empty or full
        // insert in the top left most cell
        this.gridInsertionPosition.y = 0;

        if (this.noGadgets) {
            // there are no gadgets so insert in top row
            this.gridInsertionPosition.x = 0;
        } else {
            // board is full so insert in the last row
            this.gridInsertionPosition.x = this.getModel().rows.length - 1;
        }
    }

    public setModel(model: any) {

        this.model = Object.assign({}, model);
    }

    public getModel() {
        return this.model;
    }

}
