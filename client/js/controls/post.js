define([], function () {
    return class SPPostElement extends HTMLElement {
        createdCallback() {
            
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        render() {
            try {
                let template = _.template(_.unescape(document.querySelector('#postTemplate').innerHTML));
                this.innerHTML = template(this.state);
            } catch (e) {
                alert(e);
            }
        }
    }
})