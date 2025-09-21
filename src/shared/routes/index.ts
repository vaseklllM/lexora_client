export const routes = {
  home: {
    url: () => "/",
    path: () => "/",
  },
  signIn: {
    url: () => "/sign-in",
    path: () => "/sign-in",
  },
  signUp: {
    url: () => "/sign-up",
    path: () => "/sign-up",
  },
  dashboard: {
    url: () => "/dashboard",
    path: () => "/dashboard",
    folder: {
      url: (id: string) => `${routes.dashboard.url()}/folder/${id}`,
      path: () => `${routes.dashboard.path()}/folder/:id`,
    },
    deck: {
      url: (id: string) => `${routes.dashboard.url()}/deck/${id}`,
      path: () => `${routes.dashboard.path()}/deck/:id`,
    },
  },
  logout: {
    url: () => "/logout",
    path: () => "/logout",
  },
  tooManyRequest: {
    url: (backUrl?: string) => {
      if (!backUrl) {
        return `/too-many-request`;
      }
      return `/too-many-request?backUrl=${backUrl}`;
    },
    path: () => "/too-many-request",
  },
};
