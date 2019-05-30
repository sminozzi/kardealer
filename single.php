<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package kardealer
 * @subpackage Kar_dealer
 * @since car dealer 1.0
 */

get_header(); 
$kardealer_blog_sidebar_single = trim(get_theme_mod('kardealer_show_sidebar_singlepage','1'));
$kardealer_blog_sidebar_single = esc_attr($kardealer_blog_sidebar_single);
if($kardealer_blog_sidebar_single != '1')
  echo '<div id="primary" class="content-area-full-with">';
else
  echo '<div id="primary" class="content-area-single">';
?>
	<main id="main" class="site-main" role="main">
		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();
			// Include the single post content template.
			get_template_part( 'template-parts/content', 'single' );
			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			}
			if ( is_singular( 'attachment' ) ) {
				// Parent post navigation.
				the_post_navigation( array(
					'prev_text' => _x( '<span class="meta-nav">Published in</span><span class="post-title">%title</span>', 'Parent post link', 'kardealer' ),
				) );
			} elseif ( is_singular( 'post' ) ) {
				// Previous/next post navigation.
				the_post_navigation( array(
					'next_text' => '<span class="meta-nav" aria-hidden="true">' . __( 'Next', 'kardealer' ) . '</span> ' .
						'<span class="screen-reader-text">' . __( 'Next post:', 'kardealer' ) . '</span> ' .
						'<span class="post-title">%title</span>',
					'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __( 'Previous', 'kardealer' ) . '</span> ' .
						'<span class="screen-reader-text">' . __( 'Previous post:', 'kardealer' ) . '</span> ' .
						'<span class="post-title">%title</span>',
				) );
			}
			// End of the loop.
		endwhile;
		?>
	</main><!-- .site-main -->
	<?php get_sidebar( 'content-bottom' ); ?>
</div><!-- .content-area -->
<?php 
$kardealer_blog_sidebar = trim(get_theme_mod('kardealer_show_sidebar_singlepage', '1'));
$kardealer_blog_sidebar = esc_attr($kardealer_blog_sidebar);
if ($kardealer_blog_sidebar == '1')
  get_sidebar(); 
?>
<?php get_footer(); ?>