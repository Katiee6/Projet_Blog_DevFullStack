export class User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  blogId: string;
  motDePasse : string;

//
  constructor(id: string, nom: string, prenom: string, email: string, telephone: string, blogId: string, motDePasse : string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.blogId = blogId;
    this.motDePasse = motDePasse;
  }
}
