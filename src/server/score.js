// score definition
const score = {
  title: 'Au commencement',
  duration: 20 * 60,
  parts: {
    // singers
    'soprano-1': {
      type: 'performer',
      file: 'videos/soprano-1.mp4',
    },
    'soprano-2': {
      type: 'performer',
      file: 'videos/soprano-1.mp4',
    },
    'mezzo': {
      type: 'performer',
      file: 'videos/soprano-1.mp4',
    },
    'alto': {
      type: 'performer',
      file: 'videos/soprano-1.mp4',
    },
    // env
    'env-1': {
      type: 'env',
      file: 'videos/soprano-1.mp4',
    },
    'env-2': {
      type: 'env',
      file: 'videos/soprano-1.mp4',
    },
    'env-3': {
      type: 'env',
      file: 'videos/soprano-1.mp4',
    },
    'env-4': {
      type: 'env',
      file: 'videos/soprano-1.mp4',
    },
  },
  sections: {
    alpha: {
      time: 0,
      label: 'Au commencement',
    },
    beta: {
      time: 117,
      label: 'Ohné lui',
    },
    gamma: {
      time: 270,
      label: `C'est un soir`,
    },
    delta: {
      time: 405,
      label: 'La glebe',
    },
    epsilon: {
      time: 495,
      label: 'Je sur nous',
    },
    dzeta: {
      time: 600,
      label: 'Plafond du ciel',
    },
    eta: {
      time: 660,
      label: 'Ce que ce que',
    },
    theta: {
      time: 765,
      label: 'Commencement fin',
    },
    iota: {
      time: 850,
      label: 'Les choses sont',
    },
    kappa: {
      time: 945,
      label: 'Je suis avec toi',
    },
  },
};

export default score;
