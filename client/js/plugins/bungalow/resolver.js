define([], function () {
    /**
     * A resolver
     * */
    return class SPResolver {
        /**
         * Returns whether the resolver
         * does accept the uri or not
         **/
        static isAcceptingUri(uri) {
            return false;
        }
        /**
         * Request
         **/
        request(method, uri, query, headers, data) {
            
        }
    }
})