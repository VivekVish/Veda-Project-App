<?php

Class Api 
{
	#############################################
	### Member Variables ########################
	#############################################
	
	private $apiHost = null;
	private $ch = null;
	private $uri = null;
	private $payload = null;
	private $defaultHeaders = null;


	#############################################
	### Member Functions ########################
	#############################################

	public function __construct()
	{
		$this->apiHost = API_HOST;
		$this->ch = curl_init();
		curl_setopt($this->ch, CURLOPT_SSL_VERIFYHOST, 0 );
		curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, 0 );
		curl_setopt($this->ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
	}

	private function setUri($uri)
	{
		$this->uri = $uri;
		curl_setopt($this->ch, CURLOPT_URL, $this->apiHost.$uri);
	}

	private function setPayload($payload)
	{
		$this->payload = $payload;
		curl_setopt($this->ch, CURLOPT_POSTFIELDS, $payload);
	}

	private function makeRequest()
	{
		$this->response = curl_exec($this->ch);
		return $this->response;
	}
	
	public function setDataType($dataType = null)
	{
		if ($dataType == "json")
		{
			$this->defaultHeaders = array("Content-Type: application/json", "Accept-Type: application/json");
		}
		else 
		{
			$this->defaultHeaders = array("Content-Type: text/xml", "Accept-Type: text/xml");
		}
		curl_setopt($this->ch, CURLOPT_HTTPHEADER, $this->defaultHeaders);
	}

	public function setAcceptType($acceptType)
	{
		$this->acceptTypeHeader = "Accept-Type: $acceptType";
	}
	
	public function setContentType($contentType)
	{
		$this->contentTypeHeader = "Content-Type: $contentType";
	}

	public function setHeaders()
	{
		$headers = array($this->contentTypeHeader, $this->acceptTypeHeader);
		curl_setopt($this->ch, CURLOPT_HTTPHEADER, $headers);
	}

	public function get($uri)
	{
            if (!empty($this->contentTypeHeader) || !empty($this->acceptTypeHeader))
            {
                $this->setHeaders();
            }
            $this->setUri($uri);	
            return $this->makeRequest();
	}

	public function delete($uri,$payload=null)
	{
		if (!empty($this->contentTypeHeader) || !empty($this->acceptTypeHeader))
		{
			$this->setHeaders();
		}
		$this->setUri($uri);
        $this->setPayload($payload);
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, "DELETE");
		return $this->makeRequest();
	}

	public function put($uri, $payload)
	{
		if (!empty($this->contentTypeHeader) || !empty($this->acceptTypeHeader))
		{
			$this->setHeaders();
		}
		$this->setUri($uri);	
		$this->setPayload($payload);
		curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, "PUT");
		return $this->makeRequest();
		
	}

	public function post($uri, $payload)
	{
		if (!empty($this->contentTypeHeader) || !empty($this->acceptTypeHeader))
		{
			$this->setHeaders();
		}
		$this->setUri($uri);	
		$this->setPayload($payload);
                curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, "POST");
		
		return $this->makeRequest();
	}
}
