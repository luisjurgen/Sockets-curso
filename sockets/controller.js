const sockerController = (socket)=>{
   console.log('Cliente Conectado', socket.id)

   socket.on('disconnect',()=>{
      console.log('Cliente desconectado', socket.id)
   })

   socket.on('enviar-mensaje',(payload,callback)=>{
      const id= 1234;
      callback({id,fecha:new Date().getTime()});

      socket.broadcast.emit('enviar-mensaje',payload);
   })
}

export {sockerController}