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
![ライセンス: ISC](https://img.shields.io/npm/l/@msgpack/msgpack.svg)
](https://github.com/msgpack/msgpack-javascript/blob/main/LICENSE)

JavaScriptおよびTypeScript向けの、包括的で仕様に準拠した高性能な**MessagePack**ライブラリです。幅広いアプリケーションに適した、コンパクトで効率的なバイナリシリアライズフォーマットを提供します。

MessagePackフォーマットについて詳しくは、**[msgpack.org](https://msgpack.org/)** をご覧ください。

## 機能

-   **仕様準拠:** [MessagePack仕様](https://github.com/msgpack/msgpack/blob/master/spec.md)の信頼できるリファレンス実装。
-   **高性能:** JavaScript向けMessagePackライブラリの中で最速クラス。[ベンチマーク](#benchmarks)を参照。
-   **型安全:** TypeScriptで記述されており、優れた開発者体験を提供。
-   **ストリーミングAPI:** ストリームからデータを非同期にデコード可能。大規模なデータセットやネットワークリクエストに最適。
-   **拡張性:** Extension-Typeメカニズムによる[カスタムデータ型](#extension-types)のサポート。
-   **ユニバーサル:** Node.js、Deno、Bun、およびすべてのモダンブラウザで動作。
-   **BigIntサポート:** 64ビット整数をネイティブに処理。

## インストール

```bash
npm install @msgpack/msgpack
```

## クイックスタート

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

// オブジェクトをエンコード
const encoded = encode(object);
// encodedはUint8Arrayになります

// バイト列をデコード
const decoded = decode(encoded);

console.log(decoded);
```

## 使い方

### Node.js / バンドラー

標準のESモジュールインポートを使用します。

```js
import { encode, decode } from "@msgpack/msgpack";

const encoded = encode({ hello: "world" });
const decoded = decode(encoded);
```

### Deno

`npm:` や `unpkg` などのCDNから直接インポートします。

```js
import { encode, decode } from "npm:@msgpack/msgpack@3";

const encoded = encode({ hello: "deno" });
const decoded = decode(encoded);
```

### ブラウザ (CDN)

CDNからUMDバンドルを読み込みます。ライブラリはグローバルな `MessagePack` オブジェクトとして利用できるようになります。

```html
<!-- unpkgから最新バージョンを取得 -->
<script src="https://unpkg.com/@msgpack/msgpack@3"></script>

<script>
  const { encode, decode } = MessagePack;

  const object = { browser: true };
  const encoded = encode(object);
  const decoded = decode(encoded);
  console.log(decoded);
</script>
```

## APIリファレンス

### `encode(data: unknown, options?: EncoderOptions): Uint8Array`

`data` をMessagePackバイナリの `Uint8Array` にエンコードします。

### `decode(buffer: ArrayLike<number> | BufferSource, options?: DecoderOptions): unknown`

単一のMessagePackエンコードされたオブジェクトを含む `buffer` をデコードします。

### `decodeMulti(buffer: ArrayLike<number> | BufferSource, options?: DecoderOptions): Generator<unknown, void, unknown>`

連結された複数のMessagePackオブジェクトを含む `buffer` をデコードし、各オブジェクトをyieldするジェネレータを返します。

### `decodeAsync(stream: ReadableStreamLike, options?: DecoderOptions): Promise<unknown>`

[Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) から単一のMessagePackオブジェクトを非同期にデコードします。

### `decodeArrayStream(stream: ReadableStreamLike, options?: DecoderOptions): AsyncIterable<unknown>`

ストリームからMessagePackエンコードされた配列を非同期にデコードし、配列の各要素をyieldします。これは非常に大きな配列に対してメモリ効率が優れています。

### `decodeMultiStream(stream: ReadableStreamLike, options?: DecoderOptions): AsyncIterable<unknown>`

ストリームから連結された複数のMessagePackオブジェクトを非同期にデコードし、デコードされた各オブジェクトをyieldします。

## 上級者向け使用法

### 拡張型

`ExtensionCodec` を使用すると、MessagePack仕様に含まれないカスタムデータ型をシリアライズできます。たとえば、`Map` オブジェクトを処理できます：

```js
import { encode, decode, ExtensionCodec } from "@msgpack/msgpack";

const MY_MAP_TYPE = 0; // 0から127までの任意の整数

const extensionCodec = new ExtensionCodec();

// エンコーダー: MapをMessagePackの拡張型にパックする
extensionCodec.register({
  type: MY_MAP_TYPE,
  encode: (object) => {
    if (object instanceof Map) {
      // Mapのエントリを標準のMessagePack配列としてパックする
      return encode([...object.entries()]);
    }
    return null;
  },
  decode: (data) => {
    // 配列をアンパックして新しいMapを構築する
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

このライブラリは[Timestamp拡張型](https://github.com/msgpack/msgpack/blob/master/spec.md#timestamp-extension-type)を組み込みでサポートしており、`Date` オブジェクトを自動的に処理します。

## ベンチマーク

このライブラリはパフォーマンスに向けて高度に最適化されており、他の人気のあるJavaScript向けMessagePack実装とベンチマークで比較されています。

ベンチマークを自分で実行するには：

```shell
git clone https://github.com/msgpack/msgpack-javascript.git
cd msgpack-javascript
npm install
npm run test:dist # ライブラリがビルドされていることを確認
cd benchmark
npm install
node benchmark-from-msgpack-lite.js
```

## ライセンス

[ISC License](LICENSE) — Copyright (c) 2024 The MessagePack community.
