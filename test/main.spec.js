const fs = require('fs');
const { assert } = require('chai');

const srcMd = fs.readFileSync('README.md', 'utf8');

describe('Header', function() {
    it('Starts with #', function() {
      assert.isOk(srcMd.startsWith('# How they SRE'), 'Header is broken');
    });
});

describe('Sections', function() {
  ['Introduction', 'Organizations', 'Resources', 'Credits', 'Other How They... repos', 'Contribute', 'License'] .forEach(function (section) {
    it(`${section}`, function() {
        assert.isOk(srcMd.includes(`## ${section}`), `${section} section is missing`);
    });
  });
});