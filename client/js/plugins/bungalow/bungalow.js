define([
    'plugins/bungalow/views/appviewstack',
    'plugins/bungalow/views/search',
    'plugins/bungalow/views/model',
    'plugins/bungalow/views/start',
    'plugins/bungalow/views/config',
    'plugins/bungalow/views/hashtag',
    'plugins/bungalow/views/service',
    'plugins/bungalow/views/plugin',
    'controls/menudatasource'
], function (
    SPAppViewStackViewElement,
    SPSearchViewElement,
    SPModelViewElement,
    SPStartViewElement,
    SPConfigViewElement,
    SPHashtagViewElement,
    SPServiceListViewElement,
    SPPluginListViewElement,
    SPMenuDataSource
) {
   document.registerElement('sp-appviewstackview', SPAppViewStackViewElement);
   document.registerElement('sp-bungalowsearchview', SPSearchViewElement);
   document.registerElement('sp-modelview', SPModelViewElement);
   document.registerElement('sp-startview', SPStartViewElement);
   document.registerElement('sp-hashtagview', SPHashtagViewElement);
   document.registerElement('sp-configview', SPConfigViewElement);
   document.registerElement('sp-servicelistview', SPServiceListViewElement);
   document.registerElement('sp-pluginlistview', SPPluginListViewElement);
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
                },
                {
                    name: _e('Plugins'),
                    uri: 'bungalow:plugin'
                }
            ]
        );
   });
    document.addEventListener('viewstackloaded', () => {
    
        GlobalViewStack.registeredViews.push({
            tag: 'sp-configview',
            regex: /^bungalow:config?$/
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-hashtagview',
            regex: /^bungalow:hashtag:([a-zA-Z0-9]+)$/
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-appviewstackview',
            regex: /^bungalow:app:(.*)?$/
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-servicelistview',
            regex: /^bungalow:service?$/
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-pluginlistview',
            regex: /^bungalow:plugin?$/
        });
    });
});