define(['controls/tabbar', 'models/uri'], function (SPTabBarElement, Uri) {


    /**
     * Viewstack element
     * The viewstack organises the view of elements
     **/
    return class SPViewStackElement extends HTMLElement {
        
        async registerPlugin(appId) {
            
            require(['plugins/' + appId + '/' + appId], function (plugin) {
                plugin();
            });
        }
        registerView(regExp, viewClass) {
            this.views.push({
                regExp: regExp,
                view: viewClass
            });
        }
        createdCallback() {
            this.views = {};
            this.registeredViews = [];
            this.history = [];
            this.future = [];
        }    
        attachedCallback() {
            this.views = {};
            if (this.parentNode && this.parentNode.tagName == 'SP-MAIN') {
                let path = window.location.pathname.substr(1);
                var qs ={};
                if (window.location.href.split('?').length > 1) {
                    qs = window.location.href.split('?')[1].split('#')[0].toQuerystring();
                }
                if (!('service' in qs)) {
                    qs['service'] = 'bungalow';
                }
                let uri = qs.service + ':' + path.split('/').join(':') + '?' + serializeObject(qs);
                this.navigate(uri, true);
            
                window.addEventListener('popstate', (event) => {
                    let path = window.location.pathname.substr(1);
                    var qs = {};
                    if (window.location.href.split('?').length > 1) {
                        qs = window.location.href.split('?')[1].split('#')[0].toQuerystring();
                        
                    }
                    if (!('service' in qs)) {
                        qs['service'] = 'bungalow';
                    }
                    let uri = qs.service + ':' + path.split('/').join(':') + '?' + serializeObject(qs);
            

                    this.navigate(uri, true);
                
                });
            }
            
        }
        
        isLinkValid(uri) {
            return this.registeredViews.filter((v) => v.regex.test(uri.replace('spotify:', 'bungalow:'))).length > 0;
        }
        
        /**
         * Navigates the view stack
         * @param {String} uri The URI to navigate to
         * @returns void
         **/
        navigate(url, dontPush=false) {
            if (this.uri === url) return;
            let uri = new Uri(url); 
            let evt = new CustomEvent('beforenavigate');
            this.dispatchEvent(evt);
             
        
            let menuItems = document.querySelectorAll('sp-menuitem');
            if (this === GlobalViewStack)
            for (let item of menuItems) {
                item.classList.remove('active');
                
                //if (uri.indexOf(item.getAttribute('uri')) == 0) {
                if (uri == item.getAttribute('uri')) {
                    item.classList.add('active');
                }
                
            }   
            
            
            let newUri = uri.toUri().trimRight(':');
            
            if (window.GlobalViewStack.currentView != null && newUri === window.GlobalViewStack.currentView.getAttribute('uri') && window.GlobalViewStack === this)
                return;
            let view = null;
            console.log(newUri);
            
            console.log(window.GlobalViewStack.registeredViews);
            let externalViews = window.GlobalViewStack.registeredViews.filter((v) => {
                
                console.log(v.regex);
                console.log(newUri);
                let result = v.regex.test(newUri);
                console.log(result);
                return result;
            });
            console.log(externalViews);
            if (newUri === 'bungalow:playlist:add') {
                var name = prompt('Enter name of playlist');
                if (name) {
                    $.ajax({
                        method: 'POST',
                        url: '/api/spotify/playlist',
                        body: JSON.parse({
                            name: name
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (result) {
                        alert("Playlist created");
                    }, function (error) {
                        alert(error);
                    })
                }
            }
            if (externalViews.length < 1) debugger;
            if (/^bungalow:app:(.*)$/.test(newUri)) {
                view = document.querySelector('sp-appviewstackview');
                if (!view) {
                    view = document.createElement('sp-appviewstackview');
                    this.appendChild(view);
                }
            } else if (newUri in this.views) {
                
                view = this.views[newUri];
                
            } else if (externalViews.length > 0) {
                view = document.createElement(externalViews[0].tag);
                this.addView(newUri, view);
            } else {
                alert("The link could not be found");
                
            }
            if (!view) {
                return;
            }
            
            this.setView(view);
        
            view.setAttribute('uri', newUri);
            let path = uri.pathname + '?' + uri.querystring;
            
            this.uri = uri;
            
            if (!dontPush) {
                history.pushState({
                    uri: newUri,
                    query: uri.query,
                    position: window.navPosition,
                    count: window.navPosition
                }, uri, uri.pathname + '?' + uri.querystring);
            } else {
                
            }
                
            
        }
        
        postToUri(uri, data) {
            uri = 'bungalow:' + uri.split(':').slice(1).join(':');
            let view = null;
            let externalViews = window.GlobalViewStack.registeredViews.filter((v) => {
                
                console.log(v.regex);
                console.log(uri);
                let result = v.regex.test(uri);
                console.log(result);
                return result;
            });
            if (uri in this.views) {
                
                view = this.views[uri];
                
            } else if (externalViews.length > 0) {
                view = document.createElement(externalViews[0].tag);
                this.views[uri] = view;
            }
            if (view != null) {
                view.insertUri(uri, data);
            }
        }
        
        addView(uri, view) {
            
            this.views[uri] = view;
            this.setView(view);
        }
        setView(view) {
            if (this.firstChild != null && this.firstChild != view) {
                this.removeChild(this.firstChild);
            }
            this.appendChild(view);
            if (this === window.GlobalViewStack)
            window.GlobalViewStack.currentView = view;
            
            if (view.activate instanceof Function) {
                view.activate();
                onHashChanged();
            }
        }
    }
})