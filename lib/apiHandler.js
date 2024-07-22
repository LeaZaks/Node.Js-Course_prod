const url = require('url')

//1. Import http module
const http = require('http') 

//Resource database
let customers = [
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
    {id: 6, name: 'Sarah Wilson', address: '333 Cedar St, Countryside', balance: 1200.00 },
    { id: 7, name: 'Robert Taylor', address: '444 Birch St, Townville', balance: 800.60 },
    { id: 8, name: 'Jennifer Martinez', address: '555 Oak St, Cityville', balance: 2200.30 },
    { id: 9, name: 'William Garcia', address: '666 Pine St, Hamletville', balance: 1750.10 },
    { id: 10, name: 'Mary Hernandez', address: '777 Elm St, Countryside', balance: 900.45 },
    { id: 11, name: 'James Lopez', address: '888 Cedar St, Villageton', balance: 600.90 },
    { id: 12, name: 'Patricia Gonzalez', address: '999 Maple St, Suburbia', balance: 300.00 },
    { id: 13, name: 'Richard Rodriguez', address: '111 Birch St, Townville', balance: 1800.75 },
    { id: 14, name: 'Linda Moore', address: '222 Oak St, Cityville', balance: 950.50 },
    { id: 15, name: 'Charles Young', address: '333 Main St, Hamletville', balance: 2000.25 },
    {id: 16, name: 'Amanda Lee', address: '444 Elm St, Countryside', balance: 1300.80 },
    { id: 17, name: 'Joseph Walker', address: '555 Cedar St, Villageton', balance: 1100.35 },
    { id: 18, name: 'Barbara Perez', address: '666 Maple St, Suburbia', balance: 400.15 },
    { id: 19, name: 'Thomas Hall', address: '777 Birch St, Townville', balance: 1600.60 },
    { id: 20, name: 'Jessica Scott', address: '888 Oak St, Cityville', balance: 700.70 }]

const handleApiRequest = (request, response)=>{

    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;// -->/api/v1/customers
    const method = request.method; //--> GET

    const arrUrlParts = pathname.split('/'); //Break Url to parts
    const lastPart = arrUrlParts[arrUrlParts.length - 1]; //Exract Id
    const lastlastPart = arrUrlParts[arrUrlParts.length - 2]; //Exract Id
    
    //--customers--GET
    //--customers--POST
    //--customers--x--GET
    //--customers--x--PUT
    //--customers--x--DELETE
    let route = '';
    if(lastPart==='customers' || lastlastPart==='customers'){
        route = lastlastPart === 'customers'? '--customers--x':'--customers';
    }

    switch(`${route}--${method}`)
    {
        case '--customers--GET':
            if(customers){
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(customers));
            }
            break;
        case '--customers--x--GET':{
            const customer = customers.find(cus=>cus.id==parseInt(lastPart));
                        
            if(customer)
            {
                responses.writeHead(200, {'Content-Type': 'application/json'});
                responses.end(JSON.stringify(customer));
            }
            else{
                responses.writeHead(404, {'Content-Type': 'application/json'});
                responses.end(`Customer ${lastPart} not Found!`);
            }
        }
            break;
        case '--customers--POST':{
            let body = '';

                // Collect data from the request body
                request.on('data', chunk =>  body += chunk.toString() );// convert Buffer to string

                request.on('end', () => {
                    try 
                    {             
                        const newCustomer = JSON.parse(body); // Assuming incoming data is JSON
                        newCustomer.Id = customers.length + 1;
                        
                        customers.push(newCustomer); // Store the new item (you might want to add ID or other properties)
                        response.writeHead(201, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify(newCustomer)); // Respond with the created item
                
                    }
                        catch (error) {
                        response.writeHead(400, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ message: 'Invalid JSON' }));
                    }
                });   
        }
            break;
        case '--customers--x--PUT':
            const index = customers.findIndex(customer => customer.id ==parseInt(lastPart));
        
            if (index !== -1) {
                let body = '';
                
                // Collect data from the request body
                request.on('data', chunk => {
                    body += chunk.toString(); // convert Buffer to string
                });
        
                // When the entire body has been received, handle it
                request.on('end', () => {
                    try {
                        const updatedCustomer = JSON.parse(body); // Assuming incoming data is JSON
                        
                        customers[index].name  = updatedCustomer.name;
                        customers[index].address  = updatedCustomer.address;
                        customers[index].balance  = updatedCustomer.balance;
        
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify(customers[index])); // Respond with the updated customer
                    }
                     catch (error) {
                        response.writeHead(400, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ message: 'Invalid JSON' }));
                    }
                });
            } else 
            {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'Customer not found' }));
            }
            break;
        case '--customers--x--DELETE':
            {
                    // Find index of customer with given id
                const index = customers.findIndex(customer => customer.id == parseInt(lastPart));

                if (index !== -1) {
                    // Remove customer from array
                    customers.splice(index, 1);
                    response.writeHead(204, { 'Content-Type': 'application/json' });
                    response.end();
                } else {
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'Customer not found' }));
                }
            }
            break;
        default:
        {
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end(`END POINT NOT FOUND!`);
        }
        break;
    }
};


module.exports = {handleApiRequest}