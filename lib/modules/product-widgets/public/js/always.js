// $(document).ready(function(){
//     $('.owl-carousel').owlCarousel();
// });

apos.define('product-widgets', {
    extend: 'apostrophe-widgets',
    construct: function(self, options) {
      self.play = function($widget, data, options) {
        $widget.find('.owl-carousel').owlCarousel();
      };
    }
  });