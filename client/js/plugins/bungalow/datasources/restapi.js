define([], function () {
    return class RestResource {
        constructor(baseUrl, resource, accessToken) {
            this.baseUrl = baseUrl;
            this.accessToken = accessToken;
            this.resource = resource;
        }
        async _request(method, url, params=null, data=null) {
            let url = this.baseUrl + url;
            if (!!params) {
                url += '?' + $.param(params);
            }
            return await fetch(
                url,
                {
                    method: method,
                    headers: {
                        'Authorization' : 'OAuth' + this.accessToken
                    },
                    body: JSON.stringify(data)
                }
            ).then(r => r.json());
        }
        async del(id) {
            return await this._request('DELETE', '/' + this.resource + '/' + id);
        }
        async find(q) {
           return await this._request('GET',
                '/' + this.resource,
                q
            ).then(r => r.json());
        }
        async getById(id) {
            return await this._request('GET',
                '/' + this.resource + '?',
                q
            ).then(r => r.json());
        }
        async post(data) {
            if (!!data.id) {
                return await self._request(
                    'PUT',
                    '/' + this.resource + '/' + data.id,
                    null,
                    data
                ).then(r => r.json());
                return;
            } else {
                return await self._request(
                    'POST',
                    '/' + this.resource,
                    null,
                    data
                ).then(r => r.json());
            }
        
        }
    }
})