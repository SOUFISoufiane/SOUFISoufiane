/* eslint-disable quotes */
const translations = {
  // === Navigation ===
  nav: {
    fr: { home: "Accueil", skills: "Comp\u00e9tences", projects: "Projets", gallery: "Galerie", contact: "Contact" },
    en: { home: "Home", skills: "Skills", projects: "Projects", gallery: "Gallery", contact: "Contact" }
  },

  // === Footer ===
  footer: {
    fr: "Soufi Soufiane \u2014 \u00c9tudiant en BUT GEII, parcours Automatisme & Informatique Industrielle.",
    en: "Soufi Soufiane \u2014 GEII Student, Automation & Industrial Computing track."
  },

  // === Page titles & meta ===
  titles: {
    fr: {
      home: "Soufi Soufiane | Portfolio",
      competences: "Comp\u00e9tences | Soufi Soufiane",
      projets: "Projets | Soufi Soufiane",
      gallery: "Galerie | Soufi Soufiane",
      contact: "Contact | Soufi Soufiane"
    },
    en: {
      home: "Soufi Soufiane | Portfolio",
      competences: "Skills | Soufi Soufiane",
      projets: "Projects | Soufi Soufiane",
      gallery: "Gallery | Soufi Soufiane",
      contact: "Contact | Soufi Soufiane"
    }
  },

  // =====================
  // HOME PAGE
  // =====================
  home: {
    fr: {
      heroTitle: "Soufi Soufiane",
      heroSubtitle: "\u00c9tudiant en BUT GEII \u2014 Automatisme & Informatique Industrielle",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",

      aboutTitle: "Qui suis-je ?",
      aboutText: "\u00c9tudiant en BUT G\u00e9nie \u00c9lectrique et Informatique Industrielle (GEII) \u00e0 l\u2019IUT du Creusot, je suis en reconversion professionnelle avec l\u2019objectif de devenir ing\u00e9nieur en automatisation et robotique. Apr\u00e8s plusieurs ann\u00e9es dans un autre secteur, j\u2019ai d\u00e9cid\u00e9 de m\u2019orienter vers un domaine technique, concret et porteur, en accord avec ma curiosit\u00e9 naturelle et mon envie d\u2019apprendre.",

      objectivesTitle: "Objectifs professionnels",
      obj1: "Obtenir une alternance de 24 mois en automatisation industrielle <strong>(Obtenue)</strong>",
      obj2: "Travailler sur des projets d\u2019automates, de supervision ou de d\u00e9veloppement embarqu\u00e9",
      obj3: "D\u00e9velopper des comp\u00e9tences solides en programmation industrielle, robotique et conception de syst\u00e8mes",
      obj4: "\u00c9voluer vers un poste d\u2019ing\u00e9nieur en automatisation & robotique d\u2019ici 5 ans",

      progressTitle: "Parcours de formation",
      progressLabel: "Actuellement en fin de 2e ann\u00e9e \u2014 50% du parcours accompli",

      skillsTitle: "Comp\u00e9tences cl\u00e9s",
      skillAutoTitle: "Automatisme",
      skillAutoDesc: "Ladder, GRAFCET, logique combinatoire et s\u00e9quentielle, automates programmables",
      skillElecTitle: "\u00c9lectrotechnique",
      skillElecDesc: "Lecture de sch\u00e9mas, dimensionnement, r\u00e9alisation de circuits",
      skillProgTitle: "Programmation",
      skillProgDesc: "C embarqu\u00e9 (PIC16F7), Python, microcontr\u00f4leurs",
      skillElectrTitle: "\u00c9lectronique",
      skillElectrDesc: "Simulation, soudure CMS/traversants, conception de cartes PCB (KiCad, Ultiboard)",
      skillsLink: "Toutes mes comp\u00e9tences",

      projectsTitle: "Projets techniques",
      projPamiTitle: "Robot autonome \u2014 PAMI",
      projPamiDesc: "Concevoir un robot capable de naviguer de fa\u00e7on autonome dans un labyrinthe.",
      projPamiTech: "Capteurs \u00b7 C embarqu\u00e9 \u00b7 Servomoteurs",
      projIrTitle: "Barri\u00e8re infrarouge",
      projIrDesc: "R\u00e9aliser une barri\u00e8re IR analogique fonctionnelle avec filtre, amplificateur et monostable.",
      projIrTech: "Multisim \u00b7 Ultiboard \u00b7 PCB",
      projAutoTitle: "Automatisme industriel",
      projAutoDesc: "Analyser et automatiser des syst\u00e8mes industriels simul\u00e9s (ascenseur, parking, perceuse).",
      projAutoTech: "GRAFCET \u00b7 Ladder \u00b7 EcoStruxure",

      contactTitle: "Int\u00e9ress\u00e9 par mon profil ?",
      contactText: "N\u2019h\u00e9sitez pas \u00e0 me contacter pour une opportunit\u00e9 ou un projet.",
      contactForm: "Formulaire de contact",
      contactLinkedin: "LinkedIn"
    },
    en: {
      heroTitle: "Soufi Soufiane",
      heroSubtitle: "GEII Student \u2014 Automation & Industrial Computing",
      ctaProjects: "View my projects",
      ctaContact: "Contact me",

      aboutTitle: "About me",
      aboutText: "I am a student in Electrical Engineering and Industrial Computing (GEII) at the IUT du Creusot, currently in a career transition with the goal of becoming an automation and robotics engineer. After several years in another field, I chose to pursue a technical, hands-on and forward-looking domain, driven by my natural curiosity and eagerness to learn.",

      objectivesTitle: "Professional objectives",
      obj1: "Secure a 24-month apprenticeship in industrial automation <strong>(Achieved)</strong>",
      obj2: "Work on PLC, supervision, or embedded development projects",
      obj3: "Build strong skills in industrial programming, robotics, and systems design",
      obj4: "Grow into an automation & robotics engineer role within 5 years",

      progressTitle: "Education path",
      progressLabel: "Currently finishing 2nd year \u2014 50% of the path completed",

      skillsTitle: "Key skills",
      skillAutoTitle: "Automation",
      skillAutoDesc: "Ladder, GRAFCET, combinational and sequential logic, PLCs",
      skillElecTitle: "Electrical engineering",
      skillElecDesc: "Schematic reading, circuit sizing, circuit implementation",
      skillProgTitle: "Programming",
      skillProgDesc: "Embedded C (PIC16F7), Python, microcontrollers",
      skillElectrTitle: "Electronics",
      skillElectrDesc: "Simulation, SMD/THT soldering, PCB design (KiCad, Ultiboard)",
      skillsLink: "All my skills",

      projectsTitle: "Technical projects",
      projPamiTitle: "Autonomous robot \u2014 PAMI",
      projPamiDesc: "Design a robot capable of navigating autonomously through a maze.",
      projPamiTech: "Sensors \u00b7 Embedded C \u00b7 Servomotors",
      projIrTitle: "Infrared barrier",
      projIrDesc: "Build a functional analog IR barrier with filter, amplifier, and monostable.",
      projIrTech: "Multisim \u00b7 Ultiboard \u00b7 PCB",
      projAutoTitle: "Industrial automation",
      projAutoDesc: "Analyze and automate simulated industrial systems (elevator, parking, drill press).",
      projAutoTech: "GRAFCET \u00b7 Ladder \u00b7 EcoStruxure",

      contactTitle: "Interested in my profile?",
      contactText: "Feel free to reach out for an opportunity or a project.",
      contactForm: "Contact form",
      contactLinkedin: "LinkedIn"
    }
  },

  // =====================
  // COMPETENCES PAGE
  // =====================
  competences: {
    fr: {
      pageTitle: "Mes Comp\u00e9tences Cl\u00e9s",
      intro: "Cette page rassemble les comp\u00e9tences les plus repr\u00e9sentatives de mon parcours, issues \u00e0 la fois de ma formation en automatisme et de mon exp\u00e9rience professionnelle pass\u00e9e. Chaque comp\u00e9tence est exprim\u00e9e \u00e0 travers une action concr\u00e8te, un savoir-faire acquis, et les qualit\u00e9s humaines que j\u2019ai d\u00e9velopp\u00e9es en contexte r\u00e9el.",

      techTitle: "Comp\u00e9tences techniques",
      tech1: "<strong>Programmer</strong> des syst\u00e8mes automatis\u00e9s en Ladder et GRAFCET<br><em>en d\u00e9veloppant ma rigueur, ma logique s\u00e9quentielle et mon autonomie</em>",
      tech2: "<strong>Analyser</strong> un cahier des charges et <strong>traduire</strong> un besoin en organigramme fonctionnel<br><em>en d\u00e9veloppant mon sens de l\u2019analyse et ma m\u00e9thode</em>",
      tech3: "<strong>Concevoir</strong> des circuits \u00e9lectriques simples, <strong>c\u00e2bler</strong> des montages sur table et <strong>utiliser</strong> des instruments de mesure<br><em>en renfor\u00e7ant ma pr\u00e9cision, ma rigueur exp\u00e9rimentale et mon sens du d\u00e9tail</em>",
      tech4: "<strong>Simuler</strong> des circuits analogiques, <strong>concevoir</strong> des cartes sur Ultiboard, <strong>r\u00e9aliser</strong> des PCB et <strong>souder</strong> des composants (CMS et traversants)<br><em>en d\u00e9veloppant ma patience, ma m\u00e9thodologie et mon habilet\u00e9 manuelle</em>",
      tech5: "<strong>Programmer</strong> en langage C pour des syst\u00e8mes embarqu\u00e9s simples<br><em>en renfor\u00e7ant ma logique algorithmique et ma capacit\u00e9 de d\u00e9bogage</em>",
      tech6: "<strong>Documenter</strong> un projet technique (sch\u00e9mas, commentaires, rapports)<br><em>en d\u00e9veloppant ma communication technique et la tra\u00e7abilit\u00e9 de mes actions</em>",

      softTitle: "Savoir-\u00eatre professionnel",
      soft1: "<strong>Superviser</strong> et <strong>former</strong> une \u00e9quipe technique<br><em>en d\u00e9veloppant ma responsabilit\u00e9 et mon sens du collectif</em>",
      soft2: "<strong>Adapter</strong> mon discours technique selon le niveau de l\u2019interlocuteur<br><em>en renfor\u00e7ant mon sens de l\u2019\u00e9coute et ma p\u00e9dagogie</em>",
      soft3: "<strong>Organiser</strong> mes priorit\u00e9s techniques dans un environnement sous pression<br><em>en am\u00e9liorant ma gestion du temps et mon autonomie</em>",
      soft4: "<strong>Documenter</strong> les actions techniques pour assurer la tra\u00e7abilit\u00e9<br><em>en d\u00e9veloppant mon organisation et ma pr\u00e9cision</em>",
      soft5: "<strong>Collaborer</strong> dans des \u00e9quipes multiculturelles<br><em>en enrichissant mon adaptabilit\u00e9 et ma conscience professionnelle</em>"
    },
    en: {
      pageTitle: "My Key Skills",
      intro: "This page gathers the most relevant skills I\u2019ve developed through my training in automation and my previous professional experience. Each skill is described through a specific action, the technical know-how acquired, and the soft skills I strengthened.",

      techTitle: "Technical Skills",
      tech1: "<strong>Programming</strong> automated systems in Ladder and GRAFCET<br><em>while developing my rigor, sequential logic and autonomy</em>",
      tech2: "<strong>Analyzing</strong> a technical requirement and <strong>translating</strong> it into a functional diagram<br><em>while enhancing my analytical thinking and structured approach</em>",
      tech3: "<strong>Designing</strong> electrical circuits, <strong>wiring</strong> setups and <strong>using</strong> measurement tools<br><em>to improve accuracy, practical rigor and attention to detail</em>",
      tech4: "<strong>Simulating</strong> analog circuits, <strong>designing</strong> PCBs, <strong>producing</strong> and <strong>soldering</strong> real boards (THT and SMD)<br><em>by developing patience, precision and autonomous workflow</em>",
      tech5: "<strong>Programming</strong> embedded systems in C<br><em>while reinforcing logic building and debugging skills</em>",
      tech6: "<strong>Documenting</strong> technical projects (schematics, reports, comments)<br><em>to enhance clarity and ensure traceability</em>",

      softTitle: "Professional Soft Skills",
      soft1: "<strong>Supervising</strong> and <strong>training</strong> a technical team<br><em>while growing my leadership and collaborative mindset</em>",
      soft2: "<strong>Adapting</strong> my technical explanations to different audiences<br><em>to improve communication and pedagogy</em>",
      soft3: "<strong>Organizing</strong> priorities in a high-pressure environment<br><em>by mastering time management and autonomy</em>",
      soft4: "<strong>Documenting</strong> actions for maintenance and support<br><em>to ensure clarity and efficiency</em>",
      soft5: "<strong>Collaborating</strong> in multicultural teams<br><em>by strengthening adaptability and professionalism</em>"
    }
  },

  // =====================
  // PROJETS PAGE
  // =====================
  projets: {
    fr: {
      pageTitle: "Mes projets techniques",
      intro: "Cette page pr\u00e9sente mes projets les plus significatifs r\u00e9alis\u00e9s au cours de ma formation en BUT GEII. Chaque projet m\u2019a permis de mobiliser des comp\u00e9tences techniques concr\u00e8tes, de progresser dans ma pratique, et de d\u00e9velopper des savoir-\u00eatre essentiels au travail en \u00e9quipe et en autonomie.",

      proj1Title: "\u{1F916} Robot autonome \u2013 Projet PAMI",
      proj1Context: "<span class=\"label\">Contexte :</span> Projet annuel tutor\u00e9 de premi\u00e8re ann\u00e9e du BUT GEII.",
      proj1Goal: "<span class=\"label\">Objectif :</span> Concevoir un robot capable de naviguer de fa\u00e7on autonome dans un labyrinthe.",
      proj1Skills: "<span class=\"label\">Comp\u00e9tences techniques :</span> Gestion d\u2019\u00e9nergie, calculs \u00e9lectriques, conception de cartes (Multisim, KiCad, Ultiboard), gravure, per\u00e7age, soudure traditionnelle et CMS, programmation C embarqu\u00e9 (PIC16F7), initiation \u00e0 Python (Raspberry Pi), mise en \u0153uvre de servomoteurs, capteurs, conversion analogique/num\u00e9rique, PWM.",
      proj1Learned: "<span class=\"label\">Ce que j\u2019ai appris :</span> Cycle complet de d\u00e9veloppement, logique de commande, structuration de projet complexe, apprentissage par la pratique, recherche & d\u00e9veloppement.",
      proj1Soft: "<span class=\"label\">Savoir-\u00eatre d\u00e9velopp\u00e9s :</span> Travail d\u2019\u00e9quipe, coordination via Gantt Project, communication, suivi de planning, leadership (en tant que chef de groupe), autonomie et adaptabilit\u00e9.",

      proj2Title: "\u{1F4E1} Conception et r\u00e9alisation d\u2019une barri\u00e8re infrarouge",
      proj2Context: "<span class=\"label\">Contexte :</span> Situation d\u2019Apprentissage et d\u2019\u00c9valuation n\u00b03 (7 s\u00e9ances de 3h + travail personnel).",
      proj2Goal: "<span class=\"label\">Objectif :</span> R\u00e9aliser une barri\u00e8re infrarouge analogique fonctionnelle et pr\u00e9cise, int\u00e9grant un filtre, un amplificateur, un comparateur et un monostable.",
      proj2Skills: "<span class=\"label\">Comp\u00e9tences techniques :</span> Simulation (Multisim), conception de PCB (Ultiboard), soudure, r\u00e9glage de fr\u00e9quences, analyse de r\u00e9ponse fr\u00e9quentielle, tests et mesures (Bode, chronogrammes), mise en \u0153uvre de composants passifs et actifs.",
      proj2Learned: "<span class=\"label\">Ce que j\u2019ai appris :</span> Pr\u00e9cision dans le dimensionnement, importance des essais/erreurs, rigueur dans la documentation, et gestion d\u2019un projet individuel.",
      proj2Soft: "<span class=\"label\">Savoir-\u00eatre d\u00e9velopp\u00e9s :</span> Organisation, gestion du temps, curiosit\u00e9 technique, pers\u00e9v\u00e9rance, r\u00e9activit\u00e9, capacit\u00e9 \u00e0 rechercher des informations au-del\u00e0 du programme.",
      proj2Pdf: "\u{1F50D} Voir le rapport PDF du projet",

      proj3Title: "\u2699\uFE0F Travaux pratiques d\u2019automatisme \u2013 cas industriels simul\u00e9s",
      proj3Context: "<span class=\"label\">Contexte :</span> TP hebdomadaires avec cahiers des charges industriels (ascenseur, barri\u00e8re, ligne de production, perceuse, parking automatis\u00e9).",
      proj3Goal: "<span class=\"label\">Objectif :</span> Analyser des syst\u00e8mes industriels simples et les automatiser en respectant des contraintes fonctionnelles et temporelles.",
      proj3Skills: "<span class=\"label\">Comp\u00e9tences techniques :</span> GRAFCET, programmation Ladder, simulation et impl\u00e9mentation sur automates physiques avec EcoStruxure Control Expert, manipulation de variables (BOOL, INT, STRING...), temporisations, compteurs, \u00e9tats initiaux, transition vers le Ladder depuis le GRAFCET.",
      proj3Learned: "<span class=\"label\">Ce que j\u2019ai appris :</span> Approfondissement des langages d\u2019automatisme, rigueur dans la programmation, lecture de sch\u00e9mas de fonctionnement.",
      proj3Soft: "<span class=\"label\">Savoir-\u00eatre d\u00e9velopp\u00e9s :</span> Patience, pr\u00e9cision, \u00e9coute active, respect des consignes, r\u00e9flexion structur\u00e9e."
    },
    en: {
      pageTitle: "My Technical Projects",
      intro: "This page presents the most significant projects I have completed during my GEII studies. Each project allowed me to apply concrete technical skills, progress through practice, and develop essential soft skills like teamwork and autonomy.",

      proj1Title: "\u{1F916} Autonomous Robot \u2013 PAMI Project",
      proj1Context: "<span class=\"label\">Context:</span> Year-long team project in the 1st year of the GEII Bachelor\u2019s program.",
      proj1Goal: "<span class=\"label\">Goal:</span> Design and build a robot capable of navigating autonomously through a maze.",
      proj1Skills: "<span class=\"label\">Technical skills:</span> Power management, electrical calculations, circuit design (Multisim, KiCad, Ultiboard), PCB engraving and soldering (THT & SMD), embedded C programming (PIC16F7), Python basics (Raspberry Pi), servomotors, sensors, analog/digital conversion, PWM.",
      proj1Learned: "<span class=\"label\">What I learned:</span> Full development cycle, control logic, project structuring, hands-on learning, R&D mindset.",
      proj1Soft: "<span class=\"label\">Soft skills developed:</span> Teamwork, Gantt-based planning, communication, leadership (as team lead), autonomy and adaptability.",

      proj2Title: "\u{1F4E1} Design and Implementation of an Infrared Barrier",
      proj2Context: "<span class=\"label\">Context:</span> Practical lab (SAE) over 7 sessions of 3h, plus personal work.",
      proj2Goal: "<span class=\"label\">Goal:</span> Build a functional and precise analog infrared sensor system using a filter, amplifier, comparator, and monostable.",
      proj2Skills: "<span class=\"label\">Technical skills:</span> Circuit simulation (Multisim), PCB design (Ultiboard), soldering, frequency tuning, Bode plots, timing analysis, active/passive components.",
      proj2Learned: "<span class=\"label\">What I learned:</span> Precision in component sizing, importance of trial & error, rigorous documentation, independent work planning.",
      proj2Soft: "<span class=\"label\">Soft skills developed:</span> Time management, technical curiosity, perseverance, reactivity, initiative in research.",
      proj2Pdf: "\u{1F50D} View the project PDF report",

      proj3Title: "\u2699\uFE0F Automation Lab Work \u2013 Industrial Simulations",
      proj3Context: "<span class=\"label\">Context:</span> Weekly labs based on simplified industrial scenarios (elevator, drill press, parking gate, production line...)",
      proj3Goal: "<span class=\"label\">Goal:</span> Analyze and automate basic industrial systems following functional and timing constraints.",
      proj3Skills: "<span class=\"label\">Technical skills:</span> GRAFCET, Ladder programming, simulation and deployment on real PLCs using EcoStruxure Control Expert, variables (BOOL, INT, STRING), timers, counters, state logic, Ladder-GRAFCET transition.",
      proj3Learned: "<span class=\"label\">What I learned:</span> Deepened PLC language practice, programming rigor, and functional logic understanding.",
      proj3Soft: "<span class=\"label\">Soft skills developed:</span> Patience, accuracy, active listening, following requirements, structured thinking."
    }
  },

  // =====================
  // GALLERY PAGE
  // =====================
  gallery: {
    fr: {
      pageTitle: "Galerie"
    },
    en: {
      pageTitle: "Gallery"
    }
  },

  // =====================
  // CONTACT PAGE
  // =====================
  contact: {
    fr: {
      pageTitle: "Me contacter",
      intro: "Si vous souhaitez me contacter pour une opportunit\u00e9, une question ou un projet, n\u2019h\u00e9sitez pas \u00e0 m\u2019envoyer un message via ce formulaire :",
      labelName: "Nom",
      labelEmail: "Email",
      labelMessage: "Message",
      submit: "Envoyer"
    },
    en: {
      pageTitle: "Contact me",
      intro: "If you would like to reach out about an opportunity, a question, or a project, feel free to send me a message using this form:",
      labelName: "Name",
      labelEmail: "Email",
      labelMessage: "Message",
      submit: "Send"
    }
  }
};
