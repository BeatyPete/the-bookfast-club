$("#search-close-btn").click(function(){
    $("#search-background").animate({
        opacity: '0'
    });
    $("#search").animate({
        maxWidth: "0%",
    }, {
        complete: function() {
            $("#whole").addClass("hidden");
        }
    });

});

$("#book-search").submit(function(){
    event.preventDefault()
    $("#search-background").animate({
        opacity: '.75'
    });
    $("#search").animate({
        maxWidth: "100%",
    }, {
        start: function() {
            $("#whole").removeClass("hidden");
        }
    });
});