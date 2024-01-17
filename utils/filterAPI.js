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
                return this.query.select(selectFields);
            } else {
                selectFields = this.queryString.select
                return this.query.select(selectFields);
            }
        } else {
            return this.query;
        }
    }
}

module.exports = FilterAPI