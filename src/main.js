var App = new Marionette.Application();

// Initializer
App.addInitializer(function () {

    App.addRegions({
        header: '#header',
        mainRegion: '#app'
    });

    // Inits
    App.AppController = new AppController();
    App.UserController = new UserController();
    App.AppRouter = new AppRouter();
    App.Users = new UsersCollection();

});

// User Events
App.addInitializer(function () {

    App.on("user:selected", function (user) {
        App.UserController.showUserDetail(user);
    });

    App.on("user:listing:requested", function () {
        App.UserController.showUserList();
    });

    App.on("user:register", function () {
        App.UserController.showUserRegister();
    });
});

// Home Events
App.addInitializer(function () {

    App.on("index:requested", function () {
        App.AppController.showIndex();
    });

    //start
    Backbone.history.start();
});

App.start();

