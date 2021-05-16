const DFS = (graph, startNode) => {

  let visited = new Set();
  let parents = {};
  let stack = [];

  // start node
  parents[startNode] = null;
  visited.add(startNode);
  stack.push(startNode);

  // while we have elements on stack we iterate
  while (stack.length > 0) {

    // stack.peek()
    let currentNode = stack[stack.length - 1];
    let found = false;

    // check adjacent nodes (children)
    const nodes = graph.get(currentNode);
    const adjacentNodes = nodes ? Array.from(nodes) : [];

    for (let adjacent of adjacentNodes) {

      // if not visited yet then add it to stack
      if (!visited.has(adjacent)) {
        visited.add(adjacent);
        parents[adjacent] = currentNode;
        stack.push(adjacent);

        found = true;
        break;
      }
    }

    if (!found) {
      stack.pop();
    }
  }

  return parents;
}

const constructGraph = (input) => {
  const map = new Map();
  input.forEach(entry => {
    const [source, destination] = entry.split(')');

    if (!map.has(source)) {
      map.set(source, new Set(destination));
    } else {
      map.set(source, map.get(source).add(destination));
    }
  })

  return map;
}

const findStartingNode = (input) => {

  const rightList = input.map(row => row.split(')')[1]);

  console.log(rightList)

  for(let row of input) {
    const [left] = row.split(')')

    if(!rightList.includes(left)) {
      return left;
    }
  }
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
  constructGraph,
  DFS,
  findStartingNode
}
