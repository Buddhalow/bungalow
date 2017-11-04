define(['controls/tabbar'], function (SPTabBarElement) {


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
                let uri = 'bungalow:' + path.split('/').join(':');
                this.navigate(uri, true);
            
                window.addEventListener('popstate', (event) => {
                    let path = window.location.pathname.substr(1);
                    let uri = 'bungalow:' + path.split('/').join(':');
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
        navigate(uri, dontPush=false) {
            if (this.uri === uri) return;
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
            
            
            if (uri.indexOf('spotify:') === 0) {
                uri = 'bungalow:' + uri.substr('spotify:'.length);
            }
            let newUri = uri;
            if (uri === 'bungalow:login') {
                store.login().then(() => {});
                return;
            }
            
            if (newUri === 'bungalow:') {
                newUri == 'bungalow:internal:start';
            }
                
           
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
            let url = uri.substr('bungalow:'.length).split(':').join('/');
            
            this.uri = uri;
            
            if (!dontPush) {
                history.pushState({
                    uri: uri,
                    position: window.navPosition,
                    count: window.navPosition
                }, uri, '/' + url);
            } else {
                
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