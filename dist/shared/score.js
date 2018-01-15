'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// score definition
var score = {
  title: 'Le temps des nuages',
  duration: 20 * 60, // this is bullshit...
  parts: {
    // links

    'C1': {
      type: 'performer',
      file: 'videos/C1.mp4'
    },
    'C2': {
      type: 'performer',
      file: 'videos/C2.mp4'
    },
    'C3': {
      type: 'performer',
      file: 'videos/C3.mp4'
    },
    'C4': {
      type: 'performer',
      file: 'videos/C4.mp4'
    },
    'C5': {
      type: 'performer',
      file: 'videos/C5.mp4'
    },
    'piano1': {
      type: 'performer',
      file: 'videos/part1-piano1.mp4'
    },
    'piano2': {
      type: 'performer',
      file: 'videos/part1-piano2.mp4'
    },
    'vibra1': {
      type: 'performer',
      file: 'videos/part1-vibra1.mp4'
    },
    'vibra2': {
      type: 'performer',
      file: 'videos/part1-vibra2.mp4'
    },
    'Rémi': {
      type: 'performer',
      file: 'videos/Remi.mp4'
    },
    'Estelle': {
      type: 'performer',
      file: 'videos/Estelle.mp4'
    },
    'Eugenie': {
      type: 'performer',
      file: 'videos/Eugenie.mp4'
    },
    'Caroline': {
      type: 'performer',
      file: 'videos/Caroline.mp4'
    },
    'Laurence': {
      type: 'performer',
      file: 'videos/Laurence.mp4'
    },
    'Marie-george': {
      type: 'performer',
      file: 'videos/Marie-george.mp4'
    },
    'notkids': {
      type: 'env',
      file: 'videos/notkids.mp4'
    },
    'kids': {
      type: 'env',
      file: 'videos/kids.mp4'
    },
    'tape1': {
      type: 'env',
      file: 'videos/tape1.mp4'
    },
    'tape2': {
      type: 'env',
      file: 'videos/tape2.mp4'
    }
    // env
  },
  sections: {

    alpha: {
      time: 0,
      label: "NUAGES"
    },
    qalpha: {
      time: 25,
      label: "entree percu links"
    },
    beta: {
      time: 43,
      label: "je veux prendre le temps des nuages"
    },
    bwdeta: {
      time: 100,
      label: "k h ts k"
    },
    gamma: {
      time: 174,
      label: "JE QUITTE DONC LE MONDE"
    },
    delta: {
      time: 215,
      label: "JE VEUX SENTIR LA TERRE"
    },

    epsi: {
      time: 245,
      label: "son odeur après l'orage"
    },
    kepsi: {
      time: 268,
      label: "JE VEUX RETROUVER LE GOUT DES MURES"
    },
    epsilon: {
      time: 289,
      label: "ma bouche"
    },
    dzeta: {
      time: 361,
      label: "devenir moi-même pomme"
    },
    eta: {
      time: 379,
      label: "je veux voir à nouveau des couleuvres et des vipères"
    },
    theta: {
      time: 407,
      label: "vérifier l'effet froid de l'acier"
    },
    aiota: {
      time: 425,
      label: "claquements de langue - sans queue ni tête"
    },
    akappa: {
      time: 475,
      label: "JE VEUX ENTENDRE chuchoté"
    },
    alamdba: {
      time: 488,
      label: "je veux entendre FORTE"
    },
    biota: {
      time: 525,
      label: "la pluie trouant la peau de la rivière"
    },
    bkappa: {
      time: 577,
      label: "LE SOUFFLE COURT A CAUSE DE l'ORAGE"
    },
    blamdba: {
      time: 605,
      label: "LE CORPS"
    },
    iota: {
      time: 660,
      label: "flotte au dessus des eaux"
    },
    ckappa: {
      time: 685,
      label: "AU DESSUS DE MA TÊTE"
    },
    dlamdba: {
      time: 715,
      label: "(roulez) MAIS PLEIN D'ETOILES"
    },
    eiota: {
      time: 747,
      label: "LES FEUILLES"
    },
    fkappa: {
      time: 803,
      label: "puis lentement (archet)"
    },
    glamdba: {
      time: 840,
      label: "MOI DU MOINS J'AURAIS VECU"
    },
    hiota: {
      time: 875,
      label: "j'aurasi aimé la terre"
    },
    ikappa: {
      time: 900,
      label: "avant qu'on me recouvre d'elle"
    },
    jlamdba: {
      time: 917,
      label: "fin"
    }

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
  }
};

