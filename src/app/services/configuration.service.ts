/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {defaultBoard} from './configuration-sample-default-board';
import {sampleBoardCollectionProd} from './configuration-sample-boards-prod.model';
import {sampleBoardCollection} from './configuration-sample-boards.model';
import {environment} from '../../environments/environment';


@Injectable()
export class ConfigurationService {
    model: any; // todo review this object closely
    currentModel: any; // this object helps with updates to property page values
    demo = true;
    env: any;

    defaultBoard: any;
    sampleBoardCollection: any;
    sampleBoardCollectionProd:any;

    /**
     * todo - fix this hard coded store
     * @type {string}
     */
    remoteConfigurationRepository = '';

    constructor(private _http: HttpClient) {

        Object.assign(this, {defaultBoard});
        Object.assign(this, {sampleBoardCollection});
        Object.assign(this, {sampleBoardCollectionProd});
        this.env = environment;
        this.seedLocalStorageWithSampleBoardCollection();
    }

    private seedLocalStorageWithSampleBoardCollection() {

        if (localStorage.getItem('board') === null) {


            if (this.env.production == true) {

                localStorage.setItem('board', JSON.stringify(this.sampleBoardCollectionProd));
            } else {
                localStorage.setItem('board', JSON.stringify(this.sampleBoardCollection));
            }
        }
    }

    public getBoardByTitle(title: string) {

        if (this.demo) {

            return new Observable(observer => {
                const board_collection = JSON.parse(localStorage.getItem('board'));

                let data = '';
                board_collection['board'].forEach(boardModel => {

                    if (boardModel.title === title) {
                        data = boardModel;
                    }
                });
                observer.next(data);
                return () => {
                };
            });
        } else {

            return this._http.get(this.remoteConfigurationRepository + '/' + name);
        }
    }

    public getBoards() {

        if (this.demo) {
            return new Observable(observer => {
                let data = JSON.parse(localStorage.getItem('board'));
                if (!data) {
                    data = {board: []};
                }
                observer.next(data.board);
                return () => {
                };
            });

        } else {
            /**
             * todo - this call is based on an internal representation (admin console) of something called a store.
             * That concept requires refactoring.
             */
            return this._http.get(this.remoteConfigurationRepository);
        }
    }

    public saveBoard(board: any) {

        this.model = board;

        if (Object.keys(board).length === 0 && board.constructor === Object) {
            return  EMPTY;
        }

        if (this.demo) {
            return new Observable(observer => {
                let board_collection;

                // find and remove board from storage
                this.deleteBoardFromLocalStore(board.title);

                // get a collection object and add board to it
                if ((board_collection = JSON.parse(localStorage.getItem('board'))) == null) {

                    board_collection = {
                        board: []
                    };
                }
                board_collection['board'].push(board);

                // save
                localStorage.setItem('board', JSON.stringify(board_collection));

                observer.next({});

                return () => {
                };

            });

        } else {

            /**
             * todo - a delete must happen here
             *
             */
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };

            return this._http.post(this.remoteConfigurationRepository + '?id=' + board.title, JSON.stringify(board), httpOptions);
        }
    }

    private delete(board_collection: any) {

        localStorage.removeItem('board');
        localStorage.setItem('board', JSON.stringify(board_collection));

    }

    private deleteBoardFromLocalStore(boardTitle: string) {
        const board_collection = JSON.parse(localStorage.getItem('board'));

        let index;
        if (board_collection && (index = board_collection['board'].findIndex(item => {
            return item.title === boardTitle;
        })) >= 0) {

            board_collection['board'].splice(index, 1);

            this.delete(board_collection);

        }
    }

    public deleteBoard(boardTitle: string) {

        if (this.demo) {

            return new Observable(observer => {

                this.deleteBoardFromLocalStore(boardTitle);

                observer.next({});
                return () => {
                };

            });

        } else {

            return this._http.delete(this.remoteConfigurationRepository + '/' + boardTitle);
        }
    }

    public getDefaultBoard() {

        return new Observable(observer => {
            observer.next(this.defaultBoard);
            return () => {
            };
        });
    }


    /*
     when a gadget instance's property page is updated and saved, the change gets communicated to all
     gadgets. The gadget instance id that caused the change will update their current instance. todo - this might be able to be
     improved. For now the utility of this approach allows the configuration service to capture the property page change in a way
     that allows us to update the persisted board model.
     */
    notifyGadgetOnPropertyChange(gadgetConfig: string, instanceId: number) {

        this.savePropertyPageConfigurationToStore(gadgetConfig, instanceId);
    }


    setCurrentModel(_currentModel: any) {
        this.currentModel = _currentModel;
    }

    savePropertyPageConfigurationToStore(gadgetConfig: string, instanceId: number) {

        this.currentModel.rows.forEach(row => {

            row.columns.forEach(column => {

                if (column.gadgets) {
                    column.gadgets.forEach(gadget => {
                        this.updateProperties(gadgetConfig, gadget, instanceId);

                    });
                }
            });
        });

        this.saveBoard(this.currentModel).subscribe(result => {

                /**
                 * todo - create popup/toast to show configuration saved message
                 */
                console.debug('The following configuration model was saved!');

            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!'));


    }

    updateProperties(updatedProperties: any, gadget: any, instanceId: number) {

        const updatedPropsObject = JSON.parse(updatedProperties);

        if (gadget.instanceId === instanceId) {

            gadget.config.propertyPages.forEach(function (propertyPage) {

                for (let x = 0; x < propertyPage.properties.length; x++) {

                    for (const prop in updatedPropsObject) {
                        if (updatedPropsObject.hasOwnProperty(prop)) {
                            if (prop === propertyPage.properties[x].key) {
                                propertyPage.properties[x].value = updatedPropsObject[prop];
                            }
                        }
                    }
                }
            });
        }
    }
}
