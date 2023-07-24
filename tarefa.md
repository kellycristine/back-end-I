# Aplicação CRUD de recados


# Criação de conta

    ○ Identificador - [ ok ] Único
    ○ Nome
    ○ E-mail 
    ○ Senha
            => Verificações
                [ ok ] Nome && E-mail && Senha tem que ser !undefined
                [ ok ] E-mail !e-mail-cadastrado
# Login
    ○ E-mail
    ○ Senha
             => Verificações
                [ok] E-mail && Senha tem que ser !undefined
                [ok] E-mail && Senha === a user-cadastrado
# CRUD de recados (Criar, Listar, Atualizar e Apagar)
    ○ Identificador - [ ok ] Único
    ○ Título
    ○ Descrição
             => Verificações
                [ ok ] Título && Descrição !undefined
                [ ok ] Criar recado
    =>          [ ok ] Para cadastrar o recado, o user deve está cadastrado e logado
                [ ok ] Cada recado deve ser de um único usuário
    =>          [ ok ] editar recado
    =>          [ ok ] apagar recado
