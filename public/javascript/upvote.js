$(".like-btn").on(
    "click",
    function () {
        /* if the like button is clicked it changes the color and either + or - the displayed number*/
        if($(this).hasClass('liked')) {
            $(this).removeClass('liked');
            const counter = $(this).parents("article").find(".upvote_count")
            counter.removeClass("liked")
            const count = parseInt(counter.text()) - 1
            counter.text(count)
            const post_id = $(this).parents('article').attr('id')
            console.log(post_id)
            /* add call for decreasing vote count here */
        }
        else {
            $(this).addClass("liked");
            const counter = $(this).parents("article").find(".upvote_count")
            counter.addClass("liked")
            const count = parseInt(counter.text()) + 1
            const post_id = $(this).parents('article').attr('id')
            counter.text(count) 
            upvoteClickHandler(post_id)           
        }
    }
);

async function upvoteClickHandler(id) {

    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
        post_id: id
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        /* document.location.reload(); */
    } else {
        alert(response.statusText);
    }
}