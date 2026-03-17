document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();
  calculate();
});

function calculate() {
  // Inputs
  const uWidth = parseFloat(document.getElementById("uWidth").value);
  const uDepth = parseFloat(document.getElementById("uDepth").value);
  const uHeight = parseFloat(document.getElementById("uHeight").value);

  const sidePack = parseFloat(document.getElementById("sidePack").value);
  const frontPack = parseFloat(document.getElementById("frontPack").value);
  const boxThickness = parseFloat(document.getElementById("boxThickness").value);
  const boxHeight = parseFloat(document.getElementById("boxHeight").value);

  const clampBlade = parseFloat(document.getElementById("clampBlade").value);

  // Packed dimensions
  const totalWidth = uWidth + 2 * sidePack + 2 * boxThickness;
  const totalDepth = uDepth + frontPack + 2 * boxThickness;
  const totalHeight = boxHeight;

  // Containers (width subtracts clampBlade)
  const containers = [
    { name: "53' Truckload",  length: 630,  width: 98.5 - clampBlade, height: 110 },
    { name: "53' Intermodal", length: 630,  width: 98.5 - clampBlade, height: 106 },
    { name: "40' Ocean",      length: 474,  width: 93 - clampBlade,   height: 106 },
    { name: "60' TBOX",       length: 729,  width: 114 - clampBlade,  height: 156 },
    { name: "86' Boxcar",     length: 1032, width: 110 - clampBlade,  height: 153 }
  ];

  let out = "";
  let dims = "Container Dimensions (after clamp subtraction):\n\n";

  containers.forEach(c => {
    dims += `${c.name} → Length: ${c.length} in, Width: ${c.width.toFixed(2)} in, Height: ${c.height} in\n`;
  });

  dims += "\nPacked Appliance Dimensions:\n";
  dims += `Width: ${totalWidth.toFixed(2)} in\nDepth: ${totalDepth.toFixed(2)} in\nHeight: ${totalHeight.toFixed(2)} in\n`;

  document.getElementById("containerDims").textContent = dims;

  // Use FIRST container for the drawing
  const c = containers[0]; // 53’ Truckload

  const fitL = Math.floor(c.length / totalDepth);
  const fitW = Math.floor(c.width / totalWidth);
  const fitH = Math.floor(c.height / totalHeight);
  const totalUnits = fitL * fitW * fitH;

  out += `Using: ${c.name}\n`;
  out += `Fits L × W × H: ${fitL} × ${fitW} × ${fitH}\n`;
  out += `Total Units: ${totalUnits}\n\n`;

  document.getElementById("output").textContent = out;

  // Draw top and side views
  drawTopView(c, totalWidth, totalDepth, fitL, fitW);
  drawSideView(c, totalHeight, totalWidth, fitL, fitH);
}

// Draw top-down view
function drawTopView(container, unitW, unitD, fitL, fitW) {
  const canvas = document.getElementById("topView");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = canvas.width / container.length;

  ctx.strokeRect(0, 0, container.length * scale, container.width * scale);

  for (let i = 0; i < fitL; i++) {
    for (let j = 0; j < fitW; j++) {
      ctx.strokeStyle = "#3498db";
      ctx.strokeRect(
        i * unitD * scale,
        j * unitW * scale,
        unitD * scale,
        unitW * scale
      );
    }
  }
}

// Draw side view
function drawSideView(container, unitH, unitW, fitL, fitH) {
  const canvas = document.getElementById("sideView");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = canvas.width / container.length;

  ctx.strokeRect(0, 0, container.length * scale, container.height * scale);

  for (let i = 0; i < fitL; i++) {
    for (let k = 0; k < fitH; k++) {
      ctx.strokeStyle = "#2ecc71";
      ctx.strokeRect(
        i * unitD * scale,
        container.height * scale - unitH * scale - (k * unitH * scale),
        unitD * scale,
        unitH * scale
      );
    }
  }
}
