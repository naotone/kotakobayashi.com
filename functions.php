<?php
function my_scripts_method() {
  wp_deregister_script('jquery');
	// wp_enqueue_script('jquery','//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js' ,array() ,NULL , true);
  // wp_enqueue_script('three','//cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js' ,array() ,NULL , true);
  // wp_enqueue_script('transit','//cdnjs.cloudflare.com/ajax/libs/jquery.transit/0.9.12/jquery.transit.min.js' ,array() ,NULL , true);

  wp_enqueue_script('jquery',get_stylesheet_directory_uri() . '/scripts/jquery-1.11.3.min.js' ,array() ,NULL , true);
  wp_enqueue_script('three',get_stylesheet_directory_uri() . '/scripts/three.min.js' ,array() ,NULL , true);
  wp_enqueue_script('transit',get_stylesheet_directory_uri() . '/scripts/jquery.transit.min.js' ,array() ,NULL , true);

  wp_enqueue_script('three.svg.loader',get_stylesheet_directory_uri() . '/scripts/SVGLoader.js' ,array() ,NULL , true);
	wp_enqueue_script('tween',get_stylesheet_directory_uri() . '/scripts/tween.min.js' ,array() ,NULL , true);
  wp_enqueue_script('bg',get_stylesheet_directory_uri() . '/scripts/bg.js', array(), NULL, true);
  wp_enqueue_script('script',get_stylesheet_directory_uri() . '/scripts/script.js', array(), NULL, true);
}
add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
