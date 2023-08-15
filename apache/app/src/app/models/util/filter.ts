
export class Filter {
    filter: string;
    fields: string;
    page: number;
    limit: number;
    sort: string;
    order: number;
    constructor () {
        this.filter = "";
        this.page = 1;
        this.limit = 10;
        this.order = -1;
    }
}