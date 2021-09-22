import { Parser } from 'acorn';

// compiles code with acorn and returns whether successful
export default function compileCode(code, header) {
  // try parsing code
  try {
    Parser.parse(code);
    return true;
  // alert error if thrown
  } catch (e) {
    alert(`[${header}] ${e}`);
    return false;
  }
}
