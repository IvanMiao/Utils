window.alignmentData = {
  layout: {
    sections: {
      understanding: true,
      limits: true,
      steps: true,
      outputs: true,
      questions: true,
    },
  },
  siteName: "Plan d'alignement",
  hero: {
    type: "Template d'alignement",
    title: "Titre du sujet à présenter",
    summary:
      "Explique en une phrase l'objectif, le cadre et la décision que tu veux obtenir pendant la réunion.",
    primaryAction: "Voir le plan",
    secondaryAction: "Voir les contraintes",
  },
  facts: [
    { label: "Cadre", value: "Situation, périmètre ou point de départ" },
    { label: "Statut", value: "Idée, cadrage, essai, revue ou finalisation" },
    { label: "Décision attendue", value: "Ce qui doit être validé ensemble" },
  ],
  sections: {
    understanding: {
      eyebrow: "Ma compréhension",
      title: "Comment je structure le sujet",
      text:
        "Ajoute ici les dimensions importantes du sujet. Le but est de montrer ce que tu as compris avant de proposer le plan.",
    },
    limits: {
      eyebrow: "Contraintes connues",
      title: "Ce que je prends comme cadre",
      text: "Cliquer sur une contrainte montre son impact direct sur le plan.",
    },
    steps: {
      eyebrow: "Plan propose",
      title: "Avancer par étapes claires",
    },
    outputs: {
      eyebrow: "Livrables",
      title: "Ce que chaque étape doit produire",
    },
    questions: {
      eyebrow: "Alignement attendu",
      title: "Points à valider ensemble",
    },
  },
  topics: [
    {
      title: "Axe 1 du sujet",
      summary:
        "Décris un premier aspect important: une idée, une étape, une contrainte ou un risque.",
      value: "Explique pourquoi cet axe guide le plan.",
      tags: ["à clarifier", "priorité", "impact"],
    },
    {
      title: "Axe 2 du sujet",
      summary:
        "Ajoute un second aspect pour séparer les problèmes au lieu de tout mélanger.",
      value: "Explique ce qui change dans la méthode.",
      tags: ["dépendance", "risque", "validation"],
    },
  ],
  limits: [
    {
      id: "cadre",
      label: "Cadre",
      title: "Cadre disponible",
      text: "Liste ce qui est possible, limité ou déjà décidé.",
      impact: "Le plan doit rester cohérent avec ce cadre.",
    },
    {
      id: "elements",
      label: "Éléments",
      title: "Éléments de départ",
      text: "Explique quels éléments sont disponibles, manquants ou incertains.",
      impact: "Cela détermine ce qui peut être vérifié maintenant.",
    },
    {
      id: "quality",
      label: "Qualité",
      title: "Qualité attendue",
      text: "Définis ce qui rend le résultat acceptable pour ce sujet.",
      impact: "Les critères de qualité évitent une validation vague.",
    },
  ],
  steps: [
    {
      title: "Cadrer le besoin",
      need: "Objectif, contraintes et résultat attendu.",
      output: "Une définition courte du problème et du succès.",
      understanding:
        "Je commence par séparer ce qui est connu, supposé et à vérifier.",
    },
    {
      title: "Construire une première version",
      need: "Un périmètre réduit, des exemples et un format de sortie.",
      output: "Une première version testable.",
      understanding: "Je cherche une preuve rapide, pas une solution finale.",
    },
    {
      title: "Évaluer et apprendre",
      need: "Retours, résultats de test et cas limites.",
      output: "Une liste des écarts, risques et décisions à prendre.",
      understanding:
        "Les erreurs doivent aider à choisir la suite, pas seulement corriger le détail.",
    },
    {
      title: "Élargir le périmètre",
      need: "Accord sur les cas plus difficiles et les dépendances.",
      output: "Une proposition pour traiter la prochaine difficulté.",
      understanding: "Je n'élargis que si la première base est assez claire.",
    },
    {
      title: "Proposer la suite",
      need: "Décision sur priorité, responsabilités et calendrier.",
      output: "Plan de passage à l'échelle, risques et prochaines actions.",
      understanding: "La réunion doit finir avec une décision concrète.",
    },
  ],
  questions: [
    "Quelle décision veut-on prendre à la fin de la réunion?",
    "Quelles contraintes ne sont pas encore confirmées?",
    "Qui valide le résultat de chaque étape?",
    "Quel est le prochain test le plus utile?",
  ],
};
