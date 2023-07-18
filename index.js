import express, { json } from "express";

const app = express();

app.use(json());

const users = [];

let id = 0;

//Rota para criar um usuario
app.post("/users", (req, res) => {
  const nome = req.body.nome;
  const email= req.body.email;
  const senha = req.body.senha;
  const user = { id, nome, email, senha, recados: [] };
  users.push(user);
  id++;

if(nome||senha||email === undefined){
  res.status(400).json({ mensagem: "Insira dados válidos", user: user });
}  else {
  res.status(201).json({ mensagem: "usuário criado com sucesso", user: user });
}
});

//Rota para listar todos os usuarios
app.get("/users", (req, res) => {
  res.json(users);
});

//Rota para obter o usuario pelo ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((e) => e.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  return res.status(200).json({ mesagem: "Usuário encontrado!", user: user });
});

//Rota para atualizar o usuario pelo ID
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const senha = req.body.senha;
  const user = users.find((e) => e.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  if (nome && senha) {
    user.nome = nome;
    user.senha = senha;
  } else if (nome && !senha) {
    user.nome = nome;
  } else {
    user.senha = senha;
  }

  return res.status(200).json({ mensagem: "Usuário atualizado", user: user });
});

//Rota para deletar um usuario pelo ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.findIndex((e) => e.id === parseInt(id));

  if (user === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  users.splice(user, 1);
  return res.status(200).json({ mensagem: "Usuário deletado" });
});

let idRecado = 0;

//Rota para criar um recado
app.post("/recados/:id", (req, res) => {
  const id = req.params.id;
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const recado = { id: idRecado, titulo, descricao };
  const user = users.find((e) => e.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  user.recados.push(recado);
  idRecado++;
  return res.status(201).json({ mensagem: "Recado criado com sucesso", user });
});

//Rota para buscar recados de um usuario
app.get("/recados/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404);
    res.send({ error: "Usuário não encontrado" });
  }
  res.status(200);
  res.send({ mensagem: "Recados encontrados", recados: user.recados });
});

//Rota para editar um recado pelo ID
app.put("/recados/:id/:idRecado", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === parseInt(userId));
  if (!user) {
    res.status(404);
    res.send({ error: "Usuário não encontrado" });
  }

  const id = req.params.idRecado;
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const recado = user.recados.find((recado) => recado.id === parseInt(id));

  if (!recado) {
    res.status(404);
    res.send({ error: "Recado não encontrado" });
  }

  recado.titulo = titulo || recado.titulo;
  recado.descricao = descricao || recado.descricao;

  res.status(200);
  res.send({ mensagem: "Recado alterado", recado: recado });
});

//Rota para deletar um recado pelo ID
app.delete("/recados/:id/:idRecado", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === parseInt(userId));
  if (!user) {
    res.status(404);
    res.send({ error: "Usuário não encontrado" });
  }
  const id = req.params.idRecado;
  const recado = user.recados.find((recado) => recado.id === parseInt(id));

  if (!recado) {
    res.status(404);
    res.send({ error: "Recado não encontrado" });
  }

  const novosRecados = user.recados.filter(
    (recado) => recado.id !== parseInt(id)
  );
  user.recados = novosRecados;

  res.status(200);
  res.send({ mensagem: "Recado deletado", recados: novosRecados });
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});