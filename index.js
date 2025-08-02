import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // ou especifique seu domínio se quiser restringir
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Novo cliente conectado:', socket.id);

  socket.on('mensagem', (data) => {
    console.log('📩 Mensagem recebida:', data);
    socket.emit('mensagem', data); // envia de volta apenas para quem enviou
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Socket.IO rodando em http://localhost:${PORT}`);
});
