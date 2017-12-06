define(['plugins/radio/mashcast.js'], function (Mashcast) {
   return class SPRadioElement extends HTMLElement {
       createdCallback() {
            this.mashcast = new Mashcast();
       }
   } 
});