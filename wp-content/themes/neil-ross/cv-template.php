<?php
/**
 * Template Name: CV Template
 * Description: A cv layout
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render( array( 'cv.twig' ), $context );
