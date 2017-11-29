define(['controls/tabledatasource'], function (SPTableDataSource) {
    return class SPPostTableDataSource extends SPTableDataSource {
        constructor(uri) {
            super();
          this.uri = uri;
          this.rows = [];
          this.p = 0;
        }
        get numberOfRows () {
            return this.rows.length;
        }
        get numberOfColumnHeaders () {
            return 1;
        }
        getRowAt(rowId, row) {
            return this.rows[rowId];
        }
        getColumnAt(pos) {
            return 'name';
        }
        getNumberOfChildren(row) {
            return 0;
        }
        /**
         * Returns wheter rows can be reordered or not
         * */
        get canReorderRows() {
            return false;
        }
        /**
         * Returns whether rows can be added or not
         * */
        get canAddRows() {
            return false;
        }
        /**
         * Returns whether rows can be deleted
         * */
        get canDeleteRows() {
            return false;
        }
        /**
         * Returns whether rows can be reordered or not
         * */
        get canEditRow() {
            return false;
        }
        /**
         * Occurs when rows are reordered
         * */
        reorderRows(indexes, newPos) {
            
        }
        
        getChildRowAt(parentRowId, rowId) {
            return null;
        }
        /**
         * Fetch next rows
         **/
        async fetchNext() {
            let Profile = Parse.Object.extend('Profile');
            let Post = Parse.Object.extend('Post');
            // TODO Implement fetch next
            let uri =  this.uri;
            let user = Parse.User.current();
            let q = new Parse.Query(Post);
            q = q.include('profile').include('user');
            if (/^bungalow:post$/g.test(uri)) {
            }
           if (/^bungalow:profile:([a-zA-Z0-9]+):post$/g.test(uri)) {
                let slug = uri.split(':')[2];
               
               let profile1 = new Parse.Query(Profile).equalTo('slug', slug);
               let profile2 = new Parse.Query(Profile).equalTo('id', slug);
               let profile = await new Parse.Query.or(profile1, profile2);
               q = new Parse.Query(Post).descending('time');
               
           }
           
           if (q != null) {
               q = q.descending('time')
               let results = await q.find();
                results.map((o) => this.rows.push(o.simplify()));
                this.onchange();
           }
        }
    }
})

                