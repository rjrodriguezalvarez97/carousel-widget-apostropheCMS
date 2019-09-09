apos.define('product-widgets', {
    extend: 'apostrophe-module',
    construct: function(self, options) {
      self.play = function($widget, data, options) {
        $widget.find('.owl-carousel').owlCarousel();
      };
    }
  });