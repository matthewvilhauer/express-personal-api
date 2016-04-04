console.log("Sanity Check: JS is working!");
var template;
var $snippetsList;
var allSnippets;

$(document).ready(function(){

  $snippetsList = $('#snippetTarget');

  // compile handlebars template
  var source = $('#snippets-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/snippets',
    success: handleSnippetSuccess,
    error: handleSnippetError
  });
});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {
  // empty existing snippets from view
  $snippetsList.empty();

  // pass `allSnippets` into the template function
  var snippetsHtml = template({ snippets: allSnippets });

  // append html to the view
  $snippetsList.append(snippetsHtml);
}

function handleSnippetSuccess(json) {
  allSnippets = json;
  render();
}

function handleSnippetError(e) {
  console.log('uh oh');
  $('#snippetTarget').text('Failed to load snippets, is the server working?');
}
