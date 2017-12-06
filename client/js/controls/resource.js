define(['plugins/bungalow/datasources/'], function (SPResourceElement) {
	return class SPResourceElement extends HTMLElement {
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'uri') {
                let result = await this.dataSource.getRow(newVal);
                this.setState({object: result});
            }
        }
        get dataSource() {
            return this._dataSource;
        }
        
        set dataSource(value) {
            this._dataSource = value;
            this._dataSource.onchange = (e) => {
                let evt = new CustomEvent('change');
          
                this.dispatchEvent(evt);
                this.render();
                let firstRow = this.querySelector('tr');
               /* if (firstRow) {
                    let th = this.querySelector('th');
                    let size = (firstRow.getBoundingClientRect().height * 2) + 'pt ' + (firstRow.cells[0].getBoundingClientRect().height * 1.5) + 'pt';
                    this.parentNode.style.backgroundSize =  size;
                    let tablestart = th.getBoundingClientRect().top + th.getBoundingClientRect().height;
                    this.parentNode.style.backgroundPosition = '0pt ' +  (tablestart) +  'pt';
                    debugger;
                }*/
    
            }
            this.render();
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        render() {
            let obj = this.state.object;
            this.innerHTML = '<sp-link uri="' + obj.uri + '">' + obj.name + '</sp-link>';
        }
        createdCallback() {
        }
        setState(state) {
            this.state = state;
            this.render();
        }
    }
})