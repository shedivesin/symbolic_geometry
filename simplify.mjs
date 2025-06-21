function precedence(x) {
  if(typeof x === "number") { return 0; }
  if(Array.isArray(x) && x.length >= 1) {
    switch(x[0]) {
      case "+": return 1;
      case "*": return 2;
      case "^": return 3;
    }
  }
  throw new RangeError("Invalid expression");
}

function by_precedence(a, b) {
  const p = precedence(a);
  const q = precedence(b);
  // order # before + before * before ^
  if(p !== q) { return p - q; }
  // both numbers: small numbers before big numbers
  if(p === 0) { return a - b; }
  // both arrays: lexicographically
  for(let i = 1; i < a.length && i < b.length; i++) {
    const p = by_precedence(a[i], b[i]);
    if(p !== 0) { return p; }
  }
  return a.length - b.length;
}

function simplify(x) {
  const p = precedence(x);
  // numbers can't be simplified further
  if(p === 0) { return x; }

  // recursively simplify
  const d = new Array(x.length - 1);
  for(let i = 0; i < d.length; i++) { d[i] = simplify(x[i + 1]); }

  switch(p) {
    case 1: // +
      // addition is associative
      d.sort(by_precedence);

      // collapse numbers
      while(d.length >= 2 && precedence(d[1]) === 0) {
        const t = d.shift();
        d[0] += t;
      }

      // remove pointless numbers
      if(d.length >= 2 && d[0] === 0) { d.shift(); }

      // FIXME: collapse duplicate terms into *

      break;

    case 2: // *
      // multiplication is associative
      d.sort(by_precedence);

      // collapse numbers
      while(d.length >= 2 && precedence(d[1]) === 0) {
        const t = d.shift();
        d[0] += t;
      }

      // anything multiplied by zero is zero
      if(d[0] === 0) { return 0; }

      // remove pointless numbers
      if(d.length >= 2 && d[0] === 1) { d.shift(); }

      // FIXME: collapse duplicate terms into ^

      break;

    case 3:
      // FIXME: TODO

      break;
  }

  // if we simplified everything away, return what's left
  if(d.length === 1) { return d[0]; }

  // restore structure and return
  d.unshift(x[0]);
  return d;
}

console.log(simplify(["+", ["^", 3, 2, -1], ["*", ["^", 5, -1], 0], ["*", 3, 4], 5, 6]));
