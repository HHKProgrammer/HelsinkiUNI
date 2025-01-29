import "./polyfills";
import express from "express";
import {Temporal} from "@js-temporal/polyfill";

// Refactor the following code to get rid of the legacy Date class.
// Use Temporal.PlainDate instead. See /test/date_conversion.spec.mjs for examples.

function createApp(database) {
  const app = express();

  app.put("/prices", (req, res) => {
    const type = req.query.type;
    const cost = parseInt(req.query.cost);
    database.setBasePrice(type, cost);
    res.json();
  });

  app.get("/prices", (req, res) => {
    const age = req.query.age ? parseInt(req.query.age) : undefined;
    const type = req.query.type;
    const baseCost = database.findBasePriceByType(type).cost;
    const date = parseDate(req.query.date);
    const cost = calculateCost(age, type, date, baseCost);
    res.json({ cost });
  });

  function parseDate(dateString) {
    if (!dateString) return undefined; // input misssing check

    try {
      console.log("Debug: Parsing date from string ->", dateString);//debugging
      const date = Temporal.PlainDate.from(dateString);//this time as const
      console.log("Debug: Parsed date ->", date.toString());
      return date;
    } catch (error) {
      console.error("Error parsing date:", error, "Input:", dateString);//catch error
      return undefined;
    }
  }

  function calculateCost(age, type, date, baseCost) {
    if (type === "night") {
      return calculateCostForNightTicket(age, baseCost);
    } else {
      return calculateCostForDayTicket(age, date, baseCost);
    }
  }

  function calculateCostForNightTicket(age, baseCost) {
    if (age === undefined) {
      return 0;
    }
    if (age < 6) {
      return 0;
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.4);
    }
    return baseCost;
  }

  function calculateCostForDayTicket(age, date, baseCost) {
    console.log("Debug: Base cost before discount:", baseCost);
    if (!date) {
      console.error("Error: Date is undefined in calculateCostForDayTicket");
      return baseCost;
    }

    let reduction = calculateReduction(date);
    console.log("Debug: Reduction applied:", reduction);

    if (age === undefined) {
      return Math.ceil(baseCost * (1 - reduction / 100));
    }
    if (age < 6) {
      return 0;
    }
    if (age < 15) {
      return Math.ceil(baseCost * 0.7);
    }
    if (age > 64) {
      return Math.ceil(baseCost * 0.75 * (1 - reduction / 100));
    }
    return Math.ceil(baseCost * (1 - reduction / 100));
  }



  function calculateReduction(date) {
    console.log("Debug: Checking reduction for date ->", date.toString()); // Debugging
    if (!date) {
      console.log("Debug: Date is undefined, no reduction applied");
      return 0;
    }
    let reduction = 0;
    if (date && isMonday(date) && !isHoliday(date)) {
      reduction = 35;
    }
    console.log("Debug: Reduction applied ->", reduction); // Debugging
    return reduction;
  }

  function isMonday(date) {
    console.log("Debug: Checking if Monday ->", date.toString());//check
    return date.dayOfWeek() === 1;
    //const date = Temporal.PlainDate.from("2021-07-01");
    // console.log(date.dayOfWeek); // 4; Thursday
    //const birthday = new Date('August 19, 1975 23:15:30');
   // const day1 = birthday.getDay();
// Sunday - Saturday : 0 - 6
  }

  function isHoliday(date) {
    const holidays = database.getHolidays();
    if (!Array.isArray(holidays)) {
      console.error("Error: Holidays are not an array", holidays);
      return false;
    }
    for (let row of holidays) {
      try{
      const holiday = Temporal.PlainDate.from(row.holiday);
      if (
          (date && date.equals(holiday))//chnage after mondayfail
      ) {
        return true;
      }
      }
      catch (error) {
        console.error("Error parsing holiday:", row.holiday, error);
      }
    }
    return false;
  }

  return app;
}

export { createApp };
