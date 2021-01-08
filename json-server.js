const _ = require("lodash");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const db = require("./db.json");

const server = jsonServer.create();
const endpoints = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Sample JWT token for demo purposes
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ" +
  "lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg";

server.use(jsonServer.rewriter({
  "/auth/register": "/users"
}));
server.use(middlewares);
server.use(bodyParser.json());

// GET /veiculos/:veiculoId/historicos
server.get("/veiculos/:veiculoId/historicos", (req, res) => {
  const result = paginate(db["historicos-veiculos"], req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /veiculos/:veiculoId/locais
server.get("/veiculos/:veiculoId/locais", (req, res) => {
  const result = paginate(db["locais-veiculos"], req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /ocorrencias/:ocorrenciaId/naturezas
server.get("/ocorrencias/:ocorrenciaId/naturezas", (req, res) => {
  const result = paginate(db["naturezas-ocorrencias"], req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /ocorrencias/:ocorrenciaId/semelhantes
server.get("/ocorrencias/:ocorrenciaId/semelhantes", (req, res) => {
  const result = paginate(db["ocorrencias"], req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /ocorrencias/:ocorrenciaId/autos-reconhecimentos
server.get("/ocorrencias/:ocorrenciaId/autos-reconhecimentos", (req, res) => {
  const result = paginate(db["autos-reconhecimentos"], req.query["_page"], req.query["_limit"]);
  console.log(db["autos-reconhecimentos"].length);
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /ocorrencias/:ocorrenciaId/partes
server.get("/ocorrencias/:ocorrenciaId/partes", (req, res) => {
  const result = paginate(db["partes-ocorrencias"], req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /elasticsearch/indices
server.get("/elasticsearch/indices", (req, res) => {
  const result = paginate(db["elasticsearch-indices"], req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// GET /delegacias
server.get("/delegacias", (req, res) => {
  const items = _.filter(db["delegacias"], (item) => {
    return item.nome.startsWith(req.query['nome']) || item.id == req.query['id'];
  });

  const result = paginate(items, req.query["_page"], req.query["_limit"]);

  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header('X-Total-Count', result.count); 

  res.json(result.data);
});

// Protect other routes
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    console.log("Access granted");
    next();
  } else {
    console.log("Access denied, invalid JWT");
    res.sendStatus(401);
  }
});

server.use(endpoints);

// Start server
server.listen(4000, () => {
  console.log("JSON Server is running");
});

// Check whether request is allowed
function isAuthorized(req) {
  return true;
}


function paginate(items, _page, _limit) {
  const page = _page || 1;
  const limit = _limit || 10;
  const offset = (page - 1) * limit; 
  const data = items.slice(offset).slice(0, limit);

  return {
    page: page,
    limit: limit,
    count: items.length,
    data: data
  };
}