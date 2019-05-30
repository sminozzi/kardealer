<?php namespace wp_bill_fix_config {
    /**
     * @author William Sergio Minozzi
     * @copyright 2017
    */
    define('Error_config', 'Error to Update Config. ');
    $to = '';
    if (isset($_POST['email']))
        $to = $_POST['email'];
    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        die("Error. Invalid email format. Aborted.");
    }
    try {
        $mypath = getcwd();
    }
    catch (exception $e) {
        die('Error (1): ' . $e->getMessage());
    }
    $pos = strpos($mypath, '/wp-content/themes/');
    if ($pos === false)
        die(Error_config . 'Unable to find theme path. Aborted.');
    $themeroot = substr($mypath, 0, $pos + 1);
    $pos = strpos($mypath, '/inc');
    if ($pos === false)
        die(Error_config . 'Unable to find theme path. Aborted.');
    $themepublic = substr($mypath, 0, $pos + 1) . 'public/';
    $configFilePath = $themeroot . 'wp-config.php';
    try {
        if (!is_readable($configFilePath))
            die(Error_config . 'Couldn\'t read wp-config.php file. Aborted.');
    }
    catch (exception $e) {
        die('Aborted. Error (2): ' . $e->getMessage());
    }
    try {
        $configContent = file_get_contents($configFilePath);
    }
    catch (exception $e) {
        die('Aborted. Error (3): ' . $e->getMessage());
    }
    try {
        $bkpsizeori = filesize($configFilePath);
    }
    catch (exception $e) {
        die('Aborted. Error (4): ' . $e->getMessage());
    }
    $lookfor = "WP_MEMORY_LIMIT";
    $pos = strpos($configContent, $lookfor);
    if ($pos != false)
        die(Error_config . 'You have the WP_MEMORY_LIMIT defined yet. Aborted.');
    $mystring = "/* That's all, stop editing! Happy blogging. */";
    $mystring = "define('WP_DEBUG";
    $pos = strpos($configContent, $mystring);
    if ($pos === false)
        die(Error_config . 'Fail to Edit the WP-CONFIG.PHP. Aborted.');
    $TMPconfigbegin = substr($configContent, 0, $pos);
    $TMPconfigend = substr($configContent, $pos);
    $newline = "define('WP_MEMORY_LIMIT', '128M');" . PHP_EOL;
    $newconfig = $TMPconfigbegin . $newline . $TMPconfigend;
    # Check config file permissions
    $configok = true;
    try {
        if (!is_readable($configFilePath) || !is_writable($configFilePath)) {
            $configok = false;
        }
    }
    catch (exception $e) {
        die('Aborted. Error (5): ' . $e->getMessage());
    }
    if (!$configok) {
        try {
            if (!chmod($configFilePath, 0755)) {
                die(Error_config . 'Config file is not writable: ' . $configFilePath);
            }
        }
        catch (exception $e) {
            die('Aborted. Error: (18) ' . $e->getMessage());
        }
    }
    $configBackup = $themepublic . 'wp-config.php';
    $falhou = false;
    try {
        if (!file_put_contents($configBackup, $configContent)) {
            $falhou = true;
        }
    }
    catch (exception $e) {
        die('Aborted. Error: (6) ' . $e->getMessage());
    }
    if ($falhou) {
        $dirfail = false;
        try {
            if (!is_writable($themepublic)) {
                $dirfail = true;
            }
        }
        catch (exception $e) {
            die('Aborted. Error: (7) ' . $e->getMessage());
        }
        if ($dirfail) {
            try {
                if (!chmod($themepublic, 0755)) {
                    die(Error_config . 'Could not Change Dir Permissions: ' . $themepublic .
                        ' Aborted.');
                }
            }
            catch (exception $e) {
                die('Aborted. Error: (8) ' . $e->getMessage());
            }
        }
        $filefail = false;
        try {
            if (!is_writable($configBackup)) {
                $filefail = true;
            }
        }
        catch (exception $e) {
            die('Aborted. Error: (9) ' . $e->getMessage());
        }
        if ($filefail) {
            try {
                if (!chmod($configBackup, 0755)) {
                    die(Error_config . 'Could not Change File Permissions: ' . $configBackup .
                        ' Aborted.');
                }
            }
            catch (exception $e) {
                die('Aborted. Error: (10) ' . $e->getMessage());
            }
        }
        // again
        try {
            if (!file_put_contents($configBackup, $configContent)) {
                $falhou = true;
                die(Error_config . 'Could not write Backup file: ' . $configBackup . ' Aborted.');
            }
        }
        catch (exception $e) {
            die('Aborted. Error: (11) ' . $e->getMessage());
        }
    }
    try {
        if (!is_readable($configBackup)) {
            die(Error_config . 'Invalid Backup File: ' . $configBackup . '  Aborted.');
        }
    }
    catch (exception $e) {
        die('Aborted. Error (12): ' . $e->getMessage());
    }
    $bkpsize = filesize($configBackup);
    try {
    }
    catch (exception $e) {
        die('Aborted. Error (13): ' . $e->getMessage());
    }
    if ($bkpsize != $bkpsizeori)
        die(Error_config . 'Backup file size error! Aborted');
    $filefail = true;
    try {
        // die('File WP_CONFIG.PHP Updated !!! ');
        if (file_put_contents($configFilePath, $newconfig)) {
           $filefail = false;
        }
    }
    catch (exception $e) {
        die('Aborted. Error (14): ' . $e->getMessage());
    }
    if ($filefail) {
        try {
            if (!chmod($configFilePath, 0755)) {
                die(Error_config . 'Could not Change File Permissions: ' . $configFilePath .
                    ' Aborted.');
            }
        }
        catch (exception $e) {
            die('Aborted. Error: (16) ' . $e->getMessage());
        }
    }
    try {
        // die('File WP_CONFIG.PHP Updated !!! ');
        if (!file_put_contents($configFilePath, $newconfig))
            die(Error_config . 'Could not write config file: ' . $configFilePath);
    }
    catch (exception $e) {
        die('Aborted. Error (17): ' . $e->getMessage());
    }
    $restoreLink = create_restore_link($themepublic);
    $return = send($restoreLink, $to);
    if ($return == 1)
        die('WP-CONFIG.PHP File updated!');
    else
        die('Aborted. Error Code: ' . $return . ' to send email.');
    //////////////////////////////////////////////////////////////////////
    function create_restore_link($themepublic)
    {
        global $configContent;
        // checking $protocol in HTTP or HTTPS
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off')
            $protocol = "https://";
        else
            $protocol = "http://";
        $url = $_SERVER['HTTP_HOST'];
        $pos = strpos($url, "http:");
        $pos1 = strpos($url, "https:");
        if ($pos === false and $pos1 === false)
            $url = $protocol . $url;
        $pos = strpos($themepublic, "wp-content/themes/");
        if ($pos === false)
            die(Error_config . 'Fail to Create new config file. Aborted.');
        $partialurl = substr($themepublic, $pos);
        $key = get_key($configContent);
        $url = $url . '/' . $partialurl . 'restore-config.php?key=' . urlencode($key);
        return $url;
    }
    function get_key()
    {
        global $configContent;
        $pos = strpos($configContent, "define('NONCE_KEY',");
        if ($pos === false)
            die(Error_config . 'Fail to find key constant. Aborted.');
        $key = trim(substr($configContent, $pos + 20, 25));
        $key = substr($key, 1, 10);
        return $key;
    }
    function get_domain()
    {
        $host = $_SERVER['HTTP_HOST'];
        preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
        return $matches[0];
    }
    function send($restoreLink, $to)
    {
        $blogdomain = get_domain();
        $blogemail = 'WordPress@' . $blogdomain;
        $subject = 'WP Config File - Emergency Restore Link';
        $headers[] = 'Content-Type: text/plain';
        $headers[] = 'From: ' . $blogemail;
        $message[] = 'Here is a link to Restore your original  wp-config.php file.';
        $message[] = 'Use it only if you\'ve problem accessing your site after update the file today.';
        $message[] = $restoreLink;
        $headers = join("\r\n", $headers);
        $message = join("\n", $message);
        $status = mail($to, $subject, $message, $headers);
        return $status;
    }
} ?>