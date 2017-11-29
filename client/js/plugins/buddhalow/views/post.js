define(['controls/view'], function (SPViewElement) {
  
   return class SPPostViewElement extends SPViewElement {
       createdCallback() {
           
           this.classList.add('sp-view');
           this.innerHTML = '<div class="container feed" style="padding-left: 15%; padding-right: 15%"><sp-post></sp-post></div>';
           
           this.attributeChangedCallback('uri', null, 'bungalow:');
       }
       attributeChangedCallback(attrName, oldVal, newVal) {
           if (attrName === 'uri') {
               let slug = newVal.split(':')[2];
               let user = Parse.User.current();
               let Post = Parse.Object.extend('Post');
               let Profile = Parse.Object.extend('Profile');
               new Parse.Query(Post)//.equalTo("user", user)
                .equalTo('objectId', slug)
                .include('user').include('profile')
               .first({
                    success: (object) => {
                        let postElm = document.querySelector('sp-post');
                        postElm.setState({object: object.simplify()});
                     
                    },
                    error: (error) => {
                        alert("Error: " + error.code + " " + error.message);
                    }
               })
        
            
                
               
           }
       }
   } 
});