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

const pageNumDisplay = function() {
    if (document.location.pathname === "/") {
        $("#left-pg").text("1")
        $("#right-pg").text("2")
        /* git rid of left page button */
        
    }
    else {       
        $("#prev").toggleClass("invisible")
        let queryNum = document.location.pathname.split("/")[1]
        var rightNum = 2 
        for (i = 0; i < queryNum; i++) {
            var rightNum = rightNum + 2
        }
        var leftNum = rightNum - 1
        $("#left-pg").text(parseInt(leftNum))
        $("#right-pg").text(parseInt(rightNum))
    }
}

pageNumDisplay()