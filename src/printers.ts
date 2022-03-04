/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-identical-functions */
import { PrinterListType } from './types/printerInfo';

// 192.168.16.26, weird printer
// http://192.168.16.38, needs password
// 192.168.16.44 unknown ink status
// http://192.168.16.47/ unknown login
// https://192.168.16.56/ https error
// https://192.168.16.60/ https error

// TODO: CONTINUE WITH AND FROM https://192.168.16.56/

export const printers: PrinterListType = {
    'AR-M351N': {
        printers: [
            {
                name: 'VAL-11-SFI-CKOP',
                url: 'http://192.168.16.62/machine_status.html',
            },
        ],
        elements: {
            black: '.msts:nth-child(10) tr:nth-child(1) > td:nth-child(2)',
        },
        emulate: false,
    },

    // #region Brother printers
    'MFC-J6720DW': {
        printers: [
            {
                name: 'RON-H03-MULTI',
                url: 'http://192.168.16.32/general/status.html',
            },
        ],
        elements: {
            magenta: 'td:nth-child(1) > .tonerremain',

            cyan: 'td:nth-child(2) > .tonerremain',

            yellow: 'td:nth-child(3) > .tonerremain',
            black: 'td:nth-child(4) > .tonerremain',
        },
        emulate: true,
        colorInterpreter: async (element) => {
            const height = await element.evaluate((element_) =>
                element_.getAttribute('height')
            );

            if (!height) return '0';

            return String(Number(height) * 2);
        },
    },
    // #endregion

    // #region Dell printers
    'Dell Color Laser 1320c': {
        printers: [
            {
                url: 'http://192.168.16.30/ews/status/status.htm',
                name: 'RON-H03-CLAS',
            },
        ],
        elements: {
            cyan: 'table:nth-child(7) tr:nth-child(2) b',
            magenta: 'tr:nth-child(4) b',

            yellow: 'tr:nth-child(6) b',

            black: 'tr:nth-child(8) b',
        },
        emulate: true,
    },
    // #endregion

    // #region HP printers
    'HP LaserJet P2055dn': {
        printers: [
            {
                url: 'http://192.168.16.18/hp/device/supply_status.htm',
                name: 'RON-E232-LAS',
            },
            {
                url: 'http://192.168.16.76/hp/device/supply_status.htm',
                name: 'VAL-BFLAR-LAS',
            },
            {
                url: 'http://192.168.16.52/hp/device/supply_status.htm',
                name: 'VAL-111-BYGG-GRP-LAS',
            },
            {
                url: 'http://192.168.16.53/hp/device/supply_status.htm',
                name: 'VAL-111-RES-LAS',
            },
        ],
        emulate: false,
        elements: {
            black: '.width10',
        },
    },
    'HP Color LaserJet M452dn': {
        printers: [
            {
                name: 'RON-E153A-CLAS',
                url: 'http://192.168.16.13/info_suppliesStatus.html',
            },
        ],
        emulate: true,
        elements: {
            black: 'tr:nth-child(1) > td:nth-child(1) > .mainContentArea:nth-child(1) .SupplyName:nth-child(3)',
            yellow: 'tr:nth-child(3) .SupplyName:nth-child(3)',
            magenta: 'tr:nth-child(5) .SupplyName:nth-child(3)',
            cyan: 'tr:nth-child(7) .SupplyName:nth-child(3)',
        },
    },
    // #endregion

    // #region imageRunner printers
    'iR-ADV C2230': {
        printers: [
            {
                name: 'RIKT-NYBROVAGEN-CLAS',
                url: 'http://192.168.16.49:8000',
            },
        ],
        elements: {
            cyan: '#tonerInfomationModule tr:nth-child(2) > td',
            magenta: '#tonerInfomationModule tr:nth-child(3) > td',
            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
            black: '#tonerInfomationModule tr:nth-child(5) > td',
        },
        emulate: true,
        prepareColor: (input) => {
            if (input.toLowerCase().includes('ok')) return '100';

            return '0';
        },
    },
    'iR-ADV C3520': {
        printers: [
            {
                url: 'http://192.168.16.10:8000',
                name: 'VAL-EE-PERS',
            },
        ],
        elements: {
            black: 'tr:nth-child(5) > td',

            magenta: '#tonerInfomationModule tr:nth-child(3) > td',

            cyan: '#tonerInfomationModule tr:nth-child(2) > td',

            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
        },
        emulate: true,
    },
    'iR-ADV C3520 III': {
        printers: [
            {
                url: 'http://192.168.16.31:8000',
                name: 'RON-H32P-CKOP',
            },
        ],
        elements: {
            black: 'tr:nth-child(5) > td',

            magenta: '#tonerInfomationModule tr:nth-child(3) > td',

            cyan: '#tonerInfomationModule tr:nth-child(2) > td',

            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
        },
        emulate: true,
    },
    'iR-ADV C355': {
        printers: [
            {
                url: 'http://192.168.16.25:8000',
                name: 'VAL-LR213',
            },
        ],
        elements: {
            black: 'tr:nth-child(5) > td',

            magenta: '#tonerInfomationModule tr:nth-child(3) > td',

            cyan: '#tonerInfomationModule tr:nth-child(2) > td',

            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
        },
        emulate: true,
    },
    'iR-ADV C356': {
        printers: [
            {
                url: 'http://192.168.16.23:8000',
                name: 'RON-D307-CLAS',
            },
        ],
        elements: {
            black: 'tr:nth-child(5) > td',

            magenta: '#tonerInfomationModule tr:nth-child(3) > td',

            cyan: '#tonerInfomationModule tr:nth-child(2) > td',

            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
        },
        emulate: true,
    },
    'iR-ADV C5235': {
        printers: [
            {
                name: 'RON-PERS-CKOP',
                url: 'http://192.168.16.34:8000',
            },
        ],
        elements: {
            cyan: '#tonerInfomationModule tr:nth-child(2) > td',
            magenta: '#tonerInfomationModule tr:nth-child(3) > td',
            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
            black: '#tonerInfomationModule tr:nth-child(5) > td',
        },
        emulate: true,
        preparePage: async (page) => {
            const inputSelector = 'tr:nth-child(2) > th input';

            await page.waitForSelector(inputSelector);
            await page.evaluate(
                // eslint-disable-next-line no-undef
                (selector) => document.querySelector(selector).click(),
                inputSelector
            );
            await page.click('.ButtonEnable');
        },
        prepareColor: (input) => {
            if (input.toLowerCase().includes('ok')) return '100';

            return '0';
        },
    },
    'iR-ADV C5550': {
        printers: [
            {
                url: 'http://192.168.16.37:8000',
                name: 'RON-C205-CKOP',
            },
        ],
        elements: {
            black: 'tr:nth-child(5) > td',

            magenta: '#tonerInfomationModule tr:nth-child(3) > td',

            cyan: '#tonerInfomationModule tr:nth-child(2) > td',

            yellow: '#tonerInfomationModule tr:nth-child(4) > td',
        },
        emulate: true,
    },
    // #endregion

    // #region i-SENSYS / LBP printers
    LBP7780C: {
        printers: [
            {
                url: 'http://192.168.16.14:8000',
                name: 'RON-RES-CLAS',
            },
            {
                url: 'http://192.168.16.15:8000',
                name: 'RON-B215B',
            },
        ],
        elements: {
            cyan: 'tr:nth-child(1) .RemainIcon',

            magenta: 'tr:nth-child(2) .RemainIcon',

            yellow: 'tr:nth-child(3) .RemainIcon',

            black: 'tr:nth-child(4) .RemainIcon',
        },
        emulate: true,
        prepareColor: (input) => {
            return input.match(/\d+/g).at(-1);
        },
        preparePage: async (page) => {
            await page.click('.ButtonEnable').catch(() => {});
            console.log('Clicked');
            await page.waitForSelector('tr:nth-child(1) .RemainIcon');
            console.log('Page loaded');
        },
    },
    LBP6680: {
        printers: [
            {
                url: 'http://192.168.16.20:8000',
                name: 'LBP6680',
            },
            {
                url: 'http://192.168.16.45:8000',
                name: 'RON-B324-LAS',
            },
        ],
        elements: {
            black: '.RemainIcon',
        },
        emulate: true,
        prepareColor: (input) => {
            return input.match(/\d+/g).at(-1);
        },
        preparePage: async (page) => {
            await page.click('.ButtonEnable').catch(() => {});
            console.log('Clicked');
            await page.waitForSelector('.RemainIcon');
            console.log('Page loaded');
        },
    },
    LBP710Cx: {
        printers: [
            {
                url: 'http://192.168.16.21:8000',
                name: 'RON-FRISOR-CLAS',
            },
        ],
        elements: {
            cyan: 'tr:nth-child(1) .RemainIcon',

            magenta: 'tr:nth-child(2) .RemainIcon',

            yellow: 'tr:nth-child(3) .RemainIcon',

            black: 'tr:nth-child(4) .RemainIcon',
        },
        emulate: true,
        prepareColor: (input) => {
            return input.match(/\d+/g).at(-1);
        },
        preparePage: async (page) => {
            await page.click('.ButtonEnable').catch(() => {});
            console.log('Clicked');
            await page.waitForSelector('.RemainIcon');
            console.log('Page loaded');
        },
    },
    LBP214: {
        printers: [
            {
                url: 'http://192.168.16.22',
                name: 'RON-B315-LAS',
            },
            {
                url: 'http://192.168.16.43',
                name: 'RON-D107-LAS',
            },
            {
                url: 'http://192.168.16.51',
                name: 'RON-E162-LAS',
            },
        ],
        elements: {
            black: '.ItemListComponent td:nth-child(3)',
        },
        emulate: true,
        preparePage: async (page) => {
            await page.click('#submitButton').catch(() => {});
        },
    },
    // #endregion
};

