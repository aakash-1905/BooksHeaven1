class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    
    search() {
        const keyword = this.queryStr.keyword ?{
            name: { $regex: this.queryStr.keyword, $options: 'i' },
        }:{};
        // console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    pagination(resultPerPage) {
        // 2) Pagination
        const currentPage = this.queryStr.page || 1;
        const skip = (currentPage - 1) * resultPerPage;
        this.query = this.query.skip(skip).limit(resultPerPage);
        return this;
    }

}
module.exports = ApiFeatures;