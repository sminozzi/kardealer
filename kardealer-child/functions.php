<?php
if ( !defined( 'ABSPATH' ) ) exit;
if ( !function_exists( 'kardealer_cfg_parent_css' ) ):
    function kardealer_cfg_parent_css() {
        wp_enqueue_style( 'kardealer_cfg_parent', trailingslashit( get_template_directory_uri() ) . 'style.css', array( 'genericons' ) );
    }
endif;
add_action( 'wp_enqueue_scripts', 'kardealer_cfg_parent_css', 10 );
