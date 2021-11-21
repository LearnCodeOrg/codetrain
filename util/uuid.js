import { v4 } from 'uuid';

export function uuid() {
  return v4();
}

export function shortid() {
  return v4().slice(0, 6);
}
