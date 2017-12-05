define([
    'plugins/bungalow/datasources/resttabledatasource', 
    'plugins/bungalow/designers/resttabledesigner',
    'controls/view'
    ],
    function (SPRestTableDataSource, SPRestTableDesigner, SPViewElement) {
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
                this.table.designer = new SPRestTableDesigner();
                this.table.dataSource = new SPRestTableDataSource('/api/plugin', ['id', 'name', 'active']);
                this.table.dataSource.fetchNext();
                this.classList.add('sp-view');
            }
        }
    }
);