/**
 * Created by jayhamilton on 1/31/17.
 */
export const boardLayouts = [


    {
        id: 1,
        title: 'single',
        checked: false,
        structure: '16',
        rows: [{
            columns: [
                {
                    styleClass: 'sixteen wide',

                }]
        }]
    },
    {
        id: 2,
        title: 'narrow-right',
        checked: false,
        structure: '10-6',
        rows: [{
            columns: [
                {
                    styleClass: 'ten wide',

                },
                {
                    styleClass: 'six wide',

                }]
        }]
    },
    {
        id: 3,
        title: 'wide-center',
        checked: false,
        structure: '4-8-4',
        rows: [{
            columns: [
                {
                    styleClass: 'four wide',

                },
                {
                    styleClass: 'eight wide',

                },
                {
                    styleClass: 'four wide',

                }]
        }]
    },
    {
        id: 4,
        title: 'narrow-left',
        checked: false,
        structure: '4-12',
        rows: [{
            columns: [
                {
                    styleClass: 'four wide',

                },
                {
                    styleClass: 'twelve wide',

                }]
        }]
    },
    {
        id: 5,
        title: 'two-even',
        checked: true,
        structure: '8-8',
        rows: [{
            columns: [
                {
                    styleClass: 'eight wide',

                },
                {
                    styleClass: 'eight wide',

                }]
        }]
    },
    {
        id: 6,
        title: 'three-even',
        checked: false,
        structure: '5-5-5',
        rows: [{
            columns: [
                {
                    styleClass: 'five wide',

                },
                {
                    styleClass: 'five wide',

                },
                {
                    styleClass: 'five wide',

                }
            ]
        }]
    },
    {
        id: 7,
        title: 'wide-top',
        checked: false,
        structure: '16/8-8',
        rows: [
            {
                columns: [
                    {
                        styleClass: 'sixteen wide'
                    }
                ]
            },
            {
                columns: [
                    {
                        styleClass: 'eight wide'
                    },
                    {
                        styleClass: 'eight wide'
                    }
                ]
            }
        ]
    },
    {
        id: 8,
        title: 'ngadmin',
        checked: false,
        structure: '4-4-4-4/8-4-4',
        rows: [
            {
                columns: [
                    {
                        styleClass: 'four wide'
                    },
                    {
                        styleClass: 'four wide'
                    },
                    {
                        styleClass: 'four wide'
                    },
                    {
                        styleClass: 'four wide'
                    }
                ]
            },
            {
                columns: [
                    {
                        styleClass: 'eight wide'
                    },
                    {
                        styleClass: 'four wide'
                    },
                    {
                        styleClass: 'four wide'
                    }
                ]
            }
        ]
    }

];
