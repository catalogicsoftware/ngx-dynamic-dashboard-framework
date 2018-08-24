/**
 * Created by jayhamilton on 5/31/17.
 */
import {Component} from '@angular/core';
import {EndPoint} from './endpoint.model';
import {EndPointService} from './endpoint.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-endpoint-config-tab',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']


})
export class EndpointConfigurationTabComponent {

    env:any;

    endPoints: EndPoint[];

    currentEndPoint: EndPoint = new EndPoint('', '', '', '', '', '',
        '', '', '',{'tags':[]});

    constructor(private _endPointService: EndPointService) {

        this.env = environment;

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

        this.persistInMemoryDataToStore();

        this.setSelectedEndPoint(endPoint);
    }

    updateEndPoint(endPoint: EndPoint) {

        this.deleteEndPoint(endPoint);
        this.createEndPoint(endPoint);

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
        }else{
            this.setSelectedEndPoint(this.endPoints[0])
        }
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


