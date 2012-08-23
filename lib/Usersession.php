<?php

class Usersession 
{

	#############################################
	### Member Variables ########################
	#############################################

	# Variables 
	private $php_session_id;
	private $native_session_id;
	private $db;
	private $logged_in;
	private $username;
    private $session_timeout = 604800;
	private $session_lifespan = 604800;
	private $maxlifetime;
	private $needUsername = false;
	private $status;

	#############################################
	### Member Functions ########################
	#############################################
   
	# Constructors  
	public function __construct() 
	{
        session_set_cookie_params($this->session_lifespan);
		session_name('engage');
        ini_set("session.gc_maxlifetime",$session_timeout);
		session_start();

        if(isset($_SESSION['timeout']))
        {
            $session_life = time() - $_SESSION['timeout'];
            if($session_life > $this->session_timeout)
            {
                $this->logout();
            }
        }
        $_SESSION['timeout'] = time();
		
		if(isset($_SESSION['authinfo']))
		{
			if(!isset($_SESSION['requestusername']))
			{
				header("Location: resources/logout.php");
			}
			
			if($_SESSION['requestusername'])
			{
				$this->needUsername = true;
			}
			else
			{
				$this->needUsername = false;
				$this->logged_in=true;
				$this->username = $_SESSION['id'];
				$this->status = $_SESSION['status'];
			}
		}
		else
		{
			$this->logged_in=false;
		}
    }
	
	# Destructor (As of PHP 5.0.5 this is necessary since the session::write() and session::close() methods are not called untill after the destruction of the object)
	public function __destruct()
	{
		session_write_close();
	}
   
	# Is the user logged in or not? 
    public function isLoggedIn() 
	{
		return($this->logged_in);
    }
	
	# Is the user a content provider?
	public function isContentProvider()
	{
		return $this->status=="content_provider";
	}
	
	# Is the user an admin?
	public function isAdmin()
	{
		return $this->status=="admin";
	}
    
    # Is the user a teacher?
	public function isTeacher()
	{
		return $this->status=="teacher";
	}
	
	# Has this user just logged in but without a username
	public function getNeedUsername()
	{
		return $this->needUsername;
	}
   
	# Return the user's id  
    public function getUsername() 
	{
		if ($this->logged_in) 
		{
			return($this->username);
		} 
		else 
		{
			return(false);
      	};
    }
   
	# Get the user object  
    public function getUserObject() 
	{
		if ($this->logged_in) 
		{
        	if (class_exists("user")) 
			{
				$objUser = new User($this->username);
				return($objUser);
        	} 
			else 
			{
				return(false);
			};
		};
    }
   
	# Get the session ID 
    public function getSessionIdentifier() 
	{
		return($this->php_session_id);
    } 
   
	# Logout 
    public function logout() 
	{
		$_SESSION = array();
		session_destroy();
        header("Location: /index.php");
        exit();
    }
}

?>
