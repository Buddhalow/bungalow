define(
    [
        'controls/tabledesigner',
        'controls/view'
    ], function (
        SPTableDesigner, 
        SPViewElement
    ) {
    return class SPModelViewElement extends SPViewElement {
            get dataSource() {
                return this.table.dataSource;
            }
            set dataSource(value) {
                this.table.dataSource = value;
                this.form.dataSource = value;
            }
            get dataSource() {
                return this.table.dataSource;
            }
            set designer(value) {
                this.table.designer = value;
            }
            get designer() {
                return this.table.designer;
            }
            get model() {
                return this.getAttribute('model');
            }
            set model(value) {
                this.setAttribute('model', value);
            }
            createdCallback() {
                super.createdCallback();
                this.content = document.createElement('div');
                this.classList.add('sp-view');
                this.section = document.createElement('sp-tabcontent');
                this.editSection = document.createElement('sp-tabcontent');
                this.section.setAttribute('data-tab-id', 'overview');
                this.appendChild(this.section);
                
                
                this.header = document.createElement('sp-header');
                this.header.setAttribute('size', 128);
                
                this.table =  document.createElement('sp-table');
                this.table.setAttribute('showcolumnheaders', true);
                this.table.columnheaders = ['name'];
                this.section.appendChild(this.header);
                if (this.content instanceof Node)
                this.section.appendChild(this.content);
                this.containerElement = document.createElement('div');
                this.containerElement.classList.add('container');
                this.section.appendChild(this.containerElement);
                this.containerElement.appendChild(this.table);
                this.table.header = this.header;
                this.table.view = this;
                this.table.emptyText = this.emptyText;
                var self = this;
                this.table.delegate = {
                    onRowDoubleClick(row, obj) {
                        var dialog = document.createElement('sp-modal');
                            dialog.label = _e('Edit') + ' ' + this.model;
                            row.uri = 'bungalow:' + obj.uri.split(':')[1] + ':' + obj.uri.split(':')[2];
                        document.body.appendChild(dialog);
                        dialog.navigate(row.uri);
                        dialog.show();
                    },
                    onRowSingleClick() {
                        
                    }
                };
                this.containerElement = document.createElement('div');
                this.containerElement.classList.add('container');
                this.editSection.appendChild(this.containerElement);
                this.form = document.createElement('sp-form');
                this.editSection.appendChild(this.form);
                this.form.label = _e('Edit') + ' ' + this.model;
                this.containerElement.appendChild(this.form);
                this.editSection.style.display = 'none';
                this.appendChild(this.editSection);
               
                    
                
            }
            activate() {
                super.activate();
                try {
                 GlobalTabBar.setState({
                    objects: [{
                        id: 'overview',
                        name: _e(this.label)
                    }],
                    add: {
                        uri: 'bungalow:' + this.uri.split(':')[1] + ':add'
                    }
                }); 
                } catch (e) {
                    
                }
            }
            attributeChangedCallback(attrName, oldVal, newVal) {
                if (attrName === 'uri') {
                    if (newVal.split(':').length == 2) {
                        $('sp-tabcontent[data-tab-id="overview"]').show();
                        this.header.setState({
                            type: this.type,
                            name: _e(this.label),
                            uri: this.uri.split(':')[0] + ':' + this.uri.split(':')[1],
                            type: this.model,
                            description: this.description,
                            buttons: [{
                                label: _('Add'),
                                icon: 'plus',
                                onClick: (e) => {
                                    var dialog = document.createElement('sp-modal');
                                    dialog.label = _e('Add') + ' ' + this.model;
                                    document.body.appendChild(dialog);
                                      dialog.show();
                                  dialog.navigate(this.uri.split(':')[0] + ':' + this.uri.split(':')[1] + ':add');
                                  
                                }
                            }]
                        });
                        this.table.setAttribute('uri', newVal);
                    } else {
                        this.editSection.style.display = 'block';
                        this.section.style.display = 'none';
                        this.editSection.style.display = 'block';
                        let uri = newVal.split(':');
                        let id = uri[2];
                        this.form.setAttribute('data-object-id', id);
                        
                    }
                }
            }
            refresh() {
                let uri =this.getAttribute('uri');
                if (!!uri)
                this.attributeChangedCallback('uri', null, uri);
            }
        };

})