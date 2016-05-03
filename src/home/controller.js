var AppController = Marionette.Controller.extend({
  showIndex: function () {
    App.mainRegion.show(new IndexView());
  }
});