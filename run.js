
var runner;
var runnerWidth = 30;
var runnerHeight = 60;

var maxBuildings = 3;
var buildings = [];

/**
 * Initialize the runner and the buildings.
 */
function setup() {
    createCanvas(800, 600);

    var initialBuilding = new Building(600, 200, 0);
    initialBuilding.setup();
    buildings.push(initialBuilding);
    for (var i = 0; i < maxBuildings - 1; i++) {
        buildings.push(generateBuilding());
    }

    runner = new Runner(width / 4, initialBuilding.position.y - runnerHeight, runnerWidth, runnerHeight);
}

/**
 * Draw and update the runner and the buildings.
 */
function draw() {
    background(0, 0, 15);

    updateBuildings();
    runner.update(buildings);
    runner.draw();
}

/**
 * Generates a building with random width and height. The building is placed at a random distance apart
 * from the last building.
 */
function generateBuilding() {
    var w = random(400, 1000);
    var h = random(100, 300);
    var gap = random(100, 200);

    // New building's x position is 'gap' distance apart from the last building
    var lastBuilding = buildings[buildings.length - 1];
    var newBuilding = new Building(w, h, lastBuilding.position.x + lastBuilding.w + gap);
    newBuilding.setup();

    return newBuilding;
}

/**
 * Check if any of the buildings have moved off the left hand side of the screen.  If so, they can be removed and replaced with new buildings.
 */
function updateBuildings() {
    for (var i = buildings.length - 1; i >= 0; i--) {
        var building = buildings[i];

        if (building.position.x + building.w < 0) {
            // Building is gone, remove it.
            buildings.splice(i, 1);
        }
        else {
            building.update();
            building.draw();
        }
    }

    // Add any new buildings if needed.
    for (var i = 0; i < maxBuildings - buildings.length; i++) {
        buildings.push(generateBuilding());
    }
}

/**
 * If the player hits space bar, make the runner jump.
 */
function keyPressed() {
    if (key == " ") {
        runner.jump();
    }
}
