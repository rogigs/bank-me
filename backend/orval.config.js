module.exports = {
  swagger: {
    input: 'http://localhost:4000/swagger/json',
    output: {
      client: 'swr',
      httpClient: 'fetch',
      target: '../frontend/src/services/index.ts',
      mode: 'split',
      mock: true,
      baseUrl: 'http://localhost:4000',
    },
  },
};
