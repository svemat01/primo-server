import { PrinterInfoType } from './types/printerInfo';

export const printers: PrinterInfoType[] = [
    // {
    //     name: 'VAL-BFLAR-LAS',
    //     type: 'HP LaserJet P2055dn',
    //     url: 'http://192.168.16.76/hp/device/supply_status.htm',
    //     emulate: false,
    //     elements: [
    //         {
    //             color: 'black',
    //             colorSelector: '.width325px table tbody tr td table tbody tr:first-child td:nth-child(3)',
    //             partSelector: '.width325px table tbody tr td table tbody tr:first-child td:nth-child(2)',
    //         }
    //     ],
    //     preparePart: (input) => {
    //         return input.split(' ').at(-1).split('  ').at(-1);
    //     }
    // },
    // {
    //     name: 'VAL-EE-PERS',
    //     type: 'iR-ADV C3520',
    //     url: 'http://192.168.16.10:8000',
    //     emulate: true,
    //     elements: [
    //         {
    //             color: 'black',
    //             colorSelector: 'div#tonerInfomationModule tr:nth-child(5) td'
    //         },
    //         {
    //             color: 'yellow',
    //             colorSelector: 'div#tonerInfomationModule tr:nth-child(4) td'
    //         },
    //         {
    //             color: 'magenta',
    //             colorSelector: 'div#tonerInfomationModule tr:nth-child(3) td'
    //         },
    //         {
    //             color: 'cyan',
    //             colorSelector: 'div#tonerInfomationModule tr:nth-child(2) td'
    //         }
    //     ]
    // },
    {
        name: 'RON-E153A-CLAS',
        type: 'HP Color LaserJet M452dn',
        url: 'http://192.168.16.13/info_suppliesStatus.html',
        emulate: true,
        elements: [
            // {
            //     color: 'black',
            //     colorSelector:
            //         '.width325px > .width100 > tbody > tr:nth-child(1) > td > table.mainContentArea > tbody > tr:first-child > td > table.width100 > tbody > tr > td:nth-child(3)',
            // },
            // {
            //     color: 'yellow',
            //     colorSelector:
            //         '.width325px > .width100 > tbody > tr:nth-child(3) > td > table.mainContentArea > tbody > tr:first-child > td > table.width100 > tbody > tr > td:nth-child(3)',
            // },
            // {
            //     color: 'magenta',
            //     colorSelector:
            //         '.width325px > .width100 > tbody > tr:nth-child(5) > td > table.mainContentArea > tbody > tr:first-child > td > table.width100 > tbody > tr > td:nth-child(3)',
            // },
            // {
            //     color: 'cyan',
            //     colorSelector:
            //         '.width325px > .width100 > tbody > tr:nth-child(7) > td > table.mainContentArea > tbody > tr:first-child > td > table.width100 > tbody > tr > td:nth-child(3)',
            // },
            {
                color: 'black',
                colorSelector:
                    'tr:nth-child(1) > td:nth-child(1) > .mainContentArea:nth-child(1) .SupplyName:nth-child(3)',
            },
            {
                color: 'yellow',
                colorSelector: 'tr:nth-child(3) .SupplyName:nth-child(3)',
            },
            {
                color: 'magenta',
                colorSelector: 'tr:nth-child(5) .SupplyName:nth-child(3)',
            },
            {
                color: 'cyan',
                colorSelector: 'tr:nth-child(7) .SupplyName:nth-child(3)',
            },
        ],
        prepareColor: (input) => {
            return input.match(/\d/g).join('') + '%';
        },
    },
];
