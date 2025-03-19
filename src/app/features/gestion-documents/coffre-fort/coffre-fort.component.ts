import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Services} from './services/services.service';
import Fichier from './models/interface';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-coffre-fort',
  imports: [RouterModule, NgForOf, NgIf],
  templateUrl: './coffre-fort.component.html',
  styleUrl: './coffre-fort.component.css'
})
export class CoffreFortComponent implements OnInit {
  chemin: Fichier[] = []; // Stocke le chemin actuel
  fichiersAffiches: Fichier[] = [];

  constructor(private coffreFortService: Services, private router: Router) {}

  ngOnInit(): void {
    console.log(this.coffreFortService.getFichiers());
    this.mettreAJourAffichage();
  }

  // ✅ Ouvrir un dossier et naviguer à l'intérieur
  ouvrirDossier(dossier: Fichier) {
    if (dossier.fileType === 'Dossier de fichier' && dossier.children) {
      this.chemin.push(dossier);
      this.mettreAJourAffichage();
    }
  }

  // ✅ Retourner au dossier précédent
  retour() {
    if (this.chemin.length > 0) {
      this.chemin.pop();
      this.mettreAJourAffichage();
    }
  }

  // ✅ Met à jour les fichiers affichés en fonction du dossier actuel
  private mettreAJourAffichage() {
    this.fichiersAffiches = this.chemin.length
      ? this.chemin[this.chemin.length - 1].children || []
      : this.coffreFortService.getFichiers();
  }


  // ✅ Télécharger un document avec confirmation
  telechargerDocument() {
    this.coffreFortService.telechargerDocument();
    this.mettreAJourAffichage();
  }


  // ✅ Paramètres (À implémenter)
  ouvrirParametres() {
    alert("⚙️ Ouverture des paramètres en cours de développement !");
  }

  // ✅ Déconnexion (À implémenter)
  seDeconnecter() {
    alert("🚪 Déconnexion en cours...");
    this.router.navigate(['/login']); // Redirige vers une éventuelle page de connexion
  }

  // ✅ Retour à l'accueil
  retourAccueil() {
    this.router.navigate(['/']);
  }

  ouvrirExplorateur() {
    this.coffreFortService.ouvrirExplorateur();
    this.mettreAJourAffichage();
  }

  ajouterDossier() {
    this.coffreFortService.ajouterDossier();
    this.mettreAJourAffichage();
  }

  // ✅ Générer le chemin actuel sous forme de texte
  getCheminActuel(): string {
    if (this.chemin.length === 0) {
      return "📂 Racine"; // Si on est à la racine
    }

    return "📂 " + this.chemin.map(dossier => dossier.name).join(" / "); // Affiche le chemin avec "/"
  }

  supprimerFichier(fichier: Fichier) {
    const confirmation = confirm(`Voulez-vous vraiment supprimer "${fichier.name}" ?`);
    if (!confirmation) {
      return; // ✅ Annule la suppression si l'utilisateur refuse
    }

    // ✅ Vérifie si l'on est dans un dossier ou à la racine
    const dossierActuel = this.chemin.length > 0 ? this.chemin[this.chemin.length - 1] : { children: this.fichiersAffiches };

    // ✅ Filtrer les fichiers pour exclure celui à supprimer
    // @ts-ignore
    dossierActuel.children = dossierActuel.children.filter(f => f !== fichier);

    // ✅ Met à jour l'affichage
    this.mettreAJourAffichage();
    alert(`🗑 Le fichier "${fichier.name}" a été supprimé.`);
  }

  // ✅ Vérifie s'il y a au moins un fichier pour afficher la colonne "Actions"
  doitAfficherActions(): boolean {
    return this.fichiersAffiches.some(fichier => fichier.fileType.startsWith('Fichier'));
  }



}
