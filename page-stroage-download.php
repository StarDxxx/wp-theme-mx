<?php
/**
 * Template name: Storage download page
 */
if(!class_exists('theme_custom_storage'))
	die(___('Lacking the class theme_custom_storage'));

$target_post = theme_custom_storage::get_decode_post();
?>
<?php get_header();?>
<div class="container grid-container">
	<div class="panel panel-default singular-download">
		<div class="panel-heading">
			<h3 class="panel-title"><i class="fa fa-file fa-fw"></i> <?= sprintf(___('You are ready to download "%s"'),'<a href="' . theme_cache::get_permalink($target_post->ID) . '">' . theme_cache::get_the_title($target_post->ID) . '</a>');?></h3>
		</div>
		<div class="panel-body">
			<div class="post-content content-reset">
				<?php 
				if(have_posts()){
					while(have_posts()){
						the_post();
						the_content();
					}
				}
				?>

				<?= theme_custom_storage::add_shortcode(null);?>
			</div>
		</div>
	</div>
</div>
<?php get_footer();?>