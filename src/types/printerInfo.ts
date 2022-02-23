// export type PrinterInfoType = {
//     name: string;
//     type: string;
//     url: string;
//     emulate: boolean;
//     elements: FieldSelectorType[];
//     prepareColor?: (input: string) => string;
//     preparePart?: (input: string) => string;
// };

import { ElementHandle, Page } from 'puppeteer';

type PrinterBasicType = {
    elements: {
        [K in PrinterColorType]?: string;
    };
    prepareColor?: (input: string) => string;
    // preparePart?: (input: string) => string;
    preparePage?: (page: Page) => Promise<void>;
    colorInterpreter?: (element: ElementHandle) => Promise<string>;
};

export type PrinterType = PrinterBasicType & {
    printers: IndividualPrinterType[];
    emulate: boolean;
};

export type PrinterDataType = PrinterBasicType & {
    name: string;
    url: string;
};

export type IndividualPrinterType = {
    url: string;
    name: string;
};

export type PrinterListType = {
    [key: string]: PrinterType;
};

export type PrinterColorType = 'black' | 'cyan' | 'magenta' | 'yellow';

export type FieldSelectorType = {
    colorSelector: string;
    partSelector?: string;
};

export type InkStatusType =
    | {
          [key in PrinterColorType]?: number;
      }
    | undefined;

export type PrinterStatusType = {
    [key: string]: {
        type: string;
        colors: InkStatusType;
    };
};
