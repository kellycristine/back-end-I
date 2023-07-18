import express from "express";
const usuarios = [
    {
        nome: "Teste1",
        identificador: 0,
        email: "teste1@teste.com",
        senha: "teste1"
    },
    {
        nome: "Teste2",
        identificador: 1,
        email: "teste2@teste.com",
        senha: "teste2"
    },
];
let contador = 2;
const app = express();

app.use(express.json());

app.post("/teste", function (requisicao, resposta){
    console.log(requisicao.body);
    resposta.send("Olá Mundo!");
});

app.post("/login", function (requisicao, resposta){
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    const usuario = usuario.find(function (usuario){
        if (usuario.email === email && usuario.senha === senha){
            return true;
        }
    });

    if(usuario){
        resposta.status(200);
        resposta.json(usuario);
    } else {
        resposta.status(400);
        resposta.send("usúario inválido");
    }
});

app.post("/cadastro-de-usuario", function(requisicao, resposta){
    if(
        requisicao.body.nome === undefined ||
        requisicao.body.email === undefined ||
        requisicao.body.senha === undefined
    ){
        resposta.status(400);
        resposta.send("Você deve enviar nome, email, senha");
        return;
    }
    const novoUsuario = {
        nome: requisicao.body.nome,
        email: requisicao.body.email,
        senha: requisicao.body.senha,
        identificador: contador,
    };
    let possuiMesmoEmail = false;
    for (const usuario of usuarios){
        if (usuario.email === novoUsuario.email){
            possuiMesmoEmail = true;
        }
    }

    if (possuiMesmoEmail){
        resposta.status(400);
        resposta.send("Email já cadastrado!");
    } else {
        resposta.send("Usuário cadastrado com sucesso!");
        usuarios.push(novoUsuario);
    }

    console.log("possui mesmo", possuiMesmoEmail);
    console.log(usuarios);
    contador++;
});

const recados = [
    {
        titulo: "Título 1",
        descricao: "Descrição 1"
    }
]
let contadorRecados = 0;

app.post("/recados", function (requisicao, resposta){
    if (requisicao.body.titulo === undefined ||
        requisicao.body.descricao === undefined
        ){
            resposta.status(401);
            resposta.send("Você deve enviar um título e descrição");
            return;
        }
    const novoRecado = {
        titulo: requisicao.body.titulo,
        descricao: requisicao.body.descricao,
        identificador: contadorRecados++,
    }
    if( requisicao.body.titulo && requisicao.body.descricao !== undefined ) {
        recados.push(novoRecado);
        resposta.send("Recado cadastrado com sucesso!");
    }
    console.log(requisicao.body);
    console.log(recados);
});

app.listen(3000, function() {
    console.log("Aplicação está rodando na porta 3000: http://localhost:3000");
    console.log("ip local: http://:3000");
});
