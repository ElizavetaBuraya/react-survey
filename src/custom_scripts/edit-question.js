$(document).ready(function(){
    $(document).on('click', '.edit-question', (function(event) {
            event.stopPropagation();

            let editedQuestion = $(this).parent(".question");

            $(".edit-question").hide();
            editedQuestion.addClass("edited");
            editedQuestion.find(".edit-question-params, .stop-edit-question").css("display", "flex");
        })
    )});

$(document).on('click', '.save-edited, .quit-edited', (function() {
    $(".question").removeClass("edited");
    $(".edit-question-params, .stop-edit-question").hide();
    $(".edit-question").show();
}));
