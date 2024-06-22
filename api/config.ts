import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/tours',
  emailData: {
    emailVerifyPass: 'nznipjhbbzooezuk',
    emailUser: 'epictourskg@gmail.com',
  },
};

export default config;
