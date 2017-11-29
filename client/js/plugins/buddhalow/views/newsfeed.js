define(['controls/view'], function (SPViewElement) {
  
   return class SPNewsFeedViewElement extends SPViewElement {
       createdCallback() {
           
           this.classList.add('sp-view');
           this.innerHTML = '<div class="feed" style=""></div>';
           this.attributeChangedCallback('uri', null, 'bungalow:newsfeed');
       }
       attributeChangedCallback(attrName, oldVal, newVal) {
           if (attrName === 'uri') {
               let user = Parse.User.current();
               let Post = Parse.Object.extend('Post');
               new Parse.Query(Post)//.equalTo("user", user)
                .include('user').include('profile').descending('time')
               .find({
                    success: (objects) => {
                        for (let object of objects) {
                            try {
                                let entry = document.createElement('div');
                                entry.classList.add('post-entry');
                                let postElm = document.createElement('sp-post');
                                postElm.classList.add('container');
                                postElm.setState({object: object.simplify()});
                                entry.appendChild(postElm);
                                this.querySelector('.feed').appendChild(entry);
                          
                                let br = document.createElement('br');
                                this.querySelector('.feed').appendChild(br);
                            } catch (e) {
                                debugger;
                            }
                        }
                    },
                    error: (error) => {
                        alert("Error: " + error.code + " " + error.message);
                    }
               })
           }
       }
   } 
});