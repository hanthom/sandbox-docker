(function() {
  var Redis, q, redis;

  q = require('q');

  Redis = require('ioredis');

  redis = new Redis('//redis:6379');

  module.exports = {
    postCache: function(postObj) {
      var key, results1, val;
      console.log("POSTObj", postObj);
      results1 = [];
      for (key in postObj) {
        val = postObj[key];
        console.log("KEY: " + key + "\nVALUE: " + val);
        results1.push(redis.set(key, val));
      }
      return results1;
    },
    getCache: function() {
      var dfd, keys, promises, stream;
      stream = redis.scanStream();
      keys = [];
      promises = [];
      dfd = q.defer();
      stream.on('data', function(results) {
        var j, key, len, newObj, temp;
        for (j = 0, len = results.length; j < len; j++) {
          key = results[j];
          temp = redis.get(key);
          newObj = {};
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWFzc2V0cy9jb250cm9sbGVycy9yZWRpc0N0cmwuanMiLCJzb3VyY2VzIjpbInNlcnZlci1hc3NldHMvY29udHJvbGxlcnMvcmVkaXNDdHJsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxHQUFSOztFQUNKLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUjs7RUFDUixLQUFBLEdBQVksSUFBQSxLQUFBLENBQU0sY0FBTjs7RUFHWixNQUFNLENBQUMsT0FBUCxHQUdFO0lBQUEsU0FBQSxFQUFXLFNBQUMsT0FBRDtBQUNULFVBQUE7TUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBdUIsT0FBdkI7QUFJQTtXQUFBLGNBQUE7O1FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFBLEdBQVUsR0FBVixHQUFjLFdBQWQsR0FDSCxHQURUO3NCQUdBLEtBQUssQ0FBQyxHQUFOLENBQVUsR0FBVixFQUFlLEdBQWY7QUFKRjs7SUFMUyxDQUFYO0lBVUEsUUFBQSxFQUFVLFNBQUE7QUFDUixVQUFBO01BQUEsTUFBQSxHQUFTLEtBQUssQ0FBQyxVQUFOLENBQUE7TUFDVCxJQUFBLEdBQU87TUFDUCxRQUFBLEdBQVc7TUFDWCxHQUFBLEdBQU0sQ0FBQyxDQUFDLEtBQUYsQ0FBQTtNQUNOLE1BQU0sQ0FBQyxFQUFQLENBQVUsTUFBVixFQUFrQixTQUFDLE9BQUQ7QUFDaEIsWUFBQTtBQUFBLGFBQUEseUNBQUE7O1VBQ0UsSUFBQSxHQUFPLEtBQUssQ0FBQyxHQUFOLENBQVUsR0FBVjtVQUNQLE1BQUEsR0FBUztVQUNULElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVjtVQUNBLFFBQVEsQ0FBQyxJQUFULENBQWMsSUFBZDtBQUpGO2VBS0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxRQUFOLENBQ0EsQ0FBQyxJQURELENBQ00sU0FBQyxXQUFEO0FBQ0osY0FBQTtVQUFBLENBQUEsR0FBRTtVQUNGLFlBQUEsR0FBZTtVQUNmLElBQUEsR0FBTztBQUNQLGlCQUFNLENBQUEsR0FBSSxDQUFWO1lBQ0UsQ0FBQSxHQUFJO0FBQ0osaUJBQUEsd0NBQUE7O2NBQ0UsWUFBYSxDQUFBLENBQUEsQ0FBYixHQUNFO3NCQUFBLEVBQUE7b0JBQUEsRUFBQSxHQUFHLE9BQU8sV0FBWSxDQUFBLENBQUEsQ0FBdEI7OztjQUNGLENBQUE7QUFIRjtZQUlBLENBQUE7VUFORjtVQU9BLElBQUcsV0FBVyxDQUFDLE1BQVosR0FBcUIsQ0FBeEI7bUJBQ0UsR0FBRyxDQUFDLE1BQUosQ0FBQSxFQURGO1dBQUEsTUFBQTtZQUdFLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWixFQUFvQixZQUFwQjttQkFDQSxHQUFHLENBQUMsT0FBSixDQUFZLFlBQVosRUFKRjs7UUFYSSxDQUROO01BTmdCLENBQWxCO2FBd0JBLEdBQUcsQ0FBQztJQTdCSSxDQVZWOztBQVJGIiwic291cmNlc0NvbnRlbnQiOlsicSA9IHJlcXVpcmUgJ3EnXG5SZWRpcyA9IHJlcXVpcmUgJ2lvcmVkaXMnXG5yZWRpcyA9IG5ldyBSZWRpcygnLy9yZWRpczo2Mzc5JylcblxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICMgcG9zdENhY2hlXG4gICMgUG9zdHMgdGhlIGRhdGEgdGhhdCBpcyBiZWluZyBzZW50IGluIHRvIHRoZSBSZWRpcyBjYWNoZSBzZXJ2ZXJcbiAgcG9zdENhY2hlOiAocG9zdE9iaiktPlxuICAgIGNvbnNvbGUubG9nIFwiUE9TVE9ialwiLCBwb3N0T2JqXG4gICAgIyBvYmogPVxuICAgICMgICBhX2tleTogJ2FiYydcbiAgICAjICAgYl9rZXk6ICcxMjMnXG4gICAgZm9yIGtleSwgdmFsIG9mIHBvc3RPYmpcbiAgICAgIGNvbnNvbGUubG9nIFwiXCJcIktFWTogI3trZXl9XG4gICAgICBWQUxVRTogI3t2YWx9XG4gICAgICBcIlwiXCJcbiAgICAgIHJlZGlzLnNldChrZXksIHZhbClcbiAgZ2V0Q2FjaGU6IC0+XG4gICAgc3RyZWFtID0gcmVkaXMuc2NhblN0cmVhbSgpXG4gICAga2V5cyA9IFtdXG4gICAgcHJvbWlzZXMgPSBbXVxuICAgIGRmZCA9IHEuZGVmZXIoKVxuICAgIHN0cmVhbS5vbignZGF0YScsIChyZXN1bHRzKS0+XG4gICAgICBmb3Iga2V5IGluIHJlc3VsdHNcbiAgICAgICAgdGVtcCA9IHJlZGlzLmdldChrZXkpXG4gICAgICAgIG5ld09iaiA9IHt9XG4gICAgICAgIGtleXMucHVzaCBrZXlcbiAgICAgICAgcHJvbWlzZXMucHVzaCB0ZW1wXG4gICAgICBxLmFsbCBwcm9taXNlc1xuICAgICAgLnRoZW4gKHVwZGF0ZWRLZXlzKS0+XG4gICAgICAgIGk9MFxuICAgICAgICBjb21iaW5lZEtleXMgPSBbXVxuICAgICAgICBmbGFnID0gZmFsc2VcbiAgICAgICAgd2hpbGUgaSA8IDFcbiAgICAgICAgICB5ID0gMFxuICAgICAgICAgIGZvciBrZXkgaW4ga2V5c1xuICAgICAgICAgICAgY29tYmluZWRLZXlzW3ldID1cbiAgICAgICAgICAgICAgXCIje2tleX1cIjogdXBkYXRlZEtleXNbeV1cbiAgICAgICAgICAgIHkrK1xuICAgICAgICAgIGkrK1xuICAgICAgICBpZiB1cGRhdGVkS2V5cy5sZW5ndGggPCAxXG4gICAgICAgICAgZGZkLnJlamVjdCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjb25zb2xlLmxvZyBcIkVMU0VcIiwgY29tYmluZWRLZXlzXG4gICAgICAgICAgZGZkLnJlc29sdmUgY29tYmluZWRLZXlzXG4gICAgKVxuICAgIGRmZC5wcm9taXNlXG4iXX0=
