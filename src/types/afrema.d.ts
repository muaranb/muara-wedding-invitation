import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": Record<string, unknown>;
      "a-assets": Record<string, unknown>;
      "a-entity": Record<string, unknown>;
      "a-video": Record<string, unknown>;
      "a-nft": Record<string, unknown>;
    }
  }
}
