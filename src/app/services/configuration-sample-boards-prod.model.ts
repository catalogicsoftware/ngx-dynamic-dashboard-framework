export const sampleBoardCollectionProd = {
    "board":
    [{
        "title": "Network Test",
        "structure": "8",
        "id": 0,
        "boardInstanceId": 1532575263046,
        "rows": [{
            "columns": [{
                "styleClass": "eight wide",
                "gadgets": [{
                    "componentType": "PortConnectionGadgetComponent",
                    "name": "Port Connection Test",
                    "description": "Test Connection To Endpoints.",
                    "icon": "assets/images/response.png",
                    "instanceId": 1533516521962,
                    "tags": [{"facet": "Informational", "name": "port-connection"}],
                    "config": {
                        "propertyPages": [{
                            "displayName": "Run",
                            "groupId": "run",
                            "position": 10,
                            "properties": [{
                                "value": "Connection Test",
                                "key": "title",
                                "label": "Title",
                                "required": false,
                                "order": 1,
                                "controlType": "textbox"
                            }, {
                                "value": "",
                                "key": "host",
                                "label": "Host",
                                "required": false,
                                "order": 1,
                                "controlType": "textbox"
                            }, {
                                "value": "",
                                "key": "port",
                                "label": "Port(s)",
                                "required": false,
                                "order": 3,
                                "controlType": "dropdown",
                                "options": [{
                                    "key": "vSnap + vAdp (All Ports)",
                                    "value": "8900,8080,22,111,20048,2049"
                                }, {
                                    "key": "SPP Single Appliance (All Ports)",
                                    "value": "443,8900,22,111,20048,2049"
                                }, {"key": "SPP (443)", "value": "443"}, {
                                    "key": "SPP (8443)",
                                    "value": "8443"
                                }, {"key": "SPP (3000)", "value": "3000"}, {
                                    "key": "LDAP (389)",
                                    "value": "389"
                                }, {"key": "LDAP (636)", "value": "636"}, {
                                    "key": "VADP (8080)",
                                    "value": "8080"
                                }, {"key": "WinRM (5985)", "value": "5985"}, {
                                    "key": "VSnap (8900)",
                                    "value": "8900"
                                }, {"key": "SSH (22)", "value": "22"}, {
                                    "key": "ISCSI (3260)",
                                    "value": "3260"
                                }, {"key": "NFS (2049)", "value": "2049"}, {
                                    "key": "NFS (20048)",
                                    "value": "20048"
                                }, {"key": "NFS (111)", "value": "111"}, {"key": "ESXI (902)", "value": "902"}]
                            }, {
                                "value": 2,
                                "key": "instanceId",
                                "label": "",
                                "required": false,
                                "order": -1,
                                "controlType": "hidden"
                            }]
                        }]
                    },
                    "actions": [{"name": "Add"}]
                }]
            }]
        }]
    }]
};

