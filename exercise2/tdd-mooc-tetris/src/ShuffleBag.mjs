export class ShuffleBag {
    constructor(items) {
        this.originalItems = items.slice();
        this.items = [];
        this.refill();
    }

    refill() {
        this.items = this.originalItems.slice();
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }

    next() {
        if (this.items.length === 0) {
            this.refill();
        }
        return this.items.pop();
    }
}
