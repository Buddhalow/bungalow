define(['controls/formfield'], function (SPFormFieldElement) {
    return class SPRelationField extends SPFormFieldElement {
        constructor() {
            super();
        }
        get name() {
            return this.getAttribute('name');
        }
        set name(value) {
            this.setAttribute('name', value);
        }
        createdCallback() {
            super.createdCallback();
            this.removeChild(this.inputElement);
            this.inputElement = document.createElement('sp-taginput');
            
            this.appendChild(this.inputElement);
        }
        get label() {
            return this.labelElement.innerHTML;
        }
        set label(value) {
            this.labelElement.innerHTML = value;
        }
        get dataSource() {
            return super.dataSource;
        }
        set dataSource(value) {
            super.dataSource = value;
            this.inputElement.dataSource = value;
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (newVal === 'data-object-id') {
                this.value = await this.dataSource.getObjectById(newVal);
                
            }
        }
        get value() {
            return this.inputElement.value[0];
        }
        set value(value) {
            this.inputElement.value = [value];
        }
    }
})