import * as jsonpatch from "fast-json-patch";

export function applyPatchInplace(doc, path, patch) {
  if (!path) {
    jsonpatch.applyPatch(doc, patch);
  } else {
    jsonpatch.applyPatch(doc, [
      {
        op: "replace",
        path: path,
        value: jsonpatch.applyPatch(
          jsonpatch.getValueByPointer(doc, path),
          patch,
          false,
          false
        ).newDocument,
      },
    ]);
  }
}

export function getPathProperty(obj, prop) {
  // properties may be dot seperated strings
  const path = prop.split(".");
  const firstProp = path.shift();
  let value = obj[firstProp];
  for (let i = 0; i < path.length; i++) {
    value = value[path[i]];
  }
  return value;
}

export function joinUrl(base, tail) {
  return tail.startsWith("./")
    ? (base.endsWith("/") ? base.slice(0, -1) : base) + tail.slice(1)
    : tail;
}

export function randomUUID() {
  // reference: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
