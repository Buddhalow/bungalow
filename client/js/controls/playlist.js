define(['controls/resource', 'controls/list'], function (SPResourceElement, SPListElement) {

    function swatchToColor(color) {
        return 'rgba(' + color.rgb[0] + ',' + color.rgb[1] + ',' + color.rgb[2] + ', 0.3)';
    }


    function rgbToRgba(rgb, alpha) {
        let str = 'rgba';
        let tf = rgb.split('(')[1].split(')')[0].split(',');
        str += '(' + tf + ',' + alpha + ')';
        return str;

    }

    return class SPPlaylistElement extends SPListElement {
        attachedCallback() {
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {

                let result = await store.request('GET', newVal);
                this.setState(result);
            }
        }
        renderTable(obj, dataContextUri) {
            
            
            this.table = document.createElement('sp-table');
            this.table.setAttribute('fields', 'name,artists,album,user,added_at');
            this.table.setAttribute('data-context-artist-uri', dataContextUri);
            this.table.setAttribute('uri', obj.uri + ':track');
        }
        vibrance() {
            let img = document.createElement('img');
            img.crossOrigin = '';
            img.src = this.object.images[0].url;
            img.onload = () => {

                var vibrant = new Vibrant(img);
                let color = vibrant.swatches()['Vibrant'];
                let light = vibrant.swatches()['LightVibrant'];
                let muted = vibrant.swatches()['Muted'];

                let bgColor = swatchToColor(color);

                //    this.view.style.backgroundColor = bgColor;
                let background = 'linear-gradient(-90deg, ' + swatchToColor(color) + ' 0%, ' + swatchToColor(muted) + ' 10%)';
                this.view.style.background = background;
            }
        }
    }

})