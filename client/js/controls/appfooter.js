define(function () {
    window.alert = function (message) {
        document.querySelector('sp-chrome').alert({
            type: 'info',
            name: message,
            uri: 'bungalow:error:0x00'
        });
        let x = 0;/*
         var i = setInterval(() => {
         x++;
         $('sp-infobar').animate({
         opacity: 0.1
         }, 50, () => {
         $('sp-infobar').animate({
         opacity: 1
         }, 50);
         });
         clearInterval(i);

         }, 100);*/
    }

    return class SPAppFooterElement extends HTMLElement {
        createdCallback() {
            this.footerHook = document.createElement('sp-hook');
            this.footerHook.setAttribute('data-hook-id', 'footer');
            this.appendChild(this.footerHook);
        }
    }



});