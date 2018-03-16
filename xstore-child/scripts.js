/*jQuery( document ).ready(function() {
    var $ = jQuery;
    //Delivery Charge variation based on "Deliver Option" on product page

    if( $('.single-product').get().length > 0 ){

      $('select[name="delivery_option"]').on('change, click', function(){

          if( $('#variableDeliveryPriceWrapper').get().length < 1 ){
            $('.woocommerce-variation-price').append('<span id="variableDeliveryPriceWrapper">  + <span id="variableDeliveryPrice"></span> (Delivery Charge)</span>');
          }

          var selectedValue = this.value.toLowerCase();
          var deliverCharge = 0;

          if(selectedValue === 'standard delivery'){
              deliverCharge = '0.00';
          }else if(selectedValue === 'early morning delivery'){
            deliverCharge = '150.00';
          }else if(selectedValue === 'midnight delivery'){
            deliverCharge = '200.00';
          }

          jQuery('#variableDeliveryPrice').html('₹ '+deliverCharge);
      });

    }

});*/

function checkPasswordStrength($password, $strengthResult, $submitButton) {

    var password = $password.val();

    // Reset the form & meter
    $submitButton.attr('disabled', 'disabled');
    $strengthResult.removeClass('short bad good strong');

    // Get the password strength
    var strength = 0;
    var num_length = (null !== password.match(/\d+/g)) ? password.match(/\d+/g).join('').length : 0;
    var char_length = (null !== password.match(/\D+/g)) ? password.match(/\D+/g).join('').length : 0;
    var special_length = (null !== password.match(/[@#$%^&*-_.]/g)) ? password.match(/[@#$%^&*-_.]/g).join().length : 0;

    if (password.length <= 4) {
        if (char_length > 2) {
            strength += 1;
        }
        if (num_length > 0) {
            strength += 1;
        }

    } else if (password.length > 4) {
        if (char_length > 1) {
            strength += 1;
        }
        if (char_length > 3) {
            strength += 1;
        }
        if (num_length > 1) {
            strength += 1;
        }
        if (special_length > 0) {
            strength += 1;
        }
    }

    // Add the strength meter results
    switch (strength) {

        case 2:
            $strengthResult.addClass('bad').html(pwsL10n.bad);
            break;

        case 3:
            $strengthResult.addClass('good').html(pwsL10n.good);
            break;

        case 4:
            $strengthResult.addClass('strong').html(pwsL10n.strong);
            break;

        case 5:
            $strengthResult.addClass('short').html(pwsL10n.mismatch);
            break;

        default:
            $strengthResult.addClass('short').html(pwsL10n.short);

    }

    // The meter function returns a result even if pass2 is empty,
    // enable only the submit button if the password is strong and
    // both passwords are filled up
    if (3 < strength) {
        $submitButton.removeAttr('disabled');
    }

    return strength;
}

jQuery(document).ready(function($) {

    // Binding to trigger checkPasswordStrength
    $(document.body).on('keyup change', 'form.register #reg_password, form.checkout #account_password, form.edit-account #password_1, form.lost_reset_password #password_1',
        function(event) {

            if ($('.woocommerce-password-strength').get().length == 0) {
                $('<span class="woocommerce-password-strength"></span><p><small>Use at least 3 Letters, 2 Numbers, & Special Characters.</small></p>').insertAfter('form.register #reg_password, form.checkout #account_password, form.edit-account #password_1, form.lost_reset_password #password_1');
            }

            checkPasswordStrength(
                $('form.register #reg_password, form.checkout #account_password, form.edit-account #password_1, form.lost_reset_password #password_1'), // First password field
                $('.woocommerce-password-strength'), // Strength meter
                $('input[type=submit]'), // Submit button
            );
        }
    );
	
	/*Cart update on qty change*/
	if(typeof(cartUpdateTimer) != 'undefined' ){
		window.clearTimeout(cartUpdateTimer);
	}
	
	var cartUpdateTimer = function(){
		window.setTimeout(function () {
		   jQuery('.woocommerce-cart-form input[name="update_cart"]').trigger('click');
		}, 1000);
	};
	
	jQuery('body.woocommerce-cart').on('change', ' .woocommerce-cart-form .product-quantity .input-text.qty', function(){
		cartUpdateTimer();
	});
	
	jQuery('.single-product form input[name="pincode_field"]').on( "blur", function(){
        if(this.value != ""){
            jQuery('.single-product form #checkpin').trigger('click');
        }
    } );

    jQuery(".single-product form .single_add_to_cart_button").click( function(){
        
        var input_box = jQuery('.single-product form #prdd_lite_hidden_date');
        var delivery_date = jQuery(input_box).val();

        if(delivery_date != ""){
            jQuery('.single-product form #delivery_calender_lite').css('border','none');
        }else{
            event.preventDefault();
            jQuery('.single-product form #delivery_calender_lite').css('border','1px solid #fd7979');
            jQuery('.single-product form #delivery_calender_lite').focus();
        }
        return true;
    } );
	
});
