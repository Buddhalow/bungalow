define(
    [
        'controls/about',
        'controls/appheader',
        'controls/menudatasource',
        'controls/appfooter',
        'controls/carousel',
        'controls/chrome',
        'controls/divider',
        'controls/gondole',
        'controls/image',
        'controls/infobar',
        'controls/link',
        'controls/main',
        'controls/menu',
        'controls/menuitem',
        'controls/nowplaying',
        'controls/popularity',
        'controls/searchform',
        'controls/sidebar',
        'controls/sidebarmenu',
        'controls/tab',
        'controls/tabbar',
        'controls/tabcontent',
        'controls/table',
        'controls/tabledatasource',
        'controls/tabledesigner',
        'controls/themeeditor',
        'controls/title',
        'controls/toolbar',
        'controls/view',
        'controls/viewstack',
        'events'
    ],
    function (
        SPAboutElement,
        SPAppHeaderElement,
        SPMenuDataSource,
        SPAppFooterElement,
        SPCarouselElement,
        SPChromeElement,
        SPDividerElement,
        SPGondoleElement,
        SPImageElement,
        SPInfoBarElement,
        SPLinkElement,
        SPMainElement,
        SPMenuElement,
        SPMenuItemElement,
        SPNowPlayingElement,
        SPPopularityElement,
        SPSearchFormElement,
        SPSidebarElement,
        SPSidebarMenuElement,
        SPTabElement,
        SPTabBarElement,
        SPTabContentElement,
        SPTableElement,
        SPTableDataSource,
        SPTableDesigner,
        SPThemeEditorElement,
        SPTitleElement,
        SPToolbarElement,
        SPViewElement,
        SPViewStackElement,
        EventEmitter
    ) {
	return class SPChromeElement extends HTMLElement {
	    get stylesheet() {
            let stylesheet = localStorage.getItem('stylesheet');
            if (!stylesheet) {
                stylesheet = 'bungalow';
            }
            
            return stylesheet;
        }
        set stylesheet(value) {
            this.applyTheme(value, this.flavor);
            localStorage.setItem('stylesheet', value);
        }
        get flavor() {
            let flavor = localStorage.getItem('flavor');
            if (!flavor) {
                flavor = 'light';
            }
            return flavor;
        }
        set flavor(value) {
            this.applyTheme(this.stylesheet, value);
            localStorage.setItem('flavor', value);
        }
        get hue() {
            let hue = localStorage.getItem('hue');
            if (!hue) return 0;
            return hue;
        }
        login(service) {
            localStorage.setItem('logging_into', service);
            return new Promise((resolve, reject) => {
                var loginWindow = window.open('/api/' + service + '/login');
                var t = setInterval(() => {
                    if (!loginWindow) {
                        clearInterval(t);
                        
                        resolve(true);
                    }
                });
            });
        }
        applyTheme(theme, flavor='light') {
            let link = document.querySelector('link[id="theme"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('id', 'theme');
                document.head.appendChild(link);
                link.setAttribute('rel', 'stylesheet');
            }
            let link2 = document.querySelector('link[id="theme_variant"]');
            if (!link2) {
                link2 = document.createElement('link');
                link2.setAttribute('id', 'theme_variant');
                document.head.appendChild(link2);
                link2.setAttribute('rel', 'stylesheet');
            }
            link2.setAttribute('href', '/themes/' + theme + '/css/' + flavor + '.css');
            link.setAttribute('href', '/themes/' + theme + '/css/' + theme + '.css');
        }
        
        apply() {
            this.stylesheet = this.stylesheet;
            this.saturation = this.saturation;
            this.hue = this.hue;
            this.flavor = this.flavor;
        }
        
        /**
         * Sets app global hue
         **/
        set saturation(value) {
            document.documentElement.style.setProperty('--primary-saturation', value + '%');
            localStorage.setItem('saturation', value);
        }
    
        get saturation() {
            let saturation = localStorage.getItem('saturation');
            if (!saturation) return 0;
            return saturation;
        }
    
    
        /**
         * Sets app global hue
         **/
        set hue(value) {
            document.documentElement.style.setProperty('--primary-hue', value + 'deg');
            localStorage.setItem('hue', value);
        }
        createdCallback() {
            window.GlobalChromeElement = this;
            this.hooks = [];
            this.appHeader = document.createElement('sp-appheader');
            this.appendChild(this.appHeader);
            this.appToolbar = document.createElement('sp-apptoolbar');
            this.appendChild(this.appToolbar);
            this.infoBar = document.createElement('sp-infobar');
            this.appendChild(this.infoBar);
            this.main = document.createElement('main');
            this.appendChild(this.main);
            this.sidebar = document.createElement('sp-sidebar');
            this.main.appendChild(this.sidebar); 
            this.mainView = document.createElement('sp-main');
            this.main.appendChild(this.mainView);
            this.rightSidebar = document.createElement('sp-feedview');
            this.rightSidebar.setAttribute('hidden', true);
            this.main.appendChild(this.rightSidebar);
            this.appFooter = document.createElement('sp-appfooter');
            this.appendChild(this.appFooter);
             this.apply();
            
        }
        alert(obj) {
            this.infoBar.show();
            this.infoBar.setState(obj);
        }
    }
})