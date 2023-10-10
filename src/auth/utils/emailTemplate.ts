export default function emailTemplate(nome, token) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          body {
              margin: 0;
              background-color: rgb(236, 235, 235);
          }
  
          .container {
              background-color: white;
              margin: 5% 10%;
          }
  
          p,
          h1 {
              margin: 0;
              padding: 3% 1%;
          }
  
          #botao {
              padding: 20px 15px;
              color: white;
              background-color: #4f46e5;
              text-decoration: none;
              border-radius: 5px;
  
          }
  
          #divBotao {
              text-align: center;
              margin: 5% 2%;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <h1>Olá, ${nome}!</h1>
          <p>Você solicitou a recuperação de sua senha de acesso a nossa loja</p>
          <div id="divBotao">
              <a href="http://localhost:3000/novaSenha?token=${token}" id="botao"><b>Clique aqui para cadastrar sua nova senha</b></a>
          </div>
          <p>Se você não solicitou a recuperação de senha, ou em caso de dúvidas envie uma mensagem pra
              <a href="">api.clientes.fatec.osasco@gmail.com</a>
          </p>
  
          <p>Atenciosamente,<br>
              Equipe Api Clientes</p>
      </div>
  </body>
  
  </html>
  `;
}
