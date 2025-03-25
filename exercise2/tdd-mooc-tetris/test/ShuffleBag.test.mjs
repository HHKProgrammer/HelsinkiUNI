import { describe, test, expect } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("ShuffleBag", () => {
    test("contains all items once before reshuffle", () => {
        const bag = new ShuffleBag([1, 2, 3, 4]);
        const drawn = [bag.next(), bag.next(), bag.next(), bag.next()];
        drawn.sort();
        expect(drawn).to.deep.equal([1, 2, 3, 4]);
    });

    test("refills after empty", () => {
        const bag = new ShuffleBag(["A"]);
        bag.next(); // empty now
        expect(bag.next()).to.equal("A");
    });

    test("order changes between refills (most likely)", () => {
        const bag = new ShuffleBag([1, 2, 3]);
        const first = [bag.next(), bag.next(), bag.next()].join("");
        const second = [bag.next(), bag.next(), bag.next()].join("");
        expect(first).to.not.equal(second); // likely to pass unless very unlucky
    });
});
