/* these two click functions animate the search sidebar */
$("#search-close-btn").click(function(){
    closeSearch()
});
$("#book-select").click(function(){
    closeSearch()
});

$("#book-search").submit(function(){
    openSearch()
});

const openSearch = () => {
    event.preventDefault()
    $("#search-background").animate({
        opacity: '.75'
    });
    $("#search").animate({
        maxWidth: "100%",
    }, {
        /* this start function should call before the animation starts but only works the second time */
        start: function() {
            $("#whole").removeClass("hidden");
        }
    });
}
const closeSearch = () => {
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
}