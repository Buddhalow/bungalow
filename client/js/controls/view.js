define(function () {
	return class SPViewElement extends HTMLElement {
        constructor() {
            super();
            this.scrollX = 0;
            this.scrollY = 0;
            
        }
        createdCallback() {
            this.extraTabs = [];
        }
        acceptsUri(uri) {
            return false;
        }
        get uri() {
            return this.getAttribute('uri');
        }
        set uri(value) {
            this.setAttribute('uri', value);
        }
        activate() {
            GlobalTabBar.setState({
                objects: [{
                    id: 'overview',
                    name: _e('Overview')
                }]
            })
            this.scrollTop = (this.scrollY);
            if (this.header) {
                if (this.header.vibrant instanceof Function)
                this.header.vibrant();
            }
        }
        
        _onScroll(e) {
            let view = e.target;
            view.scrollY = view.scrollTop;
        }
        createdCallback() {
            this.classList.add('sp-view');
            debugger;
        }
        navigate(uri) {
            
            
        }
        createdCallback() {
            this.addEventListener('scroll', this._onScroll);
        }
        disconnectedCallback() {
            this.removeEventListener('scroll', this._onScroll);
        }
        syncHooks(uri) {
            let hooks = this.querySelectorAll('sp-hook');
            for (let hook of hooks) {
                hook.setAttribute('uri', uri);
            }
        }
        afterLoad(uri) {
            var event = new CustomEvent('viewload', {detail: this});
            document.dispatchEvent(event);
        }
        addTab(tabId, name) {
            if (!this.extraTabs) {
                this.extraTabs = [];
            }
            this.extraTabs.push({
                id: tabId,
                name: name
            }); 
            let tab = document.createElement('sp-tabcontent');
            tab.setAttribute('data-tab-id', tabId);
            tab.setAttribute('data-label', name);
            tab.style.display = 'none';
            this.appendChild(tab);
            return tab;
        }
        attributeChangedCallback(attrName, oldValue, newVal) {
            if (attrName === 'uri') {
                this.syncHooks(newVal);
            }
        }
    }
})