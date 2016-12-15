(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document? factory(global, true ): factory(global);
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window: this, function(window, noGlobal) {
  "use strict";
  var uv = {};
