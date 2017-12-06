define(['plugins/spotify/controls/resource', 'plugins/bungalow/datasources/resttabledatasource'], function (SPResourceElement, SPRestTableDataSource) {

    return class SPFlowElement extends SPResourceElement {
        createdCallback() {
            this.dataSource = new SPRestTableDataSource();
        }
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        render(state) {
            this.innerHTML = '';
            state.objects.map((obj) => {
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