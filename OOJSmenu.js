function calculate() {
    const sides = document.getElementById('sides').value;
    const sideLength = document.getElementById('sideLength').value;

    // Feltételezzük, hogy a Polygon osztály is ebben a fájlban van, vagy egy másik, már betöltött fájlban
    const polygon = new Polygon(sides, sideLength);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const perimeterP = document.createElement('p');
    perimeterP.innerText = `Kerület: ${polygon.perimeter()}`;
    resultsDiv.appendChild(perimeterP); // Hozzáadjuk a resultsDiv-hez, nem a body-hoz

    const areaP = document.createElement('p');
    areaP.innerText = `Terület: ${polygon.area()}`;
    resultsDiv.appendChild(areaP); // Hozzáadjuk a resultsDiv-hez, nem a body-hoz

    const interiorAngleP = document.createElement('p');
    interiorAngleP.innerText = `Belső szög: ${polygon.interiorAngle()}`;
    resultsDiv.appendChild(interiorAngleP); // Hozzáadjuk a resultsDiv-hez, nem a body-hoz

    const exteriorAngleP = document.createElement('p');
    exteriorAngleP.innerText = `Külső szög: ${polygon.exteriorAngle()}`;
    resultsDiv.appendChild(exteriorAngleP); // Hozzáadjuk a resultsDiv-hez, nem a body-hoz
}

class Polygon {
  constructor(sides, sideLength) {
    this.sides = sides;
    this.sideLength = sideLength;
  }

  perimeter() {
    return this.sides * this.sideLength;
  }

  area() {
        if (this.sides < 3) {
          return 0;
        }
        const apothem = this.sideLength / (2 * Math.tan(Math.PI / this.sides));
        return (0.5 * this.perimeter() * apothem).toFixed(3);
  }

  interiorAngle() {
    return (this.sides - 2) * 180 / this.sides;
  }

  exteriorAngle() {
    return 360 / this.sides;
  }
}