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
                '<fieldset><legend>' + _('Appearance') + '</legend><sp-theme></sp-theme></fieldset>' +
                '<sp-button type="submit">Apply</sp-button>' +
                '</form>';
                this.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    GlobalChromeElement.theme = this.querySelector('sp-theme').theme;   
                    GlobalChromeElement.saveTheme(GlobalChromeElement.theme);
                    return false;
                })
                this.querySelector('sp-theme').theme = GlobalChromeElement.theme;   
                
        }
        activate() {
            super.activate();
        }
    }
});