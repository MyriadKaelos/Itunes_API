var currentArtist = null;
var collection = Array();
$(document).ready(function(){
    getArtist();
    keyUpKnow();
    getListShorter();
});
function myFunction(objects) {
    collection += objects.results[0].artistName + " ";
    for (var a in objects.results) {
        if (objects.results[a].collectionExplicitness === "notExplicit") {
                var explicit = "Not Explicit";
            } else {
                var explicit = "Explicit";
            }
        if (objects.results[a].artistName === currentArtist) {
            $("#table").append("<tr>" +
                "<td class='song'>" + objects.results[a].trackName + "</td>" +
                "<td class='artist'>" + objects.results[a].artistName + "</td>" +
                "<td class='image'><img src='" + objects.results[a].artworkUrl100 + "' alt='albumCover' height='100' width='100'></td>" +
                "<td class='explicit'>" + explicit + "</td></tr>"
            );
        }
    }
    console.log(collection);
}//builds the table
function keyUpKnow() {
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#table tr").nextAll().filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}//filters the table for the search
function getAjaxNow(artist) {
    if(artist !== "" && artist !== null && artist !== undefined) {
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + artist,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (result) {
                console.log(result);
                if(confirmstuff(result) === true) {
                    getAjaxArtist(result.results[0].artistName);
                    currentArtist = result.results[0].artistName;
                }
            },
            error: function () {
                console.log("failed");
            }
        });
    }
}//gets any artist from the iTunes library
function getAjaxArtist(artist) {
    if(artist !== "" && artist !== null && artist !== undefined) {
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + artist,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (result) {
                console.log(result);
                myFunction(result);
            },
            error: function () {
                console.log("failed");
            }
        });
    }
}//gets all of the top 50 songs from a specified artist
function getListShorter() {
    $("#select").on("mouseleave",function() {
        $("#table tr").nextAll().filter(function () {
            $(this).toggle($(this).index() < $("select").val());
        });
    });
}//filters the table for the number of results
function getArtist() {
    $(document).keypress(function(e) {
        if (e.which === 13) {
            var newArtist = $("#add").val();
            console.log(newArtist);
            getAjaxNow(newArtist);
        }
    });
}//checks for the add enter
function confirmstuff(result) {
    var b = confirm("I've found " + result.results[0].artistName + ". Would you like to load " + result.results[0].artistName + " as an artist?");
    return b;
}//gives the confirm artist popup