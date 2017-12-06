define(['controls/datasource'], function (SPDataSource) {
    return class SPRestDataSource extends SPDataSource {
        constructor(resource, fields) {
            super();
            this.fields = fields || ['id', 'name', 'login', 'enabled'];
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
        
        async request(method, uri, options, data) {
            var url = null;
            if (uri.indexOf('/') == 0) {
                url = uri;
            } else {
                url = '/api/' + uri.split(':').join('/');
            }
            if (url.indexOf(':track') == url.length - ':track'.length) {
               
            }
            let result = await fetch(url + '?' + serializeObject(options || {}), {
                method: method,
                credentials: 'same-origin'
            }).then(r => r.json());
            return result;
        }
        
        get numberOfFields() {
            return Object.keys(this.fields).length;
        }
        getFieldByIndex(index) {
            return Object.values(this.fields)[index];
        }
        
    }
})