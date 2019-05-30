<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package kardealer
 * @subpackage For_dummies
 * @since car dealer 1.0
 */
?>
		</div> <!-- .site-content -->
	</div><!-- .site-inner -->
   <footer id="colophon" class="site-footer" role="contentinfo">
   <div class="footer-container">
   <div class="footer-column-one">
       	<?php if ( is_active_sidebar( '1-footer' ) ) : ?>
			<div id="widget-area1" class="widget-area" role="complementary">
				<?php dynamic_sidebar( '1-footer' ); ?>
			</div><!-- .widget-area -->
		<?php endif; ?>
   </div>
   <div class="footer-column-two">
      	<?php if ( is_active_sidebar( '2-footer' ) ) : ?>
			<div id="widget-area2" class="widget-area" role="complementary">
				<?php dynamic_sidebar( '2-footer' ); ?>
			</div><!-- .widget-area -->
		<?php endif; ?>
   </div>
   <div class="footer-column-three">
      	<?php if ( is_active_sidebar( '3-footer' ) ) : ?>
			<div id="widget-area3" class="widget-area" role="complementary">
				<?php dynamic_sidebar( '3-footer' ); ?>
			</div><!-- .widget-area -->
		<?php endif; ?>
   </div>
   </div> 
   </footer>  
			<div class="site-info">
				<?php
					/**
					 * Fires before the kardealer footer text for footer customization.
					 *
					 * @since Theme car dealer 1.0
					 */
					do_action( 'kardealer_credits' );
    $my_footer_copyright = get_theme_mod('kardealer_footer_copyright');
    if ( is_customize_preview() ) : ?>
        <span class="customize-partial-edit-shortcut">
        <button class="customizer-edit" data-control='{ "name":"kardealer_footer_copyright" } '>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z"></path></svg>
        </button>
        </span>
    <?php endif; 
             if(!empty($my_footer_copyright))
             { echo kardealer_sanitizehtml($my_footer_copyright); }
              else
              { echo __('Powered by  kardealertheme.com','kardealer'); }
 ?>         
			</div><!-- .site-info -->
</div><!-- .site -->
</div><!-- wrapper -->

<?php
  if (get_theme_mod('kardealer_back_to_top', '1') == '1')
  { ?>
    <div class="back-to-top-row">       
    <a href="#" class="back-to-top">
    <?php esc_attr_e( 'Back to Top', 'kardealer' ); ?></a>
    </div>
<?php } ?>



</body>
<?php wp_footer(); ?>
</html>