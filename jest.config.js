module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],  // Agora o Jest encontrará arquivos de teste em qualquer pasta
};
