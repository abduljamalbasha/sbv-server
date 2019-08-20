var cluster = require("cluster");

if (cluster.isMaster) {
  const numCPUs = require("os").cpus().length;

  // fork application workers
  console.log(numCPUs);
  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork().process;
    //cluster.fork()
    console.log("worker started. process id %s", worker.pid);
  }
} else {
  console.log("hello there");
  require("./app");
  //callback(cluster);
}
