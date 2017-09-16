define(function () {
	/**
     * Table element
     **/
    return class SPTableElement extends HTMLElement {
        constructor() {
            super();
            
            
        }
        get selectedIndicies() {
            return this._selectedIndicies;
        }
        get selectedObjects() {
            return this.selectedIndicies.map((i) => {
                return this.dataSource.getRowAt(i);
            });
        }
        set selectedIndicies(value) {
            this._selectedIndicies = value;
    
            let trs = this.querySelectorAll('tr');
            for (let i = 0; i < trs.length; i++) {
                trs[i].classList.remove('sp-track-selected');
            }
            this._selectedIndicies.map((i) => {
                this.querySelector('tr[data-index="' + i + '"]').classList.add('sp-track-selected');
            });
        }
        fetchNext() {
            this.dataSource.fetchNext();
        }
        get dataSource() {
            return this._dataSource;
        }
        set dataSource(value) {
            this._dataSource = value;
            this._dataSource.table = this;
            this._dataSource.onchange = (e) => {
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
        get designer() {
            return this._designer;
        }
        set designer(value) {
            this._designer = value;
            this._designer.table = this;
            
        }
        createdCallback() {
            window.addEventListener('resize', this._onResize.bind(this));
            this._dataSource = null;
            this._designer = null;
            this._selectedIndicies = [];
            this.table = document.createElement('table');
            this.table.thead = document.createElement('thead');
            this.table.thead.tr = document.createElement('tr');
            this.table.thead.appendChild(this.table.thead.tr);
            this.table.appendChild(this.table.thead);
            this.table.tbody = document.createElement('tbody');
            this.table.appendChild(this.table.tbody);
            this.appendChild(this.table);
            this.created = true;
            this.emptyLabel = document.createElement('div');
            this.emptyLabel.classList.add('sp-empty');
            this.emptyLabel.setAttribute('hidden', true);
            this.appendChild(this.emptyLabel);
            
        }   
        attachedCallback() {
    
                this.parentNode.classList.add('table-background');
    
        }
    
        activate() {
            // this.checkState();
        }
        get emptyText() {
            return this.emptyLabel.innerHTML;
        }
        set emptyText(value) {
            this.emptyLabel.innerHTML = value;
        }
    
        get limit() {
            if (!this.hasAttribute('limit')) return 30;
            return parseInt(this.getAttribute('limit'));
        }
    
        set limit(value) {
                this.setAttribute('limit', value);
        }
    
        get offset() {
            if (!this.hasAttribute('offset')) return 0;
                return parseInt(this.getAttribute('offset'));
        }
    
        get uri() {
            return this.getAttribute('uri');
        }
    
        set uri(value) {
            this.setAttribute('uri', value);
        }
        set offset(value) {
            this.setAttribute('offset', value);
        }
        get query() {
            return this.getAttribute('query');
        }
        set query(value) {
            this.setAttribute('query', value);
        }
        set header(val) {
            this._header = val;
        }
        get header() {
            return this._header;
        }
        get view() {
            return this._view;
        }
        set view(val) {
            
            this._view = val;
            this._view.addEventListener('scroll', this._onScroll.bind(this));
        }
        _onResize(e) {
            this.resize();
        }
        _onScroll(e) {
            let view = e.target;
            let viewBounds = view.getBoundingClientRect();
            let bounds = this.getBoundingClientRect();
            let tabBar = GlobalTabBar.getBoundingClientRect();
            let headerHeight = 0;
            if (this.header) {  
                headerHeight = this.header.getBoundingClientRect().height;;
            } 
            console.log(bounds.top, viewBounds.top);
            if (view.scrollTop > headerHeight ) {
                view.style.display = 'block';
                let transform = 'translateY(' + ((view.scrollTop - headerHeight) - 1) + 'px)';
                this.table.thead.style.transform = transform; 
            } else {
                this.table.thead.style.transform = 'translateY(0px)';
            }
            let gondole = this.querySelector('sp-gondole');
            if (gondole && gondole.getBoundingClientRect().top < viewBounds.top + viewBounds.height) {
                if (!gondole.hasAttribute('activated'))
                this.fetchNext();
            }
        
        }
        clear() {
            this.table.tbody.innerHTML = '';
        }
        render() {
            this.clear();
            if (this._designer == null) throw "No designer set";
            if (this._dataSource == null) throw "Missing data source";
            this.table.tbody.innerHTML = '';
            this.table.thead.innerHTML = '';
            this.table.thead.innerHTML = '';
            this.table.thead.tr = this.designer.getHeaderRow(); 
            this.table.thead.appendChild(this.table.thead.tr);
            let offset = 0;
            if (this.dataSource.removedRows instanceof Array)
                for (let row of this.dataSource.removedRows) {
                    let tr = this.table.tbody.querySelector('td[data-id="' + row.id + '"]');
                    this.table.tbody.removeChild(tr);
                }
            for (let i = 0; i < this.dataSource.getNumberOfRows(); i++) {
                let row = this.dataSource.getRowAt(i);
                let tr = this.designer.getRowElement(row);
                tr.setAttribute('draggable', true);
                tr.addEventListener('dragstart', (e) => {
                        let text = row.uri;
                        
                        event.dataTransfer.setData("Text",text);
                })
                tr.addEventListener('dblclick', (e) => {
                     if (this.delegate != null) {
                        let ptr = e.target.getParentElementByTagName('TR');
                        if (!!ptr) {
                            this.delegate.onRowDoubleClick(ptr, row);
                        }
                    }
                });
                tr.addEventListener('click', (e) => {
                    if (this.delegate != null) {
                        let ptr = e.target.getParentElementByTagName('TR');
                         if (this.delegate.onRowClick instanceof Function)
                        this.delegate.onRowClick(ptr, row);
                         
                    }
                });
                tr.setAttribute('data-id', row.id);
                tr.setAttribute('data-uri', row.uri);
                tr.setAttribute('data-context-uri', this.uri);
                for (let j = 0; j < this.dataSource.numberOfColumnHeaders; j++) {
                    let td = this.designer.getCellElement(j, row);
                    if (!td) continue;
                    tr.appendChild(td);
                    tr.dataset.index = i;
                    td.addEventListener('mousedown', (e) => {
                        this.selectedIndicies = [e.target.parentNode.dataset.index];
                    })
                }
                let numberOfChildren = this.dataSource.getNumberOfChildren(row);
                if (tr.created) {
                    this.table.tbody.insertBefore(tr, this.table.tbody.children[i + offset]);
                    tr.created = false;
                }
                for (let c = 0; c < numberOfChildren; c++) {
                    
                    let child = this.dataSource.getRowAt(c, row);
                    let tr2 = this.designer.getRowElement(child);
                    tr2.setAttribute('data-parent-id', row.id);
                    tr2.setAttribute('data-parent-index', i);
                    tr2.setAttribute('data-context-uri', this.uri);
                    tr2.addEventListener('click', (e) => {
                        if (this.delegate != null) {
                             let ptr = e.target;
                             while (ptr.tagName !== 'TR') {
                                 ptr = ptr.parentNode;
                             }
                             this.delegate.rowDoubleClick(child, ptr);
                             
                        }
                    });
                    for (let j = 0; j < this.dataSource.numberOfColumnHeaders; j++) {
                        let td = this.designer.getCellElement(j, child);
                        tr2.appendChild(td);
                        tr2.dataset.index = i;
                        td.addEventListener('mousedown', (e) => {
                            this.selectedIndicies = [e.target.parentNode.dataset.index];
                        })
    
                    }
                    if (tr2.created) {
                        tr2.style.display = 'none';
                        this.table.tbody.insertBefore(tr2, this.table.tbody.children[i + offset]);
                        tr2.created = false;
                    }
    
                }
                offset += numberOfChildren;
                if (numberOfChildren > 0 && numberOfChildren % 2 == 1) {
                    let trf = document.createElement('tr');
                    this.table.tbody.appendChild(trf);
                }
                
                if (i == this.dataSource.getNumberOfRows() - 1 && !!this.header) {
                    let rect = tr.getBoundingClientRect();
                    let top = ((i % 2 == 0 ? rect.height : 0) + (this.header.getBoundingClientRect().top) + this.table.thead.getBoundingClientRect().height);
                    this.view.style.backgroundPosition = "0pt " + top + 'pt'; 
                }
               
            }
            for (let j = 0; j < this.dataSource.numberOfColumnHeaders; j++) {
                let th = this.designer.getColumnElementAt(j);
                this.table.thead.tr.appendChild(th);
            }
            if (this.dataSource.getNumberOfRows() > 0) {
                this.emptyLabel.setAttribute('hidden', true);
            } else {
              this.emptyLabel.style.left = (this.getBoundingClientRect().width) + 'px';
              this.emptyLabel.style.top = '300pt';
                if (this.emptyLabel.hasAttribute('hidden')) {
                    this.emptyLabel.removeAttribute('hidden');
                }
                
            }
            
            let thead = this.querySelector('thead');
            if (thead.style.display != 'none') {
            if (this.table.tfoot) {
                this.table.removeChild(this.table.tfoot);
            }
            this.table.tfoot = document.createElement('tfoot');
            this.table.tfoot.tr = document.createElement('tr');
            this.table.tfoot.tr.td = document.createElement('td');
            this.table.tfoot.tr.td.setAttribute('colspan', (this.dataSource.numberOfColumnHeaders + 2));
            this.table.tfoot.tr.td.classList.add('zebra');
            this.table.appendChild(this.table.tfoot);
            this.table.tfoot.appendChild(this.table.tfoot.tr);
            this.table.tfoot.tr.appendChild(this.table.tfoot.tr.td);
            this.adjustZebra();
            }
        }
        resize() {
            this.adjustZebra();
        }
        adjustZebra() {
            if (!this.table.tfoot) return;
            let thBounds = {top: 0, height: 0};
            let th = this.querySelector('th');
            let thead = this.querySelector('thead');
            if (thead.style.display === 'none') return;
            if (th) thBounds = th.getBoundingClientRect();
            let view = this.getParentElementByClass("sp-view");
            if (!view) return;
            let bounds = view.getBoundingClientRect();
            let lastTd = this.querySelector('tr:last-child td');
            let height = bounds.bottom - thBounds.height;
            if (!!lastTd) {
                let lastBounds = lastTd.getBoundingClientRect();
                
                height -= lastBounds.top + lastBounds.height;
            }
            if (this.table.tfoot != null)
            {
                this.table.tfoot.tr.td.style.height = (height) + 'px';
                let numRows = this.getElementsByTagName("tr").length;   
                if ((numRows % 2) != 0) 
                    this.table.tfoot.tr.td.style.backgroundPosition = '0pt ' + lastTd.getBoundingClientRect().height + 'px';
         
            }
        }
        attachedCallback() {
            
            let thead = this.querySelector('thead');
            if (thead.style.display != 'none') {
            this.adjustZebra();
            }
        }
    }

})