define([
    'plugins/bungalow/datasources/resttabledatasource', 
    'plugins/bungalow/designers/resttabledesigner',
    'controls/view'
    ],
    function (SPRestTableDataSource, SPRestTableDesigner, SPViewElement) {
        return class SPServiceViewElement extends SPViewElement {
            createdCallback() {
                super.createdCallback();
                this.table = document.createElement('sp-table');
                this.appendChild(this.table);   
                this.table.designer = new SPRestTableDesigner();
                this.table.dataSource = new SPRestTableDataSource('/api/service', ['id', 'name']);
                this.table.dataSource.fetchNext();
            }
        }
    }
);