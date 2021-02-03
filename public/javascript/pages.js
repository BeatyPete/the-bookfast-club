$("#prev").on("click", function() {
    if (document.location.pathname != "/" && "/1") {
        var num = document.location.pathname.split("/")[1]
        const page = parseInt(num) - 1
        if (page === 0) {
            document.location.replace(`/`)
        } else {
            document.location.replace(`/${page}`)
        }        
    }
})

$("#next").on("click", function() {
    if (document.location.pathname === "/") {
        var num = 0
    }
    else {       
        var num = document.location.pathname.split("/")[1]
    }
    const page = parseInt(num) + 1
    document.location.replace(`/${page}`)
})