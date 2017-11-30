define(function () {
    return class SPLinkElement extends HTMLAnchorElement {
        onClick(e) {
            e.preventDefault();
            GlobalViewStack.navigate(this.getAttribute('uri'));
        }
        createdCallback() {
            this.addEventListener('click', this.onClick);
            this.attributeChangedCallback('uri', null, this.getAttribute('uri'));
            this.setAttribute('draggable', true);
            this.addEventListener('dragstart', (e) => {
                    let text = e.target.getAttribute('uri');
                    if (text.indexOf('http') == 0) {
                        window.open(text);
                    }
                    event.dataTransfer.setData("Text",text);
            })
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === 'uri') {
                let viewstack = !this.getParentElementByTagName("sp-viewstack");
                try {
                    if (!!viewstack && viewstack.isLinkValid(newVal)) {
                     
                        this.classList.add('sp-invalid-link');
                    } else {
                        this.classList.remove('sp-invalid-link');
                    }
                } catch (e) {
                    
                }
            }
            
        }
        disconnectedCallback() {
            this.removeEventListener('click', this.onClick);
        }
    }
});