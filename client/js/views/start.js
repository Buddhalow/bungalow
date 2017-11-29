define(['controls/view'], function (SPViewElement) {
    class SPStartViewElement extends SPViewElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        navigate() {

        }
        attachedCallback() {
            this.classList.add('container');
            this.startHook = document.createElement('sp-hook');
            this.startHookBottom.setAttribute('data-hook-id', 'start_view_bottom');
            this.appendChild(this.startHook);            
            this.appendChild(this.startHookBottom);            
        }
    }
    return SPStartViewElement;
});