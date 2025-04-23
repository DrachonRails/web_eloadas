    // Web Storage
    function saveToStorage() {
        const val = document.getElementById('storageInput').value;
        localStorage.setItem('myValue', val);
      }
      function loadFromStorage() {
        document.getElementById('storageOutput').textContent = localStorage.getItem('myValue');
      }
  
      // Web Worker
      let worker;
      function startWorker() {
        if (typeof(Worker) !== "undefined") {
          if (!worker) {
            worker = new Worker("worker.js");
          }
          worker.onmessage = function(e) {
            document.getElementById("workerResult").textContent = e.data;
          };
          worker.postMessage("start");
        } else {
          alert("A böngésződ nem támogatja a Web Worker API-t.");
        }
      }
  
      // Geolocation
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById("locationOutput").textContent = 
              "Szélesség: " + position.coords.latitude + 
              ", Hosszúság: " + position.coords.longitude;
          });
        } else {
          document.getElementById("locationOutput").textContent = "A böngésződ nem támogatja a Geolocation API-t.";
        }
      }
  
      // Drag & Drop
      function allowDrop(ev) {
        ev.preventDefault();
      }
      function dragStart(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }
  
      // Canvas rajzolás
      document.addEventListener("DOMContentLoaded", function () {
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "green";
      ctx.fillRect(10, 10, 150, 75);
    });