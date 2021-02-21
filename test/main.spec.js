const fs = require('fs');
const chai = require('chai');

chai.use(require('chai-arrays'));
chai.use(require('chai-string'));

var expect = chai.expect;

const srcMd = fs.readFileSync('README.md', 'utf8');

describe('Checklist', function () {
  describe('Header', function () {
    it('is intact', function () {
      expect(srcMd).to.startsWith('# How they SRE');
    });
  });

  describe('Section Headers', function () {
    it('intact', function () {
      var expectedH2List = [
        '## Introduction',
        '## Organizations',
        '## SRECon Mix Playlist',
        '## Resources',
        '## Credits',
        '## Other How They... repos',
        '## Contribute',
        '## License'
      ]
      var actualList = srcMd.match(/^## (.*$)/gim);
      expect(actualList).to.equalTo(expectedH2List)
    });
  });

  describe('Organization list', function () {
    it('is sorted', function () {
      var orgList = srcMd.match(/(?<=<summary>)(.*?)(?=<\/summary>)/g);
      expect(orgList).to.be.sorted(Intl.Collator().compare);
    });
  });

  describe('Uniqueness', function() {
    it('has unique items', function () {
      var items = srcMd.match(/(?<=\* )(.*?)(?=\))/g);
      var hasDuplicate = items.some((val, i) => items.indexOf(val) !== i);
      expect(hasDuplicate).to.equal(false, 'List has duplicate items');
    });
    it('has unique link text', function () {
      var items = srcMd.match(/(?<=\* \[)(.*?)(?=\])/g);
      var hasDuplicate = items.some((val, i) => items.indexOf(val) !== i);
      expect(hasDuplicate).to.equal(false, 'List has duplicate text');
    });
    it('has unique urls', function () {
      var items = srcMd.match(/(?<=\* \[*.*\]\()(.*?)(?=\))/g);
      
      // this link appears twice hence filtering it      
      var items = arrayRemove(items, 'https://github.com/abhivaikar/howtheytest');
      
      var hasDuplicate = items.some((val, i) => items.indexOf(val) !== i);
      expect(hasDuplicate).to.equal(false,  'List has duplicate link');
    });
  })
});

function arrayRemove(arr, value) { 
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}