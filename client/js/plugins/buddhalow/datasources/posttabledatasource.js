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
            let Attachment = Parse.Object.extend('Attachment');
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
            
            if ('attachment' in data && data.attachment != null) {
                let attachment = await new Parse.Query(Attachment).equalTo('uri', data.attachment.uri).first();
                if (!attachment) {
                    attachment = new Attachment();
                    attachment.set('uri', data.attachment.uri);
                }
                attachment.set('name', data.attachment.name);
                attachment.set('image_url', data.attachment.image_url);
                attachment.set('type', data.attachment.type);
                attachment.set('description', data.attachment.description);
                await attachment.save();
                post.set('attachment', attachment);
            }
            
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
            var q = new Parse.Query(Post);
            if (/^bungalow:post$/g.test(uri)) {
            }
            if (/^bungalow:hashtag:([a-zA-Z0-8]+):post$/g.test(uri)) {
                let hashtag = uri.split(':')[2];
                q = q.contains('description', '#' + hashtag);
            }
            if (/^bungalow:profile:([a-zA-Z0-9]+):post$/g.test(uri)) {
                let slug = uri.split(':')[2];
             /*  
               let profile1 = new Parse.Query(Profile).equalTo('slug', slug);
               let profile2 = new Parse.Query(Profile).equalTo('id', slug);
               q = Parse.Query.and(q, new Parse.Query.or(profile1, profile2));
               */
               let profile = await new Parse.Query(Profile).equalTo('slug', slug).first();
               if (!profile) {
                   throw "Profile not found";
               }
               q = q.equalTo('profile', profile);  
               
           }
            q = q.include('profile').include('user').include('attachment');
           
           if (q != null) {
               q = q.descending('time')
               let results = await q.find();
               let selectDataSource = new ParseTableDataSource('Profile');
                if (this.table.getAttribute('interact') == 'true')
                if (this.p == 0)
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
                this.p++;    
           }
        }
    }
})

                