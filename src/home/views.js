// Views
var IndexView = Marionette.ItemView.extend({
  template: '#index-template',

  events: {
    'click #nav-user-list': "showUserList",
    'click #nav-user-register': "showUserRegister"
  },

  showUserList: function (ev) {
    ev.preventDefault();
    App.trigger('user:listing:requested');
  },

  showUserRegister: function (ev) {
    ev.preventDefault();
    App.trigger('user:register');
  }
});