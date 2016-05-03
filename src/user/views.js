// Views
var UserItemView = Marionette.ItemView.extend({
  tagName: 'tr',
  template: _.template("<td><a href=#><%=email%></a></td>"),
  events: {
    "click a": "showUserDetail"
  },
  showUserDetail: function (ev) {
    ev.preventDefault();
    this.model.select();
  }
});

var UserListView = Marionette.CollectionView.extend({
  tagName: 'table',
  childView: UserItemView,
  onBeforeRender: function () {
    this.$el.append("<h2>User list</h2>");
  }
});

var UserDetailView = Marionette.ItemView.extend({
  tagName: 'div',
  template: '#user-detail-template'
});

var UserFormView = Marionette.ItemView.extend({
  template: '#user-form-template',
  events: {
    "submit": "registerUser"
  },

  ui: {
    name: '#userName',
    email: '#userEmail',
    password: '#userPassword'
  },

  registerUser: function (ev) {
    ev.preventDefault();
    var user = new User();
    user.save(this.makeUser()).then(function (data) {
      console.log('User saved ' + data.email);
    });
  },

  makeUser: function (ev) {
    return {
      name: this.ui.name.val(),
      email: this.ui.email.val(),
      password: this.ui.name.val()
    }
  }
});