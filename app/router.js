
import UniversalRouter from 'universal-router';

const Router = {
  create: (routes, actions) => {
    const config = routes.map(route => {
      return {
        path: route.path,
        action: actions[route.action] || 'error'//<<
      };
    });
    return new UniversalRouter(config, {
      errorHandler: err => {
        console.error(err.toString());
        if (actions.error) {
          return actions.error(err)
        }
      }
    });
  }
};

export default Router;

