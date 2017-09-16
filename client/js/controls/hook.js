define([], function () {
    /**
     * An hook element is a placeholder that allows other
     * plugins to hook into these and place custom components into other components
     **/
    return class SPHookElement extends HTMLElement {
        attachedCallback() {
            window.addEventListener('hook', (e) => {
                this.render();  
            });
            this.render();
            let e = new CustomEvent('hook_' + this.id);
            document.dispatchEvent(e);
        }
        get chrome() {
            return document.querySelector('sp-chrome');
        }
        set id(value) {
            this.setAttribute('data-hook-id', value);
        }
        get id() {
            return this.getAttribute('data-hook-id');
        }
        render() {
        }
    }
})