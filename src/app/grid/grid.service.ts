/**
 * Created by jayhamilton on 1/28/17.
 */
import {Injectable} from '@angular/core';
import {Subject,Observable} from 'rxjs';

/**
 * todo - the name of this service does not represent the file name. This should be refactored. Consider moving this service to the gadget module instead.
 */

@Injectable()
export class GadgetInstanceService {

    private concreteGadgetInstances: any[] = [];
    private model: any;
    private subject: Subject<string> = new Subject<string>();
    private subscribers: Array<Subject<string>> = [];

    constructor() {
    }

    addInstance(gadget: any) {
        let gadgetFound = false;

        for (let x = 0; x < this.concreteGadgetInstances.length; x++) {
            if (gadget.instance.instanceId == this.concreteGadgetInstances[x]['instance']['instanceId']) {
                gadgetFound = true;
            }
        }

        if (gadgetFound == false) {
            this.concreteGadgetInstances.push(gadget);

        }
    }

    enableConfigureMode() {

        this.concreteGadgetInstances.forEach(function (gadget) {
            gadget.instance.toggleConfigMode();
        });
    }

    removeInstance(id: number) {

        console.log("REMOVING GADGET");
        // remove instance representation from model
        this.model.rows.forEach(function (row) {
            row.columns.forEach(function (column) {
                if (column.gadgets) {
                    for (let i = column.gadgets.length - 1; i >= 0; i--) {

                        if (column.gadgets[i].instanceId === id) {

                            column.gadgets.splice(i, 1);

                            break;
                        }
                    }
                }
            });
        });

        // removes concrete instance from service
        for (let x = this.concreteGadgetInstances.length - 1; x >= 0; x--) {

            if (this.concreteGadgetInstances[x].instance.instanceId === id) {

                const _gadget = this.concreteGadgetInstances.splice(x, 1);

                _gadget[0].destroy();

                break;
            }
        }

        // raise an event indicating a gadget was removed
        this.subject.next('gadget id: ' + id);
    }

    getInstanceCount() {
        return this.concreteGadgetInstances.length;
    }

    /*
     this allows this service to update the board when a delete operation occurs
     */
    setCurrentModel(model: any) {

        this.model = model;
    }

    /*
     raise an event that the grid.component is listening for when a gadget is removed.
     */
    listenForInstanceRemovedEventsFromGadgets(): Observable<string> {
        return this.subject.asObservable();
    }

    addSubscriber(subscriber: any) {
        this.subscribers.push(subscriber);
    }

    unSubscribeAll() {

        this.subscribers.forEach(subscription => {
            subscription.unsubscribe();
        });

        this.subscribers.length = 0;
        this.clearAllInstances();

    }
    clearAllInstances() {

        this.concreteGadgetInstances.length = 0;
    }

}
