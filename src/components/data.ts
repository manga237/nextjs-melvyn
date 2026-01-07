interface lesson {
  id: string;
  title: string;
  description: string;
}
type Video = {
  id: string;
  title: string;
  lessons: lesson[];
};

export const videos: Video[] = [
  {
    id: "video-1",
    title: "Bases de Next.js",
    lessons: [
      {
        id: "video1-lesson1",
        title: "Présentation de Next.js",
        description:
          "Découverte du framework Next.js, de ses objectifs principaux et des avantages qu’il apporte pour le développement d’applications web modernes et performantes.",
      },
      {
        id: "video1-lesson2",

        title: "Création du premier projet",
        description:
          "Guide étape par étape pour créer un nouveau projet Next.js, comprendre la structure des dossiers et lancer l’application en environnement de développement.",
      },
    ],
  },
  {
    id: "video-2",
    title: "Routage et navigation",
    lessons: [
      {
        id: "video2-lesson1",

        title: "Pages Router vs App Router",
        description:
          "Comparaison entre le Pages Router et l’App Router, leurs différences d’architecture et les cas d’utilisation recommandés pour chacun.",
      },
      {
        id: "video2-lesson2",

        title: "Navigation et liens",
        description:
          "Utilisation du composant Link, gestion de la navigation entre les pages et bonnes pratiques pour améliorer l’expérience utilisateur.",
      },
    ],
  },
  {
    id: "video-3",
    title: "Server Components et données",
    lessons: [
      {
        id: "video3-lesson1",

        title: "Introduction aux Server Components",
        description:
          "Comprendre le fonctionnement des Server Components, leurs bénéfices en termes de performances et leur rôle dans les applications Next.js modernes.",
      },
      {
        id: "video3-lesson2",

        title: "Récupération des données",
        description:
          "Apprendre à récupérer des données côté serveur, gérer le cache et optimiser les performances grâce aux mécanismes intégrés de Next.js.",
      },
    ],
  },
  {
    id: "video-4",
    title: "Base de données avec Prisma",
    lessons: [
      {
        id: "video4-lesson1",

        title: "Découverte de Prisma",
        description:
          "Présentation de Prisma, de son écosystème et de la manière dont il simplifie la gestion et la manipulation des bases de données.",
      },
      {
        id: "video4-lesson2",

        title: "Connexion et requêtes",
        description:
          "Mise en place de Prisma dans un projet Next.js, connexion à une base de données et écriture des premières requêtes sécurisées.",
      },
    ],
  },
];
