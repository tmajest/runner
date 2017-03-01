
// Speed that the buildings move across the screen
var buildingSpeed = 5;

/**
 * Building constructor function.
 * @param w The building width
 * @param h The building height
 * @param x The building's initial x position
 */
function Building(w, h, x) {
    this.w = w;
    this.h = h;
    this.position = createVector(x, height - h);

    // Each building has a random color
    this.buildingColor = color(random(0, 30), random(0, 30), random(0, 30));

    // Each building has a random window size and number of windows.
    this.windowColors = [];
    this.windowSize = random(30, 50);
    this.windowCols = floor(this.w / this.windowSize) - 4;
    this.windowRows = floor(this.h / this.windowSize) - 2;

    // Calculate the gaps between each window
    this.gapX = (this.w - (this.windowCols * this.windowSize)) / (this.windowCols + 1);
    this.gapY = (this.h - (this.windowRows * this.windowSize)) / (this.windowRows + 1);

    /**
     * Set up the initial window colors
     */
    this.setup = function() {
        for (var i = 0; i < this.windowCols; i++) {
            this.windowColors.push([]);
            for (var j = 0; j < this.windowRows; j++) {

                // Around 15% of windows will be 'on' - a slightly yellow color
                if (random() < 0.15) {
                    var fillColor = random(180, 200);
                    this.windowColors[i].push(color(fillColor, fillColor, 10));
                }
                else {
                    var fillColor = random(150, 180);
                    this.windowColors[i].push(color(fillColor, fillColor, fillColor));
                }
            }
        }
    }

    /**
     * Updates the building's position according to the buildingSpeed defined above.
     */
    this.update = function() {
        this.position.x -= buildingSpeed;
    }

    /**
     * Draw the building and its windows.
     */
    this.draw = function() {
        fill(this.buildingColor);
        stroke(60);
        strokeWeight(4);
        rect(this.position.x, this.position.y, this.w, this.h);

        this.drawWindows();
    }

    /**
     * Draw the building's windows.
     */
    this.drawWindows = function() {
        var windowStartX = this.position.x + this.gapX;
        var windowStartY = this.position.y + this.gapY;

        for (var i = 0; i < this.windowCols; i++) {
            for (var j = 0; j < this.windowRows; j++) {
                var windowX = windowStartX + (i * (this.windowSize + this.gapX));
                var windowY = windowStartY + (j * (this.windowSize + this.gapY));

                // Fill window color
                fill(this.windowColors[i][j]);
                stroke(200);
                strokeWeight(1);
                rect(windowX, windowY, this.windowSize, this.windowSize);
            }
        }
    }
}
