// Get references to page elements
var $pickUsername = $("#pickusername");
var $pickPassword = $("#pickpassword");
var $submitBtn = $("#submit");
var $userinfoList = $("#userinfo-list");
var $emailAddress = $("#emailaddress");

// The API object contains methods for each kind of request we'll make
// atm shouldn't need the delete method or buttons!
// Will keep them anyways for the favorites page later
var API = {
  saveUserinfo: function(userinfo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/userinfo",
      data: JSON.stringify(userinfo)
    });
  },
  getUserinfo: function() {
    return $.ajax({
      url: "api/userinfo",
      type: "GET"
    });
  },
  deleteUserinfo: function(username) {
    return $.ajax({
      url: "api/userinfo/" + username,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshUserinfo = function() {
  API.getUserinfo().then(function(data) {
    var $userinfos = data.map(function(userinfo) {
      var $a = $("<a>")
        .text(userinfo.username)
        .attr("href", "/userinfo/" + userinfo.username);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": userinfo.username
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $userinfoList.empty();
    $userinfoList.append($userinfos);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newUser = {
    username: $pickUsername.val().trim(),
    password: $pickPassword.val().trim(),
    email: $emailAddress.val().trim()
  };

  if (!(newUser.username && newUser.password && newUser.email)) {
    alert("You must enter all fields!");
    return;
  }

  API.saveUserinfo(newUser).then(function() {
    refreshUserinfo();
  });

  $pickUsername.val("");
  $pickPassword.val("");
  $emailAddress.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function(event) {
  event.preventDefault();
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteUserinfo(idToDelete).then(function() {
    refreshUserinfo();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$userinfoList.on("click", ".delete", handleDeleteBtnClick);
