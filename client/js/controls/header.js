define([], function () {
	return class SPHeaderElement extends HTMLElement {
        createdCallback() {
            this.created = true;
            this.classList.add('header');
            window.GlobalTabBar.titleVisible  = false;
           
            this.tabBar = document.createElement('sp-tabbar');
            this.tabBar.classList.add('sp-2014');
            this.tabBar.classList.add('sp-2013');
            this.created = true;
            let innerHTML = _.unescape(document.querySelector('#headerTemplate').innerHTML);
            let template = _.template(innerHTML);
            this.innerHTML = '';
           
        
        }
        attachedCallback() {
            
            this.vibrant();
        }
        checkBounds() {
            let headerBounds = this.getBoundingClientRect();
            let viewBounds = this.parentNode.getBoundingClientRect();
            window.GlobalTabBar.titleVisible = (headerBounds.top < viewBounds.top - (headerBounds.height * 0.5));
            console.log(headerBounds.top, viewBounds.top);
            if (this.parentNode.scrollTop > headerBounds.height / 2) {
                this.classList.add('sp-fixed-top');
                /*this.style.left = viewBounds.left + 'px';
                this.style.width = viewBounds.width + 'px';
                */
            } else {
                this.style.left = 0;
                this.style.width = 'auto';
                this.classList.remove('sp-fixed-top');
                
            }
        }
        attachedCallback() {
             this.parentNode.addEventListener('scroll', (e) => {
                this.checkBounds();
            });
            this.checkBounds();
            insertAfter(this.tabBar, this);
            
            if (localStorage.getItem('showHeaders') != 'true') {
                this.style = 'display: none !important';
            } else {
                
                this.style = 'display: block !important';
            }
        }
        setState(object) {
            if (object == null) return;
            let size = getComputedStyle(document.body).getPropertyValue("--image-size");
            let width = size;
            let height = size;  
            let titleElement = document.createElement('sp-title');
            titleElement.setState(object);
            
            if (object.images instanceof Array )
            object.image_url = object.images && object.images.length > 0 && object.images[0].url ? object.images[0].url : '';
            let strFollowers = '';
            if ('followers' in object) {
                strFollowers = numeral(object.followers.total).format('0,0') + ' followers';
            }
            let innerHTML = _.unescape(document.querySelector('#headerTemplate').innerHTML);
            let template = _.template(innerHTML);
            this.innerHTML = template({
                object: object,
                size: size,
                width: width,
                type: object.type,
                height: height,
                title: titleElement.innerHTML,
                strFollowers: strFollowers  
            });
            
            let image = this.querySelector('sp-image');
            if (!!image)
                image.setState(object);
            /* if ('followers' in object) {
                let pop = '';
                 if (object.popularity) {
                     pop = '<hr><h3>#' + numeral( TOTAL_ARTISTS_ON_SPOTIFY - (TOTAL_ARTISTS_ON_SPOTIFY * ((object.popularity) / 100))).format('0,0') + '</h3><br>' + _('In he world');
                }
                this.innerHTML += '<div style="flex: 0 0 50pt;"> <h3>' + numeral(object.followers.total).format('0,0') + '</h3><br> ' + _('followers') + '<br> ' + pop + ' </div>';
               
            } */
            if (object.buttons instanceof Array)
            object.buttons.map((btn, i) => {
                if (btn == null) return;
                let button = document.createElement('button');
                button.classList.add('btn');
                if (i == 0)
                button.classList.add('btn-primary');
                button.addEventListener('click', btn.onClick);
                button.innerHTML = btn.label;
                this.querySelector('sp-toolbar').appendChild(button);
                
                
            })
            let followButton = document.createElement('button');
            followButton.classList.add('btn');
            followButton.innerHTML = _e('Follow');
            let menuButton = document.createElement('button');
            menuButton.innerHTML = '...';
            menuButton.classList.add('btn');
            menuButton.classList.add('btn-round');
           // this.querySelector('sp-toolbar').appendChild(followButton);
            this.querySelector('sp-toolbar').appendChild(menuButton);
            this.object = object;
            window.GlobalTabBar.setState({
                objects: [
                    {
                        id: 'overview',
                        name: object.name
                    }
                ]
            });
            this.vibrant();
            document.documentElement.style.setProperty('--model-image-url', 'transparent');
            document.documentElement.style.setProperty('--model-header-background', 'transparent');
            if (object.images instanceof Array && object.images.length > 0) {
                document.documentElement.style.setProperty('--model-image-url', 'url("' + object.images[0].url + '")');
                document.documentElement.style.setProperty('--model-header-image', 'url("' + object.images[0].url + '")');
            } 
        }
        vibrant() {
            let object = this.object;
            if (!this.object) return;
            
            if (object.images instanceof Array && object.images.length > 0) {
                let imageUrl = object.images[0].url;
                let img = document.createElement('img');
                img.crossOrigin = '';
                img.src = imageUrl;
                img.onload = () => {
                
                    var vibrant = new Vibrant(img);
                    let color = vibrant.swatches()['Vibrant'];
                    let mutedColor = vibrant.swatches()['Muted'];
                    let lightVibrant = vibrant.swatches()['DarkVibrant'];
                    let bg = 'rgba(' + color.rgb[0] + ',' + color.rgb[1] + ',' + color.rgb[2] + ', 0.05)';
                    let muted  = 'rgba(' + mutedColor.rgb[0] + ',' + mutedColor.rgb[1] + ',' + mutedColor.rgb[2] + ', 0,05)';
                    let primary = 'rgba(' + color.rgb[0] + ',' + color.rgb[1] + ',' + color.rgb[2] + ', 1)';
                    let secondary  = 'rgba(' + mutedColor.rgb[0] + ',' + mutedColor.rgb[1] + ',' + mutedColor.rgb[2] + ', 1)';
                    if (!lightVibrant) {
                        debugger;
                       lightVibrant = vibrant.swatches()['LightVibrant'];
                    }
                    let lightVibrantColor  = 'rgba(' + lightVibrant.rgb[0] + ',' + lightVibrant.rgb[1] + ',' + lightVibrant.rgb[2] + ', 1)';
                  //  this.parentNode.style.backgroundColor = bg;
                    //window.GlobalTabBar.style.backgroundColor = bg;
                    document.documentElement.style.setProperty('--vibrant-color', bg);
                    if (window.GlobalChromeElement.theme.flavor == 'light') {
                    document.documentElement.style.setProperty('--primary-color', secondary);
                    document.documentElement.style.setProperty('--secondary-color',  lightVibrantColor);
                    } else {
                        
                    document.documentElement.style.setProperty('--primary-color', lightVibrantColor);
                    document.documentElement.style.setProperty('--secondary-color', secondary);
                    }
                
                }
            }
        }
    }
})