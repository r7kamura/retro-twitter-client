import Application from './libraries/application'

try {
  new Application().run();
} catch (e) {
  console.log(e.stack);
}
