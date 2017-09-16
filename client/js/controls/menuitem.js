define(['controls/link'], function (SPLinkElement) {
    return class SPMenuItemElement extends SPLinkElement {
        createdCallback() {
            super.createdCallback();
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
           
        }
        setState(object) {
            this.state = object;
            this.render();
        }
        render() {
            if (this.state != null) {
                let item = this.state;
                this.innerHTML += '<span>' + _(item.name) + '</span>';
                if ('owner' in item) {
                    menuItem.innerHTML = '<span style="opacity: 0.5"> by ' + item.owner.name + '</span>';
                }
                if ('user' in item) {
                    menuItem.innerHTML = '<span style="opacity: 0.5"> by ' + item.user.id + '</span>';
                }
                if ('artists' in item) {
                    menuItem.innerHTML = '<span style="opacity: 0.5"> by ' + item.artists.map((a) => a.name).join(', ') + '</span>';
                }
                if ('for' in item) {
                    menuItem.innerHTML = '<span style="opacity: 0.5"> by ' + item['for'].name + '</span>';
                }
                this.ul = document.createElement('ul');
                this.appendChild(this.ul);
                this.ul.style.display = 'none';
                this.setAttribute('uri', this.state.uri);
            }
        }
        addChild(item) {
            this.ul.style.display = 'block';
            let li = document.createElement('li');
            this.ul.appendChild(li);
            li.appendChild(item);
        }
    }
})