
const path = require('path')
const WebSocket = require('ws')


const setupChatServer = server => {
    
    //2. Initialize the WS server
    const wss = new WebSocket.Server({server});

    //3. Handling client connection
    wss.on('connection', ws => {
        ws.on('message', msg => {
        console.log(`Recived: ${msg}`); 

        //
        wss.clients.forEach(c => {
            if(c.readyState === WebSocket.OPEN){
                
                c.send(msg);

            }
        })
        });

        console.log('Client connected');
        ws.send('Welcome the chat')
    });

}


module.exports = {setupChatServer};