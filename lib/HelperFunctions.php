<?php
    class HelperFunctions
    {
        public static function removeCurlyQuotes($content)
        {
            return str_replace("—","--",str_replace("’","'",str_replace("‘","'",str_replace("”",'"',str_replace("“",'"',$_REQUEST['content'])))));
        }
    }
?>
