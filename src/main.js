var testData = [
  { "id": 1, email: "asd@asd.com", "text": "Amy", "grade": 5 },
  { "id": 2, email: "qwwwe@asd.com", "text": "sdAmy", "grade": 25 },
  { "id": 3, email: "qe@asd.com", "text": "sdAmy", "grade": 25 },
  { "id": 4, email: "qwertt@asd.com", "text": "qwe", "grade": 2 }
]

// Data
var User = Backbone.Model.extend({
    url: 'api/users',
    select : function() {
        App.trigger("user:selected", this);
    }
});
var UsersCollection = Backbone.Collection.extend({
    url: "http://jsonplaceholder.typicode.com/users",
    model: User
});

// Views
var IndexView = Marionette.ItemView.extend({
    template: '#index-template',
    
    events: {
        'click #nav-user-list' : "showUserList"
    },
    
    showUserList: function(ev){
        ev.preventDefault();
        App.trigger('user:listing:requested');
    }
});
var UserItemView = Marionette.ItemView.extend({
     tagName: 'tr',
     template: _.template("<td><a href=#><%=email%></a></td>"),
     events : {
         "click a" : "showUserDetail" 
     },
     showUserDetail : function(ev){
         ev.preventDefault();
         this.model.select();
     }
}); 
var UserListView = Marionette.CollectionView.extend({
     tagName: 'table',
     childView: UserItemView,
     onBeforeRender: function() {
         this.$el.append("<h2>User list</h2>");
     }
 });
 
var UserDetailView = Marionette.ItemView.extend({
    tagName: 'div',
    template: '#user-detail-template'
});

// App Objects
var App = new Marionette.Application();
var AppRouter = Backbone.Router.extend({
   routes: {
       "" : "showIndex",
       "users" : "showUserList",
       "users/:id" : "showUserDetail"
   },
   showIndex : function(){
       App.trigger('index:requested');
   },
   showUserList : function() {
       App.trigger('user:listing:requested');
   },
   showUserDetail : function(id) {
       var user = App.Users.get(id);
       user.select();
   }
});
var AppController = Marionette.Controller.extend({
  showIndex : function(){
    App.mainRegion.show(new IndexView());    
  },
  
  showUserList: function() {
    var userListView = new UserListView({ collection: App.Users });
    App.AppRouter.navigate("users");
    App.mainRegion.show(userListView);  
  },
  
  showUserDetail: function(user) {
      var layout = new UserDetailView({ model: user });
      App.AppRouter.navigate("users/" + user.id);
      App.mainRegion.show(layout);
  }
});

// Events
App.addInitializer(function() {
      
  // Events
  App.on("user:selected", function(user) {
     App.AppController.showUserDetail(user); 
  });
  App.on("user:listing:requested", function() {
     App.AppController.showUserList(); 
  });
  App.on("index:requested", function() {
     App.AppController.showIndex(); 
  });
})

// Initializer
App.addInitializer(function() {
  
  App.addRegions({
    header : '#header',  
    mainRegion : '#app' 
  });   
  
  // Inits
  App.AppController = new AppController();
  App.AppRouter = new AppRouter();
  App.Users = new UsersCollection(testData);

  
  //start
  Backbone.history.start();
});



App.start();

