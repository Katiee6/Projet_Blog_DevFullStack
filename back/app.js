const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


let users = require("./users.json");

// Route pour la page de connexion
app.post('/connexion', (req, res) => {
    const { id, motDePasse} = req.body;
    const user = users.find(user => user.id === id && user.motDePasse===motDePasse);

    if (user) {
        res.status(200).json({ result: true, message: "Connexion réussie" });
        console.log("connecté");
    } else {
        res.status(401).json({ result: false, message: "Identifiants incorrects" });
        console.log("erreur : connexion");

    }
});

// Route pour creer un compte
app.post('/creer-compte', (req, res) => {
    const newUser = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        blogId: req.body.blogId,
        motDePasse: req.body.motDePasse
    };

    const existeUser = users.find(user => user.id === newUser.id);

    if (existeUser) {
        res.status(400).json({ error: "Ce compte existe déjà" });
    } else {
        users.push(newUser);
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

// Route profil
app.get('/profil/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find.id(user => user.id === userId);

    if (user) {
        res.status(200).json(user);
        console.log("ici = "+user);
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        console.log("ici erreur = "+user);

    }
});

// Route pour mettre à jour le profil
app.put('/profil/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    const userIndex= users.find(user => user.id === userId);
console.log(userIndex);
    if (userIndex) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing users file:', err);
                res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
            } else {
                console.log("Profil utilisateur mis à jour :", updatedUser);
                res.status(200).json({ message: "Profil mis à jour avec succès", user: users[userIndex] });
            }
        });
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
    }
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
