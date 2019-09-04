module.exports = {
  extend: "apostrophe-widgets",
  label: "Product Carousel",
  addFields: [],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      self.pushAsset("script", "always", { when: "always" });
      self.pushAsset("stylesheet", "always", { when: "always" });
    };

    var superLoad = self.load;
    self.load = (req, widgets, callback) => {
      return superLoad(req, widgets, async err => {
        if (err) {
          return callback(err);
        }

        req.data.products = await self.apos.docs
          .getManager("product")
          .find({})
          .projection({ title: 1, price: 1, image: 1 })
          .toArray();
        return callback(null);
      });
    };
  }
};
