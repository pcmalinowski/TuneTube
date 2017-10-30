const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
	const data = {
		part: 'snippet',
		key: `AIzaSyD03Qsjo7JGYssbCjL99s3FKk4CicwCWIQ`,
		q: `${searchTerm} id:name`,
		type: `video`,
		maxResults: 25,
};
$.getJSON(YOUTUBE_SEARCH_URL, data, callback);
}

function renderResult(result) {
  // console.log(result.id.videoId);
  return `
    <div "entry-container">
      <div class="entry thumbnail">
        <a href="https://www.youtube.com/embed?v=${result.id.videoId}" target="_blank"><iframe width="854" height="480" src="https://www.youtube.com/embed?listType=search&list=${result.id.videoId}" frameborder="0" gesture="media" allowfullscreen alt="${result.snippet.title}"></iframe></a>
      </div>
      <div class="entry info">
        <p class="video-title">${result.snippet.title}</p>
        <p class="video-description">${result.snippet.description}
      <div>
    </div>
  `;
}
function displaySearchResults(data) {

    const results = data.items.map((item, index) => renderResult(item));
  console.log(data);
  $('.js-results').html(results);
  $('.js-results-counter').html(`<p>On youtube you would have to dig through ${data.pageInfo.totalResults} results!</p>`);
}


function watchForSubmission() {
    $('.js-search-term').submit(event => {
        event.preventDefault();
        const searchTarget = $(event.currentTarget).find('.js-query');
        const search = searchTarget.val();
        searchTarget.val("");
        getDataFromApi(search, displaySearchResults);
    });
}

$(watchForSubmission);
