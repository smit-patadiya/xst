/*(function($) {

	var orderTotalEl = $( '.order-total .woocommerce-Price-amount' ),
		orderTotalString = orderTotalEl.html(),
		orderTotal = orderTotalString.match(/\d+/g).map(Number),
		orderTotalWithDelivery;
		orderTotal = orderTotal[0];

	$( '.wccpf-field' ).change( function() {

		var selectedValue = this.value.toLowerCase(),
			deliveryCharge = 0;
		if ( 'standard delivery' === selectedValue ) {
			deliveryCharge = 0.00;
		} else if ( 'early morning delivery' === selectedValue ) {
			deliveryCharge = 150.00;
		} else if ( 'midnight delivery' === selectedValue ) {
			deliveryCharge = 200.00;
		}

		orderTotalWithDelivery = deliveryCharge + orderTotal;
		orderTotalWithDelivery = orderTotalWithDelivery.toString();
		console.log( orderTotalWithDelivery );
		if ( orderTotalWithDelivery ) {
			orderTotalEl.html( '<span class="woocommerce-Price-currencySymbol" >₹</span>&nbsp;' + orderTotalWithDelivery );
		}

	});

})(jQuery);*/
