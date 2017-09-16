define(function () {
    return class SPSidebarElement extends HTMLElement {
        async  createdCallback() {

                this.tabBar = document.createElement('sp-tabbar');
                this.tabBar.innerHTML = '&nbsp;';
                this.appendChild(this.tabBar);
            this.menu = document.createElement('sp-sidebarmenu');
            this.appendChild(this.menu);
            this.nowplaying = document.createElement('sp-nowplaying');
            this.appendChild(this.nowplaying);
        }
    }
});