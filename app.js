var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyC1jmduuldgIHasN0RB7H-qF9wnnm1pykU',
    q: searchTerm,
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}

function displayYoutubeSearchData(data) {
  var displayElem = $('.js-search-results');
  data.items.forEach(function(item) {
    var elem = $('.js-result-template').children().clone();
    var watchUrl = YOUTUBE_WATCH_URL + item.id.videoId;
    var imageUrl = item.snippet.thumbnails.default.url;
    elem.find('a').attr('href', watchUrl);
    elem.find('img').attr('src', imageUrl);
    displayElem.append(elem);
  });
}

function clearResults() {
    $('.js-search-results').empty();
 }

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    clearResults();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(function() {
    watchSubmit();
});

