import { encode as _encode, decode as _decode } from "./dist.esm/index.mjs";

export class MessagePack {
  static encode(obj) {
    return _encode(obj);
  }
  static decode(bin) {
    return _decode(bin);
  }
}
