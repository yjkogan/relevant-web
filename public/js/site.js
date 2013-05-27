var DOC = {};

function getBookByTitleWithQuote(title,quote) {
  $('#viewer-canvas').hide();
  DOC.bookTitle = title;
  DOC.quote = quote;
  // Source: https://google-developers.appspot.com/books/docs/viewer/examples/booksapi-titlesearch
  // Dynamically load the search results in JavaScript,
  // using the Books API
  // Once loaded, handleResults is automatically called with
  // the result set
  var script = document.createElement("script");
  // We might need to supply a key for this or else we might run into
  // quota limits.
  script.src = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
    + encodeURIComponent(DOC.bookTitle) + '&filter=partial'
    + '&callback=handleResults';
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
}

function handleResults(root) {
  // Find the identifier of the first embeddable match
  // If none found, report an error
  var entries = root.items || [];

  for (var i = 0; i < entries.length; ++i) {
    var entry = entries[i];
    var isEmbeddable = entry.accessInfo.embeddable;
    DOC.identifier = entry.id;

    showCover();

    if (isEmbeddable) {
      loadBook();
      return;
    }
  }

  // Show no results here
}

function loadBook() {
  // Load the Embedded Viewer API, calling showBook when it's ready
  var callbackFn = function() { showBook(identifier); };
  google.load("books", "0", { "callback" : showBook });
}

function showBook() {
  // We have the book ID, API is loaded, now just show it
  var canvas = document.getElementById('viewer-canvas');
  DOC.viewer = new google.books.DefaultViewer(canvas);
  DOC.viewer.load(DOC.identifier);

  $('#viewer-canvas').show();
  DOC.id = setInterval(searchForText, 50);
}

function searchForText() {
  if ($('.swv-input')[0] && $('.swv-button')[0]) {
    $('.swv-input')[0].value = DOC.quote;
    $('.swv-button')[0].click();
    if ($('.swv-input')[0].value == DOC.quote) {
      clearInterval(DOC.id);
      $('.swv-input')[0].blur();
      DOC.id = setInterval(closeResultsBox,50);
    }
  }
}
function closeResultsBox() {
  if ($(".swv-embed-close")[0]) {
    $(".swv-embed-close")[0].click();
    if ($(".swv-embed-close")[0].offsetWidth === 0 || $(".swv-embed-close")[0].offsetHeight === 0) {
      clearInterval(DOC.id);
    }
  }
}

function showCover() {
  var imgURL = "http://bks5.books.google.com/books?id="+ DOC.identifier +"&printsec=frontcover&img=1&zoom=0&source=gbs_api";
  $("#book-cover-img").attr("src",imgURL);
}

function showCanvas(showing) {
  var canvasDiv = document.getElementById('viewer-canvas');
  canvasDiv.style.display =  (showing) ? 'block' : 'none';
}
