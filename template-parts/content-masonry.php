<?php
/**
 * The template part for displaying content
 *
 * @package kardealer
 * @subpackage Boat_seller
 * @since boat seller 1.0
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<div class="col-sm-4 col-xs-12 kardealer_masonry_thumbnail"> 
  	<?php if ( ! post_password_required() && ! is_attachment() && has_post_thumbnail() ) { ?>
		<div class="entry-thumbnail2">
			<div class="post-media post-thumb">
				<a href="<?php echo esc_url( get_permalink() ); ?>"><?php the_post_thumbnail(  array(450, 450) ); ?></a>
			</div>
          <?php  // kardealer_entry_meta(); ?>
		</div>
	<?php } ?>
	<div class="entry-body2">
		<div class="blog-entry-content2">
			<?php 
   			the_title( sprintf( '<h1><a href="%s" rel="bookmark">',
				esc_url( get_permalink() ) ),
				'</a></h1><br>' ); 
            $content = strip_tags(get_the_content_with_formatting());
            if(strlen($content) > 300)
              {
                $content = trim(substr($content, 0,300));
                $pos = strrpos($content,' ');
                $content = substr($content, 0, $pos);
                $content .= '<br><br><a href="'.get_permalink().'">'. __("Read more","kardealer").'</a><br><br>';
              }
            echo $content;
            ?>
		</div>
        <div id = "kardealer_blog_resumo">
        <?php   
          kardealer_entry_meta(); 
        ?>
        </div>          
		<div class="entry-aux">
			<?php
			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . esc_html__( 'Pages:',
						'kardealer' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
				'pagelink'    => '<span class="screen-reader-text">' . esc_html__( 'Page', 'kardealer' ) . ' </span>%',
			) );
			?>
		</div>
   </div>    
</div>     
</article>