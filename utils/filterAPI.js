
class FilterAPI {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    select() {
        if (this.queryString.select) {
            let selectFields;
            if (this.queryString.select.includes(',')) {
                selectFields = this.queryString.select.split(',');
                this.mongooseQuery = this.mongooseQuery.select(selectFields);
            } else {
                selectFields = this.queryString.select;
                this.mongooseQuery = this.mongooseQuery.select(selectFields)
            }
        }
        return this;
    };

    sort() {
        let sortBy = '';
        let orderBy = ''
        if (this.queryString.sort || this.queryString.sortBy) {
            sortBy = this.queryString.sort || this.queryString.sortBy;
            if (this.queryString.order) {
                orderBy = this.queryString.order;
                this.mongooseQuery = this.mongooseQuery.sort([sortBy, orderBy]);
            } else {
                this.mongooseQuery = this.mongooseQuery.sort(sortBy);
            }
        }
        return this;
    };

    paginate() {
        let documentsPerPage = process.env.DOCUMENTS_PER_PAGE;
        if (this.queryString.page) {
            let pageNumber = this.queryString.page;
            this.mongooseQuery = this.mongooseQuery.skip((pageNumber - 1) * documentsPerPage)
                .limit(documentsPerPage)
        }
        return this;
    }
}

module.exports = FilterAPI