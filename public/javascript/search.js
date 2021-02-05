/* these two click functions animate the search sidebar */
$("#search-close-btn").click(function(){
    closeSearch()
});
$("#results").on("click", ".book-select", function(){
    closeSearch()
});

$("#book-search").submit(function(){
    openSearch()
    const searchTerms = document.querySelector('#search-terms-input').value
    getSearchResults(searchTerms)
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

const getSearchResults = function (bookInfo) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${JSON.stringify(bookInfo.replace(/\s/g, "+"))}`;
    // // make a request to the url
    fetch(apiUrl)
      .then(function (response) {
        // request was successful
        if (response.ok) {
          response.json().then(function (data) {
            //send imdb id to getOmdb function to retrieve that specific movies data
            displayResults(data)
          });
        } else {
          // error message if an invalid entery/movie is submitted
          console.log("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        // catch set up incase Open Weather is down or internet is disconnected
        alert("Unable to connect to google books");
      });
  };

const displayResults = function(bookData) {
    const listContainerEl = $("#results")
    listContainerEl.empty()

    for (i = 0; i < bookData.items.length; i++) {
        const resultsContainerEl = $("<div>")
        resultsContainerEl.addClass("search-result-container p-2")
        listContainerEl.append(resultsContainerEl);
        
        const titleEl = $("<div>")
        titleEl.addClass("search-title")
        titleEl.text(bookData.items[i].volumeInfo.title)
        
        const dateEl = $("<div>")
        dateEl.addClass("text-black")
        dateEl.text(`Published: ${bookData.items[i].volumeInfo.publishedDate}`)

        const authorEl = $("<div>")
        authorEl.addClass("text-black")
        authorEl.text(bookData.items[i].volumeInfo.authors)

        const btnContainerEl = $("<div>")
        btnContainerEl.addClass("flex justify-end")
        const btnEl = $("<button>")
        btnEl.addClass("book-select group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black primary-button hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200")
        btnEl.attr("id", bookData.items[i].id)
        btnEl.text("Recommend this book")
        btnContainerEl.append(btnEl)

        resultsContainerEl.append(titleEl, dateEl, authorEl, btnContainerEl)
    }
    
}