// A MODIFIER
// PAS BON, JUSTE UNE TRAME !!!

const express = require("express");
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
