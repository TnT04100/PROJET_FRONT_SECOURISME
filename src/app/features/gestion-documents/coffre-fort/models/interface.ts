export default interface Fichier {
  id?: number,
  name: string,
  fileType: 'Dossier de fichier' | 'Fichier' | 'Fichier PDF' | 'Fichier Word' | 'Fichier Excel' | 'Fichier PowerPoint' | 'Fichier image' | 'Fichier audio' | 'Fichier vidéo' | 'Fichier texte' | 'Fichier compressé' | 'Fichier autre',
  uploadDate?: string,
  taille?: string,
  children?: Fichier[];

}
