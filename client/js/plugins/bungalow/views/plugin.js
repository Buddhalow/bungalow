define([
    'plugins/bungalow/datasources/restdatasource', 
    'plugins/bungalow/designers/resttabledesigner',
    'controls/view'
    ],
    function (SPRestDataSource, SPRestTableDesigner, SPViewElement) {
        return class SPPluginListViewElement extends SPViewElement {
            activate() {
                super.activate();
                GlobalTabBar.setState({
                    objects: [{
                        id: 'overview',
                        name: _e('Plugins')
                    }]
                });
            }
            createdCallback() {
                super.createdCallback();
                
                this.table = document.createElement('sp-table');
                this.table.view = this;
                this.appendChild(this.table);   
                this.table.columnheaders = ['name', 'enabled'];
                this.table.setAttribute('showcolumnheaders', true);
                this.table.designer = new SPRestTableDesigner();
                this.table.dataSource = new SPRestDataSource();
                this.table.setAttribute('uri', 'plugin');
                this.classList.add('sp-view');
            }
        }
    }
);