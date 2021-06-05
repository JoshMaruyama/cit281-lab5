const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];
  
  // Require the Fastify framework and instantiate it
  const fastify = require("fastify")();
  
  // Handle GET verb for / route using Fastify
  // Note use of "chain" dot notation syntax
  fastify.get("/cit/student", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students);
  });
  
  fastify.get("/cit/student/:id", (request, reply) => {
    // console.log(request);
    let studentIDFromClient = request.params.id;
    let studentToGiveToClient = null;
    for (studentFromArray of students){
      if (studentFromArray.id == studentIDFromClient){
        studentToGiveToClient = studentFromArray;
        break;
      }
    }
    if (studentToGiveToClient != null){
      reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(studentToGiveToClient);
    } else {
      reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Could not find student with given ID");
    }
  });
  
  fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Wildcard Route!</h1>");
  });
  
  fastify.post("/cit/students/add", (request, reply) => {
    let dataFromClient = JSON.parse(request.body);
    console.log(dataFromClient);
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Recieved post request</h1>");
  });
  
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });