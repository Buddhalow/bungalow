define(['controls/viewstack'], function (SPViewStackElement) {
    return class SPMainElement extends HTMLElement {
        createdCallback() {
            
            this.tabBar = document.createElement('sp-tabbar');
            this.tabBar.classList.add('sp-2009')
            this.appendChild(this.tabBar);
            window.GlobalTabBar = this.tabBar;
            this.viewStack = document.createElement('sp-viewstack');
            window.GlobalViewStack = this.viewStack;
            document.dispatchEvent(new CustomEvent('viewstackloaded')); 
            this.appendChild(this.viewStack);
            
            
        }
    }
})