$(document).ready(function(){
    $(".template").click(function(event) {
        event.stopPropagation();
        $(".template").css("box-shadow", "none");
        $("#active-template").show();
        $(this).css("box-shadow","inset 0em 0em 0em .4em #e6e6e6").prepend($("#active-template")[0]);
    });
});

$(document).on("click", function () {
    $(".template").css("box-shadow", "none");
    $("#active-template").hide();
});