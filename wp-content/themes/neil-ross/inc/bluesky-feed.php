<?php
/**
 * BlueSky Feed Integration
 */

function get_merged_micro_feed( $limit = 30, $bluesky_handle = 'neilross.dev' ) {
    $feed_items = array();

    // 1. Fetch BlueSky Posts
    // Documentation: https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
    // We use a transient to cache the response for 5 minutes to avoid rate limits
    $transient_key = 'bsky_feed_v2_' . sanitize_title( $bluesky_handle );
    $cached_bsky = get_transient( $transient_key );

    if ( false !== $cached_bsky ) {
        $feed_items = array_merge( $feed_items, $cached_bsky );
    } else {
        $bsky_items = array();
        if ( $bluesky_handle ) {
            $response = wp_remote_get( 'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=' . urlencode( $bluesky_handle ) . '&limit=' . $limit );
            
            if ( ! is_wp_error( $response ) && wp_remote_retrieve_response_code( $response ) === 200 ) {
                $body = wp_remote_retrieve_body( $response );
                $data = json_decode( $body, true );
                
                if ( isset( $data['feed'] ) ) {
                    foreach ( $data['feed'] as $item ) {
                        $post = $item['post'];
                        
                        // Handle replies - skip them if they are replies to other people
                        if ( isset( $item['reply'] ) && strpos( $item['reply']['parent']['author']['handle'], $bluesky_handle ) === false ) {
                            continue;
                        }
                        
                        $media = '';
                        if ( isset( $post['embed'] ) ) {
                            if ( isset( $post['embed']['images'] ) && count( $post['embed']['images'] ) > 0 ) {
                                $media = $post['embed']['images'][0]['thumb'] ?? '';
                            } elseif ( isset( $post['embed']['external'] ) && isset( $post['embed']['external']['thumb'] ) ) {
                                $media = $post['embed']['external']['thumb'];
                            }
                        }

                        $bsky_items[] = array(
                            'source'    => 'bluesky',
                            'author'    => $post['author']['displayName'] ?? $post['author']['handle'],
                            'handle'    => $post['author']['handle'],
                            'avatar'    => $post['author']['avatar'] ?? '',
                            'content'   => $post['record']['text'] ?? '',
                            'media'     => $media,
                            'date'      => strtotime( $post['record']['createdAt'] ),
                            'date_fmt'  => date( 'M j, Y', strtotime( $post['record']['createdAt'] ) ),
                            'link'      => 'https://bsky.app/profile/' . $post['author']['handle'] . '/post/' . basename( $post['uri'] ),
                        );
                    }
                }
            }
        }
        set_transient( $transient_key, $bsky_items, 5 * MINUTE_IN_SECONDS );
        $feed_items = array_merge( $feed_items, $bsky_items );
    }

    // 2. Sort merged feed by date descending
    usort( $feed_items, function( $a, $b ) {
        return $b['date'] - $a['date'];
    });

    // 3. Return limited items
    return array_slice( $feed_items, 0, $limit );
}
