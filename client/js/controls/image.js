define(function () {
	return class SPImageElement extends HTMLElement {

        createdCallback() {
            let size = getComputedStyle(document.body).getPropertyValue("--image-size");
            //this.style.width = size;
            //this.style.height = size;
            this.attributeChangedCallback('src', null, this.getAttribute('src'));
            if (this.hasAttribute('uri')) {
                this.addEventListener('click', (e) => {
                    if (e.target.hasAttribute('uri')) {
                        GlobalViewStack.navigate(e.target.getAttribute('uri'));
                    }
                })
                this.setAttribute('draggable', true);
                this.addEventListener('dragstart', (e) => {
                        let text = e.target.getAttribute('uri');
                        
                        event.dataTransfer.setData("Text",text);
                })
            }
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'src') {
                 this.style.backgroundImage = 'url(' + newVal + ')';
            }
            if (attrName === 'width') {
                
                this.style.width = newVal;
            }
            if (attrName === 'height') {
                this.style.height = newVal;
                
            }
        }
        setState(object) {
            if (object.images && object.images.length > 0)
                this.style.backgroundImage = 'url(' + object.images[0].url + ')';
        }
    }
})