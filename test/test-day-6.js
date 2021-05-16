const path = require('path');
const { expect } = require('chai')
const { DFS, constructGraph, sumSteps, constructUniqueOrbits } = require('../day-6/index');
const { readFile } = require('../helpers/helpers');

describe.only('day-4 tests', () => {

  describe.only('find starting node tests', () => {

    const testCases = [
      { inputFile: 'test-input.txt', expectedResult: 12 },
      { inputFile: 'input.txt', expectedResult: 'COM' },
    ]

    testCases.forEach(tc => {
      it(`starting node for ${tc.inputFile} should be ${tc.expectedResult}`, () => {
        const input = readFile(path.join(__dirname, '../', 'day-6', tc.inputFile));

        const uniques = constructUniqueOrbits(input);

        expect(uniques.size).to.be.equal(tc.expectedResult);

      })
    })
  });

  const testCases = [
    { inputFile: 'test-input.txt', expectedResult: 42 },
    { inputFile: 'input.txt', expectedResult: 42 }
  ]

  testCases.forEach(tc => {
    it('test', () => {
      const input = readFile(path.join(__dirname, '../', 'day-6', tc.inputFile));

      const graph = constructGraph(input);

      const nodes = DFS(graph, 'COM')

      const stepsSum = sumSteps(nodes);

      console.log(stepsSum);
    })
  })
})