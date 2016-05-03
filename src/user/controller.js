var UserController = Marionette.Controller.extend({
  showUserList: function () {
    var userListView = new UserListView({ collection: App.Users });
    App.AppRouter.navigate("users");
    App.mainRegion.show(userListView);
    App.Users.fetch();
  },

  showUserDetail: function (user) {
    var layout = new UserDetailView({ model: user });
    App.AppRouter.navigate("users/" + user.id);
    App.mainRegion.show(layout);
  },

  showUserRegister: function () {
    var view = new UserFormView();
    App.AppRouter.navigate("register");
    App.mainRegion.show(view);
  }
});