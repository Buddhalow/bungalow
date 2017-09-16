define(function () {
    return class SPTabContentElement extends HTMLElement {
       createdCallback() {
           this.setAttribute('hidden', true);
       }
    }
})