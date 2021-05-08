
const path = require('path');
const { expect } = require('chai');
const {
  calculatePoints,
  calculateIntersectionPoints,
  calculateDistanceFromCenter,
  calculateClosestIntersectionDistance,
  calculateLines
} = require('../day-3/index');

const { readFile } = require('../helpers/helpers');
const input = readFile(path.join(__dirname, '../', 'day-3', 'input.txt')).map(line => line.split(','));

describe('day-3 tests', () => {

  describe('calculate all points on wire', () => {
    const testCases = [
      {
        input: ["R8", "U5", "L5", "D3"], expectedResult: [
          { x: 0, y: 0 }, { x: 1, y: 0 },
          { x: 2, y: 0 }, { x: 3, y: 0 },
          { x: 4, y: 0 }, { x: 5, y: 0 },
          { x: 6, y: 0 }, { x: 7, y: 0 },
          { x: 8, y: 0 }, { x: 8, y: 1 },
          { x: 8, y: 2 }, { x: 8, y: 3 },
          { x: 8, y: 4 }, { x: 8, y: 5 },
          { x: 7, y: 5 }, { x: 6, y: 5 },
          { x: 5, y: 5 }, { x: 4, y: 5 },
          { x: 3, y: 5 }, { x: 3, y: 4 },
          { x: 3, y: 3 }, { x: 3, y: 2 }
        ]
      },
      {
        input: ["U7", "R6", "D4", "L4"], expectedResult: [
          { x: 0, y: 0 }, { x: 0, y: 1 },
          { x: 0, y: 2 }, { x: 0, y: 3 },
          { x: 0, y: 4 }, { x: 0, y: 5 },
          { x: 0, y: 6 }, { x: 0, y: 7 },
          { x: 1, y: 7 }, { x: 2, y: 7 },
          { x: 3, y: 7 }, { x: 4, y: 7 },
          { x: 5, y: 7 }, { x: 6, y: 7 },
          { x: 6, y: 6 }, { x: 6, y: 5 },
          { x: 6, y: 4 }, { x: 6, y: 3 },
          { x: 5, y: 3 }, { x: 4, y: 3 },
          { x: 3, y: 3 }, { x: 2, y: 3 }
        ]
      }
    ]

    testCases.forEach(tc => {
      it(`wire: ${tc.input}`, () => {

        const result = calculatePoints(tc.input);

        expect(result).to.be.deep.equal(tc.expectedResult)

      })
    })
  })

  describe('calculate all intersections on wires', () => {

    const testCases = [
      {
        input: [["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]],
        expectedResult: [{ x: 3, y: 3 }, { x: 6, y: 5 }]
      }
    ]

    testCases.forEach(tc => {
      it(`calculate intersections between ${tc.input[0]} and ${tc.input[1]}`, () => {

        const result = calculateIntersectionPoints(tc.input);

        expect(result).to.deep.have.same.members(tc.expectedResult);

      })
    })
  })

  describe('calculate distance from center', () => {

    const testCases = [
      { input: { x: 1, y: 1 }, expectedResult: 2 },
      { input: { x: 5, y: 3 }, expectedResult: 8 },
      { input: { x: -5, y: 2 }, expectedResult: 7 },
      { input: { x: 0, y: 0 }, expectedResult: 0 },
      { input: { x: -9, y: -11 }, expectedResult: 20 }
    ]

    testCases.forEach(tc => {
      it(`distance between center and (${tc.input.x}, ${tc.input.y}) should be ${tc.expectedResult}`, () => {
        const result = calculateDistanceFromCenter(tc.input);

        expect(result).to.be.equal(tc.expectedResult)
      })
    })

  })

  describe('calculate manhattan distance from center to closest intersection', () => {

    const testCases = [
      {
        input: [["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]],
        expectedResult: 6
      },
      {
        input: [
          ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
          ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
        ],
        expectedResult: 159
      },
      {
        input: [
          ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"],
          ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
        ],
        expectedResult: 135
      },
      // {
      //   input: input,
      //   expectedResult: 266
      // }

    ]

    testCases.forEach(tc => {
      it(`first wire: ${tc.input[0]}, second wire: ${tc.input[1]}, distance: ${tc.expectedResult}`, () => {

        const intersections = calculateIntersectionPoints(tc.input);
        const result = calculateClosestIntersectionDistance(intersections);

        expect(result).to.be.equal(tc.expectedResult);

      })
    })
  })

  describe('calculate all lines on wire', () => {
    const testCases = [
      {
        input: ["R8", "U5", "L5", "D3"], expectedResult: [
          { a: { x: 0, y: 0 }, b: { x: 8, y: 0 } },
          { a: { x: 8, y: 0 }, b: { x: 8, y: 5 } },
          { a: { x: 8, y: 5 }, b: { x: 3, y: 5 } },
          { a: { x: 3, y: 5 }, b: { x: 3, y: 2 } }
        ]
      },
      {
        input: ["U7", "R6", "D4", "L4"], expectedResult: [
          { a: { x: 0, y: 0 }, b: { x: 0, y: 7 } },
          { a: { x: 0, y: 7 }, b: { x: 6, y: 7 } },
          { a: { x: 6, y: 7 }, b: { x: 6, y: 3 } },
          { a: { x: 6, y: 3 }, b: { x: 2, y: 3 } }
        ]
      }
    ]

    testCases.forEach(tc => {
      it(`wire: ${tc.input}`, () => {

        const result = calculateLines(tc.input);
        expect(result).to.be.deep.equal(tc.expectedResult)

      })
    })
  })

});