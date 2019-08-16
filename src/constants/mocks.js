const subjects = [
  {
    id: 1,
    name: 'Autoria Web',
    tags: ['programacao', 'javascript'],
    count: 5,
    image: 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png',
  },
  {
    id: 2,
    name: 'Programacao com Banco de Dados',
    tags: ['programacao', 'mysql', 'php'],
    count: 9,
    image: 'https://png.pngtree.com/svg/20170919/a2757b299d.svg',
  },
  {
    id: 3,
    name: 'Redes',
    tags: ['programacao', 'cisco'],
    count: 4,
    image: 'https://static.thenounproject.com/png/350289-200.png',
  },
];

const monitors = [
  {
    id: 1,
    name: 'Viktor Hireal',
    class: 'INFO 4A',
    description: 'My name is Viktor!',
    tags: ['Javascript', 'React', 'Node', 'Postgres'],
    available: true,
  },
];

const profile = {
  name: 'Vitor Hariel',
  class: 'INFO 3A',
  email: 'vhbarauna@gmail.com',
  avatar:
    'https://scontent.fnat2-1.fna.fbcdn.net/v/t1.0-9/66033502_1062595433945631_1528851165867933696_n.jpg?_nc_cat=101&_nc_oc=AQkTl8QRjjQQqGT2WCecQXY4VpezNQi1Giu6TqeP5eaVlZ_X8ihgcwFgYSPg8S-NECd9-ZDppIsLDX0qOG4dpiZs&_nc_ht=scontent.fnat2-1.fna&oh=b831dd6c857ebab962b09529dda5b6dc&oe=5DE5D16A',
  notifications: true,
};

export default {subjects, monitors, profile};
