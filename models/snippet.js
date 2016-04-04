var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SnippetSchema = new Schema({
    name: String,
    code: String,
    language: String,
    author: String
});

var Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;
