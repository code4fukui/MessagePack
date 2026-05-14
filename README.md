# MessagePack for ECMA-262/JavaScript/TypeScript

[
![npm version](https://img.shields.io/npm/v/@msgpack/msgpack.svg)
](https://www.npmjs.com/package/@msgpack/msgpack)
[
![CI](https://github.com/msgpack/msgpack-javascript/actions/workflows/ci.yml/badge.svg)
](https://github.com/msgpack/msgpack-javascript/actions/workflows/ci.yml)
[
![codecov](https://codecov.io/gh/msgpack/msgpack-javascript/graph/badge.svg?token=U5529G459V)
](https://codecov.io/gh/msgpack/msgpack-javascript)
[
![License: ISC](https://img.shields.io/npm/l/@msgpack/msgpack.svg)
](https://github.com/msgpack/msgpack-javascript/blob/main/LICENSE)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A comprehensive, spec-compliant, and performant **MessagePack** library for JavaScript and TypeScript. It provides a compact and efficient binary serialization format suitable for a wide range of applications.

Learn more about the MessagePack format at **[msgpack.org](https://msgpack.org/)**.

## Features

-   **Spec-Compliant:** A reliable reference implementation of the [MessagePack specification](https://github.com/msgpack/msgpack/blob/master/spec.md).
-   **Highly Performant:** One of the fastest MessagePack libraries for JavaScript. See [Benchmarks](#benchmarks).
-   **Type-Safe:** Written in TypeScript for a great developer experience.
-   **Streaming API:** Asynchronously decode data from streams, perfect for large datasets or network requests.
-   **Extensible:** Supports [custom data types](#extension-types) via the Extension-Type mechanism.
-   **Universal:** Works in Node.js, Deno, Bun, and all modern browsers.
-   **BigInt Support:** Natively handles 64-bit integers.

## Installation

```bash
npm install @msgpack/msgpack
```

## Quick Start

```js
import { encode, decode } from "@msgpack/msgpack";

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

// Encode the object
const encoded = encode(object);
// encoded is a Uint8Array

// Decode the bytes
const decoded = decode(encoded);

console.log(decoded);
```

## Usage

### Node.js / Bundlers

Use the standard ES module import.

```js
import { encode, decode } from "@msgpack/msgpack";

const encoded = encode({ hello: "world" });
const decoded = decode(encoded);
```

### Deno

Import directly from a CDN like `npm:` or `unpkg`.

```js
import { encode, decode } from "npm:@msgpack/msgpack@3";

const encoded = encode({ hello: "deno" });
const decoded = decode(encoded);
```

### Browsers (CDN)

Load the UMD bundle from a CDN. The library will be available as a global `MessagePack` object.

```html
<!-- Get the latest version from unpkg -->
<script src="https://unpkg.com/@msgpack/msgpack@3"></script>

<script>
  const { encode, decode } = MessagePack;

  const object = { browser: true };
  const encoded = encode(object);
  const decoded = decode(encoded);
  console.log(decoded);
</script>
```

## API Reference

### `encode(data: unknown, options?: EncoderOptions): Uint8Array`

Encodes `data` into a MessagePack binary `Uint8Array`.

### `decode(buffer: ArrayLike<number> | BufferSource, options?: DecoderOptions): unknown`

Decodes a `buffer` containing a single MessagePack-encoded object.

### `decodeMulti(buffer: ArrayLike<number> | BufferSource, options?: DecoderOptions): Generator<unknown, void, unknown>`

Decodes a `buffer` containing multiple, concatenated MessagePack objects and returns a generator that yields each object.

### `decodeAsync(stream: ReadableStreamLike, options?: DecoderOptions): Promise<unknown>`

Asynchronously decodes a single MessagePack object from a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

### `decodeArrayStream(stream: ReadableStreamLike, options?: DecoderOptions): AsyncIterable<unknown>`

Asynchronously decodes a MessagePack-encoded array from a stream, yielding each item of the array. This is memory-efficient for very large arrays.

### `decodeMultiStream(stream: ReadableStreamLike, options?: DecoderOptions): AsyncIterable<unknown>`

Asynchronously decodes multiple, concatenated MessagePack objects from a stream, yielding each object as it is decoded.

## Advanced Usage

### Extension Types

You can serialize custom data types not covered by the MessagePack specification using `ExtensionCodec`. For example, you can handle `Map` objects:

```js
import { encode, decode, ExtensionCodec } from "@msgpack/msgpack";

const MY_MAP_TYPE = 0; // Any integer between 0 and 127

const extensionCodec = new ExtensionCodec();

// Encoder: Pack a Map into a MessagePack extension type
extensionCodec.register({
  type: MY_MAP_TYPE,
  encode: (object) => {
    if (object instanceof Map) {
      // Pack the Map's entries as a standard MessagePack array
      return encode([...object.entries()]);
    }
    return null;
  },
  decode: (data) => {
    // Unpack the array and construct a new Map
    const entries = decode(data);
    return new Map(entries);
  },
});

const myMap = new Map([["foo", "bar"]]);

const encoded = encode(myMap, { extensionCodec });
const decoded = decode(encoded, { extensionCodec });

console.log(decoded instanceof Map); // true
console.log(decoded.get("foo")); // "bar"
```

This library has built-in support for the [Timestamp extension type](https://github.com/msgpack/msgpack/blob/master/spec.md#timestamp-extension-type), which automatically handles `Date` objects.

## Benchmarks

This library is heavily optimized for performance and is benchmarked against other popular JavaScript MessagePack implementations.

To run the benchmarks yourself:

```shell
git clone https://github.com/msgpack/msgpack-javascript.git
cd msgpack-javascript
npm install
npm run test:dist # ensure the library is built
cd benchmark
npm install
node benchmark-from-msgpack-lite.js
```

## License

[ISC License](LICENSE) — Copyright (c) 2024 The MessagePack community.