<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package kardealer
 * @subpackage Kar_dealer
 * @since car dealer 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found">
				<header class="page-header">
					<h1 class="page-title"><?php _e( 'Oops! That page can&rsquo;t be found.', 'kardealer' ); ?></h1>
				</header><!-- .page-header -->
                  <div class="page-404">
				<img src="<?php echo esc_url(get_template_directory_uri().'/images/404.png')?>" alt="
                <?php esc_attr_e( 'Not Found', 'kardealer' ); ?>" />
			</div>
				<div class="page-content">
					<p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'kardealer' ); ?></p>

					<?php get_search_form(); ?>
				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- .site-main -->

		<?php get_sidebar( 'content-bottom' ); ?>

	</div><!-- .content-area -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
