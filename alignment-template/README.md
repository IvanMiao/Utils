# Template d'alignement

Template statique et réutilisable pour présenter un plan de travail pendant une
réunion d'alignement.

## Structure

- `index.html`: structure de la page et ordre des sections.
- `assets/css/base.css`: variables, typographie et reset minimal.
- `assets/css/layout.css`: grille globale, header, hero et sections.
- `assets/css/ui.css`: boutons, onglets, chips et indicateurs.
- `assets/css/cards.css`: panneaux, cartes de sujets et livrables.
- `assets/css/sections.css`: timeline et questions.
- `assets/js/data.js`: contenu configurable.
- `assets/js/state.js`: sauvegarde locale, export et accès au contenu.
- `assets/js/dom.js`: petits helpers pour créer les éléments HTML.
- `assets/js/page.js`: remplissage des textes globaux de la page.
- `assets/js/render.js`: création du HTML depuis le contenu.
- `assets/js/interactions.js`: onglets, cartes ouvrables et progression.
- `assets/js/app.js`: initialisation.

## Modifier le contenu

Le plus simple est d'ouvrir `index.html` et de modifier le texte directement
dans la page. Le panneau `Editer` permet aussi de montrer ou cacher des
sections, ajouter des sujets, contraintes, étapes et questions, puis exporter le
résultat en JSON.

Le bouton `Parcourir` passe en mode présentation: le panneau d'édition, les
boutons de suppression et les boutons d'ajout sont masqués. Le bouton `Editer`
revient au mode modification.

Les modifications sont sauvegardees dans le navigateur avec `localStorage`.
Pour définir un contenu par défaut dans le code, changer `assets/js/data.js`.

Les blocs principaux sont:

- `hero`: titre, résumé et boutons.
- `facts`: cadre, statut et décision attendue.
- `sections`: titres et textes de chaque zone.
- `topics`: ce que tu as compris du sujet.
- `limits`: contraintes et impact sur le plan.
- `steps`: étapes, besoins, livrables et compréhension.
- `questions`: points à valider avec les collègues.

Le reste du code peut rester stable si les sections gardent la meme logique.

## Ouvrir

Ouvrir `index.html` directement dans un navigateur.
