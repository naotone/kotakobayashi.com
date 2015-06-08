<?php
/**
* @package WordPress
* @subpackage KotaKobayashi
* @since KotaKobayashi 1.0
*/


get_header(); ?>
<article>
  <h1><?php the_title()?></h1>
  <p class="mail"><a class="noUnderline" href="mailto:kota@kotakobayashi.com">kota@kotakobayashi.com</a></p>
  <p class="tel">347.610. 1246</p>

  </p>
  <?php if(have_posts()):
    while (have_posts() ) : the_post();
    ?>
    <div class="content">
      <?php the_content();?>
    </div>
    <?php
  endwhile;
endif;
?>
</article>
<?php get_footer(); ?>
