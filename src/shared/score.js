// score definition
const score = {
  title: 'Šîr HaŠîrîm - Hoheslied',
  duration: 12 * 60, 
  parts: {
    // links

    'soprano1': {
      type: 'performer',
      file: 'videos/s1.mp4',
    },
    'soprano2': {
      type: 'performer',
      file: 'videos/s2.mp4',
    },
    'soprano3': {
      type: 'performer',
      file: 'videos/s3.mp4',
    },
    'alto1': {
      type: 'performer',
      file: 'videos/a1.mp4',
    },
    'alto2': {
      type: 'performer',
      file: 'videos/a2.mp4',
    },
    'alto3': {
      type: 'performer',
      file: 'videos/a3.mp4',
    },
    'tenor': {
      type: 'performer',
      file: 'videos/t.mp4',
    },
    'bass1': {
      type: 'performer',
      file: 'videos/b1.mp4',
    },
    'bass2': {
      type: 'performer',
      file: 'videos/b2.mp4',
    },
    'tape12': {
      type: 'env',
      file: 'videos/tape12.mp4',
    },
    'tape34': {
      type: 'env',
      file: 'videos/tape34.mp4',
    },
    'tape1234': {
      type: 'env',
      file: 'videos/tape1234.mp4',
    },
    // env
  },
  sections: {

    alpha: {
      time: 0,
      label: "beginning",
    },
    qalpha: {
      time: 60,
      label: "1 minute",
    },
    beta: {
      time: 120,
      label: "2 minutes",
    },
   bwdeta: {
      time: 180,
      label: "3 minutes",
    },
    gamma: {
      time: 240,
      label: "4 minutes",
    },
    delta: {
      time: 300,
      label: "5 minutes",
    },

      epsi: {
      time: 360,
      label: "6 minutes",
    },
      kepsi: {
      time: 420,
      label: "7 minutes",
    },
    epsilon: {
      time: 480,
      label: "8 minutes",
    },
    dzeta: {
      time: 540,
      label: "9 minutes",
    },
    eta: {
      time: 600,
      label: "10 minutes",
    },
    theta: {
      time: 660,
      label: "11 minutes",
    },
    aiota: {
      time: 720,
      label: "12 minutes",
    },
  },
};

export default score;
