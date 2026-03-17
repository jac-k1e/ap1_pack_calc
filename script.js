
document.getElementById("calcForm").addEventListener("submit", function(e) {
  e.preventDefault();
  calculateFits();
});

function calculateFits() {
  const uWidth = parseFloat(document.getElementById("uWidth").value);
  const uDepth = parseFloat(document.getElementById("uDepth").value);
  const uHeight = parseFloat(document.getElementById("uHeight").value);

  const sidePack = parseFloat(document.getElementById("sidePack").value);
  const frontPack = parseFloat(document.getElementById("frontPack").value);
  const boxThickness = parseFloat(document.getElementById("boxThickness").value);
  const boxHeight = parseFloat(document.getElementById("boxHeight").value);

  const clampBlade = parseFloat(document.getElementById("clampBlade").value);

  // Compute packed dimensions
  const totalWidth = uWidth + 2 * sidePack + 2 * boxThickness;
  const totalDepth = uDepth + frontPack + 2 * boxThickness;
  const totalHeight = boxHeight;

  const containers = [
    { name: "53' Truckload", length: 630, width: 98.5, height: 110 },
    { name: "53' Intermodal", length: 630, width: 98.5, height: 106 },
    { name: "40' Ocean", length: 474, width: 93, height: 106 },
    { name: "60' TBOX", length: 729, width: 114, height: 156 },
    { name: "86' Boxcar", length: 1032, width: 110, height: 153 }
  ];

  let out = "";
  out += `Packed Appliance Dimensions:\n`;
  out += `Width:  ${totalWidth.toFixed(2)} in\n`;
  out += `Depth:  ${totalDepth.toFixed(2)} in\n`;
  out += `Height: ${totalHeight.toFixed(2)} in\n\n`;

  out += "Container Fits:\n\n";

  containers.forEach(c => {
    const fitLength = Math.floor(c.length / totalDepth);
    const fitWidth = Math.floor(c.width / totalWidth);
    const fitHeight = Math.floor(c.height / totalHeight);

    const totalUnits = fitLength * fitWidth * fitHeight;

    const clearanceWidth = (c.width - totalWidth - clampBlade).toFixed(2);
    const clearanceHeight = (c.height - totalHeight - clampBlade).toFixed(2);

    out += `${c.name}:\n`;
    out += `  Fits (L × W × H): ${fitLength} × ${fitWidth} × ${fitHeight}\n`;
    out += `  Total Units: ${totalUnits}\n`;
    out += `  Width Clearance After Clamp:  ${clearanceWidth} in\n`;
    out += `  Height Clearance After Clamp: ${clearanceHeight} in\n\n`;
  });

  document.getElementById("output").textContent = out;
}
``
