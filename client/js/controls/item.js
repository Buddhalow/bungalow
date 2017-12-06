define(['plugins/spotify/controls/resource', 'plugins/spotify/store'], function (SPResourceElement, store) {

    return class SPItemElement extends SPResourceElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        render(state) {
           this.innerHTML = '<sp-link uri="' + state.uri + '"><sp-image src="' + state.images[0].url + '"><div class="title"><sp-link  uri="' + state.uri + '">' + state.name.substr(0, 30) + '</sp-link></div></sp-image></sp-link>';
           
        
        }
        setState(obj) {
            this.render(obj);
        }
    }
  
});