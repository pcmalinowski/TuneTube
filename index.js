const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//API parameters
function getDataFromApi(searchTerm, callback) {
	const data = {
		part: 'snippet',
		key: `AIzaSyD03Qsjo7JGYssbCjL99s3FKk4CicwCWIQ`,
		q: `${searchTerm} vevo`,
		type: `video`,
		maxResults: 21,
		id: `10`,
};
$.getJSON(YOUTUBE_SEARCH_URL, data, callback);
}

//formatting results from search query
function renderResult(result) {
  return `
  <div class="col-3">
      <div class="entry-video">
        <iframe width="854" height="480" src="https://www.youtube.com/embed?listType=search&list=${result.id.videoId}" frameborder="0" gesture="media" allowfullscreen alt="${result.snippet.title}"></iframe>
      </div>
      <div class="entry info">
        <p class="video-title">${result.snippet.title}</p>
        <p class="video-description">${result.snippet.description}</p>
      <div>
   </div>
  `;
}

//populating html with results from search query
function displaySearchResults(data) {

    const results = data.items.map((item, index) => renderResult(item));
  $('.js-results').html(results);
  $('.js-results-counter').html(`<p>On youtube you would have to dig through ${data.pageInfo.totalResults} results!</p>`);
//displays total number of available results that would have appeared on a youtube search.
}



function watchForSubmission() {
    $('.js-search-term').submit(event => {
        event.preventDefault();
        const searchTarget = $(event.currentTarget).find('.js-query');
        const search = searchTarget.val();
        searchTarget.val("");
        getDataFromApi(search, displaySearchResults);
        $('#web-explanation').addClass('hidden')
        $('#display').removeClass('hidden'); //hides results information on initial load of page until a search is executed.
    });
}

$(watchForSubmission);
