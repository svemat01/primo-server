export type PrinterInfoType = {
    name: string;
    type: string;
    url: string;
    emulate: boolean;
    elements: FieldSelectorType[];
    prepareColor?: (input: string) => string;
    preparePart?: (input: string) => string;
};

export type PrinterColorType = 'black' | 'cyan' | 'magenta' | 'yellow';

export type FieldSelectorType = {
    color: PrinterColorType;
    colorSelector: string;
    partSelector?: string;
};

export type InkStatusType = {
    [key in PrinterColorType]?: {
        level: string;
        part?: string;
    };
};
