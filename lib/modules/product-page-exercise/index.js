module.exports = {        
   extend: 'apostrophe-module',        
   label: 'Product Page Exercise',        
   construct: function(self, options) {        

      self.pushAsset("stylesheet", "always", { when: "always" });

      self.on('apostrophe-pages:beforeSend', 'AddBannerDiscount', async (req) => {
         if(req.data.bestPage.type !== "banner"){
            return;
         }
         req.data.products = await self.apos.docs
                .getManager("product")
                .find(req, {})
                .projection({ title: 1, price: 1, image: 1 })
                .toArray();
      })

   }   
};