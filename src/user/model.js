// Data
var User = Backbone.Model.extend({
  url: 'http://localhost:3000/users',
  select: function () {
    App.trigger("user:selected", this);
  }
});

var UsersCollection = Backbone.Collection.extend({
  url: "http://localhost:3000/users",
  model: User
});