exports.default = score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjb3JlLmpzIl0sIm5hbWVzIjpbInNjb3JlIiwidGl0bGUiLCJkdXJhdGlvbiIsInBhcnRzIiwidHlwZSIsImZpbGUiLCJzZWN0aW9ucyIsImFscGhhIiwidGltZSIsImxhYmVsIiwicWFscGhhIiwiYmV0YSIsImJ3ZGV0YSIsImdhbW1hIiwiZGVsdGEiLCJlcHNpIiwia2Vwc2kiLCJlcHNpbG9uIiwiZHpldGEiLCJldGEiLCJ0aGV0YSIsImFpb3RhIiwiYWthcHBhIiwiYWxhbWRiYSIsImJpb3RhIiwiYmthcHBhIiwiYmxhbWRiYSIsImlvdGEiLCJja2FwcGEiLCJkbGFtZGJhIiwiZWlvdGEiLCJma2FwcGEiLCJnbGFtZGJhIiwiaGlvdGEiLCJpa2FwcGEiLCJqbGFtZGJhIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsSUFBTUEsUUFBUTtBQUNaQyxTQUFPLHFCQURLO0FBRVpDLFlBQVUsS0FBSyxFQUZILEVBRU87QUFDbkJDLFNBQU87QUFDTDs7QUFFQSxVQUFNO0FBQ0pDLFlBQU0sV0FERjtBQUVKQyxZQUFNO0FBRkYsS0FIRDtBQU9MLFVBQU07QUFDSkQsWUFBTSxXQURGO0FBRUpDLFlBQU07QUFGRixLQVBEO0FBV0wsVUFBTTtBQUNKRCxZQUFNLFdBREY7QUFFSkMsWUFBTTtBQUZGLEtBWEQ7QUFlTCxVQUFNO0FBQ0pELFlBQU0sV0FERjtBQUVKQyxZQUFNO0FBRkYsS0FmRDtBQW1CTCxVQUFNO0FBQ0pELFlBQU0sV0FERjtBQUVKQyxZQUFNO0FBRkYsS0FuQkQ7QUF1QkwsY0FBVTtBQUNSRCxZQUFNLFdBREU7QUFFUkMsWUFBTTtBQUZFLEtBdkJMO0FBMkJMLGNBQVU7QUFDUkQsWUFBTSxXQURFO0FBRVJDLFlBQU07QUFGRSxLQTNCTDtBQStCTCxjQUFVO0FBQ1JELFlBQU0sV0FERTtBQUVSQyxZQUFNO0FBRkUsS0EvQkw7QUFtQ0wsY0FBVTtBQUNSRCxZQUFNLFdBREU7QUFFUkMsWUFBTTtBQUZFLEtBbkNMO0FBdUNMLFlBQVE7QUFDTkQs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QU87QUFGRCxLQXZHQTtBQTJHVDBCLGFBQVM7QUFDTjNCLFlBQU0sR0FEQTtBQUVOQyxhQUFPO0FBRkQ7O0FBT1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBXVTtBQXBGRSxDQUFkOztrQkE0YmVULEsiLCJmaWxlIjoic2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzY29yZSBkZWZpbml0aW9uXG5jb25zdCBzY29yZSA9IHtcbiAgdGl0bGU6ICdMZSB0ZW1wcyBkZXMgbnVhZ2VzJyxcbiAgZHVyYXRpb246IDIwICogNjAsIC8vIHRoaXMgaXMgYnVsbHNoaXQuLi5cbiAgcGFydHM6IHtcbiAgICAvLyBsaW5rc1xuXG4gICAgJ0MxJzoge1xuICAgICAgdHlwZTogJ3BlcmZvcm1lcicsXG4gICAgICBmaWxlOiAndmlkZW9zL0MxLm1wNCcsXG4gICAgfSxcbiAgICAnQzInOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvQzIubXA0JyxcbiAgICB9LFxuICAgICdDMyc6IHtcbiAgICAgIHR5cGU6ICdwZXJmb3JtZXInLFxuICAgICAgZmlsZTogJ3ZpZGVvcy9DMy5tcDQnLFxuICAgIH0sXG4gICAgJ0M0Jzoge1xuICAgICAgdHlwZTogJ3BlcmZvcm1lcicsXG4gICAgICBmaWxlOiAndmlkZW9zL0M0Lm1wNCcsXG4gICAgfSxcbiAgICAnQzUnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvQzUubXA0JyxcbiAgICB9LFxuICAgICdwaWFubzEnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvcGFydDEtcGlhbm8xLm1wNCcsXG4gICAgfSxcbiAgICAncGlhbm8yJzoge1xuICAgICAgdHlwZTogJ3BlcmZvcm1lcicsXG4gICAgICBmaWxlOiAndmlkZW9zL3BhcnQxLXBpYW5vMi5tcDQnLFxuICAgIH0sXG4gICAgJ3ZpYnJhMSc6IHtcbiAgICAgIHR5cGU6ICdwZXJmb3JtZXInLFxuICAgICAgZmlsZTogJ3ZpZGVvcy9wYXJ0MS12aWJyYTEubXA0JyxcbiAgICB9LFxuICAgICd2aWJyYTInOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvcGFydDEtdmlicmEyLm1wNCcsXG4gICAgfSxcbiAgICAnUsOpbWknOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvUmVtaS5tcDQnLFxuICAgIH0sXG4gICAgJ0VzdGVsbGUnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvRXN0ZWxsZS5tcDQnLFxuICAgIH0sXG4gICAgJ0V1Z2VuaWUnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvRXVnZW5pZS5tcDQnLFxuICAgIH0sXG4gICAgJ0Nhcm9saW5lJzoge1xuICAgICAgdHlwZTogJ3BlcmZvcm1lcicsXG4gICAgICBmaWxlOiAndmlkZW9zL0Nhcm9saW5lLm1wNCcsXG4gICAgfSxcbiAgICAnTGF1cmVuY2UnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvTGF1cmVuY2UubXA0JyxcbiAgICB9LFxuICAgICdNYXJpZS1nZW9yZ2UnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvTWFyaWUtZ2VvcmdlLm1wNCcsXG4gICAgfSxcbiAgICAnbm90a2lkcyc6IHtcbiAgICAgIHR5cGU6ICdlbnYnLFxuICAgICAgZmlsZTogJ3ZpZGVvcy9ub3RraWRzLm1wNCcsXG4gICAgfSxcbiAgICAna2lkcyc6IHtcbiAgICAgIHR5cGU6ICdlbnYnLFxuICAgICAgZmlsZTogJ3ZpZGVvcy9raWRzLm1wNCcsXG4gICAgfSxcbiAgICAndGFwZTEnOiB7XG4gICAgICB0eXBlOiAnZW52JyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvdGFwZTEubXA0JyxcbiAgICB9LFxuICAgICd0YXBlMic6IHtcbiAgICAgIHR5cGU6ICdlbnYnLFxuICAgICAgZmlsZTogJ3ZpZGVvcy90YXBlMi5tcDQnLFxuICAgIH0sXG4gICAgLy8gZW52XG4gIH0sXG4gIHNlY3Rpb25zOiB7XG5cbiAgICBhbHBoYToge1xuICAgICAgdGltZTogMCxcbiAgICAgIGxhYmVsOiBcIk5VQUdFU1wiLFxuICAgIH0sXG4gICAgcWFscGhhOiB7XG4gICAgICB0aW1lOiAyNSxcbiAgICAgIGxhYmVsOiBcImVudHJlZSBwZXJjdSBsaW5rc1wiLFxuICAgIH0sXG4gICAgYmV0YToge1xuICAgICAgdGltZTogNDMsXG4gICAgICBsYWJlbDogXCJqZSB2ZXV4IHByZW5kcmUgbGUgdGVtcHMgZGVzIG51YWdlc1wiLFxuICAgIH0sXG4gICBid2RldGE6IHtcbiAgICAgIHRpbWU6IDEwMCxcbiAgICAgIGxhYmVsOiBcImsgaCB0cyBrXCIsXG4gICAgfSxcbiAgICBnYW1tYToge1xuICAgICAgdGltZTogMTc0LFxuICAgICAgbGFiZWw6IFwiSkUgUVVJVFRFIERPTkMgTEUgTU9OREVcIixcbiAgICB9LFxuICAgIGRlbHRhOiB7XG4gICAgICB0aW1lOiAyMTUsXG4gICAgICBsYWJlbDogXCJKRSBWRVVYIFNFTlRJUiBMQSBURVJSRVwiLFxuICAgIH0sXG5cbiAgICAgIGVwc2k6IHtcbiAgICAgIHRpbWU6IDI0NSxcbiAgICAgIGxhYmVsOiBcInNvbiBvZGV1ciBhcHLDqHMgbCdvcmFnZVwiLFxuICAgIH0sXG4gICAgICAgICAga2Vwc2k6IHtcbiAgICAgIHRpbWU6IDI2OCxcbiAgICAgIGxhYmVsOiBcIkpFIFZFVVggUkVUUk9VVkVSIExFIEdPVVQgREVTIE1VUkVTXCIsXG4gICAgfSxcbiAgICBlcHNpbG9uOiB7XG4gICAgICB0aW1lOiAyODksXG4gICAgICBsYWJlbDogXCJtYSBib3VjaGVcIixcbiAgICB9LFxuICAgIGR6ZXRhOiB7XG4gICAgICB0aW1lOiAzNjEsXG4gICAgICBsYWJlbDogXCJkZXZlbmlyIG1vaS1tw6ptZSBwb21tZVwiLFxuICAgIH0sXG4gICAgZXRhOiB7XG4gICAgICB0aW1lOiAzNzksXG4gICAgICBsYWJlbDogXCJqZSB2ZXV4IHZvaXIgw6Agbm91dmVhdSBkZXMgY291bGV1dnJlcyBldCBkZXMgdmlww6hyZXNcIixcbiAgICB9LFxuICAgIHRoZXRhOiB7XG4gICAgICB0aW1lOiA0MDcsXG4gICAgICBsYWJlbDogXCJ2w6lyaWZpZXIgbCdlZmZldCBmcm9pZCBkZSBsJ2FjaWVyXCIsXG4gICAgfSxcbiAgICBhaW90YToge1xuICAgICAgdGltZTogNDI1LFxuICAgICAgbGFiZWw6IFwiY2xhcXVlbWVudHMgZGUgbGFuZ3VlIC0gc2FucyBxdWV1ZSBuaSB0w6p0ZVwiLFxuICAgIH0sXG4gICAgYWthcHBhOiB7XG4gICAgICB0aW1lOiA0NzUsXG4gICAgICBsYWJlbDogXCJKRSBWRVVYIEVOVEVORFJFIGNodWNob3TDqVwiLFxuICAgIH0sXG4gICBhbGFtZGJhOiB7XG4gICAgICB0aW1lOiA0ODgsXG4gICAgICBsYWJlbDogXCJqZSB2ZXV4IGVudGVuZHJlIEZPUlRFXCIsXG4gICAgfSxcbiAgICAgICAgYmlvdGE6IHtcbiAgICAgIHRpbWU6IDUyNSxcbiAgICAgIGxhYmVsOiBcImxhIHBsdWllIHRyb3VhbnQgbGEgcGVhdSBkZSBsYSByaXZpw6hyZVwiLFxuICAgIH0sXG4gICAgYmthcHBhOiB7XG4gICAgICB0aW1lOiA1NzcsXG4gICAgICBsYWJlbDogXCJMRSBTT1VGRkxFIENPVVJUIEEgQ0FVU0UgREUgbCdPUkFHRVwiLFxuICAgIH0sXG4gICBibGFtZGJhOiB7XG4gICAgICB0aW1lOiA2MDUsXG4gICAgICBsYWJlbDogXCJMRSBDT1JQU1wiLFxuICAgIH0sXG4gICAgICAgIGlvdGE6IHtcbiAgICAgIHRpbWU6IDY2MCxcbiAgICAgIGxhYmVsOiBcImZsb3R0ZSBhdSBkZXNzdXMgZGVzIGVhdXhcIixcbiAgICB9LFxuICAgIGNrYXBwYToge1xuICAgICAgdGltZTogNjg1LFxuICAgICAgbGFiZWw6IFwiQVUgREVTU1VTIERFIE1BIFTDilRFXCIsXG4gICAgfSxcbiAgIGRsYW1kYmE6IHtcbiAgICAgIHRpbWU6IDcxNSxcbiAgICAgIGxhYmVsOiBcIihyb3VsZXopIE1BSVMgUExFSU4gRCdFVE9JTEVTXCIsXG4gICAgfSxcbiAgICAgICAgZWlvdGE6IHtcbiAgICAgIHRpbWU6IDc0NyxcbiAgICAgIGxhYmVsOiBcIkxFUyBGRVVJTExFU1wiLFxuICAgIH0sXG4gICAgZmthcHBhOiB7XG4gICAgICB0aW1lOiA4MDMsXG4gICAgICBsYWJlbDogXCJwdWlzIGxlbnRlbWVudCAoYXJjaGV0KVwiLFxuICAgIH0sXG4gICBnbGFtZGJhOiB7XG4gICAgICB0aW1lOiA4NDAsXG4gICAgICBsYWJlbDogXCJNT0kgRFUgTU9JTlMgSidBVVJBSVMgVkVDVVwiLFxuICAgIH0sXG4gICAgICAgIGhpb3RhOiB7XG4gICAgICB0aW1lOiA4NzUsXG4gICAgICBsYWJlbDogXCJqJ2F1cmFzaSBhaW3DqSBsYSB0ZXJyZVwiLFxuICAgIH0sXG4gICAgaWthcHBhOiB7XG4gICAgICB0aW1lOiA5MDAsXG4gICAgICBsYWJlbDogXCJhdmFudCBxdSdvbiBtZSByZWNvdXZyZSBkJ2VsbGVcIixcbiAgICB9LFxuICAgamxhbWRiYToge1xuICAgICAgdGltZTogOTE3LFxuICAgICAgbGFiZWw6IFwiZmluXCIsXG4gICAgfSxcblxuXG5cbiAgLy8gICBhbHBoYToge1xuICAvLyAgICAgdGltZTogMCxcbiAgLy8gICAgIGxhYmVsOiAnQ29tbWVuY2VtZW50JyxcbiAgLy8gICB9LFxuXG4gIC8vICAgcWFscGhhOiB7XG4gIC8vICAgICB0aW1lOiAxNyxcbiAgLy8gICAgIGxhYmVsOiAnREVCVVQgbnVhZ2UnLFxuICAvLyAgIH0sXG5cblxuICAvLyAgIGJldGE6IHtcbiAgLy8gICAgIHRpbWU6IDU3LFxuICAvLyAgICAgbGFiZWw6ICdFc3RlbGxlJyxcbiAgLy8gICB9LFxuXG5cbiAgLy8gIGJ3ZGV0YToge1xuICAvLyAgICAgdGltZTogNjQsXG4gIC8vICAgICBsYWJlbDogJ1BSRU5EUkUgTEUgVEVNUFMgREVTIE5VQUdFUyBwdWlzIG5hcHBlcy4uLicsXG4gIC8vICAgfSxcblxuICAvLyAgIGdhbW1hOiB7XG4gIC8vICAgICB0aW1lOiA3NixcbiAgLy8gICAgIGxhYmVsOiAndGVudWVzJyxcbiAgLy8gICB9LFxuICAvLyAgIGRlbHRhOiB7XG4gIC8vICAgICB0aW1lOiAxMDEsXG4gIC8vICAgICBsYWJlbDogJ21cXCdhYm9uZG9ubmVyIGEgbGV1ciBtb3Vzc2UnLFxuICAvLyAgIH0sXG5cbiAgLy8gICAgIGVwc2k6IHtcbiAgLy8gICAgIHRpbWU6IDExMixcbiAgLy8gICAgIGxhYmVsOiAnU0tJUCcsXG4gIC8vICAgfSxcbiAgLy8gICAgICAgICBrZXBzaToge1xuICAvLyAgICAgdGltZTogMjAyLFxuICAvLyAgICAgbGFiZWw6ICdMRSBNT05ERSBFTiBSRVNUQU5UIERBTlMgQ0UgTU9OREUnLFxuICAvLyAgIH0sXG4gIC8vICAgZXBzaWxvbjoge1xuICAvLyAgICAgdGltZTogMTI5LFxuICAvLyAgICAgbGFiZWw6ICdwcmVuZHJlIGxlIHRlbXBzIGRlcyBudWFnZXMnLFxuICAvLyAgIH0sXG4gIC8vICAgZHpldGE6IHtcbiAgLy8gICAgIHRpbWU6IDE2MSxcbiAgLy8gICAgIGxhYmVsOiAncmVwcmlzZScsXG4gIC8vICAgfSxcbiAgLy8gICBldGE6IHtcbiAgLy8gICAgIHRpbWU6IDE5OSxcbiAgLy8gICAgIGxhYmVsOiAnamUgcXVpdHRlIGRvbmMgbGUgbW9uZGUnLFxuICAvLyAgIH0sXG5cblxuXG4gIC8vICAgdGhldGE6IHtcbiAgLy8gICAgIHRpbWU6IDIyNSxcbiAgLy8gICAgIGxhYmVsOiAnSkUgUkVDT1VSUyBBVVggRk9SRVRTJyxcbiAgLy8gICB9LFxuXG5cblxuXG5cblxuICAvLyAgIGlvdGE6IHtcbiAgLy8gICAgIHRpbWU6IDIzNixcbiAgLy8gICAgIGxhYmVsOiAnamUgdmV1eCBlbnRlbmRyZSBsZSB2ZW50JyxcbiAgLy8gICB9LFxuICAvLyAgIGthcHBhOiB7XG4gIC8vICAgICB0aW1lOiAyNDgsXG4gIC8vICAgICBsYWJlbDogJ2xhIGZlbsOqdHJlIG91dmVydGUgZW4gw6l0w6knLFxuICAvLyAgIH0sXG4gIC8vICBsYW1kYmE6IHtcbiAgLy8gICAgIHRpbWU6IDI2OCxcbiAgLy8gICAgIGxhYmVsOiAnamUgdmV1eCBlbnRlbmRyZSBsZSB2ZW50IGRhbnMgbGVzIHRpbGxldWxzJyxcbiAgLy8gICB9LFxuXG4gIC8vICAgICAgIHByZWV0YToge1xuICAvLyAgICAgdGltZTogMjcyLFxuICAvLyAgICAgbGFiZWw6ICdFTlRFTi1FTi1EUkUgTEUgVkVOVFMgZ2xpc3NhbmRvIC0gT1VWRVJURSBFTiBFVEUnLFxuICAvLyAgIH0sXG5cbiAgLy8gIG11OiB7XG4gIC8vICAgICB0aW1lOiAyODQsXG4gIC8vICAgICBsYWJlbDogJ2xhIGZlbsOqdHJlIG91dmVydGUgZW4gw6l0w6kgMicsXG4gIC8vICAgfSxcbiAgLy8gIG51OiB7XG4gIC8vICAgICB0aW1lOiAyOTMsXG4gIC8vICAgICBsYWJlbDogJ3NlbnRpciBsZSBwYXJmdW0gc8OpbWluYWwgZGUgc2VzIGZsZXVycycsXG4gIC8vICAgfSxcbiAgLy8gIE1JOiB7XG4gIC8vICAgICB0aW1lOiAzMDcsXG4gIC8vICAgICBsYWJlbDogJ0FDQ0VMRVJBVElPTicsXG4gIC8vICAgfSxcblxuICAvLyBNcXdJOiB7XG4gIC8vICAgICB0aW1lOiAzMjUsXG4gIC8vICAgICBsYWJlbDogJ0xBIExVTUlFUkUgVU5JU1NPTicsXG4gIC8vICAgfSxcblxuXG5cbiAgLy8gTXdlSToge1xuICAvLyAgICAgdGltZTogMzM4LFxuICAvLyAgICAgbGFiZWw6ICdJTUlUQVRJT05TIFFVSSBNT05URU5UJyxcbiAgLy8gICB9LFxuXG5cblxuICAvLyAgWmVyaToge1xuICAvLyAgICAgdGltZTogMzY4LFxuICAvLyAgICAgbGFiZWw6ICdKRSBWRVVYIFNFTlRJUiBMRSBTT0xFSUwnLFxuICAvLyAgIH0sXG5cbiAgLy8gIGE6IHtcbiAgLy8gICAgIHRpbWU6IDM4MCxcbiAgLy8gICAgIGxhYmVsOiAnbGEgbHVtaWVyZSBkYW5zIG1vbiBhbWUnLFxuICAvLyAgIH0sXG4gIC8vICBiOiB7XG4gIC8vICAgICB0aW1lOiAzOTcsXG4gIC8vICAgICBsYWJlbDogJ2xhIHBsdWllIGV0IGxcXCdvbmTDqWUnLFxuICAvLyAgIH0sXG4gIC8vICBjOiB7XG4gIC8vICAgICB0aW1lOiA0MTYsXG4gIC8vICAgICBsYWJlbDogJyBMVU1JRVJFJyxcbiAgLy8gICB9LFxuXG5cbiAgLy8gIGNyOiB7XG4gIC8vICAgICB0aW1lOiA0MTYsXG4gIC8vICAgICBsYWJlbDogJ1NPTiBPREVVUiBBUFJFUyBMXFwnT1JBR0UgcHVpcyBMVU1JRVJFJyxcbiAgLy8gICB9LFxuXG4gIC8vICBjcXdlOiB7XG4gIC8vICAgICB0aW1lOiA0MjUsXG4gIC8vICAgICBsYWJlbDogJ3NvbiBwYXJmdW0gZGUgdG9tYmUnLFxuICAvLyAgIH0sXG5cbiAgLy8gIGRxd2U6IHtcbiAgLy8gICAgIHRpbWU6IDQ1MSxcbiAgLy8gICAgIGxhYmVsOiAnamUgdmV1eCBsYSBicmlzZSBldCBsYSBiaXNlJyxcbiAgLy8gICB9LFxuXG4gIC8vICBlOiB7XG4gIC8vICAgICB0aW1lOiA0NjIsXG4gIC8vICAgICBsYWJlbDogJ0JSSS1JU0UgRVQgTEEgQkktSVNFJyxcbiAgLy8gICB9LFxuXG4gIC8vIHNkZmU6IHtcbiAgLy8gICAgIHRpbWU6IDUwMixcbiAgLy8gICAgIGxhYmVsOiAnc29uIHBhcmZ1bSBkZSB0b21iZSBHTElTU0FORE8gcHVpcyByaWVuJyxcbiAgLy8gICB9LFxuXG5cbiAgLy8gIGV3ZToge1xuICAvLyAgICAgdGltZTogNTEyLFxuICAvLyAgICAgbGFiZWw6ICdzb24gcGFyZnVtIGRlIHRvbWJlIDInLFxuICAvLyAgIH0sXG5cbiAgLy8gIGZhc2Q6IHtcbiAgLy8gICAgIHRpbWU6IDU1MixcbiAgLy8gICAgIGxhYmVsOiAnSkUgVkVVWCBKRSBWRVVYJyxcbiAgLy8gICB9LFxuXG4gIC8vICBmOiB7XG4gIC8vICAgICB0aW1lOiA1NTgsXG4gIC8vICAgICBsYWJlbDogJ0pFIFZFVVggSkUgVkVVWCBpbWl0YXRpb25zJyxcbiAgLy8gICB9LFxuXG5cblxuICAvLyAgZzoge1xuICAvLyAgICAgdGltZTogNTgyLFxuICAvLyAgICAgbGFiZWw6ICfDiUxBUkdJJyxcbiAgLy8gICB9LFxuXG4gIC8vICBoZGNkYzoge1xuICAvLyAgICAgdGltZTogNTk0LFxuICAvLyAgICAgbGFiZWw6ICdzb24gcGFyZnVtIGRlIHRvbWJlIDMnLFxuICAvLyAgIH0sXG5cbiAgLy8gIGdkc2Y6IHtcbiAgLy8gICAgIHRpbWU6IDYwMixcbiAgLy8gICAgIGxhYmVsOiAnREUgVE9NQkUgQSBWRU5JUicsXG4gIC8vICAgfSxcblxuICAvLyAgZ2VkZHNmOiB7XG4gIC8vICB0aW1lOiA2MTYsXG4gIC8vICAgICBsYWJlbDogJ0pFIFZFVVggUkVUUk9VVkVSIExFIEdPVVQnLFxuICAvLyAgIH0sXG5cbiAgLy8gIGdlZWZnZGRzZjoge1xuICAvLyAgdGltZTogNjQ4LFxuICAvLyAgICAgbGFiZWw6ICdFQ1JBU0VSIERFUyBGUkFJU0VTJyxcbiAgLy8gICB9LFxuXG5cblxuICAvLyBnZHF3ZToge1xuICAvLyAgdGltZTogNjk3LFxuICAvLyAgICAgbGFiZWw6ICdSRVNQSVJFUiBBIEZMRVVSJyxcbiAgLy8gICB9LFxuXG4gIC8vICBsOiB7XG4gIC8vICAgICB0aW1lOiA3MDEsXG4gIC8vICAgICBsYWJlbDogJ3Jlc3BpcmVyIGxhIGZsZXVyJyxcbiAgLy8gICB9LFxuICAvLyAgbToge1xuICAvLyAgICAgdGltZTogNzM1LFxuICAvLyAgICAgbGFiZWw6ICdkZXZlbmlyIG1vaS1tw6ptZSBwb21tZScsXG4gIC8vICAgfSxcbiAgLy8gIG46IHtcbiAgLy8gICAgIHRpbWU6IDc1OCxcbiAgLy8gICAgIGxhYmVsOiAnbVxcJ2FsbG9uZ2VyIGRhbnMgbFxcJ2hlcmJlJyxcbiAgLy8gICB9LFxuICAvLyAgbzoge1xuICAvLyAgICAgdGltZTogNzgyLFxuICAvLyAgICAgbGFiZWw6ICdtXFwnZW5kb3JtaXIgbGUgZG9zIMOpcG91c2FudCBsYSB0ZXJyZScsXG4gIC8vICAgfSxcbiAgLy8gIHA6IHtcbiAgLy8gICAgIHRpbWU6IDgzMyxcbiAgLy8gICAgIGxhYmVsOiAnSkUgVkVVWCBWT0lSIERFUyBDT1VMRVVWUkVTJyxcbiAgLy8gICB9LFxuICAvLyAgcToge1xuICAvLyAgICAgdGltZTogODY0LFxuICAvLyAgICAgbGFiZWw6ICdKZSB2ZXV4IHZvaXIgbFxcJ29ydmV0JyxcbiAgLy8gICB9LFxuICAvLyAgcjoge1xuICAvLyAgICAgdGltZTogODg1LFxuICAvLyAgICAgbGFiZWw6ICdjaGhoaGgnLFxuICAvLyAgIH0sXG4gIC8vICBzOiB7XG4gIC8vICAgICB0aW1lOiA5MDcsXG4gIC8vICAgICBsYWJlbDogJ3F1aSBvbmR1bGUgc2FucyBxdWV1ZSBuaSB0w6p0ZScsXG4gIC8vICAgfSxcbiAgLy8gIHQ6IHtcbiAgLy8gICAgIHRpbWU6IDk1MixcbiAgLy8gICAgIGxhYmVsOiAnSkUgVkVVWCBFTlRFTkRSRSBMXFwnRUFVJyxcbiAgLy8gICB9LFxuICAvLyAgdToge1xuICAvLyAgICAgdGltZTogOTg3LFxuICAvLyAgICAgbGFiZWw6ICdsYSBwbHVpZSB0cm91YW50IGxhIHBlYXUnLFxuICAvLyAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY29yZTtcbiJdfQ==