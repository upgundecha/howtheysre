const fs = require('fs');
const chai = require('chai');

chai.use(require('chai-arrays'));
chai.use(require('chai-string'));

var expect = chai.expect;

const srcMd = fs.readFileSync('README.md', 'utf8');

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
    expect(expectedH2List).to.equalTo(actualList)
  });
});

describe('Organization list', function () {
  it('is sorted', function () {
    var orgList = srcMd.match(/(?<=<summary>)(.*?)(?=<\/summary>)/g);
    expect(orgList).to.be.sorted(Intl.Collator().compare);
  });
});