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
        // eslint-disable-next-line unused-imports/no-unused-vars
        [K in PrinterColorType]?: string;
    };
    // eslint-disable-next-line unused-imports/no-unused-vars
    prepareColor?: (input: string) => string;
    // preparePart?: (input: string) => string;
    // eslint-disable-next-line unused-imports/no-unused-vars
    preparePage?: (page: Page) => Promise<void>;
    // eslint-disable-next-line unused-imports/no-unused-vars
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
          // eslint-disable-next-line unused-imports/no-unused-vars
          [key in PrinterColorType]?: number;
      }
    | undefined;

export type PrinterStatusType = {
    [key: string]: {
        type: string;
        colors?: InkStatusType;
    };
};

export type OutputType = {
    updatedAt: Date;
    data: PrinterStatusType;
};
