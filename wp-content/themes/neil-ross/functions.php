<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	});

	add_filter('template_include', function( $template ) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}



/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo'] = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['menu'] = new Timber\Menu();
		$context['site'] = $this;
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5', array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats', array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( new Twig_SimpleFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}
function theme_scripts() {
//wp_enqueue_style( 'main-styles', get_stylesheet_directory_uri() . '/css/styles.css');
 //wp_enqueue_script( 'modernizr-js', get_stylesheet_directory_uri() . '/js/modernizr.js', true );
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
function load_scripts()
	{
	
		// move jquery to the footer to stop it blocking rendering
		wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js', false, NULL, true );
		wp_enqueue_script( 'jquery' );
		// concatenated production scripts Run 'gulp js' to update and then increment version number to bust cache
		wp_enqueue_script('script', get_stylesheet_directory_uri() . '/dist/js/j.min.js', '', '1.0', true);
	}
add_action('wp_enqueue_scripts', 'load_scripts');

add_filter( 'body_class','my_body_classes' );
function my_body_classes( $classes ) {

		 /*Check cookie for intro */
	if (isset($_COOKIE["noNeilsIntro"])|| isset($_GET['cv']) ) {
	    $classes[] ="brdr-black";
	}
	/*Check parameters played*/
	if (isset($_GET['played']) && isset($_GET['contact']))  {
	
	   $classes[] = 'brdr-black';
        $classes[] = 'contact-go';
	}     
    return $classes;
     
}

new StarterSite();




function styles_in_wp_foot() {
	echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Alfa+Slab+One|Archivo+Narrow:400,700,700i" type="text/css" media="all" />';
	echo '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() .'/css/main.css" type="text/css" media="all" />';
}

add_action( 'wp_footer', 'styles_in_wp_foot' );


function create_post_type() {
	register_post_type( 'portfolio',
	  array(
		'labels' => array(
		  'name' => __( 'Portfolio' ),
		  'singular_name' => __( 'Portfolio' )
		),
		'menu_icon' => 'dashicons-admin-customizer',
		'public' => true,
		'supports' => array( 'title', 'editor', 'thumbnail'),
		'has_archive' => true,
	  )
	);
  }
  add_action( 'init', 'create_post_type' );

add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );

function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
   return $html;
}

function sitemap_exclude_taxonomy( $value, $taxonomy ) {

	if ( $taxonomy == 'NoSiteMap' ) return true;
	}
	add_filter( 'wpseo_sitemap_exclude_taxonomy', 'sitemap_exclude_taxonomy', 10, 2 );
