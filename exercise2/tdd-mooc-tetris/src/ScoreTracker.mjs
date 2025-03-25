class ScoreTracker {
    constructor() {
        this.points = 0;
    }


    onEvent(event) {
        if (event.type === "lineClear") {
            this.points += 100 * event.count;
        }
    }
}
