class ScoreTracker {
    constructor() {
        this.points = 0;
    }

    onEvent(event) {
        if (event.type === "lineClear") {
            const table = { 1: 100, 2: 300, 3: 500, 4: 800 };
            this.points += table[event.count] || 0;
        }
    }
}
