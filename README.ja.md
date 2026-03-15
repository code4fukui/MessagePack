# MessagePack for ECMA-262/JavaScript/TypeScript

MessagePackは、JSONより小さいサイズのデータ転送フォーマットです。このライブラリは、TypeScriptとJavaScriptのためのMessagePackの包括的な実装で、正確性、互換性、パフォーマンスに焦点を当てています。

## 機能

- 型安全なエンコード/デコード
- 非同期ストリーミングデコード
- 拡張機能のカスタマイズ
- Bigintのサポート
- Denoと Bunの対応

## 使い方

```javascript
import { MessagePack } from "@msgpack/msgpack";

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
const decoded = MessagePack.decode(encoded);
```

## ライセンス

ISC