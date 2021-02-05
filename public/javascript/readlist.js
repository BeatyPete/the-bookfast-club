/* If the fav-btn is clicked the post is added to your read list  */
$(".fav-btn").on("click", function () {
  addToReadList();
});

async function addToReadList(bookData) {
    // these const decide what is posted to the readlist. const isbn is a link to the book.
    const title = `${bookData.volumeInfo.title}`
    if (!bookData.volumeInfo.imageLinks) {
        var cover_img_url = '/images/no-img.jpg';
    } else {
        var cover_img_url = `${bookData.volumeInfo.imageLinks.thumbnail}`
    }
    const author = `${bookData.volumeInfo.authors}`
    const isbn = `${bookData.volumeInfo.infoLink}`
    const response = await fetch(`/api/readlist`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            cover_img_url,
            author,
            isbn
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        location.reload();
    } else {
        alert(response.statusText);
    }
}