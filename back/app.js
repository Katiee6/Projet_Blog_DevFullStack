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

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//crypto : bibliothèque pour générer des clés aléatoires sécurisées
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey);

//Initialiser et configurer Express Session
const session = require('express-session');
//Stocker les sessions des utilisateurs entre les requêtes

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

//creer et verifier les jetons JWT
const jwt = require('jsonwebtoken');

//fonction pour générer un jeton JWT lorsqu'un utilisateur se connecte avec succès
const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};


const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token invalide' });
        }
    } else {
        res.status(401).json({ message: 'Token manquant' });
    }
};

// Exemple d'utilisation du middleware pour protéger une route
app.get('/profil', verifyTokenMiddleware, (req, res) => {
    // Vous pouvez accéder à l'utilisateur authentifié via req.user
    res.json(req.user);
});

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


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
        // Connexion réussie, générez un jeton JWT
        const token = generateToken(user); // Génération du token
        res.status(200).json({ result: true, message: "Connexion réussie",token: token });
        console.log("connected");
    } else {
        // Identifiants incorrects
        res.status(401).json({ result: false, message: "Identifiants incorrects" });
        console.log("error");
    }
});

//Route pour la ccréation de compte
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



// Route pour récupérer les informations de l'utilisateur actuellement connecté ou qui a créé un compte
app.get('/profil/:id', (req, res) => {
    const userId = req.params.id; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const user = users.find(user => user.id === userId); // Rechercher l'utilisateur dans la liste des utilisateurs
    if (user) {
        res.status(200).json(user); // Renvoyer les informations de l'utilisateur au format JSON
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé" }); // Renvoyer une erreur si l'utilisateur n'est pas trouvé
    }
});

// Route pour mettre à jour le profil de l'utilisateur
app.put('/profil/:id', (req, res) => {
    const userId = req.params.id; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const updatedUser = req.body; // Récupérer les nouvelles données de l'utilisateur à partir du corps de la requête

    // Rechercher l'utilisateur dans la liste des utilisateurs
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        // Mettre à jour les données de l'utilisateur
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        // Réécrire le fichier users.json avec les données mises à jour
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
app.post('/blog/nouveau', (req, res) => {
    const { titre, contenu } = req.body; // Récupérer le titre et le contenu saisis
    const nouveauMessage = new Message(titre, contenu); // Créer le message
    listeMessages.push(nouveauMessage); // Ajouter le message à la liste
    res.status(201).json(nouveauMessage); // Renvoyer le message
});

// Route GET pour la liste des messages
app.get('/blog/liste', (req, res) => {
    console.log(listeMessages);
    res.status(200).json(Object.values(listeMessages));
})

// Route GET pour les détails d'un message
app.get('/blog/:id', (req, res) => {
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
app.delete('/blog/:id', (req, res) => {
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
