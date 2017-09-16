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
            this.startHook.setAttribute('data-hook-id', 'start_view');
            this.appendChild(this.startHook);            
        }
    }
    return SPStartViewElement;
});