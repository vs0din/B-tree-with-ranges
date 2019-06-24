class Range {
  
  constructor() {
    this.ranges = [];
  }

  paramVerify(range) {
    if (!Array.isArray(range)) {
      console.error("Wrong input. Should be Array");
      return;
    }
    if (range.length != 2) {
      console.error("Wrong input. Should be 2 items");
      return;
    }
    return true
  }

  add(range) {
    // verify
    if (!this.paramVerify(range)) {
      return;
    }

    // blank Array
    if (this.ranges.length === 0) {
      this.ranges.push(range);
    }

    // add action
    let counter = 0;
    let i = 0;
    while (i < this.ranges.length) {
      const rangeCur = this.ranges[i];

      if (rangeCur[1] >= range[1]) {
        // left
        if (rangeCur[0] > range[1]) {
          this.ranges.splice(i - counter, counter, range);
        } else if (rangeCur[1] === range[1]) {
          counter++;
          range[0] = rangeCur[0];
          this.ranges.splice(i - counter + 1, counter, range);
        }
        return false;
      } else {
        // right or right cross
        if (rangeCur[1] >= range[0] - 1) {
          range[0] = range[0] < rangeCur[0] ? range[0] : rangeCur[0];
          counter++;
        }
        i++;
      }
    }
    this.ranges.splice(this.ranges.length - counter, counter, range);
  }

  remove(range) {
    // verify
    if (!this.paramVerify(range) || !this.ranges.length) {
      return;
    }

    // remove action/
    let i = 0;
    while (i < this.ranges.length) {
      const curRange = this.ranges[i];
      
      if (curRange[1] < range[0]) {
        i++;
        continue;
      }

      if (curRange[1] < range[1]) {
        if (curRange[0] < range[0]) {
          this.ranges.splice(i, 1, [curRange[0], range[0]-1]);
        } else {
          this.ranges.splice(i, 1);
        }
      } else {
        if (curRange[0] >= range[0]) {
          if (range[0] === curRange[0] && range[0] === range[1]) {
            this.ranges.splice(i, 1, [curRange[0] + 1, curRange[1]])
          } else {
            this.ranges.splice(i, 1, [range[1] + 1, curRange[1]]);
          }
          return;
        } else {
          //contain
          this.ranges.splice(i, 1, [curRange[0], range[0] - 1], [range[1] + 1, curRange[1]]);
          return;
        }
      }
    }
  }

  print() {
    let printStr = "";
    let num = 0;
    while (num < this.ranges.length) {
      printStr += `[${this.ranges[num][0]}, ${this.ranges[num][1]}] `;
      num++;
    }
     return console.log("print:", printStr);;
  }
}

const example = () => {
  const r = new Range();

  r.add([1, 4]);
  r.print();
  // Should display: [1, 4]
  r.add([10, 20]);
  r.print();
  // Should display: [1, 4] [10, 20]
  r.add([10, 10]);
  r.print();
  // Should display: [1, 4] [10, 20]
  r.add([21, 21]);
  r.print();
  // Should display: [1, 4] [10, 21]
  r.add([2, 4]);
  r.print();
  // Should display: [1, 4] [10, 21]
  r.add([3, 8]);
  r.print();
  // Should display: [1, 8] [10, 21]
  r.remove([10, 10]);
  r.print();
  // Should display: [1, 8] [11, 21]
  r.remove([10, 11]);
  r.print();
  // Should display: [1, 8] [12, 21]
  r.remove([15, 17]);
  r.print();
  // Should display: [1, 8] [12, 14] [18, 21]
  r.remove([3, 19]);
  r.print();
  // Should display: [1, 2] [20, 21]
}

example();
