define(function () {
	return class SPViewElement extends HTMLElement {
        constructor() {
            super();
            this.scrollX = 0;
            this.scrollY = 0;
        }
        acceptsUri(uri) {
            return false;
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
        attributeChangedCallback(attrName, oldValue, newVal) {
            if (attrName === 'uri') {
                this.syncHooks(newVal);
            }
        }
    }
})