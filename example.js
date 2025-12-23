import { MessagePack } from "./MessagePack.js";

const object = {
  nil: null,
  integer: 1,
  float: Math.PI,
  string: "Hello, world!",
  binary: Uint8Array.from([1, 2, 3]),
  array: [10, 20, 30],
  map: { foo: "bar" },
  timestampExt: new Date(),
};

const encoded = MessagePack.encode(object);
console.log(encoded);

const obj = MessagePack.decode(encoded);
console.log(obj);
