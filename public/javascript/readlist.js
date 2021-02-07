/* If the fav-btn is clicked the post is added to your read list in the dashboard */
$(".fav-btn").on("click", function () {
  const post_id = $(this).parents("article").attr("id");
  addToReadListClickHandler(post_id);
});

async function addToReadListClickHandler(id) {

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