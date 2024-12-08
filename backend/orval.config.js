module.exports = {
  swagger: {
    input: 'http://localhost:4000/api/v1-json',
    output: {
      client: 'swr',
      httpClient: 'fetch',
      target: '../frontend/src/services/index.ts',
    },
  },
};
