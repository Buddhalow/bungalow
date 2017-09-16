define(['controls/menudatasource'], function (SPMenuDataSource) {
    return class SPSidebarMenuElement extends HTMLElement {
        attachedCallback() {
            let e = new CustomEvent('mainmenuload');
            document.dispatchEvent(e);
        }

    }
});