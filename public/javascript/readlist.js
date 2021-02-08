/* If the fav-btn is clicked the post is added to your read list in the dashboard */
$(".fav-btn").on(
    "click",
    function () {
        /* if the like button is clicked it changes the color and either + or - the displayed number*/
        if($(this).hasClass('liked')) {
            $(this).removeClass('liked');
            const post_id = $(this).parents('article').attr('id')
            deleteReadlistClickHandler(post_id)
        }
        else {
            $(this).addClass("liked");
            const post_id = $(this).parents('article').attr('id')
            addToReadlistClickHandler(post_id)           
        }
    }
);

async function addToReadlistClickHandler(id) {

    const response = await fetch('/api/posts/readlist', {
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

async function deleteReadlistClickHandler(id) {

    const response = await fetch(`/api/posts/readlist`, {
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

async function getUserFavs() {
    const response = await fetch('/api/users/readlist', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        response.json()
        .then( data => updateFavColor(data))
    } else {
        alert(response.statusText);
    }
}
const updateFavColor = function(data) {
    for (i = 0; i < $("article").length; i++) {
        let id = $("article")[i].id
        for (p = 0; p < data.readlists.length; p++) {
            if (parseInt(id) === data.readlists[p].post_id) {
                $(`#${id}`).find(".fav-btn").addClass("liked")
            }
            
        }
    }
}

getUserFavs()