const fs = require('fs');
const chai = require('chai');

chai.use(require('chai-arrays'));
chai.use(require('chai-string'));

var expect = chai.expect;

const srcMd = fs.readFileSync('README.md', 'utf8');

describe('Header', function() {
    it('Starts with #', function() {
      expect(srcMd).to. startsWith('# How they SRE');
    });
});

describe('Sections', function() {
  ['Introduction', 
    'Organizations', 
    'Resources', 
    'Credits', 
    'Other How They... repos', 
    'Contribute', 
    'License'].forEach(function (section) {
    it(`${section}`, function() {
      expect(srcMd).to.contain(`## ${section}`);
    });
  });
});

describe('Order', function() {
  it('Organization list is sorted', function() {
      var list = srcMd.match(/(?<=<summary>)(.*?)(?=<\/summary>)/g);
      expect(list).to.be.sorted(Intl.Collator().compare);
  });
});