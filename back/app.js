const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const bodyParser = require('body-parser');
const cors = require('cors');

// Use body-parser middleware for JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const user = [{ name: 'Name' }];

app.get('/', (req, res) => {
    res.send("Welcome to your server");
});


// Route pour gérer la connexion
app.get('/connexion', (req, res) => {
    res.send("connexion");
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
app.get('/creer-compte', (req, res) => {
    res.send("creer compte");
});

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
// Server setup
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
