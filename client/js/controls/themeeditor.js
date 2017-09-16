define(function () {
    return class SPThemeEditorElement extends HTMLElement {
        createdCallback() {
            if (!this.created) {
                this.colorChooser = document.createElement('input');
                this.colorChooser.setAttribute('type', 'range');
                this.innerHTML += '<label>' + _('Accent color') + '</label>';
                this.appendChild(this.colorChooser);
                this.colorChooser.setAttribute('max', 360);
                this.colorChooser.addEventListener('change', this.hueSlider);
                this.colorChooser.addEventListener('mousemove', this.hueSlider);
                this.saturationChooser = document.createElement('input');
                this.saturationChooser.setAttribute('type', 'range');
                this.label = document.createElement('label');
                this.label.innerHTML = _('Saturation');
                this.appendChild(this.saturationChooser);
                this.appendChild(this.label);
                this.saturationChooser.setAttribute('max', 360);
                this.saturationChooser.value = store.saturation;
                this.styleselect = document.createElement('select');
                
                this.appendChild(this.styleselect);
                this.styleselect.innerHTML = '<option value="">Select a theme</option>';
                this.flavorselect = document.createElement('select');
                this.flavorselect.innerHTML = '<option value="">Select a flavor</option>';
                this.flavorselect.innerHTML += '<option value="dark">' + _e('Dark') + '</option><option value="light">' + _e('Light') + '</option>';
                fetch('/api/theme', {
                    credentials: "same-origin"
                }).then((response) => response.json()).then((result) => {
                    result.objects.map((o) => {
                        let option = document.createElement('option');
                        option.setAttribute('value', o.id);
                        if (o.id == localStorage.getItem('stylesheet')) {
                            option.setAttribute('selected', 'selected');
                        }
                        option.innerHTML = _e(o.name);
                        this.styleselect.appendChild(option);
                    });
                });
                this.appendChild(this.flavorselect);
                this.saturationChooser.addEventListener('change', this.saturationSlider);
                this.saturationChooser.addEventListener('mousemove', this.saturationSlider);
                this.flavorselect.addEventListener('change', (e) => {
                    if (e.target.selectedIndex > 0)
                    GlobalChromeElement.flavor = e.target.options[e.target.selectedIndex].value;
                });
                this.styleselect.addEventListener('change', (e) => {
                    if (e.target.selectedIndex > 0)
                    GlobalChromeElement.stylesheet = e.target.options[e.target.selectedIndex].value;
                });
                this.created = true;

            }
        }
        hueSlider(e) {
            let value = e.target.value;
            store.hue = value;

        }
        saturationSlider(e) {
            let value = e.target.value;
            store.saturation = value;

        }
    }
});