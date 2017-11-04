define(function () {
    return class SPSearchFormElement extends HTMLElement {

        createdCallback() {
            this.form = document.createElement('form');
            this.form.innerHTML = '<span class="btn-group"><button id="btnBack" class="fa fa-arrow-left" onclick="window.goBack()"></button><button class="fa fa-arrow-right"  id="btnForward" onclick="window.goForward()"></button></span>';

            this.form.setAttribute('action', '/');
            this.form.setAttribute('method', 'GET');
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                let query = this.form.searchTextBox.value;
                 if (query.indexOf('bungalow:') != 0 && query.indexOf('spotify:') != 0) {
                    query = 'bungalow:search:' + query;
                }
                GlobalViewStack.navigate(query);
                return false;
            });
            this.form.searchTextBox = document.createElement('input');
            this.form.searchTextBox.setAttribute('type', 'search');
            this.form.searchTextBox.classList.add('form-control');
            
            this.form.searchTextBox.setAttribute('placeholder', 'search');
            this.form.appendChild(this.form.searchTextBox);
            this.form.btnSubmit = document.createElement('button');
            this.form.btnSubmit.classList.add('fa');
            this.form.btnSubmit.classList.add('fa-arrow-right');
            this.form.btnSubmit.setAttribute('type', 'submit');
            this.form.btnSubmit.style.display = 'none';
            this.form.appendChild(this.form.btnSubmit);
            this.created = true;
            this.appendChild(this.form);
        

        }
    }
})