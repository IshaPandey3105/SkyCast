function unhashBack20(hashed) {
  let original = "";
  for (let i = 0; i < hashed.length; i++) {
    const charCode = hashed.charCodeAt(i);
    original += String.fromCharCode(charCode - 20); // subtract, not add
  }
  return original;
}
