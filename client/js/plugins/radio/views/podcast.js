define(['controls/view'], function (SPViewElement) {
    class SPSpotifyStartViewElement extends SPViewElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        navigate() {

        }
        createdCallback() {
            this.classList.add('container');
            this.innerHTML += '<sp-divider>' + _e('Playlists') + '</sp-divider>';
            this.innerHTML += '<sp-flow uri="spotify:category"></sp-flow>';
        }
    }
    return SPCategoriesViewElement;
});