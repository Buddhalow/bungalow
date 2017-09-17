define(['controls/view'], function (SPViewElement) {
    return class SPSearchViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view')
                //this.innerHTML = "<div style='padding: 13pt'><h3>Search results for '<span id='q'>'</span>";
            this.hook = document.createElement('sp-hook');
            this.hook.setAttribute('data-hook-id', 'searchview');
            this.appendChild(this.hook);
        }
        activate() {
         
            GlobalTabBar.setState({
                objects: [
                    {
                        id: 'search',
                        name: _e('Search')
                    }    
                ]
            });
        }
        acceptsUri(uri) {
            return /^bungalow:search:(.*)$/.test(uri);
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === 'uri') {
                this.hook.setState({
                    uri: newVal,
                    q: newVal.substr('bungalow:search:'.length).split(/\:/g)[0]
                });
            }
        }
    }
});