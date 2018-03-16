<?php



function theme_enqueue_styles5() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', array('bootstrap'));


    if ( is_rtl() ) {
    	wp_enqueue_style( 'rtl-style', get_template_directory_uri() . '/rtl.css');
    }


    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style', 'bootstrap')
    );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles5' );

add_filter( 'woocommerce_ship_to_different_address_checked', '__return_true' );

/*add_filter('show_admin_bar', '__return_false');*/

function remove_footer_admin ()
{
    echo '<span id="footer-thankyou">Developed by <a href="#" target="_blank">Myrl Tech</a></span>';
}
add_filter('admin_footer_text', 'remove_footer_admin');

add_filter('gettext', 'custom_strings_translation', 20, 3);

function custom_strings_translation( $translated_text, $text, $domain ) {

  switch ( $translated_text ) {
    case 'Ship to a different address?' :
      $translated_text =  __( 'Shipping deatils', '__x__' );
      break;
  }

  return $translated_text;
}

if( ! function_exists('etheme_child_enqueue_scripts')) {
    function etheme_child_enqueue_scripts() {
        if ( ! is_admin() ) {
//					wp_enqueue_script('etheme-child', get_template_directory_uri().'-child/scripts.js',$script_depends,false,true);
					wp_register_script( 'etheme-child', get_template_directory_uri().'-child/scripts.js', array( 'etheme' ), false, true );
    			wp_enqueue_script( 'etheme-child' );
				}
		}
		wp_enqueue_script( 'xstore-child-main-js', get_template_directory_uri().'-child/mains.js', array( 'jquery' ), '', true );
}

add_action( 'wp_enqueue_scripts', 'etheme_child_enqueue_scripts', 99);

// Remove woocommerce password strength js
if( ! function_exists('wc_remove_password_strength')) {
	function wc_remove_password_strength() {
		if ( wp_script_is( 'wc-password-strength-meter', 'enqueued' ) ) {
			wp_dequeue_script( 'wc-password-strength-meter' );
			wp_enqueue_script( 'password-strength-meter' );
		}
	}
}
add_action( 'wp_print_scripts', 'wc_remove_password_strength');
//Hide SKU from product page
function wc_remove_product_page_skus( $enabled ) {
    if ( ! is_admin() && is_product() ) {
        return false;
    }

    return $enabled;
}
add_filter( 'wc_product_sku_enabled', 'wc_remove_product_page_skus' );

//Hide Additional products from category page
function wc_hide_products_category_shop( $q ) {
    $tax_query = (array) $q->get( 'tax_query' );
    $tax_query[] = array(
       'taxonomy' => 'product_cat',
       'field' => 'slug',
       'terms' => array( 'additional-gift' ), // Category slug here
       'operator' => 'NOT IN'
    );
    $q->set( 'tax_query', $tax_query );
}
add_action( 'woocommerce_product_query', 'wc_hide_products_category_shop' );

// removing the price of variable products
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);

// Change location of variable price
add_action('woocommerce_single_product_summary', 'custom_wc_template_single_price', 10);
function custom_wc_template_single_price()
	{
	global $product;

	// Variable product only
	if ($product->is_type('variable')):

		// Main Price
		$prices = array(
			$product->get_variation_price('min', true) ,
			$product->get_variation_price('max', true)
		);
		$price  = $prices[0] !== $prices[1] ? sprintf(__('%1$s', 'woocommerce') , wc_price($prices[0])) : wc_price($prices[0]);

		// Sale Price
		$prices = array(
			$product->get_variation_regular_price('min', true) ,
			$product->get_variation_regular_price('max', true)
		);
		sort($prices);
		$saleprice = $prices[0] !== $prices[1] ? sprintf(__('%1$s', 'woocommerce') , wc_price($prices[0])) : wc_price($prices[0]);
		if ($price !== $saleprice && $product->is_on_sale())
			{
			$price     = '<del>' . $saleprice . $product->get_price_suffix() . '</del> <ins>' . $price . $product->get_price_suffix() . '</ins>';
			}

?>
        <style>
            div.woocommerce-variation-price,
            div.woocommerce-variation-availability,
            div.hidden-variable-price {
                height: 0px !important;
                overflow:hidden;
                position:relative;
                line-height: 0px !important;
                font-size: 0% !important;
                visibility: hidden !important;
            }
        </style>
        <script>
            jQuery(document).ready(function($) {
                // When variable price is selected by default
                setTimeout( function(){
                    if( 0 < $('input.variation_id').val() && null != $('input.variation_id').val() ){
                        if($('p.availability'))
                            $('p.availability').remove();

                        $('p.price').html($('div.woocommerce-variation-price > span.price').html()).append('<p class="availability">'+$('div.woocommerce-variation-availability').html()+'</p>');
                    }
                }, 300 );

                // On live variation selection
                $('select').blur( function(){
                    if( 0 < $('input.variation_id').val() && null != $('input.variation_id').val() ){
                        if($('.price p.availability') || $('.price p.stock') )
                            $('p.price p').each(function() {
                                $(this).remove();
                            });

                        $('p.price').html($('div.woocommerce-variation-price > span.price').html()).append('<p class="availability">'+$('div.woocommerce-variation-availability').html()+'</p>');

                    } else {
                        $('p.price').html($('div.hidden-variable-price').html());
                        if($('p.availability'))
                            $('p.availability').remove();
                    }
                });
            });
        </script>
        <?php
		echo '<div class="hidden-variable-price" >' . $price . '</div>';

	endif;
	}

