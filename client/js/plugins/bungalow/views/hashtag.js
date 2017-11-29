define(['controls/view'], function (SPViewElement) {
    class SPHashtagViewElement extends SPViewElement {
        
        acceptsUri(uri) {
            return /^bungalow:hashtag:([a-zA-Z0-9]+)$/.test(uri);
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            super.attributeChangedCallback(attrName, oldVal, newVal);
            if (attrName === 'uri') {
                let hashtag = newVal.split(':')[2];
                this.header.setState({
                    type: 'hashtag',
                    name: '#' + hashtag,
                    id: 'hashtag',
                    uri: 'bungalow:hashtag:' + hashtag,
                    images: [{
                        url: ''
                    }]
                })
            }
        }
        createdCallback() {
            this.classList.add('sp-view');
            this.header = document.createElement('sp-header');
            this.appendChild(this.header);
            this.hook = document.createElement('sp-hook');
            this.hook.setAttribute('data-hook-id', 'hashtag_view');
            this.hook.view = this;
            this.appendChild(this.hook);                
        }
    }
    return SPHashtagViewElement;
});