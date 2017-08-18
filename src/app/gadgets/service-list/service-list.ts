/**
 * Created by jayhamilton on 1/28/17.
 */
export const serviceList: {
    active: boolean,
    applicationName: string,
    description: string,
    icon: string,
    pseudoName: string,
    processId: string}[] = [
    {
        active: false,
        applicationName: 'Application Container',
        description: 'This is a modular application container.',
        icon: 'images/donut.png',
        pseudoName: 'Virgo',
        processId: '1'
    },
    {
        active: false,
        applicationName: 'Microservice Discover Server',
        description: 'This is a microservice discovery service.',
        icon: 'images/donut.png',
        pseudoName: 'Eureka',
        processId: '2'
    },
    {
        active: false,
        applicationName: 'Relational Database Management System',
        description: 'This is a database server.',
        icon: 'images/donut.png',
        pseudoName: 'Postgres',
        processId: '3'
    },
    {
        active: false,
        applicationName: 'NO Sql Database Server',
        description: 'This is a no sql database server.',
        icon: 'images/donut.png',
        pseudoName: 'Mongo',
        processId: '4'
    }

];
