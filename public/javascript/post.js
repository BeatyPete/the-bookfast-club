$("#results").on("click", ".book-select", function() {
    const bookId = $(this).attr('id')
    getPostData(bookId)
})

const getPostData = function (id) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;
    // // make a request to the url
    fetch(apiUrl)
      .then(function (response) {
        // request was successful
        if (response.ok) {
          response.json().then(function (data) {
            postResults(data)
          });
        } else {
          // error message if an invalid entery is submitted
          console.log("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to google books");
      });
  };

async function postResults(bookData) {
    /* these const decide what goes into the post. isbn is actually a link to the book */
    const title = `${bookData.volumeInfo.title}`
    var cover_img_url = `${bookData.volumeInfo.imageLinks.thumbnail}`
    if (!bookData.volumeInfo.imageLinks) {
        var cover_img_url = '/images/no-img.jpg'
    }
    const author = `${bookData.volumeInfo.authors}`
    const publish_date = `${bookData.volumeInfo.publishedDate}`
    const isbn = `${bookData.volumeInfo.infoLink}`
    const description = `${bookData.volumeInfo.description}`
    console.log(cover_img_url)
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title ,
            cover_img_url,
            author,
            publish_date,
            isbn,
            description
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