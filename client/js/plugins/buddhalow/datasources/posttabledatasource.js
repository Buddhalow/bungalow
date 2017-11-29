define(['controls/tabledatasource', 'plugins/parse/datasources/parsetabledatasource'], function (SPTableDataSource, ParseTableDataSource) {
    return class SPPostTableDataSource extends SPTableDataSource {
        constructor(uri) {
            super();
          this.uri = uri;
          this.rows = [];
          this.p = 0;
        }
        reset() {
            this.p = 0;
            this.rows = [];
        }
        get numberOfRows () {
            return this.rows.length;
        }
        get numberOfColumnHeaders () {
            return 1;
        }
        async push(data) {
            let Post = Parse.Object.extend('Post');
            let Profile = Parse.Object.extend('Profile');
            let post = new Post();
            post.set('description', data.description);
            post.set('time', new Date());
            
            let profile = null;
            let pq = new Parse.Query(Profile)//.equalTo('user', Parse.User.current());
            if (data.profileId != null) {
                pq = pq.equalTo('objectId', data.profileId);
               
            }
            profile = await pq.first();
            if (profile == null) {
                throw ('Profile could not be found');
            }
            post.set('profile', profile);
            
            
            let result = await post.save();
            this.reset();
            this.fetchNext();
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
               q = new Parse.Query.or(profile1, profile2);
                
               
           }
           
           if (q != null) {
               q = q.descending('time')
               let results = await q.find();
               let selectDataSource = new ParseTableDataSource('Profile');
             
               this.rows.push({
                   profile: {
                       name: 'You',
                       id: '@',
                       uri: 'bungalow:profile:@'
                   },
                   selectDataSource: selectDataSource,
                   editable: true,
                   description: '',
                   uri: 'bungalow:post:add'
               });
                results.map((o) => this.rows.push(o.simplify()));
                this.onchange();
           }
        }
    }
})

                