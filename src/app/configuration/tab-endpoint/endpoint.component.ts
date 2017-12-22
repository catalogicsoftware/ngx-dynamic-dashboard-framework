/**
 * Created by jayhamilton on 5/31/17.
 */
import {Component} from '@angular/core';
import {EndPoint} from './endpoint.model';
import {EndPointService} from './endpoint.service';

@Component({
    selector: 'app-endpoint',
    moduleId: module.id,
    templateUrl: './endpoint.html',
    styleUrls: ['./styles-endpoints.css']


})
export class EndPointComponent {

    endPoints: EndPoint[];

    currentEndPoint: EndPoint = new EndPoint('', '', '', '', '', '', '', '', '');

    constructor(private _endPointService: EndPointService) {

        this._endPointService.getEndPoints().subscribe(data => {
            this.endPoints = data['endPoint'];

            if (this.endPoints && this.endPoints.length) {
                this.setSelectedEndPoint(this.endPoints[0]);
            }

        });
    }

    setSelectedEndPoint(endPoint: EndPoint) {
        this.currentEndPoint = endPoint;
    }

    createEndPoint(endPoint: EndPoint) {

        if (!this.endPoints) {
            this.endPoints = [];
        }

        this.endPoints.push(endPoint);

        this.clearPersistantStore();

        this.persistInMemoryDataToStore();

        this.setSelectedEndPoint(endPoint);
    }

    updateEndPoint(endPoint: EndPoint) {


    }

    deleteEndPoint(endPoint: EndPoint) {

        // find endPoint in memory by name for now (need to use the id) and remove it
        this.endPoints.forEach(item => {

            if (item.name === endPoint.name) {
                const index = this.endPoints.indexOf(item);
                if (index > -1) {
                    this.endPoints.splice(index, 1);
                }
            }
        });

        this.clearPersistantStore();

        this.persistInMemoryDataToStore();

        if (this.endPoints && this.endPoints.length === 0) {
            this.currentEndPoint.name = '';
            this.currentEndPoint.address = '';
            this.currentEndPoint.description = '';
            this.currentEndPoint.credential = '';
            this.currentEndPoint.credentialType = '';
            this.currentEndPoint.tokenAPI = '';
            this.currentEndPoint.tokenAPIProperty = '';
            this.currentEndPoint.user = '';
        }
    }

    clearPersistantStore() {

        // delete the currently persisted structure
        this._endPointService.deleteEndPoint().subscribe(data => {

            /**
             * todo - error handling
             */
        });
    }

    persistInMemoryDataToStore() {

        const endpointModel = {
            endPoint: this.endPoints
        };
        // persist in memory structure
        this._endPointService.saveEndPoint(endpointModel).subscribe(data => {

            /**
             * todo - error handling
             */
        });

    }

}


