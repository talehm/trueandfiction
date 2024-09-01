<!DOCTYPE html>

<html <?php language_attributes(); ?>>

<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">

    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <?php wp_head(); ?>

</head>

<body>

    <div id="app" class="container">

        <?php
        get_template_part('template-parts/site-branding');
        set_query_var( 'vw_nav_menu', 'main' );
        get_template_part('template-parts/nav-menu');
