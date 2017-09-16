define(['controls/tabledatasource'], function (SPTableDataSource) {
    return class SPRestTableDataSource extends SPTableDataSource {
        constructor(resource, fields) {
            super();
            this.fields = ['id', 'name', 'login'];
            this.limit = 28;
            this.offset = 0;
            this.resource = resource;
            this.objects = [];
        }
        getNumberOfChildren(row) {
            return 0;
        }
        getNumberOfRows(row) {
            if (!row) {
                return this.objects.length;
            }
        }
        getRowAt(index, row) {
            if (!row)
                return this.objects[index];
            return null;
        }
        getColumnAt(index) {
            return this.fields[index];
        }
        get numberOfColumnHeaders () {
            return this.fields.length;
        }
        async fetchNext() {
            let result = await fetch(this.resource + '?offset=' + this.page + '&limit=' + this.limit, {
                credentials: 'same-origin'
            }).then(r => r.json());
            for (let obj of result.objects) {
                this.objects.push(obj);
            }
            this.offset+=this.limit;
            this.onchange();
        }
        
        async find(q) {
           return await new Promise((resolve, reject) => {
                fetch(this.resource + '?q=' + q).then(r => r.json()).then((result) => {
                    resolve(result);
                }, (err) => {
                    fail(err);
                });
            });
        }
        get numberOfFields() {
            return Object.keys(this.fields).length;
        }
        getFieldByIndex(index) {
            return Object.values(this.fields)[index];
        }
        
    }
})