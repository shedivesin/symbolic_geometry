function parse(expr) {
}

function simplify(expr) {
}

function stringify2(expr, level) {
  if(typeof expr === "number" || typeof expr === "bigint") {
    return expr.toString();
  }
  if(Array.isArray(expr) && expr.length >= 3 && expr[0] === "+") {
    let string = stringify2(expr[1], 1); 
    for(let i = 2; i < expr.length; i++) {
      string += "+" + stringify2(expr[i], 1);
    }
    if(level > 1) {
      string = "(" + string + ")";
    }
    return string;
  }
  if(Array.isArray(expr) && expr.length >= 3 && expr[0] === "*") {
    let string = stringify2(expr[1], 2);
    for(let i = 2; i < expr.length; i++) {
      string += "*" + stringify2(expr[i], 2);
    }
    if(level > 2) {
      string = "(" + string + ")";
    }
    return string;
  }
  if(Array.isArray(expr) && expr.length === 3 && expr[0] === "^") {
    let string = stringify2(expr[1], 3) + "^" + stringify2(expr[2], 3);
    if(level > 3) {
      string = "(" + string + ")";
    }
    return string;
  }
  throw new RangeError("Invalid expression");
}

function stringify(expr) {
  return stringify2(expr, 0);
}

function evaluate(expr) {
  return stringify(simplify(parse(expr)));
}

export {parse, simplify, stringify, evaluate};
