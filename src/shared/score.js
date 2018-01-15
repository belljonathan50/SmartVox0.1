// score definition
const score = {
  title: 'Le temps des nuages',
  duration: 20 * 60, // this is bullshit...
  parts: {
    // links

    'C1': {
      type: 'performer',
      file: 'videos/C1.mp4',
    },
    'C2': {
      type: 'performer',
      file: 'videos/C2.mp4',
    },
    'C3': {
      type: 'performer',
      file: 'videos/C3.mp4',
    },
    'C4': {
      type: 'performer',
      file: 'videos/C4.mp4',
    },
    'C5': {
      type: 'performer',
      file: 'videos/C5.mp4',
    },
    'piano1': {
      type: 'performer',
      file: 'videos/part1-piano1.mp4',
    },
    'piano2': {
      type: 'performer',
      file: 'videos/part1-piano2.mp4',
    },
    'vibra1': {
      type: 'performer',
      file: 'videos/part1-vibra1.mp4',
    },
    'vibra2': {
      type: 'performer',
      file: 'videos/part1-vibra2.mp4',
    },
    'Rémi': {
      type: 'performer',
      file: 'videos/Remi.mp4',
    },
    'Estelle': {
      type: 'performer',
      file: 'videos/Estelle.mp4',
    },
    'Eugenie': {
      type: 'performer',
      file: 'videos/Eugenie.mp4',
    },
    'Caroline': {
      type: 'performer',
      file: 'videos/Caroline.mp4',
    },
    'Laurence': {
      type: 'performer',
      file: 'videos/Laurence.mp4',
    },
    'Marie-george': {
      type: 'performer',
      file: 'videos/Marie-george.mp4',
    },
    'notkids': {
      type: 'env',
      file: 'videos/notkids.mp4',
    },
    'kids': {
      type: 'env',
      file: 'videos/kids.mp4',
    },
    'tape1': {
      type: 'env',
      file: 'videos/tape1.mp4',
    },
    'tape2': {
      type: 'env',
      file: 'videos/tape2.mp4',
    },
    // env
  },
  sections: {

    alpha: {
      time: 0,
      label: "NUAGES",
    },
    qalpha: {
      time: 25,
      label: "entree percu links",
    },
    beta: {
      time: 43,
      label: "je veux prendre le temps des nuages",
    },
   bwdeta: {
      time: 100,
      label: "k h ts k",
    },
    gamma: {
      time: 174,
      label: "JE QUITTE DONC LE MONDE",
    },
    delta: {
      time: 215,
      label: "JE VEUX SENTIR LA TERRE",
    },

      epsi: {
      time: 245,
      label: "son odeur après l'orage",
    },
          kepsi: {
      time: 268,
      label: "JE VEUX RETROUVER LE GOUT DES MURES",
    },
    epsilon: {
      time: 289,
      label: "ma bouche",
    },
    dzeta: {
      time: 361,
      label: "devenir moi-même pomme",
    },
    eta: {
      time: 379,
      label: "je veux voir à nouveau des couleuvres et des vipères",
    },
    theta: {
      time: 407,
      label: "vérifier l'effet froid de l'acier",
    },
    aiota: {
      time: 425,
      label: "claquements de langue - sans queue ni tête",
    },
    akappa: {
      time: 475,
      label: "JE VEUX ENTENDRE chuchoté",
    },
   alamdba: {
      time: 488,
      label: "je veux entendre FORTE",
    },
        biota: {
      time: 525,
      label: "la pluie trouant la peau de la rivière",
    },
    bkappa: {
      time: 577,
      label: "LE SOUFFLE COURT A CAUSE DE l'ORAGE",
    },
   blamdba: {
      time: 605,
      label: "LE CORPS",
    },
        iota: {
      time: 660,
      label: "flotte au dessus des eaux",
    },
    ckappa: {
      time: 685,
      label: "AU DESSUS DE MA TÊTE",
    },
   dlamdba: {
      time: 715,
      label: "(roulez) MAIS PLEIN D'ETOILES",
    },
        eiota: {
      time: 747,
      label: "LES FEUILLES",
    },
    fkappa: {
      time: 803,
      label: "puis lentement (archet)",
    },
   glamdba: {
      time: 840,
      label: "MOI DU MOINS J'AURAIS VECU",
    },
        hiota: {
      time: 875,
      label: "j'aurasi aimé la terre",
    },
    ikappa: {
      time: 900,
      label: "avant qu'on me recouvre d'elle",
    },
   jlamdba: {
      time: 917,
      label: "fin",
    },



  //   alpha: {
  //     time: 0,
  //     label: 'Commencement',
  //   },

  //   qalpha: {
  //     time: 17,
  //     label: 'DEBUT nuage',
  //   },


  //   beta: {
  //     time: 57,
  //     label: 'Estelle',
  //   },


  //  bwdeta: {
  //     time: 64,
  //     label: 'PRENDRE LE TEMPS DES NUAGES puis nappes...',
  //   },

  //   gamma: {
  //     time: 76,
  //     label: 'tenues',
  //   },
  //   delta: {
  //     time: 101,
  //     label: 'm\'abondonner a leur mousse',
  //   },

  //     epsi: {
  //     time: 112,
  //     label: 'SKIP',
  //   },
  //         kepsi: {
  //     time: 202,
  //     label: 'LE MONDE EN RESTANT DANS CE MONDE',
  //   },
  //   epsilon: {
  //     time: 129,
  //     label: 'prendre le temps des nuages',
  //   },
  //   dzeta: {
  //     time: 161,
  //     label: 'reprise',
  //   },
  //   eta: {
  //     time: 199,
  //     label: 'je quitte donc le monde',
  //   },



  //   theta: {
  //     time: 225,
  //     label: 'JE RECOURS AUX FORETS',
  //   },






  //   iota: {
  //     time: 236,
  //     label: 'je veux entendre le vent',
  //   },
  //   kappa: {
  //     time: 248,
  //     label: 'la fenêtre ouverte en été',
  //   },
  //  lamdba: {
  //     time: 268,
  //     label: 'je veux entendre le vent dans les tilleuls',
  //   },

  //       preeta: {
  //     time: 272,
  //     label: 'ENTEN-EN-DRE LE VENTS glissando - OUVERTE EN ETE',
  //   },

  //  mu: {
  //     time: 284,
  //     label: 'la fenêtre ouverte en été 2',
  //   },
  //  nu: {
  //     time: 293,
  //     label: 'sentir le parfum séminal de ses fleurs',
  //   },
  //  MI: {
  //     time: 307,
  //     label: 'ACCELERATION',
  //   },

  // MqwI: {
  //     time: 325,
  //     label: 'LA LUMIERE UNISSON',
  //   },



  // MweI: {
  //     time: 338,
  //     label: 'IMITATIONS QUI MONTENT',
  //   },



  //  Zeri: {
  //     time: 368,
  //     label: 'JE VEUX SENTIR LE SOLEIL',
  //   },

  //  a: {
  //     time: 380,
  //     label: 'la lumiere dans mon ame',
  //   },
  //  b: {
  //     time: 397,
  //     label: 'la pluie et l\'ondée',
  //   },
  //  c: {
  //     time: 416,
  //     label: ' LUMIERE',
  //   },


  //  cr: {
  //     time: 416,
  //     label: 'SON ODEUR APRES L\'ORAGE puis LUMIERE',
  //   },

  //  cqwe: {
  //     time: 425,
  //     label: 'son parfum de tombe',
  //   },

  //  dqwe: {
  //     time: 451,
  //     label: 'je veux la brise et la bise',
  //   },

  //  e: {
  //     time: 462,
  //     label: 'BRI-ISE ET LA BI-ISE',
  //   },

  // sdfe: {
  //     time: 502,
  //     label: 'son parfum de tombe GLISSANDO puis rien',
  //   },


  //  ewe: {
  //     time: 512,
  //     label: 'son parfum de tombe 2',
  //   },

  //  fasd: {
  //     time: 552,
  //     label: 'JE VEUX JE VEUX',
  //   },

  //  f: {
  //     time: 558,
  //     label: 'JE VEUX JE VEUX imitations',
  //   },



  //  g: {
  //     time: 582,
  //     label: 'ÉLARGI',
  //   },

  //  hdcdc: {
  //     time: 594,
  //     label: 'son parfum de tombe 3',
  //   },

  //  gdsf: {
  //     time: 602,
  //     label: 'DE TOMBE A VENIR',
  //   },

  //  geddsf: {
  //  time: 616,
  //     label: 'JE VEUX RETROUVER LE GOUT',
  //   },

  //  geefgddsf: {
  //  time: 648,
  //     label: 'ECRASER DES FRAISES',
  //   },



  // gdqwe: {
  //  time: 697,
  //     label: 'RESPIRER A FLEUR',
  //   },

  //  l: {
  //     time: 701,
  //     label: 'respirer la fleur',
  //   },
  //  m: {
  //     time: 735,
  //     label: 'devenir moi-même pomme',
  //   },
  //  n: {
  //     time: 758,
  //     label: 'm\'allonger dans l\'herbe',
  //   },
  //  o: {
  //     time: 782,
  //     label: 'm\'endormir le dos épousant la terre',
  //   },
  //  p: {
  //     time: 833,
  //     label: 'JE VEUX VOIR DES COULEUVRES',
  //   },
  //  q: {
  //     time: 864,
  //     label: 'Je veux voir l\'orvet',
  //   },
  //  r: {
  //     time: 885,
  //     label: 'chhhhh',
  //   },
  //  s: {
  //     time: 907,
  //     label: 'qui ondule sans queue ni tête',
  //   },
  //  t: {
  //     time: 952,
  //     label: 'JE VEUX ENTENDRE L\'EAU',
  //   },
  //  u: {
  //     time: 987,
  //     label: 'la pluie trouant la peau',
  //   },
  },
};

export default score;
