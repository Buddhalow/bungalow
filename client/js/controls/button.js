define([], function () {
    return class SPButtonElement extends HTMLButtonElement {
        createdCallback() {
            this.setAttribute('class', 'btn waves-effect waves-light lighten-3');
        }
    }
})