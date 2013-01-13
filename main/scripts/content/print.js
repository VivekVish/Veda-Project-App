$(document).ready(function()
{
    $('#print_container a.action-print').click(function() {
        window.print();
        return false;
    });

    $('#print_container a.action-pdf').click(function() {
        location.href = "index.php?type=pdf";
        return false;
    });
});