import {Component, Input, ViewContainerRef, OnInit, ComponentFactoryResolver} from '@angular/core';
import {GadgetInstanceService} from './grid.service';
import {GadgetFactory} from '../../add-gadget/gadget-factory';

/*
 this class handles the dynamic creation of components
 */

@Component({
    selector: 'app-grid-cell',
    template: ''
})
export class CellComponent implements OnInit {
    @Input() gadgetType: string;
    @Input() gadgetConfig: any;
    @Input() gadgetInstanceId: number;


    constructor(private viewContainerRef: ViewContainerRef,
                private cfr: ComponentFactoryResolver, private gadgetInstanceService: GadgetInstanceService) {
    }

    ngOnInit() {
        /*
         create component instance dynamically
         */
        const component: any = GadgetFactory.getComponentType(this.gadgetType);
        let compFactory: any = {};
        let gadgetRef: any = {};

        if (component) {
            compFactory = this.cfr.resolveComponentFactory(component);
            gadgetRef = this.viewContainerRef.createComponent(compFactory);

            /*
             we need to pass the input parameters (instance id and config) back into the newly created component.
             */
            gadgetRef.instance.configureGadget(this.gadgetInstanceId, this.gadgetConfig);

            /*
             add concrete component to service for tracking
             */
            this.gadgetInstanceService.addInstance(gadgetRef);
        }

    }

}

