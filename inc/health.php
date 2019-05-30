<?php

global $wp_version;

if (version_compare($wp_version, '5.2') >= 0) {
    kardealer_health();
} else {
    return;
}

function kardealer_health()
{
    global $kardealer_memory_result;
    $memory['usage'] = function_exists('memory_get_usage') ? round(memory_get_usage() / 1024 / 1024, 0) : 0;
    if (!is_numeric($memory['usage'])) {
        $sbb_memory = 'Unable to Check!';
        return;
    }
    if ($memory['usage'] < 1) {
        return;
    }
    $mb = 'MB';
    if (defined("WP_MEMORY_LIMIT")) {
        $memory['wp_limit'] = trim(WP_MEMORY_LIMIT);
        $wplimit = $memory['wp_limit'];
        $wplimit = substr($wplimit, 0, strlen($wplimit) - 1);
        $memory['wp_limit'] = $wplimit;
    } else {
        $memory['wp_limit'] = 'Not defined!';
        $mb = '';
    }
    ob_start();
    echo 'Current memory WordPress Limit: ' . $memory['wp_limit'] . $mb .
        '&nbsp;&nbsp;&nbsp;  |&nbsp;&nbsp;&nbsp;';

    echo '<span style="color:red;">';
    echo 'Your usage now: ' . $memory['usage'] .
        'MB &nbsp;&nbsp;&nbsp;';
    echo '</span>';
    echo '<br />';
    echo '</strong>';
    $kardealer_memory_result = ob_get_contents();
    ob_end_clean();
    function kardealer_add_memory_test($tests)
    {
        $tests['direct']['memory_plugin'] = array(
            'label' => __('My Memory Test', 'kardealer'),
            'test' => 'kardealer_memory_test',
        );
        return $tests;
    }
    $perc = $memory['usage'] / $memory['wp_limit'];
    if ($perc > .7) {
        add_filter('site_status_tests', 'kardealer_add_memory_test');
    }
    function kardealer_memory_test()
    {
        global $kardealer_memory_result;
        $result = array(
            'badge' => array(
                'label' => __('Critical','fordummies'), // Performance
                'color' => 'red', // orange',
            ),
            'test' => 'Bill_plugin',
            'status' => 'critical',
            'label' => __('Low WordPress Memory Limit in wp-config file','fordummies'),
            'description' => $kardealer_memory_result . '  ' . sprintf(
                '<p>%s</p>',
                __('Run your site with low memory available, can result in behaving slowly, or pages fail to load, you get random white screens of death or 500 internal server error. Basically, the more content, features and plugins you add to your site, the bigger your memory limit has to be. Increase the WP Memory Limit is a standard practice in WordPress. You can manually increase memory limit in WordPress by editing the wp-config.php file. You can find instructions in the official WordPress documentation (Increasing memory allocated to PHP). Just click the link below: ','fordummies')
            ),
            'actions' => sprintf(
                '<p><a href="%s">%s</a></p>',
                'https://codex.wordpress.org/Editing_wp-config.php',
                __('WordPress Help Page','fordummies')
            ),
        );
        return $result;
    }
}
