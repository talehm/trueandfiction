<?php

/**
 * Set up theme options on activation
 */

function vue_wordpress_setup()
{

    add_theme_support( 'title-tag' );

    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'custom-logo', array(
        'height' => 160,
        'width' => 160,
    ) );

    register_nav_menus( array(
        'main' => 'Main Menu',
		'languages' => __( 'Languages' )
    ) );

}

add_action( 'after_setup_theme', 'vue_wordpress_setup' );
// function custom_category_rewrite_rules($rules) {
//     $new_rules = array(
//         'stories/(.+)/?$' => 'index.php?category_name=' . $wp_rewrite->preg_index(1),
//     );
//     return $new_rules + $rules;
// }
// add_filter('rewrite_rules_array', 'custom_category_rewrite_rules');

// function custom_category_link($termlink, $term, $taxonomy) {
//     if ($taxonomy === 'category') {
//         $termlink = str_replace('/category', '', $termlink);

//     }
//     return $termlink;
// }
// add_filter('term_link', 'custom_category_link', 10, 3);

/**
 * Load scripts and styles
 */

function vue_wordpress_scripts()
{
	$manifest_path = get_template_directory() . '/dist/manifest.json';

     // Styles
	 wp_enqueue_style( 'style.css', get_template_directory_uri() . '/style.css' );
	//  wp_enqueue_style('vue_wordpress.css', get_template_directory_uri() . '/dist/vue-wordpress.css');
	if (file_exists($manifest_path)) {
		// Read the manifest file
		$manifest = json_decode(file_get_contents($manifest_path), true);
		foreach ($manifest as $file => $path) {
			$handle = 'vue_wordpress_' . basename($file, '.css');

			// Check if the file is a CSS file (it will have .css extension)
			if (strpos($file, '.css') !== false) {
				wp_enqueue_style(
					'vue_wordpress_' . basename($file, '.css'), // Generate a unique handle for each CSS chunk
					get_template_directory_uri() . '/dist/' .$path, // Path from manifest
					array(), // Dependencies can be added if needed
					null // Version can be added if needed, typically based on file name or timestamp
				);
			}
		}

		// Scripts
		foreach ($manifest as $file => $path) {
			// Check if the file is a JS file (it will have .js extension)
			if (strpos($file, '.js') !== false) {
				$handle = 'vue_wordpress_' . basename($file, '.js');

				// print (get_template_directory_uri() . '/dist/' . ltrim($path, '/'));
				wp_enqueue_script(
					$handle, // Unique handle for the script
					get_template_directory_uri() . '/dist' . $path, // Path to the JS file from the manifest
					array(), // No dependencies (you can add dependencies if needed)
					null, // Version (you can set this to a version string or a timestamp if needed)
					true // Load the script in the footer
				);
				}
			}
		// Enable For Production - Disable for Development
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/app-5d3f7ed2.541e103ec62ecd076b52.js', array(), null, true);
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/app-5d3f7ed2.68657122370746d32dc0.js', array(), null, true);
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/app-6b882012.00dbf54e2323f6db728a.js', array(), null, true);
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/vue-wordpress.js', array(), null, true);
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/vue-wordpress.js', array(), null, true);
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/vue-wordpress.js', array(), null, true);
		//   wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/vue-wordpress.js', array(), null, true);

		// Enable For Development - Remove for Production
		//  wp_enqueue_script( 'vue_wordpress.js', 'http://localhost:8080/vue-wordpress.js', array(), false, true );
		}
 }

add_action( 'wp_enqueue_scripts', 'vue_wordpress_scripts' );

/**
 * Declare REST API Data Localizer dependency
 */

if ( !class_exists( 'RADL' ) ) {
    add_action( 'admin_notices', function () {
        echo '<div class="error"><p>REST API Data Localizer not activated. To use this theme go to <a href="' . esc_url( admin_url( 'plugins.php' ) ) . '">plugins</a> to download and/or activate REST API Data Localizer.</p></div>';
    } );
    return;
}

/**
 * Initialize REST API Data Localizer
 */


function get_vue_wordpress_entry_chunks() {
    // Path to the manifest.json file generated by Webpack
    $manifest_path = get_template_directory() . '/dist/manifest.json';

    // Check if the manifest file exists
    if ( file_exists( $manifest_path ) ) {
        // Decode the manifest JSON file into an associative array
        $manifest = json_decode( file_get_contents( $manifest_path ), true );

        // Check if the manifest contains data
        if ( isset( $manifest ) && is_array( $manifest ) ) {

            // Prepare an array to hold all app JS files
            $app_js_files = [];

            // Loop through the manifest to find all app-*.js files
            foreach ( $manifest as $file => $path ) {
                // Skip runtime and vendor files
                if ( strpos( $file, '.js' ) !== false ) {
                    // Check for app files, which usually have `app-*.js` format
                    if ( strpos( $file, 'app-' ) !== false ) {
                        $app_js_files[] = $path; // Add the app-*.js file to the array
                    }
                }
            }

            // Return the array of app JS files
            return $app_js_files;
        }
    }

    return []; // Return an empty array if no app JS files are found
}
$app_js_files = get_vue_wordpress_entry_chunks(); // Get the array of app JS files

