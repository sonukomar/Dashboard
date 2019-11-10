const writeJsonFile = require('write-json-file');

(async () => {
    await writeJsonFile('./public/foo.json', {foo: true});
})();