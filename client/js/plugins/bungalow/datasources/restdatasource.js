define(['controls/datasource'], function (SPDataSource) {
    return class SPRestDataSource extends SPDataSource {
        constructor(resource, fields) {
            super();
            this.resource = resource;
        }
        get endpoint() {
            return this.table.getAttribute('uri');
        }
        async getObjectById(id) {
            return await this.resource.getById(id);
        }
        
        fetchNext() {
            
        }
        
        get model() {
            return this._model;
        }
        set model(value) {
            this._model = value;
        }
        get numberOfFields() {
            return Object.keys(this.fields).length;
        }
        getFieldByIndex(index) {
            return Object.values(this.fields)[index];
        }
        async del(id) {
            return await this.resource.del(id);
        }
        async find(q) {
           return await this.resource.find(q);
        }
        async saveOrUpdate(data) {
            return await this.resource.saveOrUpdate(data);
        }
        
    }
})