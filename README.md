# MessagePack for ECMA-262/JavaScript/TypeScript

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This library is an implementation of **MessagePack** for TypeScript and JavaScript, providing a compact and efficient binary serialization format. Learn more about MessagePack at:

https://msgpack.org/

This library serves as a comprehensive reference implementation of MessagePack for JavaScript with a focus on accuracy, compatibility, interoperability, and performance.

## Synopsis

```js
import { MessagePack } from "https://code4fukui.github.io/MessagePack/MessagePack.js";

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
```

## API

### `encode(data: unknown, options?: EncoderOptions): Uint8Array`

It encodes `data` into a single MessagePack-encoded object, and returns a byte array as `Uint8Array`.

### `decode(buffer: ArrayLike<number> | BufferSource, options?: DecoderOptions): unknown`

It decodes `buffer` that includes a MessagePack-encoded object, and returns the decoded object typed `unknown`.

### `decodeMulti(buffer: ArrayLike<number> | BufferSource, options?: DecoderOptions): Generator<unknown, void, unknown>`

It decodes `buffer` that includes multiple MessagePack-encoded objects, and returns decoded objects as a generator.

### `decodeAsync(stream: ReadableStreamLike<ArrayLike<number> | BufferSource>, options?: DecoderOptions): Promise<unknown>`

It decodes a MessagePack-encoded object from a readable stream asynchronously.

### `decodeArrayStream(stream: ReadableStreamLike<ArrayLike<number> | BufferSource>, options?: DecoderOptions): AsyncIterable<unknown>`

It decodes an array of MessagePack-encoded objects from a readable stream asynchronously.

### `decodeMultiStream(stream: ReadableStreamLike<ArrayLike<number> | BufferSource>, options?: DecoderOptions): AsyncIterable<unknown>`

It decodes multiple MessagePack-encoded objects from a readable stream asynchronously.

## Extension Types

This library supports extension types, which can be used to encode and decode custom data types.

## Faster way to decode a large array of floating point numbers

This library provides a way to decode a large array of floating point numbers more efficiently.

## Decoding a Blob

You can decode a `Blob` instance that contains MessagePack-encoded data.

## MessagePack Specification

This library follows the MessagePack specification.

## Prerequisites

This library requires the following environments:

- ECMA-262
- Node.js
- TypeScript Compiler / Type Definitions

## Benchmark

This library has been benchmarked against other MessagePack implementations for JavaScript.

## Distribution

This library is available through the following distribution channels:

- NPM / npmjs.com
- CDN / unpkg.com

## Deno Support

This library can be used in Deno environments.

## Bun Support

This library can be used in Bun environments.

## Maintenance

This library is actively maintained, with the following practices:

- Testing
- Continuous Integration
- Release Engineering
- Updating Dependencies

## License

MIT License — see [LICENSE](LICENSE).