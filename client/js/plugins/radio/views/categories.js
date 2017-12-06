define(['controls/view'], function (SPViewElement) {
    return class SPCategorietViewElement extends SPViewElement {
        createdCallback() {
            this.tabContent = document.createElement('sp-tabcontent');
            this.tabContent.setAttribute('data-tab-id', 'overview');
            this.tabContent.setAttribute('data-label', 'Categories');
            this.appendChild(this.tabContent);
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === 'uri') {
                    ar
            }
        }
    }
});