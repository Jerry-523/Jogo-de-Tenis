const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const jogadores = new Set();


function enviarDadosParaJogadores(dados) {
  io.emit('dados', dados);
}


io.on('connection', (socket) => {
  console.log('Novo jogador conectado!');

 
  jogadores.add(socket);

  
  socket.on('mensagem', (mensagem) => {
    console.log('Mensagem recebida do jogador:', mensagem);

    
    enviarDadosParaJogadores(mensagem);
  });

  
  socket.on('disconnect', () => {
    console.log('Jogador desconectado!');

    
    jogadores.delete(socket);
  });
});

server.listen(8080, () => {
  console.log('Servidor WebSocket em execução na porta 8080.');
});

