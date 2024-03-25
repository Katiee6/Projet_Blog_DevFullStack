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


// GESTION DES MESSAGES :

// Identifiant du message (incrémenté à chaque création)
let idMessage = 0;
// Liste qui contient tous les messages
let listeMessages = [];

// Pour créer un message
function Message(titre, contenu) {
    idMessage++; // On incrémente d'id
    this.id = idMessage;
    this.titre = titre;
    this.contenu = contenu;
    this.date = new Date().toLocaleString("fr-FR"); // Message créé avec la date actuelle
}

// Route POST pour la création d'un message
app.post('/nouveau-message', (req, res) => {
    const { titre, contenu } = req.body; // Récupérer le titre et le contenu saisis
    const nouveauMessage = new Message(titre, contenu); // Créer le message
    listeMessages.push(nouveauMessage); // Ajouter le message à la liste
    res.status(201).json(nouveauMessage); // Renvoyer le message
});

// Route GET pour la liste des messages
app.get('/liste-messages', (req, res) => {
    console.log(listeMessages);
    res.status(200).json(Object.values(listeMessages));
})

// Route GET pour les détails d'un message
app.get('/message/:id', (req, res) => {
    let messageId;
    if (isNaN(req.params.id)) {
        messageId = "";
    } else {
        messageId = parseInt(req.params.id); // On récupère l'id du message
    }
    const message = listeMessages.find(msg => msg.id === messageId); // On recherche le message dans la liste
    if (message) {
        res.status(200).json(message); // On renvoie le message
    } else {
        res.status(404).json({ message: 'Message non trouvé' });
    }
});

// Route DELETE pour la suppression d'un message
app.delete('/message/:id', (req, res) => {
    let messageId;
    if (isNaN(req.params.id)) {
        messageId = "";
    } else {
        messageId = parseInt(req.params.id); // On récupère l'id du message
    }
    const message = listeMessages.find(msg => msg.id === messageId); // On recherche le message dans la liste
    if (message) {
        const index = listeMessages.indexOf(message); // On obtient l'index du message
        listeMessages.splice(index, 1); // On supprime le message de la liste (par son index)
    } else {
        res.status(404).json({ message: 'Message non trouvé' });
    }

})


// Server setup
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
