define([
    'plugins/buddhalow/views/newsfeed',
    'plugins/buddhalow/views/profile',
    'plugins/buddhalow/views/post',
    'plugins/buddhalow/views/hashtag',
    'controls/menudatasource',
    ], function (
        SPNewsFeedViewElement,
        SPProfileViewElement,
        SPPostViewElement,
        SPBuddhalowHashtagViewElement,
        SPMenuDataSource
    ) {
              
        document.registerElement('sp-profileview', SPProfileViewElement);
        document.registerElement('sp-newsfeedview', SPNewsFeedViewElement);
        document.registerElement('sp-postview', SPPostViewElement);
        document.registerElement('sp-buddhalowhashtagview', SPBuddhalowHashtagViewElement);
      
        document.addEventListener('mainmenuload', (e) => {
            
        let sidebarmenu = document.querySelector('sp-sidebarmenu');
        sidebarmenu.menu = document.createElement('sp-menu');
        sidebarmenu.label = document.createElement('label');
        sidebarmenu.label.innerHTML = _e('Buddhalow');
        sidebarmenu.appendChild(sidebarmenu.label);
        sidebarmenu.appendChild(sidebarmenu.menu);
        sidebarmenu.menu.dataSource = new SPMenuDataSource(
            [
                {
                    name: _e('Feed'),
                    icon: 'home',
                    uri: 'bungalow:newsfeed'
                }
            ]
        );
    });
    
       document.addEventListener('hook_startviewbottom', (e) => {
           let hook = document.querySelector('sp-hook[data-hook-id="startviewbottom"]');
           let view = document.createElement('sp-newsfeedview');
           hook.appendChild(view);
           
       })
       document.addEventListener('hook_hashtag_view', (e) => {
           let hook = document.querySelector('sp-hook[data-hook-id="hashtag_view"]');
           let view = document.createElement('sp-buddhalowhashtagview');
           hook.appendChild(view);
           
       })
    document.addEventListener('viewstackloaded', () => {
    
        GlobalViewStack.registeredViews.push({
            tag: 'sp-newsfeedview',
            regex: /^bungalow:newsfeed$/
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-profileview',
            regex: /^bungalow:profile:([a-zA-Z0-9\\.\\_]+)$/
        });
        GlobalViewStack.registeredViews.push({
            tag: 'sp-postview',
            regex: /^bungalow:post:([a-zA-Z0-9]+)$/
        });
    });
  
})