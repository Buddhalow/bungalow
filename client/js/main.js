Parse.initialize("yvZbizRiIpJ3O1Q6Va0urSMkeg6AMRwzx0Sk6Sqo", "yaBh9ill6i0ktvvTb7WDPmoSg8QSxoGCFZ0yuYQY");
Parse.serverURL = 'https://parseapi.back4app.com/'
Parse.liveQueryServerURL = 'wss://leros.back4app.io';


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

moment.locale('se');
Parse.User.logIn('drsounds', '123', {
    success: () => {
        resolve(user);

    }, 
    error: () => {
        reject();
    }
})  
moment.locale('set');

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
/**
 * https://stackoverflow.com/questions/6982692/html5-input-type-date-default-value-to-today
 **/
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

i18_registerLang('sv');

HTMLElement.prototype.getParentElementByTagName = function (tagName) {
    let elm = this;
    while (elm && elm.tagName !== tagName) {
        elm = elm.parentNode;
    }
    return elm;
}

HTMLElement.prototype.getParentElementByClass = function (tagName) {
    let elm = this;
    try {
    while (!!elm && !elm.classList.contains(tagName)) {
        elm = elm.parentNode;
    }
    } catch (e) {
        
    }
    return elm;
}


window.hooks = {};


Parse.Object.prototype.simplify = function (level = 0) {
    try {
        let newObj = {};

        newObj.id = this.id;
        newObj.uri = "bungalow:" + this.className.toLowerCase() + ":" + this.id;
        Object.keys(this.attributes).forEach((field) => {
            let val = this.attributes[field];
            if (val instanceof Parse.Relation) {
                return;
            }
            if (val instanceof Parse.Object && field != 'parseObject' && level < 4) {
                val = val.simplify(level++);
            }
            newObj[field] = val;
            if (val != null)
            val.parseObject = this;
        });

        return newObj;
    } catch (e) {
    }
}


/**
 * Require await
 * A wrapper to make await requires on require.js
 * @param {Array} components The components to load
 * @return {Promise} A promise
 * */
const requireAwait = async function (components) {
    var components = components;
    return new Promise((resolve, fail) => {
        require(components, function () {
            resolve(arguments);
        })
    });
}


requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',  
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        controls: 'controls',
        views: 'views',
        plugins: 'plugins',
        services: 'services'
    }
});


const onHashChanged =  (e) => {
    let tabId = 'overview';
    try {
        tabId = window.location.hash.substr(1);
        if (!tabId || tabId.length < 1) {
            tabId = 'overview'
        };;
    } catch (e) {
    }
    let view = GlobalViewStack.currentView;
    let foundTab = false;
    for (let tab of document.querySelectorAll('sp-tab')) {
        if (tab.getAttribute('data-tab-id') == tabId) {
            tab.classList.add('sp-tab-active');
            foundTab = true;
        } else {
            tab.classList.remove('sp-tab-active');

        }
    }
    if (!foundTab) {
        let tabs = document.querySelectorAll('sp-tab');
        if (tabs.length > 0)
            tabs[0].classList.add('sp-tab-active');
    }
    for (let tabView of view.querySelectorAll('sp-tabcontent')) {
        if (tabView.getAttribute('data-tab-id') == tabId) {
            tabView.style.display = 'block';
        } else {
            tabView.style.display = 'none';
        }
    }
    if (GlobalViewStack && GlobalViewStack.currentView) {
        if (GlobalViewStack.currentView.setHash instanceof Function)
            GlobalViewStack.currentView.setHash(tabId);
    }
};
window.addEventListener('hashchange', onHashChanged);



