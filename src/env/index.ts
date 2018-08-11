// env
import nconf from "nconf";
import path from 'path';

nconf.env();
nconf.file("environment", resolveEnvFile(`.env.${nodeEnv()}.json`));
nconf.file("defaults", resolveEnvFile(".env.defaults.json"));

process.env.NODE_ENV = nodeEnv();

function resolveEnvFile(file: string) {
  return path.resolve(__dirname, file);
}

function nodeEnv() {
  return accessor("NODE_ENV");
}

function accessor(key: string) {
  return nconf.get(key);
}

export default accessor;
