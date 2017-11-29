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
                this.form = this.querySelector('form');
                this.select = this.querySelector('sp-select');
                
                // TODO Separate this code from the logic
                
                this.select = this.querySelector('sp-select');
                if (!!this.select) {
                    this.select.dataSource = this.state.object.selectDataSource;
                    this.select.setAttribute('uri', 'bungalow:post');
                }
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    debugger;
                    let post = {
                        description: this.form.querySelector('textarea').value,
                        profileId: this.select.value
                    };
                    this.list.dataSource.push(post);
                    return false;
                })
            } catch (e) {
                alert(e);
            }
        }
    }
})