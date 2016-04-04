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

  $('#newSnippetForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/snippets',
      data: $(this).serialize(),
      success: newSnippetSuccess,
      error: newSnippetError
    });
  });

  $snippetsList.on('click', '.deleteBtn-Snippet', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/snippets/'+$(this).attr('snippet-data-id'),
      success: deleteSnippetSuccess,
      error: deleteSnippetError
    });
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

//Display index functions
function handleSnippetSuccess(json) {
  allSnippets = json;
  render();
}

function handleSnippetError(e) {
  console.log('uh oh');
  $('#snippetTarget').text('Failed to load snippets, is the server working?');
}

// Create functions
function newSnippetSuccess(json) {
  $('#newSnippetForm input').val('');
  allSnippets.push(json);
  render();
}

function newSnippetError() {
  console.log('newsnippet error!');
}

// Delete functions
function deleteSnippetSuccess(json) {
  var snippet = json;
  var snippetId = snippet._id;
  console.log('delete snippet', snippetId);
  // find the snippet with the correct ID and remove it from our allSnippets array
  for(var index = 0; index < allSnippets.length; index++) {
    if(allSnippets[index]._id === snippetId) {
      allSnippets.splice(index, 1);
      break;  // we found our snippet - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteSnippetError() {
  console.log('deletesnippet error!');
}
