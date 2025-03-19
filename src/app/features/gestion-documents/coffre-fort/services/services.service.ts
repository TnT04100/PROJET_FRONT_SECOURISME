import { Injectable } from '@angular/core';
import Fichier from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class Services {

  private fichiers: Fichier[] = [
    {
      name: 'Formation',
      uploadDate: '01/01/2021 12:00',
      fileType: 'Dossier de fichier',
      taille: '',
      children: [
        {
          name: 'PH72',
          uploadDate: '01/01/2021 15:00',
          fileType: 'Dossier de fichier',
          children: [
            {
              name: 'Formateurs',
              uploadDate: '05/03/2022 10:00',
              fileType: 'Dossier de fichier',
              children: [
                {
                  name: 'PSC1',
                  uploadDate: '15/04/2023 09:00',
                  fileType: 'Dossier de fichier',
                  children: [
                    { name: 'NOM_FORMATEUR', uploadDate: '05/03/2022 10:00', fileType: 'Fichier PDF', taille: '1.2Mo' },
                    { name: 'NOM_FORMATEUR_2', uploadDate: '10/03/2022 14:00', fileType: 'Fichier PDF', taille: '800Ko' }
                  ]
                }
              ]
            },
            {
              name: 'Stagiaires',
              uploadDate: '02/02/2000 14:30',
              fileType: 'Dossier de fichier',
              taille: '',
              children: [
                {
                  name: 'PSC',
                  uploadDate: '15/04/2023 09:00',
                  fileType: 'Dossier de fichier',
                  children: [
                    { name: 'NOM_STAGIAIRE', uploadDate: '15/04/2023 09:00', fileType: 'Fichier PDF', taille: '1.2Mo' },
                    { name: 'NOM_STAGIAIRE_2', uploadDate: '15/04/2023 09:00', fileType: 'Fichier PDF', taille: '1.2Mo' },
                    { name: 'NOM_STAGIAIRE_3', uploadDate: '15/04/2023 09:00', fileType: 'Fichier PDF', taille: '800Ko' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  getFichiers(): Fichier[] {
    return this.fichiers;
  }


  // ✅ Ouvrir l'explorateur de fichiers
  ouvrirExplorateur() {
    const fileInput = document.createElement('input'); // ✅ Crée dynamiquement un input
    fileInput.type = 'file';
    fileInput.accept = '*/*'; // ✅ Permet de sélectionner n'importe quel type de fichier
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => this.ajouterDocument(event)); // ✅ Écoute l'événement `change`

    document.body.appendChild(fileInput); // ✅ Ajoute l'élément au DOM
    fileInput.click(); // ✅ Ouvre l’explorateur de fichiers
  }


  // ✅ Ajouter un fichier sélectionné
  ajouterDocument(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fichier = input.files[0]; // ✅ Récupère le fichier sélectionné

      // ✅ Demande où placer le fichier
      let cheminDossier = prompt("Dans quel dossier voulez-vous ajouter ce fichier ? (Exemple: Formation/PH72)");

      if (!cheminDossier) {
        alert("⚠️ Ajout annulé : Aucun dossier spécifié.");
        return;
      }

      // ✅ Trouve le dossier cible
      const dossierCible = this.trouverDossier(cheminDossier);
      if (!dossierCible) {
        alert(`⚠️ Le dossier "${cheminDossier}" n'existe pas.`);
        return;
      }

      // ✅ Création du fichier

      const nouveauFichier: Fichier = {
        name: fichier.name,
        uploadDate: new Date().toLocaleString(),
        // @ts-ignore
        fileType: fichier.type || "Fichier",
        taille: (fichier.size / 1024).toFixed(2) + ' Ko',
        children: [] // Un fichier n'a pas d'enfants
      };

      // ✅ Ajoute le fichier dans le bon dossier
      // @ts-ignore
      dossierCible.children.push(nouveauFichier);
      alert(`📄 Le fichier "${nouveauFichier.name}" a été ajouté dans "${cheminDossier}" !`);

      input.value = ''; // ✅ Réinitialise le champ de sélection
    }
  }

  ajouterDossier() {
    let nomDossier = prompt("Nom du nouveau dossier ?");
    if (!nomDossier) {
      alert("⚠️ Ajout annulé : Aucun nom spécifié.");
      return;
    }

    let cheminDossier = prompt("Dans quel dossier voulez-vous ajouter ce dossier ? (Exemple: Formation/PH72)");
    if (!cheminDossier) {
      alert("⚠️ Ajout annulé : Aucun dossier spécifié.");
      return;
    }

    // ✅ Trouve le dossier cible
    const dossierCible = this.trouverDossier(cheminDossier);
    if (!dossierCible) {
      alert(`⚠️ Le dossier "${cheminDossier}" n'existe pas.`);
      return;
    }

    // ✅ Création du nouveau dossier
    const nouveauDossier: Fichier = {
      name: nomDossier,
      uploadDate: new Date().toLocaleString(),
      fileType: 'Dossier de fichier',
      taille: '',
      children: [] // ✅ C'est un dossier, il peut contenir des fichiers
    };

    // ✅ Ajoute le dossier dans le bon dossier
    // @ts-ignore
    dossierCible.children.push(nouveauDossier);
    alert(`📂 Le dossier "${nomDossier}" a été ajouté dans "${cheminDossier}" !`);
  }

  private trouverDossier(chemin: string): Fichier | null {
    let chemins = chemin.split("/"); // 🔹 Sépare les dossiers du chemin
    let dossierActuel = this.fichiers.find(fichier => fichier.name === chemins[0]); // 🔹 Trouve le dossier racine

    if (!dossierActuel) return null; // ❌ Le dossier n'existe pas

    for (let i = 1; i < chemins.length; i++) {
      // @ts-ignore
      dossierActuel = dossierActuel.children?.find(child => child.name === chemins[i]) || null;
      if (!dossierActuel) return null; // ❌ Le chemin est incorrect
    }

    return dossierActuel;
  }





  // ✅ Télécharger un fichier avec confirmation
  telechargerDocument() {
    if (this.fichiers.length === 0) {
      alert('⚠️ Aucun document disponible à télécharger.');
      return;
    }

    const fichier = this.fichiers[0]; // Simule le téléchargement du premier fichier

    const confirmation = confirm(`Voulez-vous télécharger le fichier : "${fichier.name}" ?`);
    if (!confirmation) {
      return; // Annule si l'utilisateur refuse
    }

    alert(`⬇ Téléchargement en cours : "${fichier.name}"`);

    // Pour un vrai téléchargement, il faudrait générer un lien dynamique
  }
}


