define(['controls/menudatasource'], function (SPMenuDataSource) {
    return class SPSidebarMenuElement extends HTMLElement {
        attachedCallback() {
            this.search = document.createElement('sp-searchform');
            this.appendChild(this.search);
            let e = new CustomEvent('mainmenuload');
            document.dispatchEvent(e);
        }

    }
});