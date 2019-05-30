<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package kardealer
 * @subpackage For_dummies
 * @since car dealer 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="wrapper">
<div id="page" class="site">
	<div class="site-inner">
		<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'kardealer' ); ?></a>
    <?php
    $kardealer_header_style = trim(get_theme_mod('kardealer_header_style','1'));
    $kardealer_header_style = esc_attr($kardealer_header_style);
    if( !is_front_page())
      $kardealer_header_style = '2'; 
      
    global $template;
    $kardealertemplete = wp_basename($template);
    if($kardealertemplete <> 'full-width.php')
      $kardealer_header_style = '2';     
      
      
      
    if ($kardealer_header_style == '1')
    {     
     ?>   
        <div id="billwrapbackground">
              <div id="billtext100">
                  <?php
                     $kardealer_header_text_bottom = trim(get_theme_mod('kardealer_header_text_bottom','A car for everyone!'));
                     esc_attr_e($kardealer_header_text_bottom,"kardealer");
                  ?>
              </div>      
        </div>  <!-- billwrapbackground --> 
    <?php } ?> 
        	<header id="masthead" class="site-header" role="banner">
			<div class="site-header-main">
              <div id="top_header" >
                     <div id="header_top_left" >
                        <?php 
                          $kardealer_icon_color = trim(get_theme_mod('kardealer_topinfo_color','gray'));
                          $kardealer_topinfo_color = esc_attr($kardealer_icon_color);
                          $kardealer_topinfo_email = trim(get_theme_mod('kardealer_topinfo_email',''));
                          $kardealer_topinfo_email = esc_attr($kardealer_topinfo_email);
                          $kardealer_topinfo_phone = trim(get_theme_mod('kardealer_topinfo_phone',''));
                          $kardealer_topinfo_phone = esc_attr($kardealer_topinfo_phone);
                          $kardealer_topinfo_hours = trim(get_theme_mod('kardealer_topinfo_hours',''));
                          $kardealer_topinfo_hours = esc_attr($kardealer_topinfo_hours);
if(!empty($kardealer_topinfo_phone) or !empty($kardealer_topinfo_email) or !empty($kardealer_topinfo_hours)    )
{
                   if ( is_customize_preview() ) : ?>
                    <span class="customize-partial-edit-shortcut">
                    <button class="customizer-edit" data-control='{ "name":"kardealer_show_top_header" } '>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z"></path></svg>
                    </button>
                    </span>
                  <?php endif; 
}
                          if(!empty($kardealer_topinfo_phone))
                          {
                             echo '<span class="genericon genericon-phone" title="genericon-phone"></span>';
                             echo '<div id="kardealer_topinfo_text">'.esc_attr($kardealer_topinfo_phone).'</div>';
                          }
                          if(!empty($kardealer_topinfo_email))
                          {
                                    echo '<span class="genericon genericon-mail" title="genericon-mail"></span>';
                                    echo '<div id="kardealer_topinfo_text">';
                                    echo '<a href="mailto:';
                                    echo $kardealer_topinfo_email;
                                    echo '">';
                                    echo $kardealer_topinfo_email;
                                    echo '</a>';
                                    echo '</div>';
                          }
                          if(!empty($kardealer_topinfo_hours))
                          {
                                      echo '<span class="genericon genericon-time"></span>';
                                      echo '<div id="kardealer_topinfo_text">'.esc_attr($kardealer_topinfo_hours).'</div>';
                          }
                          ?>
            </div>   
                 <div id="header_top_right">
            			<?php if ( has_nav_menu( 'social' ) ) : ?>
							<nav id="social-navigation" class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'kardealer' ); ?>">
								<?php
									wp_nav_menu( array(
										'theme_location' => 'social',
										'menu_class'     => 'top-social-links-menu',
										'depth'          => 1,
										'link_before'    => '<span class="screen-reader-text">',
										'link_after'     => '</span>',
									) );
								?>
							</nav><!-- .social-navigation -->
						<?php endif; ?>
                </div>             
           </div>    
             <div class="kardealer_my_shopping_cart"> 
             <?php global $woocommerce;
                if (isset($woocommerce)) {
                    if ( is_customize_preview() ) : ?>
                    <span class="customize-partial-edit-shortcut customize-partial-edit-shortcut-custom_logo">
                     <button class="customizer-edit" data-control='{ "name":"kardealer_header_cart_color" } ''>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z"></path></svg>
                     </button>
                     </span>
                    <?php endif; 
                    // get cart quantity
                    $qty = $woocommerce->cart->get_cart_contents_count();
                    // get cart total
                    $total = $woocommerce->cart->get_cart_total();
                    // get cart url
                    $cart_url = esc_url($woocommerce->cart->get_cart_url());
                    // http://genericons.com/
                    if ($qty > 0)
                        {
                            echo '<a href="' . $cart_url. '">';
                            echo '<span class="genericon genericon-cart" id="kardealer_shopicon" title="genericon-cart"></span>';
                            echo '</a>';
                        }
                    // if multiple products in cart
                    if ($qty > 1)
                        echo '<a href="' . $cart_url . '">' . ' ' . $qty . _e( 'products', 'kardealer' ).'  |  ' . $total .
                            '</a>';
                    // if single product in cart
                    if ($qty == 1)
                        echo '<a href="' . $cart_url . '">'. _e( '1 product', 'kardealer' ). '  |  ' . $total . '</a>';
                } ?> 
            </div> <!-- #kardealer_shopping_cart --> 
				<div class="site-branding">
					<?php kardealer_the_custom_logo(); ?>
                    <?php
                    $kardealer_header_text_bill = trim(get_theme_mod('header_text_bill','1'));
                    $kardealer_header_text_bill = esc_attr($kardealer_header_text_bill);
                    if ($kardealer_header_text_bill == '1')
                    {
    				    if ( is_front_page() && is_home() ) : ?>
    						<h1 class="site-title-text"><a class="site-title-text" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
    					<?php else : ?>
    						<p class="site-title-text"><a class="site-title-text" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
    					<?php endif;
    					$description = get_bloginfo( 'description', 'display' );
                        if ( $description || is_customize_preview() ) : ?>
    						<p class="site-description"><?php 
                              echo $description; 
                            ?></p>
                        <?php endif; 
                    }
                    ?>
				</div><!-- .site-branding -->
				<?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) : ?>
					<button id="menu-toggle" class="menu-toggle"><?php _e( 'Menu', 'kardealer' ); ?></button>
				<?php endif; ?>
                	<div id="site-header-menu" class="site-header-menu">
                        <?php //if ( has_nav_menu( 'primary' ) ) : ?>
							<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'kardealer' ); ?>">
								<?php
									wp_nav_menu( array(
										'theme_location' => 'primary',
                                        'fallback_cb'    => 'kardealer_fallback_menu',
										'menu_class'     => 'primary-menu',
									 ) );
								?>
							</nav><!-- .main-navigation -->
						<?php //endif; ?>
					</div><!-- .site-header-menu -->
                    
                    
                  <div id="kardealer_searchform">       
                  <?php get_search_form( ); ?>
                  </div>                   
                    
                    
			</div><!-- .site-header-main -->
		</header><!-- .site-header -->
		<div id="content" class="site-content">