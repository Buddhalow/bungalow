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
                this.header.vibrant();
            }
        }
        
        _onScroll(e) {
            let view = e.target;
            view.scrollY = view.scrollTop;
        }
        createdCallback() {
            this.classList.add('sp-view');
        }
        navigate(uri) {
            
            
        }
        createdCallback() {
            this.addEventListener('scroll', this._onScroll);
        }
        disconnectedCallback() {
            this.removeEventListener('scroll', this._onScroll);
        }
        attributeChangedCallback(attr, oldValue, newVal) {
            
        }
    }
})