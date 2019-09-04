module.exports = {
    extend: 'apostrophe-widgets',
    label: 'Product',
    addFields: [
        {
            name: '_products',
            type: 'joinByArray',
            withType: 'product',
            label: 'Choose a product',
            required: true,
            idsField: 'productId',
            filters: {
                projection: {
                    title: 1,
                    price: 1,
                    image: 1,
                    _url: 1,

                }
            }
        },
    ],
    construct: function(self, options) {
        var superPushAssets = self.pushAssets;
        self.pushAssets = function() {
          superPushAssets();
          self.pushAsset('script', 'always', {when: 'always'});
          self.pushAsset('stylesheet', 'always', {when: 'always'});
        };
      }


};

  
  