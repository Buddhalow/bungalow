define([
    'plugins/bungalow/datasources/restdatasource', 
    'plugins/bungalow/designers/resttabledesigner',
    'controls/view'
    ],
    function (SPRestTableDataSource, SPRestTableDesigner, SPViewElement) {
        return class SPServiceListViewElement extends SPViewElement {
            activate() {
                super.activate();
                GlobalTabBar.setState({
                    objects: [{
                        id: 'overview',
                        name: _e('Services')
                    }]
                });
            }
            createdCallback() {
                super.createdCallback();
                
                this.table = document.createElement('sp-table');
                this.table.view = this;
                this.appendChild(this.table);   
                this.table.designer = new SPRestTableDesigner();
                this.table.dataSource = new SPRestTableDataSource();
                this.table.columnheaders = ['name', 'login'];
                this.table.setAttribute('showcolumnheaders', 'true');
                this.table.setAttribute('uri', 'service');
                this.classList.add('sp-view');
            }
        }
    }
);