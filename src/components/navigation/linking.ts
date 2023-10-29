const config = {
  screens: {
    Login: {
      path: 'login/:params',
      parse: {
        name: (params: any) => `${params}`,
      },
    },
  },
};

const linking = {
  prefixes: ['l2-apis://app'],
  config,
};

export default linking;
