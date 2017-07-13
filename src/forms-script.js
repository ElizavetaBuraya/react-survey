$("#file").change(function(event) {
    let fileName = '';
    fileName = event.target.value.split('\\').pop();
    if(fileName)
        $(".filepath").html(fileName);
});

$(".toggle-question-params").click(function() {
    let quest_visibility =  $(".question-params-toggle-panel").css("visibility");
    let survey_visibility =  $(".survey-params-toggle-panel").css("visibility");
    if (quest_visibility == "hidden") {
        $(".question-params-toggle-panel").css("visibility", "visible");
        $(".survey-params-toggle-panel").css("visibility", "hidden");
    }
    else {
        $(".question-params-toggle-panel").css("visibility", "hidden");
    }
})

$(".toggle-survey-params").click(function() {
    let survey_visibility =  $(".survey-params-toggle-panel").css("visibility");
    let quest_visibility =  $(".question-params-toggle-panel").css("visibility");
    if (survey_visibility == "hidden") {
        $(".survey-params-toggle-panel").css("visibility", "visible");
        $(".question-params-toggle-panel").css("visibility", "hidden");
    }
    else {
        $(".survey-params-toggle-panel").css("visibility", "hidden");
    }
})

