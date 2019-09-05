var lodash = require("lodash");
module.exports = {
  extend: "apostrophe-widgets",
  label: "Product Carousel",
  addFields: [
    {
      name: "_specialists",
      label: "Specialist filter",
      type: "joinByArray",
      withType: "specialist"
    }
  ],
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

        for (let index = 0; index < widgets.length; index++) {
          var productsPerWidget = [];
          const widget = widgets[index];
          var productsPerWidgetWithDuplicates = [];

          if (widget.specialistsIds.length) {
            for (let i = 0; i < widget.specialistsIds.length; i++) {
              const specialist = widget.specialistsIds[i];

              const auxiliarProductArray = await self.apos.docs
                .getManager("product")
                .find(req, { specialistsIds: { $in: [specialist] } })
                .projection({ title: 1, price: 1, image: 1 })
                .toArray();

              productsPerWidgetWithDuplicates = Array.prototype.concat(
                productsPerWidgetWithDuplicates,
                auxiliarProductArray
              );
            }
            productsPerWidget = lodash.uniqBy(productsPerWidgetWithDuplicates, "_id");
          } else {
            productsPerWidget = await self.apos.docs
              .getManager("product")
              .find({})
              .projection({ title: 1, price: 1, image: 1 })
              .toArray();
          }
          widgets[index].products = productsPerWidget;
        }

        return callback(null);
      });
    };

  }
};
