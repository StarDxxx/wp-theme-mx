<div id="sidebar-container" class="col-md-4 col-sm-12">
<div id="sidebar" class="widget-area" role="complementary">
<?php if(!theme_cache::dynamic_sidebar('widget-area-author')){
	?>
	<div class="col-xs-12">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="page-tip">
					<?php echo status_tip('info', ___('Please set some widgets in author page.'));?>
				</div>
			</div>
		</div>
	</div>
<?php } ?>
</div><!-- /.widget-area -->
</div><!-- /#sidebar-container -->