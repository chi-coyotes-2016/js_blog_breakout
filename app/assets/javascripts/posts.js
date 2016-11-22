$(document).ready(function(){
  loadPosts();
  bindCreateFormEvent();
});

function bindCreateFormEvent() {
  $("#new_post").on("submit", handleCreateFormSubmit);
}

function handleCreateFormSubmit(event) {
  event.preventDefault();
  var $form = $(this);
  var promiseFromAjax = createPost($form);
  promiseFromAjax.done(renderOnePost).fail(processErrors);
}

function createPost(form) {
  var data = form.serialize();
  var url = form.attr("action");
  var method = form.attr("method");

  return $.ajax({
    url: url,
    data: data,
    method: method
  });
}

function loadPosts() {
  getPosts().done(renderPosts);
}

function getPosts() {
  var promise = $.ajax({ url: "/all_posts"});
  return promise;
}

function processErrors(errorResponse) {
  var errors = errorResponse.responseJSON.errors;
  var errorText = "";
  errors.forEach(function(error){
    errorText += `<li>${error}</li>`;
  });

  $(".errors").html("<ul>" + errorText + "</ul>");
}

function renderOnePost(post) {
  $(".errors").empty();
  $("#posts").append(generateOnePost(post));
  $("#new_post").trigger("reset");
}

function renderPosts(response) {
  var all_posts = "";
  response.forEach(function(post){
    all_posts += generateOnePost(post);
  });

  $("#posts").html(all_posts);
}

function generateOnePost(post) {
  return `<div class="blog-post">
    <h2 class="blog-post-title">${post.title}</h2>
    <p>${post.body}</p>
  </div>`;
}