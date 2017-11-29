define(['controls/view'], function (SPViewElement) {
    class SPStartViewElement extends SPViewElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        navigate() {

        }
        createdCallback() {
            this.classList.add('sp-view');
            this.startHook = document.createElement('sp-hook');
            this.startHook.setAttribute('data-hook-id', 'startview');
            this.startHookBottom = document.createElement('sp-hook');
            this.startHookBottom.setAttribute('data-hook-id', 'startviewbottom');
            this.appendChild(this.startHook);            
            this.appendChild(this.startHookBottom);            
        }
    }
    return SPStartViewElement;
});