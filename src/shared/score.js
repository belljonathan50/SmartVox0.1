// score definition
const score = {
  title: 'Šîr HaŠîrîm - Hoheslied',
  duration: 19 * 60, 
  parts: {
    // links

    'soprano1': {
      type: 'performer',
      file: 'videos/soprano1.mp4',
    },
    'soprano2': {
      type: 'performer',
      file: 'videos/soprano2.mp4',
    },
    'soprano3': {
      type: 'performer',
      file: 'videos/soprano3.mp4',
    },
    'alto1': {
      type: 'performer',
      file: 'videos/alto1.mp4',
    },
    'alto2': {
      type: 'performer',
      file: 'videos/alto2.mp4',
    },
    'alto3': {
      type: 'performer',
      file: 'videos/alto3.mp4',
    },
    'tenor1': {
      type: 'performer',
      file: 'videos/tenor1.mp4',
    },
    'tenor2': {
      type: 'performer',
      file: 'videos/tenor2.mp4',
    },
    'tenor3': {
      type: 'performer',
      file: 'videos/tenor3.mp4',
    },
    'bass1': {
      type: 'performer',
      file: 'videos/basse1.mp4',
    },
    'bass2': {
      type: 'performer',
      file: 'videos/basse2.mp4',
    },
    'bass3': {
      type: 'performer',
      file: 'videos/basse3.mp4',
    },
    'fullscore and tape': {
      type: 'env',
      file: 'videos/fullscore and tape.mp4',
    },
    'spectrogram': {
      type: 'env',
      file: 'videos/spectrogram.mp4',
    },
    'tape12': {
      type: 'env',
      file: 'videos/tape12.mp4',
    },
    'tape34': {
      type: 'env',
      file: 'videos/tape34.mp4',
    },
    // env
  },
  sections: {

    alpha: {
      time: 0,
      label: "beginning",
    },
    qalpha: {
      time: 14,
      label: "sir-ha sop.3",
    },
    beta: {
      time: 28,
      label: "spectral arpegio",
    },
   bwdeta: {
      time: 46,
      label: "lvi slomoh",
    },
    gamma: {
      time: 71,
      label: "slomoh - FM synthesis",
    },
    delta: {
      time: 94,
      label: "yssaqeni",
    },
      epsi: {
      time: 127,
      label: "minnesi ts ts ts",
    },
      kepsi: {
      time: 145,
      label: "shlomo",
    },
    epsilon: {
      time: 220,
      label: "shwora-wenara",
    },
    dzeta: {
      time: 254,
      label: "lereha",
    },
    eta: {
      time: 308,
      label: "habi'ani",
    },
    theta: {
      time: 355,
      label: "nazkira",
    },
    aiota: {
      time: 413,
      label: "nagila",
    },

      qepsi: {
      time: 453,
      label: "semene - glissandi",
    },
      qkepsi: {
      time: 500,
      label: "moshkheni ahareykha",
    },
    qepsilon: {
      time: 517,
      label: "ahebukha",
    },
    qdzeta: {
      time: 641,
      label: "hebiani",
    },
    qeta: {
      time: 694,
      label: "shrora",
    },
    qtheta: {
      time: 746,
      label: "hammelekh",
    },
    qaiota: {
      time: 778,
      label: "qedar",
    },
      wepsi: {
      time: 822,
      label: "ke'âole",
    },
      wkepsi: {
      time: 863,
      label: "moshreni - unisson",
    },
    wepsilon: {
      time: 899,
      label: "wenara",
    },
    wdzeta: {
      time: 942,
      label: "mesarim",
    },
    weta: {
      time: 1011,
      label: "kiriot",
    },
    wtheta: {
      time: 1087,
      label: "nazkira",
    },
  },
};

export default score;
