/**
 * Created by jayhamilton on 5/16/17.
 */
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {credentialScheme, EndPoint, TAG} from './endpoint.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from "@angular/material";

@Component({
    selector: 'app-endpoint-detail',
    moduleId: module.id,
    templateUrl: './endpointDetail.html',
    styleUrls: ['./styles.css']
})

/**
 *
 * TODO- Redo this entire file and add a state machine. This code is very fragile.
 */

export class EndPointDetailComponent implements OnChanges, AfterViewInit {

    @Input() currentEndPoint: EndPoint;

    @Output() createEvent: EventEmitter<EndPoint> = new EventEmitter();
    @Output() updateEvent: EventEmitter<EndPoint> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<EndPoint> = new EventEmitter();

    preDefinedEndPoints = ["memory", "mock"];

    currentState: string;

    endPointForm: FormGroup;
    credentialScheme = credentialScheme;
    useCredentials = false;

    //chip/tag list control
    selectable = true;
    removable = true;
    visible = true;
    addOnBlur = true;

    preDefined = false;
    tagPlaceHolderText = '';
    formTags = {tags: []};

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ((value || '').trim()) {
            this.formTags.tags.push({name: value.trim()});
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.setControlsState('update');
    }

    removeTag(tag: TAG): void {
        const index = this.formTags.tags.indexOf(tag);

        if (index >= 0) {
            this.formTags.tags.splice(index, 1);
        }
        this.setControlsState('update');
    }


    ngAfterViewInit() {

        this.setControlsState('');
    }

    ngOnChanges() {

        this.resetEndPoint();
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

    setControlsState(state: string) {

        this.currentState = state;

        if (state != 'create') {
            this.preDefined = this.checkIfTheEndPointIsPredefinedAndShouldNotBeModified();
        } else {
            this.preDefined = false;
        }

        this.selectable = !this.preDefined;
        this.removable = !this.preDefined;


        if (this.preDefined) {
            this.endPointForm.get('name').disable();
            this.endPointForm.get('address').disable();
            this.endPointForm.get('description').disable();
            this.tagPlaceHolderText = '';
        } else {
            this.endPointForm.get('name').enable();
            this.endPointForm.get('address').enable();
            this.endPointForm.get('description').enable();
            this.tagPlaceHolderText = 'Add tag...';

        }

    }

    checkIfTheEndPointIsPredefinedAndShouldNotBeModified() {

        for (let x = 0; x < this.preDefinedEndPoints.length; x++) {
            if (this.currentEndPoint.name.toLocaleLowerCase().trim().indexOf(this.preDefinedEndPoints[x].toLocaleLowerCase().trim()) >= 0) {
                return true;
            }
        }

        return false;
    }


    setFormState() {

        /**
         * todo - implement state machine
         */

        if (this.endPointForm.get('name').pristine) {

            // something other than name changed so this must be an update
            if (this.endPointForm.dirty) {
                this.setControlsState('update');
            }
        } else {
            // name change so assume user wants to perform save as
            this.setControlsState('save as');
        }

        // reset state when a form is clean
        if (this.endPointForm.pristine) {
            this.setControlsState('reset');
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
    }

    createEndPoint() {

        const ep: EndPoint = new EndPoint(
            this.endPointForm.value.name,
            this.endPointForm.value.address,
            this.endPointForm.value.user,
            this.endPointForm.value.credential,
            this.endPointForm.value.credentialType,
            this.endPointForm.value.description,
            this.endPointForm.value.tokenAPI,
            this.endPointForm.value.tokenAPIProperty,
            this.endPointForm.value.tokenAPIHeader,
            {tags: []},
        );

        this.createEvent.emit(ep);
        this.setControlsState('reset');

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
        this.currentEndPoint.tags = this.formTags.tags.slice();

        this.updateEvent.emit(this.currentEndPoint);
        this.setControlsState('reset');
    }

    newEndPoint() {

        this.resetForm();
        /**
         * The create state is used to display the save icon even if the form is being edited
         * todo - implement state machine
         */
        this.setControlsState('create');

    }

    resetEndPoint() {

        this.endPointForm.get('address').enable();

        this.resetForm();

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

        this.formTags.tags = this.currentEndPoint.tags.slice();
        this.setControlsState('');

    }

    deleteEndPoint() {

        this.deleteEvent.emit(this.currentEndPoint);
        this.resetForm();

    }

    resetForm() {

        this.endPointForm.reset();
        this.formTags = {tags: []};
    }
}
