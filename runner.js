
// Runner may jump once or twice before landing
var maxJumps = 2;

// Forces applied to the runner during jumps
var jumpForce = -25;
var gravity = 2.0;

// Limit the runner's max falling velocity to make building collision detection easier.
var maxVelocity = 25;

/**
 * Constructor function for Runner object.
 * @param x The initial x position of the runner
 * @param y The initial y position of the runner
 * @param w The runner's width
 * @param h The runner's height
 */
function Runner(x, y, w, h) {

    // Position and velocity vectors
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);

    this.w = w;
    this.h = h;

    // The total number of jumps the runner has remaining
    this.totalJumps = maxJumps;

    /**
     * Checks the position of the runner against all of the buildings.  Returns
     * the building that the runner has landed on, if any.
     *
     * @param buildings The buildings to check.
     * @return The building that the runner has landed on.
     */
    this.landedOnBuilding = function(buildings) {
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];

            // Check if the runner is within the bounds of the building and
            // if they are within 15 pixels of the top of the building.  If so,
            // they have 'landed' on this building.
            if (this.position.x + w >= building.position.x &&
                this.position.x <= building.position.x + building.w &&
                abs(this.position.y + this.h - building.position.y) < 15) {
                    return building;
            }
        }
    };

    this.hitSideOfBuilding = function(buildings) {
        for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];

            if (abs(this.position.x + w - building.position.x) < 15 &&
                this.position.y + this.h > building.position.y) {
                    return building;
            }
        }
    };

    /**
     * Draw the runner.
     */
    this.draw = function() {
        fill(150);
        stroke(60);
        strokeWeight(4);
        rect(this.position.x, this.position.y, this.w, this.h);
    };

    /**
     * Jump if the runner has remaining jumps.
     */
    this.jump = function() {
        if (this.totalJumps == 0)
            return;

        this.totalJumps--;

        // Apply the jump force to the runner's y velocity.
        this.velocity.y = jumpForce;
    };

    /**
     * Update the runner's position.
     */
    this.update = function(buildings) {

        // Update the x and y position of the runner according to it's x and y velocity.
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Update the y velocity according to gravity.  This enables the runner to jump or fall.
        //
        // Restrict the velocity in the downwards direction to not be greater than the
        // maximum velocity.  This makes it easier to detect collisions with the tops of the buildings.
        this.velocity.y = min(this.velocity.y + gravity, maxVelocity);

        // Check if we've landed on a building.  If so, stop falling by making the y velocity 0 and snap
        // the runner's position to the top of the building.  Also, refresh the total number of jumps.
        var landedBuilding = this.landedOnBuilding(buildings);
        if (landedBuilding) {
            this.position.y = landedBuilding.position.y - this.h;
            this.totalJumps = maxJumps;
            this.velocity.y = 0;
        }

        // Check if we hit the side of the building.  If so, the runner shouldn't move forward.
        var hitBuilding = this.hitSideOfBuilding(buildings);
        if (hitBuilding) {
            this.velocity.x = buildingSpeed * -1;
        }
    };
}
