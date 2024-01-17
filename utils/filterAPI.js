
class FilterAPI {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    select() {
        if (this.queryString.select) {
            let selectFields;
            if (this.queryString.select.includes(',')) {
                selectFields = this.queryString.select.split(',');
                this.query = this.query.select(selectFields);
            } else {
                selectFields = this.queryString.select;
                this.query = this.query.select(selectFields)
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
                this.query = this.query.sort([sortBy, orderBy]);
            } else {
                this.query = this.query.sort(sortBy);
            }
        }
        return this;
    }
}

module.exports = FilterAPI