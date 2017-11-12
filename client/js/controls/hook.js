define([], function () {
    /**
     * An hook element is a placeholder that allows other
     * plugins to hook into these and place custom components into other components
     **/
    return class SPHookElement extends HTMLElement {
      
        get chrome() {
            return document.querySelector('sp-chrome');
        }
        set id(value) {
            this.setAttribute('data-hook-id', value);
        }
        get id() {
            return this.getAttribute('data-hook-id');
        }
        setState(state) {
            this.innerHTML = '';
            let e = new CustomEvent('hook_' + this.getAttribute('data-hook-id'));
            e.data = state;
            document.dispatchEvent(e);
        }
        attachedCallback() {
            this.innerHTML = '';
            let e = new CustomEvent('hook_' + this.getAttribute('data-hook-id'));
            document.dispatchEvent(e);
        }
        render() {
        }
    }
})