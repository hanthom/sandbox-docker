(function() {
  var Redis, q, redis;

  q = require('q');

  Redis = require('ioredis');

  redis = new Redis('//redis:6379');

  module.exports = {
    postCache: function(postObj) {
      var data, vin;
      console.log("POSTObj", postObj);
      vin = postObj.vin, data = postObj.data;
      redis.sadd('vins', vin);
      return redis.hmset(vin, data);
    },
    getHashCache: function() {
      var dfd, promises;
      console.log("getHashCache Controller start");
      dfd = q.defer();
      promises = redis.smembers('vins');
      q.all(promises).then(function(vinsList) {
        var j, len, promiseObjs, returnObj, vin;
        promiseObjs = [];
        for (j = 0, len = vinsList.length; j < len; j++) {
          vin = vinsList[j];
          returnObj = redis.hgetall(vin);
          promiseObjs.push(returnObj);
        }
        return q.all(promiseObjs).then(function(returnedObjs) {
          var i, k, len1, newObj, returnList;
          i = 0;
          returnList = [];
          for (k = 0, len1 = vinsList.length; k < len1; k++) {
            vin = vinsList[k];
            newObj = {
              vin: vin,
              data: returnedObjs[i]
            };
            returnList.push(newObj);
            i++;
          }
          return dfd.resolve(returnList);
        });
      });
      return dfd.promise;
    },
    deleteHash: function() {
      console.log("DeleteHash CTRL FIRED");
      return redis.hdel('myhash2', 'id', 'make', 'model');
    },
    getCache: function() {
      var dfd, keys, promises, stream;
      stream = redis.scanStream();
      keys = [];
      promises = [];
      dfd = q.defer();
      stream.on('data', function(results) {
        var j, key, len, temp;
        for (j = 0, len = results.length; j < len; j++) {
          key = results[j];
          temp = redis.get(key);
          keys.push(key);
          promises.push(temp);
        }
        return q.all(promises).then(function(updatedKeys) {
          var combinedKeys, flag, i, k, len1, obj, y;
          i = 0;
          combinedKeys = [];
          flag = false;
          while (i < 1) {
            y = 0;
            for (k = 0, len1 = keys.length; k < len1; k++) {
              key = keys[k];
              combinedKeys[y] = (
                obj = {},
                obj["" + key] = updatedKeys[y],
                obj
              );
              y++;
            }
            i++;
          }
          if (updatedKeys.length < 1) {
            return dfd.reject();
          } else {
            console.log("ELSE", combinedKeys);
            return dfd.resolve(combinedKeys);
          }
        });
      });
      return dfd.promise;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWFzc2V0cy9jb250cm9sbGVycy9yZWRpc0N0cmwuanMiLCJzb3VyY2VzIjpbInNlcnZlci1hc3NldHMvY29udHJvbGxlcnMvcmVkaXNDdHJsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxHQUFSOztFQUNKLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUjs7RUFDUixLQUFBLEdBQVksSUFBQSxLQUFBLENBQU0sY0FBTjs7RUFHWixNQUFNLENBQUMsT0FBUCxHQUdFO0lBQUEsU0FBQSxFQUFXLFNBQUMsT0FBRDtBQUNULFVBQUE7TUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBdUIsT0FBdkI7TUFDQyxpQkFBRCxFQUFNO01BQ04sS0FBSyxDQUFDLElBQU4sQ0FBVyxNQUFYLEVBQW1CLEdBQW5CO2FBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLElBQWpCO0lBSlMsQ0FBWDtJQVlBLFlBQUEsRUFBYyxTQUFBO0FBQ1osVUFBQTtNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksK0JBQVo7TUFDQSxHQUFBLEdBQU0sQ0FBQyxDQUFDLEtBQUYsQ0FBQTtNQUNOLFFBQUEsR0FBVyxLQUFLLENBQUMsUUFBTixDQUFlLE1BQWY7TUFDWCxDQUFDLENBQUMsR0FBRixDQUFNLFFBQU4sQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLFFBQUQ7QUFDSixZQUFBO1FBQUEsV0FBQSxHQUFjO0FBQ2QsYUFBQSwwQ0FBQTs7VUFDRSxTQUFBLEdBQVksS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFkO1VBQ1osV0FBVyxDQUFDLElBQVosQ0FBaUIsU0FBakI7QUFGRjtlQUdBLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBTixDQUNBLENBQUMsSUFERCxDQUNNLFNBQUMsWUFBRDtBQUNKLGNBQUE7VUFBQSxDQUFBLEdBQUk7VUFDSixVQUFBLEdBQWE7QUFDYixlQUFBLDRDQUFBOztZQUNFLE1BQUEsR0FDRTtjQUFBLEdBQUEsRUFBSyxHQUFMO2NBQ0EsSUFBQSxFQUFNLFlBQWEsQ0FBQSxDQUFBLENBRG5COztZQUVGLFVBQVUsQ0FBQyxJQUFYLENBQWdCLE1BQWhCO1lBQ0EsQ0FBQTtBQUxGO2lCQU1BLEdBQUcsQ0FBQyxPQUFKLENBQVksVUFBWjtRQVRJLENBRE47TUFMSSxDQUROO2FBaUJBLEdBQUcsQ0FBQztJQXJCUSxDQVpkO0lBa0NBLFVBQUEsRUFBWSxTQUFBO01BQ1YsT0FBTyxDQUFDLEdBQVIsQ0FBWSx1QkFBWjthQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsU0FBWCxFQUFxQixJQUFyQixFQUEyQixNQUEzQixFQUFtQyxPQUFuQztJQUZVLENBbENaO0lBcUNBLFFBQUEsRUFBVSxTQUFBO0FBQ1IsVUFBQTtNQUFBLE1BQUEsR0FBUyxLQUFLLENBQUMsVUFBTixDQUFBO01BQ1QsSUFBQSxHQUFPO01BQ1AsUUFBQSxHQUFXO01BQ1gsR0FBQSxHQUFNLENBQUMsQ0FBQyxLQUFGLENBQUE7TUFDTixNQUFNLENBQUMsRUFBUCxDQUFVLE1BQVYsRUFBa0IsU0FBQyxPQUFEO0FBQ2hCLFlBQUE7QUFBQSxhQUFBLHlDQUFBOztVQUNFLElBQUEsR0FBTyxLQUFLLENBQUMsR0FBTixDQUFVLEdBQVY7VUFDUCxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVY7VUFDQSxRQUFRLENBQUMsSUFBVCxDQUFjLElBQWQ7QUFIRjtlQUlBLENBQUMsQ0FBQyxHQUFGLENBQU0sUUFBTixDQUNBLENBQUMsSUFERCxDQUNNLFNBQUMsV0FBRDtBQUNKLGNBQUE7VUFBQSxDQUFBLEdBQUU7VUFDRixZQUFBLEdBQWU7VUFDZixJQUFBLEdBQU87QUFDUCxpQkFBTSxDQUFBLEdBQUksQ0FBVjtZQUNFLENBQUEsR0FBSTtBQUNKLGlCQUFBLHdDQUFBOztjQUNFLFlBQWEsQ0FBQSxDQUFBLENBQWIsR0FDRTtzQkFBQSxFQUFBO29CQUFBLEVBQUEsR0FBRyxPQUFPLFdBQVksQ0FBQSxDQUFBLENBQXRCOzs7Y0FDRixDQUFBO0FBSEY7WUFJQSxDQUFBO1VBTkY7VUFPQSxJQUFHLFdBQVcsQ0FBQyxNQUFaLEdBQXFCLENBQXhCO21CQUNFLEdBQUcsQ0FBQyxNQUFKLENBQUEsRUFERjtXQUFBLE1BQUE7WUFHRSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQVosRUFBb0IsWUFBcEI7bUJBQ0EsR0FBRyxDQUFDLE9BQUosQ0FBWSxZQUFaLEVBSkY7O1FBWEksQ0FETjtNQUxnQixDQUFsQjthQXVCQSxHQUFHLENBQUM7SUE1QkksQ0FyQ1Y7O0FBUkYiLCJzb3VyY2VzQ29udGVudCI6WyJxID0gcmVxdWlyZSAncSdcblJlZGlzID0gcmVxdWlyZSAnaW9yZWRpcydcbnJlZGlzID0gbmV3IFJlZGlzKCcvL3JlZGlzOjYzNzknKVxuXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgIyBwb3N0Q2FjaGVcbiAgIyBQb3N0cyB0aGUgZGF0YSB0aGF0IGlzIGJlaW5nIHNlbnQgaW4gdG8gdGhlIFJlZGlzIGNhY2hlIHNlcnZlclxuICBwb3N0Q2FjaGU6IChwb3N0T2JqKS0+XG4gICAgY29uc29sZS5sb2cgXCJQT1NUT2JqXCIsIHBvc3RPYmpcbiAgICB7dmluLCBkYXRhfSA9IHBvc3RPYmpcbiAgICByZWRpcy5zYWRkICd2aW5zJywgdmluXG4gICAgcmVkaXMuaG1zZXQgdmluLCBkYXRhXG4gICAgIyBvYmogPVxuICAgICMgICBhX2tleTogJ2FiYydcbiAgICAjICAgYl9rZXk6ICcxMjMnXG4gICAgIyBmb3Iga2V5LCB2YWwgb2YgZGF0YVxuICAgICMgICBjb25zb2xlLmxvZyBcIlwiXCJLRVk6ICN7a2V5fVxuICAgICMgICBWQUxVRTogI3t2YWx9XG4gICAgIyAgIFwiXCJcIlxuICBnZXRIYXNoQ2FjaGU6IC0+XG4gICAgY29uc29sZS5sb2cgXCJnZXRIYXNoQ2FjaGUgQ29udHJvbGxlciBzdGFydFwiXG4gICAgZGZkID0gcS5kZWZlcigpXG4gICAgcHJvbWlzZXMgPSByZWRpcy5zbWVtYmVycyAndmlucydcbiAgICBxLmFsbCBwcm9taXNlc1xuICAgIC50aGVuICh2aW5zTGlzdCktPlxuICAgICAgcHJvbWlzZU9ianMgPSBbXVxuICAgICAgZm9yIHZpbiBpbiB2aW5zTGlzdFxuICAgICAgICByZXR1cm5PYmogPSByZWRpcy5oZ2V0YWxsIHZpblxuICAgICAgICBwcm9taXNlT2Jqcy5wdXNoIHJldHVybk9ialxuICAgICAgcS5hbGwgcHJvbWlzZU9ianNcbiAgICAgIC50aGVuIChyZXR1cm5lZE9ianMpLT5cbiAgICAgICAgaSA9IDBcbiAgICAgICAgcmV0dXJuTGlzdCA9IFtdXG4gICAgICAgIGZvciB2aW4gaW4gdmluc0xpc3RcbiAgICAgICAgICBuZXdPYmogPVxuICAgICAgICAgICAgdmluOiB2aW5cbiAgICAgICAgICAgIGRhdGE6IHJldHVybmVkT2Jqc1tpXVxuICAgICAgICAgIHJldHVybkxpc3QucHVzaCBuZXdPYmpcbiAgICAgICAgICBpKytcbiAgICAgICAgZGZkLnJlc29sdmUgcmV0dXJuTGlzdFxuICAgIGRmZC5wcm9taXNlXG4gIGRlbGV0ZUhhc2g6IC0+XG4gICAgY29uc29sZS5sb2cgXCJEZWxldGVIYXNoIENUUkwgRklSRURcIlxuICAgIHJlZGlzLmhkZWwoJ215aGFzaDInLCdpZCcsICdtYWtlJywgJ21vZGVsJylcbiAgZ2V0Q2FjaGU6IC0+XG4gICAgc3RyZWFtID0gcmVkaXMuc2NhblN0cmVhbSgpXG4gICAga2V5cyA9IFtdXG4gICAgcHJvbWlzZXMgPSBbXVxuICAgIGRmZCA9IHEuZGVmZXIoKVxuICAgIHN0cmVhbS5vbignZGF0YScsIChyZXN1bHRzKS0+XG4gICAgICBmb3Iga2V5IGluIHJlc3VsdHNcbiAgICAgICAgdGVtcCA9IHJlZGlzLmdldChrZXkpXG4gICAgICAgIGtleXMucHVzaCBrZXlcbiAgICAgICAgcHJvbWlzZXMucHVzaCB0ZW1wXG4gICAgICBxLmFsbCBwcm9taXNlc1xuICAgICAgLnRoZW4gKHVwZGF0ZWRLZXlzKS0+XG4gICAgICAgIGk9MFxuICAgICAgICBjb21iaW5lZEtleXMgPSBbXVxuICAgICAgICBmbGFnID0gZmFsc2VcbiAgICAgICAgd2hpbGUgaSA8IDFcbiAgICAgICAgICB5ID0gMFxuICAgICAgICAgIGZvciBrZXkgaW4ga2V5c1xuICAgICAgICAgICAgY29tYmluZWRLZXlzW3ldID1cbiAgICAgICAgICAgICAgXCIje2tleX1cIjogdXBkYXRlZEtleXNbeV1cbiAgICAgICAgICAgIHkrK1xuICAgICAgICAgIGkrK1xuICAgICAgICBpZiB1cGRhdGVkS2V5cy5sZW5ndGggPCAxXG4gICAgICAgICAgZGZkLnJlamVjdCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjb25zb2xlLmxvZyBcIkVMU0VcIiwgY29tYmluZWRLZXlzXG4gICAgICAgICAgZGZkLnJlc29sdmUgY29tYmluZWRLZXlzXG4gICAgKVxuICAgIGRmZC5wcm9taXNlXG4iXX0=