// export const printers: PrinterInfoType[] = [
//     {
//         name: 'VAL-BFLAR-LAS',
//         type: 'HP LaserJet P2055dn',
//         url: 'http://192.168.16.76/hp/device/supply_status.htm',
//         emulate: false,
//         elements: [
//             {
//                 color: 'black',
//                 colorSelector: '.width10',
//                 partSelector: '.width80',
//             },
//         ],
//         preparePart: (input) => {
//             const part = input.split(' ').at(-1);

//             console.log(
//                 part,
//                 part.split(' ').at(-1),
//                 'HP-artikel:  CE505X'.split(' ').at(-1)
//             );

//             return part.split(' ').at(-1);
//         },
//     },
//     // {
//     //     name: 'VAL-EE-PERS',
//     //     type: 'iR-ADV C3520',
//     //     url: 'http://192.168.16.10:8000',
//     //     emulate: true,
//     //     elements: [
//     //         {
//     //             color: 'black',
//     //             colorSelector: 'div#tonerInfomationModule tr:nth-child(5) td',
//     //         },
//     //         {
//     //             color: 'yellow',
//     //             colorSelector: 'div#tonerInfomationModule tr:nth-child(4) td',
//     //         },
//     //         {
//     //             color: 'magenta',
//     //             colorSelector: 'div#tonerInfomationModule tr:nth-child(3) td',
//     //         },
//     //         {
//     //             color: 'cyan',
//     //             colorSelector: 'div#tonerInfomationModule tr:nth-child(2) td',
//     //         },
//     //     ],
//     // },
//     {
//         name: 'RON-E153A-CLAS',
//         type: 'HP Color LaserJet M452dn',
//         url: 'http://192.168.16.13/info_suppliesStatus.html',
//         emulate: true,
//         elements: [
//             {
//                 color: 'black',
//                 colorSelector:
//                     'tr:nth-child(1) > td:nth-child(1) > .mainContentArea:nth-child(1) .SupplyName:nth-child(3)',
//             },
//             {
//                 color: 'yellow',
//                 colorSelector: 'tr:nth-child(3) .SupplyName:nth-child(3)',
//             },
//             {
//                 color: 'magenta',
//                 colorSelector: 'tr:nth-child(5) .SupplyName:nth-child(3)',
//             },
//             {
//                 color: 'cyan',
//                 colorSelector: 'tr:nth-child(7) .SupplyName:nth-child(3)',
//             },
//         ],
//         prepareColor: (input) => {
//             return input.match(/\d/g).join('') + '%';
//         },
//     },
// ];
