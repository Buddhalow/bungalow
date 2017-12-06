define(function () {
    return class SPTabElement extends HTMLElement {
        createdCallback() {
            this.addEventListener('mousedown', this.onClick);
        }

        onClick(event) {
            let elm = event.target;
            if (!(elm instanceof SPTabElement)) {
                elm = elm.getParentElementByTagName('SP-TAB');
            }
            let tabId = elm.getAttribute('data-tab-id');
            let evt = new CustomEvent('tabselected');
            evt.data = tabId;
            this.dispatchEvent(evt);
        }

        disconnectedCallback() {
            this.removeEventListener('click', this.onClick);
        }
    }
})