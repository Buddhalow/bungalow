define(
    [
        'controls/view',
        'plugins/buddhalow/datasources/posttabledatasource'
    ], function (
        SPViewElement,
        SPPostTableDataSource
    ) {
  
   return class SPProfileViewElement extends SPViewElement {
       createdCallback() {
            this.classList.add('sp-view');
            this.header = document.createElement('sp-header');
            this.divider = document.createElement('sp-divider');
            this.appendChild(this.header);
            this.appendChild(this.divider);
            this.divider.innerHTML = _e('Public posts');
            this.list = document.createElement('sp-list');
            this.list.type = 'sp-post';
            this.list.dataSource = new SPPostTableDataSource();
            this.appendChild(this.list);
       }
       async attributeChangedCallback(attrName, oldVal, newVal) {
           if (attrName === 'uri') {
               let slug = newVal.split(':')[2];
               let Profile = Parse.Object.extend('Profile');
               let profile = await new Parse.Query(Profile).equalTo('slug', slug).first();
               if (profile != null) {
                    profile = profile.simplify();    
                  
                   this.list.setAttribute('uri', newVal + ':post');
                   
                   let childProfiles = await new Parse.Query(Profile).equalTo('parent', profile.objectId).find();
                   
                   childProfiles = childProfiles.map((o) => o.simplify());
                   profile.children = childProfiles;
                   this.header.setState(profile);
               }
           }
       }
   } 
});