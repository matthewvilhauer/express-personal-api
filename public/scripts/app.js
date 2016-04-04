console.log("Sanity Check: JS is working!");
// Handlebar variables for all snippets
var template;
var $snippetsList;
var allSnippets;

// Handlebar variables for a single snippet
var templateSingle;
var $snippetSingle;
var snippetSingle;

$(document).ready(function(){

    $snippetsList = $('#snippetTarget');

  $.ajax({
    method: 'GET',
    url: '/api/snippets',
    success: handleSnippetSuccess,
    error: handleSnippetError
  });

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleProfileSuccess,
    error: handleProfileError
  });

  // $.ajax({
  //   method: 'GET',
  //   url: '/snippets/random',
  //   success: handleRandomSuccess,
  //   error: handleRandomError
  // });

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

  $('.snippet-link').on('click', function() {
    $.ajax({
      method: 'GET',
      url: '/snippets/'+$(this).attr('snippet-data-id'),
      success: getSingleSnippetSuccess,
      error: getSingleSnippetError
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

  $("#search-form").on("submit", function(e) {
      githubSearch();
  });

});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {

  // compile handlebars template
  var source = $('#snippets-template').html();
  template = Handlebars.compile(source);

  // empty existing snippets from view
  $snippetsList.empty();
  $('#code-snippet-input').val('');


  // pass `allSnippets` into the template function
  var snippetsHtml = template({ snippets: allSnippets });

  // append html to the view
  $snippetsList.append(snippetsHtml);
}

//helper function to render single post to view
// function renderSingle() {
//
//   $snippetSingle = $('#snippetSingleTarget');
//   // compile handlebars template for single snippet
//   var sourceSingle = $('#snippet-single-template').html();
//
//     template = Handlebars.compile(sourceSingle);
//
//   // empty existing snippets from view
//
//
//   // pass `allSnippets` into the template function
//   var snippetSingleHtml = template({ snippet: snippet_single });
//
//   // append html to the view
//   $snippetSingle.append(snippetSingleHtml);
// }

/**********
 * Snippet functions *
 **********/

//Display index functions
function handleSnippetSuccess(json) {
  allSnippets = json;
  render();
}

function handleSnippetError(e) {
  console.log('uh oh');
  $('#snippetTarget').text('Failed to load snippets, is the server working?');
}


// Get a single snippet
function getSingleSnippetSuccess(json) {
    allSnippets = json;
    console.log(snippet_single);
    render();
}
function getSingleSnippetError(e) {
  console.log('uh oh');
  $('#snippetSingleTarget').text('Failed to load the specified snippet, is the server working?');
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


/**********
 * Profile *
 **********/

//Display index functions
function handleProfileSuccess(json) {
  allProfiles = json;
}

function handleProfileError(e) {
  console.log('uh oh');
  $('#profileTarget').text('Failed to load profiles, is the server working?');
}


/**********
 * Random GitHub *
 **********/
function githubSearch() {

  var github_endpoint = "https://api.github.com/users/";
  var search_query = $("#search-text").val()+"/repos";

  $.ajax({
    method: 'GET',
    url: github_endpoint+search_query,
    success: githubSuccess,
    error: githubError
  });
}

function githubSuccess(data) {
  $('#search-results').text('');
  var ghUsername = data[0].owner.login;
  $('#search-results').append("<h3>User "+ghUsername+"'s Repositories:</h3><p>Click on a repository to search for code you want to add to your favorites.</p>");
  data.forEach(function(e) {
    console.log(e.name);
    $('#search-results').append("<a target="+"_blank"+" href="+e.html_url+">"+e.name+"</a>, ");
  });
  // my_repos = data.name;
  // console.log(my_repos);
  // $("#results").append(data);
}
function githubError(e) {
  $('#search-results').text('');
  $('#search-results').html("<h4>No User found by that name, please try again.</h4>");
  console.log('Failed to load github search, is the server working?');
  //$('#results').text('Failed to load github search, is the server working?');
}
