let ws;

function connectWebSocket(){
  
    //1. Create an instance of a WebSocket pointing to a specific server and port
    ws= new WebSocket('ws://localhost:3006')


    //2. Event handling - onopen, onmessage, onclose
   // - Connection as made at server
    ws.onopen = () => {
        console.log('Connected to server ws port 3006');
    };
    // - Server sends a message to me
    ws.onmessage = (event) =>{
        //Serer send data as blob
      
        const chat = document.getElementById('chat');
        const message = document.createElement('div');

    const reader = new FileReader();

    reader.onload = () => {
        
        message.textContent = reader.result;
        chat.appendChild(message);
        

        msDiv.textContent = document.createTextNode(reader.result);
        //const line = document.createTextNode(reader.result);


        chat.appendChild(message);
        
        
        
        /*const node = document.getElementById("chat");
        const textnode = document.createTextNode(reader.result);
        node.appendChild(textnode);
        
        console.log(reader.result);*/
    };

    if(event.data instanceof Blob){
        reader.readAsText(event.data);
    }};
    

    // - Connecton to server closed
    ws.onclose = () =>{

    };

    
}

function sendMessage(){
    if(ws.readyState === WebSocket.OPEN){
        ws.send(document.getElementById("message").value);
        document.getElementById("message").value="";
    }
}

connectWebSocket();

