define(['controls/view'], function (SPViewElement) {
  
   return class SPProfileViewElement extends SPViewElement {
       createdCallback() {
           
           this.classList.add('sp-view');
           this.innerHTML = '<sp-header></sp-header><sp-divider>Public posts</sp-divider>'
           this.innerHTML += '<div class=" feed" style=""></div>';
           this.attributeChangedCallback('uri', null, 'bungalow:newsfeed');
       }
       attributeChangedCallback(attrName, oldVal, newVal) {
           if (attrName === 'uri') {
               let slug = newVal.split(':')[2];
               let user = Parse.User.current();
               let Post = Parse.Object.extend('Post');
               let Profile = Parse.Object.extend('Profile');
               new Parse.Query(Profile).equalTo('slug', slug).first({
                    success: (profile) => {
                        document.querySelector('sp-header').setState(profile.simplify());
                        new Parse.Query(Post)//.equalTo("user", user)
                        .equalTo('profile', profile).descending('time')
                        .include('user').include('profile')
                       .find({
                            success: (objects) => {
                                for (let object of objects) {
                                    let entry = document.createElement('div');
                                    entry.classList.add('post-entry');
                                    let postElm = document.createElement('sp-post');
                                    postElm.classList.add('container');
                                    postElm.setState({object: object.simplify()});
                                    entry.appendChild(postElm);
                                    this.querySelector('.feed').appendChild(entry);
                              
                                    let br = document.createElement('br');
                                    this.querySelector('.feed').appendChild(br);
                                }
                            },
                            error: (error) => {
                                alert("Error: " + error.code + " " + error.message);
                            }
                       })
                    }
                }   
                )
               
           }
       }
   } 
});