const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // Importez le module fs pour la gestion des fichiers

// Use body-parser middleware for JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let users = require("./users.json");

app.get('/', (req, res) => {
    res.send("Welcome to your server");
});


// Route pour gérer la connexion
app.get('/connexion', (req, res) => {
    res.send("connexion");
});

app.post('/connexion', (req, res) => {
    const id = req.body.id;
    const motDePasse = req.body.motDePasse;

    // Vérifiez les informations d'identification
    const user = users.find(user => user.id === id);
    //&& user.motDePasse === motDePasse);

    if (user) {
        // Connexion réussie
        res.status(200).json({ result: true, message: "Connexion réussie" });
        console.log("connected");
    } else {
        // Identifiants incorrects
        res.status(401).json({ result: false, message: "Identifiants incorrects" });
        console.log("error");
    }
});

app.get('/creer-compte', (req, res) => {
    res.send("creer-compte");
});

app.post('/creer-compte', (req, res) => {
    // Récupérer les données du formulaire
    const newUser = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        blogId: req.body.blogId,
        motDePasse: req.body.motDePasse // Ajouter le mot de passe
    };

    // Lire le contenu actuel du fichier users.json
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            res.status(500).json({ error: "Erreur lors de la création du compte" });
            return;
        }

        // Parser les données JSON
        const users = JSON.parse(data);

        // Vérifier si l'utilisateur existe déjà
        const existingUser = users.find(user => user.id === newUser.id);

        if (existingUser) {
            // Utilisateur déjà existant
            res.status(400).json({ error: "Ce compte existe déjà" });
            console.log("error")
        } else {
            // Ajouter le nouvel utilisateur à la liste
            users.push(newUser);
            console.log("En cours...")
            // Réécrire le fichier users.json avec les données mises à jour
            fs.writeFile('./users.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error('Error writing users file:', err);
                    res.status(500).json({ error: "Erreur lors de l'inscription" });
                } else {
                    console.log("Nouvel utilisateur enregistré :", newUser);
                    res.status(200).json({ message: "Inscription réussie" });
                }
            });
        }
    });
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