if ( !empty( $app_js_files ) ) {
    // Loop through each app JS file and initialize RADL for each
    foreach ( $app_js_files as $vue_wordpress_entry ) {
		print (str_replace('/','',$vue_wordpress_entry));
        new RADL( '__VUE_WORDPRESS__', str_replace('/','',$vue_wordpress_entry), array(
            'routing' => RADL::callback( 'vue_wordpress_routing' ),
            'state' => array(
                'definition' => RADL::endpoint( 'definition' ),
                'categories' => RADL::endpoint( 'categories' ),
                'media' => RADL::endpoint( 'media' ),
                'menus' => RADL::callback( 'vue_wordpress_menus' ),
                'pages' => RADL::endpoint( 'pages' ),
                'posts' => RADL::endpoint( 'posts' ),
                'tags' => RADL::endpoint( 'tags' ),
                'users' => RADL::endpoint( 'users' ),
                'site' => RADL::callback( 'vue_wordpress_site' ),
                // 'words' => RADL::endpoint( 'definition' )
            ),
        ) );
    }
} else {
    // Fallback if no valid app JS files are found
    echo 'No valid app JS files found.';
}
/**
 * REST API Data Localizer callbacks
 */

function vue_wordpress_routing()
{
    $routing = array(
        'category_base' => get_option( 'category_base' ),
        'page_on_front' => null,
        'page_for_posts' => null,
        'permalink_structure' => get_option( 'permalink_structure' ),
        'show_on_front' => get_option( 'show_on_front' ),
        'tag_base' => get_option( 'tag_base' ),
        'url' => get_bloginfo( 'url' )
    );

    if ( $routing['show_on_front'] === 'page' ) {
        $front_page_id = get_option( 'page_on_front' );
        $posts_page_id = get_option( 'page_for_posts' );

        if ( $front_page_id ) {
            $front_page = get_post( $front_page_id );
            $routing['page_on_front'] = $front_page->post_name;
        }

        if ( $posts_page_id ) {
            $posts_page = get_post( $posts_page_id );
            $routing['page_for_posts'] = $posts_page->post_name;
        }

    }
    return $routing;
}

function vue_wordpress_menus()
{
    $menus = array();
    // $locations is an array where ([NAME] = MENU_ID);
    $locations = get_nav_menu_locations();

    foreach ( array_keys( $locations ) as $name ) {
        $id = $locations[$name];
        $menu = array();
        $menu_items = wp_get_nav_menu_items( $id );

        foreach ( $menu_items as $i ) {

            array_push( $menu, array(
                'id'      => $i->ID,
                'parent'  => $i->menu_item_parent,
                'target'  => $i->target,
                'content' => $i->title,
                'title'   => $i->attr_title,
                'url'     => $i->url,
            ) );

        }

        $menus[$name] = $menu;
    }

    return $menus;
}

function vue_wordpress_site()
{
    return array(
        'description' => get_bloginfo( 'description' ),
        'docTitle' => '',
        'loading' => false,
        'logo' => get_theme_mod( 'custom_logo' ),
        'name' => "trueandfiction.com",
        'posts_per_page' => get_option( 'posts_per_page' ),
        'url' => get_bloginfo( 'url' )
    );

}

/**
 * In template functions
 */

function vue_wordpress_min_read( $content )
{
    $length = count( explode( ' ', $content ) ) + 1;
    $time = $length / 200;

    if ( is_float( $time ) ) {
        $time = ceil( $time );
    }

    return $time . 'min read';
}
function custom_rewrite_rules() {
    add_rewrite_rule('^page/([^/]*)/?', 'index.php?pagename=$matches[1]', 'top');
}
add_action('init', 'custom_rewrite_rules');

function custom_page_permalink($post_link, $post) {
	if (is_int($post)) {
        $post = get_post($post); // Retrieve the full post object
    }

    // Ensure we are dealing with a page
    if ($post && $post->post_type == 'page') {
        return home_url('/page/' . $post->post_name);
    }
    return $post_link;
}
add_filter('page_link', 'custom_page_permalink', 10, 2);

// function my_shortcode() {
//     $shortcode_output = '<button id="my-element" v-click="myMethod">Click me!</button>';
//     return $shortcode_output;
//   }
// add_shortcode('my_shortcode', 'my_shortcode');

function fontawesome_shortcode($atts) {
    $atts = shortcode_atts( array(
        'name' => '',
        'prefix' => 'fas',
        'id' => '',
    ), $atts );

    $icon_html = '<i class="' . esc_attr($atts['prefix']) . ' fa-' . esc_attr($atts['name']) . '"';
    if (!empty($atts['id'])) {
        $icon_html .= ' id="' . esc_attr($atts['id']) . '"';
    }
    $icon_html .= '></i>';

    return $icon_html;
}
add_shortcode('icon', 'fontawesome_shortcode');

// Define a function to remove the wptexturize filter
function remove_wptexturize_filter() {
    remove_filter( 'the_content', 'wptexturize' );
    remove_filter( 'the_title', 'wptexturize' );
}

// Add an action to run the function when WordPress initializes
add_action( 'init', 'remove_wptexturize_filter' );