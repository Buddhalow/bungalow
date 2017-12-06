define(['controls/resource', 'plugins/bungalow/datasources/resttabledatasource'], function (SPResourceElement, SPRestTableDataSource) {

    return class SPFlowElement extends SPResourceElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        createdCallback() {
            super.createdCallback();
            this.attributeChangedCallback('uri', null, this.getAttribute('uri'));
       
        }
        render() {
          
            if (!this.state || !this.state.object || !this.state.object.objects) return;
            this.state.object.objects.map((obj) => {
                let a = document.createElement('sp-item');
                a.setState(obj);
                this.appendChild(a);
            })
        }
        setState(obj) {
            this.render(obj);
        }
    }
  
});