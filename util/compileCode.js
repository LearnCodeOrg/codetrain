import { Parser } from 'acorn';

// compiles code with acorn and returns error
export default function compileCode(code) {
  // try parsing code
  try {
    Parser.parse(code);
  // return error if thrown
  } catch (e) {
    return e.toString();
  }
}
