define([
    'plugins/bungalow/views/appviewstack',
    'plugins/bungalow/views/search',
    'plugins/bungalow/views/model',
    'plugins/bungalow/views/start',
    'plugins/bungalow/views/config',
    'plugins/bungalow/views/service',
    'controls/menudatasource'
], function (
    SPAppViewStackViewElement,
    SPSearchViewElement,
    SPModelViewElement,
    SPStartViewElement,
    SPConfigViewElement,
    SPServiceViewElement,
    SPMenuDataSource
) {
   document.registerElement('sp-appviewstackview', SPAppViewStackViewElement);
   document.registerElement('sp-searchview', SPSearchViewElement);
   document.registerElement('sp-modelview', SPModelViewElement);
   document.registerElement('sp-startview', SPStartViewElement);
   document.registerElement('sp-configview', SPConfigViewElement);
   document.registerElement('sp-serviceview', SPServiceViewElement);
   document.addEventListener('mainmenuload', (e) => {
        let menu = document.createElement('sp-menu');
        let sidebarmenu = document.querySelector('sp-sidebarmenu');
        sidebarmenu.label = document.createElement('label');
        sidebarmenu.label.innerHTML = _e('Bungalow');
        sidebarmenu.appendChild(sidebarmenu.label);
        sidebarmenu.appendChild(menu);
        menu.dataSource = new SPMenuDataSource(
            [
                {
                    name: _e('Start'),
                    uri: 'bungalow:internal:start'
                },
                {
                    name: _e('Settings'),
                    uri: 'bungalow:config'
                },
                {
                    name: _e('Services'),
                    uri: 'bungalow:service'
                }
            ]
        );
   });
    document.addEventListener('viewstackloaded', () => {
    
        GlobalViewStack.registeredViews.push({
            tag: 'sp-configview',
            regex: /^bungalow:config?$/g
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-appviewstackview',
            regex: /^bungalow:app:(.*)?$/g
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-serviceview',
            regex: /^bungalow:service?$/g
        });
    });
});