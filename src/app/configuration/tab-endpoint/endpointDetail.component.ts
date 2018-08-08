/**
 * Created by jayhamilton on 5/16/17.
 */
import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {credentialScheme, EndPoint} from './endpoint.model';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-endpoint-detail',
    moduleId: module.id,
    templateUrl: './endpointDetail.html',
    styleUrls: ['./styles.css']
})

export class EndPointDetailComponent implements OnChanges, AfterViewInit {

    @Input() currentEndPoint: EndPoint;

    @Output() createEvent: EventEmitter<EndPoint> = new EventEmitter();
    @Output() updateEvent: EventEmitter<EndPoint> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<EndPoint> = new EventEmitter();

    preDefinedEndPoints = ["memory", "testendpoint"];

    currentState: string;

    endPointForm: FormGroup;
    credentialScheme = credentialScheme;
    useCredentials = false;


    checkPredefinition() {

        for (let x = 0; x < this.preDefinedEndPoints.length; x++) {
            if (this.preDefinedEndPoints[x].toLocaleLowerCase().trim() === this.currentEndPoint.name.toLocaleLowerCase().trim()) {
                this.disableControls();
            }
        }
    }

    ngAfterViewInit() {

        this.checkPredefinition();
    }

    ngOnChanges() {

        this.enableControls();
        this.endPointForm.get('address').enable();

        this.endPointForm.reset();
        this.endPointForm.setValue({
            name: this.currentEndPoint.name,
            address: this.currentEndPoint.address,
            user: this.currentEndPoint.user,
            credentialType: this.currentEndPoint.credentialType,
            credential: this.currentEndPoint.credential,
            description: this.currentEndPoint.description,
            tokenAPI: this.currentEndPoint.tokenAPI,
            tokenAPIProperty: this.currentEndPoint.tokenAPIProperty,
            tokenAPIHeader: this.currentEndPoint.tokenAPIHeader
        });
        this.checkPredefinition();
    }

    constructor(private fb: FormBuilder) {

        let me = this;

        this.createForm();

        this.endPointForm.valueChanges.forEach(
            (value => {
                if (this.currentState !== 'create') {
                    me.setFormState();
                }
            })
        );
    }

    disableControls() {

        this.endPointForm.get('name').disable();
        this.endPointForm.get('address').disable();
        this.endPointForm.get('description').disable();

    }

    enableControls() {

        this.endPointForm.get('name').enable();
        this.endPointForm.get('address').enable();
        this.endPointForm.get('description').enable();

    }


    useCredentialsChange(value) {

        this.useCredentials = value['checked'];

    }

    setFormState() {

        /**
         * todo - implement state machine
         */

        if (this.endPointForm.get('name').pristine) {

            // something other than name changed so this must be an update
            if (this.endPointForm.dirty) {
                this.currentState = 'update';
            }
        } else {
            // name change so assume user wants to perform save as
            this.currentState = 'save as';
        }

        // reset state when a form is clean
        if (this.endPointForm.pristine) {
            this.currentState = 'reset';
        }
    }

    createForm() {


        this.endPointForm = this.fb.group({

            name: ['', Validators.required],
            address: ['', Validators.required],
            user: '',
            credentialType: '',
            credential: '',
            tokenAPI: '',
            tokenAPIProperty: '',
            tokenAPIHeader: '',
            description: ''
        });


        /*

        this.endPointForm = this.fb.group({

            name: ['', Validators.required],
            address: ['', Validators.required],
            user: ['', Validators.required],
            credentialType: ['', Validators.required],
            credential: ['', Validators.required],
            tokenAPI: ['', Validators.required],
            tokenAPIProperty: ['', Validators.required],
            tokenAPIHeader: ['', Validators.required],
            description: ''
        });

        */
    }

    createEndPoint() {

        this.enableControls();


        const ep: EndPoint = new EndPoint(
            this.endPointForm.value.name,
            this.endPointForm.value.address,
            this.endPointForm.value.user,
            this.endPointForm.value.credential,
            this.endPointForm.value.credentialType,
            this.endPointForm.value.description,
            this.endPointForm.value.tokenAPI,
            this.endPointForm.value.tokenAPIProperty,
            this.endPointForm.value.tokenAPIHeader
        );

        this.createEvent.emit(ep);
        this.currentState = 'reset';
    }

    updateEndPoint() {

        this.currentEndPoint.name = this.endPointForm.value.name;
        this.currentEndPoint.address = this.endPointForm.value.address;
        this.currentEndPoint.user = this.endPointForm.value.user;
        this.currentEndPoint.credential = this.endPointForm.value.credential;
        this.currentEndPoint.credentialType = this.endPointForm.value.credentialType;
        this.currentEndPoint.description = this.endPointForm.value.description;
        this.currentEndPoint.tokenAPI = this.endPointForm.value.tokenAPI;
        this.currentEndPoint.tokenAPIProperty = this.endPointForm.value.tokenAPIProperty;
        this.currentEndPoint.tokenAPIHeader = this.endPointForm.value.tokenAPIHeader;

        this.updateEvent.emit(this.currentEndPoint);
        this.currentState = 'reset';
    }

    newEndPoint() {

        this.enableControls();
        this.endPointForm.reset();
        /**
         * The create state is used to display the save icon even if the form is being edited
         * todo - implmenet state machine
         */
        this.currentState = 'create';
    }

    resetEndPoint() {
        this.ngOnChanges();

    }

    deleteEndPoint() {

        this.deleteEvent.emit(this.currentEndPoint);
        this.endPointForm.reset();


    }
}
