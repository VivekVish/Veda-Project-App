<?php

require_once('MVPFrame.php');

class MVPPdfContent extends MVPFrame
{
    const PhantomJS_Linux_amd64 = 'phantomjs-lin64';
    const PhantomJS_Linux_i386 = 'phantomjs-lin32';
    const PhantomJS_Windows_i386 = 'phantomjs-win32.exe';
    
    const PhantomJS_Timeout = 180;
    
    private $phantom_js = '../vendors/PhantomJS/';
    private $render_script = '../vendors/PhantomJS/rasterize.js';
    private $pdf_path = './pdf';
    
    
    private $allowed_hosts = array(
        '/^veda-app\.local$/',
        '/\.vedaproject\.org$/',
    );
    
    public function __construct()
    {
        $os = php_uname('s');
        $machine = php_uname('m');
        if(stripos($os,'linux')!==false) {
            if($machine==='x86_64')
                $this->phantom_js.=self::PhantomJS_Linux_amd64;
            else
                $this->phantom_js.=self::PhantomJS_Linux_i386;
        } elseif(stripos($os,'windows')!==false) {
            $this->phantom_js.=self::PhantomJS_Windows_i386;
        }
    }
    
    public function display()
    {
        require_once 'lib/mutex.php';
        
        $url = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
        
        $url_info = parse_url($url);
        $allowed = false;
        foreach($this->allowed_hosts as $regex)
        {
            if(preg_match($regex,$url_info['host']))
            {
                $allowed = true;
                break;
            }
        }
        if(!$allowed)
        {
            echo "URL: [$url] not allowed";
            exit;
        }
        
        // Normalize file name
        $pdf_file = preg_replace('/\W+/', '_', $url_info['query']).'.pdf';
        $full_path = $this->pdf_path . '/' . $pdf_file;
        
        if(file_exists($full_path) && filesize($full_path))
        {
            $this->dumpPdf($pdf_file, $full_path);
            return;
        }
        
        $mutex = new Mutex($pdf_file);
        $now = time();
        // Wait until get a lock
        while(!$mutex->getLock())
        {
            // Sleep for 0.5 seconds
            usleep(500);
            // Check against timeouts
            if((time()-$now) > self::PhantomJS_Timeout)
                die('Timeout reached when generating PDF');
        }   
      
        // Remove if there is a zero-sized file
        @unlink($full_path);
        
        // Create the file first to prevent process lock
        touch($full_path);
        $command = sprintf('%s %s %s %s A4', $this->phantom_js, escapeshellarg($this->render_script), escapeshellarg($url), escapeshellarg($full_path)); 
        $o = shell_exec($command);
        
        // Release lock
        $mutex->releaseLock();
        
        $this->dumpPdf($pdf_file, $full_path);
    }
    
    public function dumpPdf($pdf_file, $full_path)
    {
        header('Content-disposition: attachment; filename='.$pdf_file);
        header('Content-type: application/pdf');
        readfile($full_path);
    }
    
    public function getData($uri)
    {
    }
}
 
?>