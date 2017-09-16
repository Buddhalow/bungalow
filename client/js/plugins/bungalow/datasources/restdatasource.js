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
            return await new Promise((resolve, reject) => {
                fetch(this.endpoint + '/' + id).then(r => r.json()).then((result) => {
                    resolve(result);
                }, (err) => {
                    fail(err);
                });
            });
        }
        async del(id) {
            return await new Promise((resolve, reject) => {
                   fetch(
                        this.endpoint + '/' + id,
                        {
                            method: 'DELETE'
                        }
                    ).then(r => r.json()).then((result) => {
                        resolve(result);
                    }, (err) => {
                        fail(err);
                    });
            });
        }
        async find(q) {
           return await new Promise((resolve, reject) => {
                fetch(this.endpoint + '?q=' + q).then(r => r.json()).then((result) => {
                    resolve(result);
                }, (err) => {
                    fail(err);
                });
            });
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
        async saveOrUpdate(data) {
            return new Promise((resolve, fail) => {
                if (!!data.id) {
                    fetch(
                        this.endpoint + '/' + data.id,
                        {
                            method: 'PUT'
                        }
                    ).then(r => r.json()).then((result) => {
                        resolve(result);
                    }, (err) => {
                        fail(err);
                    });
                    return;
                } else {
                    fetch(
                        this.endpoint + '/' + data.id,
                        {
                            method: 'PUT',
                            body: JSON.stringify(data)
                        }
                    ).then(r => r.json()).then((result) => {
                        resolve(result);
                    }, (err) => {
                        fail(err);
                    });
                }
            });
        }
        
    }
})