let serializeObject = function(obj) {
  var str = [];
  for(var p in obj)
    if (p in obj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

String.prototype.toQuerystring = function () {
    var args = this.substring(0).split('&');

    var argsParsed = {};

    var i, arg, kvp, key, value;

    for (i=0; i < args.length; i++) {

        arg = args[i];

        if (-1 === arg.indexOf('=')) {

            argsParsed[decodeURIComponent(arg).trim()] = true;
        }
        else {

            kvp = arg.split('=');

            key = decodeURIComponent(kvp[0]).trim();

            value = decodeURIComponent(kvp[1]).trim();

            argsParsed[key] = value;
        }
    }

    return argsParsed;
}








String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var strHours = hours, strMinutes = minutes, strSeconds = seconds;
    if (hours   < 10) {strHours   = "0"+hours;}
    if (minutes < 10) {strMinutes = "0"+minutes;}
    if (seconds < 10) {strSeconds = "0"+seconds;}
    return (hours > 0 ? strHours+':' : '') + strMinutes + ':' + strSeconds;
}



const TOTAL_ARTISTS_ON_SPOTIFY = 2000000;
const VERIFIED_PROFILES = ['drsounds', 'alexanderforselius', 'daniel', 'spotify'];

var store = null;
requirejs(
    [  
        'events',
        'controls/hook',
        'controls/expander',
        'controls/about',
        'controls/datetime',
        'controls/toolbutton',
        'controls/apptoolbar',
        'controls/appheader',
        'controls/appfooter',
        'controls/carousel',
        'controls/chrome',
        'controls/divider',
        'controls/gondole',
        'controls/header',
        'controls/image',
        'controls/infobar',
        'controls/link',
        'controls/main',
        'controls/menu',
        'controls/menuitem',
        'controls/nowplaying',
        'controls/popularity',
        'controls/resource',
        'controls/searchform',
        'controls/sidebar',
        'controls/sidebarmenu',
        'controls/tab',
        'controls/tabbar',
        'controls/tabcontent',
        'controls/table',
        'controls/tabledatasource',
        'controls/tabledesigner',
        'controls/theme',
        'controls/title',
        'controls/toolbar',
        'controls/view',
        'controls/viewstack',
        'controls/taginput',
        'controls/formfield',
        'controls/relationfield',
        'controls/form',
        'controls/modal',
        'controls/dialog',
        'controls/list',
        'controls/post',
        'controls/app',
        'controls/select',
    ],
  function (
    EventEmitter,
    SPHookElement,
    SPExpanderElement,
    SPAboutElement,
    SPDateTimeElement,
    SPToolButtonElement,
    SPAppToolbarElement,
    SPAppHeaderElement,
    SPAppFooterElement,
    SPCarouselElement,
    SPChromeElement,
    SPDividerElement,
    SPGondoleElement,
    SPHeaderElement,
    SPImageElement,
    SPInfoBarElement,
    SPLinkElement,
    SPMainElement,
    SPMenuElement,
    SPMenuItemElement,
    SPNowPlayingElement,
    SPPopularityElement,
    SPResourceElement,
    SPSearchFormElement,
    SPSidebarElement,
    SPSidebarMenuElement,
    SPTabElement,
    SPTabBarElement,
    SPTabContentElement,
    SPTableElement,
    SPTableDataSource,
    SPTableDesigner,
    SPThemeElement,
    SPTitleElement,
    SPToolbarElement,
    SPViewElement,
    SPViewStackElement,
    SPTagInputElement,
    SPFormFieldElement,
    SPRelationFieldElement,
    SPFormElement,
    SPModalElement,
    SPDialogElement,
    SPListElement,
    SPPostElement,
    SPAppElement,
    SPSelectElement
) {
    localStorage.setItem("showHeaders", true);
    document.registerElement('sp-viewstack', SPViewStackElement);
    document.registerElement('sp-hook', SPHookElement);
    document.registerElement('sp-expander', SPExpanderElement);
    document.registerElement('sp-datetime', SPDateTimeElement);
    document.registerElement('sp-toolbutton', SPToolButtonElement);
    document.registerElement('sp-apptoolbar', SPAppToolbarElement);
    document.registerElement('sp-taginput', SPTagInputElement);
    document.registerElement('sp-chrome', SPChromeElement);
    document.registerElement('sp-view', SPViewElement);
    document.registerElement('sp-about', SPAboutElement);
    document.registerElement('sp-appheader', SPAppHeaderElement);
    document.registerElement('sp-appfooter', SPAppFooterElement);
    document.registerElement('sp-carousel', SPCarouselElement);
    document.registerElement('sp-divider', SPDividerElement);
    document.registerElement('sp-gondole', SPGondoleElement);
    document.registerElement('sp-header', SPHeaderElement);
    document.registerElement('sp-image', SPImageElement);
    document.registerElement('sp-infobar', SPInfoBarElement);
    document.registerElement('sp-link', SPLinkElement);
    document.registerElement('sp-main', SPMainElement);
    document.registerElement('sp-menu', SPMenuElement);
    document.registerElement('sp-menuitem', SPMenuItemElement);
    document.registerElement('sp-nowplaying', SPNowPlayingElement);
    document.registerElement('sp-popularity', SPPopularityElement);
    document.registerElement('sp-resource', SPResourceElement);
    document.registerElement('sp-searchform', SPSearchFormElement);
    document.registerElement('sp-sidebar', SPSidebarElement);
    document.registerElement('sp-sidebarmenu', SPSidebarMenuElement)
    document.registerElement('sp-tab', SPTabElement);
    document.registerElement('sp-tabbar', SPTabBarElement);
    document.registerElement('sp-tabcontent', SPTabContentElement);
    document.registerElement('sp-table', SPTableElement);
    document.registerElement('sp-theme', SPThemeElement);
    document.registerElement('sp-title', SPTitleElement);
    document.registerElement('sp-toolbar', SPToolbarElement);
    document.registerElement('sp-formfield', SPFormFieldElement);
    document.registerElement('sp-relationfield', SPRelationFieldElement);
    document.registerElement('sp-form', SPFormElement);
    document.registerElement('sp-modal', SPModalElement);
    document.registerElement('sp-dialog', SPDialogElement);
    document.registerElement('sp-list', SPListElement);
    document.registerElement('sp-post', SPPostElement);
    document.registerElement('sp-app', SPAppElement);
    document.registerElement('sp-select', SPSelectElement);
     (async () => {
         return new Promise(async (resolve, fail) => {
            let result = await fetch('/api/plugin', {
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((r) => r.json());
            /**
             * Load all plugins on start
             * */
            await requireAwait(result.objects.map(t => '/js/plugins/' + t.id + '/' + t.id + '.js'));
            
            resolve(result);
            
        document.querySelector('.body').appendChild(document.createElement('sp-chrome'));
     });
    })();
        
});1