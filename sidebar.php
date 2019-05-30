<?php
/**
 * The template for the sidebar containing the main widget area
 *
 * @package kardealer
 * @subpackage Kar_dealer
 * @since car dealer 1.0
 */
?>

<?php if ( is_active_sidebar( 'sidebar-1' )  ) : ?>
	<aside id="secondary" class="sidebar widget-area" role="complementary">
	
    
    <?php
    if ( is_customize_preview() ) : ?>
        <span class="customize-partial-edit-shortcut customize-partial-edit-shortcut-custom_logo">
        <button class="customizer-edit" data-control='{ "name":"kardealer_sidebar" } ''>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z"></path></svg>
        </button>
        </span>
    <?php endif;

    
    dynamic_sidebar( 'sidebar-1' ); ?>
	</aside><!-- .sidebar .widget-area -->
<?php endif; ?>
