const createCordinates = require("../src/input_parser.js").createCordinates;

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('createCordinates', function() {
    it('should give [{direction: L, distance: 1}] for [L1]', function() {
      const expected = [
        {
          'direction': 'L',
          'distance': 1
        }
      ];

      const actual = createCordinates(['L1']);
      expect(expected).to.eql(actual);
    });
  });
