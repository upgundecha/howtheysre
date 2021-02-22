const fs = require('fs');
const chai = require('chai');

chai.use(require('chai-arrays'));
chai.use(require('chai-string'));

const expect = chai.expect;

const srcMd = fs.readFileSync('README.md', 'utf8');

describe('Checklist', function() {
  describe('Header', function() {
    it('is intact', function() {
      expect(srcMd).to.startsWith('# How they SRE');
    });
  });

  describe('Section Headers', function() {
    it('intact', function() {
      const expectedH2List = [
        '## Introduction',
        '## Organizations',
        '## SRECon Mix Playlist',
        '## Resources',
        '## Credits',
        '## Other How They... repos',
        '## Contribute',
        '## License'];
      const actualList = srcMd.match(/^## (.*$)/gim);
      expect(actualList).to.equalTo(expectedH2List);
    });
  });

  describe('Organization list', function() {
    it('is sorted', function() {
      const orgList = srcMd.match(/(?<=<summary>)(.*?)(?=<\/summary>)/g);
      expect(orgList).to.be.sorted(Intl.Collator().compare);
    });
  });

  describe('Uniqueness', function() {
    it('has unique items', function() {
      const items = srcMd.match(/(?<=\* )(.*?)(?=\))/g);
      const hasDuplicate = items.some((val, i) => items.indexOf(val) !== i);
      expect(hasDuplicate).to.equal(false, 'List has duplicate items');
    });
    it('has unique link text', function() {
      const items = srcMd.match(/(?<=\* \[)(.*?)(?=\])/g);
      const hasDuplicate = items.some((val, i) => items.indexOf(val) !== i);
      expect(hasDuplicate).to.equal(false, 'List has duplicate text');
    });
    it('has unique urls', function() {
      const items = srcMd.match(/(?<=\* \[*.*\]\()(.*?)(?=\))/g);
      // this link appears twice hence filtering it
      const filteredItems = arrayRemove(items, 'https://github.com/abhivaikar/howtheytest');
      const hasDuplicate = filteredItems
          .some((val, i) => filteredItems.indexOf(val) !== i);
      expect(hasDuplicate).to.equal(false, 'List has duplicate link');
    });
  });
});

function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
}
