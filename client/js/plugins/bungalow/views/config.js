define(['controls/view'], function (SPViewElement) {
    return class SPConfigViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            if (!this.created) {
                this.create();
                this.created = true;
            }
        }
        create() {
            this.classList.add('sp-view');
            this.innerHTML = '<form>' +
                '<h1>' + _('Settings') + '</h1>' +
                '<fieldset><legend>' + _('Appearance') + '</legend><sp-themeeditor></sp-themeeditor></fieldset>' +
                '</form>';
        }
        activate() {
            super.activate();
        }
    }
});