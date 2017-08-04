$(document).ready(function(){
    $(document).on('click', '.template', (function(event) {
            event.stopPropagation();
            $(".template").css("box-shadow", "none");
            $(this).parent(".template-wrapper").find(".active-template").show();
            $(this).css("box-shadow","inset 0em 0em 0em .4em #e6e6e6");
        })
    )});

function hideTemplate() {
    $(".template").css("box-shadow", "none");
    $(".active-template").hide();
}

$(document).on('click', (function() {
    hideTemplate();
}));

$(document).on('click', '.template', (function() {
    hideTemplate();
}));