import Express from "express";

const app = Express();
const port = 3050;


app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

let clients = []; // här sparas alla "klienter"
// varje objekt i arrayen är en res ifrån eventHandler 


// Event handler
app.get("/events", (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });

    /*
    Spara alla res i en array, det är alla som är kopplade till routen

    Eftersom routen aldrig stänger kan man fortsätta skicka data till dom
    genom att loopa igenom den och köra res.write*/
    clients.push(res);


  
    req.on('close', () => {
      // Ta bort client från array om kopplingen bryts
      clients = clients.filter(client => client !== client);
    });
})


// Om det kommer in något nytt på denna route (genom params),
// då loopas alla clients igenom och skickar ut det till dom
app.get("/post/:msg", (req, res) => {
    const msg = req.params.msg;
    
    // Här skickas datan ut till alla klienter som är kopplade till EventHandlern (/events)
    // Man hade lika gärna kunnat skicka ut t.ex. alla stolar för en screening här
    clients.forEach(res => {
        res.write(`data: ${msg}\n\n`)
    })
    


    res.json(msg)
})



app.listen(port, () => {
    console.log("Server running on port " + port)
});