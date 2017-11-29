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
           
           this.classList.add('sp-view');
           this.list = document.createElement('sp-list');
           this.list.dataSource = new SPPostTableDataSource();
           
           this.appendChild(this.list);
           this.attributeChangedCallback('uri', null, 'bungalow:newsfeed');
       }
       attributeChangedCallback(attrName, oldVal, newVal) {
           if (attrName === 'uri') {
               this.list.type = 'sp-post';
               this.list.setAttribute('uri', newVal);
           }
       }
   } 
});