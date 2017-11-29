define(
    [
        'controls/view',
        'plugins/buddhalow/datasources/posttabledatasource'
    ], function (
        SPViewElement,
        SPPostTableDataSource
    ) {
  
   return class SPNewsFeedViewElement extends SPViewElement {
       createdCallback() {
           this.innerHTML = '<sp-divider>Feed</sp-divider>';
           this.classList.add('sp-view');
           this.list = document.createElement('sp-list');
           this.list.dataSource = new SPPostTableDataSource();
           this.list.setAttribute('interact', true);
           this.appendChild(this.list);
           this.attributeChangedCallback('uri', null, 'bungalow:post');
       }
       attributeChangedCallback(attrName, oldVal, newVal) {
           if (attrName === 'uri') {
               this.list.type = 'sp-post';
               this.list.setAttribute('uri', newVal);
           }
       }
   } 
});