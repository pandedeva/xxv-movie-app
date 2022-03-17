function searchMovies() {
  $("#movie-list").html("");

  // connect ke api
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    DataType: "json",
    data: {
      apikey: "d66fe20",
      s: $("#search-input").val(), // cari apapun yang diketikan di search input
    },
    // kalau ajax success dikirim
    success: function (result) {
      if (result.Response == "True") {
        const movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(`
            <div class="col-md-4">
              <div class="card mb-3 border-0" style="width: 18rem;">
                <img src="${data.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                  <a href="#" class="card-link see-detail btn btn-dark btn-sm float-end" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}" ">See Detail</a>
                </div>
              </div>
            </div>
            `);
        });
        // mengosongkan input, jika user sudah mengclick tombol cari
        $("#search-input").val("");
      } else {
        $("#movie-list").html(`
        <h1 class="text-center text-white mt-2">${result.Error}</h1>
        `);
        $("#search-input").val("");
      }
    },
  });
}

// click tombol search
$("#search-button").on("click", function () {
  searchMovies();
});

// menekan enter
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovies();
  }
});

// saat tombol see detail di click
$("#movie-list").on("click", ".see-detail", function () {
  // connect ke api
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    DataType: "json",
    data: {
      apikey: "d66fe20",
      i: $(this).data("id"), // tombol see detail yang di click, cari berdasarkan id
    },
    // kalau ajax success dikirim
    success: function (movie) {
      if (movie.Response == "True") {
        $(".modal-body").html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="${movie.Poster}" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item text-center fs-3">${movie.Title}</li>
                  <li class="list-group-item">Released : ${movie.Released}</li>
                  <li class="list-group-item">Genre : ${movie.Genre}</li>
                  <li class="list-group-item">Director : ${movie.Director}</li>
                  <li class="list-group-item">Actors : ${movie.Actors}</li>
                  <li class="list-group-item">Plot : ${movie.Plot}</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    },
  });
});
