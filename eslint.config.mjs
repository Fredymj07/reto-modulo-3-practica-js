import { ESLint } from 'eslint';

export default [
   {
      files: ['**/*.js', '**/*.mjs'],
      languageOptions: {
         ecmaVersion: 'latest', // Soporte para la última versión de ECMAScript
         sourceType: 'module', // Habilitar módulos ES6
      },
      rules: {
         'no-unused-vars': 'warn', // Advertencia para variables no usadas
         'no-console': 'off', // Permitir el uso de console.log
         eqeqeq: 'error', // Requiere el uso de === y !==
         curly: 'error', // Requiere llaves en bloques
         semi: ['error', 'always'], // Requiere punto y coma al final de las líneas
         quotes: ['error', 'single'], // Usar comillas simples
         indent: ['error', 3], // Indentación de 2 espacios
      },
   },
];
