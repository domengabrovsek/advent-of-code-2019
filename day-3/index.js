const calculatePoints = (wire) => {

  let points = [];
  let currentX = 0, currentY = 0;

  const pointExists = (points, point) => points.some(p => p.x === point.x && p.y === point.y);

  wire.forEach(step => {
    const direction = step.slice(0, 1);
    const distance = parseInt(step.slice(1, step.length));

    switch (direction) {
      case 'R': {
        for (let x = currentX; x <= currentX + distance; x++) {
          const point = { x: x, y: currentY };

          if (!pointExists(points, point)) {
            points.push(point);
          }
        }

        currentX += distance;
        break;
      }
      case 'L': {
        for (let x = currentX; x >= currentX - distance; x--) {
          const point = { x: x, y: currentY };

          if (!pointExists(points, point)) {
            points.push(point);
          }
        }

        currentX -= distance;
        break;
      }
      case 'U': {
        for (let y = currentY; y <= currentY + distance; y++) {
          const point = { x: currentX, y: y };

          if (!pointExists(points, point)) {
            points.push(point);
          }
        }

        currentY += distance;
        break;
      }
      case 'D': {
        for (let y = currentY; y >= currentY - distance; y--) {
          const point = { x: currentX, y: y };

          if (!pointExists(points, point)) {
            points.push(point);
          }
        }

        currentY -= distance;
        break;
      }
    }
  })

  return points;
}

const calculateLines = (wire) => {

  const lines = [];
  let currentX = 0; currentY = 0;

  wire.forEach(step => {
    const direction = step.slice(0, 1);
    const distance = parseInt(step.slice(1, step.length));

    switch (direction) {
      case 'R': {
        lines.push(
          {
            a: { x: currentX, y: currentY },
            b: { x: currentX + distance, y: currentY }
          }
        )

        currentX += distance;
        break;
      }
      case 'L': {
        lines.push(
          {
            a: { x: currentX, y: currentY },
            b: { x: currentX - distance, y: currentY }
          }
        )

        currentX -= distance;
        break;
      }
      case 'U': {
        lines.push(
          {
            a: { x: currentX, y: currentY },
            b: { x: currentX, y: currentY + distance }
          }
        )

        currentY += distance;
        break;
      }
      case 'D': {
        lines.push(
          {
            a: { x: currentX, y: currentY },
            b: { x: currentX, y: currentY - distance }
          }
        )

        currentY -= distance;
        break;
      }
    }
  })

  return lines;
}

const calculateIntersectionPoints = (wires) => {

  const [firstWire, secondWire] = wires;

  const intersections = [];

  const firstWirePoints = calculatePoints(firstWire);
  const secondWirePoints = calculatePoints(secondWire);

  firstWirePoints.forEach(fp => {
    secondWirePoints.forEach(sp => {
      if (fp.x !== 0 && sp.x !== 0 && fp.x === sp.x && fp.y === sp.y) {
        intersections.push(fp);
      }
    })
  })

  return intersections;
}

const calculateDistanceFromCenter = (point) =>
  Math.abs(point.x) + Math.abs(point.y);

const calculateClosestIntersectionDistance = (intersections) =>
  Math.min(...intersections.map(intersection => calculateDistanceFromCenter(intersection)));

module.exports = {
  calculatePoints,
  calculateIntersectionPoints,
  calculateDistanceFromCenter,
  calculateClosestIntersectionDistance,
  calculateLines
}
