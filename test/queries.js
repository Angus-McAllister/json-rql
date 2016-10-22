var _fs = require('fs'),
    _path = require('path'),
    _jrql = require('../sparql');

describe('Should handle all SPARQL.js queries', function () {
  _fs.readdirSync(_path.join(__dirname, '../node_modules/sparqljs/queries')).forEach(function (name) {
    var sparql = _fs.readFileSync(_path.join(__dirname, '../node_modules/sparqljs/queries', name), 'utf-8');
    _jrql.toJsonRql(sparql, function (err, jrql, parsed) {
      err && (jrql.__err = err);
      jrql.__sparql = sparql.split('\n');
      jrql.__parsed = parsed;
      _fs.writeFileSync(_path.join(__dirname, 'queries', name.slice(0, name.lastIndexOf('.')) + '.json'), JSON.stringify(jrql, null, '  '), 'utf-8');
    });
  });
});
