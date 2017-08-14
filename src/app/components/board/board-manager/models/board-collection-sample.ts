export const sampleBoardCollection = {
    'board': [{
        'title': 'Board Sample 1',
        'structure': '4-12',
        'id': 4,
        'rows': [
            {
                'columns': [
                    {
                        'styleClass': 'four wide',
                        'gadgets': [
                            {
                                'componentType': 'NewsGadgetComponent',
                                'name': 'News',
                                'description': "What's new",
                                'icon': 'images/news.png',
                                'instanceId': 1500253814523,
                                'tags': [
                                    {
                                        'facet': 'Informational',
                                        'name': 'news'
                                    },
                                    {
                                        'facet': 'List',
                                        'name': 'news'
                                    }
                                ],
                                'config': {
                                    'propertyPages': [
                                        {
                                            'displayName': 'Run',
                                            'groupId': 'run',
                                            'position': 10,
                                            'properties': [
                                                {
                                                    'value': 'news',
                                                    'key': 'endpoint',
                                                    'label': 'News URL',
                                                    'required': false,
                                                    'order': 3,
                                                    'controlType': 'dynamicdropdown'
                                                },
                                                {
                                                    'value': 'News',
                                                    'key': 'title',
                                                    'label': 'Title',
                                                    'required': false,
                                                    'order': 1,
                                                    'controlType': 'textbox'
                                                },
                                                {
                                                    'value': 2,
                                                    'key': 'instanceId',
                                                    'required': false,
                                                    'order': -1,
                                                    'controlType': 'hidden'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        'styleClass': 'twelve wide',
                        'gadgets': [
                            {
                                'componentType': 'CPUGadgetComponent',
                                'name': 'CPU Chart',
                                'description': 'Monitors CPU utilization for CDM.',
                                'icon': 'images/cpu.png',
                                'instanceId': 1499912922910,
                                'tags': [
                                    {
                                        'facet': 'Performance',
                                        'name': 'real-time'
                                    },
                                    {
                                        'facet': 'Chart',
                                        'name': 'bar'
                                    }
                                ],
                                'config': {
                                    'propertyPages': [
                                        {
                                            'displayName': 'Run',
                                            'groupId': 'run',
                                            'position': 10,
                                            'properties': [
                                                {
                                                    'value': 'CPU Utilization',
                                                    'key': 'title',
                                                    'label': 'Title',
                                                    'required': false,
                                                    'order': 1,
                                                    'controlType': 'textbox'
                                                },
                                                {
                                                    'value': 'Carlosappliance - Process Monitor',
                                                    'key': 'endpoint',
                                                    'label': 'API Endpoints',
                                                    'required': false,
                                                    'order': 3,
                                                    'controlType': 'dynamicdropdown'
                                                },
                                                {
                                                    'value': 999,
                                                    'key': 'instanceId',
                                                    'required': false,
                                                    'order': -1,
                                                    'controlType': 'hidden'
                                                }
                                            ]
                                        },
                                        {
                                            'displayName': 'Chart',
                                            'groupId': 'chart',
                                            'position': 11,
                                            'properties': [
                                                {
                                                    'value': true,
                                                    'key': 'chart_properties',
                                                    'label': 'Show chart details',
                                                    'required': false,
                                                    'order': 3,
                                                    'controlType': 'checkbox'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                'componentType': 'TrendGadgetComponent',
                                'name': 'Trend',
                                'description': 'General trends.',
                                'icon': 'images/trend.png',
                                'instanceId': 1499912901569,
                                'tags': [
                                    {
                                        'facet': 'Performance',
                                        'name': 'trend'
                                    },
                                    {
                                        'facet': 'Chart',
                                        'name': 'area'
                                    }
                                ],
                                'config': {
                                    'propertyPages': [
                                        {
                                            'displayName': 'Run',
                                            'groupId': 'run',
                                            'position': 10,
                                            'properties': [
                                                {
                                                    'value': 'Devappliance - ECX',
                                                    'key': 'endpoint',
                                                    'label': 'API Endpoints',
                                                    'required': false,
                                                    'order': 2,
                                                    'controlType': 'dynamicdropdown'
                                                },
                                                {
                                                    'value': 'Trend',
                                                    'key': 'title',
                                                    'label': 'Title',
                                                    'required': false,
                                                    'order': 1,
                                                    'controlType': 'textbox'
                                                },
                                                {
                                                    'value': 2,
                                                    'key': 'instanceId',
                                                    'required': false,
                                                    'order': -1,
                                                    'controlType': 'hidden'
                                                }
                                            ]
                                        },
                                        {
                                            'displayName': 'Chart',
                                            'groupId': 'chart',
                                            'position': 11,
                                            'properties': [
                                                {
                                                    'value': true,
                                                    'key': 'chart_properties',
                                                    'label': 'Show chart details',
                                                    'required': false,
                                                    'order': 3,
                                                    'controlType': 'checkbox'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }, {
            'title': 'Board Sample 2',
            'structure': '4-4-4-4/8-4-4',
            'id': 8,
            'rows': [
                {
                    'columns': [
                        {
                            'styleClass': 'four wide',
                            'gadgets': [
                                {
                                    'componentType': 'StatisticGadgetComponent',
                                    'name': 'Statistic',
                                    'description': 'General statistic.',
                                    'icon': 'images/statistic.png',
                                    'instanceId': 1499912861630,
                                    'tags': [
                                        {
                                            'facet': 'Statistic',
                                            'name': 'counter'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'database',
                                                        'key': 'resource',
                                                        'label': 'Resource',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dropdown',
                                                        'options': [
                                                            {
                                                                'key': 'vm',
                                                                'value': 'vm'
                                                            },
                                                            {
                                                                'key': 'database',
                                                                'value': 'database'
                                                            },
                                                            {
                                                                'key': 'volume',
                                                                'value': 'volume'
                                                            },
                                                            {
                                                                'key': 'job',
                                                                'value': 'job'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        'value': 'Devappliance - ECX',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Statistic',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': true,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            'styleClass': 'four wide',
                            'gadgets': [
                                {
                                    'componentType': 'StatisticGadgetComponent',
                                    'name': 'Statistic',
                                    'description': 'General statistic.',
                                    'icon': 'images/statistic.png',
                                    'instanceId': 1499912845375,
                                    'tags': [
                                        {
                                            'facet': 'Statistic',
                                            'name': 'counter'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'vm',
                                                        'key': 'resource',
                                                        'label': 'Resource',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dropdown',
                                                        'options': [
                                                            {
                                                                'key': 'vm',
                                                                'value': 'vm'
                                                            },
                                                            {
                                                                'key': 'database',
                                                                'value': 'database'
                                                            },
                                                            {
                                                                'key': 'volume',
                                                                'value': 'volume'
                                                            },
                                                            {
                                                                'key': 'job',
                                                                'value': 'job'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        'value': 'Carlosappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Statistic',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': true,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            'styleClass': 'four wide',
                            'gadgets': [
                                {
                                    'componentType': 'StatisticGadgetComponent',
                                    'name': 'Statistic',
                                    'description': 'General statistic.',
                                    'icon': 'images/statistic.png',
                                    'instanceId': 1500251223835,
                                    'tags': [
                                        {
                                            'facet': 'Statistic',
                                            'name': 'counter'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'volume',
                                                        'key': 'resource',
                                                        'label': 'Resource',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dropdown',
                                                        'options': [
                                                            {
                                                                'key': 'vm',
                                                                'value': 'vm'
                                                            },
                                                            {
                                                                'key': 'database',
                                                                'value': 'database'
                                                            },
                                                            {
                                                                'key': 'volume',
                                                                'value': 'volume'
                                                            },
                                                            {
                                                                'key': 'job',
                                                                'value': 'job'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        'value': 'Carlosappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Statistic',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': true,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            'styleClass': 'four wide',
                            'gadgets': [
                                {
                                    'componentType': 'StatisticGadgetComponent',
                                    'name': 'Statistic',
                                    'description': 'General statistic.',
                                    'icon': 'images/statistic.png',
                                    'instanceId': 1500251241829,
                                    'tags': [
                                        {
                                            'facet': 'Statistic',
                                            'name': 'counter'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'job',
                                                        'key': 'resource',
                                                        'label': 'Resource',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dropdown',
                                                        'options': [
                                                            {
                                                                'key': 'vm',
                                                                'value': 'vm'
                                                            },
                                                            {
                                                                'key': 'database',
                                                                'value': 'database'
                                                            },
                                                            {
                                                                'key': 'volume',
                                                                'value': 'volume'
                                                            },
                                                            {
                                                                'key': 'job',
                                                                'value': 'job'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        'value': 'Carlosappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Statistic',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': true,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'columns': [
                        {
                            'styleClass': 'eight wide',
                            'gadgets': [
                                {
                                    'componentType': 'TrendLineGadgetComponent',
                                    'name': 'Realtime Performance',
                                    'description': 'IOPs and Network Bandwidth.',
                                    'icon': 'images/trend-line.png',
                                    'instanceId': 1500251340757,
                                    'tags': [
                                        {
                                            'facet': 'Performance',
                                            'name': 'trend'
                                        },
                                        {
                                            'facet': 'Chart',
                                            'name': 'line'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'Devappliance - ECX',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Performance',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': false,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'Chart',
                                                'groupId': 'chart',
                                                'position': 11,
                                                'properties': [
                                                    {
                                                        'value': true,
                                                        'key': 'chart_properties',
                                                        'label': 'Show chart details',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'checkbox'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    'componentType': 'ServiceListGadgetComponent',
                                    'name': 'Service Status',
                                    'description': 'Monitors Service Status',
                                    'icon': 'images/service.png',
                                    'instanceId': 1500343727872,
                                    'tags': [
                                        {
                                            'facet': 'List',
                                            'name': 'health'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'Devappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Service Status',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 999,
                                                        'key': 'instanceId',
                                                        'required': false,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'List',
                                                'groupId': 'chart',
                                                'position': 11,
                                                'properties': [
                                                    {
                                                        'value': true,
                                                        'key': 'chart_properties',
                                                        'label': 'Show chart details',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'checkbox'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            'styleClass': 'four wide',
                            'gadgets': [
                                {
                                    'componentType': 'DiskGadgetComponent',
                                    'name': 'Disk Utilization',
                                    'description': 'Disk consumption information for ECX.',
                                    'icon': 'images/donut.png',
                                    'instanceId': 1500253741130,
                                    'tags': [
                                        {
                                            'facet': 'Chart',
                                            'name': 'pie'
                                        },
                                        {
                                            'facet': 'Performance',
                                            'name': 'storage'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'Carlosappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 4,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Disk Consumption',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 50,
                                                        'key': 'threshold',
                                                        'label': 'Consumed Threshold',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'number'
                                                    },
                                                    {
                                                        'value': 'g3g3egegre',
                                                        'key': 'diskid',
                                                        'label': 'Disk Id',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dropdown',
                                                        'options': [
                                                            {
                                                                'key': '2344112gdfgdfg',
                                                                'value': '2344112gdfgdfg'
                                                            },
                                                            {
                                                                'key': 'g3g3egegre',
                                                                'value': 'g3g3egegre'
                                                            },
                                                            {
                                                                'key': '8435f34',
                                                                'value': '8435f34'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': false,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'Thresholds',
                                                'groupId': 'threshold',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 30,
                                                        'key': 'frequency',
                                                        'label': 'Frequency',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'number'
                                                    },
                                                    {
                                                        'value': 30,
                                                        'key': 'retentionH',
                                                        'label': 'Retention High',
                                                        'required': false,
                                                        'order': 4,
                                                        'controlType': 'number'
                                                    },
                                                    {
                                                        'value': 180,
                                                        'key': 'retentionL',
                                                        'label': 'Retention Low',
                                                        'required': false,
                                                        'order': 4,
                                                        'controlType': 'number'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'Chart',
                                                'groupId': 'chart',
                                                'position': 11,
                                                'properties': [
                                                    {
                                                        'value': true,
                                                        'key': 'chart_properties',
                                                        'label': 'Show chart details',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'checkbox'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            'styleClass': 'four wide',
                            'gadgets': [
                                {
                                    'componentType': 'DiskGadgetComponent',
                                    'name': 'Disk Utilization',
                                    'description': 'Disk consumption information for ECX.',
                                    'icon': 'images/donut.png',
                                    'instanceId': 1500252483066,
                                    'tags': [
                                        {
                                            'facet': 'Chart',
                                            'name': 'pie'
                                        },
                                        {
                                            'facet': 'Performance',
                                            'name': 'storage'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'Carlosappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 4,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Disk Consumption',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 50,
                                                        'key': 'threshold',
                                                        'label': 'Consumed Threshold',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'number'
                                                    },
                                                    {
                                                        'value': 'g3g3egegre',
                                                        'key': 'diskid',
                                                        'label': 'Disk Id',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dropdown',
                                                        'options': [
                                                            {
                                                                'key': '2344112gdfgdfg',
                                                                'value': '2344112gdfgdfg'
                                                            },
                                                            {
                                                                'key': 'g3g3egegre',
                                                                'value': 'g3g3egegre'
                                                            },
                                                            {
                                                                'key': '8435f34',
                                                                'value': '8435f34'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': false,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'Thresholds',
                                                'groupId': 'threshold',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 30,
                                                        'key': 'frequency',
                                                        'label': 'Frequency',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'number'
                                                    },
                                                    {
                                                        'value': 30,
                                                        'key': 'retentionH',
                                                        'label': 'Retention High',
                                                        'required': false,
                                                        'order': 4,
                                                        'controlType': 'number'
                                                    },
                                                    {
                                                        'value': 180,
                                                        'key': 'retentionL',
                                                        'label': 'Retention Low',
                                                        'required': false,
                                                        'order': 4,
                                                        'controlType': 'number'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'Chart',
                                                'groupId': 'chart',
                                                'position': 11,
                                                'properties': [
                                                    {
                                                        'value': true,
                                                        'key': 'chart_properties',
                                                        'label': 'Show chart details',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'checkbox'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    'componentType': 'TrendGadgetComponent',
                                    'name': 'Trend',
                                    'description': 'General trends.',
                                    'icon': 'images/trend.png',
                                    'instanceId': 1500252536414,
                                    'tags': [
                                        {
                                            'facet': 'Performance',
                                            'name': 'trend'
                                        },
                                        {
                                            'facet': 'Chart',
                                            'name': 'area'
                                        }
                                    ],
                                    'config': {
                                        'propertyPages': [
                                            {
                                                'displayName': 'Run',
                                                'groupId': 'run',
                                                'position': 10,
                                                'properties': [
                                                    {
                                                        'value': 'Carlosappliance - Process Monitor',
                                                        'key': 'endpoint',
                                                        'label': 'API Endpoints',
                                                        'required': false,
                                                        'order': 2,
                                                        'controlType': 'dynamicdropdown'
                                                    },
                                                    {
                                                        'value': 'Trend',
                                                        'key': 'title',
                                                        'label': 'Title',
                                                        'required': false,
                                                        'order': 1,
                                                        'controlType': 'textbox'
                                                    },
                                                    {
                                                        'value': 2,
                                                        'key': 'instanceId',
                                                        'required': false,
                                                        'order': -1,
                                                        'controlType': 'hidden'
                                                    }
                                                ]
                                            },
                                            {
                                                'displayName': 'Chart',
                                                'groupId': 'chart',
                                                'position': 11,
                                                'properties': [
                                                    {
                                                        'value': true,
                                                        'key': 'chart_properties',
                                                        'label': 'Show chart details',
                                                        'required': false,
                                                        'order': 3,
                                                        'controlType': 'checkbox'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
