(function() {
  var redisCtrl;

  redisCtrl = require(__dirname + "/../controllers/redisCtrl");

  module.exports = function(app) {
    return app.route('/api/redis').post(function(req, res) {
      console.log(req.body);
      redisCtrl.postCache(req.body);
      return res.status(201).end();
    }).get(function(req, res) {
      console.log("getHashCache START");
      return redisCtrl.getHashCache().then(function(allCache) {
        console.log("allCache", allCache);
        return res.status(200).send(allCache);
      })["catch"](function(err) {
        return console.log("ERROR", err, "RES", res);
      });
    })["delete"](function(req, res) {
      console.log("DELETE ROUTE FIRED");
      redisCtrl.deleteHash();
      return res.status(204).end();
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWFzc2V0cy9yb3V0ZXMvcmVkaXNSb3V0ZXMuanMiLCJzb3VyY2VzIjpbInNlcnZlci1hc3NldHMvcm91dGVzL3JlZGlzUm91dGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBVyxTQUFELEdBQVcsMkJBQXJCOztFQUdaLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsR0FBRDtXQUVmLEdBQUcsQ0FBQyxLQUFKLENBQVUsWUFBVixDQUNFLENBQUMsSUFESCxDQUNRLFNBQUMsR0FBRCxFQUFNLEdBQU47TUFDSixPQUFPLENBQUMsR0FBUixDQUFZLEdBQUcsQ0FBQyxJQUFoQjtNQUNBLFNBQVMsQ0FBQyxTQUFWLENBQW9CLEdBQUcsQ0FBQyxJQUF4QjthQUNBLEdBQ0UsQ0FBQyxNQURILENBQ1UsR0FEVixDQUVFLENBQUMsR0FGSCxDQUFBO0lBSEksQ0FEUixDQU9FLENBQUMsR0FQSCxDQU9PLFNBQUMsR0FBRCxFQUFNLEdBQU47TUFDSCxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaO2FBQ0EsU0FBUyxDQUFDLFlBQVYsQ0FBQSxDQUNFLENBQUMsSUFESCxDQUNRLFNBQUMsUUFBRDtRQUNKLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixRQUF4QjtlQUNBLEdBQ0UsQ0FBQyxNQURILENBQ1UsR0FEVixDQUVFLENBQUMsSUFGSCxDQUVRLFFBRlI7TUFGSSxDQURSLENBTUUsRUFBQyxLQUFELEVBTkYsQ0FNUyxTQUFDLEdBQUQ7ZUFDTCxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVosRUFBcUIsR0FBckIsRUFBMEIsS0FBMUIsRUFBaUMsR0FBakM7TUFESyxDQU5UO0lBRkcsQ0FQUCxDQWlCRSxFQUFDLE1BQUQsRUFqQkYsQ0FpQlUsU0FBQyxHQUFELEVBQU0sR0FBTjtNQUNOLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVo7TUFDQSxTQUFTLENBQUMsVUFBVixDQUFBO2FBQ0EsR0FDRSxDQUFDLE1BREgsQ0FDVSxHQURWLENBRUUsQ0FBQyxHQUZILENBQUE7SUFITSxDQWpCVjtFQUZlO0FBSGpCIiwic291cmNlc0NvbnRlbnQiOlsicmVkaXNDdHJsID0gcmVxdWlyZSBcIiN7X19kaXJuYW1lfS8uLi9jb250cm9sbGVycy9yZWRpc0N0cmxcIlxuIyB7cG9zdENhY2hlLCBnZXRDYWNoZX0gPSByZWRpc0N0cmxcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKS0+XG5cbiAgYXBwLnJvdXRlICcvYXBpL3JlZGlzJ1xuICAgIC5wb3N0IChyZXEsIHJlcyktPlxuICAgICAgY29uc29sZS5sb2cgcmVxLmJvZHlcbiAgICAgIHJlZGlzQ3RybC5wb3N0Q2FjaGUgcmVxLmJvZHlcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzIDIwMVxuICAgICAgICAuZW5kKClcbiAgICAuZ2V0IChyZXEsIHJlcyktPlxuICAgICAgY29uc29sZS5sb2cgXCJnZXRIYXNoQ2FjaGUgU1RBUlRcIlxuICAgICAgcmVkaXNDdHJsLmdldEhhc2hDYWNoZSgpXG4gICAgICAgIC50aGVuIChhbGxDYWNoZSktPlxuICAgICAgICAgIGNvbnNvbGUubG9nIFwiYWxsQ2FjaGVcIiwgYWxsQ2FjaGVcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMgMjAwXG4gICAgICAgICAgICAuc2VuZCBhbGxDYWNoZVxuICAgICAgICAuY2F0Y2ggKGVyciktPlxuICAgICAgICAgIGNvbnNvbGUubG9nIFwiRVJST1JcIiwgZXJyLCBcIlJFU1wiLCByZXNcbiAgICAuZGVsZXRlIChyZXEsIHJlcyktPlxuICAgICAgY29uc29sZS5sb2cgXCJERUxFVEUgUk9VVEUgRklSRURcIlxuICAgICAgcmVkaXNDdHJsLmRlbGV0ZUhhc2goKVxuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMgMjA0XG4gICAgICAgIC5lbmQoKVxuIl19
