export class Message {
  id!: number; // number ou string ???
  titre!: string;
  contenu!: string;
  date!: string;

  constructor(){
    this.id = 1; // A CHANGER : id unique à chaque fois
    this.date = new Date().toLocaleString("fr-FR"); // Pour changer le format de la date
  }

}
