import {
    HOMEPAGE,
    SEARCH,
    RESULTS
    } from './pagesPaths';
  import withSuspense from 'components/HOC/withSuspense';
  
  
   const routes = [
    {
      path: HOMEPAGE,
      component: withSuspense({ page: "Home" }),
      exact: true,
    },
    {
      path: SEARCH,
      component: withSuspense({ page: "Search" }),
      exact: true,
    },
    {
      path: RESULTS,
      component: withSuspense({ page: "Results" }),
      exact: true,
    }
  ];
  
  
  export default routes;