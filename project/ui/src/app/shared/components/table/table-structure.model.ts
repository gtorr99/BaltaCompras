export class TableStructure {
    headers: { 
        label: string, 
        isSortable?: boolean,
        isSorted?: boolean
    }[];
    rows: { 
        items: {
            value: any;
            dateFormat?: string; 
            isStatus?: boolean;
        }[]
    }[];
    contextMenu: {
        label: string;
        value: any;
    }[];
}