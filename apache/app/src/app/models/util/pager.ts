
export class Pager {
    docs: any;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: any;
    page: number;
    pagingCounter: number;
    prevPage: any;
    totalDocs: number;
    totalPages: number;
    constructor () {
        this.docs = Array<any>();
        this.hasNextPage = false;
        this.hasPrevPage = false;
        this.limit = 10;
        this.page = 1;
        this.pagingCounter = 1;
        this.totalDocs = 6;
        this.totalPages = 1;
    }
}