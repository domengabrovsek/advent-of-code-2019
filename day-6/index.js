const constructUniqueOrbits = (input) => {

  const uniques = new Set();

  input.forEach(row => {
    const [left, right] = row.split(')');

    uniques.add(left);
    uniques.add(right);

  })

  return uniques;
}

const sumSteps = (nodes) => {
  let stepsCount = {};

  Object.keys(nodes).forEach(key => {
    if (!nodes[key]) {
      stepsCount[key] = 0;
    } else {
      stepsCount[key] = stepsCount[nodes[key]] + 1
    }
  })

  const steps = Object.keys(stepsCount).map(key => stepsCount[key]);
  const sum = steps.reduce((sum, curr) => sum + curr, 0);

  return sum;
}

module.exports = {
  sumSteps,
  constructUniqueOrbits
}
