import React from 'react';



const Home = React.lazy(() => import('./home/Home'));
const Quizes = React.lazy(() => import('./quizes/Quizes'));
const ColorQuizes = React.lazy(() => import('./quizes/ColorQuizes/index'));


const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/quizes', name: 'Quizes', component: Quizes },
  { path: '/colorQuizes', name: 'ColorQuizes', component: ColorQuizes },
];

export default routes;
