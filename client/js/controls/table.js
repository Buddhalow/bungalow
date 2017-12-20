define(['controls/resource', 'controls/tabledesigner'], function (SPResourceElement, SPTableDesigner) {
	/**
     * Table element
     **/
    return class SPTableElement extends SPResourceElement {
        constructor() {
            super();
        }
        
        get state() {
            if (!this._state) {
                this._state = {
                    object: {
                    objects: []
                        
                    }
                };
            }
            return this._state;
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        set state(value) {
            this.state = value;
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
                let elm = this.querySelector('tr[data-index="' + i + '"]');
                if (elm != null)
                    elm.classList.add('sp-track-selected');
            });
        }
        async fetchNext() {
            var result = await this.dataSource.request('GET', this.getAttribute('uri'), {
                limit: this.limit,
                offset: this.offset
            });
            if (!!result)
            for (let row of result.objects) {
                this.state.object.objects.push(row);
            }
            this.render();
            this.offset += this.limit;
        }
        
        get designer() {
            if (!this._designer) {
                return null;
            }
            return this._designer;
        }
        set designer(value) {
            this._designer = value;
            this._designer.table = this;
            
        }
        reset() {
            if (this.table != null)
            this.table.tbody.innerHTML = '';
            this.offset = 0;
            this.limit = 28;
        }
        get columnheaders() {
            return (this.getAttribute('columnheaders') || '').split(',');
        }
        set columnheaders(val) {
            if (val instanceof Array) {
                val = val.join(',');
            }
            this.setAttribute('columnheaders', val);
        }
        createdCallback() {
            super.createdCallback();
            window.addEventListener('resize', this._onResize.bind(this));
            this.offset = 0;
            this.limit = 28;
            this._columns = [];
            this.result = {
                objects : []
            };
            this._dataSource = null;
            this._designer = new SPTableDesigner();
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
            
            this.table.setAttribute('tabindex', '0');
            document.body.addEventListener('keydown', (event) => {
                if (event.which == "17")
                    this.cntrlIsPressed = true;
                else if (event.which == 65 && this.cntrlIsPressed) {
                    // Cntrl+  A
                    this.selectAllRows();
                }
            });
            
        }   
        selectAllRows() {
            $(this, 'tr').addClass('sp-track-selected');
        }
        attachedCallback() {
    
            this.parentNode.classList.add('table-background');
            this.render();
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
    
        get uri() {
            return this.getAttribute('uri');
        }
    
        set uri(value) {
            this.setAttribute('uri', value);
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
                let transform = 'translateY(' + ((view.scrollTop - headerHeight) ) + 'px)';
                this.table.thead.style.transform = transform; 
            } else {
                this.table.thead.style.transform = 'translateY(0px)';
            }
            this.checkNext();
        
        }
        checkNext() {
            if (this.parentNode == null) return;
            let view = this.getParentElementByClass("sp-view");
            if (!view) return;
            let viewBounds = view.getBoundingClientRect();
            
            let gondole = this.gondole;
            if (gondole && gondole.getBoundingClientRect().top < viewBounds.top + viewBounds.height) {
                
                if (!gondole.hasAttribute('activated'))
                    this.fetchNext();
                gondole.setAttribute('activated', 'true');
            }
        }
        clear() {
            this.table.tbody.innerHTML = '';
        }
        get selectedRows() {
            return [this.table.querySelector('.sp-track-selected')];
        }
        refresh() {
            this.dataSource.refresh();
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName == 'uri') {
                if (newVal != null) {
                this.reset();
                this.fetchNext();
                }
            }
            if (attrName == 'showheaders') {
                if (newVal == 'true') {
                    if (this.table.tfoot != null) {
                        this.table.removeChild(this.table.tfoot);
                        this.table.tfoot = null;
                    }
                }
            }
        }
        isRowWithIndexSelected(index) {
            try {
                return this.selectedIndicies.filter(tr => tr.getAttribute('data-index')).length > 0;
            } catch (e) {
                return false;
            }
        }
        render() {
            
            super.render();
            if (!this.parentNode) return;
            if ( !this.designer || this.state == null || this.state.object == null || !(this.state.object.objects instanceof Array)) return;
            this.innerHTML = '';
            this.emptyLabel = document.createElement('div');
            this.emptyLabel.classList.add('sp-empty');
            this.emptyLabel.setAttribute('hidden', true);
            this.appendChild(this.emptyLabel);
            this.table = document.createElement('table');
            this.appendChild(this.table);
            this.table.tbody = document.createElement('tbody');
            this.table.appendChild(this.table.tbody);
            this.table.tbody.innerHTML = '';
            this.table.thead = document.createElement('thead');
            this.table.appendChild(this.table.thead);
            this.table.thead.innerHTML = '';
            this.table.thead.innerHTML = '';
            this.table.thead.tr = document.createElement('tr'); 
            if(this.getAttribute('showcolumnheaders') == 'true')
                this.table.thead.appendChild(this.table.thead.tr);
            if (this.dataSource.canReorderRows || this.dataSource.canAddRows) {
                $(this, 'td').on('dragover', false);
                 $(this, 'td').on('drop', async (ex) => {
                     if (this.dropping) return;
                     this.dropping = true;
                     let e = ex.originalEvent;
                    $('tr').removeClass('sp-dragover');
                     if (this.dataSource.canReorderRows || this.dataSource.canAddRows) {
                        if (e.dataTransfer.effectAllowed == 'move') {
                            
                            await this.dataSource.reorderRows(this.selectedIndicies, this.insertPosition);
                            this.dropping = false;
                        //    this.refresh();
                        this.selectedRows.map(tr => {
                            this.table.tbody.removeChild(tr);
                        });
                        this.selectedTrs.map(tr => {
                            this.table.tbody.insertBefore(tr, this.table.tbody.childNodes[this.insertPosition]) 
                        });
                        }
                    }   
                    
                });
            }
            if (this.dataSource.removedRows instanceof Array)
                for (let row of this.dataSource.removedRows) {
                    let tr = this.table.tbody.querySelector('td[data-id="' + row.id + '"]');
                    this.table.tbody.removeChild(tr);
                }
            for (let i = 0; i < this.state.object.objects.length; i++) {
                let row = this.state.object.objects[i];
                let tr = this.designer.getRowElement(row);
                if (!tr.hasAttribute('data-index')) {
                    tr.setAttribute('data-index', i);
                }
                tr.setAttribute('draggable', true);
                tr.addEventListener('dragstart', (e) => {
                    
                    this.selectedTrs = this.selectedRows;
                    this.selectedIndicies = this.selectedRows.map(
                        (tr) => parseInt(tr.getAttribute('data-position'))   
                    );
                    this.selectedUris = this.selectedRows.map(
                        (tr) => tr.getAttribute('data-uri')    
                    );
                    let text = this.selectedUris.join("\n");
                    event.dataTransfer.setData("text/plain",text);
                    if (this.dataSource.canReorderRows) {
                        e.dataTransfer.effectAllowed = 'move';
                        
                        this.activity = 'reorder';
                    }
                })
                if (this.dataSource.canReorderRows || this.dataSource.canAddRows) {
                    tr.addEventListener('dragenter', (e) => {
                        if (e.dataTransfer.effectAllowed == 'move') {
                            $('tr').removeClass('sp-dragover');
                            $(tr).addClass('sp-dragover');
                            this.insertPosition = $(tr).attr('data-position');
                        }
                    })
                    tr.addEventListener('dragleave', (e) => {
                        if (e.dataTransfer.effectAllowed in ['move', 'insert']) {
                            $('tr').removeClass('sp-dragover');
                            $(tr).addClass('sp-dragover');
                        }
                    })
                   
                }
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
                for (let j = 0; j < this.columnheaders.length; j++) {
                    let td = this.designer.getCellElement(j, row);
                    if (!td) continue;
                    tr.appendChild(td);
                    tr.dataset.index = i;
                    if (!tr.hasAttribute('data-index')) {
                        tr.setAttribute('data-index', j);
                    }
                    td.addEventListener('mousedown', (e) => {
                        let selectedIndicies = this.selectedIndicies || [];
                        let selectedIndex = e.target.parentNode.dataset.index;
                        if (this.cntrlIsPressed) {
                            if (this.isRowWithIndexSelected(selectedIndex)) {
                                this.selectedIndicies.splice(this.selectedIndicies.indexOf(selectedIndex), 1);
                            } else {
                                this.selectedIndicies.push(selectedIndex);
                            }
                        } else {
                            this.selectedIndicies = [e.target.parentNode.dataset.index];
                        }
                    })
                }
                let offset = 0;
                let children = row.objects;
                if (tr.created) {
                    this.table.tbody.insertBefore(tr, this.table.tbody.children[i + offset]);
                    tr.created = false;
                }
                if (row.objects instanceof Array)
                for (let c = 0; c < row.objects.length; c++) {
                    
                    let child = row.objects[c];
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
                    for (let j = 0; j < this.columnheaders.length; j++) {
                        let td = this.designer.getCellElement(j, child);
                        tr2.appendChild(td);
                        tr2.dataset.index = i;
                        td.addEventListener('mousedown', (e) => {
                            this.selectedIndicies = [e.target.parentNode.dataset.index];
                        })
    
                    }
    
                }
                if (children instanceof Array)
                offset += children.length;
                
                if (i == this.state.object.objects.length - 1 && !!this.header) {
                    let rect = tr.getBoundingClientRect();
                    let top = ((i % 2 == 0 ? rect.height : 0) + (this.header.getBoundingClientRect().top) + this.table.thead.getBoundingClientRect().height);
                    this.view.style.backgroundPosition = "0pt " + top + 'pt'; 
                }
               
            }
            for (let j = 0; j < this.columnheaders.length; j++) {
                let th = this.designer.getColumnElementAt(j);
                this.table.thead.tr.appendChild(th);
            }
            if (this.state.object.objects.length < 1) {
                this.emptyLabel.setAttribute('hidden', true);
            } else {
              this.emptyLabel.style.left = (this.getBoundingClientRect().width) + 'px';
              this.emptyLabel.style.top = '300pt';
                if (this.emptyLabel.hasAttribute('hidden')) {
                    this.emptyLabel.removeAttribute('hidden');
                }
                
            }
            
             if (this.getAttribute('showcolumnheaders') == 'true') {
                if (this.table.tfoot) {
                    try {
                        this.table.removeChild(this.table.tfoot);
                    } catch (e) {
                        
                    }
                }
                this.table.tfoot = document.createElement('tfoot');
                this.table.tfoot.tr = document.createElement('tr');
                this.table.tfoot.tr.td = document.createElement('td');
                this.table.tfoot.tr.td.setAttribute('colspan', (this.columnheaders.length));
                this.table.tfoot.tr.td.classList.add('zebra');
                this.table.appendChild(this.table.tfoot);
                this.table.tfoot.appendChild(this.table.tfoot.tr);
                this.table.tfoot.tr.appendChild(this.table.tfoot.tr.td);
                this.adjustZebra();
            } else {
                try {
                if (this.table.tfoot) {
                    this.table.removeChild(this.table.tfoot);
                }
                } catch (e) {
                    
                }
            }   
            if (!this.getAttribute('showcolumnheaders')) {
                this.table.thead.setAttribute('hidden', 'true');

            } else {
                if (this.table.thead.hasAttribute('hidden'))
                this.table.thead.removeAttribute('hidden');
                
            }
            
            let evt = new CustomEvent('rendered');
            this.gondole = document.createElement('tfoot');
            
            
            this.table.appendChild(this.gondole);
            this.checkNext();
            this.dispatchEvent(evt);
        }
        resize() {
            this.adjustZebra();
        }
        adjustZebra() {
            if (!this.table.tfoot) return;
            let thBounds = {top: 0, height: 0};
            let th = this.querySelector('th');
            let thead = this.querySelector('thead');
            if (thead.hasAttribute('hidden')) return;
            if (th) thBounds = th.getBoundingClientRect();
            let view = this.getParentElementByClass("sp-view");
            if (!view) return;
            try {
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
            } catch (e) {
            }
        }
        attachedCallback() {
            
            let thead = this.querySelector('thead');
            if (thead != null)
            if (thead.hasAttribute('hidden')) {
                this.adjustZebra();
            }
            this.checkNext();
        }
    }

})