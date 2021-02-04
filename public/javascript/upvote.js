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
            downvoteClickHandler(post_id)
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

async function downvoteClickHandler(id) {

    const response = await fetch(`/api/posts/upvote`, {
        method: 'DELETE',
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

/* getuserlikes and updatecolor are the functions that load the color of the like btn and counter if the user has like the post*/
async function getUserLikes() {
    const response = await fetch('/api/users/upvotes', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        response.json()
        .then( data => updateColor(data))
    } else {
        alert(response.statusText);
    }
}
const updateColor = function(data) {
    for (i = 0; i < $("article").length; i++) {
        let id = $("article")[i].id
        for (p = 0; p < data.upvotes.length; p++) {
            if (parseInt(id) === data.upvotes[p].post_id) {
                $(`#${id}`).find("span").addClass("liked")
                $(`#${id}`).find(".like-btn").addClass("liked")
            }
            
        }
    }
}

getUserLikes()