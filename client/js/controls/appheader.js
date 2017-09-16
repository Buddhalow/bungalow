define(function () {
    return class SPAppHeaderElement extends HTMLElement {
        createdCallback() {
            if (!this.searchForm) {
                this.searchForm = document.createElement('sp-searchform');
                if (localStorage.getItem("stylesheet") === 'obama-2017') {
                    document.body.appendChild(this.searchForm);
                } else {
                    this.appendChild(this.searchForm);
                }
                this.searchForm.style.marginRight = '5pt';
            }
            
            this.created = true;
        
        }

    }
});