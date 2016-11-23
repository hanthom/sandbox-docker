(function() {
  var app, port, server;

  app = require(__dirname + "/app");

  port = 8000;

  server = app.listen(port, function(e) {
    if (e) {
      return console.log('Server START ERROR =====>', e);
    } else {
      return console.log("Server SPUN UP ON PORT " + port);
    }
  });

  module.exports = server;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWFzc2V0cy9zZXJ2ZXIuanMiLCJzb3VyY2VzIjpbInNlcnZlci1hc3NldHMvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBVyxTQUFELEdBQVcsTUFBckI7O0VBRU4sSUFBQSxHQUFPOztFQUVQLE1BQUEsR0FBUyxHQUFHLENBQUMsTUFBSixDQUFXLElBQVgsRUFBaUIsU0FBQyxDQUFEO0lBQ3hCLElBQUcsQ0FBSDthQUFVLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVosRUFBeUMsQ0FBekMsRUFBVjtLQUFBLE1BQUE7YUFFRSxPQUFPLENBQUMsR0FBUixDQUFZLHlCQUFBLEdBQTBCLElBQXRDLEVBRkY7O0VBRHdCLENBQWpCOztFQU1ULE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBVmpCIiwic291cmNlc0NvbnRlbnQiOlsiYXBwID0gcmVxdWlyZSBcIiN7X19kaXJuYW1lfS9hcHBcIlxuXG5wb3J0ID0gODAwMFxuXG5zZXJ2ZXIgPSBhcHAubGlzdGVuIHBvcnQsIChlKS0+XG4gIGlmIGUgdGhlbiBjb25zb2xlLmxvZyAnU2VydmVyIFNUQVJUIEVSUk9SID09PT09PicsIGVcbiAgZWxzZVxuICAgIGNvbnNvbGUubG9nIFwiU2VydmVyIFNQVU4gVVAgT04gUE9SVCAje3BvcnR9XCJcblxuIyByZXF1aXJlKFwiI3tfX2Rpcm5hbWV9L2NvbnRyb2xsZXJzL3NvY2tldEN0cmxcIikuZ2V0Q29ubiBzZXJ2ZXJcbm1vZHVsZS5leHBvcnRzID0gc2VydmVyXG4iXX0=
