define([], function () {
    return class SPEmbeddedResource extends HTMLElement {
        createdCallback() {
            
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName == 'uri') {
                if (/spotify:album:(.*)/g.test(newVal)) {
                    this.innerHTML = '<sp-playlist uri="' + newVal + '"></sp-playlist>';
                }
                if (/spotify:user:(.*):playlist:(.*)/g.test(newVal)) {
                    this.innerHTML = '<sp-playlist uri="' + newVal + '"></sp-playlist>';
                }
                if (/spotify:track:(.*)/g.test(newVal)) {
                    this.innerHTML = '<sp-track uri="' + newVal + '"></sp-track>';
                }
            }
        }
    };
});