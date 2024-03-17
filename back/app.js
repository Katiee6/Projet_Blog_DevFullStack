
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const bodyParser = require('body-parser');
const cors = require('cors');


// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(express.json);
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true}));
app.use(cors());


const user = [{name : 'Name'}]
app.get('/', (req, res)=>{
    res.send("Welcome to your server")
});

app.get('/user', (req, res)=>{
    res.json(user);
});

app.post('/user', (req, res) => {

});

// Route pour gérer la connexion

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});
app.get('/connexion"', (req, res)=>{
    res.send("connexion")
});
app.post('/connexion', (req, res) => {
    const email = req.body.EmailId;
    const password = req.body.Password;

    // Vérifiez les informations d'identification ici (c'est juste une simulation)
    if (email === "user@example.com" && password === "password") {
        // Connexion réussie, renvoie une réponse JSON avec succès
        res.status(200).json({ result: true, message: "Connexion réussie" });
    } else {
        // Connexion échouée, renvoie une réponse JSON avec un statut HTTP 401
        res.status(401).json({ result: false, message: "Identifiants incorrects" });
    }
});


// Route pour gérer l'inscription
app.post('/creer-compte', (req, res) => {
    // Logique de création de compte ici
    console.log(req.body.fullname);
    console.log(req.body.username);
    console.log(req.body.password);
});

// Server setup
app.listen(4000 , ()=>{
    console.log("server running");
});

app.get('/blog', (req, res) => {
    // A remplacer par l'affichage de la liste
    res.send('On affiche la liste des messages')
})

app.get('/blog/new', (req, res) => {
    // A remplacer par la creation du message
    res.send('On va cree un nouveau message sur cette page')
})

app.post('/blog/new', (req, res) => {
    // A remplacer par la creation du message
    res.send('On va cree un nouveau message sur cette page')
    res.redirect(`/users/${messages.length-1}`) //si messages contient la liste des messages
    res.redirect('/blog') // ou ça directement
})

app.get('/blog/:idMessage', (req, res) => {
    // A remplacer par le message lui meme
    res.send(`On affiche le message id : ${req.params.idMessage}`)
})

app.delete('/blog/:idMessage', (req, res) => {
    // A remplacer par la suppression du message
    res.send(`On supprime le message id : ${req.params.idMessage}`)
    res.redirect('/blog')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
