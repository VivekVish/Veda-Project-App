<?php
    class HelperFunctions
    {
        public static function removeCurlyQuotes($content)
        {
            return str_replace("—","--",str_replace("’","'",str_replace("‘","'",str_replace("”",'"',str_replace("“",'"',$content)))));
        }
    }
?>
