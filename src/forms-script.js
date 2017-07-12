$("#file").change(function(event) {
    let fileName = '';
    fileName = event.target.value.split('\\').pop();
    if(fileName)
        $(".filepath").html(fileName);
});

$("#question-popup").click(function() {
    $("#question-content").toggle();
})

