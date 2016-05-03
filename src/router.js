var AppRouter = Backbone.Router.extend({
  routes: {
    "": "showIndex",
    "users": "showUserList",
    "users/:id": "showUserDetail",
    "register": "showUserRegister"
  },

  showIndex: function () {
    App.trigger('index:requested');
  },

  showUserList: function () {
    App.trigger('user:listing:requested');
  },

  showUserDetail: function (id) {
    var user = new User({ id: id });
    user.fetch().then(function () {
      App.trigger("user:selected", user);
    })
  },

  showUserRegister: function () {
    App.trigger('user:register');
  }
});