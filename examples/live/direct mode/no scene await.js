(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __pow = Math.pow;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ../phaser-genesis/src/config/ConfigStore.ts
  var ConfigStore = new Map();

  // ../phaser-genesis/src/colormatrix/consts.ts
  var DEFAULT_COLOR_MATRIX = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  var DEFAULT_COLOR_OFFSET = new Float32Array(4);

  // ../phaser-genesis/node_modules/bitecs/dist/index.es.js
  var TYPES_ENUM = {
    i8: "i8",
    ui8: "ui8",
    ui8c: "ui8c",
    i16: "i16",
    ui16: "ui16",
    i32: "i32",
    ui32: "ui32",
    f32: "f32",
    f64: "f64"
  };
  var TYPES_NAMES = {
    i8: "Int8",
    ui8: "Uint8",
    ui8c: "Uint8Clamped",
    i16: "Int16",
    ui16: "Uint16",
    i32: "Int32",
    ui32: "Uint32",
    f32: "Float32",
    f64: "Float64"
  };
  var TYPES = {
    i8: Int8Array,
    ui8: Uint8Array,
    ui8c: Uint8ClampedArray,
    i16: Int16Array,
    ui16: Uint16Array,
    i32: Int32Array,
    ui32: Uint32Array,
    f32: Float32Array,
    f64: Float64Array
  };
  var UNSIGNED_MAX = {
    uint8: __pow(2, 8),
    uint16: __pow(2, 16),
    uint32: __pow(2, 32)
  };
  var $storeRef = Symbol("storeRef");
  var $storeSize = Symbol("storeSize");
  var $storeMaps = Symbol("storeMaps");
  var $storeFlattened = Symbol("storeFlattened");
  var $storeBase = Symbol("storeBase");
  var $storeType = Symbol("storeType");
  var $storeArrayCounts = Symbol("storeArrayCount");
  var $storeSubarrays = Symbol("storeSubarrays");
  var $storeCursor = Symbol("storeCursor");
  var $subarrayCursors = Symbol("subarrayCursors");
  var $subarray = Symbol("subarray");
  var $subarrayFrom = Symbol("subarrayFrom");
  var $subarrayTo = Symbol("subarrayTo");
  var $parentArray = Symbol("subStore");
  var $tagStore = Symbol("tagStore");
  var $queryShadow = Symbol("queryShadow");
  var $serializeShadow = Symbol("serializeShadow");
  var $indexType = Symbol("indexType");
  var $indexBytes = Symbol("indexBytes");
  var stores = {};
  var resize = (ta, size) => {
    const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
    const newTa = new ta.constructor(newBuffer);
    newTa.set(ta, 0);
    return newTa;
  };
  var createShadow = (store, key) => {
    if (!ArrayBuffer.isView(store)) {
      const shadow = store[$parentArray].slice(0).fill(0);
      for (const k in store[key]) {
        const from = store[key][k][$subarrayFrom];
        const to = store[key][k][$subarrayTo];
        store[key][k] = shadow.subarray(from, to);
      }
    } else {
      store[key] = store.slice(0).fill(0);
    }
  };
  var resizeSubarray = (metadata, store, size) => {
    const cursors = metadata[$subarrayCursors];
    const type = store[$storeType];
    const length = store[0].length;
    const indexType = length <= UNSIGNED_MAX.uint8 ? "ui8" : length <= UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    const arrayCount = metadata[$storeArrayCounts][type];
    const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
    const array = new TYPES[type](summedLength * size);
    array.set(metadata[$storeSubarrays][type]);
    metadata[$storeSubarrays][type] = array;
    createShadow(metadata[$storeSubarrays][type], $queryShadow);
    createShadow(metadata[$storeSubarrays][type], $serializeShadow);
    array[$indexType] = TYPES_NAMES[indexType];
    array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    const start = cursors[type];
    let end = 0;
    for (let eid = 0; eid < size; eid++) {
      const from = cursors[type] + eid * length;
      const to = from + length;
      store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
      store[eid][$subarrayFrom] = from;
      store[eid][$subarrayTo] = to;
      store[eid][$queryShadow] = metadata[$storeSubarrays][type][$queryShadow].subarray(from, to);
      store[eid][$serializeShadow] = metadata[$storeSubarrays][type][$serializeShadow].subarray(from, to);
      store[eid][$subarray] = true;
      store[eid][$indexType] = array[$indexType];
      store[eid][$indexBytes] = array[$indexBytes];
      end = to;
    }
    cursors[type] = end;
    store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
  };
  var resizeRecursive = (metadata, store, size) => {
    Object.keys(store).forEach((key) => {
      const ta = store[key];
      if (Array.isArray(ta)) {
        resizeSubarray(metadata, ta, size);
        store[$storeFlattened].push(ta);
      } else if (ArrayBuffer.isView(ta)) {
        store[key] = resize(ta, size);
        store[$storeFlattened].push(store[key]);
        store[key][$queryShadow] = resize(ta[$queryShadow], size);
        store[key][$serializeShadow] = resize(ta[$serializeShadow], size);
      } else if (typeof ta === "object") {
        resizeRecursive(metadata, store[key], size);
      }
    });
  };
  var resizeStore = (store, size) => {
    if (store[$tagStore])
      return;
    store[$storeSize] = size;
    store[$storeFlattened].length = 0;
    Object.keys(store[$subarrayCursors]).forEach((k) => {
      store[$subarrayCursors][k] = 0;
    });
    resizeRecursive(store, store, size);
  };
  var createTypeStore = (type, length) => {
    const totalBytes = length * TYPES[type].BYTES_PER_ELEMENT;
    const buffer4 = new ArrayBuffer(totalBytes);
    return new TYPES[type](buffer4);
  };
  var createArrayStore = (metadata, type, length) => {
    const size = metadata[$storeSize];
    const store = Array(size).fill(0);
    store[$storeType] = type;
    const cursors = metadata[$subarrayCursors];
    const indexType = length < UNSIGNED_MAX.uint8 ? "ui8" : length < UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    if (!length)
      throw new Error("\u274C Must define a length for component array.");
    if (!TYPES[type])
      throw new Error(`\u274C Invalid component array property type ${type}.`);
    if (!metadata[$storeSubarrays][type]) {
      const arrayCount = metadata[$storeArrayCounts][type];
      const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
      const array = new TYPES[type](summedLength * size);
      metadata[$storeSubarrays][type] = array;
      createShadow(metadata[$storeSubarrays][type], $queryShadow);
      createShadow(metadata[$storeSubarrays][type], $serializeShadow);
      array[$indexType] = TYPES_NAMES[indexType];
      array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    }
    const start = cursors[type];
    let end = 0;
    for (let eid = 0; eid < size; eid++) {
      const from = cursors[type] + eid * length;
      const to = from + length;
      store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
      store[eid][$subarrayFrom] = from;
      store[eid][$subarrayTo] = to;
      store[eid][$queryShadow] = metadata[$storeSubarrays][type][$queryShadow].subarray(from, to);
      store[eid][$serializeShadow] = metadata[$storeSubarrays][type][$serializeShadow].subarray(from, to);
      store[eid][$subarray] = true;
      store[eid][$indexType] = TYPES_NAMES[indexType];
      store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
      end = to;
    }
    cursors[type] = end;
    store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
    return store;
  };
  var isArrayType = (x) => Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "number";
  var createStore = (schema, size) => {
    const $store = Symbol("store");
    if (!schema || !Object.keys(schema).length) {
      stores[$store] = {
        [$storeSize]: size,
        [$tagStore]: true,
        [$storeBase]: () => stores[$store]
      };
      return stores[$store];
    }
    schema = JSON.parse(JSON.stringify(schema));
    const arrayCounts = {};
    const collectArrayCounts = (s) => {
      const keys = Object.keys(s);
      for (const k of keys) {
        if (isArrayType(s[k])) {
          if (!arrayCounts[s[k][0]])
            arrayCounts[s[k][0]] = 0;
          arrayCounts[s[k][0]]++;
        } else if (s[k] instanceof Object) {
          collectArrayCounts(s[k]);
        }
      }
    };
    collectArrayCounts(schema);
    const metadata = {
      [$storeSize]: size,
      [$storeMaps]: {},
      [$storeSubarrays]: {},
      [$storeRef]: $store,
      [$storeCursor]: 0,
      [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => __spreadProps(__spreadValues({}, a), {
        [type]: 0
      }), {}),
      [$storeFlattened]: [],
      [$storeArrayCounts]: arrayCounts
    };
    if (schema instanceof Object && Object.keys(schema).length) {
      const recursiveTransform = (a, k) => {
        if (typeof a[k] === "string") {
          a[k] = createTypeStore(a[k], size);
          createShadow(a[k], $queryShadow);
          createShadow(a[k], $serializeShadow);
          a[k][$storeBase] = () => stores[$store];
          metadata[$storeFlattened].push(a[k]);
        } else if (isArrayType(a[k])) {
          const [type, length] = a[k];
          a[k] = createArrayStore(metadata, type, length);
          a[k][$storeBase] = () => stores[$store];
          metadata[$storeFlattened].push(a[k]);
        } else if (a[k] instanceof Object) {
          a[k] = Object.keys(a[k]).reduce(recursiveTransform, a[k]);
        }
        return a;
      };
      stores[$store] = Object.assign(Object.keys(schema).reduce(recursiveTransform, schema), metadata);
      stores[$store][$storeBase] = () => stores[$store];
      return stores[$store];
    }
  };
  var SparseSet = () => {
    const dense = [];
    const sparse = [];
    const has = (val) => dense[sparse[val]] === val;
    const add = (val) => {
      if (has(val))
        return;
      sparse[val] = dense.push(val) - 1;
    };
    const remove = (val) => {
      if (!has(val))
        return;
      const index = sparse[val];
      const swapped = dense.pop();
      if (swapped !== val) {
        dense[index] = swapped;
        sparse[swapped] = index;
      }
    };
    return {
      add,
      remove,
      has,
      sparse,
      dense
    };
  };
  var newEntities = new Map();
  var $entityMasks = Symbol("entityMasks");
  var $entitySparseSet = Symbol("entitySparseSet");
  var $entityArray = Symbol("entityArray");
  var defaultSize = 1e5;
  var globalEntityCursor = 0;
  var globalSize = defaultSize;
  var threshold = globalSize - globalSize / 5;
  var getGlobalSize = () => globalSize;
  var removed = [];
  var getDefaultSize = () => defaultSize;
  var getEntityCursor = () => globalEntityCursor;
  var eidToWorld = new Map();
  var removeEntity = (world2, eid) => {
    if (!world2[$entitySparseSet].has(eid))
      return;
    world2[$queries].forEach((q) => {
      queryRemoveEntity(world2, q, eid);
    });
    removed.push(eid);
    world2[$entitySparseSet].remove(eid);
    for (let i = 0; i < world2[$entityMasks].length; i++)
      world2[$entityMasks][i][eid] = 0;
  };
  function Changed(c) {
    return function QueryChanged() {
      return c;
    };
  }
  var $queries = Symbol("queries");
  var $notQueries = Symbol("notQueries");
  var $queryMap = Symbol("queryMap");
  var $dirtyQueries = Symbol("$dirtyQueries");
  var $queryComponents = Symbol("queryComponents");
  var registerQuery = (world2, query) => {
    const components2 = [];
    const notComponents = [];
    const changedComponents = [];
    query[$queryComponents].forEach((c) => {
      if (typeof c === "function") {
        const comp = c();
        if (!world2[$componentMap].has(comp))
          registerComponent(world2, comp);
        if (c.name === "QueryNot") {
          notComponents.push(comp);
        }
        if (c.name === "QueryChanged") {
          changedComponents.push(comp);
          components2.push(comp);
        }
      } else {
        if (!world2[$componentMap].has(c))
          registerComponent(world2, c);
        components2.push(c);
      }
    });
    const mapComponents = (c) => world2[$componentMap].get(c);
    const allComponents = components2.concat(notComponents).map(mapComponents);
    const sparseSet = SparseSet();
    const archetypes = [];
    const changed = [];
    const toRemove = [];
    const entered = [];
    const exited = [];
    const generations = allComponents.map((c) => c.generationId).reduce((a, v) => {
      if (a.includes(v))
        return a;
      a.push(v);
      return a;
    }, []);
    const reduceBitflags = (a, c) => {
      if (!a[c.generationId])
        a[c.generationId] = 0;
      a[c.generationId] |= c.bitflag;
      return a;
    };
    const masks = components2.map(mapComponents).reduce(reduceBitflags, {});
    const notMasks = notComponents.map(mapComponents).reduce((a, c) => {
      if (!a[c.generationId]) {
        a[c.generationId] = 0;
      }
      a[c.generationId] |= c.bitflag;
      return a;
    }, {});
    const hasMasks = allComponents.reduce(reduceBitflags, {});
    const flatProps = components2.filter((c) => !c[$tagStore]).map((c) => Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [c]).reduce((a, v) => a.concat(v), []);
    const shadows = flatProps.map((prop) => {
      const $ = Symbol();
      createShadow(prop, $);
      return prop[$];
    }, []);
    const q = Object.assign(sparseSet, {
      archetypes,
      changed,
      components: components2,
      notComponents,
      changedComponents,
      masks,
      notMasks,
      hasMasks,
      generations,
      flatProps,
      toRemove,
      entered,
      exited,
      shadows
    });
    world2[$queryMap].set(query, q);
    world2[$queries].add(q);
    components2.map(mapComponents).forEach((c) => {
      c.queries.add(q);
    });
    notComponents.map(mapComponents).forEach((c) => {
      c.notQueries.add(q);
    });
    if (notComponents.length)
      world2[$notQueries].add(q);
    for (let eid = 0; eid < getEntityCursor(); eid++) {
      if (!world2[$entitySparseSet].has(eid))
        continue;
      if (queryCheckEntity(world2, q, eid)) {
        queryAddEntity(q, eid);
      }
    }
  };
  var diff = (q, clearDiff) => {
    if (clearDiff)
      q.changed.length = 0;
    const {
      flatProps,
      shadows
    } = q;
    for (let i = 0; i < q.dense.length; i++) {
      const eid = q.dense[i];
      let dirty = false;
      for (let pid = 0; pid < flatProps.length; pid++) {
        const prop = flatProps[pid];
        const shadow = shadows[pid];
        if (ArrayBuffer.isView(prop[eid])) {
          for (let i2 = 0; i2 < prop[eid].length; i2++) {
            if (prop[eid][i2] !== prop[eid][$queryShadow][i2]) {
              dirty = true;
              prop[eid][$queryShadow][i2] = prop[eid][i2];
            }
          }
        } else {
          if (prop[eid] !== shadow[eid]) {
            dirty = true;
            shadow[eid] = prop[eid];
          }
        }
      }
      if (dirty)
        q.changed.push(eid);
    }
    return q.changed;
  };
  var defineQuery = (components2) => {
    if (components2 === void 0 || components2[$componentMap] !== void 0) {
      return (world2) => world2 ? world2[$entityArray] : components2[$entityArray];
    }
    const query = function(world2, clearDiff = true) {
      if (!world2[$queryMap].has(query))
        registerQuery(world2, query);
      const q = world2[$queryMap].get(query);
      queryCommitRemovals(q);
      if (q.changedComponents.length)
        return diff(q, clearDiff);
      return q.dense;
    };
    query[$queryComponents] = components2;
    return query;
  };
  var queryCheckEntity = (world2, q, eid) => {
    const {
      masks,
      notMasks,
      generations
    } = q;
    for (let i = 0; i < generations.length; i++) {
      const generationId = generations[i];
      const qMask = masks[generationId];
      const qNotMask = notMasks[generationId];
      const eMask = world2[$entityMasks][generationId][eid];
      if (qNotMask && (eMask & qNotMask) !== 0) {
        return false;
      }
      if (qMask && (eMask & qMask) !== qMask) {
        return false;
      }
    }
    return true;
  };
  var queryAddEntity = (q, eid) => {
    if (q.has(eid))
      return;
    q.add(eid);
    q.entered.push(eid);
  };
  var queryCommitRemovals = (q) => {
    while (q.toRemove.length) {
      q.remove(q.toRemove.pop());
    }
  };
  var commitRemovals = (world2) => {
    world2[$dirtyQueries].forEach(queryCommitRemovals);
    world2[$dirtyQueries].clear();
  };
  var queryRemoveEntity = (world2, q, eid) => {
    if (!q.has(eid))
      return;
    q.toRemove.push(eid);
    world2[$dirtyQueries].add(q);
    q.exited.push(eid);
  };
  var $componentMap = Symbol("componentMap");
  var components = [];
  var defineComponent = (schema) => {
    const component = createStore(schema, getDefaultSize());
    if (schema && Object.keys(schema).length)
      components.push(component);
    return component;
  };
  var incrementBitflag = (world2) => {
    world2[$bitflag] *= 2;
    if (world2[$bitflag] >= __pow(2, 32)) {
      world2[$bitflag] = 1;
      world2[$entityMasks].push(new Uint32Array(world2[$size]));
    }
  };
  var registerComponent = (world2, component) => {
    if (!component)
      throw new Error(`\u{1F47E} bitECS - cannot register component as it is null or undefined.`);
    const queries = new Set();
    const notQueries = new Set();
    world2[$queries].forEach((q) => {
      if (q.components.includes(component)) {
        queries.add(q);
      } else if (q.notComponents.includes(component)) {
        notQueries.add(q);
      }
    });
    world2[$componentMap].set(component, {
      generationId: world2[$entityMasks].length - 1,
      bitflag: world2[$bitflag],
      store: component,
      queries,
      notQueries
    });
    if (component[$storeSize] < world2[$size]) {
      resizeStore(component, world2[$size]);
    }
    incrementBitflag(world2);
  };
  var $size = Symbol("size");
  var $resizeThreshold = Symbol("resizeThreshold");
  var $bitflag = Symbol("bitflag");
  var $archetypes = Symbol("archetypes");
  var $localEntities = Symbol("localEntities");
  var worlds = [];
  var createWorld = () => {
    const world2 = {};
    resetWorld(world2);
    worlds.push(world2);
    return world2;
  };
  var resetWorld = (world2) => {
    const size = getGlobalSize();
    world2[$size] = size;
    if (world2[$entityArray])
      world2[$entityArray].forEach((eid) => removeEntity(world2, eid));
    world2[$entityMasks] = [new Uint32Array(size)];
    world2[$archetypes] = [];
    world2[$entitySparseSet] = SparseSet();
    world2[$entityArray] = world2[$entitySparseSet].dense;
    world2[$bitflag] = 1;
    world2[$componentMap] = new Map();
    world2[$queryMap] = new Map();
    world2[$queries] = new Set();
    world2[$notQueries] = new Set();
    world2[$dirtyQueries] = new Set();
    world2[$localEntities] = new Map();
    return world2;
  };
  var defineSystem = (fn1, fn2) => {
    const update = fn2 !== void 0 ? fn2 : fn1;
    const create = fn2 !== void 0 ? fn1 : void 0;
    const init = new Set();
    const system = (world2, ...args) => {
      if (create && !init.has(world2)) {
        create(world2, ...args);
        init.add(world2);
      }
      update(world2, ...args);
      commitRemovals(world2);
      return world2;
    };
    Object.defineProperty(system, "name", {
      value: (update.name || "AnonymousSystem") + "_internal",
      configurable: true
    });
    return system;
  };
  var Types = TYPES_ENUM;

  // ../phaser-genesis/src/components/color/ColorComponent.ts
  var Color = defineComponent({
    r: Types.ui8c,
    g: Types.ui8c,
    b: Types.ui8c,
    a: Types.f32,
    colorMatrix: [Types.f32, 16],
    colorOffset: [Types.f32, 4]
  });
  var ColorComponent = Color;

  // ../phaser-genesis/src/GameObjectWorld.ts
  var world = createWorld();

  // ../phaser-genesis/src/components/vertices/QuadVertexComponent.ts
  var QuadVertex = defineComponent({
    values: [Types.f32, 54]
  });
  var QuadVertexComponent = QuadVertex;

  // ../phaser-genesis/src/components/vertices/SetQuadPosition.ts
  function SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3) {
    const data = QuadVertexComponent.values[id];
    data[0] = x0;
    data[1] = y0;
    data[9] = x1;
    data[10] = y1;
    data[18] = x2;
    data[19] = y2;
    data[27] = x0;
    data[28] = y0;
    data[36] = x2;
    data[37] = y2;
    data[45] = x3;
    data[46] = y3;
  }

  // ../phaser-genesis/src/components/bounds/BoundsComponent.ts
  var Bounds = defineComponent({
    local: [Types.f32, 4],
    global: [Types.f32, 4],
    world: [Types.f32, 4]
  });
  var BoundsComponent = Bounds;

  // ../phaser-genesis/src/components/transform/Extent2DComponent.ts
  var Extent2D = defineComponent({
    x: Types.f32,
    y: Types.f32,
    width: Types.f32,
    height: Types.f32,
    right: Types.f32,
    bottom: Types.f32
  });
  var Extent2DComponent = Extent2D;

  // ../phaser-genesis/src/components/transform/WorldMatrix2DComponent.ts
  var WorldMatrix2D = defineComponent({
    a: Types.f32,
    b: Types.f32,
    c: Types.f32,
    d: Types.f32,
    tx: Types.f32,
    ty: Types.f32
  });
  var WorldMatrix2DComponent = WorldMatrix2D;

  // ../phaser-genesis/src/components/vertices/UpdateVertexPositionSystem.ts
  var entities;
  var updateVertexPositionSystem = defineSystem((world2) => {
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      const a = WorldMatrix2DComponent.a[id];
      const b = WorldMatrix2DComponent.b[id];
      const c = WorldMatrix2DComponent.c[id];
      const d = WorldMatrix2DComponent.d[id];
      const tx = WorldMatrix2DComponent.tx[id];
      const ty = WorldMatrix2DComponent.ty[id];
      const x = Extent2DComponent.x[id];
      const y = Extent2DComponent.y[id];
      const right = Extent2DComponent.right[id];
      const bottom = Extent2DComponent.bottom[id];
      const x0 = x * a + y * c + tx;
      const y0 = x * b + y * d + ty;
      const x1 = x * a + bottom * c + tx;
      const y1 = x * b + bottom * d + ty;
      const x2 = right * a + bottom * c + tx;
      const y2 = right * b + bottom * d + ty;
      const x3 = right * a + y * c + tx;
      const y3 = right * b + y * d + ty;
      SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
      const bx = Math.min(x0, x1, x2, x3);
      const by = Math.min(y0, y1, y2, y3);
      const br = Math.max(x0, x1, x2, x3);
      const bb = Math.max(y0, y1, y2, y3);
      const bounds = BoundsComponent.global[id];
      bounds[0] = bx;
      bounds[1] = by;
      bounds[2] = br;
      bounds[3] = bb;
    }
    return world2;
  });

  // ../phaser-genesis/src/components/vertices/SetQuadColor.ts
  function SetQuadColor(id, red, green, blue, alpha) {
    const data = QuadVertexComponent.values[id];
    data[5] = red;
    data[6] = green;
    data[7] = blue;
    data[8] = alpha;
    data[14] = red;
    data[15] = green;
    data[16] = blue;
    data[17] = alpha;
    data[23] = red;
    data[24] = green;
    data[25] = blue;
    data[26] = alpha;
    data[32] = red;
    data[33] = green;
    data[34] = blue;
    data[35] = alpha;
    data[41] = red;
    data[42] = green;
    data[43] = blue;
    data[44] = alpha;
    data[50] = red;
    data[51] = green;
    data[52] = blue;
    data[53] = alpha;
  }

  // ../phaser-genesis/src/components/color/PackQuadColorsSystem.ts
  var changedColorQuery = defineQuery([Changed(ColorComponent), QuadVertexComponent]);
  var packQuadColorsSystem = defineSystem((world2) => {
    const entities3 = changedColorQuery(world2);
    for (let i = 0; i < entities3.length; i++) {
      const id = entities3[i];
      const r = ColorComponent.r[id] / 255;
      const g = ColorComponent.g[id] / 255;
      const b = ColorComponent.b[id] / 255;
      const a = ColorComponent.a[id];
      SetQuadColor(id, r, g, b, a);
    }
    return world2;
  });

  // ../phaser-genesis/src/components/dirty/DirtyComponent.ts
  var Dirty = defineComponent({
    child: Types.ui8,
    childCache: Types.ui8,
    displayList: Types.ui8,
    transform: Types.ui8
  });
  var DirtyComponent = Dirty;

  // ../phaser-genesis/src/components/dirty/SetDirtyChildCache.ts
  function SetDirtyChildCache(id) {
    DirtyComponent.childCache[id] = 1;
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyDisplayList.ts
  function SetDirtyDisplayList(id) {
    DirtyComponent.displayList[id] = 1;
  }

  // ../phaser-genesis/src/components/hierarchy/HierarchyComponent.ts
  var Hierarchy = defineComponent({
    worldID: Types.ui32,
    parentID: Types.ui32,
    numChildren: Types.ui32,
    depth: Types.ui32,
    index: Types.ui32,
    worldDepth: Types.ui16
  });
  var HierarchyComponent = Hierarchy;

  // ../phaser-genesis/src/gameobjects/GameObjectCache.ts
  var GameObjectCache = new Map();

  // ../phaser-genesis/src/components/permissions/PermissionsComponent.ts
  var Permissions = defineComponent({
    visible: Types.ui8,
    visibleChildren: Types.ui8,
    willUpdate: Types.ui8,
    willUpdateChildren: Types.ui8,
    willRender: Types.ui8,
    willRenderChildren: Types.ui8,
    willCacheChildren: Types.ui8,
    willTransformChildren: Types.ui8,
    willColorChildren: Types.ui8
  });
  var PermissionsComponent = Permissions;

  // ../phaser-genesis/src/components/permissions/WillCacheChildren.ts
  function WillCacheChildren(id) {
    return Boolean(PermissionsComponent.willCacheChildren[id]);
  }

  // ../phaser-genesis/src/components/transform/LocalMatrix2DComponent.ts
  var LocalMatrix2D = defineComponent({
    a: Types.f32,
    b: Types.f32,
    c: Types.f32,
    d: Types.f32,
    tx: Types.f32,
    ty: Types.f32,
    dirty: Types.ui32
  });
  var LocalMatrix2DComponent = LocalMatrix2D;

  // ../phaser-genesis/src/components/transform/Transform2DComponent.ts
  var Transform2D = defineComponent({
    x: Types.f32,
    y: Types.f32,
    rotation: Types.f32,
    scaleX: Types.f32,
    scaleY: Types.f32,
    skewX: Types.f32,
    skewY: Types.f32,
    originX: Types.f32,
    originY: Types.f32
  });
  var Transform2DComponent = Transform2D;

  // ../phaser-genesis/src/gameobjects/DIRTY_CONST.ts
  var DIRTY_CONST = {
    CLEAR: 0,
    TRANSFORM: 1,
    UPDATE: 2,
    CHILD_CACHE: 4,
    POST_RENDER: 8,
    COLORS: 16,
    BOUNDS: 32,
    TEXTURE: 64,
    FRAME: 128,
    ALPHA: 256,
    CHILD: 512,
    DEFAULT: 1 + 2 + 16 + 32,
    USER1: 536870912,
    USER2: 1073741824,
    USER3: 2147483648,
    USER4: 4294967296
  };

  // ../phaser-genesis/src/components/transform/UpdateLocalTransform2DSystem.ts
  var entities2;
  var updateLocalTransformSystem = defineSystem((world2) => {
    let prevParent = 0;
    for (let i = 0; i < entities2.length; i++) {
      const id = entities2[i];
      const x = Transform2DComponent.x[id];
      const y = Transform2DComponent.y[id];
      const rotation = Transform2DComponent.rotation[id];
      const scaleX = Transform2DComponent.scaleX[id];
      const scaleY = Transform2DComponent.scaleY[id];
      const skewX = Transform2DComponent.skewX[id];
      const skewY = Transform2DComponent.skewY[id];
      LocalMatrix2DComponent.a[id] = Math.cos(rotation + skewY) * scaleX;
      LocalMatrix2DComponent.b[id] = Math.sin(rotation + skewY) * scaleX;
      LocalMatrix2DComponent.c[id] = -Math.sin(rotation - skewX) * scaleY;
      LocalMatrix2DComponent.d[id] = Math.cos(rotation - skewX) * scaleY;
      LocalMatrix2DComponent.tx[id] = x;
      LocalMatrix2DComponent.ty[id] = y;
      SetDirtyTransform(id);
      if (GetParentID(id) !== prevParent) {
        SetDirtyParents(id);
        prevParent = GetParentID(id);
      }
    }
    return world2;
  });

  // ../phaser-genesis/src/components/transform/CopyLocalToWorld.ts
  function CopyLocalToWorld(source, target) {
    WorldMatrix2DComponent.a[target] = LocalMatrix2DComponent.a[source];
    WorldMatrix2DComponent.b[target] = LocalMatrix2DComponent.b[source];
    WorldMatrix2DComponent.c[target] = LocalMatrix2DComponent.c[source];
    WorldMatrix2DComponent.d[target] = LocalMatrix2DComponent.d[source];
    WorldMatrix2DComponent.tx[target] = LocalMatrix2DComponent.tx[source];
    WorldMatrix2DComponent.ty[target] = LocalMatrix2DComponent.ty[source];
  }

  // ../phaser-genesis/src/components/transform/CopyWorldToWorld.ts
  function CopyWorldToWorld(source, target) {
    WorldMatrix2DComponent.a[target] = WorldMatrix2DComponent.a[source];
    WorldMatrix2DComponent.b[target] = WorldMatrix2DComponent.b[source];
    WorldMatrix2DComponent.c[target] = WorldMatrix2DComponent.c[source];
    WorldMatrix2DComponent.d[target] = WorldMatrix2DComponent.d[source];
    WorldMatrix2DComponent.tx[target] = WorldMatrix2DComponent.tx[source];
    WorldMatrix2DComponent.ty[target] = WorldMatrix2DComponent.ty[source];
  }

  // ../phaser-genesis/src/components/transform/MultiplyLocalWithWorld.ts
  function MultiplyLocalWithWorld(parentID, id) {
    const pa = WorldMatrix2DComponent.a[parentID];
    const pb = WorldMatrix2DComponent.b[parentID];
    const pc = WorldMatrix2DComponent.c[parentID];
    const pd = WorldMatrix2DComponent.d[parentID];
    const ptx = WorldMatrix2DComponent.tx[parentID];
    const pty = WorldMatrix2DComponent.ty[parentID];
    const a = LocalMatrix2DComponent.a[id];
    const b = LocalMatrix2DComponent.b[id];
    const c = LocalMatrix2DComponent.c[id];
    const d = LocalMatrix2DComponent.d[id];
    const tx = LocalMatrix2DComponent.tx[id];
    const ty = LocalMatrix2DComponent.ty[id];
    WorldMatrix2DComponent.a[id] = a * pa + b * pc;
    WorldMatrix2DComponent.b[id] = a * pb + b * pd;
    WorldMatrix2DComponent.c[id] = c * pa + d * pc;
    WorldMatrix2DComponent.d[id] = c * pb + d * pd;
    WorldMatrix2DComponent.tx[id] = tx * pa + ty * pc + ptx;
    WorldMatrix2DComponent.ty[id] = tx * pb + ty * pd + pty;
  }

  // ../phaser-genesis/src/components/permissions/WillTransformChildren.ts
  function WillTransformChildren(id) {
    return Boolean(PermissionsComponent.willTransformChildren[id]);
  }

  // ../phaser-genesis/src/components/transform/UpdateWorldTransform2DSystem.ts
  var changedWorldTransformQuery = defineQuery([Changed(LocalMatrix2DComponent)]);
  var updateWorldTransformSystem = defineSystem((world2) => {
    const entities3 = changedWorldTransformQuery(world2);
    for (let i = 0; i < entities3.length; i++) {
      const id = entities3[i];
      const gameObject = GameObjectCache.get(id);
      const parent = gameObject.parent;
      if (!parent) {
        CopyLocalToWorld(id, id);
      } else if (!WillTransformChildren(id)) {
        CopyWorldToWorld(parent.id, id);
      } else {
        MultiplyLocalWithWorld(parent.id, id);
      }
    }
    return world2;
  });

  // ../phaser-genesis/src/renderer/webgl1/draw/GetQuadBuffer.ts
  function GetQuadBuffer() {
    return new Float32Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
  }

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchQuad.ts
  var buffer = GetQuadBuffer();

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuad.ts
  var buffer2 = GetQuadBuffer();

  // ../phaser-genesis/src/renderer/webgl1/draw/GetTriBuffer.ts
  function GetTriBuffer() {
    return new Float32Array([
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
  }

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchTriangle.ts
  var buffer3 = GetTriBuffer();

  // ../phaser-genesis/src/math/const.ts
  var MATH_CONST = {
    PI2: Math.PI * 2,
    HALF_PI: Math.PI * 0.5,
    EPSILON: 1e-6,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,
    MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991
  };

  // ../phaser-genesis/src/math/easing/back/In.ts
  function In(v, overshoot = 1.70158) {
    return v * v * ((overshoot + 1) * v - overshoot);
  }

  // ../phaser-genesis/src/math/easing/back/InOut.ts
  function InOut(v, overshoot = 1.70158) {
    const s = overshoot * 1.525;
    if ((v *= 2) < 1) {
      return 0.5 * (v * v * ((s + 1) * v - s));
    } else {
      return 0.5 * ((v -= 2) * v * ((s + 1) * v + s) + 2);
    }
  }

  // ../phaser-genesis/src/math/easing/back/Out.ts
  function Out(v, overshoot = 1.70158) {
    return --v * v * ((overshoot + 1) * v + overshoot) + 1;
  }

  // ../phaser-genesis/src/math/easing/bounce/In.ts
  function In2(v) {
    v = 1 - v;
    if (v < 1 / 2.75) {
      return 1 - 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
      return 1 - (7.5625 * (v -= 1.5 / 2.75) * v + 0.75);
    } else if (v < 2.5 / 2.75) {
      return 1 - (7.5625 * (v -= 2.25 / 2.75) * v + 0.9375);
    } else {
      return 1 - (7.5625 * (v -= 2.625 / 2.75) * v + 0.984375);
    }
  }

  // ../phaser-genesis/src/math/easing/bounce/InOut.ts
  function InOut2(v) {
    let reverse = false;
    if (v < 0.5) {
      v = 1 - v * 2;
      reverse = true;
    } else {
      v = v * 2 - 1;
    }
    if (v < 1 / 2.75) {
      v = 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
      v = 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
    } else if (v < 2.5 / 2.75) {
      v = 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
    } else {
      v = 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
    }
    if (reverse) {
      return (1 - v) * 0.5;
    } else {
      return v * 0.5 + 0.5;
    }
  }

  // ../phaser-genesis/src/math/easing/bounce/Out.ts
  function Out2(v) {
    if (v < 1 / 2.75) {
      return 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
      return 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
    } else if (v < 2.5 / 2.75) {
      return 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
    } else {
      return 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
    }
  }

  // ../phaser-genesis/src/math/easing/circular/In.ts
  function In3(v) {
    return 1 - Math.sqrt(1 - v * v);
  }

  // ../phaser-genesis/src/math/easing/circular/InOut.ts
  function InOut3(v) {
    if ((v *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - v * v) - 1);
    } else {
      return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
    }
  }

  // ../phaser-genesis/src/math/easing/circular/Out.ts
  function Out3(v) {
    return Math.sqrt(1 - --v * v);
  }

  // ../phaser-genesis/src/math/easing/cubic/In.ts
  function In4(v) {
    return v * v * v;
  }

  // ../phaser-genesis/src/math/easing/cubic/InOut.ts
  function InOut4(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v * v;
    } else {
      return 0.5 * ((v -= 2) * v * v + 2);
    }
  }

  // ../phaser-genesis/src/math/easing/cubic/Out.ts
  function Out4(v) {
    return --v * v * v + 1;
  }

  // ../phaser-genesis/src/math/easing/elastic/In.ts
  function In5(v, amplitude = 0.1, period = 0.1) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      let s = period / 4;
      if (amplitude < 1) {
        amplitude = 1;
      } else {
        s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
      }
      return -(amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
    }
  }

  // ../phaser-genesis/src/math/easing/elastic/InOut.ts
  function InOut5(v, amplitude = 0.1, period = 0.1) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      let s = period / 4;
      if (amplitude < 1) {
        amplitude = 1;
      } else {
        s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
      }
      if ((v *= 2) < 1) {
        return -0.5 * (amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
      } else {
        return amplitude * Math.pow(2, -10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period) * 0.5 + 1;
      }
    }
  }

  // ../phaser-genesis/src/math/easing/elastic/Out.ts
  function Out5(v, amplitude = 0.1, period = 0.1) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      let s = period / 4;
      if (amplitude < 1) {
        amplitude = 1;
      } else {
        s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
      }
      return amplitude * Math.pow(2, -10 * v) * Math.sin((v - s) * (2 * Math.PI) / period) + 1;
    }
  }

  // ../phaser-genesis/src/math/easing/expo/In.ts
  function In6(v) {
    return Math.pow(2, 10 * (v - 1)) - 1e-3;
  }

  // ../phaser-genesis/src/math/easing/expo/InOut.ts
  function InOut6(v) {
    if (v == 0) {
      return 0;
    }
    if (v == 1) {
      return 1;
    }
    if ((v *= 2) < 1) {
      return 0.5 * Math.pow(2, 10 * (v - 1));
    } else {
      return 0.5 * (2 - Math.pow(2, -10 * (v - 1)));
    }
  }

  // ../phaser-genesis/src/math/easing/expo/Out.ts
  function Out6(v) {
    return 1 - Math.pow(2, -10 * v);
  }

  // ../phaser-genesis/src/math/easing/quadratic/In.ts
  function In7(v) {
    return v * v;
  }

  // ../phaser-genesis/src/math/easing/quadratic/InOut.ts
  function InOut7(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v;
    } else {
      return -0.5 * (--v * (v - 2) - 1);
    }
  }

  // ../phaser-genesis/src/math/easing/quadratic/Out.ts
  function Out7(v) {
    return v * (2 - v);
  }

  // ../phaser-genesis/src/math/easing/quartic/In.ts
  function In8(v) {
    return v * v * v * v;
  }

  // ../phaser-genesis/src/math/easing/quartic/InOut.ts
  function InOut8(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v * v * v;
    } else {
      return -0.5 * ((v -= 2) * v * v * v - 2);
    }
  }

  // ../phaser-genesis/src/math/easing/quartic/Out.ts
  function Out8(v) {
    return -(--v * v * v * v - 1);
  }

  // ../phaser-genesis/src/math/easing/quintic/In.ts
  function In9(v) {
    return v * v * v * v * v;
  }

  // ../phaser-genesis/src/math/easing/quintic/InOut.ts
  function InOut9(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v * v * v * v;
    } else {
      return 0.5 * ((v -= 2) * v * v * v * v + 2);
    }
  }

  // ../phaser-genesis/src/math/easing/quintic/Out.ts
  function Out9(v) {
    return (v = v - 1) * v * v * v * v + 1;
  }

  // ../phaser-genesis/src/math/easing/sine/In.ts
  function In10(v) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      return 1 - Math.cos(v * Math.PI / 2);
    }
  }

  // ../phaser-genesis/src/math/easing/sine/InOut.ts
  function InOut10(v) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      return 0.5 * (1 - Math.cos(Math.PI * v));
    }
  }

  // ../phaser-genesis/src/math/easing/sine/Out.ts
  function Out10(v) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      return Math.sin(v * Math.PI / 2);
    }
  }

  // ../phaser-genesis/src/math/easing/Linear.ts
  function Linear(v) {
    return v;
  }

  // ../phaser-genesis/src/math/easing/Stepped.ts
  function Stepped(v, steps = 1) {
    if (v <= 0) {
      return 0;
    } else if (v >= 1) {
      return 1;
    } else {
      return ((steps * v | 0) + 1) * (1 / steps);
    }
  }

  // ../phaser-genesis/src/math/easing/GetEase.ts
  var EaseMap = new Map([
    ["power0", Linear],
    ["power1", Out7],
    ["power2", Out4],
    ["power3", Out8],
    ["power4", Out9],
    ["linear", Linear],
    ["quad", Out7],
    ["cubic", Out4],
    ["quart", Out8],
    ["quint", Out9],
    ["sine", Out10],
    ["expo", Out6],
    ["circ", Out3],
    ["elastic", Out5],
    ["back", Out],
    ["bounce", Out2],
    ["stepped", Stepped],
    ["quad.in", In7],
    ["cubic.in", In4],
    ["quart.in", In8],
    ["quint.in", In9],
    ["sine.in", In10],
    ["expo.in", In6],
    ["circ.in", In3],
    ["elastic.in", In5],
    ["back.in", In],
    ["bounce.in", In2],
    ["quad.out", Out7],
    ["cubic.out", Out4],
    ["quart.out", Out8],
    ["quint.out", Out9],
    ["sine.out", Out10],
    ["expo.out", Out6],
    ["circ.out", Out3],
    ["elastic.out", Out5],
    ["back.out", Out],
    ["bounce.out", Out2],
    ["quad.inout", InOut7],
    ["cubic.inout", InOut4],
    ["quart.inout", InOut8],
    ["quint.inout", InOut9],
    ["sine.inout", InOut10],
    ["expo.inout", InOut6],
    ["circ.inout", InOut3],
    ["elastic.inout", InOut5],
    ["back.inout", InOut],
    ["bounce.inout", InOut2]
  ]);

  // ../phaser-genesis/src/utils/base64/Base64ToArrayBuffer.ts
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  // ../phaser-genesis/src/utils/NOOP.ts
  function NOOP() {
  }

  // ../phaser-genesis/src/math/mat4/Matrix4.ts
  var Matrix4 = class {
    constructor(src) {
      __publicField(this, "data");
      __publicField(this, "onChange");
      const data = new Float32Array(16);
      this.data = data;
      this.onChange = NOOP;
      if (src) {
        if (Array.isArray(src)) {
          this.fromArray(src);
        } else {
          this.fromArray(src.data);
        }
      } else {
        data[0] = 1;
        data[5] = 1;
        data[10] = 1;
        data[15] = 1;
      }
    }
    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      const data = this.data;
      data[0] = m00;
      data[1] = m01;
      data[2] = m02;
      data[3] = m03;
      data[4] = m10;
      data[5] = m11;
      data[6] = m12;
      data[7] = m13;
      data[8] = m20;
      data[9] = m21;
      data[10] = m22;
      data[11] = m23;
      data[12] = m30;
      data[13] = m31;
      data[14] = m32;
      data[15] = m33;
      this.onChange(this);
      return this;
    }
    toArray(dst = [], index = 0) {
      const data = this.data;
      for (let i = 0; i < 16; i++) {
        dst[index + i] = data[i];
      }
      return dst;
    }
    fromArray(src, index = 0) {
      const data = this.data;
      for (let i = 0; i < 16; i++) {
        data[i] = src[index + i];
      }
      this.onChange(this);
      return this;
    }
    toString() {
      return "[ mat4=" + this.data.join(", ") + " ]";
    }
    destroy() {
      this.onChange = NOOP;
      this.data = null;
    }
  };

  // ../phaser-genesis/src/math/vec3/Vec3.ts
  var Vec3 = class {
    constructor(x = 0, y = 0, z = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "z");
      this.set(x, y, z);
    }
    set(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    toArray(dst = [], index = 0) {
      const { x, y, z } = this;
      dst[index] = x;
      dst[index + 1] = y;
      dst[index + 2] = z;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1], src[index + 2]);
    }
    toString() {
      const { x, y, z } = this;
      return `{ x=${x}, y=${y}, z=${z} }`;
    }
  };

  // ../phaser-genesis/src/math/vec3/Vec3Backward.ts
  function Vec3Backward() {
    return new Vec3(0, 0, -1);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Down.ts
  function Vec3Down() {
    return new Vec3(0, -1, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Forward.ts
  function Vec3Forward() {
    return new Vec3(0, 0, 1);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Left.ts
  function Vec3Left() {
    return new Vec3(-1, 0, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Right.ts
  function Vec3Right() {
    return new Vec3(1, 0, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Up.ts
  function Vec3Up() {
    return new Vec3(0, 1, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Zero.ts
  function Vec3Zero() {
    return new Vec3(0, 0, 0);
  }

  // ../phaser-genesis/src/math/vec3/const.ts
  var UP = Vec3Up();
  var DOWN = Vec3Down();
  var LEFT = Vec3Left();
  var RIGHT = Vec3Right();
  var FORWARD = Vec3Forward();
  var BACKWARD = Vec3Backward();
  var ZERO = Vec3Zero();

  // ../phaser-genesis/src/math/vec3/Vec3Project.ts
  var tempMatrix1 = new Matrix4();
  var tempMatrix2 = new Matrix4();

  // ../phaser-genesis/src/math/vec3/Vec3Unproject.ts
  var matrix = new Matrix4();
  var screenSource = new Vec3();

  // ../phaser-genesis/src/geom/circle/CircleContains.ts
  function CircleContains(circle2, x, y) {
    if (circle2.radius > 0 && x >= circle2.left && x <= circle2.right && y >= circle2.top && y <= circle2.bottom) {
      const dx = (circle2.x - x) * (circle2.x - x);
      const dy = (circle2.y - y) * (circle2.y - y);
      return dx + dy <= circle2.radius * circle2.radius;
    } else {
      return false;
    }
  }

  // ../phaser-genesis/src/geom/circle/Circle.ts
  var Circle = class {
    constructor(x = 0, y = 0, radius = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "_radius");
      __publicField(this, "_diameter");
      this.set(x, y, radius);
    }
    set(x = 0, y = 0, radius = 0) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      return this;
    }
    contains(x, y) {
      return CircleContains(this, x, y);
    }
    get radius() {
      return this._radius;
    }
    set radius(value) {
      this._radius = value;
      this._diameter = value * 2;
    }
    get diameter() {
      return this._diameter;
    }
    set diameter(value) {
      this._diameter = value;
      this._radius = value * 0.5;
    }
    get left() {
      return this.x - this._radius;
    }
    set left(value) {
      this.x = value + this._radius;
    }
    get right() {
      return this.x + this._radius;
    }
    set right(value) {
      this.x = value - this._radius;
    }
    get top() {
      return this.y - this._radius;
    }
    set top(value) {
      this.y = value + this._radius;
    }
    get bottom() {
      return this.y + this._radius;
    }
    set bottom(value) {
      this.y = value - this._radius;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/draw/FillArc.ts
  var circle = new Circle();

  // ../phaser-genesis/src/gameobjects/GameObjectTree.ts
  var GameObjectTree = new Map();

  // ../phaser-genesis/src/components/hierarchy/GetParentID.ts
  function GetParentID(id) {
    return HierarchyComponent.parentID[id];
  }

  // ../phaser-genesis/src/components/hierarchy/GetParents.ts
  function GetParents(id) {
    const results = [];
    let currentParent = GetParentID(id);
    while (currentParent) {
      results.push(currentParent);
      currentParent = GetParentID(currentParent);
    }
    return results;
  }

  // ../phaser-genesis/src/components/hierarchy/GetWorldID.ts
  function GetWorldID(id) {
    return HierarchyComponent.worldID[id];
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyParents.ts
  function SetDirtyParents(childID) {
    const parents = GetParents(childID);
    parents.forEach((id) => {
      if (WillCacheChildren(id)) {
        SetDirtyChildCache(id);
      }
    });
    SetDirtyDisplayList(GetWorldID(childID));
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyTransform.ts
  function SetDirtyTransform(id) {
    DirtyComponent.transform[id] = 1;
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
  var DefaultQuadUniforms = {
    uProjectionMatrix: new Float32Array(16),
    uCameraMatrix: new Float32Array(16),
    uTexture: 0,
    uColorMatrix: new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ]),
    uColorOffset: new Float32Array(4)
  };

  // ../phaser-genesis/src/world/WorldList.ts
  var WorldList = new Map();

  // ../phaser-genesis/src/scenes/RenderStatsComponent.ts
  var RenderStats = defineComponent({
    gameFrame: Types.ui32,
    numScenes: Types.ui8,
    numWorlds: Types.ui8,
    numGameObjects: Types.ui32,
    numGameObjectsRendered: Types.ui32,
    numDirtyLocalTransforms: Types.ui32,
    numDirtyWorldTransforms: Types.ui32,
    numDirtyVertices: Types.ui32,
    numDirtyWorldLists: Types.ui8,
    numDirtyCameras: Types.ui32
  });
})();
/**
 * @author       Niklas von Hertzen (https://github.com/niklasvh/base64-arraybuffer)
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
//# sourceMappingURL=no scene await.js.map
