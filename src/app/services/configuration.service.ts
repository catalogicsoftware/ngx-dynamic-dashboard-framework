/**
 * Created by jayhamilton on 2/7/17.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ConfigurationService {
    model: any; // todo review this object closely
    currentModel: any; // this object helps with updates to property page values
    demo = true;

    /**
     * todo - fix this hard coded store
     * @type {string}
     */
    localStore = 'http://localhost:8090/api/store';

    constructor(private _http: Http) {
    }

    getConfigurationModelFromPersistentStore(configurationName: string) {

        if (this.demo) {

            return this._http.request('/assets/api/board-store/' + configurationName.toLocaleLowerCase() + '.json').map(res => res.json());
        } else {

            return this._http.get(this.localStore + '/' + configurationName).map(res => res.json());
        }
    }

    getDefaultConfigurationModelFromDisk() {
        return this._http.request('/assets/api/board-default-model.json').map(res => res.json());
    }

    deletePersistedModel(configurationName: string) {

        if (this.demo) {

            return new Observable(observer => {

                localStorage.removeItem(configurationName);
                observer.next({});
                return () => {
                };

            });

        } else {

            return this._http.delete(this.localStore + '/' + configurationName);
        }
    }

    saveConfigurationModel(model: any) {

        this.model = model;

        if (Object.keys(model).length === 0 && model.constructor === Object) {
            return Observable.empty();
        }

        if (this.demo) {
            const me = this;
            return new Observable(observer => {

                localStorage.setItem(me.model.title, JSON.stringify(me.model));
                observer.next({});
                return () => {
                };

            });

        } else {

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this.localStore + '?id=' + model.title, JSON.stringify(model), {headers: headers});

        }
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

    getConfigurationModels() {

        if (this.demo) {

            return this._http.request('/assets/api/board-example-config-model.json').map(res => res.json());

        } else {

            return this._http.get(this.localStore).map(res => res.json());

        }
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


        /**
         * todo - saving a configuration involves deletion from the store first. This is also
         * done in the grid.component.ts file. Improve save logic such that the caller does not have
         * to be concerned with deletion first. In addition this may be causing occasional 409 errors seen in the console.
         * The attempt to save may be occurring prematurely even though the delete operation is returning.
         */
        this.deletePersistedModel(this.currentModel.title).subscribe(data => {

                this.saveConfigurationModel(this.currentModel).subscribe(result => {

                        /**
                         * todo - create popup/toast to show configuration saved message
                         */
                        console.debug('The following configuration model was saved!');

                    },
                    error => console.error('Error' + error),
                    () => console.debug('Saving configuration to store!'));

            },
            error => console.error('Error', error),
            () => console.debug('Attempting to remove model'));
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
