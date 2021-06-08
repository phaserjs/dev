(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
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
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/tweakpane/dist/tweakpane.js
  var require_tweakpane = __commonJS({
    "node_modules/tweakpane/dist/tweakpane.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Tweakpane = {}));
      })(exports, function(exports2) {
        "use strict";
        class Semver {
          constructor(text) {
            const [core, prerelease] = text.split("-");
            const coreComps = core.split(".");
            this.major = parseInt(coreComps[0], 10);
            this.minor = parseInt(coreComps[1], 10);
            this.patch = parseInt(coreComps[2], 10);
            this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
          }
          toString() {
            const core = [this.major, this.minor, this.patch].join(".");
            return this.prerelease !== null ? [core, this.prerelease].join("-") : core;
          }
        }
        class BladeApi {
          constructor(controller) {
            this.controller_ = controller;
          }
          get disabled() {
            return this.controller_.viewProps.get("disabled");
          }
          set disabled(disabled) {
            this.controller_.viewProps.set("disabled", disabled);
          }
          get hidden() {
            return this.controller_.viewProps.get("hidden");
          }
          set hidden(hidden) {
            this.controller_.viewProps.set("hidden", hidden);
          }
          dispose() {
            this.controller_.viewProps.set("disposed", true);
          }
        }
        class TpEvent {
          constructor(target) {
            this.target = target;
          }
        }
        class TpChangeEvent extends TpEvent {
          constructor(target, value, presetKey) {
            super(target);
            this.value = value;
            this.presetKey = presetKey;
          }
        }
        class TpUpdateEvent extends TpEvent {
          constructor(target, value, presetKey) {
            super(target);
            this.value = value;
            this.presetKey = presetKey;
          }
        }
        class TpFoldEvent extends TpEvent {
          constructor(target, expanded) {
            super(target);
            this.expanded = expanded;
          }
        }
        function forceCast(v) {
          return v;
        }
        function isEmpty(value) {
          return value === null || value === void 0;
        }
        function deepEqualsArray(a1, a2) {
          if (a1.length !== a2.length) {
            return false;
          }
          for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
              return false;
            }
          }
          return true;
        }
        const CREATE_MESSAGE_MAP = {
          alreadydisposed: () => "View has been already disposed",
          invalidparams: (context) => `Invalid parameters for '${context.name}'`,
          nomatchingcontroller: (context) => `No matching controller for '${context.key}'`,
          nomatchingview: (context) => `No matching view for '${JSON.stringify(context.params)}'`,
          notbindable: () => `Value is not bindable`,
          propertynotfound: (context) => `Property '${context.name}' not found`,
          shouldneverhappen: () => "This error should never happen"
        };
        class TpError {
          constructor(config) {
            var _a;
            this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : "Unexpected error";
            this.name = this.constructor.name;
            this.stack = new Error(this.message).stack;
            this.type = config.type;
          }
          static alreadyDisposed() {
            return new TpError({ type: "alreadydisposed" });
          }
          static notBindable() {
            return new TpError({
              type: "notbindable"
            });
          }
          static propertyNotFound(name) {
            return new TpError({
              type: "propertynotfound",
              context: {
                name
              }
            });
          }
          static shouldNeverHappen() {
            return new TpError({ type: "shouldneverhappen" });
          }
        }
        class BindingTarget {
          constructor(obj, key, opt_id) {
            this.obj_ = obj;
            this.key_ = key;
            this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
          }
          static isBindable(obj) {
            if (obj === null) {
              return false;
            }
            if (typeof obj !== "object") {
              return false;
            }
            return true;
          }
          get key() {
            return this.key_;
          }
          get presetKey() {
            return this.presetKey_;
          }
          read() {
            return this.obj_[this.key_];
          }
          write(value) {
            this.obj_[this.key_] = value;
          }
          writeProperty(name, value) {
            const valueObj = this.read();
            if (!BindingTarget.isBindable(valueObj)) {
              throw TpError.notBindable();
            }
            if (!(name in valueObj)) {
              throw TpError.propertyNotFound(name);
            }
            valueObj[name] = value;
          }
        }
        class ButtonApi extends BladeApi {
          get disabled() {
            return this.controller_.viewProps.get("disabled");
          }
          set disabled(disabled) {
            this.controller_.viewProps.set("disabled", disabled);
          }
          get hidden() {
            return this.controller_.viewProps.get("hidden");
          }
          set hidden(hidden) {
            this.controller_.viewProps.set("hidden", hidden);
          }
          get label() {
            return this.controller_.props.get("label");
          }
          set label(label) {
            this.controller_.props.set("label", label);
          }
          get title() {
            var _a;
            return (_a = this.controller_.valueController.props.get("title")) !== null && _a !== void 0 ? _a : "";
          }
          set title(title) {
            this.controller_.valueController.props.set("title", title);
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            const emitter = this.controller_.valueController.emitter;
            emitter.on(eventName, () => {
              bh(new TpEvent(this));
            });
            return this;
          }
        }
        class Emitter {
          constructor() {
            this.observers_ = {};
          }
          on(eventName, handler) {
            let observers = this.observers_[eventName];
            if (!observers) {
              observers = this.observers_[eventName] = [];
            }
            observers.push({
              handler
            });
            return this;
          }
          off(eventName, handler) {
            const observers = this.observers_[eventName];
            if (observers) {
              this.observers_[eventName] = observers.filter((observer) => {
                return observer.handler !== handler;
              });
            }
            return this;
          }
          emit(eventName, event) {
            const observers = this.observers_[eventName];
            if (!observers) {
              return;
            }
            observers.forEach((observer) => {
              observer.handler(event);
            });
          }
        }
        class BoundValue {
          constructor(initialValue, config) {
            var _a;
            this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
            this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : (v1, v2) => v1 === v2;
            this.emitter = new Emitter();
            this.rawValue_ = initialValue;
          }
          get constraint() {
            return this.constraint_;
          }
          get rawValue() {
            return this.rawValue_;
          }
          set rawValue(rawValue) {
            const constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
            const changed = !this.equals_(this.rawValue_, constrainedValue);
            if (!changed) {
              return;
            }
            this.emitter.emit("beforechange", {
              sender: this
            });
            this.rawValue_ = constrainedValue;
            this.emitter.emit("change", {
              rawValue: constrainedValue,
              sender: this
            });
          }
        }
        class PrimitiveValue {
          constructor(initialValue) {
            this.emitter = new Emitter();
            this.value_ = initialValue;
          }
          get rawValue() {
            return this.value_;
          }
          set rawValue(value) {
            if (this.value_ === value) {
              return;
            }
            this.emitter.emit("beforechange", {
              sender: this
            });
            this.value_ = value;
            this.emitter.emit("change", {
              sender: this,
              rawValue: this.value_
            });
          }
        }
        function createValue(initialValue, config) {
          const constraint = config === null || config === void 0 ? void 0 : config.constraint;
          const equals = config === null || config === void 0 ? void 0 : config.equals;
          if (!constraint && !equals) {
            return new PrimitiveValue(initialValue);
          }
          return new BoundValue(initialValue, config);
        }
        class ValueMap {
          constructor(valueMap) {
            this.emitter = new Emitter();
            this.valMap_ = valueMap;
            for (const key in this.valMap_) {
              const v = this.valMap_[key];
              v.emitter.on("change", () => {
                this.emitter.emit("change", {
                  key,
                  sender: this
                });
              });
            }
          }
          static createCore(initialValue) {
            const keys = Object.keys(initialValue);
            return keys.reduce((o, key) => {
              return Object.assign(o, {
                [key]: createValue(initialValue[key])
              });
            }, {});
          }
          static fromObject(initialValue) {
            const core = this.createCore(initialValue);
            return new ValueMap(core);
          }
          get(key) {
            return this.valMap_[key].rawValue;
          }
          set(key, value) {
            this.valMap_[key].rawValue = value;
          }
          value(key) {
            return this.valMap_[key];
          }
        }
        function parseObject(value, keyToParserMap) {
          const keys = Object.keys(keyToParserMap);
          const result = keys.reduce((tmp, key) => {
            if (tmp === void 0) {
              return void 0;
            }
            const parser = keyToParserMap[key];
            const result2 = parser(value[key]);
            return result2.succeeded ? Object.assign(Object.assign({}, tmp), { [key]: result2.value }) : void 0;
          }, {});
          return forceCast(result);
        }
        function parseArray(value, parseItem) {
          return value.reduce((tmp, item) => {
            if (tmp === void 0) {
              return void 0;
            }
            const result = parseItem(item);
            if (!result.succeeded || result.value === void 0) {
              return void 0;
            }
            return [...tmp, result.value];
          }, []);
        }
        function isObject(value) {
          if (value === null) {
            return false;
          }
          return typeof value === "object";
        }
        function createParamsParserBuilder(parse) {
          return (optional) => (v) => {
            if (!optional && v === void 0) {
              return {
                succeeded: false,
                value: void 0
              };
            }
            if (optional && v === void 0) {
              return {
                succeeded: true,
                value: void 0
              };
            }
            const result = parse(v);
            return result !== void 0 ? {
              succeeded: true,
              value: result
            } : {
              succeeded: false,
              value: void 0
            };
          };
        }
        function createParamsParserBuilders(optional) {
          return {
            custom: (parse) => createParamsParserBuilder(parse)(optional),
            boolean: createParamsParserBuilder((v) => typeof v === "boolean" ? v : void 0)(optional),
            number: createParamsParserBuilder((v) => typeof v === "number" ? v : void 0)(optional),
            string: createParamsParserBuilder((v) => typeof v === "string" ? v : void 0)(optional),
            function: createParamsParserBuilder((v) => typeof v === "function" ? v : void 0)(optional),
            constant: (value) => createParamsParserBuilder((v) => v === value ? value : void 0)(optional),
            raw: createParamsParserBuilder((v) => v)(optional),
            object: (keyToParserMap) => createParamsParserBuilder((v) => {
              if (!isObject(v)) {
                return void 0;
              }
              return parseObject(v, keyToParserMap);
            })(optional),
            array: (itemParser) => createParamsParserBuilder((v) => {
              if (!Array.isArray(v)) {
                return void 0;
              }
              return parseArray(v, itemParser);
            })(optional)
          };
        }
        const ParamsParsers = {
          optional: createParamsParserBuilders(true),
          required: createParamsParserBuilders(false)
        };
        function parseParams(value, keyToParserMap) {
          const result = ParamsParsers.required.object(keyToParserMap)(value);
          return result.succeeded ? result.value : void 0;
        }
        function disposeElement(elem) {
          if (elem && elem.parentElement) {
            elem.parentElement.removeChild(elem);
          }
          return null;
        }
        const PREFIX = "tp";
        function ClassName(viewName) {
          const fn = (opt_elementName, opt_modifier) => {
            return [
              PREFIX,
              "-",
              viewName,
              "v",
              opt_elementName ? `_${opt_elementName}` : "",
              opt_modifier ? `-${opt_modifier}` : ""
            ].join("");
          };
          return fn;
        }
        function getAllBladePositions() {
          return ["veryfirst", "first", "last", "verylast"];
        }
        const className$q = ClassName("");
        const POS_TO_CLASS_NAME_MAP = {
          veryfirst: "vfst",
          first: "fst",
          last: "lst",
          verylast: "vlst"
        };
        class BladeController {
          constructor(config) {
            this.parent_ = null;
            this.blade = config.blade;
            this.view = config.view;
            this.viewProps = config.viewProps;
            const elem = this.view.element;
            this.blade.value("positions").emitter.on("change", () => {
              getAllBladePositions().forEach((pos) => {
                elem.classList.remove(className$q(void 0, POS_TO_CLASS_NAME_MAP[pos]));
              });
              this.blade.get("positions").forEach((pos) => {
                elem.classList.add(className$q(void 0, POS_TO_CLASS_NAME_MAP[pos]));
              });
            });
            this.viewProps.handleDispose(() => {
              disposeElement(elem);
            });
          }
          get parent() {
            return this.parent_;
          }
        }
        const SVG_NS = "http://www.w3.org/2000/svg";
        function forceReflow(element) {
          element.offsetHeight;
        }
        function disableTransitionTemporarily(element, callback) {
          const t = element.style.transition;
          element.style.transition = "none";
          callback();
          element.style.transition = t;
        }
        function supportsTouch(doc) {
          return doc.ontouchstart !== void 0;
        }
        function getGlobalObject() {
          return new Function("return this")();
        }
        function getWindowDocument() {
          const globalObj = forceCast(getGlobalObject());
          return globalObj.document;
        }
        function isBrowser() {
          return "document" in getGlobalObject();
        }
        function getCanvasContext(canvasElement) {
          return isBrowser() ? canvasElement.getContext("2d") : null;
        }
        const ICON_ID_TO_INNER_HTML_MAP = {
          check: '<path d="M2 8l4 4l8 -8"/>',
          dropdown: '<path d="M5 7h6l-3 3 z"/>',
          p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
        };
        function createSvgIconElement(document2, iconId) {
          const elem = document2.createElementNS(SVG_NS, "svg");
          elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
          return elem;
        }
        function insertElementAt(parentElement, element, index) {
          parentElement.insertBefore(element, parentElement.children[index]);
        }
        function removeElement(element) {
          if (element.parentElement) {
            element.parentElement.removeChild(element);
          }
        }
        function removeChildElements(element) {
          while (element.children.length > 0) {
            element.removeChild(element.children[0]);
          }
        }
        function removeChildNodes(element) {
          while (element.childNodes.length > 0) {
            element.removeChild(element.childNodes[0]);
          }
        }
        function findNextTarget(ev) {
          if (ev.relatedTarget) {
            return forceCast(ev.relatedTarget);
          }
          if ("explicitOriginalTarget" in ev) {
            return ev.explicitOriginalTarget;
          }
          return null;
        }
        function compose(h1, h2) {
          return (input) => h2(h1(input));
        }
        function extractValue(ev) {
          return ev.rawValue;
        }
        function bindValue(value, applyValue) {
          value.emitter.on("change", compose(extractValue, applyValue));
          applyValue(value.rawValue);
        }
        function bindValueMap(valueMap, key, applyValue) {
          bindValue(valueMap.value(key), applyValue);
        }
        const className$p = ClassName("lbl");
        function createLabelNode(doc, label) {
          const frag = doc.createDocumentFragment();
          const lineNodes = label.split("\n").map((line) => {
            return doc.createTextNode(line);
          });
          lineNodes.forEach((lineNode, index) => {
            if (index > 0) {
              frag.appendChild(doc.createElement("br"));
            }
            frag.appendChild(lineNode);
          });
          return frag;
        }
        class LabelView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$p());
            config.viewProps.bindClassModifiers(this.element);
            const labelElem = doc.createElement("div");
            labelElem.classList.add(className$p("l"));
            bindValueMap(config.props, "label", (value) => {
              if (isEmpty(value)) {
                this.element.classList.add(className$p(void 0, "nol"));
              } else {
                this.element.classList.remove(className$p(void 0, "nol"));
                removeChildNodes(labelElem);
                labelElem.appendChild(createLabelNode(doc, value));
              }
            });
            this.element.appendChild(labelElem);
            this.labelElement = labelElem;
            const valueElem = doc.createElement("div");
            valueElem.classList.add(className$p("v"));
            this.element.appendChild(valueElem);
            this.valueElement = valueElem;
          }
        }
        class LabelController extends BladeController {
          constructor(doc, config) {
            const viewProps = config.valueController.viewProps;
            super(Object.assign(Object.assign({}, config), { view: new LabelView(doc, {
              props: config.props,
              viewProps
            }), viewProps }));
            this.props = config.props;
            this.valueController = config.valueController;
            this.view.valueElement.appendChild(this.valueController.view.element);
          }
        }
        function applyClass(elem, className2, active) {
          if (active) {
            elem.classList.add(className2);
          } else {
            elem.classList.remove(className2);
          }
        }
        function valueToClassName(elem, className2) {
          return (value) => {
            applyClass(elem, className2, value);
          };
        }
        function bindValueToTextContent(value, elem) {
          bindValue(value, (text) => {
            elem.textContent = text !== null && text !== void 0 ? text : "";
          });
        }
        const className$o = ClassName("btn");
        class ButtonView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$o());
            config.viewProps.bindClassModifiers(this.element);
            const buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$o("b"));
            config.viewProps.bindDisabled(buttonElem);
            bindValueToTextContent(config.props.value("title"), buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
          }
        }
        class ButtonController {
          constructor(doc, config) {
            this.emitter = new Emitter();
            this.onClick_ = this.onClick_.bind(this);
            this.props = config.props;
            this.viewProps = config.viewProps;
            this.view = new ButtonView(doc, {
              props: this.props,
              viewProps: this.viewProps
            });
            this.view.buttonElement.addEventListener("click", this.onClick_);
          }
          onClick_() {
            this.emitter.emit("click", {
              sender: this
            });
          }
        }
        const ButtonBladePlugin = {
          id: "button",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              title: p.required.string,
              view: p.required.constant("button"),
              label: p.optional.string
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            return new LabelController(args.document, {
              blade: args.blade,
              props: ValueMap.fromObject({
                label: args.params.label
              }),
              valueController: new ButtonController(args.document, {
                props: ValueMap.fromObject({
                  title: args.params.title
                }),
                viewProps: args.viewProps
              })
            });
          },
          api(args) {
            if (!(args.controller instanceof LabelController)) {
              return null;
            }
            if (!(args.controller.valueController instanceof ButtonController)) {
              return null;
            }
            return new ButtonApi(args.controller);
          }
        };
        class ValueBladeController extends BladeController {
          constructor(config) {
            super(config);
            this.value = config.value;
          }
        }
        function createBlade() {
          return new ValueMap({
            positions: createValue([], {
              equals: deepEqualsArray
            })
          });
        }
        class Foldable extends ValueMap {
          constructor(valueMap) {
            super(valueMap);
          }
          static create(expanded) {
            const coreObj = {
              completed: true,
              expanded,
              expandedHeight: null,
              shouldFixHeight: false,
              temporaryExpanded: null
            };
            const core = ValueMap.createCore(coreObj);
            return new Foldable(core);
          }
          get styleExpanded() {
            var _a;
            return (_a = this.get("temporaryExpanded")) !== null && _a !== void 0 ? _a : this.get("expanded");
          }
          get styleHeight() {
            if (!this.styleExpanded) {
              return "0";
            }
            const exHeight = this.get("expandedHeight");
            if (this.get("shouldFixHeight") && !isEmpty(exHeight)) {
              return `${exHeight}px`;
            }
            return "auto";
          }
          bindExpandedClass(elem, expandedClassName) {
            bindValueMap(this, "expanded", () => {
              const expanded = this.styleExpanded;
              if (expanded) {
                elem.classList.add(expandedClassName);
              } else {
                elem.classList.remove(expandedClassName);
              }
            });
          }
        }
        function computeExpandedFolderHeight(folder, containerElement) {
          let height = 0;
          disableTransitionTemporarily(containerElement, () => {
            folder.set("expandedHeight", null);
            folder.set("temporaryExpanded", true);
            forceReflow(containerElement);
            height = containerElement.clientHeight;
            folder.set("temporaryExpanded", null);
            forceReflow(containerElement);
          });
          return height;
        }
        function applyHeight(foldable, elem) {
          elem.style.height = foldable.styleHeight;
        }
        function bindFoldable(foldable, elem) {
          foldable.value("expanded").emitter.on("beforechange", () => {
            foldable.set("completed", false);
            if (isEmpty(foldable.get("expandedHeight"))) {
              foldable.set("expandedHeight", computeExpandedFolderHeight(foldable, elem));
            }
            foldable.set("shouldFixHeight", true);
            forceReflow(elem);
          });
          foldable.emitter.on("change", () => {
            applyHeight(foldable, elem);
          });
          applyHeight(foldable, elem);
          elem.addEventListener("transitionend", (ev) => {
            if (ev.propertyName !== "height") {
              return;
            }
            foldable.set("shouldFixHeight", false);
            foldable.set("expandedHeight", null);
            foldable.set("completed", true);
          });
        }
        class RackLikeApi extends BladeApi {
          constructor(controller, rackApi) {
            super(controller);
            this.rackApi_ = rackApi;
          }
        }
        function addButtonAsBlade(api, params) {
          return api.addBlade(Object.assign(Object.assign({}, params), { view: "button" }));
        }
        function addFolderAsBlade(api, params) {
          return api.addBlade(Object.assign(Object.assign({}, params), { view: "folder" }));
        }
        function addSeparatorAsBlade(api, opt_params) {
          const params = opt_params || {};
          return api.addBlade(Object.assign(Object.assign({}, params), { view: "separator" }));
        }
        function addTabAsBlade(api, params) {
          return api.addBlade(Object.assign(Object.assign({}, params), { view: "tab" }));
        }
        class NestedOrderedSet {
          constructor(extract) {
            this.emitter = new Emitter();
            this.items_ = [];
            this.cache_ = new Set();
            this.onSubListAdd_ = this.onSubListAdd_.bind(this);
            this.onSubListRemove_ = this.onSubListRemove_.bind(this);
            this.extract_ = extract;
          }
          get items() {
            return this.items_;
          }
          allItems() {
            return Array.from(this.cache_);
          }
          find(callback) {
            for (const item of this.allItems()) {
              if (callback(item)) {
                return item;
              }
            }
            return null;
          }
          includes(item) {
            return this.cache_.has(item);
          }
          add(item, opt_index) {
            if (this.includes(item)) {
              throw TpError.shouldNeverHappen();
            }
            const index = opt_index !== void 0 ? opt_index : this.items_.length;
            this.items_.splice(index, 0, item);
            this.cache_.add(item);
            const subList = this.extract_(item);
            if (subList) {
              subList.emitter.on("add", this.onSubListAdd_);
              subList.emitter.on("remove", this.onSubListRemove_);
              subList.allItems().forEach((item2) => {
                this.cache_.add(item2);
              });
            }
            this.emitter.emit("add", {
              index,
              item,
              root: this,
              target: this
            });
          }
          remove(item) {
            const index = this.items_.indexOf(item);
            if (index < 0) {
              return;
            }
            this.items_.splice(index, 1);
            this.cache_.delete(item);
            const subList = this.extract_(item);
            if (subList) {
              subList.emitter.off("add", this.onSubListAdd_);
              subList.emitter.off("remove", this.onSubListRemove_);
            }
            this.emitter.emit("remove", {
              index,
              item,
              root: this,
              target: this
            });
          }
          onSubListAdd_(ev) {
            this.cache_.add(ev.item);
            this.emitter.emit("add", {
              index: ev.index,
              item: ev.item,
              root: this,
              target: ev.target
            });
          }
          onSubListRemove_(ev) {
            this.cache_.delete(ev.item);
            this.emitter.emit("remove", {
              index: ev.index,
              item: ev.item,
              root: this,
              target: ev.target
            });
          }
        }
        class InputBindingApi extends BladeApi {
          constructor(controller) {
            super(controller);
            this.onBindingChange_ = this.onBindingChange_.bind(this);
            this.emitter_ = new Emitter();
            this.controller_.binding.emitter.on("change", this.onBindingChange_);
          }
          get label() {
            return this.controller_.props.get("label");
          }
          set label(label) {
            this.controller_.props.set("label", label);
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
          refresh() {
            this.controller_.binding.read();
          }
          onBindingChange_(ev) {
            const value = ev.sender.target.read();
            this.emitter_.emit("change", {
              event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
            });
          }
        }
        class InputBindingController extends LabelController {
          constructor(doc, config) {
            super(doc, config);
            this.binding = config.binding;
          }
        }
        class MonitorBindingApi extends BladeApi {
          constructor(controller) {
            super(controller);
            this.onBindingUpdate_ = this.onBindingUpdate_.bind(this);
            this.emitter_ = new Emitter();
            this.controller_.binding.emitter.on("update", this.onBindingUpdate_);
          }
          get label() {
            return this.controller_.props.get("label");
          }
          set label(label) {
            this.controller_.props.set("label", label);
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
          refresh() {
            this.controller_.binding.read();
          }
          onBindingUpdate_(ev) {
            const value = ev.sender.target.read();
            this.emitter_.emit("update", {
              event: new TpUpdateEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
            });
          }
        }
        class MonitorBindingController extends LabelController {
          constructor(doc, config) {
            super(doc, config);
            this.binding = config.binding;
            this.viewProps.bindDisabled(this.binding.ticker);
            this.viewProps.handleDispose(() => {
              this.binding.dispose();
            });
          }
        }
        function findSubBladeApiSet(api) {
          if (api instanceof RackApi) {
            return api["apiSet_"];
          }
          if (api instanceof RackLikeApi) {
            return api["rackApi_"]["apiSet_"];
          }
          return null;
        }
        function getApiByController(apiSet, controller) {
          const api = apiSet.find((api2) => api2.controller_ === controller);
          if (!api) {
            throw TpError.shouldNeverHappen();
          }
          return api;
        }
        function createBindingTarget(obj, key, opt_id) {
          if (!BindingTarget.isBindable(obj)) {
            throw TpError.notBindable();
          }
          return new BindingTarget(obj, key, opt_id);
        }
        class RackApi extends BladeApi {
          constructor(controller, pool) {
            super(controller);
            this.onRackAdd_ = this.onRackAdd_.bind(this);
            this.onRackRemove_ = this.onRackRemove_.bind(this);
            this.onRackInputChange_ = this.onRackInputChange_.bind(this);
            this.onRackMonitorUpdate_ = this.onRackMonitorUpdate_.bind(this);
            this.emitter_ = new Emitter();
            this.apiSet_ = new NestedOrderedSet(findSubBladeApiSet);
            this.pool_ = pool;
            const rack = this.controller_.rack;
            rack.emitter.on("add", this.onRackAdd_);
            rack.emitter.on("remove", this.onRackRemove_);
            rack.emitter.on("inputchange", this.onRackInputChange_);
            rack.emitter.on("monitorupdate", this.onRackMonitorUpdate_);
            rack.children.forEach((bc) => {
              this.setUpApi_(bc);
            });
          }
          get children() {
            return this.controller_.rack.children.map((bc) => getApiByController(this.apiSet_, bc));
          }
          addInput(object, key, opt_params) {
            const params = opt_params || {};
            const doc = this.controller_.view.element.ownerDocument;
            const bc = this.pool_.createInput(doc, createBindingTarget(object, key, params.presetKey), params);
            const api = new InputBindingApi(bc);
            return this.add(api, params.index);
          }
          addMonitor(object, key, opt_params) {
            const params = opt_params || {};
            const doc = this.controller_.view.element.ownerDocument;
            const bc = this.pool_.createMonitor(doc, createBindingTarget(object, key), params);
            const api = new MonitorBindingApi(bc);
            return forceCast(this.add(api, params.index));
          }
          addFolder(params) {
            return addFolderAsBlade(this, params);
          }
          addButton(params) {
            return addButtonAsBlade(this, params);
          }
          addSeparator(opt_params) {
            return addSeparatorAsBlade(this, opt_params);
          }
          addTab(params) {
            return addTabAsBlade(this, params);
          }
          add(api, opt_index) {
            this.controller_.rack.add(api.controller_, opt_index);
            const gapi = this.apiSet_.find((a) => a.controller_ === api.controller_);
            if (gapi) {
              this.apiSet_.remove(gapi);
            }
            this.apiSet_.add(api);
            return api;
          }
          remove(api) {
            this.controller_.rack.remove(api.controller_);
          }
          addBlade(params) {
            const doc = this.controller_.view.element.ownerDocument;
            const bc = this.pool_.createBlade(doc, params);
            const api = this.pool_.createBladeApi(bc);
            return this.add(api, params.index);
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
          setUpApi_(bc) {
            const api = this.apiSet_.find((api2) => api2.controller_ === bc);
            if (!api) {
              this.apiSet_.add(this.pool_.createBladeApi(bc));
            }
          }
          onRackAdd_(ev) {
            this.setUpApi_(ev.bladeController);
          }
          onRackRemove_(ev) {
            if (ev.isRoot) {
              const api = getApiByController(this.apiSet_, ev.bladeController);
              this.apiSet_.remove(api);
            }
          }
          onRackInputChange_(ev) {
            const bc = ev.bladeController;
            if (bc instanceof InputBindingController) {
              const api = getApiByController(this.apiSet_, bc);
              const binding = bc.binding;
              this.emitter_.emit("change", {
                event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
              });
            } else if (bc instanceof ValueBladeController) {
              const api = getApiByController(this.apiSet_, bc);
              this.emitter_.emit("change", {
                event: new TpChangeEvent(api, bc.value.rawValue, void 0)
              });
            }
          }
          onRackMonitorUpdate_(ev) {
            if (!(ev.bladeController instanceof MonitorBindingController)) {
              throw TpError.shouldNeverHappen();
            }
            const api = getApiByController(this.apiSet_, ev.bladeController);
            const binding = ev.bladeController.binding;
            this.emitter_.emit("update", {
              event: new TpUpdateEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
            });
          }
        }
        class FolderApi extends RackLikeApi {
          constructor(controller, pool) {
            super(controller, new RackApi(controller.rackController, pool));
            this.emitter_ = new Emitter();
            this.controller_.foldable.value("expanded").emitter.on("change", (ev) => {
              this.emitter_.emit("fold", {
                event: new TpFoldEvent(this, ev.sender.rawValue)
              });
            });
            this.rackApi_.on("change", (ev) => {
              this.emitter_.emit("change", {
                event: ev
              });
            });
            this.rackApi_.on("update", (ev) => {
              this.emitter_.emit("update", {
                event: ev
              });
            });
          }
          get expanded() {
            return this.controller_.foldable.get("expanded");
          }
          set expanded(expanded) {
            this.controller_.foldable.set("expanded", expanded);
          }
          get title() {
            return this.controller_.props.get("title");
          }
          set title(title) {
            this.controller_.props.set("title", title);
          }
          get children() {
            return this.rackApi_.children;
          }
          addInput(object, key, opt_params) {
            return this.rackApi_.addInput(object, key, opt_params);
          }
          addMonitor(object, key, opt_params) {
            return this.rackApi_.addMonitor(object, key, opt_params);
          }
          addFolder(params) {
            return this.rackApi_.addFolder(params);
          }
          addButton(params) {
            return this.rackApi_.addButton(params);
          }
          addSeparator(opt_params) {
            return this.rackApi_.addSeparator(opt_params);
          }
          addTab(params) {
            return this.rackApi_.addTab(params);
          }
          add(api, opt_index) {
            return this.rackApi_.add(api, opt_index);
          }
          remove(api) {
            this.rackApi_.remove(api);
          }
          addBlade(params) {
            return this.rackApi_.addBlade(params);
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
        }
        class RackLikeController extends BladeController {
          constructor(config) {
            super({
              blade: config.blade,
              view: config.view,
              viewProps: config.rackController.viewProps
            });
            this.rackController = config.rackController;
          }
        }
        class PlainView {
          constructor(doc, config) {
            const className2 = ClassName(config.viewName);
            this.element = doc.createElement("div");
            this.element.classList.add(className2());
            config.viewProps.bindClassModifiers(this.element);
          }
        }
        function findInputBindingController(bcs, b) {
          for (let i = 0; i < bcs.length; i++) {
            const bc = bcs[i];
            if (bc instanceof InputBindingController && bc.binding === b) {
              return bc;
            }
          }
          return null;
        }
        function findMonitorBindingController(bcs, b) {
          for (let i = 0; i < bcs.length; i++) {
            const bc = bcs[i];
            if (bc instanceof MonitorBindingController && bc.binding === b) {
              return bc;
            }
          }
          return null;
        }
        function findValueBladeController(bcs, v) {
          for (let i = 0; i < bcs.length; i++) {
            const bc = bcs[i];
            if (bc instanceof ValueBladeController && bc.value === v) {
              return bc;
            }
          }
          return null;
        }
        function findSubRack(bc) {
          if (bc instanceof RackController) {
            return bc.rack;
          }
          if (bc instanceof RackLikeController) {
            return bc.rackController.rack;
          }
          return null;
        }
        function findSubBladeControllerSet(bc) {
          const rack = findSubRack(bc);
          return rack ? rack["bcSet_"] : null;
        }
        class BladeRack {
          constructor(blade) {
            var _a;
            this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
            this.onSetAdd_ = this.onSetAdd_.bind(this);
            this.onSetRemove_ = this.onSetRemove_.bind(this);
            this.onChildDispose_ = this.onChildDispose_.bind(this);
            this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
            this.onChildInputChange_ = this.onChildInputChange_.bind(this);
            this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
            this.onChildValueChange_ = this.onChildValueChange_.bind(this);
            this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
            this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
            this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
            this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this);
            this.emitter = new Emitter();
            this.blade_ = blade !== null && blade !== void 0 ? blade : null;
            (_a = this.blade_) === null || _a === void 0 ? void 0 : _a.value("positions").emitter.on("change", this.onBladePositionsChange_);
            this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
            this.bcSet_.emitter.on("add", this.onSetAdd_);
            this.bcSet_.emitter.on("remove", this.onSetRemove_);
          }
          get children() {
            return this.bcSet_.items;
          }
          add(bc, opt_index) {
            if (bc.parent) {
              bc.parent.remove(bc);
            }
            bc["parent_"] = this;
            this.bcSet_.add(bc, opt_index);
          }
          remove(bc) {
            bc["parent_"] = null;
            this.bcSet_.remove(bc);
          }
          find(controllerClass) {
            return forceCast(this.bcSet_.allItems().filter((bc) => {
              return bc instanceof controllerClass;
            }));
          }
          onSetAdd_(ev) {
            this.updatePositions_();
            const isRoot = ev.target === ev.root;
            this.emitter.emit("add", {
              bladeController: ev.item,
              index: ev.index,
              isRoot,
              sender: this
            });
            if (!isRoot) {
              return;
            }
            const bc = ev.item;
            bc.viewProps.emitter.on("change", this.onChildViewPropsChange_);
            bc.blade.value("positions").emitter.on("change", this.onChildPositionsChange_);
            bc.viewProps.handleDispose(this.onChildDispose_);
            if (bc instanceof InputBindingController) {
              bc.binding.emitter.on("change", this.onChildInputChange_);
            } else if (bc instanceof MonitorBindingController) {
              bc.binding.emitter.on("update", this.onChildMonitorUpdate_);
            } else if (bc instanceof ValueBladeController) {
              bc.value.emitter.on("change", this.onChildValueChange_);
            } else {
              const rack = findSubRack(bc);
              if (rack) {
                const emitter = rack.emitter;
                emitter.on("layout", this.onDescendantLayout_);
                emitter.on("inputchange", this.onDescendantInputChange_);
                emitter.on("monitorupdate", this.onDescendantMonitorUpdate_);
              }
            }
          }
          onSetRemove_(ev) {
            this.updatePositions_();
            const isRoot = ev.target === ev.root;
            this.emitter.emit("remove", {
              bladeController: ev.item,
              isRoot,
              sender: this
            });
            if (!isRoot) {
              return;
            }
            const bc = ev.item;
            if (bc instanceof InputBindingController) {
              bc.binding.emitter.off("change", this.onChildInputChange_);
            } else if (bc instanceof MonitorBindingController) {
              bc.binding.emitter.off("update", this.onChildMonitorUpdate_);
            } else if (bc instanceof ValueBladeController) {
              bc.value.emitter.off("change", this.onChildValueChange_);
            } else {
              const rack = findSubRack(bc);
              if (rack) {
                const emitter = rack.emitter;
                emitter.off("layout", this.onDescendantLayout_);
                emitter.off("inputchange", this.onDescendantInputChange_);
                emitter.off("monitorupdate", this.onDescendantMonitorUpdate_);
              }
            }
          }
          updatePositions_() {
            const visibleItems = this.bcSet_.items.filter((bc) => !bc.viewProps.get("hidden"));
            const firstVisibleItem = visibleItems[0];
            const lastVisibleItem = visibleItems[visibleItems.length - 1];
            this.bcSet_.items.forEach((bc) => {
              const ps = [];
              if (bc === firstVisibleItem) {
                ps.push("first");
                if (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) {
                  ps.push("veryfirst");
                }
              }
              if (bc === lastVisibleItem) {
                ps.push("last");
                if (!this.blade_ || this.blade_.get("positions").includes("verylast")) {
                  ps.push("verylast");
                }
              }
              bc.blade.set("positions", ps);
            });
          }
          onChildPositionsChange_() {
            this.updatePositions_();
            this.emitter.emit("layout", {
              sender: this
            });
          }
          onChildViewPropsChange_(_ev) {
            this.updatePositions_();
            this.emitter.emit("layout", {
              sender: this
            });
          }
          onChildDispose_() {
            const disposedUcs = this.bcSet_.items.filter((bc) => {
              return bc.viewProps.get("disposed");
            });
            disposedUcs.forEach((bc) => {
              this.bcSet_.remove(bc);
            });
          }
          onChildInputChange_(ev) {
            const bc = findInputBindingController(this.find(InputBindingController), ev.sender);
            if (!bc) {
              throw TpError.shouldNeverHappen();
            }
            this.emitter.emit("inputchange", {
              bladeController: bc,
              sender: this
            });
          }
          onChildMonitorUpdate_(ev) {
            const bc = findMonitorBindingController(this.find(MonitorBindingController), ev.sender);
            if (!bc) {
              throw TpError.shouldNeverHappen();
            }
            this.emitter.emit("monitorupdate", {
              bladeController: bc,
              sender: this
            });
          }
          onChildValueChange_(ev) {
            const bc = findValueBladeController(this.find(ValueBladeController), ev.sender);
            if (!bc) {
              throw TpError.shouldNeverHappen();
            }
            this.emitter.emit("inputchange", {
              bladeController: bc,
              sender: this
            });
          }
          onDescendantLayout_(_) {
            this.updatePositions_();
            this.emitter.emit("layout", {
              sender: this
            });
          }
          onDescendantInputChange_(ev) {
            this.emitter.emit("inputchange", {
              bladeController: ev.bladeController,
              sender: this
            });
          }
          onDescendantMonitorUpdate_(ev) {
            this.emitter.emit("monitorupdate", {
              bladeController: ev.bladeController,
              sender: this
            });
          }
          onBladePositionsChange_() {
            this.updatePositions_();
          }
        }
        class RackController extends BladeController {
          constructor(doc, config) {
            super(Object.assign(Object.assign({}, config), { view: new PlainView(doc, {
              viewName: "brk",
              viewProps: config.viewProps
            }) }));
            this.onRackAdd_ = this.onRackAdd_.bind(this);
            this.onRackRemove_ = this.onRackRemove_.bind(this);
            const rack = new BladeRack(config.root ? void 0 : config.blade);
            rack.emitter.on("add", this.onRackAdd_);
            rack.emitter.on("remove", this.onRackRemove_);
            this.rack = rack;
            this.viewProps.handleDispose(() => {
              for (let i = this.rack.children.length - 1; i >= 0; i--) {
                const bc = this.rack.children[i];
                bc.viewProps.set("disposed", true);
              }
            });
          }
          onRackAdd_(ev) {
            if (!ev.isRoot) {
              return;
            }
            insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
          }
          onRackRemove_(ev) {
            if (!ev.isRoot) {
              return;
            }
            removeElement(ev.bladeController.view.element);
          }
        }
        const bladeContainerClassName = ClassName("cnt");
        class FolderView {
          constructor(doc, config) {
            this.className_ = ClassName(config.viewName || "fld");
            this.element = doc.createElement("div");
            this.element.classList.add(this.className_(), bladeContainerClassName());
            config.viewProps.bindClassModifiers(this.element);
            this.foldable_ = config.foldable;
            this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded"));
            bindValueMap(this.foldable_, "completed", valueToClassName(this.element, this.className_(void 0, "cpl")));
            const buttonElem = doc.createElement("button");
            buttonElem.classList.add(this.className_("b"));
            bindValueMap(config.props, "title", (title) => {
              if (isEmpty(title)) {
                this.element.classList.add(this.className_(void 0, "not"));
              } else {
                this.element.classList.remove(this.className_(void 0, "not"));
              }
            });
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const titleElem = doc.createElement("div");
            titleElem.classList.add(this.className_("t"));
            bindValueToTextContent(config.props.value("title"), titleElem);
            this.buttonElement.appendChild(titleElem);
            this.titleElement = titleElem;
            const markElem = doc.createElement("div");
            markElem.classList.add(this.className_("m"));
            this.buttonElement.appendChild(markElem);
            const containerElem = config.containerElement;
            containerElem.classList.add(this.className_("c"));
            this.element.appendChild(containerElem);
            this.containerElement = containerElem;
          }
        }
        class FolderController extends RackLikeController {
          constructor(doc, config) {
            var _a;
            const foldable = Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
            const rc = new RackController(doc, {
              blade: config.blade,
              root: config.root,
              viewProps: config.viewProps
            });
            super(Object.assign(Object.assign({}, config), { rackController: rc, view: new FolderView(doc, {
              containerElement: rc.view.element,
              foldable,
              props: config.props,
              viewName: config.root ? "rot" : void 0,
              viewProps: config.viewProps
            }) }));
            this.onTitleClick_ = this.onTitleClick_.bind(this);
            this.props = config.props;
            this.foldable = foldable;
            bindFoldable(this.foldable, this.view.containerElement);
            this.view.buttonElement.addEventListener("click", this.onTitleClick_);
          }
          get document() {
            return this.view.element.ownerDocument;
          }
          onTitleClick_() {
            this.foldable.set("expanded", !this.foldable.get("expanded"));
          }
        }
        const FolderBladePlugin = {
          id: "folder",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              title: p.required.string,
              view: p.required.constant("folder"),
              expanded: p.optional.boolean
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            return new FolderController(args.document, {
              blade: args.blade,
              expanded: args.params.expanded,
              props: ValueMap.fromObject({
                title: args.params.title
              }),
              viewProps: args.viewProps
            });
          },
          api(args) {
            if (!(args.controller instanceof FolderController)) {
              return null;
            }
            return new FolderApi(args.controller, args.pool);
          }
        };
        class LabeledValueController extends ValueBladeController {
          constructor(doc, config) {
            const viewProps = config.valueController.viewProps;
            super(Object.assign(Object.assign({}, config), { value: config.valueController.value, view: new LabelView(doc, {
              props: config.props,
              viewProps
            }), viewProps }));
            this.props = config.props;
            this.valueController = config.valueController;
            this.view.valueElement.appendChild(this.valueController.view.element);
          }
        }
        class SeparatorApi extends BladeApi {
        }
        const className$n = ClassName("spr");
        class SeparatorView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$n());
            config.viewProps.bindClassModifiers(this.element);
            const hrElem = doc.createElement("hr");
            hrElem.classList.add(className$n("r"));
            this.element.appendChild(hrElem);
          }
        }
        class SeparatorController extends BladeController {
          constructor(doc, config) {
            super(Object.assign(Object.assign({}, config), { view: new SeparatorView(doc, {
              viewProps: config.viewProps
            }) }));
          }
        }
        const SeparatorBladePlugin = {
          id: "separator",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              view: p.required.constant("separator")
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            return new SeparatorController(args.document, {
              blade: args.blade,
              viewProps: args.viewProps
            });
          },
          api(args) {
            if (!(args.controller instanceof SeparatorController)) {
              return null;
            }
            return new SeparatorApi(args.controller);
          }
        };
        const className$m = ClassName("");
        function valueToModifier(elem, modifier) {
          return valueToClassName(elem, className$m(void 0, modifier));
        }
        class ViewProps extends ValueMap {
          constructor(valueMap) {
            super(valueMap);
          }
          static create(opt_initialValue) {
            var _a, _b;
            const initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
            const coreObj = {
              disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
              disposed: false,
              hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false
            };
            const core = ValueMap.createCore(coreObj);
            return new ViewProps(core);
          }
          bindClassModifiers(elem) {
            bindValueMap(this, "disabled", valueToModifier(elem, "disabled"));
            bindValueMap(this, "hidden", valueToModifier(elem, "hidden"));
          }
          bindDisabled(target) {
            bindValueMap(this, "disabled", (disabled) => {
              target.disabled = disabled;
            });
          }
          bindTabIndex(elem) {
            bindValueMap(this, "disabled", (disabled) => {
              elem.tabIndex = disabled ? -1 : 0;
            });
          }
          handleDispose(callback) {
            this.value("disposed").emitter.on("change", (disposed) => {
              if (disposed) {
                callback();
              }
            });
          }
        }
        const className$l = ClassName("tbi");
        class TabItemView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$l());
            config.viewProps.bindClassModifiers(this.element);
            bindValueMap(config.props, "selected", (selected) => {
              if (selected) {
                this.element.classList.add(className$l(void 0, "sel"));
              } else {
                this.element.classList.remove(className$l(void 0, "sel"));
              }
            });
            const buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$l("b"));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const titleElem = doc.createElement("div");
            titleElem.classList.add(className$l("t"));
            bindValueToTextContent(config.props.value("title"), titleElem);
            this.buttonElement.appendChild(titleElem);
            this.titleElement = titleElem;
          }
        }
        class TabItemController {
          constructor(doc, config) {
            this.emitter = new Emitter();
            this.onClick_ = this.onClick_.bind(this);
            this.props = config.props;
            this.viewProps = config.viewProps;
            this.view = new TabItemView(doc, {
              props: config.props,
              viewProps: config.viewProps
            });
            this.view.buttonElement.addEventListener("click", this.onClick_);
          }
          onClick_() {
            this.emitter.emit("click", {
              sender: this
            });
          }
        }
        class TabPageController {
          constructor(doc, config) {
            this.onItemClick_ = this.onItemClick_.bind(this);
            this.ic_ = new TabItemController(doc, {
              props: config.itemProps,
              viewProps: ViewProps.create()
            });
            this.ic_.emitter.on("click", this.onItemClick_);
            this.cc_ = new RackController(doc, {
              blade: createBlade(),
              viewProps: ViewProps.create()
            });
            this.props = config.props;
            bindValueMap(this.props, "selected", (selected) => {
              this.itemController.props.set("selected", selected);
              this.contentController.viewProps.set("hidden", !selected);
            });
          }
          get itemController() {
            return this.ic_;
          }
          get contentController() {
            return this.cc_;
          }
          onItemClick_() {
            this.props.set("selected", true);
          }
        }
        class TabPageApi {
          constructor(controller, contentRackApi) {
            this.controller_ = controller;
            this.rackApi_ = contentRackApi;
          }
          get title() {
            var _a;
            return (_a = this.controller_.itemController.props.get("title")) !== null && _a !== void 0 ? _a : "";
          }
          set title(title) {
            this.controller_.itemController.props.set("title", title);
          }
          get selected() {
            return this.controller_.props.get("selected");
          }
          set selected(selected) {
            this.controller_.props.set("selected", selected);
          }
          get children() {
            return this.rackApi_.children;
          }
          addButton(params) {
            return this.rackApi_.addButton(params);
          }
          addFolder(params) {
            return this.rackApi_.addFolder(params);
          }
          addSeparator(opt_params) {
            return this.rackApi_.addSeparator(opt_params);
          }
          addTab(params) {
            return this.rackApi_.addTab(params);
          }
          add(api, opt_index) {
            this.rackApi_.add(api, opt_index);
          }
          remove(api) {
            this.rackApi_.remove(api);
          }
          addInput(object, key, opt_params) {
            return this.rackApi_.addInput(object, key, opt_params);
          }
          addMonitor(object, key, opt_params) {
            return this.rackApi_.addMonitor(object, key, opt_params);
          }
          addBlade(params) {
            return this.rackApi_.addBlade(params);
          }
        }
        class TabApi extends RackLikeApi {
          constructor(controller, pool) {
            super(controller, new RackApi(controller.rackController, pool));
            this.onPageAdd_ = this.onPageAdd_.bind(this);
            this.onPageRemove_ = this.onPageRemove_.bind(this);
            this.emitter_ = new Emitter();
            this.pageApiMap_ = new Map();
            this.rackApi_.on("change", (ev) => {
              this.emitter_.emit("change", {
                event: ev
              });
            });
            this.rackApi_.on("update", (ev) => {
              this.emitter_.emit("update", {
                event: ev
              });
            });
            this.controller_.pageSet.emitter.on("add", this.onPageAdd_);
            this.controller_.pageSet.emitter.on("remove", this.onPageRemove_);
            this.controller_.pageSet.items.forEach((pc) => {
              this.setUpPageApi_(pc);
            });
          }
          get pages() {
            return this.controller_.pageSet.items.map((pc) => {
              const api = this.pageApiMap_.get(pc);
              if (!api) {
                throw TpError.shouldNeverHappen();
              }
              return api;
            });
          }
          addPage(params) {
            const doc = this.controller_.view.element.ownerDocument;
            const pc = new TabPageController(doc, {
              itemProps: ValueMap.fromObject({
                selected: false,
                title: params.title
              }),
              props: ValueMap.fromObject({
                selected: false
              })
            });
            this.controller_.add(pc, params.index);
            const api = this.pageApiMap_.get(pc);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            return api;
          }
          removePage(index) {
            this.controller_.remove(index);
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
          setUpPageApi_(pc) {
            const rackApi = this.rackApi_["apiSet_"].find((api2) => api2.controller_ === pc.contentController);
            if (!rackApi) {
              throw TpError.shouldNeverHappen();
            }
            const api = new TabPageApi(pc, rackApi);
            this.pageApiMap_.set(pc, api);
          }
          onPageAdd_(ev) {
            this.setUpPageApi_(ev.item);
          }
          onPageRemove_(ev) {
            const api = this.pageApiMap_.get(ev.item);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            this.pageApiMap_.delete(ev.item);
          }
        }
        const className$k = ClassName("tab");
        class TabView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$k(), bladeContainerClassName());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.empty, valueToClassName(this.element, className$k(void 0, "nop")));
            const itemsElem = doc.createElement("div");
            itemsElem.classList.add(className$k("i"));
            this.element.appendChild(itemsElem);
            this.itemsElement = itemsElem;
            const contentsElem = config.contentsElement;
            contentsElem.classList.add(className$k("c"));
            this.element.appendChild(contentsElem);
            this.contentsElement = contentsElem;
          }
        }
        class TabController extends RackLikeController {
          constructor(doc, config) {
            const cr = new RackController(doc, {
              blade: config.blade,
              viewProps: config.viewProps
            });
            const empty = createValue(true);
            super({
              blade: config.blade,
              rackController: cr,
              view: new TabView(doc, {
                contentsElement: cr.view.element,
                empty,
                viewProps: config.viewProps
              })
            });
            this.onPageAdd_ = this.onPageAdd_.bind(this);
            this.onPageRemove_ = this.onPageRemove_.bind(this);
            this.onPageSelectedChange_ = this.onPageSelectedChange_.bind(this);
            this.pageSet_ = new NestedOrderedSet(() => null);
            this.pageSet_.emitter.on("add", this.onPageAdd_);
            this.pageSet_.emitter.on("remove", this.onPageRemove_);
            this.empty_ = empty;
            this.applyPages_();
          }
          get pageSet() {
            return this.pageSet_;
          }
          add(pc, opt_index) {
            this.pageSet_.add(pc, opt_index !== null && opt_index !== void 0 ? opt_index : this.pageSet_.items.length);
          }
          remove(index) {
            this.pageSet_.remove(this.pageSet_.items[index]);
          }
          applyPages_() {
            this.keepSelection_();
            this.empty_.rawValue = this.pageSet_.items.length === 0;
          }
          onPageAdd_(ev) {
            const pc = ev.item;
            insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
            this.rackController.rack.add(pc.contentController, ev.index);
            pc.props.value("selected").emitter.on("change", this.onPageSelectedChange_);
            this.applyPages_();
          }
          onPageRemove_(ev) {
            const pc = ev.item;
            removeElement(pc.itemController.view.element);
            this.rackController.rack.remove(pc.contentController);
            pc.props.value("selected").emitter.off("change", this.onPageSelectedChange_);
            this.applyPages_();
          }
          keepSelection_() {
            if (this.pageSet_.items.length === 0) {
              return;
            }
            const firstSelIndex = this.pageSet_.items.findIndex((pc) => pc.props.get("selected"));
            if (firstSelIndex < 0) {
              this.pageSet_.items.forEach((pc, i) => {
                pc.props.set("selected", i === 0);
              });
            } else {
              this.pageSet_.items.forEach((pc, i) => {
                pc.props.set("selected", i === firstSelIndex);
              });
            }
          }
          onPageSelectedChange_(ev) {
            if (ev.rawValue) {
              const index = this.pageSet_.items.findIndex((pc) => pc.props.value("selected") === ev.sender);
              this.pageSet_.items.forEach((pc, i) => {
                pc.props.set("selected", i === index);
              });
            } else {
              this.keepSelection_();
            }
          }
        }
        const TabBladePlugin = {
          id: "tab",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              pages: p.required.array(p.required.object({ title: p.required.string })),
              view: p.required.constant("tab")
            });
            if (!result || result.pages.length === 0) {
              return null;
            }
            return { params: result };
          },
          controller(args) {
            const c = new TabController(args.document, {
              blade: args.blade,
              viewProps: args.viewProps
            });
            args.params.pages.forEach((p) => {
              const pc = new TabPageController(args.document, {
                itemProps: ValueMap.fromObject({
                  selected: false,
                  title: p.title
                }),
                props: ValueMap.fromObject({
                  selected: false
                })
              });
              c.add(pc);
            });
            return c;
          },
          api(args) {
            if (!(args.controller instanceof TabController)) {
              return null;
            }
            return new TabApi(args.controller, args.pool);
          }
        };
        function createBladeController(plugin, args) {
          const ac = plugin.accept(args.params);
          if (!ac) {
            return null;
          }
          const disabled = ParamsParsers.optional.boolean(args.params["disabled"]).value;
          const hidden = ParamsParsers.optional.boolean(args.params["hidden"]).value;
          return plugin.controller({
            blade: createBlade(),
            document: args.document,
            params: forceCast(Object.assign(Object.assign({}, ac.params), { disabled, hidden })),
            viewProps: ViewProps.create({
              disabled,
              hidden
            })
          });
        }
        class ManualTicker {
          constructor() {
            this.disabled = false;
            this.emitter = new Emitter();
          }
          dispose() {
          }
          tick() {
            if (this.disabled) {
              return;
            }
            this.emitter.emit("tick", {
              sender: this
            });
          }
        }
        class CompositeConstraint {
          constructor(constraints) {
            this.constraints = constraints;
          }
          constrain(value) {
            return this.constraints.reduce((result, c) => {
              return c.constrain(result);
            }, value);
          }
        }
        function findConstraint(c, constraintClass) {
          if (c instanceof constraintClass) {
            return c;
          }
          if (c instanceof CompositeConstraint) {
            const result = c.constraints.reduce((tmpResult, sc) => {
              if (tmpResult) {
                return tmpResult;
              }
              return sc instanceof constraintClass ? sc : null;
            }, null);
            if (result) {
              return result;
            }
          }
          return null;
        }
        class ListConstraint {
          constructor(options) {
            this.options = options;
          }
          constrain(value) {
            const opts = this.options;
            if (opts.length === 0) {
              return value;
            }
            const matched = opts.filter((item) => {
              return item.value === value;
            }).length > 0;
            return matched ? value : opts[0].value;
          }
        }
        class RangeConstraint {
          constructor(config) {
            this.maxValue = config.max;
            this.minValue = config.min;
          }
          constrain(value) {
            let result = value;
            if (!isEmpty(this.minValue)) {
              result = Math.max(result, this.minValue);
            }
            if (!isEmpty(this.maxValue)) {
              result = Math.min(result, this.maxValue);
            }
            return result;
          }
        }
        class StepConstraint {
          constructor(step) {
            this.step = step;
          }
          constrain(value) {
            const r = value < 0 ? -Math.round(-value / this.step) : Math.round(value / this.step);
            return r * this.step;
          }
        }
        const className$j = ClassName("lst");
        class ListView {
          constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.props_ = config.props;
            this.element = doc.createElement("div");
            this.element.classList.add(className$j());
            config.viewProps.bindClassModifiers(this.element);
            const selectElem = doc.createElement("select");
            selectElem.classList.add(className$j("s"));
            bindValueMap(this.props_, "options", (opts) => {
              removeChildElements(selectElem);
              opts.forEach((item, index) => {
                const optionElem = doc.createElement("option");
                optionElem.dataset.index = String(index);
                optionElem.textContent = item.text;
                optionElem.value = String(item.value);
                selectElem.appendChild(optionElem);
              });
            });
            config.viewProps.bindDisabled(selectElem);
            this.element.appendChild(selectElem);
            this.selectElement = selectElem;
            const markElem = doc.createElement("div");
            markElem.classList.add(className$j("m"));
            markElem.appendChild(createSvgIconElement(doc, "dropdown"));
            this.element.appendChild(markElem);
            config.value.emitter.on("change", this.onValueChange_);
            this.value_ = config.value;
            this.update_();
          }
          update_() {
            this.selectElement.value = String(this.value_.rawValue);
          }
          onValueChange_() {
            this.update_();
          }
        }
        class ListController {
          constructor(doc, config) {
            this.onSelectChange_ = this.onSelectChange_.bind(this);
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new ListView(doc, {
              props: this.props,
              value: this.value,
              viewProps: this.viewProps
            });
            this.view.selectElement.addEventListener("change", this.onSelectChange_);
          }
          onSelectChange_(e) {
            const selectElem = forceCast(e.currentTarget);
            const optElem = selectElem.selectedOptions.item(0);
            if (!optElem) {
              return;
            }
            const itemIndex = Number(optElem.dataset.index);
            this.value.rawValue = this.props.get("options")[itemIndex].value;
          }
        }
        const className$i = ClassName("pop");
        class PopupView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$i());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.shows, valueToClassName(this.element, className$i(void 0, "v")));
          }
        }
        class PopupController {
          constructor(doc, config) {
            this.shows = createValue(false);
            this.viewProps = config.viewProps;
            this.view = new PopupView(doc, {
              shows: this.shows,
              viewProps: this.viewProps
            });
          }
        }
        const className$h = ClassName("txt");
        class TextView {
          constructor(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.element = doc.createElement("div");
            this.element.classList.add(className$h());
            config.viewProps.bindClassModifiers(this.element);
            this.props_ = config.props;
            this.props_.emitter.on("change", this.onChange_);
            const inputElem = doc.createElement("input");
            inputElem.classList.add(className$h("i"));
            inputElem.type = "text";
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            config.value.emitter.on("change", this.onChange_);
            this.value_ = config.value;
            this.refresh();
          }
          refresh() {
            const formatter = this.props_.get("formatter");
            this.inputElement.value = formatter(this.value_.rawValue);
          }
          onChange_() {
            this.refresh();
          }
        }
        class TextController {
          constructor(doc, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.parser_ = config.parser;
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new TextView(doc, {
              props: config.props,
              value: this.value,
              viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener("change", this.onInputChange_);
          }
          onInputChange_(e) {
            const inputElem = forceCast(e.currentTarget);
            const value = inputElem.value;
            const parsedValue = this.parser_(value);
            if (!isEmpty(parsedValue)) {
              this.value.rawValue = parsedValue;
            }
            this.view.refresh();
          }
        }
        function boolToString(value) {
          return String(value);
        }
        function boolFromUnknown(value) {
          if (value === "false") {
            return false;
          }
          return !!value;
        }
        function BooleanFormatter(value) {
          return boolToString(value);
        }
        class NumberLiteralNode {
          constructor(text) {
            this.text = text;
          }
          evaluate() {
            return Number(this.text);
          }
          toString() {
            return this.text;
          }
        }
        const BINARY_OPERATION_MAP = {
          "**": (v1, v2) => Math.pow(v1, v2),
          "*": (v1, v2) => v1 * v2,
          "/": (v1, v2) => v1 / v2,
          "%": (v1, v2) => v1 % v2,
          "+": (v1, v2) => v1 + v2,
          "-": (v1, v2) => v1 - v2,
          "<<": (v1, v2) => v1 << v2,
          ">>": (v1, v2) => v1 >> v2,
          ">>>": (v1, v2) => v1 >>> v2,
          "&": (v1, v2) => v1 & v2,
          "^": (v1, v2) => v1 ^ v2,
          "|": (v1, v2) => v1 | v2
        };
        class BinaryOperationNode {
          constructor(operator, left, right) {
            this.left = left;
            this.operator = operator;
            this.right = right;
          }
          evaluate() {
            const op = BINARY_OPERATION_MAP[this.operator];
            if (!op) {
              throw new Error(`unexpected binary operator: '${this.operator}`);
            }
            return op(this.left.evaluate(), this.right.evaluate());
          }
          toString() {
            return [
              "b(",
              this.left.toString(),
              this.operator,
              this.right.toString(),
              ")"
            ].join(" ");
          }
        }
        const UNARY_OPERATION_MAP = {
          "+": (v) => v,
          "-": (v) => -v,
          "~": (v) => ~v
        };
        class UnaryOperationNode {
          constructor(operator, expr) {
            this.operator = operator;
            this.expression = expr;
          }
          evaluate() {
            const op = UNARY_OPERATION_MAP[this.operator];
            if (!op) {
              throw new Error(`unexpected unary operator: '${this.operator}`);
            }
            return op(this.expression.evaluate());
          }
          toString() {
            return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
          }
        }
        function combineReader(parsers) {
          return (text, cursor) => {
            for (let i = 0; i < parsers.length; i++) {
              const result = parsers[i](text, cursor);
              if (result !== "") {
                return result;
              }
            }
            return "";
          };
        }
        function readWhitespace(text, cursor) {
          var _a;
          const m = text.substr(cursor).match(/^\s+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readNonZeroDigit(text, cursor) {
          const ch = text.substr(cursor, 1);
          return ch.match(/^[1-9]$/) ? ch : "";
        }
        function readDecimalDigits(text, cursor) {
          var _a;
          const m = text.substr(cursor).match(/^[0-9]+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readSignedInteger(text, cursor) {
          const ds = readDecimalDigits(text, cursor);
          if (ds !== "") {
            return ds;
          }
          const sign = text.substr(cursor, 1);
          cursor += 1;
          if (sign !== "-" && sign !== "+") {
            return "";
          }
          const sds = readDecimalDigits(text, cursor);
          if (sds === "") {
            return "";
          }
          return sign + sds;
        }
        function readExponentPart(text, cursor) {
          const e = text.substr(cursor, 1);
          cursor += 1;
          if (e.toLowerCase() !== "e") {
            return "";
          }
          const si = readSignedInteger(text, cursor);
          if (si === "") {
            return "";
          }
          return e + si;
        }
        function readDecimalIntegerLiteral(text, cursor) {
          const ch = text.substr(cursor, 1);
          if (ch === "0") {
            return ch;
          }
          const nzd = readNonZeroDigit(text, cursor);
          cursor += nzd.length;
          if (nzd === "") {
            return "";
          }
          return nzd + readDecimalDigits(text, cursor);
        }
        function readDecimalLiteral1(text, cursor) {
          const dil = readDecimalIntegerLiteral(text, cursor);
          cursor += dil.length;
          if (dil === "") {
            return "";
          }
          const dot = text.substr(cursor, 1);
          cursor += dot.length;
          if (dot !== ".") {
            return "";
          }
          const dds = readDecimalDigits(text, cursor);
          cursor += dds.length;
          return dil + dot + dds + readExponentPart(text, cursor);
        }
        function readDecimalLiteral2(text, cursor) {
          const dot = text.substr(cursor, 1);
          cursor += dot.length;
          if (dot !== ".") {
            return "";
          }
          const dds = readDecimalDigits(text, cursor);
          cursor += dds.length;
          if (dds === "") {
            return "";
          }
          return dot + dds + readExponentPart(text, cursor);
        }
        function readDecimalLiteral3(text, cursor) {
          const dil = readDecimalIntegerLiteral(text, cursor);
          cursor += dil.length;
          if (dil === "") {
            return "";
          }
          return dil + readExponentPart(text, cursor);
        }
        const readDecimalLiteral = combineReader([
          readDecimalLiteral1,
          readDecimalLiteral2,
          readDecimalLiteral3
        ]);
        function parseBinaryDigits(text, cursor) {
          var _a;
          const m = text.substr(cursor).match(/^[01]+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readBinaryIntegerLiteral(text, cursor) {
          const prefix = text.substr(cursor, 2);
          cursor += prefix.length;
          if (prefix.toLowerCase() !== "0b") {
            return "";
          }
          const bds = parseBinaryDigits(text, cursor);
          if (bds === "") {
            return "";
          }
          return prefix + bds;
        }
        function readOctalDigits(text, cursor) {
          var _a;
          const m = text.substr(cursor).match(/^[0-7]+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readOctalIntegerLiteral(text, cursor) {
          const prefix = text.substr(cursor, 2);
          cursor += prefix.length;
          if (prefix.toLowerCase() !== "0o") {
            return "";
          }
          const ods = readOctalDigits(text, cursor);
          if (ods === "") {
            return "";
          }
          return prefix + ods;
        }
        function readHexDigits(text, cursor) {
          var _a;
          const m = text.substr(cursor).match(/^[0-9a-f]+/i);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readHexIntegerLiteral(text, cursor) {
          const prefix = text.substr(cursor, 2);
          cursor += prefix.length;
          if (prefix.toLowerCase() !== "0x") {
            return "";
          }
          const hds = readHexDigits(text, cursor);
          if (hds === "") {
            return "";
          }
          return prefix + hds;
        }
        const readNonDecimalIntegerLiteral = combineReader([
          readBinaryIntegerLiteral,
          readOctalIntegerLiteral,
          readHexIntegerLiteral
        ]);
        const readNumericLiteral = combineReader([
          readNonDecimalIntegerLiteral,
          readDecimalLiteral
        ]);
        function parseLiteral(text, cursor) {
          const num = readNumericLiteral(text, cursor);
          cursor += num.length;
          if (num === "") {
            return null;
          }
          return {
            evaluable: new NumberLiteralNode(num),
            cursor
          };
        }
        function parseParenthesizedExpression(text, cursor) {
          const op = text.substr(cursor, 1);
          cursor += op.length;
          if (op !== "(") {
            return null;
          }
          const expr = parseExpression(text, cursor);
          if (!expr) {
            return null;
          }
          cursor = expr.cursor;
          cursor += readWhitespace(text, cursor).length;
          const cl = text.substr(cursor, 1);
          cursor += cl.length;
          if (cl !== ")") {
            return null;
          }
          return {
            evaluable: expr.evaluable,
            cursor
          };
        }
        function parsePrimaryExpression(text, cursor) {
          return parseLiteral(text, cursor) || parseParenthesizedExpression(text, cursor);
        }
        function parseUnaryExpression(text, cursor) {
          const expr = parsePrimaryExpression(text, cursor);
          if (expr) {
            return expr;
          }
          const op = text.substr(cursor, 1);
          cursor += op.length;
          if (op !== "+" && op !== "-" && op !== "~") {
            return null;
          }
          const num = parseUnaryExpression(text, cursor);
          if (!num) {
            return null;
          }
          cursor = num.cursor;
          return {
            cursor,
            evaluable: new UnaryOperationNode(op, num.evaluable)
          };
        }
        function readBinaryOperator(ops, text, cursor) {
          cursor += readWhitespace(text, cursor).length;
          const op = ops.filter((op2) => text.startsWith(op2, cursor))[0];
          if (!op) {
            return null;
          }
          cursor += op.length;
          cursor += readWhitespace(text, cursor).length;
          return {
            cursor,
            operator: op
          };
        }
        function createBinaryOperationExpressionParser(exprParser, ops) {
          return (text, cursor) => {
            const firstExpr = exprParser(text, cursor);
            if (!firstExpr) {
              return null;
            }
            cursor = firstExpr.cursor;
            let expr = firstExpr.evaluable;
            for (; ; ) {
              const op = readBinaryOperator(ops, text, cursor);
              if (!op) {
                break;
              }
              cursor = op.cursor;
              const nextExpr = exprParser(text, cursor);
              if (!nextExpr) {
                return null;
              }
              cursor = nextExpr.cursor;
              expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
            }
            return expr ? {
              cursor,
              evaluable: expr
            } : null;
          };
        }
        const parseBinaryOperationExpression = [
          ["**"],
          ["*", "/", "%"],
          ["+", "-"],
          ["<<", ">>>", ">>"],
          ["&"],
          ["^"],
          ["|"]
        ].reduce((parser, ops) => {
          return createBinaryOperationExpressionParser(parser, ops);
        }, parseUnaryExpression);
        function parseExpression(text, cursor) {
          cursor += readWhitespace(text, cursor).length;
          return parseBinaryOperationExpression(text, cursor);
        }
        function parseEcmaNumberExpression(text) {
          const expr = parseExpression(text, 0);
          if (!expr) {
            return null;
          }
          const cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
          if (cursor !== text.length) {
            return null;
          }
          return expr.evaluable;
        }
        function parseNumber(text) {
          var _a;
          const r = parseEcmaNumberExpression(text);
          return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
        }
        function numberFromUnknown(value) {
          if (typeof value === "number") {
            return value;
          }
          if (typeof value === "string") {
            const pv = parseNumber(value);
            if (!isEmpty(pv)) {
              return pv;
            }
          }
          return 0;
        }
        function numberToString(value) {
          return String(value);
        }
        function createNumberFormatter(digits) {
          return (value) => {
            return value.toFixed(Math.max(Math.min(digits, 20), 0));
          };
        }
        const innerFormatter = createNumberFormatter(0);
        function formatPercentage(value) {
          return innerFormatter(value) + "%";
        }
        function stringFromUnknown(value) {
          return String(value);
        }
        function formatString(value) {
          return value;
        }
        function fillBuffer(buffer, bufferSize) {
          while (buffer.length < bufferSize) {
            buffer.push(void 0);
          }
        }
        function initializeBuffer(bufferSize) {
          const buffer = [];
          fillBuffer(buffer, bufferSize);
          return createValue(buffer);
        }
        function createTrimmedBuffer(buffer) {
          const index = buffer.indexOf(void 0);
          return forceCast(index < 0 ? buffer : buffer.slice(0, index));
        }
        function createPushedBuffer(buffer, newValue) {
          const newBuffer = [...createTrimmedBuffer(buffer), newValue];
          if (newBuffer.length > buffer.length) {
            newBuffer.splice(0, newBuffer.length - buffer.length);
          } else {
            fillBuffer(newBuffer, buffer.length);
          }
          return newBuffer;
        }
        function connectValues({ primary, secondary, forward, backward }) {
          let changing = false;
          function preventFeedback(callback) {
            if (changing) {
              return;
            }
            changing = true;
            callback();
            changing = false;
          }
          primary.emitter.on("change", () => {
            preventFeedback(() => {
              secondary.rawValue = forward(primary, secondary);
            });
          });
          secondary.emitter.on("change", () => {
            preventFeedback(() => {
              primary.rawValue = backward(primary, secondary);
            });
            preventFeedback(() => {
              secondary.rawValue = forward(primary, secondary);
            });
          });
          preventFeedback(() => {
            secondary.rawValue = forward(primary, secondary);
          });
        }
        function getStepForKey(baseStep, keys) {
          const step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
          if (keys.upKey) {
            return +step;
          } else if (keys.downKey) {
            return -step;
          }
          return 0;
        }
        function getVerticalStepKeys(ev) {
          return {
            altKey: ev.altKey,
            downKey: ev.key === "ArrowDown",
            shiftKey: ev.shiftKey,
            upKey: ev.key === "ArrowUp"
          };
        }
        function getHorizontalStepKeys(ev) {
          return {
            altKey: ev.altKey,
            downKey: ev.key === "ArrowLeft",
            shiftKey: ev.shiftKey,
            upKey: ev.key === "ArrowRight"
          };
        }
        function isVerticalArrowKey(key) {
          return key === "ArrowUp" || key === "ArrowDown";
        }
        function isArrowKey(key) {
          return isVerticalArrowKey(key) || key === "ArrowLeft" || key === "ArrowRight";
        }
        function computeOffset(ev, elem) {
          const win = elem.ownerDocument.defaultView;
          const rect = elem.getBoundingClientRect();
          return {
            x: ev.pageX - ((win && win.scrollX || 0) + rect.left),
            y: ev.pageY - ((win && win.scrollY || 0) + rect.top)
          };
        }
        class PointerHandler {
          constructor(element) {
            this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
            this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
            this.onMouseDown_ = this.onMouseDown_.bind(this);
            this.onTouchEnd_ = this.onTouchEnd_.bind(this);
            this.onTouchMove_ = this.onTouchMove_.bind(this);
            this.onTouchStart_ = this.onTouchStart_.bind(this);
            this.elem_ = element;
            this.emitter = new Emitter();
            element.addEventListener("touchstart", this.onTouchStart_);
            element.addEventListener("touchmove", this.onTouchMove_);
            element.addEventListener("touchend", this.onTouchEnd_);
            element.addEventListener("mousedown", this.onMouseDown_);
          }
          computePosition_(offset) {
            const rect = this.elem_.getBoundingClientRect();
            return {
              bounds: {
                width: rect.width,
                height: rect.height
              },
              point: offset ? {
                x: offset.x,
                y: offset.y
              } : null
            };
          }
          onMouseDown_(ev) {
            var _a;
            ev.preventDefault();
            (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
            const doc = this.elem_.ownerDocument;
            doc.addEventListener("mousemove", this.onDocumentMouseMove_);
            doc.addEventListener("mouseup", this.onDocumentMouseUp_);
            this.emitter.emit("down", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
          onDocumentMouseMove_(ev) {
            this.emitter.emit("move", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
          onDocumentMouseUp_(ev) {
            const doc = this.elem_.ownerDocument;
            doc.removeEventListener("mousemove", this.onDocumentMouseMove_);
            doc.removeEventListener("mouseup", this.onDocumentMouseUp_);
            this.emitter.emit("up", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
          onTouchStart_(ev) {
            ev.preventDefault();
            const touch = ev.targetTouches.item(0);
            const rect = this.elem_.getBoundingClientRect();
            this.emitter.emit("down", {
              altKey: ev.altKey,
              data: this.computePosition_(touch ? {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
              } : void 0),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
          onTouchMove_(ev) {
            const touch = ev.targetTouches.item(0);
            const rect = this.elem_.getBoundingClientRect();
            this.emitter.emit("move", {
              altKey: ev.altKey,
              data: this.computePosition_(touch ? {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
              } : void 0),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
          onTouchEnd_(ev) {
            const touch = ev.targetTouches.item(0);
            const rect = this.elem_.getBoundingClientRect();
            this.emitter.emit("up", {
              altKey: ev.altKey,
              data: this.computePosition_(touch ? {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
              } : void 0),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
        }
        function mapRange(value, start1, end1, start2, end2) {
          const p = (value - start1) / (end1 - start1);
          return start2 + p * (end2 - start2);
        }
        function getDecimalDigits(value) {
          const text = String(value.toFixed(10));
          const frac = text.split(".")[1];
          return frac.replace(/0+$/, "").length;
        }
        function constrainRange(value, min, max) {
          return Math.min(Math.max(value, min), max);
        }
        function loopRange(value, max) {
          return (value % max + max) % max;
        }
        const className$g = ClassName("txt");
        class NumberTextView {
          constructor(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on("change", this.onChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$g(), className$g(void 0, "num"));
            if (config.arrayPosition) {
              this.element.classList.add(className$g(void 0, config.arrayPosition));
            }
            config.viewProps.bindClassModifiers(this.element);
            const inputElem = doc.createElement("input");
            inputElem.classList.add(className$g("i"));
            inputElem.type = "text";
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            this.onDraggingChange_ = this.onDraggingChange_.bind(this);
            this.dragging_ = config.dragging;
            this.dragging_.emitter.on("change", this.onDraggingChange_);
            this.element.classList.add(className$g());
            this.inputElement.classList.add(className$g("i"));
            const knobElem = doc.createElement("div");
            knobElem.classList.add(className$g("k"));
            this.element.appendChild(knobElem);
            this.knobElement = knobElem;
            const guideElem = doc.createElementNS(SVG_NS, "svg");
            guideElem.classList.add(className$g("g"));
            this.knobElement.appendChild(guideElem);
            const bodyElem = doc.createElementNS(SVG_NS, "path");
            bodyElem.classList.add(className$g("gb"));
            guideElem.appendChild(bodyElem);
            this.guideBodyElem_ = bodyElem;
            const headElem = doc.createElementNS(SVG_NS, "path");
            headElem.classList.add(className$g("gh"));
            guideElem.appendChild(headElem);
            this.guideHeadElem_ = headElem;
            const tooltipElem = doc.createElement("div");
            tooltipElem.classList.add(ClassName("tt")());
            this.knobElement.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on("change", this.onChange_);
            this.value = config.value;
            this.refresh();
          }
          onDraggingChange_(ev) {
            if (ev.rawValue === null) {
              this.element.classList.remove(className$g(void 0, "drg"));
              return;
            }
            this.element.classList.add(className$g(void 0, "drg"));
            const x = ev.rawValue / this.props_.get("draggingScale");
            const aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
            const adx = constrainRange(-aox, -4, 4);
            this.guideHeadElem_.setAttributeNS(null, "d", [`M ${aox + adx},0 L${aox},4 L${aox + adx},8`, `M ${x},-1 L${x},9`].join(" "));
            this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${x},4`);
            const formatter = this.props_.get("formatter");
            this.tooltipElem_.textContent = formatter(this.value.rawValue);
            this.tooltipElem_.style.left = `${x}px`;
          }
          refresh() {
            const formatter = this.props_.get("formatter");
            this.inputElement.value = formatter(this.value.rawValue);
          }
          onChange_() {
            this.refresh();
          }
        }
        class NumberTextController {
          constructor(doc, config) {
            this.originRawValue_ = 0;
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.baseStep_ = config.baseStep;
            this.parser_ = config.parser;
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.dragging_ = createValue(null);
            this.view = new NumberTextView(doc, {
              arrayPosition: config.arrayPosition,
              dragging: this.dragging_,
              props: this.props,
              value: this.value,
              viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener("change", this.onInputChange_);
            this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_);
            const ph = new PointerHandler(this.view.knobElement);
            ph.emitter.on("down", this.onPointerDown_);
            ph.emitter.on("move", this.onPointerMove_);
            ph.emitter.on("up", this.onPointerUp_);
          }
          onInputChange_(e) {
            const inputElem = forceCast(e.currentTarget);
            const value = inputElem.value;
            const parsedValue = this.parser_(value);
            if (!isEmpty(parsedValue)) {
              this.value.rawValue = parsedValue;
            }
            this.view.refresh();
          }
          onInputKeyDown_(e) {
            const step = getStepForKey(this.baseStep_, getVerticalStepKeys(e));
            if (step !== 0) {
              this.value.rawValue += step;
            }
          }
          onPointerDown_() {
            this.originRawValue_ = this.value.rawValue;
            this.dragging_.rawValue = 0;
          }
          onPointerMove_(ev) {
            if (!ev.data.point) {
              return;
            }
            const dx = ev.data.point.x - ev.data.bounds.width / 2;
            this.value.rawValue = this.originRawValue_ + dx * this.props.get("draggingScale");
            this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
          }
          onPointerUp_() {
            this.dragging_.rawValue = null;
          }
        }
        const className$f = ClassName("sld");
        class SliderView {
          constructor(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on("change", this.onChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$f());
            config.viewProps.bindClassModifiers(this.element);
            const trackElem = doc.createElement("div");
            trackElem.classList.add(className$f("t"));
            config.viewProps.bindTabIndex(trackElem);
            this.element.appendChild(trackElem);
            this.trackElement = trackElem;
            const knobElem = doc.createElement("div");
            knobElem.classList.add(className$f("k"));
            this.trackElement.appendChild(knobElem);
            this.knobElement = knobElem;
            config.value.emitter.on("change", this.onChange_);
            this.value = config.value;
            this.update_();
          }
          update_() {
            const p = constrainRange(mapRange(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
            this.knobElement.style.width = `${p}%`;
          }
          onChange_() {
            this.update_();
          }
        }
        class SliderController {
          constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPoint_ = this.onPoint_.bind(this);
            this.baseStep_ = config.baseStep;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.props = config.props;
            this.view = new SliderView(doc, {
              props: this.props,
              value: this.value,
              viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.trackElement);
            this.ptHandler_.emitter.on("down", this.onPoint_);
            this.ptHandler_.emitter.on("move", this.onPoint_);
            this.ptHandler_.emitter.on("up", this.onPoint_);
            this.view.trackElement.addEventListener("keydown", this.onKeyDown_);
          }
          handlePointerEvent_(d) {
            if (!d.point) {
              return;
            }
            this.value.rawValue = mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get("minValue"), this.props.get("maxValue"));
          }
          onPoint_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onKeyDown_(ev) {
            this.value.rawValue += getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
          }
        }
        const className$e = ClassName("sldtxt");
        class SliderTextView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$e());
            const sliderElem = doc.createElement("div");
            sliderElem.classList.add(className$e("s"));
            this.sliderView_ = config.sliderView;
            sliderElem.appendChild(this.sliderView_.element);
            this.element.appendChild(sliderElem);
            const textElem = doc.createElement("div");
            textElem.classList.add(className$e("t"));
            this.textView_ = config.textView;
            textElem.appendChild(this.textView_.element);
            this.element.appendChild(textElem);
          }
        }
        class SliderTextController {
          constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.sliderC_ = new SliderController(doc, {
              baseStep: config.baseStep,
              props: config.sliderProps,
              value: config.value,
              viewProps: this.viewProps
            });
            this.textC_ = new NumberTextController(doc, {
              baseStep: config.baseStep,
              parser: config.parser,
              props: config.textProps,
              value: config.value,
              viewProps: config.viewProps
            });
            this.view = new SliderTextView(doc, {
              sliderView: this.sliderC_.view,
              textView: this.textC_.view
            });
          }
          get sliderController() {
            return this.sliderC_;
          }
          get textController() {
            return this.textC_;
          }
        }
        function writePrimitive(target, value) {
          target.write(value);
        }
        function parseListOptions(value) {
          const p = ParamsParsers;
          if (Array.isArray(value)) {
            return p.required.array(p.required.object({
              text: p.required.string,
              value: p.required.raw
            }))(value).value;
          }
          if (typeof value === "object") {
            return p.required.raw(value).value;
          }
          return void 0;
        }
        function parsePickerLayout(value) {
          if (value === "inline" || value === "popup") {
            return value;
          }
          return void 0;
        }
        function parsePointDimensionParams(value) {
          const p = ParamsParsers;
          return p.required.object({
            max: p.optional.number,
            min: p.optional.number,
            step: p.optional.number
          })(value).value;
        }
        function normalizeListOptions(options) {
          if (Array.isArray(options)) {
            return options;
          }
          const items = [];
          Object.keys(options).forEach((text) => {
            items.push({ text, value: options[text] });
          });
          return items;
        }
        function createListConstraint(options) {
          return !isEmpty(options) ? new ListConstraint(normalizeListOptions(forceCast(options))) : null;
        }
        function findListItems(constraint) {
          const c = constraint ? findConstraint(constraint, ListConstraint) : null;
          if (!c) {
            return null;
          }
          return c.options;
        }
        function findStep(constraint) {
          const c = constraint ? findConstraint(constraint, StepConstraint) : null;
          if (!c) {
            return null;
          }
          return c.step;
        }
        function getSuitableDecimalDigits(constraint, rawValue) {
          const sc = constraint && findConstraint(constraint, StepConstraint);
          if (sc) {
            return getDecimalDigits(sc.step);
          }
          return Math.max(getDecimalDigits(rawValue), 2);
        }
        function getBaseStep(constraint) {
          const step = findStep(constraint);
          return step !== null && step !== void 0 ? step : 1;
        }
        function getSuitableDraggingScale(constraint, rawValue) {
          var _a;
          const sc = constraint && findConstraint(constraint, StepConstraint);
          const base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
          return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
        }
        const className$d = ClassName("ckb");
        class CheckboxView {
          constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.element = doc.createElement("div");
            this.element.classList.add(className$d());
            config.viewProps.bindClassModifiers(this.element);
            const labelElem = doc.createElement("label");
            labelElem.classList.add(className$d("l"));
            this.element.appendChild(labelElem);
            const inputElem = doc.createElement("input");
            inputElem.classList.add(className$d("i"));
            inputElem.type = "checkbox";
            labelElem.appendChild(inputElem);
            this.inputElement = inputElem;
            config.viewProps.bindDisabled(this.inputElement);
            const wrapperElem = doc.createElement("div");
            wrapperElem.classList.add(className$d("w"));
            labelElem.appendChild(wrapperElem);
            const markElem = createSvgIconElement(doc, "check");
            wrapperElem.appendChild(markElem);
            config.value.emitter.on("change", this.onValueChange_);
            this.value = config.value;
            this.update_();
          }
          update_() {
            this.inputElement.checked = this.value.rawValue;
          }
          onValueChange_() {
            this.update_();
          }
        }
        class CheckboxController {
          constructor(doc, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new CheckboxView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener("change", this.onInputChange_);
          }
          onInputChange_(e) {
            const inputElem = forceCast(e.currentTarget);
            this.value.rawValue = inputElem.checked;
          }
        }
        function createConstraint$5(params) {
          const constraints = [];
          const lc = createListConstraint(params.options);
          if (lc) {
            constraints.push(lc);
          }
          return new CompositeConstraint(constraints);
        }
        const BooleanInputPlugin = {
          id: "input-bool",
          type: "input",
          accept: (value, params) => {
            if (typeof value !== "boolean") {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              options: p.optional.custom(parseListOptions)
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => boolFromUnknown,
            constraint: (args) => createConstraint$5(args.params),
            writer: (_args) => writePrimitive
          },
          controller: (args) => {
            var _a;
            const doc = args.document;
            const value = args.value;
            const c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) {
              return new ListController(doc, {
                props: ValueMap.fromObject({
                  options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value,
                viewProps: args.viewProps
              });
            }
            return new CheckboxController(doc, {
              value,
              viewProps: args.viewProps
            });
          }
        };
        const className$c = ClassName("col");
        class ColorView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$c());
            config.foldable.bindExpandedClass(this.element, className$c(void 0, "expanded"));
            bindValueMap(config.foldable, "completed", valueToClassName(this.element, className$c(void 0, "cpl")));
            const headElem = doc.createElement("div");
            headElem.classList.add(className$c("h"));
            this.element.appendChild(headElem);
            const swatchElem = doc.createElement("div");
            swatchElem.classList.add(className$c("s"));
            headElem.appendChild(swatchElem);
            this.swatchElement = swatchElem;
            const textElem = doc.createElement("div");
            textElem.classList.add(className$c("t"));
            headElem.appendChild(textElem);
            this.textElement = textElem;
            if (config.pickerLayout === "inline") {
              const pickerElem = doc.createElement("div");
              pickerElem.classList.add(className$c("p"));
              this.element.appendChild(pickerElem);
              this.pickerElement = pickerElem;
            } else {
              this.pickerElement = null;
            }
          }
        }
        function rgbToHsl(r, g, b) {
          const rp = constrainRange(r / 255, 0, 1);
          const gp = constrainRange(g / 255, 0, 1);
          const bp = constrainRange(b / 255, 0, 1);
          const cmax = Math.max(rp, gp, bp);
          const cmin = Math.min(rp, gp, bp);
          const c = cmax - cmin;
          let h = 0;
          let s = 0;
          const l = (cmin + cmax) / 2;
          if (c !== 0) {
            s = c / (1 - Math.abs(cmax + cmin - 1));
            if (rp === cmax) {
              h = (gp - bp) / c;
            } else if (gp === cmax) {
              h = 2 + (bp - rp) / c;
            } else {
              h = 4 + (rp - gp) / c;
            }
            h = h / 6 + (h < 0 ? 1 : 0);
          }
          return [h * 360, s * 100, l * 100];
        }
        function hslToRgb(h, s, l) {
          const hp = (h % 360 + 360) % 360;
          const sp = constrainRange(s / 100, 0, 1);
          const lp = constrainRange(l / 100, 0, 1);
          const c = (1 - Math.abs(2 * lp - 1)) * sp;
          const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
          const m = lp - c / 2;
          let rp, gp, bp;
          if (hp >= 0 && hp < 60) {
            [rp, gp, bp] = [c, x, 0];
          } else if (hp >= 60 && hp < 120) {
            [rp, gp, bp] = [x, c, 0];
          } else if (hp >= 120 && hp < 180) {
            [rp, gp, bp] = [0, c, x];
          } else if (hp >= 180 && hp < 240) {
            [rp, gp, bp] = [0, x, c];
          } else if (hp >= 240 && hp < 300) {
            [rp, gp, bp] = [x, 0, c];
          } else {
            [rp, gp, bp] = [c, 0, x];
          }
          return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
        }
        function rgbToHsv(r, g, b) {
          const rp = constrainRange(r / 255, 0, 1);
          const gp = constrainRange(g / 255, 0, 1);
          const bp = constrainRange(b / 255, 0, 1);
          const cmax = Math.max(rp, gp, bp);
          const cmin = Math.min(rp, gp, bp);
          const d = cmax - cmin;
          let h;
          if (d === 0) {
            h = 0;
          } else if (cmax === rp) {
            h = 60 * (((gp - bp) / d % 6 + 6) % 6);
          } else if (cmax === gp) {
            h = 60 * ((bp - rp) / d + 2);
          } else {
            h = 60 * ((rp - gp) / d + 4);
          }
          const s = cmax === 0 ? 0 : d / cmax;
          const v = cmax;
          return [h, s * 100, v * 100];
        }
        function hsvToRgb(h, s, v) {
          const hp = loopRange(h, 360);
          const sp = constrainRange(s / 100, 0, 1);
          const vp = constrainRange(v / 100, 0, 1);
          const c = vp * sp;
          const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
          const m = vp - c;
          let rp, gp, bp;
          if (hp >= 0 && hp < 60) {
            [rp, gp, bp] = [c, x, 0];
          } else if (hp >= 60 && hp < 120) {
            [rp, gp, bp] = [x, c, 0];
          } else if (hp >= 120 && hp < 180) {
            [rp, gp, bp] = [0, c, x];
          } else if (hp >= 180 && hp < 240) {
            [rp, gp, bp] = [0, x, c];
          } else if (hp >= 240 && hp < 300) {
            [rp, gp, bp] = [x, 0, c];
          } else {
            [rp, gp, bp] = [c, 0, x];
          }
          return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
        }
        function hslToHsv(h, s, l) {
          const sd = l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100);
          return [
            h,
            sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0,
            l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100)
          ];
        }
        function hsvToHsl(h, s, v) {
          const sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
          return [h, sd !== 0 ? s * v / sd : 0, v * (200 - s) / (2 * 100)];
        }
        function removeAlphaComponent(comps) {
          return [comps[0], comps[1], comps[2]];
        }
        function appendAlphaComponent(comps, alpha) {
          return [comps[0], comps[1], comps[2], alpha];
        }
        const MODE_CONVERTER_MAP = {
          hsl: {
            hsl: (h, s, l) => [h, s, l],
            hsv: hslToHsv,
            rgb: hslToRgb
          },
          hsv: {
            hsl: hsvToHsl,
            hsv: (h, s, v) => [h, s, v],
            rgb: hsvToRgb
          },
          rgb: {
            hsl: rgbToHsl,
            hsv: rgbToHsv,
            rgb: (r, g, b) => [r, g, b]
          }
        };
        function convertColorMode(components2, fromMode, toMode) {
          return MODE_CONVERTER_MAP[fromMode][toMode](...components2);
        }
        const CONSTRAINT_MAP = {
          hsl: (comps) => {
            var _a;
            return [
              loopRange(comps[0], 360),
              constrainRange(comps[1], 0, 100),
              constrainRange(comps[2], 0, 100),
              constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
            ];
          },
          hsv: (comps) => {
            var _a;
            return [
              loopRange(comps[0], 360),
              constrainRange(comps[1], 0, 100),
              constrainRange(comps[2], 0, 100),
              constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
            ];
          },
          rgb: (comps) => {
            var _a;
            return [
              constrainRange(comps[0], 0, 255),
              constrainRange(comps[1], 0, 255),
              constrainRange(comps[2], 0, 255),
              constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
            ];
          }
        };
        function isRgbColorComponent(obj, key) {
          if (typeof obj !== "object" || isEmpty(obj)) {
            return false;
          }
          return key in obj && typeof obj[key] === "number";
        }
        class Color {
          constructor(comps, mode) {
            this.mode_ = mode;
            this.comps_ = CONSTRAINT_MAP[mode](comps);
          }
          static black() {
            return new Color([0, 0, 0], "rgb");
          }
          static fromObject(obj) {
            const comps = "a" in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
            return new Color(comps, "rgb");
          }
          static toRgbaObject(color) {
            return color.toRgbaObject();
          }
          static isRgbColorObject(obj) {
            return isRgbColorComponent(obj, "r") && isRgbColorComponent(obj, "g") && isRgbColorComponent(obj, "b");
          }
          static isRgbaColorObject(obj) {
            return this.isRgbColorObject(obj) && isRgbColorComponent(obj, "a");
          }
          static isColorObject(obj) {
            return this.isRgbColorObject(obj);
          }
          static equals(v1, v2) {
            if (v1.mode_ !== v2.mode_) {
              return false;
            }
            const comps1 = v1.comps_;
            const comps2 = v2.comps_;
            for (let i = 0; i < comps1.length; i++) {
              if (comps1[i] !== comps2[i]) {
                return false;
              }
            }
            return true;
          }
          get mode() {
            return this.mode_;
          }
          getComponents(opt_mode) {
            return appendAlphaComponent(convertColorMode(removeAlphaComponent(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
          }
          toRgbaObject() {
            const rgbComps = this.getComponents("rgb");
            return {
              r: rgbComps[0],
              g: rgbComps[1],
              b: rgbComps[2],
              a: rgbComps[3]
            };
          }
        }
        const className$b = ClassName("colp");
        class ColorPickerView {
          constructor(doc, config) {
            this.alphaViews_ = null;
            this.element = doc.createElement("div");
            this.element.classList.add(className$b());
            const hsvElem = doc.createElement("div");
            hsvElem.classList.add(className$b("hsv"));
            const svElem = doc.createElement("div");
            svElem.classList.add(className$b("sv"));
            this.svPaletteView_ = config.svPaletteView;
            svElem.appendChild(this.svPaletteView_.element);
            hsvElem.appendChild(svElem);
            const hElem = doc.createElement("div");
            hElem.classList.add(className$b("h"));
            this.hPaletteView_ = config.hPaletteView;
            hElem.appendChild(this.hPaletteView_.element);
            hsvElem.appendChild(hElem);
            this.element.appendChild(hsvElem);
            const rgbElem = doc.createElement("div");
            rgbElem.classList.add(className$b("rgb"));
            this.textView_ = config.textView;
            rgbElem.appendChild(this.textView_.element);
            this.element.appendChild(rgbElem);
            if (config.alphaViews) {
              this.alphaViews_ = {
                palette: config.alphaViews.palette,
                text: config.alphaViews.text
              };
              const aElem = doc.createElement("div");
              aElem.classList.add(className$b("a"));
              const apElem = doc.createElement("div");
              apElem.classList.add(className$b("ap"));
              apElem.appendChild(this.alphaViews_.palette.element);
              aElem.appendChild(apElem);
              const atElem = doc.createElement("div");
              atElem.classList.add(className$b("at"));
              atElem.appendChild(this.alphaViews_.text.element);
              aElem.appendChild(atElem);
              this.element.appendChild(aElem);
            }
          }
          get allFocusableElements() {
            const elems = [
              this.svPaletteView_.element,
              this.hPaletteView_.element,
              this.textView_.modeSelectElement,
              ...this.textView_.textViews.map((v) => v.inputElement)
            ];
            if (this.alphaViews_) {
              elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
            }
            return elems;
          }
        }
        function parseColorInputParams(params) {
          const p = ParamsParsers;
          return parseParams(params, {
            alpha: p.optional.boolean,
            expanded: p.optional.boolean,
            picker: p.optional.custom(parsePickerLayout)
          });
        }
        function getBaseStepForColor(forAlpha) {
          return forAlpha ? 0.1 : 1;
        }
        function parseCssNumberOrPercentage(text, maxValue) {
          const m = text.match(/^(.+)%$/);
          if (!m) {
            return Math.min(parseFloat(text), maxValue);
          }
          return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
        }
        const ANGLE_TO_DEG_MAP = {
          deg: (angle) => angle,
          grad: (angle) => angle * 360 / 400,
          rad: (angle) => angle * 360 / (2 * Math.PI),
          turn: (angle) => angle * 360
        };
        function parseCssNumberOrAngle(text) {
          const m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
          if (!m) {
            return parseFloat(text);
          }
          const angle = parseFloat(m[1]);
          const unit = m[2];
          return ANGLE_TO_DEG_MAP[unit](angle);
        }
        const NOTATION_TO_PARSER_MAP = {
          "func.rgb": (text) => {
            const m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            const comps = [
              parseCssNumberOrPercentage(m[1], 255),
              parseCssNumberOrPercentage(m[2], 255),
              parseCssNumberOrPercentage(m[3], 255)
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
              return null;
            }
            return new Color(comps, "rgb");
          },
          "func.rgba": (text) => {
            const m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            const comps = [
              parseCssNumberOrPercentage(m[1], 255),
              parseCssNumberOrPercentage(m[2], 255),
              parseCssNumberOrPercentage(m[3], 255),
              parseCssNumberOrPercentage(m[4], 1)
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
              return null;
            }
            return new Color(comps, "rgb");
          },
          "func.hsl": (text) => {
            const m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            const comps = [
              parseCssNumberOrAngle(m[1]),
              parseCssNumberOrPercentage(m[2], 100),
              parseCssNumberOrPercentage(m[3], 100)
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
              return null;
            }
            return new Color(comps, "hsl");
          },
          "func.hsla": (text) => {
            const m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            const comps = [
              parseCssNumberOrAngle(m[1]),
              parseCssNumberOrPercentage(m[2], 100),
              parseCssNumberOrPercentage(m[3], 100),
              parseCssNumberOrPercentage(m[4], 1)
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
              return null;
            }
            return new Color(comps, "hsl");
          },
          "hex.rgb": (text) => {
            const mRrggbb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRrggbb) {
              return new Color([
                parseInt(mRrggbb[1] + mRrggbb[1], 16),
                parseInt(mRrggbb[2] + mRrggbb[2], 16),
                parseInt(mRrggbb[3] + mRrggbb[3], 16)
              ], "rgb");
            }
            const mRgb = text.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRgb) {
              return new Color([parseInt(mRgb[1], 16), parseInt(mRgb[2], 16), parseInt(mRgb[3], 16)], "rgb");
            }
            return null;
          },
          "hex.rgba": (text) => {
            const mRrggbb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRrggbb) {
              return new Color([
                parseInt(mRrggbb[1] + mRrggbb[1], 16),
                parseInt(mRrggbb[2] + mRrggbb[2], 16),
                parseInt(mRrggbb[3] + mRrggbb[3], 16),
                mapRange(parseInt(mRrggbb[4] + mRrggbb[4], 16), 0, 255, 0, 1)
              ], "rgb");
            }
            const mRgb = text.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRgb) {
              return new Color([
                parseInt(mRgb[1], 16),
                parseInt(mRgb[2], 16),
                parseInt(mRgb[3], 16),
                mapRange(parseInt(mRgb[4], 16), 0, 255, 0, 1)
              ], "rgb");
            }
            return null;
          }
        };
        function getColorNotation(text) {
          const notations = Object.keys(NOTATION_TO_PARSER_MAP);
          return notations.reduce((result, notation) => {
            if (result) {
              return result;
            }
            const subparser = NOTATION_TO_PARSER_MAP[notation];
            return subparser(text) ? notation : null;
          }, null);
        }
        const CompositeColorParser = (text) => {
          const notation = getColorNotation(text);
          return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
        };
        function hasAlphaComponent(notation) {
          return notation === "func.hsla" || notation === "func.rgba" || notation === "hex.rgba";
        }
        function colorFromString(value) {
          if (typeof value === "string") {
            const cv = CompositeColorParser(value);
            if (cv) {
              return cv;
            }
          }
          return Color.black();
        }
        function zerofill(comp) {
          const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
          return hex.length === 1 ? `0${hex}` : hex;
        }
        function colorToHexRgbString(value) {
          const hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
          return `#${hexes}`;
        }
        function colorToHexRgbaString(value) {
          const rgbaComps = value.getComponents("rgb");
          const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
          return `#${hexes}`;
        }
        function colorToFunctionalRgbString(value) {
          const formatter = createNumberFormatter(0);
          const comps = removeAlphaComponent(value.getComponents("rgb")).map((comp) => formatter(comp));
          return `rgb(${comps.join(", ")})`;
        }
        function colorToFunctionalRgbaString(value) {
          const aFormatter = createNumberFormatter(2);
          const rgbFormatter = createNumberFormatter(0);
          const comps = value.getComponents("rgb").map((comp, index) => {
            const formatter = index === 3 ? aFormatter : rgbFormatter;
            return formatter(comp);
          });
          return `rgba(${comps.join(", ")})`;
        }
        function colorToFunctionalHslString(value) {
          const formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage
          ];
          const comps = removeAlphaComponent(value.getComponents("hsl")).map((comp, index) => formatters[index](comp));
          return `hsl(${comps.join(", ")})`;
        }
        function colorToFunctionalHslaString(value) {
          const formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage,
            createNumberFormatter(2)
          ];
          const comps = value.getComponents("hsl").map((comp, index) => formatters[index](comp));
          return `hsla(${comps.join(", ")})`;
        }
        const NOTATION_TO_STRINGIFIER_MAP = {
          "func.hsl": colorToFunctionalHslString,
          "func.hsla": colorToFunctionalHslaString,
          "func.rgb": colorToFunctionalRgbString,
          "func.rgba": colorToFunctionalRgbaString,
          "hex.rgb": colorToHexRgbString,
          "hex.rgba": colorToHexRgbaString
        };
        function getColorStringifier(notation) {
          return NOTATION_TO_STRINGIFIER_MAP[notation];
        }
        const className$a = ClassName("apl");
        class APaletteView {
          constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$a());
            config.viewProps.bindTabIndex(this.element);
            const barElem = doc.createElement("div");
            barElem.classList.add(className$a("b"));
            this.element.appendChild(barElem);
            const colorElem = doc.createElement("div");
            colorElem.classList.add(className$a("c"));
            barElem.appendChild(colorElem);
            this.colorElem_ = colorElem;
            const markerElem = doc.createElement("div");
            markerElem.classList.add(className$a("m"));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            const previewElem = doc.createElement("div");
            previewElem.classList.add(className$a("p"));
            this.markerElem_.appendChild(previewElem);
            this.previewElem_ = previewElem;
            this.update_();
          }
          update_() {
            const c = this.value.rawValue;
            const rgbaComps = c.getComponents("rgb");
            const leftColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], "rgb");
            const rightColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], "rgb");
            const gradientComps = [
              "to right",
              colorToFunctionalRgbaString(leftColor),
              colorToFunctionalRgbaString(rightColor)
            ];
            this.colorElem_.style.background = `linear-gradient(${gradientComps.join(",")})`;
            this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
            const left = mapRange(rgbaComps[3], 0, 1, 0, 100);
            this.markerElem_.style.left = `${left}%`;
          }
          onValueChange_() {
            this.update_();
          }
        }
        class APaletteController {
          constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new APaletteView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on("down", this.onPointerDown_);
            this.ptHandler_.emitter.on("move", this.onPointerMove_);
            this.ptHandler_.emitter.on("up", this.onPointerUp_);
            this.view.element.addEventListener("keydown", this.onKeyDown_);
          }
          handlePointerEvent_(d) {
            if (!d.point) {
              return;
            }
            const alpha = d.point.x / d.bounds.width;
            const c = this.value.rawValue;
            const [h, s, v] = c.getComponents("hsv");
            this.value.rawValue = new Color([h, s, v, alpha], "hsv");
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onKeyDown_(ev) {
            const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            const c = this.value.rawValue;
            const [h, s, v, a] = c.getComponents("hsv");
            this.value.rawValue = new Color([h, s, v, a + step], "hsv");
          }
        }
        const className$9 = ClassName("coltxt");
        function createModeSelectElement(doc) {
          const selectElem = doc.createElement("select");
          const items = [
            { text: "RGB", value: "rgb" },
            { text: "HSL", value: "hsl" },
            { text: "HSV", value: "hsv" }
          ];
          selectElem.appendChild(items.reduce((frag, item) => {
            const optElem = doc.createElement("option");
            optElem.textContent = item.text;
            optElem.value = item.value;
            frag.appendChild(optElem);
            return frag;
          }, doc.createDocumentFragment()));
          return selectElem;
        }
        class ColorTextView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$9());
            const modeElem = doc.createElement("div");
            modeElem.classList.add(className$9("m"));
            this.modeElem_ = createModeSelectElement(doc);
            this.modeElem_.classList.add(className$9("ms"));
            modeElem.appendChild(this.modeSelectElement);
            const modeMarkerElem = doc.createElement("div");
            modeMarkerElem.classList.add(className$9("mm"));
            modeMarkerElem.appendChild(createSvgIconElement(doc, "dropdown"));
            modeElem.appendChild(modeMarkerElem);
            this.element.appendChild(modeElem);
            const textsElem = doc.createElement("div");
            textsElem.classList.add(className$9("w"));
            this.element.appendChild(textsElem);
            this.textsElem_ = textsElem;
            this.textViews_ = config.textViews;
            this.applyTextViews_();
            bindValue(config.colorMode, (mode) => {
              this.modeElem_.value = mode;
            });
          }
          get modeSelectElement() {
            return this.modeElem_;
          }
          get textViews() {
            return this.textViews_;
          }
          set textViews(textViews) {
            this.textViews_ = textViews;
            this.applyTextViews_();
          }
          applyTextViews_() {
            removeChildElements(this.textsElem_);
            const doc = this.element.ownerDocument;
            this.textViews_.forEach((v) => {
              const compElem = doc.createElement("div");
              compElem.classList.add(className$9("c"));
              compElem.appendChild(v.element);
              this.textsElem_.appendChild(compElem);
            });
          }
        }
        const FORMATTER = createNumberFormatter(0);
        const MODE_TO_CONSTRAINT_MAP = {
          rgb: () => {
            return new RangeConstraint({ min: 0, max: 255 });
          },
          hsl: (index) => {
            return index === 0 ? new RangeConstraint({ min: 0, max: 360 }) : new RangeConstraint({ min: 0, max: 100 });
          },
          hsv: (index) => {
            return index === 0 ? new RangeConstraint({ min: 0, max: 360 }) : new RangeConstraint({ min: 0, max: 100 });
          }
        };
        function createComponentController(doc, config, index) {
          return new NumberTextController(doc, {
            arrayPosition: index === 0 ? "fst" : index === 3 - 1 ? "lst" : "mid",
            baseStep: getBaseStepForColor(false),
            parser: config.parser,
            props: ValueMap.fromObject({
              draggingScale: 1,
              formatter: FORMATTER
            }),
            value: createValue(0, {
              constraint: MODE_TO_CONSTRAINT_MAP[config.colorMode](index)
            }),
            viewProps: config.viewProps
          });
        }
        class ColorTextController {
          constructor(doc, config) {
            this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
            this.parser_ = config.parser;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.colorMode = createValue(this.value.rawValue.mode);
            this.ccs_ = this.createComponentControllers_(doc);
            this.view = new ColorTextView(doc, {
              colorMode: this.colorMode,
              textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view]
            });
            this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_);
          }
          createComponentControllers_(doc) {
            const cc = {
              colorMode: this.colorMode.rawValue,
              parser: this.parser_,
              viewProps: this.viewProps
            };
            const ccs = [
              createComponentController(doc, cc, 0),
              createComponentController(doc, cc, 1),
              createComponentController(doc, cc, 2)
            ];
            ccs.forEach((cs, index) => {
              connectValues({
                primary: this.value,
                secondary: cs.value,
                forward: (p) => {
                  return p.rawValue.getComponents(this.colorMode.rawValue)[index];
                },
                backward: (p, s) => {
                  const pickedMode = this.colorMode.rawValue;
                  const comps = p.rawValue.getComponents(pickedMode);
                  comps[index] = s.rawValue;
                  return new Color(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode);
                }
              });
            });
            return ccs;
          }
          onModeSelectChange_(ev) {
            const selectElem = ev.currentTarget;
            this.colorMode.rawValue = selectElem.value;
            this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
            this.view.textViews = [
              this.ccs_[0].view,
              this.ccs_[1].view,
              this.ccs_[2].view
            ];
          }
        }
        const className$8 = ClassName("hpl");
        class HPaletteView {
          constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$8());
            config.viewProps.bindTabIndex(this.element);
            const colorElem = doc.createElement("div");
            colorElem.classList.add(className$8("c"));
            this.element.appendChild(colorElem);
            const markerElem = doc.createElement("div");
            markerElem.classList.add(className$8("m"));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
          }
          update_() {
            const c = this.value.rawValue;
            const [h] = c.getComponents("hsv");
            this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color([h, 100, 100], "hsv"));
            const left = mapRange(h, 0, 360, 0, 100);
            this.markerElem_.style.left = `${left}%`;
          }
          onValueChange_() {
            this.update_();
          }
        }
        class HPaletteController {
          constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new HPaletteView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on("down", this.onPointerDown_);
            this.ptHandler_.emitter.on("move", this.onPointerMove_);
            this.ptHandler_.emitter.on("up", this.onPointerUp_);
            this.view.element.addEventListener("keydown", this.onKeyDown_);
          }
          handlePointerEvent_(d) {
            if (!d.point) {
              return;
            }
            const hue = mapRange(d.point.x, 0, d.bounds.width, 0, 360);
            const c = this.value.rawValue;
            const [, s, v, a] = c.getComponents("hsv");
            this.value.rawValue = new Color([hue, s, v, a], "hsv");
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onKeyDown_(ev) {
            const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            const c = this.value.rawValue;
            const [h, s, v, a] = c.getComponents("hsv");
            this.value.rawValue = new Color([h + step, s, v, a], "hsv");
          }
        }
        const className$7 = ClassName("svp");
        const CANVAS_RESOL = 64;
        class SvPaletteView {
          constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$7());
            config.viewProps.bindTabIndex(this.element);
            const canvasElem = doc.createElement("canvas");
            canvasElem.height = CANVAS_RESOL;
            canvasElem.width = CANVAS_RESOL;
            canvasElem.classList.add(className$7("c"));
            this.element.appendChild(canvasElem);
            this.canvasElement = canvasElem;
            const markerElem = doc.createElement("div");
            markerElem.classList.add(className$7("m"));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
          }
          update_() {
            const ctx = getCanvasContext(this.canvasElement);
            if (!ctx) {
              return;
            }
            const c = this.value.rawValue;
            const hsvComps = c.getComponents("hsv");
            const width = this.canvasElement.width;
            const height = this.canvasElement.height;
            const imgData = ctx.getImageData(0, 0, width, height);
            const data = imgData.data;
            for (let iy = 0; iy < height; iy++) {
              for (let ix = 0; ix < width; ix++) {
                const s = mapRange(ix, 0, width, 0, 100);
                const v = mapRange(iy, 0, height, 100, 0);
                const rgbComps = hsvToRgb(hsvComps[0], s, v);
                const i = (iy * width + ix) * 4;
                data[i] = rgbComps[0];
                data[i + 1] = rgbComps[1];
                data[i + 2] = rgbComps[2];
                data[i + 3] = 255;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            const left = mapRange(hsvComps[1], 0, 100, 0, 100);
            this.markerElem_.style.left = `${left}%`;
            const top = mapRange(hsvComps[2], 0, 100, 100, 0);
            this.markerElem_.style.top = `${top}%`;
          }
          onValueChange_() {
            this.update_();
          }
        }
        class SvPaletteController {
          constructor(doc, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new SvPaletteView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on("down", this.onPointerDown_);
            this.ptHandler_.emitter.on("move", this.onPointerMove_);
            this.ptHandler_.emitter.on("up", this.onPointerUp_);
            this.view.element.addEventListener("keydown", this.onKeyDown_);
          }
          handlePointerEvent_(d) {
            if (!d.point) {
              return;
            }
            const saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
            const value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
            const [h, , , a] = this.value.rawValue.getComponents("hsv");
            this.value.rawValue = new Color([h, saturation, value, a], "hsv");
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onKeyDown_(ev) {
            if (isArrowKey(ev.key)) {
              ev.preventDefault();
            }
            const [h, s, v, a] = this.value.rawValue.getComponents("hsv");
            const baseStep = getBaseStepForColor(false);
            this.value.rawValue = new Color([
              h,
              s + getStepForKey(baseStep, getHorizontalStepKeys(ev)),
              v + getStepForKey(baseStep, getVerticalStepKeys(ev)),
              a
            ], "hsv");
          }
        }
        class ColorPickerController {
          constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.hPaletteC_ = new HPaletteController(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.svPaletteC_ = new SvPaletteController(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.alphaIcs_ = config.supportsAlpha ? {
              palette: new APaletteController(doc, {
                value: this.value,
                viewProps: this.viewProps
              }),
              text: new NumberTextController(doc, {
                parser: parseNumber,
                baseStep: 0.1,
                props: ValueMap.fromObject({
                  draggingScale: 0.01,
                  formatter: createNumberFormatter(2)
                }),
                value: createValue(0, {
                  constraint: new RangeConstraint({ min: 0, max: 1 })
                }),
                viewProps: this.viewProps
              })
            } : null;
            if (this.alphaIcs_) {
              connectValues({
                primary: this.value,
                secondary: this.alphaIcs_.text.value,
                forward: (p) => {
                  return p.rawValue.getComponents()[3];
                },
                backward: (p, s) => {
                  const comps = p.rawValue.getComponents();
                  comps[3] = s.rawValue;
                  return new Color(comps, p.rawValue.mode);
                }
              });
            }
            this.textC_ = new ColorTextController(doc, {
              parser: parseNumber,
              value: this.value,
              viewProps: this.viewProps
            });
            this.view = new ColorPickerView(doc, {
              alphaViews: this.alphaIcs_ ? {
                palette: this.alphaIcs_.palette.view,
                text: this.alphaIcs_.text.view
              } : null,
              hPaletteView: this.hPaletteC_.view,
              supportsAlpha: config.supportsAlpha,
              svPaletteView: this.svPaletteC_.view,
              textView: this.textC_.view
            });
          }
          get textController() {
            return this.textC_;
          }
        }
        const className$6 = ClassName("colsw");
        class ColorSwatchView {
          constructor(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            config.value.emitter.on("change", this.onValueChange_);
            this.value = config.value;
            this.element = doc.createElement("div");
            this.element.classList.add(className$6());
            config.viewProps.bindClassModifiers(this.element);
            const swatchElem = doc.createElement("div");
            swatchElem.classList.add(className$6("sw"));
            this.element.appendChild(swatchElem);
            this.swatchElem_ = swatchElem;
            const buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$6("b"));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            this.update_();
          }
          update_() {
            const value = this.value.rawValue;
            this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
          }
          onValueChange_() {
            this.update_();
          }
        }
        class ColorSwatchController {
          constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new ColorSwatchView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
          }
        }
        class ColorController {
          constructor(doc, config) {
            this.onButtonBlur_ = this.onButtonBlur_.bind(this);
            this.onButtonClick_ = this.onButtonClick_.bind(this);
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = Foldable.create(config.expanded);
            this.swatchC_ = new ColorSwatchController(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            const buttonElem = this.swatchC_.view.buttonElement;
            buttonElem.addEventListener("blur", this.onButtonBlur_);
            buttonElem.addEventListener("click", this.onButtonClick_);
            this.textC_ = new TextController(doc, {
              parser: config.parser,
              props: ValueMap.fromObject({
                formatter: config.formatter
              }),
              value: this.value,
              viewProps: this.viewProps
            });
            this.view = new ColorView(doc, {
              foldable: this.foldable_,
              pickerLayout: config.pickerLayout
            });
            this.view.swatchElement.appendChild(this.swatchC_.view.element);
            this.view.textElement.appendChild(this.textC_.view.element);
            this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
              viewProps: this.viewProps
            }) : null;
            const pickerC = new ColorPickerController(doc, {
              supportsAlpha: config.supportsAlpha,
              value: this.value,
              viewProps: this.viewProps
            });
            pickerC.view.allFocusableElements.forEach((elem) => {
              elem.addEventListener("blur", this.onPopupChildBlur_);
              elem.addEventListener("keydown", this.onPopupChildKeydown_);
            });
            this.pickerC_ = pickerC;
            if (this.popC_) {
              this.view.element.appendChild(this.popC_.view.element);
              this.popC_.view.element.appendChild(pickerC.view.element);
              connectValues({
                primary: this.foldable_.value("expanded"),
                secondary: this.popC_.shows,
                forward: (p) => p.rawValue,
                backward: (_, s) => s.rawValue
              });
            } else if (this.view.pickerElement) {
              this.view.pickerElement.appendChild(this.pickerC_.view.element);
              bindFoldable(this.foldable_, this.view.pickerElement);
            }
          }
          get textController() {
            return this.textC_;
          }
          onButtonBlur_(e) {
            if (!this.popC_) {
              return;
            }
            const elem = this.view.element;
            const nextTarget = forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
              this.popC_.shows.rawValue = false;
            }
          }
          onButtonClick_() {
            this.foldable_.set("expanded", !this.foldable_.get("expanded"));
            if (this.foldable_.get("expanded")) {
              this.pickerC_.view.allFocusableElements[0].focus();
            }
          }
          onPopupChildBlur_(ev) {
            if (!this.popC_) {
              return;
            }
            const elem = this.popC_.view.element;
            const nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
              return;
            }
            if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
              return;
            }
            this.popC_.shows.rawValue = false;
          }
          onPopupChildKeydown_(ev) {
            if (this.popC_) {
              if (ev.key === "Escape") {
                this.popC_.shows.rawValue = false;
              }
            } else if (this.view.pickerElement) {
              if (ev.key === "Escape") {
                this.swatchC_.view.buttonElement.focus();
              }
            }
          }
        }
        function colorFromObject(value) {
          if (Color.isColorObject(value)) {
            return Color.fromObject(value);
          }
          return Color.black();
        }
        function colorToRgbNumber(value) {
          return removeAlphaComponent(value.getComponents("rgb")).reduce((result, comp) => {
            return result << 8 | Math.floor(comp) & 255;
          }, 0);
        }
        function colorToRgbaNumber(value) {
          return value.getComponents("rgb").reduce((result, comp, index) => {
            const hex = Math.floor(index === 3 ? comp * 255 : comp) & 255;
            return result << 8 | hex;
          }, 0) >>> 0;
        }
        function numberToRgbColor(num) {
          return new Color([num >> 16 & 255, num >> 8 & 255, num & 255], "rgb");
        }
        function numberToRgbaColor(num) {
          return new Color([
            num >> 24 & 255,
            num >> 16 & 255,
            num >> 8 & 255,
            mapRange(num & 255, 0, 255, 0, 1)
          ], "rgb");
        }
        function colorFromRgbNumber(value) {
          if (typeof value !== "number") {
            return Color.black();
          }
          return numberToRgbColor(value);
        }
        function colorFromRgbaNumber(value) {
          if (typeof value !== "number") {
            return Color.black();
          }
          return numberToRgbaColor(value);
        }
        function createColorStringWriter(notation) {
          const stringify = getColorStringifier(notation);
          return (target, value) => {
            writePrimitive(target, stringify(value));
          };
        }
        function createColorNumberWriter(supportsAlpha) {
          const colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
          return (target, value) => {
            writePrimitive(target, colorToNumber(value));
          };
        }
        function writeRgbaColorObject(target, value) {
          const obj = value.toRgbaObject();
          target.writeProperty("r", obj.r);
          target.writeProperty("g", obj.g);
          target.writeProperty("b", obj.b);
          target.writeProperty("a", obj.a);
        }
        function writeRgbColorObject(target, value) {
          const obj = value.toRgbaObject();
          target.writeProperty("r", obj.r);
          target.writeProperty("g", obj.g);
          target.writeProperty("b", obj.b);
        }
        function createColorObjectWriter(supportsAlpha) {
          return supportsAlpha ? writeRgbaColorObject : writeRgbColorObject;
        }
        function shouldSupportAlpha$1(inputParams) {
          return "alpha" in inputParams && inputParams.alpha === true;
        }
        const NumberColorInputPlugin = {
          id: "input-color-number",
          type: "input",
          accept: (value, params) => {
            if (typeof value !== "number") {
              return null;
            }
            if (!("view" in params)) {
              return null;
            }
            if (params.view !== "color") {
              return null;
            }
            const result = parseColorInputParams(params);
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (args) => {
              return shouldSupportAlpha$1(args.params) ? colorFromRgbaNumber : colorFromRgbNumber;
            },
            equals: Color.equals,
            writer: (args) => {
              return createColorNumberWriter(shouldSupportAlpha$1(args.params));
            }
          },
          controller: (args) => {
            const supportsAlpha = shouldSupportAlpha$1(args.params);
            const expanded = "expanded" in args.params ? args.params.expanded : void 0;
            const picker = "picker" in args.params ? args.params.picker : void 0;
            const formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
            return new ColorController(args.document, {
              expanded: expanded !== null && expanded !== void 0 ? expanded : false,
              formatter,
              parser: CompositeColorParser,
              pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
              supportsAlpha,
              value: args.value,
              viewProps: args.viewProps
            });
          }
        };
        function shouldSupportAlpha(initialValue) {
          return Color.isRgbaColorObject(initialValue);
        }
        const ObjectColorInputPlugin = {
          id: "input-color-object",
          type: "input",
          accept: (value, params) => {
            if (!Color.isColorObject(value)) {
              return null;
            }
            const result = parseColorInputParams(params);
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => colorFromObject,
            equals: Color.equals,
            writer: (args) => createColorObjectWriter(shouldSupportAlpha(args.initialValue))
          },
          controller: (args) => {
            const supportsAlpha = Color.isRgbaColorObject(args.initialValue);
            const expanded = "expanded" in args.params ? args.params.expanded : void 0;
            const picker = "picker" in args.params ? args.params.picker : void 0;
            const formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
            return new ColorController(args.document, {
              expanded: expanded !== null && expanded !== void 0 ? expanded : false,
              formatter,
              parser: CompositeColorParser,
              pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
              supportsAlpha,
              value: args.value,
              viewProps: args.viewProps
            });
          }
        };
        const StringColorInputPlugin = {
          id: "input-color-string",
          type: "input",
          accept: (value, params) => {
            if (typeof value !== "string") {
              return null;
            }
            if ("view" in params && params.view === "text") {
              return null;
            }
            const notation = getColorNotation(value);
            if (!notation) {
              return null;
            }
            const result = parseColorInputParams(params);
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => colorFromString,
            equals: Color.equals,
            writer: (args) => {
              const notation = getColorNotation(args.initialValue);
              if (!notation) {
                throw TpError.shouldNeverHappen();
              }
              return createColorStringWriter(notation);
            }
          },
          controller: (args) => {
            const notation = getColorNotation(args.initialValue);
            if (!notation) {
              throw TpError.shouldNeverHappen();
            }
            const stringifier = getColorStringifier(notation);
            const expanded = "expanded" in args.params ? args.params.expanded : void 0;
            const picker = "picker" in args.params ? args.params.picker : void 0;
            return new ColorController(args.document, {
              expanded: expanded !== null && expanded !== void 0 ? expanded : false,
              formatter: stringifier,
              parser: CompositeColorParser,
              pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
              supportsAlpha: hasAlphaComponent(notation),
              value: args.value,
              viewProps: args.viewProps
            });
          }
        };
        class PointNdConstraint {
          constructor(config) {
            this.components = config.components;
            this.asm_ = config.assembly;
          }
          constrain(value) {
            const comps = this.asm_.toComponents(value).map((comp, index) => {
              var _a, _b;
              return (_b = (_a = this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
            });
            return this.asm_.fromComponents(comps);
          }
        }
        const className$5 = ClassName("pndtxt");
        class PointNdTextView {
          constructor(doc, config) {
            this.textViews = config.textViews;
            this.element = doc.createElement("div");
            this.element.classList.add(className$5());
            this.textViews.forEach((v) => {
              const axisElem = doc.createElement("div");
              axisElem.classList.add(className$5("a"));
              axisElem.appendChild(v.element);
              this.element.appendChild(axisElem);
            });
          }
        }
        function createAxisController(doc, config, index) {
          return new NumberTextController(doc, {
            arrayPosition: index === 0 ? "fst" : index === config.axes.length - 1 ? "lst" : "mid",
            baseStep: config.axes[index].baseStep,
            parser: config.parser,
            props: config.axes[index].textProps,
            value: createValue(0, {
              constraint: config.axes[index].constraint
            }),
            viewProps: config.viewProps
          });
        }
        class PointNdTextController {
          constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.acs_ = config.axes.map((_, index) => createAxisController(doc, config, index));
            this.acs_.forEach((c, index) => {
              connectValues({
                primary: this.value,
                secondary: c.value,
                forward: (p) => {
                  return config.assembly.toComponents(p.rawValue)[index];
                },
                backward: (p, s) => {
                  const comps = config.assembly.toComponents(p.rawValue);
                  comps[index] = s.rawValue;
                  return config.assembly.fromComponents(comps);
                }
              });
            });
            this.view = new PointNdTextView(doc, {
              textViews: this.acs_.map((ac) => ac.view)
            });
          }
        }
        function createStepConstraint(params) {
          if ("step" in params && !isEmpty(params.step)) {
            return new StepConstraint(params.step);
          }
          return null;
        }
        function createRangeConstraint(params) {
          if ("max" in params && !isEmpty(params.max) || "min" in params && !isEmpty(params.min)) {
            return new RangeConstraint({
              max: params.max,
              min: params.min
            });
          }
          return null;
        }
        function createConstraint$4(params) {
          const constraints = [];
          const sc = createStepConstraint(params);
          if (sc) {
            constraints.push(sc);
          }
          const rc = createRangeConstraint(params);
          if (rc) {
            constraints.push(rc);
          }
          const lc = createListConstraint(params.options);
          if (lc) {
            constraints.push(lc);
          }
          return new CompositeConstraint(constraints);
        }
        function findRange(constraint) {
          const c = constraint ? findConstraint(constraint, RangeConstraint) : null;
          if (!c) {
            return [void 0, void 0];
          }
          return [c.minValue, c.maxValue];
        }
        function estimateSuitableRange(constraint) {
          const [min, max] = findRange(constraint);
          return [min !== null && min !== void 0 ? min : 0, max !== null && max !== void 0 ? max : 100];
        }
        const NumberInputPlugin = {
          id: "input-number",
          type: "input",
          accept: (value, params) => {
            if (typeof value !== "number") {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              format: p.optional.function,
              max: p.optional.number,
              min: p.optional.number,
              options: p.optional.custom(parseListOptions),
              step: p.optional.number
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => numberFromUnknown,
            constraint: (args) => createConstraint$4(args.params),
            writer: (_args) => writePrimitive
          },
          controller: (args) => {
            var _a, _b;
            const value = args.value;
            const c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) {
              return new ListController(args.document, {
                props: ValueMap.fromObject({
                  options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value,
                viewProps: args.viewProps
              });
            }
            const formatter = (_b = "format" in args.params ? args.params.format : void 0) !== null && _b !== void 0 ? _b : createNumberFormatter(getSuitableDecimalDigits(c, value.rawValue));
            if (c && findConstraint(c, RangeConstraint)) {
              const [min, max] = estimateSuitableRange(c);
              return new SliderTextController(args.document, {
                baseStep: getBaseStep(c),
                parser: parseNumber,
                sliderProps: ValueMap.fromObject({
                  maxValue: max,
                  minValue: min
                }),
                textProps: ValueMap.fromObject({
                  draggingScale: getSuitableDraggingScale(c, value.rawValue),
                  formatter
                }),
                value,
                viewProps: args.viewProps
              });
            }
            return new NumberTextController(args.document, {
              baseStep: getBaseStep(c),
              parser: parseNumber,
              props: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(c, value.rawValue),
                formatter
              }),
              value,
              viewProps: args.viewProps
            });
          }
        };
        class Point2d {
          constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
          }
          getComponents() {
            return [this.x, this.y];
          }
          static isObject(obj) {
            if (isEmpty(obj)) {
              return false;
            }
            const x = obj.x;
            const y = obj.y;
            if (typeof x !== "number" || typeof y !== "number") {
              return false;
            }
            return true;
          }
          static equals(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y;
          }
          toObject() {
            return {
              x: this.x,
              y: this.y
            };
          }
        }
        const Point2dAssembly = {
          toComponents: (p) => p.getComponents(),
          fromComponents: (comps) => new Point2d(...comps)
        };
        const className$4 = ClassName("p2d");
        class Point2dView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$4());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.expanded, valueToClassName(this.element, className$4(void 0, "expanded")));
            const headElem = doc.createElement("div");
            headElem.classList.add(className$4("h"));
            this.element.appendChild(headElem);
            const buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$4("b"));
            buttonElem.appendChild(createSvgIconElement(doc, "p2dpad"));
            config.viewProps.bindDisabled(buttonElem);
            headElem.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const textElem = doc.createElement("div");
            textElem.classList.add(className$4("t"));
            headElem.appendChild(textElem);
            this.textElement = textElem;
            if (config.pickerLayout === "inline") {
              const pickerElem = doc.createElement("div");
              pickerElem.classList.add(className$4("p"));
              this.element.appendChild(pickerElem);
              this.pickerElement = pickerElem;
            } else {
              this.pickerElement = null;
            }
          }
        }
        const className$3 = ClassName("p2dp");
        class Point2dPickerView {
          constructor(doc, config) {
            this.onFoldableChange_ = this.onFoldableChange_.bind(this);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.invertsY_ = config.invertsY;
            this.maxValue_ = config.maxValue;
            this.element = doc.createElement("div");
            this.element.classList.add(className$3());
            if (config.layout === "popup") {
              this.element.classList.add(className$3(void 0, "p"));
            }
            const padElem = doc.createElement("div");
            padElem.classList.add(className$3("p"));
            config.viewProps.bindTabIndex(padElem);
            this.element.appendChild(padElem);
            this.padElement = padElem;
            const svgElem = doc.createElementNS(SVG_NS, "svg");
            svgElem.classList.add(className$3("g"));
            this.padElement.appendChild(svgElem);
            this.svgElem_ = svgElem;
            const xAxisElem = doc.createElementNS(SVG_NS, "line");
            xAxisElem.classList.add(className$3("ax"));
            xAxisElem.setAttributeNS(null, "x1", "0");
            xAxisElem.setAttributeNS(null, "y1", "50%");
            xAxisElem.setAttributeNS(null, "x2", "100%");
            xAxisElem.setAttributeNS(null, "y2", "50%");
            this.svgElem_.appendChild(xAxisElem);
            const yAxisElem = doc.createElementNS(SVG_NS, "line");
            yAxisElem.classList.add(className$3("ax"));
            yAxisElem.setAttributeNS(null, "x1", "50%");
            yAxisElem.setAttributeNS(null, "y1", "0");
            yAxisElem.setAttributeNS(null, "x2", "50%");
            yAxisElem.setAttributeNS(null, "y2", "100%");
            this.svgElem_.appendChild(yAxisElem);
            const lineElem = doc.createElementNS(SVG_NS, "line");
            lineElem.classList.add(className$3("l"));
            lineElem.setAttributeNS(null, "x1", "50%");
            lineElem.setAttributeNS(null, "y1", "50%");
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            const markerElem = doc.createElement("div");
            markerElem.classList.add(className$3("m"));
            this.padElement.appendChild(markerElem);
            this.markerElem_ = markerElem;
            config.value.emitter.on("change", this.onValueChange_);
            this.value = config.value;
            this.update_();
          }
          get allFocusableElements() {
            return [this.padElement];
          }
          update_() {
            const [x, y] = this.value.rawValue.getComponents();
            const max = this.maxValue_;
            const px = mapRange(x, -max, +max, 0, 100);
            const py = mapRange(y, -max, +max, 0, 100);
            const ipy = this.invertsY_ ? 100 - py : py;
            this.lineElem_.setAttributeNS(null, "x2", `${px}%`);
            this.lineElem_.setAttributeNS(null, "y2", `${ipy}%`);
            this.markerElem_.style.left = `${px}%`;
            this.markerElem_.style.top = `${ipy}%`;
          }
          onValueChange_() {
            this.update_();
          }
          onFoldableChange_() {
            this.update_();
          }
        }
        class Point2dPickerController {
          constructor(doc, config) {
            this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.baseSteps_ = config.baseSteps;
            this.maxValue_ = config.maxValue;
            this.invertsY_ = config.invertsY;
            this.view = new Point2dPickerView(doc, {
              invertsY: this.invertsY_,
              layout: config.layout,
              maxValue: this.maxValue_,
              value: this.value,
              viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.padElement);
            this.ptHandler_.emitter.on("down", this.onPointerDown_);
            this.ptHandler_.emitter.on("move", this.onPointerMove_);
            this.ptHandler_.emitter.on("up", this.onPointerUp_);
            this.view.padElement.addEventListener("keydown", this.onPadKeyDown_);
          }
          handlePointerEvent_(d) {
            if (!d.point) {
              return;
            }
            const max = this.maxValue_;
            const px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
            const py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
            this.value.rawValue = new Point2d(px, py);
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data);
          }
          onPadKeyDown_(ev) {
            if (isArrowKey(ev.key)) {
              ev.preventDefault();
            }
            this.value.rawValue = new Point2d(this.value.rawValue.x + getStepForKey(this.baseSteps_[0], getHorizontalStepKeys(ev)), this.value.rawValue.y + getStepForKey(this.baseSteps_[1], getVerticalStepKeys(ev)) * (this.invertsY_ ? 1 : -1));
          }
        }
        class Point2dController {
          constructor(doc, config) {
            var _a, _b;
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
            this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = Foldable.create(config.expanded);
            this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
              viewProps: this.viewProps
            }) : null;
            const padC = new Point2dPickerController(doc, {
              baseSteps: [config.axes[0].baseStep, config.axes[1].baseStep],
              invertsY: config.invertsY,
              layout: config.pickerLayout,
              maxValue: config.maxValue,
              value: this.value,
              viewProps: this.viewProps
            });
            padC.view.allFocusableElements.forEach((elem) => {
              elem.addEventListener("blur", this.onPopupChildBlur_);
              elem.addEventListener("keydown", this.onPopupChildKeydown_);
            });
            this.pickerC_ = padC;
            this.textC_ = new PointNdTextController(doc, {
              assembly: Point2dAssembly,
              axes: config.axes,
              parser: config.parser,
              value: this.value,
              viewProps: this.viewProps
            });
            this.view = new Point2dView(doc, {
              expanded: this.foldable_.value("expanded"),
              pickerLayout: config.pickerLayout,
              viewProps: this.viewProps
            });
            this.view.textElement.appendChild(this.textC_.view.element);
            (_a = this.view.buttonElement) === null || _a === void 0 ? void 0 : _a.addEventListener("blur", this.onPadButtonBlur_);
            (_b = this.view.buttonElement) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.onPadButtonClick_);
            if (this.popC_) {
              this.view.element.appendChild(this.popC_.view.element);
              this.popC_.view.element.appendChild(this.pickerC_.view.element);
              connectValues({
                primary: this.foldable_.value("expanded"),
                secondary: this.popC_.shows,
                forward: (p) => p.rawValue,
                backward: (_, s) => s.rawValue
              });
            } else if (this.view.pickerElement) {
              this.view.pickerElement.appendChild(this.pickerC_.view.element);
              bindFoldable(this.foldable_, this.view.pickerElement);
            }
          }
          onPadButtonBlur_(e) {
            if (!this.popC_) {
              return;
            }
            const elem = this.view.element;
            const nextTarget = forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
              this.popC_.shows.rawValue = false;
            }
          }
          onPadButtonClick_() {
            this.foldable_.set("expanded", !this.foldable_.get("expanded"));
            if (this.foldable_.get("expanded")) {
              this.pickerC_.view.allFocusableElements[0].focus();
            }
          }
          onPopupChildBlur_(ev) {
            if (!this.popC_) {
              return;
            }
            const elem = this.popC_.view.element;
            const nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
              return;
            }
            if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
              return;
            }
            this.popC_.shows.rawValue = false;
          }
          onPopupChildKeydown_(ev) {
            if (this.popC_) {
              if (ev.key === "Escape") {
                this.popC_.shows.rawValue = false;
              }
            } else if (this.view.pickerElement) {
              if (ev.key === "Escape") {
                this.view.buttonElement.focus();
              }
            }
          }
        }
        function point2dFromUnknown(value) {
          return Point2d.isObject(value) ? new Point2d(value.x, value.y) : new Point2d();
        }
        function writePoint2d(target, value) {
          target.writeProperty("x", value.x);
          target.writeProperty("y", value.y);
        }
        function createDimensionConstraint$2(params) {
          if (!params) {
            return void 0;
          }
          const constraints = [];
          if (!isEmpty(params.step)) {
            constraints.push(new StepConstraint(params.step));
          }
          if (!isEmpty(params.max) || !isEmpty(params.min)) {
            constraints.push(new RangeConstraint({
              max: params.max,
              min: params.min
            }));
          }
          return new CompositeConstraint(constraints);
        }
        function createConstraint$3(params) {
          return new PointNdConstraint({
            assembly: Point2dAssembly,
            components: [
              createDimensionConstraint$2("x" in params ? params.x : void 0),
              createDimensionConstraint$2("y" in params ? params.y : void 0)
            ]
          });
        }
        function getSuitableMaxDimensionValue(constraint, rawValue) {
          const rc = constraint && findConstraint(constraint, RangeConstraint);
          if (rc) {
            return Math.max(Math.abs(rc.minValue || 0), Math.abs(rc.maxValue || 0));
          }
          const step = getBaseStep(constraint);
          return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
        }
        function getSuitableMaxValue(initialValue, constraint) {
          const xc = constraint instanceof PointNdConstraint ? constraint.components[0] : void 0;
          const yc = constraint instanceof PointNdConstraint ? constraint.components[1] : void 0;
          const xr = getSuitableMaxDimensionValue(xc, initialValue.x);
          const yr = getSuitableMaxDimensionValue(yc, initialValue.y);
          return Math.max(xr, yr);
        }
        function createAxis$2(initialValue, constraint) {
          return {
            baseStep: getBaseStep(constraint),
            constraint,
            textProps: ValueMap.fromObject({
              draggingScale: getSuitableDraggingScale(constraint, initialValue),
              formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
            })
          };
        }
        function shouldInvertY(params) {
          if (!("y" in params)) {
            return false;
          }
          const yParams = params.y;
          if (!yParams) {
            return false;
          }
          return "inverted" in yParams ? !!yParams.inverted : false;
        }
        const Point2dInputPlugin = {
          id: "input-point2d",
          type: "input",
          accept: (value, params) => {
            if (!Point2d.isObject(value)) {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              expanded: p.optional.boolean,
              picker: p.optional.custom(parsePickerLayout),
              x: p.optional.custom(parsePointDimensionParams),
              y: p.optional.object({
                inverted: p.optional.boolean,
                max: p.optional.number,
                min: p.optional.number,
                step: p.optional.number
              })
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => point2dFromUnknown,
            constraint: (args) => createConstraint$3(args.params),
            equals: Point2d.equals,
            writer: (_args) => writePoint2d
          },
          controller: (args) => {
            const doc = args.document;
            const value = args.value;
            const c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
              throw TpError.shouldNeverHappen();
            }
            const expanded = "expanded" in args.params ? args.params.expanded : void 0;
            const picker = "picker" in args.params ? args.params.picker : void 0;
            return new Point2dController(doc, {
              axes: [
                createAxis$2(value.rawValue.x, c.components[0]),
                createAxis$2(value.rawValue.y, c.components[1])
              ],
              expanded: expanded !== null && expanded !== void 0 ? expanded : false,
              invertsY: shouldInvertY(args.params),
              maxValue: getSuitableMaxValue(value.rawValue, c),
              parser: parseNumber,
              pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
              value,
              viewProps: args.viewProps
            });
          }
        };
        class Point3d {
          constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
          }
          getComponents() {
            return [this.x, this.y, this.z];
          }
          static isObject(obj) {
            if (isEmpty(obj)) {
              return false;
            }
            const x = obj.x;
            const y = obj.y;
            const z = obj.z;
            if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
              return false;
            }
            return true;
          }
          static equals(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
          }
          toObject() {
            return {
              x: this.x,
              y: this.y,
              z: this.z
            };
          }
        }
        const Point3dAssembly = {
          toComponents: (p) => p.getComponents(),
          fromComponents: (comps) => new Point3d(...comps)
        };
        function point3dFromUnknown(value) {
          return Point3d.isObject(value) ? new Point3d(value.x, value.y, value.z) : new Point3d();
        }
        function writePoint3d(target, value) {
          target.writeProperty("x", value.x);
          target.writeProperty("y", value.y);
          target.writeProperty("z", value.z);
        }
        function createDimensionConstraint$1(params) {
          if (!params) {
            return void 0;
          }
          const constraints = [];
          if (!isEmpty(params.step)) {
            constraints.push(new StepConstraint(params.step));
          }
          if (!isEmpty(params.max) || !isEmpty(params.min)) {
            constraints.push(new RangeConstraint({
              max: params.max,
              min: params.min
            }));
          }
          return new CompositeConstraint(constraints);
        }
        function createConstraint$2(params) {
          return new PointNdConstraint({
            assembly: Point3dAssembly,
            components: [
              createDimensionConstraint$1("x" in params ? params.x : void 0),
              createDimensionConstraint$1("y" in params ? params.y : void 0),
              createDimensionConstraint$1("z" in params ? params.z : void 0)
            ]
          });
        }
        function createAxis$1(initialValue, constraint) {
          return {
            baseStep: getBaseStep(constraint),
            constraint,
            textProps: ValueMap.fromObject({
              draggingScale: getSuitableDraggingScale(constraint, initialValue),
              formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
            })
          };
        }
        const Point3dInputPlugin = {
          id: "input-point3d",
          type: "input",
          accept: (value, params) => {
            if (!Point3d.isObject(value)) {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              x: p.optional.custom(parsePointDimensionParams),
              y: p.optional.custom(parsePointDimensionParams),
              z: p.optional.custom(parsePointDimensionParams)
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => point3dFromUnknown,
            constraint: (args) => createConstraint$2(args.params),
            equals: Point3d.equals,
            writer: (_args) => writePoint3d
          },
          controller: (args) => {
            const value = args.value;
            const c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
              throw TpError.shouldNeverHappen();
            }
            return new PointNdTextController(args.document, {
              assembly: Point3dAssembly,
              axes: [
                createAxis$1(value.rawValue.x, c.components[0]),
                createAxis$1(value.rawValue.y, c.components[1]),
                createAxis$1(value.rawValue.z, c.components[2])
              ],
              parser: parseNumber,
              value,
              viewProps: args.viewProps
            });
          }
        };
        class Point4d {
          constructor(x = 0, y = 0, z = 0, w = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
          }
          getComponents() {
            return [this.x, this.y, this.z, this.w];
          }
          static isObject(obj) {
            if (isEmpty(obj)) {
              return false;
            }
            const x = obj.x;
            const y = obj.y;
            const z = obj.z;
            const w = obj.w;
            if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number" || typeof w !== "number") {
              return false;
            }
            return true;
          }
          static equals(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
          }
          toObject() {
            return {
              x: this.x,
              y: this.y,
              z: this.z,
              w: this.w
            };
          }
        }
        const Point4dAssembly = {
          toComponents: (p) => p.getComponents(),
          fromComponents: (comps) => new Point4d(...comps)
        };
        function point4dFromUnknown(value) {
          return Point4d.isObject(value) ? new Point4d(value.x, value.y, value.z, value.w) : new Point4d();
        }
        function writePoint4d(target, value) {
          target.writeProperty("x", value.x);
          target.writeProperty("y", value.y);
          target.writeProperty("z", value.z);
          target.writeProperty("w", value.w);
        }
        function createDimensionConstraint(params) {
          if (!params) {
            return void 0;
          }
          const constraints = [];
          if (!isEmpty(params.step)) {
            constraints.push(new StepConstraint(params.step));
          }
          if (!isEmpty(params.max) || !isEmpty(params.min)) {
            constraints.push(new RangeConstraint({
              max: params.max,
              min: params.min
            }));
          }
          return new CompositeConstraint(constraints);
        }
        function createConstraint$1(params) {
          return new PointNdConstraint({
            assembly: Point4dAssembly,
            components: [
              createDimensionConstraint("x" in params ? params.x : void 0),
              createDimensionConstraint("y" in params ? params.y : void 0),
              createDimensionConstraint("z" in params ? params.z : void 0),
              createDimensionConstraint("w" in params ? params.w : void 0)
            ]
          });
        }
        function createAxis(initialValue, constraint) {
          return {
            baseStep: getBaseStep(constraint),
            constraint,
            textProps: ValueMap.fromObject({
              draggingScale: getSuitableDraggingScale(constraint, initialValue),
              formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
            })
          };
        }
        const Point4dInputPlugin = {
          id: "input-point4d",
          type: "input",
          accept: (value, params) => {
            if (!Point4d.isObject(value)) {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              x: p.optional.custom(parsePointDimensionParams),
              y: p.optional.custom(parsePointDimensionParams),
              z: p.optional.custom(parsePointDimensionParams),
              w: p.optional.custom(parsePointDimensionParams)
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => point4dFromUnknown,
            constraint: (args) => createConstraint$1(args.params),
            equals: Point4d.equals,
            writer: (_args) => writePoint4d
          },
          controller: (args) => {
            const value = args.value;
            const c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
              throw TpError.shouldNeverHappen();
            }
            return new PointNdTextController(args.document, {
              assembly: Point4dAssembly,
              axes: value.rawValue.getComponents().map((comp, index) => createAxis(comp, c.components[index])),
              parser: parseNumber,
              value,
              viewProps: args.viewProps
            });
          }
        };
        function createConstraint(params) {
          const constraints = [];
          const lc = createListConstraint(params.options);
          if (lc) {
            constraints.push(lc);
          }
          return new CompositeConstraint(constraints);
        }
        const StringInputPlugin = {
          id: "input-string",
          type: "input",
          accept: (value, params) => {
            if (typeof value !== "string") {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              options: p.optional.custom(parseListOptions)
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => stringFromUnknown,
            constraint: (args) => createConstraint(args.params),
            writer: (_args) => writePrimitive
          },
          controller: (args) => {
            var _a;
            const doc = args.document;
            const value = args.value;
            const c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) {
              return new ListController(doc, {
                props: ValueMap.fromObject({
                  options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value,
                viewProps: args.viewProps
              });
            }
            return new TextController(doc, {
              parser: (v) => v,
              props: ValueMap.fromObject({
                formatter: formatString
              }),
              value,
              viewProps: args.viewProps
            });
          }
        };
        const Constants = {
          monitor: {
            defaultInterval: 200,
            defaultLineCount: 3
          }
        };
        const className$2 = ClassName("mll");
        class MultiLogView {
          constructor(doc, config) {
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement("div");
            this.element.classList.add(className$2());
            config.viewProps.bindClassModifiers(this.element);
            const textareaElem = doc.createElement("textarea");
            textareaElem.classList.add(className$2("i"));
            textareaElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
            textareaElem.readOnly = true;
            config.viewProps.bindDisabled(textareaElem);
            this.element.appendChild(textareaElem);
            this.textareaElem_ = textareaElem;
            config.value.emitter.on("change", this.onValueUpdate_);
            this.value = config.value;
            this.update_();
          }
          update_() {
            const elem = this.textareaElem_;
            const shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
            const lines = [];
            this.value.rawValue.forEach((value) => {
              if (value !== void 0) {
                lines.push(this.formatter_(value));
              }
            });
            elem.textContent = lines.join("\n");
            if (shouldScroll) {
              elem.scrollTop = elem.scrollHeight;
            }
          }
          onValueUpdate_() {
            this.update_();
          }
        }
        class MultiLogController {
          constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new MultiLogView(doc, {
              formatter: config.formatter,
              lineCount: config.lineCount,
              value: this.value,
              viewProps: this.viewProps
            });
          }
        }
        const className$1 = ClassName("sgl");
        class SingleLogView {
          constructor(doc, config) {
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement("div");
            this.element.classList.add(className$1());
            config.viewProps.bindClassModifiers(this.element);
            const inputElem = doc.createElement("input");
            inputElem.classList.add(className$1("i"));
            inputElem.readOnly = true;
            inputElem.type = "text";
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElem_ = inputElem;
            config.value.emitter.on("change", this.onValueUpdate_);
            this.value = config.value;
            this.update_();
          }
          update_() {
            const values = this.value.rawValue;
            const lastValue = values[values.length - 1];
            this.inputElem_.value = lastValue !== void 0 ? this.formatter_(lastValue) : "";
          }
          onValueUpdate_() {
            this.update_();
          }
        }
        class SingleLogController {
          constructor(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new SingleLogView(doc, {
              formatter: config.formatter,
              value: this.value,
              viewProps: this.viewProps
            });
          }
        }
        const BooleanMonitorPlugin = {
          id: "monitor-bool",
          type: "monitor",
          accept: (value, params) => {
            if (typeof value !== "boolean") {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              lineCount: p.optional.number
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => boolFromUnknown
          },
          controller: (args) => {
            var _a;
            if (args.value.rawValue.length === 1) {
              return new SingleLogController(args.document, {
                formatter: BooleanFormatter,
                value: args.value,
                viewProps: args.viewProps
              });
            }
            return new MultiLogController(args.document, {
              formatter: BooleanFormatter,
              lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
              value: args.value,
              viewProps: args.viewProps
            });
          }
        };
        class GraphCursor {
          constructor() {
            this.emitter = new Emitter();
            this.index_ = -1;
          }
          get index() {
            return this.index_;
          }
          set index(index) {
            const changed = this.index_ !== index;
            if (changed) {
              this.index_ = index;
              this.emitter.emit("change", {
                index,
                sender: this
              });
            }
          }
        }
        const className = ClassName("grl");
        class GraphLogView {
          constructor(doc, config) {
            this.onCursorChange_ = this.onCursorChange_.bind(this);
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.element = doc.createElement("div");
            this.element.classList.add(className());
            config.viewProps.bindClassModifiers(this.element);
            this.formatter_ = config.formatter;
            this.minValue_ = config.minValue;
            this.maxValue_ = config.maxValue;
            this.cursor_ = config.cursor;
            this.cursor_.emitter.on("change", this.onCursorChange_);
            const svgElem = doc.createElementNS(SVG_NS, "svg");
            svgElem.classList.add(className("g"));
            svgElem.style.height = `calc(var(--bld-us) * ${config.lineCount})`;
            this.element.appendChild(svgElem);
            this.svgElem_ = svgElem;
            const lineElem = doc.createElementNS(SVG_NS, "polyline");
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            const tooltipElem = doc.createElement("div");
            tooltipElem.classList.add(className("t"), ClassName("tt")());
            this.element.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on("change", this.onValueUpdate_);
            this.value = config.value;
            this.update_();
          }
          get graphElement() {
            return this.svgElem_;
          }
          update_() {
            const bounds = this.svgElem_.getBoundingClientRect();
            const maxIndex = this.value.rawValue.length - 1;
            const min = this.minValue_;
            const max = this.maxValue_;
            const points = [];
            this.value.rawValue.forEach((v, index) => {
              if (v === void 0) {
                return;
              }
              const x = mapRange(index, 0, maxIndex, 0, bounds.width);
              const y = mapRange(v, min, max, bounds.height, 0);
              points.push([x, y].join(","));
            });
            this.lineElem_.setAttributeNS(null, "points", points.join(" "));
            const tooltipElem = this.tooltipElem_;
            const value = this.value.rawValue[this.cursor_.index];
            if (value === void 0) {
              tooltipElem.classList.remove(className("t", "a"));
              return;
            }
            const tx = mapRange(this.cursor_.index, 0, maxIndex, 0, bounds.width);
            const ty = mapRange(value, min, max, bounds.height, 0);
            tooltipElem.style.left = `${tx}px`;
            tooltipElem.style.top = `${ty}px`;
            tooltipElem.textContent = `${this.formatter_(value)}`;
            if (!tooltipElem.classList.contains(className("t", "a"))) {
              tooltipElem.classList.add(className("t", "a"), className("t", "in"));
              forceReflow(tooltipElem);
              tooltipElem.classList.remove(className("t", "in"));
            }
          }
          onValueUpdate_() {
            this.update_();
          }
          onCursorChange_() {
            this.update_();
          }
        }
        class GraphLogController {
          constructor(doc, config) {
            this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
            this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
            this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
            this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
            this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.cursor_ = new GraphCursor();
            this.view = new GraphLogView(doc, {
              cursor: this.cursor_,
              formatter: config.formatter,
              lineCount: config.lineCount,
              maxValue: config.maxValue,
              minValue: config.minValue,
              value: this.value,
              viewProps: this.viewProps
            });
            if (!supportsTouch(doc)) {
              this.view.element.addEventListener("mousemove", this.onGraphMouseMove_);
              this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
            } else {
              const ph = new PointerHandler(this.view.element);
              ph.emitter.on("down", this.onGraphPointerDown_);
              ph.emitter.on("move", this.onGraphPointerMove_);
              ph.emitter.on("up", this.onGraphPointerUp_);
            }
          }
          onGraphMouseLeave_() {
            this.cursor_.index = -1;
          }
          onGraphMouseMove_(ev) {
            const bounds = this.view.element.getBoundingClientRect();
            this.cursor_.index = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
          }
          onGraphPointerDown_(ev) {
            this.onGraphPointerMove_(ev);
          }
          onGraphPointerMove_(ev) {
            if (!ev.data.point) {
              this.cursor_.index = -1;
              return;
            }
            this.cursor_.index = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
          }
          onGraphPointerUp_() {
            this.cursor_.index = -1;
          }
        }
        function createFormatter() {
          return createNumberFormatter(2);
        }
        function createTextMonitor(args) {
          var _a;
          if (args.value.rawValue.length === 1) {
            return new SingleLogController(args.document, {
              formatter: createFormatter(),
              value: args.value,
              viewProps: args.viewProps
            });
          }
          return new MultiLogController(args.document, {
            formatter: createFormatter(),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            value: args.value,
            viewProps: args.viewProps
          });
        }
        function createGraphMonitor(args) {
          var _a, _b, _c;
          return new GraphLogController(args.document, {
            formatter: createFormatter(),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            maxValue: (_b = "max" in args.params ? args.params.max : null) !== null && _b !== void 0 ? _b : 100,
            minValue: (_c = "min" in args.params ? args.params.min : null) !== null && _c !== void 0 ? _c : 0,
            value: args.value,
            viewProps: args.viewProps
          });
        }
        function shouldShowGraph(params) {
          return "view" in params && params.view === "graph";
        }
        const NumberMonitorPlugin = {
          id: "monitor-number",
          type: "monitor",
          accept: (value, params) => {
            if (typeof value !== "number") {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              lineCount: p.optional.number,
              max: p.optional.number,
              min: p.optional.number,
              view: p.optional.string
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            defaultBufferSize: (params) => shouldShowGraph(params) ? 64 : 1,
            reader: (_args) => numberFromUnknown
          },
          controller: (args) => {
            if (shouldShowGraph(args.params)) {
              return createGraphMonitor(args);
            }
            return createTextMonitor(args);
          }
        };
        const StringMonitorPlugin = {
          id: "monitor-string",
          type: "monitor",
          accept: (value, params) => {
            if (typeof value !== "string") {
              return null;
            }
            const p = ParamsParsers;
            const result = parseParams(params, {
              lineCount: p.optional.number,
              multiline: p.optional.boolean
            });
            return result ? {
              initialValue: value,
              params: result
            } : null;
          },
          binding: {
            reader: (_args) => stringFromUnknown
          },
          controller: (args) => {
            var _a;
            const value = args.value;
            const multiline = value.rawValue.length > 1 || "multiline" in args.params && args.params.multiline;
            if (multiline) {
              return new MultiLogController(args.document, {
                formatter: formatString,
                lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
                value,
                viewProps: args.viewProps
              });
            }
            return new SingleLogController(args.document, {
              formatter: formatString,
              value,
              viewProps: args.viewProps
            });
          }
        };
        class InputBinding {
          constructor(config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.reader = config.reader;
            this.writer = config.writer;
            this.emitter = new Emitter();
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.target = config.target;
            this.read();
          }
          read() {
            const targetValue = this.target.read();
            if (targetValue !== void 0) {
              this.value.rawValue = this.reader(targetValue);
            }
          }
          write_(rawValue) {
            this.writer(this.target, rawValue);
          }
          onValueChange_(ev) {
            this.write_(ev.rawValue);
            this.emitter.emit("change", {
              rawValue: ev.rawValue,
              sender: this
            });
          }
        }
        function createInputBindingController(plugin, args) {
          const result = plugin.accept(args.target.read(), args.params);
          if (isEmpty(result)) {
            return null;
          }
          const p = ParamsParsers;
          const valueArgs = {
            target: args.target,
            initialValue: result.initialValue,
            params: result.params
          };
          const reader = plugin.binding.reader(valueArgs);
          const constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : void 0;
          const value = createValue(reader(result.initialValue), {
            constraint,
            equals: plugin.binding.equals
          });
          const binding = new InputBinding({
            reader,
            target: args.target,
            value,
            writer: plugin.binding.writer(valueArgs)
          });
          const disabled = p.optional.boolean(args.params.disabled).value;
          const hidden = p.optional.boolean(args.params.hidden).value;
          const controller = plugin.controller({
            constraint,
            document: args.document,
            initialValue: result.initialValue,
            params: result.params,
            value: binding.value,
            viewProps: ViewProps.create({
              disabled,
              hidden
            })
          });
          const label = p.optional.string(args.params.label).value;
          return new InputBindingController(args.document, {
            binding,
            blade: createBlade(),
            props: ValueMap.fromObject({
              label: label || args.target.key
            }),
            valueController: controller
          });
        }
        class MonitorBinding {
          constructor(config) {
            this.onTick_ = this.onTick_.bind(this);
            this.reader_ = config.reader;
            this.target = config.target;
            this.emitter = new Emitter();
            this.value = config.value;
            this.ticker = config.ticker;
            this.ticker.emitter.on("tick", this.onTick_);
            this.read();
          }
          dispose() {
            this.ticker.dispose();
          }
          read() {
            const targetValue = this.target.read();
            if (targetValue === void 0) {
              return;
            }
            const buffer = this.value.rawValue;
            const newValue = this.reader_(targetValue);
            this.value.rawValue = createPushedBuffer(buffer, newValue);
            this.emitter.emit("update", {
              rawValue: newValue,
              sender: this
            });
          }
          onTick_(_) {
            this.read();
          }
        }
        class IntervalTicker {
          constructor(doc, interval) {
            this.disabled_ = false;
            this.timerId_ = null;
            this.onTick_ = this.onTick_.bind(this);
            this.doc_ = doc;
            this.emitter = new Emitter();
            this.interval_ = interval;
            this.setTimer_();
          }
          get disabled() {
            return this.disabled_;
          }
          set disabled(inactive) {
            this.disabled_ = inactive;
            if (this.disabled_) {
              this.clearTimer_();
            } else {
              this.setTimer_();
            }
          }
          dispose() {
            this.clearTimer_();
          }
          clearTimer_() {
            if (this.timerId_ === null) {
              return;
            }
            const win = this.doc_.defaultView;
            if (win) {
              win.clearInterval(this.timerId_);
            }
            this.timerId_ = null;
          }
          setTimer_() {
            this.clearTimer_();
            if (this.interval_ <= 0) {
              return;
            }
            const win = this.doc_.defaultView;
            if (win) {
              this.timerId_ = win.setInterval(this.onTick_, this.interval_);
            }
          }
          onTick_() {
            if (this.disabled_) {
              return;
            }
            this.emitter.emit("tick", {
              sender: this
            });
          }
        }
        function createTicker(document2, interval) {
          return interval === 0 ? new ManualTicker() : new IntervalTicker(document2, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
        }
        function createMonitorBindingController(plugin, args) {
          var _a, _b, _c;
          const P = ParamsParsers;
          const result = plugin.accept(args.target.read(), args.params);
          if (isEmpty(result)) {
            return null;
          }
          const bindingArgs = {
            target: args.target,
            initialValue: result.initialValue,
            params: result.params
          };
          const reader = plugin.binding.reader(bindingArgs);
          const bufferSize = (_b = (_a = P.optional.number(args.params.bufferSize).value) !== null && _a !== void 0 ? _a : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(result.params)) !== null && _b !== void 0 ? _b : 1;
          const interval = P.optional.number(args.params.interval).value;
          const binding = new MonitorBinding({
            reader,
            target: args.target,
            ticker: createTicker(args.document, interval),
            value: initializeBuffer(bufferSize)
          });
          const disabled = P.optional.boolean(args.params.disabled).value;
          const hidden = P.optional.boolean(args.params.hidden).value;
          const controller = plugin.controller({
            document: args.document,
            params: result.params,
            value: binding.value,
            viewProps: ViewProps.create({
              disabled,
              hidden
            })
          });
          const label = (_c = P.optional.string(args.params.label).value) !== null && _c !== void 0 ? _c : args.target.key;
          return new MonitorBindingController(args.document, {
            binding,
            blade: createBlade(),
            props: ValueMap.fromObject({
              label
            }),
            valueController: controller
          });
        }
        class PluginPool {
          constructor() {
            this.pluginsMap_ = {
              blades: [],
              inputs: [],
              monitors: []
            };
          }
          getAll() {
            return [
              ...this.pluginsMap_.blades,
              ...this.pluginsMap_.inputs,
              ...this.pluginsMap_.monitors
            ];
          }
          register(r) {
            if (r.type === "blade") {
              this.pluginsMap_.blades.unshift(r);
            } else if (r.type === "input") {
              this.pluginsMap_.inputs.unshift(r);
            } else if (r.type === "monitor") {
              this.pluginsMap_.monitors.unshift(r);
            }
          }
          createInput(document2, target, params) {
            const initialValue = target.read();
            if (isEmpty(initialValue)) {
              throw new TpError({
                context: {
                  key: target.key
                },
                type: "nomatchingcontroller"
              });
            }
            const bc = this.pluginsMap_.inputs.reduce((result, plugin) => result || createInputBindingController(plugin, {
              document: document2,
              target,
              params
            }), null);
            if (bc) {
              return bc;
            }
            throw new TpError({
              context: {
                key: target.key
              },
              type: "nomatchingcontroller"
            });
          }
          createMonitor(document2, target, params) {
            const bc = this.pluginsMap_.monitors.reduce((result, plugin) => result || createMonitorBindingController(plugin, {
              document: document2,
              params,
              target
            }), null);
            if (bc) {
              return bc;
            }
            throw new TpError({
              context: {
                key: target.key
              },
              type: "nomatchingcontroller"
            });
          }
          createBlade(document2, params) {
            const bc = this.pluginsMap_.blades.reduce((result, plugin) => result || createBladeController(plugin, {
              document: document2,
              params
            }), null);
            if (!bc) {
              throw new TpError({
                type: "nomatchingview",
                context: {
                  params
                }
              });
            }
            return bc;
          }
          createBladeApi(bc) {
            if (bc instanceof InputBindingController) {
              return new InputBindingApi(bc);
            }
            if (bc instanceof MonitorBindingController) {
              return new MonitorBindingApi(bc);
            }
            if (bc instanceof RackController) {
              return new RackApi(bc, this);
            }
            const api = this.pluginsMap_.blades.reduce((result, plugin) => result || plugin.api({
              controller: bc,
              pool: this
            }), null);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            return api;
          }
        }
        function createDefaultPluginPool() {
          const pool = new PluginPool();
          [
            Point2dInputPlugin,
            Point3dInputPlugin,
            Point4dInputPlugin,
            StringInputPlugin,
            NumberInputPlugin,
            StringColorInputPlugin,
            ObjectColorInputPlugin,
            NumberColorInputPlugin,
            BooleanInputPlugin,
            BooleanMonitorPlugin,
            StringMonitorPlugin,
            NumberMonitorPlugin,
            ButtonBladePlugin,
            FolderBladePlugin,
            SeparatorBladePlugin,
            TabBladePlugin
          ].forEach((p) => {
            pool.register(p);
          });
          return pool;
        }
        class ListApi extends BladeApi {
          constructor(controller) {
            super(controller);
            this.emitter_ = new Emitter();
            this.controller_.valueController.value.emitter.on("change", (ev) => {
              this.emitter_.emit("change", {
                event: new TpChangeEvent(this, ev.rawValue)
              });
            });
          }
          get label() {
            return this.controller_.props.get("label");
          }
          set label(label) {
            this.controller_.props.set("label", label);
          }
          get options() {
            return this.controller_.valueController.props.get("options");
          }
          set options(options) {
            this.controller_.valueController.props.set("options", options);
          }
          get value() {
            return this.controller_.valueController.value.rawValue;
          }
          set value(value) {
            this.controller_.valueController.value.rawValue = value;
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
        }
        class SliderApi extends BladeApi {
          constructor(controller) {
            super(controller);
            this.emitter_ = new Emitter();
            this.controller_.valueController.value.emitter.on("change", (ev) => {
              this.emitter_.emit("change", {
                event: new TpChangeEvent(this, ev.rawValue)
              });
            });
          }
          get label() {
            return this.controller_.props.get("label");
          }
          set label(label) {
            this.controller_.props.set("label", label);
          }
          get maxValue() {
            return this.controller_.valueController.sliderController.props.get("maxValue");
          }
          set maxValue(maxValue) {
            this.controller_.valueController.sliderController.props.set("maxValue", maxValue);
          }
          get minValue() {
            return this.controller_.valueController.sliderController.props.get("minValue");
          }
          set minValue(minValue) {
            this.controller_.valueController.sliderController.props.set("minValue", minValue);
          }
          get value() {
            return this.controller_.valueController.value.rawValue;
          }
          set value(value) {
            this.controller_.valueController.value.rawValue = value;
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
        }
        class TextApi extends BladeApi {
          constructor(controller) {
            super(controller);
            this.emitter_ = new Emitter();
            this.controller_.valueController.value.emitter.on("change", (ev) => {
              this.emitter_.emit("change", {
                event: new TpChangeEvent(this, ev.rawValue)
              });
            });
          }
          get label() {
            return this.controller_.props.get("label");
          }
          set label(label) {
            this.controller_.props.set("label", label);
          }
          get formatter() {
            return this.controller_.valueController.props.get("formatter");
          }
          set formatter(formatter) {
            this.controller_.valueController.props.set("formatter", formatter);
          }
          get value() {
            return this.controller_.valueController.value.rawValue;
          }
          set value(value) {
            this.controller_.valueController.value.rawValue = value;
          }
          on(eventName, handler) {
            const bh = handler.bind(this);
            this.emitter_.on(eventName, (ev) => {
              bh(ev.event);
            });
            return this;
          }
        }
        const ListBladePlugin = function() {
          return {
            id: "list",
            type: "blade",
            accept(params) {
              const p = ParamsParsers;
              const result = parseParams(params, {
                options: p.required.custom(parseListOptions),
                value: p.required.raw,
                view: p.required.constant("list"),
                label: p.optional.string
              });
              return result ? { params: result } : null;
            },
            controller(args) {
              const ic = new ListController(args.document, {
                props: ValueMap.fromObject({
                  options: normalizeListOptions(args.params.options)
                }),
                value: createValue(args.params.value),
                viewProps: args.viewProps
              });
              return new LabeledValueController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                  label: args.params.label
                }),
                valueController: ic
              });
            },
            api(args) {
              if (!(args.controller instanceof LabeledValueController)) {
                return null;
              }
              if (!(args.controller.valueController instanceof ListController)) {
                return null;
              }
              return new ListApi(args.controller);
            }
          };
        }();
        function exportPresetJson(targets) {
          return targets.reduce((result, target) => {
            return Object.assign(result, {
              [target.presetKey]: target.read()
            });
          }, {});
        }
        function importPresetJson(targets, preset) {
          targets.forEach((target) => {
            const value = preset[target.presetKey];
            if (value !== void 0) {
              target.write(value);
            }
          });
        }
        class RootApi extends FolderApi {
          constructor(controller, pool) {
            super(controller, pool);
          }
          get element() {
            return this.controller_.view.element;
          }
          importPreset(preset) {
            const targets = this.controller_.rackController.rack.find(InputBindingController).map((ibc) => {
              return ibc.binding.target;
            });
            importPresetJson(targets, preset);
            this.refresh();
          }
          exportPreset() {
            const targets = this.controller_.rackController.rack.find(InputBindingController).map((ibc) => {
              return ibc.binding.target;
            });
            return exportPresetJson(targets);
          }
          refresh() {
            this.controller_.rackController.rack.find(InputBindingController).forEach((ibc) => {
              ibc.binding.read();
            });
            this.controller_.rackController.rack.find(MonitorBindingController).forEach((mbc) => {
              mbc.binding.read();
            });
          }
        }
        class RootController extends FolderController {
          constructor(doc, config) {
            super(doc, {
              expanded: config.expanded,
              blade: config.blade,
              props: config.props,
              root: true,
              viewProps: config.viewProps
            });
          }
        }
        const SliderBladePlugin = {
          id: "slider",
          type: "blade",
          accept(params) {
            const p = ParamsParsers;
            const result = parseParams(params, {
              max: p.required.number,
              min: p.required.number,
              view: p.required.constant("slider"),
              format: p.optional.function,
              label: p.optional.string,
              value: p.optional.number
            });
            return result ? { params: result } : null;
          },
          controller(args) {
            var _a, _b;
            const v = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
            const vc = new SliderTextController(args.document, {
              baseStep: 1,
              parser: parseNumber,
              sliderProps: ValueMap.fromObject({
                maxValue: args.params.max,
                minValue: args.params.min
              }),
              textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(void 0, v),
                formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString
              }),
              value: createValue(v),
              viewProps: args.viewProps
            });
            return new LabeledValueController(args.document, {
              blade: args.blade,
              props: ValueMap.fromObject({
                label: args.params.label
              }),
              valueController: vc
            });
          },
          api(args) {
            if (!(args.controller instanceof LabeledValueController)) {
              return null;
            }
            if (!(args.controller.valueController instanceof SliderTextController)) {
              return null;
            }
            return new SliderApi(args.controller);
          }
        };
        const TextBladePlugin = function() {
          return {
            id: "text",
            type: "blade",
            accept(params) {
              const p = ParamsParsers;
              const result = parseParams(params, {
                parse: p.required.function,
                value: p.required.raw,
                view: p.required.constant("text"),
                format: p.optional.function,
                label: p.optional.string
              });
              return result ? { params: result } : null;
            },
            controller(args) {
              var _a;
              const ic = new TextController(args.document, {
                parser: args.params.parse,
                props: ValueMap.fromObject({
                  formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : (v) => String(v)
                }),
                value: createValue(args.params.value),
                viewProps: args.viewProps
              });
              return new LabeledValueController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                  label: args.params.label
                }),
                valueController: ic
              });
            },
            api(args) {
              if (!(args.controller instanceof LabeledValueController)) {
                return null;
              }
              if (!(args.controller.valueController instanceof TextController)) {
                return null;
              }
              return new TextApi(args.controller);
            }
          };
        }();
        function createDefaultWrapperElement(doc) {
          const elem = doc.createElement("div");
          elem.classList.add(ClassName("dfw")());
          if (doc.body) {
            doc.body.appendChild(elem);
          }
          return elem;
        }
        function embedStyle(doc, id, css) {
          if (doc.querySelector(`style[data-tp-style=${id}]`)) {
            return;
          }
          const styleElem = doc.createElement("style");
          styleElem.dataset.tpStyle = id;
          styleElem.textContent = css;
          doc.head.appendChild(styleElem);
        }
        class Pane2 extends RootApi {
          constructor(opt_config) {
            var _a;
            const config = opt_config || {};
            const doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
            const pool = createDefaultPluginPool();
            const rootController = new RootController(doc, {
              expanded: config.expanded,
              blade: createBlade(),
              props: ValueMap.fromObject({
                title: config.title
              }),
              viewProps: ViewProps.create()
            });
            super(rootController, pool);
            this.pool_ = pool;
            this.containerElem_ = config.container || createDefaultWrapperElement(doc);
            this.containerElem_.appendChild(this.element);
            this.doc_ = doc;
            this.usesDefaultWrapper_ = !config.container;
            this.setUpDefaultPlugins_();
          }
          get document() {
            if (!this.doc_) {
              throw TpError.alreadyDisposed();
            }
            return this.doc_;
          }
          dispose() {
            const containerElem = this.containerElem_;
            if (!containerElem) {
              throw TpError.alreadyDisposed();
            }
            if (this.usesDefaultWrapper_) {
              const parentElem = containerElem.parentElement;
              if (parentElem) {
                parentElem.removeChild(containerElem);
              }
            }
            this.containerElem_ = null;
            this.doc_ = null;
            super.dispose();
          }
          registerPlugin(bundle) {
            const plugins = "plugin" in bundle ? [bundle.plugin] : "plugins" in bundle ? bundle.plugins : [];
            plugins.forEach((p) => {
              this.pool_.register(p);
              this.embedPluginStyle_(p);
            });
          }
          embedPluginStyle_(plugin) {
            if (plugin.css) {
              embedStyle(this.document, `plugin-${plugin.id}`, plugin.css);
            }
          }
          setUpDefaultPlugins_() {
            embedStyle(this.document, "default", ".tp-lstv_s,.tp-btnv_b,.tp-p2dv_b,.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-fldv_b,.tp-rotv_b,.tp-ckbv_i,.tp-coltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dv_b:disabled{opacity:0.5}.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-colswv_sw:hover,.tp-p2dpv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-colswv_sw:focus,.tp-p2dpv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-colswv_sw:active,.tp-p2dpv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-colswv_sw:disabled,.tp-p2dpv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);width:100%}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, rgba(187,188,196,0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187,188,196,0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187,188,196,0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187,188,196,0.15));--cnt-fg: var(--tp-container-foreground-color, #bbbcc4);--in-bg: var(--tp-input-background-color, rgba(0,0,0,0.2));--in-bg-a: var(--tp-input-background-color-active, rgba(0,0,0,0.35));--in-bg-f: var(--tp-input-background-color-focus, rgba(0,0,0,0.3));--in-bg-h: var(--tp-input-background-color-hover, rgba(0,0,0,0.25));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(0,0,0,0.2))}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:calc(var(--cnt-h-p) + 8px);padding-right:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:'';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c,.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c{display:none}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-coltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-coltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-coltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-coltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-coltxtv_w,.tp-pndtxtv{display:flex}.tp-coltxtv_c,.tp-pndtxtv_a{width:100%}.tp-coltxtv_c+.tp-coltxtv_c,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:'';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-colswv.tp-v-disabled{opacity:0.5}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:'';display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv.tp-v-disabled .tp-lstv_s{opacity:0.5}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-us) * 3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:'';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:'';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}");
            this.pool_.getAll().forEach((plugin) => {
              this.embedPluginStyle_(plugin);
            });
            this.registerPlugin({
              plugins: [
                SliderBladePlugin,
                ListBladePlugin,
                TabBladePlugin,
                TextBladePlugin
              ]
            });
          }
        }
        const VERSION = new Semver("3.0.2");
        exports2.BladeApi = BladeApi;
        exports2.ButtonApi = ButtonApi;
        exports2.FolderApi = FolderApi;
        exports2.InputBindingApi = InputBindingApi;
        exports2.ListApi = ListApi;
        exports2.MonitorBindingApi = MonitorBindingApi;
        exports2.Pane = Pane2;
        exports2.SeparatorApi = SeparatorApi;
        exports2.SliderApi = SliderApi;
        exports2.TabApi = TabApi;
        exports2.TabPageApi = TabPageApi;
        exports2.TextApi = TextApi;
        exports2.TpChangeEvent = TpChangeEvent;
        exports2.VERSION = VERSION;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // ../phaser-genesis/src/config/const.ts
  var CONFIG_DEFAULTS = {
    AUTO: "Auto",
    BACKGROUND_COLOR: "BackgroundColor",
    BANNER: "Banner",
    BATCH_SIZE: "BatchSize",
    CANVAS_CONTEXT: "CanvasContext",
    CANVAS: "Canvas",
    DEFAULT_ORIGIN: "DefaultOrigin",
    GLOBAL_VAR: "GlobalVar",
    MAX_TEXTURES: "MaxTextures",
    PARENT: "Parent",
    RENDERER: "Renderer",
    SCENES: "Scenes",
    SIZE: "Size",
    WEBGL_CONTEXT: "WebGLContext",
    WEBGL: "WebGL",
    WORLD_SIZE: "WorldSize"
  };

  // ../phaser-genesis/src/config/ConfigStore.ts
  var ConfigStore = new Map();

  // ../phaser-genesis/src/config/backgroundcolor/SetBackgroundColor.ts
  function SetBackgroundColor(color) {
    ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
  }

  // ../phaser-genesis/src/config/backgroundcolor/BackgroundColor.ts
  function BackgroundColor(color) {
    return () => {
      SetBackgroundColor(color);
    };
  }

  // ../phaser-genesis/src/config/banner/SetBanner.ts
  function SetBanner(title = "", version = "", url = "", color = "#fff", background = "linear-gradient(#3e0081 40%, #00bcc3)") {
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, { title, version, url, color, background });
  }

  // ../phaser-genesis/src/config/batchsize/SetBatchSize.ts
  function SetBatchSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
  }

  // ../phaser-genesis/src/config/size/GetHeight.ts
  function GetHeight() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
  }

  // ../phaser-genesis/src/config/size/GetResolution.ts
  function GetResolution() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
  }

  // ../phaser-genesis/src/config/size/GetWidth.ts
  function GetWidth() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
  }

  // ../phaser-genesis/src/config/size/SetSize.ts
  function SetSize(width = 800, height = 600, resolution = 1) {
    if (resolution === 0) {
      resolution = window.devicePixelRatio;
    }
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width, height, resolution });
  }

  // ../phaser-genesis/src/renderer/BindingQueue.ts
  var queue = [];
  var BindingQueue = {
    add: (texture, glConfig) => {
      queue.push({ texture, glConfig });
    },
    get: () => {
      return queue;
    },
    clear: () => {
      queue.length = 0;
    }
  };

  // ../phaser-genesis/src/config/backgroundcolor/GetBackgroundColor.ts
  function GetBackgroundColor() {
    return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
  }

  // ../phaser-genesis/src/config/renderer/SetRenderer.ts
  function SetRenderer(renderer) {
    ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
  }

  // ../phaser-genesis/src/config/defaultorigin/SetDefaultOrigin.ts
  function SetDefaultOrigin(x = 0.5, y = x) {
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x, y });
  }

  // ../phaser-genesis/src/config/globalvar/SetGlobalVar.ts
  function SetGlobalVar(name) {
    ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
  }

  // ../phaser-genesis/src/config/globalvar/GlobalVar.ts
  function GlobalVar(name) {
    return () => {
      SetGlobalVar(name);
    };
  }

  // ../phaser-genesis/src/config/maxtextures/SetMaxTextures.ts
  function SetMaxTextures(max) {
    ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
  }

  // ../phaser-genesis/src/dom/GetElement.ts
  function GetElement(target) {
    let element;
    if (target) {
      if (typeof target === "string") {
        element = document.getElementById(target);
      } else if (typeof target === "object" && target.nodeType === 1) {
        element = target;
      }
    }
    if (!element) {
      element = document.body;
    }
    return element;
  }

  // ../phaser-genesis/src/config/parent/SetParent.ts
  function SetParent(parentElement) {
    if (parentElement) {
      ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
    }
  }

  // ../phaser-genesis/src/config/parent/Parent.ts
  function Parent(parentElement) {
    return () => {
      SetParent(parentElement);
    };
  }

  // ../phaser-genesis/src/config/scenes/SetScenes.ts
  function SetScenes(scenes) {
    ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
  }

  // ../phaser-genesis/src/config/scenes/Scenes.ts
  function Scenes(scenes) {
    return () => {
      SetScenes(scenes);
    };
  }

  // ../phaser-genesis/src/geom/rectangle/RectangleContains.ts
  function RectangleContains(rect, x, y) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
  }

  // ../phaser-genesis/src/geom/rectangle/Rectangle.ts
  var Rectangle = class {
    constructor(x = 0, y = 0, width = 0, height = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "width");
      __publicField(this, "height");
      this.set(x, y, width, height);
    }
    set(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      return this;
    }
    contains(x, y) {
      return RectangleContains(this, x, y);
    }
    set right(value) {
      if (value <= this.x) {
        this.width = 0;
      } else {
        this.width = value - this.x;
      }
    }
    get right() {
      return this.x + this.width;
    }
    set bottom(value) {
      if (value <= this.y) {
        this.height = 0;
      } else {
        this.height = value - this.y;
      }
    }
    get bottom() {
      return this.y + this.height;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/AddViewport.ts
  function AddViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const viewport = new Rectangle(x, y, width, height);
    renderPass.viewportStack.push(viewport);
    return viewport;
  }

  // ../phaser-genesis/src/renderer/webgl1/GL.ts
  var gl;
  var GL = {
    get: () => {
      return gl;
    },
    set: (context) => {
      gl = context;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindViewport.ts
  function BindViewport(renderPass, viewport) {
    if (!viewport) {
      viewport = renderPass.currentViewport;
      if (!viewport) {
        return;
      }
    }
    const glv = gl.getParameter(gl.VIEWPORT);
    if (glv[0] !== viewport.x || glv[1] !== viewport.y || glv[2] !== viewport.width || glv[3] !== viewport.height) {
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetViewport.ts
  function SetViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const entry = AddViewport(renderPass, x, y, width, height);
    BindViewport(renderPass, entry);
    renderPass.currentViewport = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindFramebuffer.ts
  function BindFramebuffer(renderPass, clear = true, entry) {
    if (!entry) {
      entry = renderPass.currentFramebuffer;
    }
    const { framebuffer, viewport } = entry;
    if (renderPass.currentFramebuffer.framebuffer !== framebuffer) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    }
    if (clear) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    if (viewport) {
      SetViewport(renderPass, viewport.x, viewport.y, viewport.width, viewport.height);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/PopViewport.ts
  function PopViewport(renderPass) {
    const stack = renderPass.viewportStack;
    if (stack.length > 1) {
      stack.pop();
    }
    renderPass.currentViewport = stack[stack.length - 1];
    BindViewport(renderPass);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/PopFramebuffer.ts
  function PopFramebuffer(renderPass) {
    const stack = renderPass.framebufferStack;
    if (stack.length > 1) {
      if (renderPass.currentFramebuffer.viewport) {
        PopViewport(renderPass);
      }
      stack.pop();
    }
    renderPass.currentFramebuffer = stack[stack.length - 1];
    BindFramebuffer(renderPass, false);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/AddFramebuffer.ts
  function AddFramebuffer(renderPass, framebuffer, viewport) {
    const entry = { framebuffer, viewport };
    renderPass.framebufferStack.push(entry);
    return entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetFramebuffer.ts
  function SetFramebuffer(renderPass, framebuffer, clear = true, viewport) {
    const entry = AddFramebuffer(renderPass, framebuffer, viewport);
    BindFramebuffer(renderPass, clear, entry);
    renderPass.currentFramebuffer = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Draw.ts
  function Draw(renderPass) {
    const count = renderPass.count;
    if (count === 0) {
      return;
    }
    const currentBuffer = renderPass.currentVertexBuffer;
    const currentShader = renderPass.currentShader;
    const renderToFramebuffer = currentShader.shader.renderToFramebuffer;
    if (renderToFramebuffer) {
      SetFramebuffer(renderPass, currentShader.shader.framebuffer, true);
    }
    if (count === currentBuffer.batchSize) {
      const type = currentBuffer.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
    } else {
      const subsize = currentBuffer.indexed ? count * currentBuffer.entryElementSize : count * currentBuffer.vertexElementSize;
      const view = currentBuffer.vertexViewF32.subarray(0, subsize);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    if (currentBuffer.indexed) {
      gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, count);
    }
    if (renderToFramebuffer) {
      PopFramebuffer(renderPass);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Flush.ts
  function Flush(renderPass, forceCount) {
    if (forceCount) {
      renderPass.count = forceCount;
    }
    const count = renderPass.count;
    if (count === 0) {
      return false;
    }
    Draw(renderPass);
    renderPass.prevCount = count;
    renderPass.count = 0;
    renderPass.flushTotal++;
    return true;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/End.ts
  function End(renderPass) {
    Flush(renderPass);
  }

  // ../phaser-genesis/src/renderer/webgl1/colors/GetRGBArray.ts
  function GetRGBArray(color, output = []) {
    const r = color >> 16 & 255;
    const g = color >> 8 & 255;
    const b = color & 255;
    const a = color > 16777215 ? color >>> 24 : 255;
    output[0] = r / 255;
    output[1] = g / 255;
    output[2] = b / 255;
    output[3] = a / 255;
    return output;
  }

  // ../phaser-genesis/src/config/webglcontext/GetWebGLContext.ts
  function GetWebGLContext() {
    return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/CreateGLTexture.ts
  function CreateGLTexture(binding) {
    const { parent, flipY, unpackPremultiplyAlpha, minFilter, magFilter, wrapS, wrapT, generateMipmap, isPOT } = binding;
    const source = parent.image;
    let width = parent.width;
    let height = parent.height;
    const glTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, unpackPremultiplyAlpha);
    if (source) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      width = source.width;
      height = source.height;
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    if (generateMipmap && isPOT) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    binding.texture = glTexture;
    return glTexture;
  }

  // ../phaser-genesis/src/renderer/webgl1/fbo/DeleteFramebuffer.ts
  function DeleteFramebuffer(framebuffer) {
    if (gl && gl.isFramebuffer(framebuffer)) {
      gl.deleteFramebuffer(framebuffer);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/DeleteGLTexture.ts
  function DeleteGLTexture(texture) {
    if (gl.isTexture(texture)) {
      gl.deleteTexture(texture);
    }
  }

  // ../phaser-genesis/src/math/pow2/IsSizePowerOfTwo.ts
  function IsSizePowerOfTwo(width, height) {
    if (width < 1 || height < 1) {
      return false;
    }
    return (width & width - 1) === 0 && (height & height - 1) === 0;
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/SetGLTextureFilterMode.ts
  function SetGLTextureFilterMode(texture, linear = true) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const mode = linear ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/UpdateGLTexture.ts
  function UpdateGLTexture(binding) {
    const source = binding.parent.image;
    const width = source.width;
    const height = source.height;
    if (width > 0 && height > 0) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, binding.flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    }
    return binding.texture;
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/GLTextureBinding.ts
  var GLTextureBinding = class {
    constructor(parent, config = {}) {
      __publicField(this, "parent");
      __publicField(this, "texture");
      __publicField(this, "framebuffer");
      __publicField(this, "depthbuffer");
      __publicField(this, "index", 0);
      __publicField(this, "indexCounter", -1);
      __publicField(this, "dirtyIndex", true);
      __publicField(this, "unpackPremultiplyAlpha", true);
      __publicField(this, "minFilter");
      __publicField(this, "magFilter");
      __publicField(this, "wrapS");
      __publicField(this, "wrapT");
      __publicField(this, "flipY", false);
      __publicField(this, "isPOT", false);
      __publicField(this, "generateMipmap", false);
      this.parent = parent;
      this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
      const {
        texture = null,
        framebuffer = null,
        depthbuffer = null,
        unpackPremultiplyAlpha = true,
        minFilter = this.isPOT ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
        magFilter = gl.LINEAR,
        wrapS = gl.CLAMP_TO_EDGE,
        wrapT = gl.CLAMP_TO_EDGE,
        generateMipmap = this.isPOT,
        flipY = false
      } = config;
      this.minFilter = minFilter;
      this.magFilter = magFilter;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.generateMipmap = generateMipmap;
      this.flipY = flipY;
      this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
      if (framebuffer) {
        this.framebuffer = framebuffer;
      }
      if (depthbuffer) {
        this.depthbuffer = depthbuffer;
      }
      if (texture) {
        this.texture = texture;
      } else {
        CreateGLTexture(this);
      }
    }
    setFilter(linear) {
      if (this.texture) {
        SetGLTextureFilterMode(this.texture, linear);
      }
    }
    create() {
      const texture = this.texture;
      if (texture) {
        DeleteGLTexture(texture);
      }
      return CreateGLTexture(this);
    }
    update() {
      const texture = this.texture;
      if (!texture) {
        return CreateGLTexture(this);
      } else {
        return UpdateGLTexture(this);
      }
    }
    setIndex(index) {
      this.dirtyIndex = index !== this.index;
      this.index = index;
    }
    destroy() {
      DeleteGLTexture(this.texture);
      DeleteFramebuffer(this.framebuffer);
      this.parent = null;
      this.texture = null;
      this.framebuffer = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/ProcessBindingQueue.ts
  function ProcessBindingQueue() {
    const queue2 = BindingQueue.get();
    queue2.forEach((entry) => {
      const { texture, glConfig } = entry;
      if (!texture.binding) {
        texture.binding = new GLTextureBinding(texture, glConfig);
      }
    });
    BindingQueue.clear();
  }

  // ../phaser-genesis/src/config/maxtextures/GetMaxTextures.ts
  function GetMaxTextures() {
    return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CheckShaderMaxIfStatements.ts
  var fragTemplate = [
    "precision mediump float;",
    "void main(void){",
    "float test = 0.1;",
    "%forloop%",
    "gl_FragColor = vec4(0.0);",
    "}"
  ].join("\n");
  function GenerateSrc(maxIfs) {
    let src = "";
    for (let i = 0; i < maxIfs; ++i) {
      if (i > 0) {
        src += "\nelse ";
      }
      if (i < maxIfs - 1) {
        src += `if(test == ${i}.0){}`;
      }
    }
    return src;
  }
  function CheckShaderMaxIfStatements(maxIfs) {
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    while (true) {
      const fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxIfs));
      gl.shaderSource(shader, fragmentSrc);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        maxIfs = maxIfs / 2 | 0;
      } else {
        break;
      }
    }
    return maxIfs;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/CreateTempTextures.ts
  function CreateTempTextures(renderPass) {
    let maxGPUTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
    const maxConfigTextures = GetMaxTextures();
    if (maxConfigTextures === 0 || maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures) {
      SetMaxTextures(maxGPUTextures);
    } else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures) {
      maxGPUTextures = Math.max(8, maxConfigTextures);
    }
    const tempTextures = renderPass.tempTextures;
    if (tempTextures.length) {
      tempTextures.forEach((texture) => {
        gl.deleteTexture(texture);
      });
    }
    const index = [];
    for (let texturesIndex = 0; texturesIndex < maxGPUTextures; texturesIndex++) {
      const tempTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + texturesIndex);
      gl.bindTexture(gl.TEXTURE_2D, tempTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      tempTextures[texturesIndex] = tempTexture;
      index.push(texturesIndex);
    }
    renderPass.maxTextures = maxGPUTextures;
    renderPass.textureIndex = index;
    renderPass.currentActiveTexture = 1;
  }

  // ../phaser-genesis/src/config/batchsize/GetBatchSize.ts
  function GetBatchSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
  }

  // ../phaser-genesis/src/renderer/webgl1/buffers/DeleteGLBuffer.ts
  function DeleteGLBuffer(buffer) {
    if (gl.isBuffer(buffer)) {
      gl.deleteBuffer(buffer);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/buffers/VertexBuffer.ts
  var VertexBuffer = class {
    constructor(config = {}) {
      __publicField(this, "batchSize");
      __publicField(this, "dataSize");
      __publicField(this, "vertexElementSize");
      __publicField(this, "vertexByteSize");
      __publicField(this, "entryByteSize");
      __publicField(this, "bufferByteSize");
      __publicField(this, "data");
      __publicField(this, "vertexViewF32");
      __publicField(this, "vertexViewU32");
      __publicField(this, "vertexBuffer");
      __publicField(this, "indexed", false);
      __publicField(this, "isDynamic", false);
      __publicField(this, "count", 0);
      __publicField(this, "offset", 0);
      __publicField(this, "elementsPerEntry");
      __publicField(this, "isBound", false);
      const {
        batchSize = 1,
        dataSize = 4,
        isDynamic = true,
        elementsPerEntry = 4,
        vertexElementSize = 6
      } = config;
      this.batchSize = batchSize;
      this.dataSize = dataSize;
      this.vertexElementSize = vertexElementSize;
      this.isDynamic = isDynamic;
      this.elementsPerEntry = elementsPerEntry;
      this.vertexByteSize = vertexElementSize * dataSize;
      this.entryByteSize = this.vertexByteSize * elementsPerEntry;
      this.bufferByteSize = batchSize * this.entryByteSize;
      this.create();
    }
    resize(batchSize) {
      this.batchSize = batchSize;
      this.bufferByteSize = batchSize * this.entryByteSize;
      if (this.vertexBuffer) {
        DeleteGLBuffer(this.vertexBuffer);
      }
      this.create();
    }
    create() {
      const data = new ArrayBuffer(this.bufferByteSize);
      this.data = data;
      this.vertexViewF32 = new Float32Array(data);
      this.vertexViewU32 = new Uint32Array(data);
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      const type = this.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bufferData(gl.ARRAY_BUFFER, data, type);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      this.isBound = false;
    }
    add(count) {
      this.count += count;
      this.offset += this.vertexElementSize * count;
    }
    reset() {
      this.count = 0;
      this.offset = 0;
    }
    canContain(count) {
      return this.count + count <= this.batchSize;
    }
    free() {
      return Math.max(0, 1 - this.count / this.batchSize);
    }
    bind() {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    }
    destroy() {
      DeleteGLBuffer(this.vertexBuffer);
      this.data = null;
      this.vertexViewF32 = null;
      this.vertexViewU32 = null;
      this.vertexBuffer = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/buffers/IndexedVertexBuffer.ts
  var IndexedVertexBuffer = class extends VertexBuffer {
    constructor(config = {}) {
      super(config);
      __publicField(this, "indexSize");
      __publicField(this, "entryElementSize");
      __publicField(this, "entryIndexSize");
      __publicField(this, "index");
      __publicField(this, "indexBuffer");
      __publicField(this, "indexLayout");
      const {
        indexSize = 4,
        entryIndexSize = 6,
        indexLayout = null
      } = config;
      this.indexed = true;
      this.indexSize = indexSize;
      this.entryIndexSize = entryIndexSize;
      this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
      const seededIndexBuffer = [];
      if (indexLayout) {
        this.indexLayout = indexLayout;
        for (let i = 0; i < this.batchSize * indexSize; i += indexSize) {
          for (let c = 0; c < indexLayout.length; c++) {
            seededIndexBuffer.push(i + indexLayout[c]);
          }
        }
      }
      this.create();
      this.createIndexBuffer(seededIndexBuffer);
    }
    createIndexBuffer(seededIndex) {
      this.index = new Uint16Array(seededIndex);
      this.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      seededIndex = [];
    }
    bind() {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    }
    destroy() {
      super.destroy();
      DeleteGLBuffer(this.indexBuffer);
      this.index = null;
      this.indexLayout = null;
      this.indexBuffer = null;
    }
  };

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

  // ../phaser-genesis/src/math/mat4/Mat4Ortho.ts
  function Mat4Ortho(left, right, bottom, top, near, far, out = new Matrix4()) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    return out.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateAttributes.ts
  function CreateAttributes(program, config) {
    const attributes = new Map();
    const defaultSettings = {
      size: 1,
      type: gl.FLOAT,
      normalized: false,
      stride: 0,
      offset: 0
    };
    const total = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < total; i++) {
      const attrib = gl.getActiveAttrib(program, i);
      if (!attrib) {
        break;
      }
      const name = attrib.name;
      const index = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(index);
      const setting = config.hasOwnProperty(name) ? config[name] : {};
      const {
        size = defaultSettings.size,
        type = defaultSettings.type,
        normalized = defaultSettings.normalized,
        stride = defaultSettings.stride,
        offset = defaultSettings.offset
      } = setting;
      attributes.set(name, { index, size, type, normalized, stride, offset });
    }
    return attributes;
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/DeleteShaders.ts
  function DeleteShaders(...shaders) {
    shaders.forEach((shader) => {
      gl.deleteShader(shader);
    });
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateProgram.ts
  function CreateProgram(...shaders) {
    const program = gl.createProgram();
    shaders.forEach((shader) => {
      gl.attachShader(program, shader);
    });
    gl.linkProgram(program);
    const status = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!status) {
      const info = gl.getProgramInfoLog(program);
      console.error(`Error linking program: ${info}`);
      gl.deleteProgram(program);
      DeleteShaders(...shaders);
      return null;
    }
    return program;
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateShader.ts
  function CreateShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!status) {
      const info = gl.getShaderInfoLog(shader);
      const sourceLines = source.split("\n").map((line, index) => {
        return `${index}: ${line}`;
      });
      console.error(`Error compiling shader: ${info}`, sourceLines.join("\n"));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateUniformSetter.ts
  function CreateUniformSetter(uniform, location, isArray = false) {
    switch (uniform.type) {
      case gl.INT:
      case gl.BOOL: {
        if (isArray) {
          return (v) => {
            gl.uniform1iv(location, v);
          };
        } else {
          return (v) => {
            gl.uniform1i(location, v);
          };
        }
      }
      case gl.INT_VEC2:
      case gl.BOOL_VEC2: {
        return (v) => {
          gl.uniform2iv(location, v);
        };
      }
      case gl.INT_VEC3:
      case gl.BOOL_VEC3: {
        return (v) => {
          gl.uniform3iv(location, v);
        };
      }
      case gl.INT_VEC4:
      case gl.BOOL_VEC4: {
        return (v) => {
          gl.uniform4iv(location, v);
        };
      }
      case gl.FLOAT: {
        if (isArray) {
          return (v) => {
            gl.uniform1fv(location, v);
          };
        } else {
          return (v) => {
            gl.uniform1f(location, v);
          };
        }
      }
      case gl.FLOAT_VEC2: {
        return (v) => {
          gl.uniform2fv(location, v);
        };
      }
      case gl.FLOAT_VEC3: {
        return (v) => {
          gl.uniform3fv(location, v);
        };
      }
      case gl.FLOAT_VEC4: {
        return (v) => {
          gl.uniform4fv(location, v);
        };
      }
      case gl.FLOAT_MAT2: {
        return (v) => {
          gl.uniformMatrix2fv(location, false, v);
        };
      }
      case gl.FLOAT_MAT3: {
        return (v) => {
          gl.uniformMatrix3fv(location, false, v);
        };
      }
      case gl.FLOAT_MAT4: {
        return (v) => {
          gl.uniformMatrix4fv(location, false, v);
        };
      }
      case gl.SAMPLER_2D:
      case gl.SAMPLER_CUBE: {
        if (uniform.size > 1) {
          return (v) => {
            gl.uniform1iv(location, v);
          };
        } else {
          return (v) => {
            gl.uniform1i(location, v);
          };
        }
      }
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateUniforms.ts
  function CreateUniforms(program) {
    const uniforms = new Map();
    const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < total; i++) {
      const uniform = gl.getActiveUniform(program, i);
      let name = uniform.name;
      if (name.startsWith("gl_") || name.startsWith("webgl_")) {
        continue;
      }
      const location = gl.getUniformLocation(program, uniform.name);
      if (location) {
        let isArray = false;
        if (name.substr(-3) === "[0]") {
          name = name.substr(0, name.length - 3);
          isArray = uniform.size > 1;
        }
        uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
      }
    }
    return uniforms;
  }

  // ../phaser-genesis/src/renderer/webgl1/GL_CONST.ts
  var UNSIGNED_BYTE = 5121;
  var FLOAT = 5126;

  // ../phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
  var DefaultQuadAttributes = {
    aVertexPosition: { size: 2, type: FLOAT, normalized: false, offset: 0 },
    aTextureCoord: { size: 2, type: FLOAT, normalized: false, offset: 8 },
    aTextureId: { size: 1, type: FLOAT, normalized: false, offset: 16 },
    aTintColor: { size: 4, type: UNSIGNED_BYTE, normalized: true, offset: 20 }
  };

  // ../phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
  var DefaultQuadUniforms = {
    uProjectionMatrix: new Float32Array(),
    uCameraMatrix: new Float32Array(),
    uTexture: 0
  };

  // ../phaser-genesis/src/renderer/webgl1/fbo/CreateDepthBuffer.ts
  function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return depthBuffer;
  }

  // ../phaser-genesis/src/renderer/webgl1/fbo/CreateFramebuffer.ts
  function CreateFramebuffer(texture, attachment) {
    if (!attachment) {
      attachment = gl.COLOR_ATTACHMENT0;
    }
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return framebuffer;
  }

  // ../phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.ts
  var SINGLE_QUAD_FRAG = `#define SHADER_NAME SINGLE_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

  // ../phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_VERT.ts
  var SINGLE_QUAD_VERT = `#define SHADER_NAME SINGLE_QUAD_VERT

precision highp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aTextureId;
attribute vec4 aTintColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

void main (void)
{
    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vTintColor = aTintColor;

    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);
}`;

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
    metadata[$storeSubarrays][type][$queryShadow] = array.slice(0);
    metadata[$storeSubarrays][type][$serializeShadow] = array.slice(0);
    array[$indexType] = TYPES_NAMES[indexType];
    array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    const start = cursors[type];
    let end = 0;
    for (let eid = 0; eid < size; eid++) {
      const from = cursors[type] + eid * length;
      const to = from + length;
      store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
      store[eid].from = from;
      store[eid].to = to;
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
  var resetStoreFor = (store, eid) => {
    if (store[$storeFlattened]) {
      store[$storeFlattened].forEach((ta) => {
        if (ArrayBuffer.isView(ta))
          ta[eid] = 0;
        else
          ta[eid].fill(0);
      });
    }
  };
  var createTypeStore = (type, length) => {
    const totalBytes = length * TYPES[type].BYTES_PER_ELEMENT;
    const buffer = new ArrayBuffer(totalBytes);
    return new TYPES[type](buffer);
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
      metadata[$storeSubarrays][type][$queryShadow] = array.slice(0);
      metadata[$storeSubarrays][type][$serializeShadow] = array.slice(0);
      array[$indexType] = TYPES_NAMES[indexType];
      array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    }
    const start = cursors[type];
    let end = 0;
    for (let eid = 0; eid < size; eid++) {
      const from = cursors[type] + eid * length;
      const to = from + length;
      store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
      store[eid].from = from;
      store[eid].to = to;
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
  var createShadows = (store) => {
    store[$queryShadow] = store.slice(0);
    store[$serializeShadow] = store.slice(0);
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
          createShadows(a[k]);
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
  var resized = false;
  var setSerializationResized = (v) => {
    resized = v;
  };
  var newEntities = new Map();
  var $entityMasks = Symbol("entityMasks");
  var $entityEnabled = Symbol("entityEnabled");
  var $entityArray = Symbol("entityArray");
  var $entityIndices = Symbol("entityIndices");
  var NONE$1 = __pow(2, 32) - 1;
  var defaultSize = 1e5;
  var globalEntityCursor = 0;
  var globalSize = defaultSize;
  var resizeThreshold = () => globalSize - globalSize / 5;
  var getGlobalSize = () => globalSize;
  var removed = [];
  var getDefaultSize = () => defaultSize;
  var getEntityCursor = () => globalEntityCursor;
  var eidToWorld = new Map();
  var addEntity = (world3) => {
    const enabled = world3[$entityEnabled];
    const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
    enabled[eid] = 1;
    world3[$entityIndices][eid] = world3[$entityArray].push(eid) - 1;
    eidToWorld.set(eid, world3);
    if (globalEntityCursor >= resizeThreshold()) {
      const size = globalSize;
      const amount = Math.ceil(size / 2 / 4) * 4;
      const newSize = size + amount;
      globalSize = newSize;
      resizeWorlds(newSize);
      resizeComponents(newSize);
      setSerializationResized(true);
      console.info(`\u{1F47E} bitECS - resizing all worlds from ${size} to ${size + amount}`);
    }
    return eid;
  };
  function Changed(c) {
    return function QueryChanged() {
      return c;
    };
  }
  var $queries = Symbol("queries");
  var $queryMap = Symbol("queryMap");
  var $dirtyQueries = Symbol("$dirtyQueries");
  var $queryComponents = Symbol("queryComponents");
  var NONE = __pow(2, 32) - 1;
  var registerQuery = (world3, query) => {
    let components2 = [];
    let notComponents = [];
    let changedComponents = [];
    query[$queryComponents].forEach((c) => {
      if (typeof c === "function") {
        if (c.name === "QueryNot") {
          notComponents.push(c());
        }
        if (c.name === "QueryChanged") {
          changedComponents.push(c());
          components2.push(c());
        }
      } else {
        components2.push(c);
      }
    });
    const mapComponents = (c) => world3[$componentMap].get(c);
    const size = components2.concat(notComponents).reduce((a, c) => c[$storeSize] > a ? c[$storeSize] : a, 0);
    const entities3 = [];
    const changed = [];
    const indices = new Uint32Array(size).fill(NONE);
    const enabled = new Uint8Array(size);
    const generations = components2.concat(notComponents).map((c) => {
      if (!world3[$componentMap].has(c))
        registerComponent(world3, c);
      return c;
    }).map(mapComponents).map((c) => c.generationId).reduce((a, v) => {
      if (a.includes(v))
        return a;
      a.push(v);
      return a;
    }, []);
    const reduceBitmasks = (a, c) => {
      if (!a[c.generationId])
        a[c.generationId] = 0;
      a[c.generationId] |= c.bitflag;
      return a;
    };
    const masks = components2.map(mapComponents).reduce(reduceBitmasks, {});
    const notMasks = notComponents.map(mapComponents).reduce((a, c) => {
      if (!a[c.generationId]) {
        a[c.generationId] = 0;
        a[c.generationId] |= c.bitflag;
      }
      return a;
    }, {});
    const flatProps = components2.map((c) => Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [c]).reduce((a, v) => a.concat(v), []);
    const toRemove = [];
    const entered = [];
    const exited = [];
    world3[$queryMap].set(query, {
      entities: entities3,
      changed,
      enabled,
      components: components2,
      notComponents,
      changedComponents,
      masks,
      notMasks,
      generations,
      indices,
      flatProps,
      toRemove,
      entered,
      exited
    });
    world3[$queries].add(query);
    for (let eid = 0; eid < getEntityCursor(); eid++) {
      if (!world3[$entityEnabled][eid])
        continue;
      if (queryCheckEntity(world3, query, eid)) {
        queryAddEntity(world3, query, eid);
      }
    }
  };
  var diff = (q, clearDiff) => {
    if (clearDiff)
      q.changed.length = 0;
    const flat = q.flatProps;
    for (let i = 0; i < q.entities.length; i++) {
      const eid = q.entities[i];
      let dirty = false;
      for (let pid = 0; pid < flat.length; pid++) {
        const prop = flat[pid];
        if (ArrayBuffer.isView(prop[eid])) {
          for (let i2 = 0; i2 < prop[eid].length; i2++) {
            if (prop[eid][i2] !== prop[eid][$queryShadow][i2]) {
              dirty = true;
              prop[eid][$queryShadow][i2] = prop[eid][i2];
            }
          }
        } else {
          if (prop[eid] !== prop[$queryShadow][eid]) {
            dirty = true;
            prop[$queryShadow][eid] = prop[eid];
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
      return (world3) => world3 ? world3[$entityArray] : components2[$entityArray];
    }
    const query = function(world3, clearDiff = true) {
      if (!world3[$queryMap].has(query))
        registerQuery(world3, query);
      const q = world3[$queryMap].get(query);
      queryCommitRemovals(world3, q);
      if (q.changedComponents.length)
        return diff(q, clearDiff);
      return q.entities;
    };
    query[$queryComponents] = components2;
    return query;
  };
  var queryCheckEntity = (world3, query, eid) => {
    const {
      masks,
      notMasks,
      generations
    } = world3[$queryMap].get(query);
    for (let i = 0; i < generations.length; i++) {
      const generationId = generations[i];
      const qMask = masks[generationId];
      const qNotMask = notMasks[generationId];
      const eMask = world3[$entityMasks][generationId][eid];
      if (qNotMask && (eMask & qNotMask) !== 0) {
        return false;
      }
      if (qMask && (eMask & qMask) !== qMask) {
        return false;
      }
    }
    return true;
  };
  var queryCheckComponent = (world3, query, component) => {
    const {
      generationId,
      bitflag
    } = world3[$componentMap].get(component);
    const {
      masks
    } = world3[$queryMap].get(query);
    const mask = masks[generationId];
    return (mask & bitflag) === bitflag;
  };
  var queryAddEntity = (world3, query, eid) => {
    const q = world3[$queryMap].get(query);
    if (q.enabled[eid])
      return;
    q.enabled[eid] = true;
    q.entities.push(eid);
    q.indices[eid] = q.entities.length - 1;
    q.entered.push(eid);
  };
  var queryCommitRemovals = (world3, q) => {
    while (q.toRemove.length) {
      const eid = q.toRemove.pop();
      const index = q.indices[eid];
      if (index === NONE)
        continue;
      const swapped = q.entities.pop();
      if (swapped !== eid) {
        q.entities[index] = swapped;
        q.indices[swapped] = index;
      }
      q.indices[eid] = NONE;
    }
    world3[$dirtyQueries].delete(q);
  };
  var commitRemovals = (world3) => {
    world3[$dirtyQueries].forEach((q) => {
      queryCommitRemovals(world3, q);
    });
  };
  var $componentMap = Symbol("componentMap");
  var components = [];
  var resizeComponents = (size) => {
    components.forEach((component) => resizeStore(component, size));
  };
  var defineComponent = (schema) => {
    const component = createStore(schema, getDefaultSize());
    if (schema && Object.keys(schema).length)
      components.push(component);
    return component;
  };
  var incrementBitflag = (world3) => {
    world3[$bitflag] *= 2;
    if (world3[$bitflag] >= __pow(2, 32)) {
      world3[$bitflag] = 1;
      world3[$entityMasks].push(new Uint32Array(world3[$size]));
    }
  };
  var registerComponent = (world3, component) => {
    world3[$componentMap].set(component, {
      generationId: world3[$entityMasks].length - 1,
      bitflag: world3[$bitflag],
      store: component
    });
    if (component[$storeSize] < world3[$size]) {
      resizeStore(component, world3[$size]);
    }
    incrementBitflag(world3);
  };
  var hasComponent = (world3, component, eid) => {
    const registeredComponent = world3[$componentMap].get(component);
    if (!registeredComponent)
      return;
    const {
      generationId,
      bitflag
    } = registeredComponent;
    const mask = world3[$entityMasks][generationId][eid];
    return (mask & bitflag) === bitflag;
  };
  var addComponent = (world3, component, eid, reset = false) => {
    if (!Number.isInteger(eid)) {
      component = world3;
      world3 = eidToWorld.get(eid);
      reset = eid || reset;
    }
    if (!world3[$componentMap].has(component))
      registerComponent(world3, component);
    if (hasComponent(world3, component, eid))
      return;
    const {
      generationId,
      bitflag
    } = world3[$componentMap].get(component);
    world3[$entityMasks][generationId][eid] |= bitflag;
    world3[$queries].forEach((query) => {
      if (!queryCheckComponent(world3, query, component))
        return;
      const match = queryCheckEntity(world3, query, eid);
      if (match)
        queryAddEntity(world3, query, eid);
    });
    if (reset)
      resetStoreFor(component, eid);
  };
  var $size = Symbol("size");
  var $resizeThreshold = Symbol("resizeThreshold");
  var $bitflag = Symbol("bitflag");
  var worlds = [];
  var resizeWorlds = (size) => {
    worlds.forEach((world3) => {
      world3[$size] = size;
      world3[$queryMap].forEach((q) => {
        q.indices = resize(q.indices, size);
        q.enabled = resize(q.enabled, size);
      });
      world3[$entityEnabled] = resize(world3[$entityEnabled], size);
      world3[$entityIndices] = resize(world3[$entityIndices], size);
      for (let i = 0; i < world3[$entityMasks].length; i++) {
        const masks = world3[$entityMasks][i];
        world3[$entityMasks][i] = resize(masks, size);
      }
      world3[$resizeThreshold] = world3[$size] - world3[$size] / 5;
    });
  };
  var createWorld = () => {
    const world3 = {};
    const size = getGlobalSize();
    world3[$size] = size;
    world3[$entityEnabled] = new Uint8Array(size);
    world3[$entityMasks] = [new Uint32Array(size)];
    world3[$entityArray] = [];
    world3[$entityIndices] = new Uint32Array(size);
    world3[$bitflag] = 1;
    world3[$componentMap] = new Map();
    world3[$queryMap] = new Map();
    world3[$queries] = new Set();
    world3[$dirtyQueries] = new Set();
    worlds.push(world3);
    return world3;
  };
  var defineSystem = (fn1, fn2) => {
    const update = fn2 !== void 0 ? fn2 : fn1;
    const create = fn2 !== void 0 ? fn1 : void 0;
    const init = new Set();
    const system = (world3, ...args) => {
      if (create && !init.has(world3)) {
        create(world3, ...args);
        init.add(world3);
      }
      update(world3, ...args);
      commitRemovals(world3);
      return world3;
    };
    Object.defineProperty(system, "name", {
      value: (update.name || "AnonymousSystem") + "_internal",
      configurable: true
    });
    return system;
  };
  var Types = TYPES_ENUM;

  // ../phaser-genesis/src/components/vertices/QuadVertexComponent.ts
  var QuadVertex = defineComponent({
    v1: Types.ui32,
    v2: Types.ui32,
    v3: Types.ui32,
    v4: Types.ui32
  });
  var QuadVertexComponent = QuadVertex;

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

  // ../phaser-genesis/src/components/dirty/DirtyComponent.ts
  var Dirty = defineComponent({
    frame: Types.ui32,
    transform: Types.ui32,
    update: Types.ui32,
    childCache: Types.ui32,
    postRender: Types.ui32,
    vertexColors: Types.ui32,
    bounds: Types.ui32,
    texture: Types.ui32,
    textureFrame: Types.ui32,
    alpha: Types.ui32,
    child: Types.ui32,
    displayList: Types.ui32
  });
  var DirtyComponent = Dirty;

  // ../phaser-genesis/src/GameObjectWorld.ts
  var world = createWorld();
  var GameObjectWorld = world;

  // ../phaser-genesis/src/components/dirty/AddDirtyComponent.ts
  function AddDirtyComponent(id) {
    addComponent(GameObjectWorld, DirtyComponent, id);
    DirtyComponent.frame[id] = 0;
    DirtyComponent.transform[id] = 1;
    DirtyComponent.update[id] = 1;
    DirtyComponent.childCache[id] = 0;
    DirtyComponent.postRender[id] = 0;
    DirtyComponent.vertexColors[id] = 1;
    DirtyComponent.bounds[id] = 1;
    DirtyComponent.texture[id] = 0;
    DirtyComponent.textureFrame[id] = 0;
    DirtyComponent.alpha[id] = 0;
    DirtyComponent.child[id] = 0;
    DirtyComponent.displayList[id] = 0;
  }

  // ../phaser-genesis/src/components/dirty/ClearDirtyDisplayList.ts
  function ClearDirtyDisplayList(id) {
    DirtyComponent.displayList[id] = 0;
  }

  // ../phaser-genesis/src/components/dirty/HasDirtyDisplayList.ts
  function HasDirtyDisplayList(id) {
    return Boolean(DirtyComponent.displayList[id]);
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyAlpha.ts
  function SetDirtyAlpha(id) {
    DirtyComponent.alpha[id] = 1;
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyDisplayList.ts
  function SetDirtyDisplayList(id) {
    DirtyComponent.displayList[id] = 1;
  }

  // ../phaser-genesis/src/GameInstance.ts
  var instance;
  var frame = 0;
  var elapsed = 0;
  var GameInstance = {
    get: () => {
      return instance;
    },
    set: (game2) => {
      instance = game2;
    },
    getFrame: () => {
      return frame;
    },
    setFrame: (current) => {
      frame = current;
    },
    getElapsed: () => {
      return elapsed;
    },
    setElapsed: (current) => {
      elapsed = current;
    }
  };

  // ../phaser-genesis/src/components/dirty/SetDirtyTransform.ts
  function SetDirtyTransform(id) {
    DirtyComponent.transform[id] = 1;
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyVertexColors.ts
  function SetDirtyVertexColors(id) {
    DirtyComponent.vertexColors[id] = 1;
  }

  // ../phaser-genesis/src/components/transform/SetExtent.ts
  function SetExtent(id, x, y, width, height) {
    Extent2DComponent.x[id] = x;
    Extent2DComponent.y[id] = y;
    Extent2DComponent.width[id] = width;
    Extent2DComponent.height[id] = height;
    Extent2DComponent.right[id] = x + width;
    Extent2DComponent.bottom[id] = y + height;
    SetDirtyTransform(id);
  }

  // ../phaser-genesis/src/components/vertices/VertexComponent.ts
  var Vertex = defineComponent({
    x: Types.f32,
    y: Types.f32,
    z: Types.f32,
    u: Types.f32,
    v: Types.f32,
    texture: Types.ui8,
    tint: Types.ui32,
    alpha: Types.f32,
    color: Types.ui32,
    offset: Types.f32
  });
  var VertexComponent = Vertex;

  // ../phaser-genesis/src/components/vertices/SetUV.ts
  function SetUV(id, u, v) {
    VertexComponent.u[id] = u;
    VertexComponent.v[id] = v;
  }

  // ../phaser-genesis/src/textures/Frame.ts
  var Frame = class {
    constructor(texture, key, x, y, width, height) {
      __publicField(this, "texture");
      __publicField(this, "key");
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "trimmed", false);
      __publicField(this, "sourceSizeWidth");
      __publicField(this, "sourceSizeHeight");
      __publicField(this, "spriteSourceSizeX");
      __publicField(this, "spriteSourceSizeY");
      __publicField(this, "spriteSourceSizeWidth");
      __publicField(this, "spriteSourceSizeHeight");
      __publicField(this, "pivot");
      __publicField(this, "u0");
      __publicField(this, "v0");
      __publicField(this, "u1");
      __publicField(this, "v1");
      this.texture = texture;
      this.key = key;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      this.updateUVs();
    }
    setPivot(x, y) {
      this.pivot = { x, y };
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      this.updateUVs();
    }
    setSourceSize(width, height) {
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
    }
    setTrim(width, height, x, y, w, h) {
      this.trimmed = true;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      this.spriteSourceSizeX = x;
      this.spriteSourceSizeY = y;
      this.spriteSourceSizeWidth = w;
      this.spriteSourceSizeHeight = h;
    }
    getExtent(originX, originY) {
      const sourceSizeWidth = this.sourceSizeWidth;
      const sourceSizeHeight = this.sourceSizeHeight;
      let left;
      let right;
      let top;
      let bottom;
      if (this.trimmed) {
        left = this.spriteSourceSizeX - originX * sourceSizeWidth;
        right = left + this.spriteSourceSizeWidth;
        top = this.spriteSourceSizeY - originY * sourceSizeHeight;
        bottom = top + this.spriteSourceSizeHeight;
      } else {
        left = -originX * sourceSizeWidth;
        right = left + sourceSizeWidth;
        top = -originY * sourceSizeHeight;
        bottom = top + sourceSizeHeight;
      }
      return { left, right, top, bottom };
    }
    copyToExtent(child) {
      const originX = child.originX;
      const originY = child.originY;
      const sourceSizeWidth = this.sourceSizeWidth;
      const sourceSizeHeight = this.sourceSizeHeight;
      let x;
      let y;
      let width;
      let height;
      if (this.trimmed) {
        x = this.spriteSourceSizeX - originX * sourceSizeWidth;
        y = this.spriteSourceSizeY - originY * sourceSizeHeight;
        width = this.spriteSourceSizeWidth;
        height = this.spriteSourceSizeHeight;
      } else {
        x = -originX * sourceSizeWidth;
        y = -originY * sourceSizeHeight;
        width = sourceSizeWidth;
        height = sourceSizeHeight;
      }
      SetExtent(child.id, x, y, width, height);
      return this;
    }
    copyToVertices(id) {
      const { u0, u1, v0, v1 } = this;
      SetUV(QuadVertexComponent.v1[id], u0, v0);
      SetUV(QuadVertexComponent.v2[id], u0, v1);
      SetUV(QuadVertexComponent.v3[id], u1, v1);
      SetUV(QuadVertexComponent.v4[id], u1, v0);
      return this;
    }
    updateUVs() {
      const { x, y, width, height } = this;
      const baseTextureWidth = this.texture.width;
      const baseTextureHeight = this.texture.height;
      this.u0 = x / baseTextureWidth;
      this.v0 = y / baseTextureHeight;
      this.u1 = (x + width) / baseTextureWidth;
      this.v1 = (y + height) / baseTextureHeight;
    }
    destroy() {
      this.texture = null;
    }
  };

  // ../phaser-genesis/src/textures/Texture.ts
  var Texture = class {
    constructor(image, width, height, glConfig) {
      __publicField(this, "key", "");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "image");
      __publicField(this, "binding");
      __publicField(this, "firstFrame");
      __publicField(this, "frames");
      __publicField(this, "data");
      if (image) {
        width = image.width;
        height = image.height;
      }
      this.image = image;
      this.width = width;
      this.height = height;
      this.frames = new Map();
      this.data = {};
      this.addFrame("__BASE", 0, 0, width, height);
      BindingQueue.add(this, glConfig);
    }
    addFrame(key, x, y, width, height) {
      if (this.frames.has(key)) {
        return null;
      }
      const frame2 = new Frame(this, key, x, y, width, height);
      this.frames.set(key, frame2);
      if (!this.firstFrame || this.firstFrame.key === "__BASE") {
        this.firstFrame = frame2;
      }
      return frame2;
    }
    getFrame(key) {
      if (!key) {
        return this.firstFrame;
      }
      if (key instanceof Frame) {
        key = key.key;
      }
      let frame2 = this.frames.get(key);
      if (!frame2) {
        console.warn(`Frame missing: ${key}`);
        frame2 = this.firstFrame;
      }
      return frame2;
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      const frame2 = this.frames.get("__BASE");
      frame2.setSize(width, height);
    }
    destroy() {
      if (this.binding) {
        this.binding.destroy();
      }
      this.frames.clear();
      this.data = null;
      this.image = null;
      this.firstFrame = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/shaders/Shader.ts
  var Shader = class {
    constructor(config) {
      __publicField(this, "program");
      __publicField(this, "attributes");
      __publicField(this, "uniforms");
      __publicField(this, "uniformSetters");
      __publicField(this, "texture");
      __publicField(this, "framebuffer");
      __publicField(this, "renderToFramebuffer", false);
      __publicField(this, "renderToDepthbuffer", false);
      __publicField(this, "isActive", false);
      if (config) {
        this.fromConfig(config);
      }
    }
    fromConfig(config) {
      const {
        attributes = DefaultQuadAttributes,
        fragmentShader = SINGLE_QUAD_FRAG,
        height = GetHeight(),
        renderToFramebuffer = false,
        renderToDepthbuffer = false,
        resolution = GetResolution(),
        vertexShader = SINGLE_QUAD_VERT,
        width = GetWidth(),
        uniforms = DefaultQuadUniforms
      } = config;
      this.create(fragmentShader, vertexShader, uniforms, attributes);
      if (renderToFramebuffer) {
        this.renderToFramebuffer = true;
        const texture = new Texture(null, width * resolution, height * resolution);
        const binding = new GLTextureBinding(texture);
        texture.binding = binding;
        binding.framebuffer = CreateFramebuffer(binding.texture);
        if (renderToDepthbuffer) {
          this.renderToDepthbuffer = true;
          binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
        }
        this.texture = texture;
        this.framebuffer = binding.framebuffer;
      }
    }
    create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
      const fragmentShader = CreateShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
      const vertexShader = CreateShader(vertexShaderSource, gl.VERTEX_SHADER);
      if (!fragmentShader || !vertexShader) {
        return;
      }
      const program = CreateProgram(fragmentShader, vertexShader);
      if (!program) {
        return;
      }
      const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
      gl.useProgram(program);
      this.program = program;
      this.uniformSetters = CreateUniforms(program);
      this.uniforms = new Map();
      for (const [key, value] of Object.entries(uniforms)) {
        this.uniforms.set(key, value);
      }
      this.attributes = CreateAttributes(program, attribs);
      gl.useProgram(currentProgram);
      this.isActive = false;
    }
    updateUniforms(renderPass) {
    }
    bind(renderPass) {
      const uniforms = this.uniforms;
      uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
      uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
      this.updateUniforms(renderPass);
      return this.setUniforms(renderPass);
    }
    setUniform(key, value) {
      const uniforms = this.uniforms;
      if (uniforms.has(key)) {
        uniforms.set(key, value);
        const setter = this.uniformSetters.get(key);
        setter(value);
      }
    }
    setUniforms(renderPass) {
      if (!this.program) {
        return false;
      }
      gl.useProgram(this.program);
      this.isActive = true;
      const uniforms = this.uniforms;
      for (const [name, setter] of this.uniformSetters.entries()) {
        setter(uniforms.get(name));
      }
      return true;
    }
    setAttributes(renderPass) {
      if (this.program) {
        const stride = renderPass.currentVertexBuffer.vertexByteSize;
        this.attributes.forEach((attrib) => {
          gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
        });
      }
    }
    destroy() {
      DeleteShaders(this.program);
      DeleteGLTexture(this.texture);
      DeleteFramebuffer(this.framebuffer);
      this.uniforms.clear();
      this.uniformSetters.clear();
      this.attributes.clear();
      this.program = null;
      this.texture = null;
      this.framebuffer = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/shaders/QuadShader.ts
  var QuadShader = class extends Shader {
    constructor(config = {}) {
      const shaderConfig = config;
      shaderConfig.attributes = !shaderConfig.attributes ? DefaultQuadAttributes : shaderConfig.attributes;
      super(shaderConfig);
    }
    bind(renderPass) {
      const uniforms = this.uniforms;
      uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
      uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
      return super.bind(renderPass);
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/glsl/MULTI_QUAD_FRAG.ts
  var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];

void main (void)
{
    vec4 color;

    %forloop%

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

  // ../phaser-genesis/src/renderer/webgl1/shaders/MultiTextureQuadShader.ts
  var MultiTextureQuadShader = class extends QuadShader {
    constructor(config = {}) {
      if (!config.fragmentShader) {
        config.fragmentShader = MULTI_QUAD_FRAG;
      }
      super(config);
    }
    create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
      const maxTextures = GetMaxTextures();
      let src = "";
      for (let i = 1; i < maxTextures; i++) {
        if (i > 1) {
          src += "\n	else ";
        }
        if (i < maxTextures - 1) {
          src += `if (vTextureId < ${i}.5)`;
        }
        src += "\n	{";
        src += `
		color = texture2D(uTexture[${i}], vTextureCoord);`;
        src += "\n	}";
      }
      fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
      fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);
      super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
    }
    bind(renderPass) {
      this.uniforms.set("uTexture", renderPass.textureIndex);
      return super.bind(renderPass);
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultBlendMode.ts
  function SetDefaultBlendMode(renderPass, enable, sfactor, dfactor) {
    const entry = { enable, sfactor, dfactor };
    renderPass.blendModeStack[0] = entry;
    renderPass.currentBlendMode = entry;
    renderPass.defaultBlendMode = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultFramebuffer.ts
  function SetDefaultFramebuffer(renderPass, framebuffer = null, viewport) {
    const entry = { framebuffer, viewport };
    renderPass.framebufferStack[0] = entry;
    renderPass.currentFramebuffer = entry;
    renderPass.defaultFramebuffer = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultShader.ts
  function SetDefaultShader(renderPass, shader, textureID) {
    const entry = { shader, textureID };
    renderPass.shaderStack[0] = entry;
    renderPass.currentShader = entry;
    renderPass.defaultShader = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultVertexBuffer.ts
  function SetDefaultVertexBuffer(renderPass, buffer) {
    renderPass.vertexBufferStack[0] = buffer;
    renderPass.currentVertexBuffer = buffer;
    renderPass.defaultVertexBuffer = buffer;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultViewport.ts
  function SetDefaultViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const entry = new Rectangle(x, y, width, height);
    renderPass.viewportStack[0] = entry;
    renderPass.currentViewport = entry;
    renderPass.defaultViewport = entry;
  }

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

  // ../phaser-genesis/src/math/mat4/Mat4Identity.ts
  function Mat4Identity(matrix2 = new Matrix4()) {
    return matrix2.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  // ../phaser-genesis/src/math/mat2d/Matrix2D.ts
  var Matrix2D = class {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
      __publicField(this, "a");
      __publicField(this, "b");
      __publicField(this, "c");
      __publicField(this, "d");
      __publicField(this, "tx");
      __publicField(this, "ty");
      this.set(a, b, c, d, tx, ty);
    }
    set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.tx = tx;
      this.ty = ty;
      return this;
    }
    identity() {
      return this.set();
    }
    toArray() {
      const { a, b, c, d, tx, ty } = this;
      return [a, b, c, d, tx, ty];
    }
    fromArray(src) {
      return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
    }
  };

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

  // ../phaser-genesis/src/camera/StaticCamera.ts
  var StaticCamera = class {
    constructor() {
      __publicField(this, "world");
      __publicField(this, "matrix");
      __publicField(this, "renderer");
      __publicField(this, "type");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "bounds");
      __publicField(this, "dirtyRender");
      __publicField(this, "worldTransform");
      this.dirtyRender = true;
      const game2 = GameInstance.get();
      this.renderer = game2.renderer;
      this.matrix = Mat4Identity();
      this.bounds = new Rectangle();
      this.worldTransform = new Matrix2D();
      this.reset();
    }
    reset() {
      const renderer = this.renderer;
      if (renderer) {
        const width = renderer.width;
        const height = renderer.height;
        this.width = width;
        this.height = height;
      }
      this.bounds.set(0, 0, this.width, this.height);
    }
    destroy() {
      this.world = null;
      this.worldTransform = null;
      this.renderer = null;
      this.matrix = null;
      this.bounds = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/RenderPass.ts
  var RenderPass = class {
    constructor(renderer) {
      __publicField(this, "renderer");
      __publicField(this, "projectionMatrix");
      __publicField(this, "cameraMatrix");
      __publicField(this, "count", 0);
      __publicField(this, "prevCount", 0);
      __publicField(this, "flushTotal", 0);
      __publicField(this, "maxTextures", 0);
      __publicField(this, "currentActiveTexture", 0);
      __publicField(this, "startActiveTexture", 0);
      __publicField(this, "tempTextures", []);
      __publicField(this, "textureIndex", []);
      __publicField(this, "framebufferStack", []);
      __publicField(this, "currentFramebuffer", null);
      __publicField(this, "defaultFramebuffer", null);
      __publicField(this, "vertexBufferStack", []);
      __publicField(this, "currentVertexBuffer", null);
      __publicField(this, "defaultVertexBuffer", null);
      __publicField(this, "shaderStack", []);
      __publicField(this, "currentShader", null);
      __publicField(this, "defaultShader", null);
      __publicField(this, "viewportStack", []);
      __publicField(this, "currentViewport", null);
      __publicField(this, "defaultViewport", null);
      __publicField(this, "blendModeStack", []);
      __publicField(this, "currentBlendMode", null);
      __publicField(this, "defaultBlendMode", null);
      __publicField(this, "quadShader");
      __publicField(this, "quadBuffer");
      __publicField(this, "quadCamera");
      __publicField(this, "current2DCamera");
      this.renderer = renderer;
      this.projectionMatrix = new Matrix4();
      this.reset();
    }
    reset() {
      const gl2 = this.renderer.gl;
      const indexLayout = [0, 1, 2, 2, 3, 0];
      this.quadShader = new QuadShader();
      this.quadBuffer = new IndexedVertexBuffer({ isDynamic: false, indexLayout });
      this.quadCamera = new StaticCamera();
      CreateTempTextures(this);
      SetDefaultFramebuffer(this);
      SetDefaultBlendMode(this, true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
      SetDefaultVertexBuffer(this, new IndexedVertexBuffer({ batchSize: GetBatchSize(), indexLayout }));
      SetDefaultShader(this, new MultiTextureQuadShader());
    }
    resize(width, height) {
      Mat4Ortho(0, width, height, 0, -1e3, 1e3, this.projectionMatrix);
      this.quadCamera.reset();
      SetDefaultViewport(this, 0, 0, width, height);
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindShader.ts
  function BindShader(renderPass, entry) {
    let prevShader;
    if (!entry) {
      entry = renderPass.currentShader;
    } else {
      prevShader = renderPass.currentShader.shader;
    }
    if (!entry.shader.isActive) {
      const success = entry.shader.bind(renderPass, entry.textureID);
      if (success) {
        entry.shader.setAttributes(renderPass);
        if (prevShader && prevShader !== entry.shader) {
          prevShader.isActive = false;
        }
      }
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Begin.ts
  function Begin(renderPass, camera2D) {
    renderPass.current2DCamera = camera2D;
    renderPass.cameraMatrix = camera2D.matrix;
    BindShader(renderPass);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindBlendMode.ts
  function BindBlendMode(renderPass, entry) {
    if (!entry) {
      entry = renderPass.currentBlendMode;
    }
    if (entry.enable) {
      if (!gl.isEnabled(gl.BLEND) || (renderPass.currentBlendMode.sfactor !== entry.sfactor || renderPass.currentBlendMode.dfactor !== entry.dfactor)) {
        gl.enable(gl.BLEND);
        gl.blendFunc(entry.sfactor, entry.dfactor);
      }
    } else {
      gl.disable(gl.BLEND);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindVertexBuffer.ts
  function BindVertexBuffer(renderPass, buffer) {
    if (buffer) {
      buffer.isBound = false;
    } else {
      buffer = renderPass.currentVertexBuffer;
    }
    if (!buffer.isBound) {
      const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
      buffer.isBound = true;
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
  function GetVertexBufferEntry(renderPass, addToCount = 0) {
    const buffer = renderPass.currentVertexBuffer;
    if (renderPass.count + addToCount >= buffer.batchSize) {
      Flush(renderPass);
    }
    const offset = buffer.indexed ? renderPass.count * buffer.entryElementSize : renderPass.count * buffer.vertexElementSize;
    renderPass.count += addToCount;
    return {
      buffer,
      F32: buffer.vertexViewF32,
      U32: buffer.vertexViewU32,
      offset
    };
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetTexture.ts
  function SetTexture(renderPass, texture) {
    const binding = texture.binding;
    const currentActiveTexture = renderPass.currentActiveTexture;
    if (binding.indexCounter < renderPass.startActiveTexture) {
      binding.indexCounter = renderPass.startActiveTexture;
      if (currentActiveTexture < renderPass.maxTextures) {
        binding.setIndex(currentActiveTexture);
        gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
        renderPass.currentActiveTexture++;
      } else {
        Flush(renderPass);
        renderPass.startActiveTexture++;
        binding.indexCounter = renderPass.startActiveTexture;
        binding.setIndex(1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
        renderPass.currentActiveTexture = 2;
      }
    }
    return binding.index;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Start.ts
  function Start(renderPass) {
    renderPass.current2DCamera = renderPass.quadCamera;
    renderPass.cameraMatrix = renderPass.quadCamera.matrix;
    renderPass.count = 0;
    renderPass.flushTotal = 0;
    BindFramebuffer(renderPass, false, renderPass.defaultFramebuffer);
    BindBlendMode(renderPass, renderPass.defaultBlendMode);
    BindViewport(renderPass, renderPass.defaultViewport);
    BindVertexBuffer(renderPass, renderPass.defaultVertexBuffer);
  }

  // ../phaser-genesis/src/renderer/webgl1/WebGLRendererInstance.ts
  var instance2;
  var WebGLRendererInstance = {
    get: () => {
      return instance2;
    },
    set: (renderer) => {
      instance2 = renderer;
    }
  };

  // ../phaser-genesis/src/world/WorldList.ts
  var WorldList = new Map();

  // ../phaser-genesis/src/renderer/webgl1/WebGLRenderer.ts
  var WebGLRenderer = class {
    constructor() {
      __publicField(this, "canvas");
      __publicField(this, "gl");
      __publicField(this, "renderPass");
      __publicField(this, "clearColor", [0, 0, 0, 1]);
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "resolution");
      __publicField(this, "clearBeforeRender", true);
      __publicField(this, "optimizeRedraw", true);
      __publicField(this, "autoResize", true);
      __publicField(this, "contextLost", false);
      this.width = GetWidth();
      this.height = GetHeight();
      this.resolution = GetResolution();
      this.setBackgroundColor(GetBackgroundColor());
      const canvas = document.createElement("canvas");
      canvas.addEventListener("webglcontextlost", (event) => this.onContextLost(event), false);
      canvas.addEventListener("webglcontextrestored", () => this.onContextRestored(), false);
      this.canvas = canvas;
      this.initContext();
      WebGLRendererInstance.set(this);
      this.renderPass = new RenderPass(this);
      this.resize(this.width, this.height, this.resolution);
    }
    initContext() {
      const gl2 = this.canvas.getContext("webgl", GetWebGLContext());
      GL.set(gl2);
      this.gl = gl2;
      gl2.disable(gl2.DEPTH_TEST);
      gl2.disable(gl2.CULL_FACE);
    }
    resize(width, height, resolution = 1) {
      const calcWidth = width * resolution;
      const calcHeight = height * resolution;
      this.width = calcWidth;
      this.height = calcHeight;
      this.resolution = resolution;
      const canvas = this.canvas;
      canvas.width = calcWidth;
      canvas.height = calcHeight;
      if (this.autoResize) {
        canvas.style.width = width.toString() + "px";
        canvas.style.height = height.toString() + "px";
      }
      this.renderPass.resize(calcWidth, calcHeight);
    }
    onContextLost(event) {
      event.preventDefault();
      this.contextLost = true;
    }
    onContextRestored() {
      this.contextLost = false;
      this.initContext();
    }
    setBackgroundColor(color) {
      GetRGBArray(color, this.clearColor);
      return this;
    }
    reset() {
    }
    render(willRedraw, scenes) {
      if (this.contextLost) {
        return;
      }
      const gl2 = this.gl;
      const renderPass = this.renderPass;
      gl2.getContextAttributes();
      ProcessBindingQueue();
      if (this.optimizeRedraw && !willRedraw) {
      }
      if (this.clearBeforeRender) {
        const cls = this.clearColor;
        gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
        gl2.clear(gl2.COLOR_BUFFER_BIT);
      }
      Start(renderPass);
      for (const scene of scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          if (world3.runRender) {
            world3.renderGL(renderPass);
            world3.postRenderGL(renderPass);
          }
        }
      }
      End(renderPass);
    }
    destroy() {
      WebGLRendererInstance.set(void 0);
    }
  };

  // ../phaser-genesis/src/config/webgl/WebGL.ts
  function WebGL() {
    return () => {
      SetRenderer(WebGLRenderer);
    };
  }

  // ../phaser-genesis/src/config/webglcontext/SetWebGLContext.ts
  function SetWebGLContext(contextAttributes) {
    ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
  }

  // ../phaser-genesis/src/config/worldsize/SetWorldSize.ts
  function SetWorldSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.WORLD_SIZE, size);
  }

  // ../phaser-genesis/src/components/hierarchy/HierarchyComponent.ts
  var Hierarchy = defineComponent({
    worldID: Types.ui32,
    parentID: Types.ui32,
    numChildren: Types.ui32,
    depth: Types.ui32
  });
  var HierarchyComponent = Hierarchy;

  // ../phaser-genesis/src/components/hierarchy/AddHierarchyComponent.ts
  function AddHierarchyComponent(id) {
    addComponent(GameObjectWorld, HierarchyComponent, id);
  }

  // ../phaser-genesis/src/components/hierarchy/ClearWorldAndParentID.ts
  function ClearWorldAndParentID(id) {
    HierarchyComponent.worldID[id] = 0;
    HierarchyComponent.parentID[id] = 0;
  }

  // ../phaser-genesis/src/gameobjects/GameObjectCache.ts
  var GameObjectCache = new Map();

  // ../phaser-genesis/src/gameobjects/GameObjectTree.ts
  var GameObjectTree = new Map();

  // ../phaser-genesis/src/components/hierarchy/GetChildren.ts
  function GetChildren(id) {
    const out = [];
    GameObjectTree.get(id).forEach((childID) => {
      out.push(GameObjectCache.get(childID));
    });
    return out;
  }

  // ../phaser-genesis/src/components/hierarchy/GetNumChildren.ts
  function GetNumChildren(id) {
    return HierarchyComponent.numChildren[id];
  }

  // ../phaser-genesis/src/components/hierarchy/GetParentGameObject.ts
  function GetParentGameObject(id) {
    return GameObjectCache.get(HierarchyComponent.parentID[id]);
  }

  // ../phaser-genesis/src/components/hierarchy/GetParentID.ts
  function GetParentID(id) {
    return HierarchyComponent.parentID[id];
  }

  // ../phaser-genesis/src/components/hierarchy/GetWorldID.ts
  function GetWorldID(id) {
    return HierarchyComponent.worldID[id];
  }

  // ../phaser-genesis/src/components/hierarchy/SetParentID.ts
  function SetParentID(childID, parentID) {
    HierarchyComponent.parentID[childID] = parentID;
  }

  // ../phaser-genesis/src/components/hierarchy/SetWorldAndParentID.ts
  function SetWorldAndParentID(id, worldID, parentID) {
    HierarchyComponent.worldID[id] = worldID;
    HierarchyComponent.parentID[id] = parentID;
  }

  // ../phaser-genesis/src/components/hierarchy/SetWorldID.ts
  function SetWorldID(id, worldID) {
    HierarchyComponent.worldID[id] = worldID;
  }

  // ../phaser-genesis/src/components/hierarchy/UpdateNumChildren.ts
  function UpdateNumChildren(id) {
    HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
  }

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

  // ../phaser-genesis/src/components/transform/GetVertices.ts
  function GetVertices(worldTransform, transformExtent) {
    const { a, b, c, d, tx, ty } = worldTransform;
    const { x, y, right, bottom } = transformExtent;
    const x0 = x * a + y * c + tx;
    const y0 = x * b + y * d + ty;
    const x1 = x * a + bottom * c + tx;
    const y1 = x * b + bottom * d + ty;
    const x2 = right * a + bottom * c + tx;
    const y2 = right * b + bottom * d + ty;
    const x3 = right * a + y * c + tx;
    const y3 = right * b + y * d + ty;
    return { x0, y0, x1, y1, x2, y2, x3, y3 };
  }

  // ../phaser-genesis/src/components/permissions/PermissionsComponent.ts
  var Permissions = defineComponent({
    visible: Types.ui8,
    visibleChildren: Types.ui8,
    willUpdate: Types.ui8,
    willUpdateChildren: Types.ui8,
    willRender: Types.ui8,
    willRenderChildren: Types.ui8,
    willCacheChildren: Types.ui8,
    willTransformChildren: Types.ui8
  });
  var PermissionsComponent = Permissions;

  // ../phaser-genesis/src/components/permissions/AddPermissionsComponent.ts
  function AddPermissionsComponent(id) {
    addComponent(GameObjectWorld, PermissionsComponent, id);
    PermissionsComponent.visible[id] = 1;
    PermissionsComponent.visibleChildren[id] = 1;
    PermissionsComponent.willUpdate[id] = 1;
    PermissionsComponent.willUpdateChildren[id] = 1;
    PermissionsComponent.willRender[id] = 1;
    PermissionsComponent.willRenderChildren[id] = 1;
    PermissionsComponent.willCacheChildren[id] = 0;
    PermissionsComponent.willTransformChildren[id] = 1;
  }

  // ../phaser-genesis/src/components/permissions/WillRender.ts
  function WillRender(id) {
    return Boolean(PermissionsComponent.visible[id]) && Boolean(PermissionsComponent.willRender[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillRenderChildren.ts
  function WillRenderChildren(id) {
    return Boolean(PermissionsComponent.visibleChildren[id]) && Boolean(PermissionsComponent.willRenderChildren[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillUpdate.ts
  function WillUpdate(id) {
    return Boolean(PermissionsComponent.willUpdate[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillUpdateChildren.ts
  function WillUpdateChildren(id) {
    return Boolean(PermissionsComponent.willUpdateChildren[id]);
  }

  // ../phaser-genesis/src/components/transform/LocalMatrix2DComponent.ts
  var LocalMatrix2D = defineComponent({
    a: Types.f32,
    b: Types.f32,
    c: Types.f32,
    d: Types.f32,
    tx: Types.f32,
    ty: Types.f32
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

  // ../phaser-genesis/src/components/transform/AddTransform2DComponent.ts
  function AddTransform2DComponent(id, x = 0, y = 0, originX = 0, originY = 0) {
    addComponent(GameObjectWorld, Transform2DComponent, id);
    addComponent(GameObjectWorld, Extent2DComponent, id);
    addComponent(GameObjectWorld, LocalMatrix2DComponent, id);
    addComponent(GameObjectWorld, WorldMatrix2DComponent, id);
    Transform2DComponent.x[id] = x;
    Transform2DComponent.y[id] = y;
    Transform2DComponent.scaleX[id] = 1;
    Transform2DComponent.scaleY[id] = 1;
    Transform2DComponent.originX[id] = originX;
    Transform2DComponent.originY[id] = originY;
    LocalMatrix2DComponent.a[id] = 1;
    LocalMatrix2DComponent.d[id] = 1;
    LocalMatrix2DComponent.tx[id] = x;
    LocalMatrix2DComponent.ty[id] = y;
    WorldMatrix2DComponent.a[id] = 1;
    WorldMatrix2DComponent.d[id] = 1;
    WorldMatrix2DComponent.tx[id] = x;
    WorldMatrix2DComponent.ty[id] = y;
  }

  // ../phaser-genesis/src/math/vec2/Vec2.ts
  var Vec2 = class {
    constructor(x = 0, y = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      this.set(x, y);
    }
    set(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      return this;
    }
    toArray(dst = [], index = 0) {
      const { x, y } = this;
      dst[index] = x;
      dst[index + 1] = y;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1]);
    }
    toString() {
      const { x, y } = this;
      return `{ x=${x}, y=${y} }`;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColors.ts
  function PackColors(vertices) {
    vertices.forEach((vertex) => {
      vertex.packColor();
    });
  }

  // ../phaser-genesis/src/components/transform/UpdateVertices.ts
  function UpdateVertices(vertices, worldTransform, transformExtent) {
    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVertices(worldTransform, transformExtent);
    vertices[0].setPosition(x0, y0);
    vertices[1].setPosition(x1, y1);
    vertices[2].setPosition(x2, y2);
    vertices[3].setPosition(x3, y3);
  }

  // ../phaser-genesis/src/components/transform/PreRenderVertices.ts
  function PreRenderVertices(gameObject) {
    const vertices = gameObject.vertices;
    if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
      PackColors(vertices);
      gameObject.clearDirty(DIRTY_CONST.COLORS);
    }
    if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
      UpdateVertices(vertices, gameObject.worldTransform, gameObject.transformExtent);
      gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
    }
    return gameObject;
  }

  // ../phaser-genesis/src/components/transform/UpdateExtent.ts
  function UpdateExtent(id, width, height) {
    const x = -Transform2DComponent.originX[id] * width;
    const y = -Transform2DComponent.originY[id] * height;
    Extent2DComponent.x[id] = x;
    Extent2DComponent.y[id] = y;
    Extent2DComponent.width[id] = width;
    Extent2DComponent.height[id] = height;
    Extent2DComponent.right[id] = x + width;
    Extent2DComponent.bottom[id] = y + height;
    SetDirtyTransform(id);
  }

  // ../phaser-genesis/src/components/transform/UpdateLocalTransform2DSystem.ts
  var changedLocalTransformQuery = defineQuery([Changed(Transform2DComponent)]);
  var entities;
  var updateLocalTransformSystem = defineSystem((world3) => {
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
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
    }
    return world3;
  });
  var UpdateLocalTransform2DSystem = (world3) => {
    entities = changedLocalTransformQuery(world3);
    updateLocalTransformSystem(world3);
    return entities;
  };

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

  // ../phaser-genesis/src/world/RenderDataComponent.ts
  var RenderData = defineComponent({
    gameFrame: Types.ui32,
    dirtyFrame: Types.ui32,
    numRendered: Types.ui32,
    numRenderable: Types.ui32
  });
  var RenderDataComponent = RenderData;

  // ../phaser-genesis/src/world/ResetWorldRenderData.ts
  var numWorldTransforms = 0;
  function ResetWorldRenderData(id, gameFrame) {
    numWorldTransforms = 0;
    RenderDataComponent.gameFrame[id] = gameFrame;
    RenderDataComponent.dirtyFrame[id] = 0;
    RenderDataComponent.numRendered[id] = 0;
    RenderDataComponent.numRenderable[id] = 0;
  }
  function UpdateNumWorldTransforms() {
    numWorldTransforms++;
  }
  function GetNumWorldTransforms() {
    return numWorldTransforms;
  }

  // ../phaser-genesis/src/components/permissions/WillTransformChildren.ts
  function WillTransformChildren(id) {
    return Boolean(PermissionsComponent.willTransformChildren[id]);
  }

  // ../phaser-genesis/src/components/transform/UpdateWorldTransform.ts
  function UpdateWorldTransform(id) {
    const parentID = GetParentID(id);
    if (parentID === 0) {
      CopyLocalToWorld(id, id);
    } else if (!WillTransformChildren(id)) {
      CopyWorldToWorld(parentID, id);
    } else {
      MultiplyLocalWithWorld(parentID, id);
    }
    UpdateNumWorldTransforms();
  }

  // ../phaser-genesis/src/components/transform/UpdateWorldTransform2DSystem.ts
  var changedWorldTransformQuery = defineQuery([Changed(LocalMatrix2DComponent)]);
  var updateWorldTransformSystem = defineSystem((world3) => {
    const entities3 = changedWorldTransformQuery(world3);
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
  });

  // ../phaser-genesis/src/components/vertices/VertexWorld.ts
  var world2 = createWorld();
  var VertexWorld = world2;

  // ../phaser-genesis/src/components/vertices/AddVertex.ts
  function AddVertex() {
    const vertexID = addEntity(VertexWorld);
    addComponent(VertexWorld, VertexComponent, vertexID);
    VertexComponent.alpha[vertexID] = 1;
    VertexComponent.tint[vertexID] = 16777215;
    VertexComponent.color[vertexID] = 4294967295;
    return vertexID;
  }

  // ../phaser-genesis/src/components/vertices/UpdateVertexPositionSystem.ts
  var changedWorldExtentQuery = defineQuery([
    Changed(WorldMatrix2DComponent),
    Changed(Extent2DComponent)
  ]);
  var entities2;
  var updateVertexPositionSystem = defineSystem((world3) => {
    for (let i = 0; i < entities2.length; i++) {
      const id = entities2[i];
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
      const v1 = QuadVertexComponent.v1[id];
      const v2 = QuadVertexComponent.v2[id];
      const v3 = QuadVertexComponent.v3[id];
      const v4 = QuadVertexComponent.v4[id];
      VertexComponent.x[v1] = x * a + y * c + tx;
      VertexComponent.y[v1] = x * b + y * d + ty;
      VertexComponent.x[v2] = x * a + bottom * c + tx;
      VertexComponent.y[v2] = x * b + bottom * d + ty;
      VertexComponent.x[v3] = right * a + bottom * c + tx;
      VertexComponent.y[v3] = right * b + bottom * d + ty;
      VertexComponent.x[v4] = right * a + y * c + tx;
      VertexComponent.y[v4] = right * b + y * d + ty;
    }
    return world3;
  });
  var UpdateVertexPositionSystem = (world3) => {
    entities2 = changedWorldExtentQuery(world3);
    updateVertexPositionSystem(world3);
    return entities2;
  };

  // ../phaser-genesis/src/renderer/webgl1/draw/AddVertexToBatch.ts
  function AddVertexToBatch(id, offset, textureIndex, F32, U32) {
    VertexComponent.offset[id] = offset;
    F32[offset + 0] = VertexComponent.x[id];
    F32[offset + 1] = VertexComponent.y[id];
    F32[offset + 2] = VertexComponent.u[id];
    F32[offset + 3] = VertexComponent.v[id];
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = VertexComponent.color[id];
    return offset + 6;
  }

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuad.ts
  function BatchTexturedQuad(texture, id, renderPass) {
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);
    const textureIndex = SetTexture(renderPass, texture);
    let vertOffset = AddVertexToBatch(QuadVertexComponent.v1[id], offset, textureIndex, F32, U32);
    vertOffset = AddVertexToBatch(QuadVertexComponent.v2[id], vertOffset, textureIndex, F32, U32);
    vertOffset = AddVertexToBatch(QuadVertexComponent.v3[id], vertOffset, textureIndex, F32, U32);
    AddVertexToBatch(QuadVertexComponent.v4[id], vertOffset, textureIndex, F32, U32);
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginX.ts
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginY.ts
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // ../phaser-genesis/src/display/RemoveChildrenBetween.ts
  function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const children = parent.children;
    if (endIndex === void 0) {
      endIndex = children.length;
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const removed2 = children.splice(beginIndex, range);
      removed2.forEach((child) => {
        child.parent = null;
      });
      return removed2;
    } else {
      return [];
    }
  }

  // ../phaser-genesis/src/display/DestroyChildren.ts
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed2 = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed2.forEach((child) => {
      child.destroy();
    });
  }

  // ../phaser-genesis/src/gameobjects/events/DestroyEvent.ts
  var DestroyEvent = "destroy";

  // ../phaser-genesis/src/events/Emit.ts
  function Emit(emitter, event, ...args) {
    if (emitter.events.size === 0 || !emitter.events.has(event)) {
      return false;
    }
    const listeners = emitter.events.get(event);
    const handlers = [...listeners];
    for (const ee of handlers) {
      ee.callback.apply(ee.context, args);
      if (ee.once) {
        listeners.delete(ee);
      }
    }
    if (listeners.size === 0) {
      emitter.events.delete(event);
    }
    return true;
  }

  // ../phaser-genesis/src/display/DepthFirstSearch.ts
  function DepthFirstSearch(parent) {
    const stack = [parent];
    const output = [];
    while (stack.length > 0) {
      const node = stack.shift();
      output.push(node);
      const numChildren = node.numChildren;
      if (numChildren > 0) {
        for (let i = numChildren - 1; i >= 0; i--) {
          stack.unshift(node.children[i]);
        }
      }
    }
    output.shift();
    return output;
  }

  // ../phaser-genesis/src/display/GetChildIndex.ts
  function GetChildIndex(parent, child) {
    return GameObjectTree.get(parent.id).indexOf(child.id);
  }

  // ../phaser-genesis/src/display/RemoveChildAt.ts
  function RemoveChildAt(parent, index) {
    const children = GameObjectTree.get(parent.id);
    if (index >= 0 && index < children.length) {
      const removedID = children.splice(index, 1)[0];
      if (removedID) {
        const worldID = GetWorldID(removedID);
        SetDirtyDisplayList(worldID);
        ClearWorldAndParentID(removedID);
        UpdateNumChildren(parent.id);
        return GameObjectCache.get(removedID);
      }
    }
  }

  // ../phaser-genesis/src/display/RemoveChild.ts
  function RemoveChild(parent, child) {
    if (child.hasParent()) {
      RemoveChildAt(parent, GetChildIndex(parent, child));
    }
    return child;
  }

  // ../phaser-genesis/src/display/SetWorld.ts
  function SetWorld(world3, ...children) {
    children.forEach((child) => {
      addComponent(GameObjectWorld, world3.tag, child.id);
    });
    return children;
  }

  // ../phaser-genesis/src/display/SetParent.ts
  function SetParent2(parent, ...children) {
    children.forEach((child) => {
      if (child.parent) {
        RemoveChild(child.parent, child);
      }
      child.parent = parent;
    });
    const parentWorld = parent.world;
    if (parentWorld) {
      SetWorld(parentWorld, ...DepthFirstSearch(parent));
    }
    return children;
  }

  // ../phaser-genesis/src/display/ReparentChildren.ts
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    SetParent2(newParent, ...moved);
    moved.forEach((child) => {
      child.updateWorldTransform();
    });
    return moved;
  }

  // ../phaser-genesis/src/gameobjects/GameObject.ts
  var GameObject = class {
    constructor() {
      __publicField(this, "id", addEntity(GameObjectWorld));
      __publicField(this, "name", "");
      __publicField(this, "events");
      const id = this.id;
      AddHierarchyComponent(id);
      AddPermissionsComponent(id);
      AddDirtyComponent(id);
      GameObjectCache.set(id, this);
      GameObjectTree.set(id, []);
      this.events = new Map();
    }
    isRenderable() {
      return WillRender(this.id);
    }
    beforeUpdate(delta, time) {
    }
    update(delta, time) {
      this.beforeUpdate(delta, time);
      if (WillUpdateChildren(this.id)) {
        const children = GameObjectTree.get(this.id);
        for (let i = 0; i < children.length; i++) {
          const childID = children[i];
          if (WillUpdate(childID)) {
            GameObjectCache.get(childID).update(delta, time);
          }
        }
      }
      this.afterUpdate(delta, time);
    }
    afterUpdate(delta, time) {
    }
    renderGL(renderPass) {
    }
    renderCanvas(renderer) {
    }
    postRenderGL(renderPass) {
    }
    postRenderCanvas(renderer) {
    }
    set visible(value) {
      PermissionsComponent.visible[this.id] = Number(value);
    }
    get visible() {
      return Boolean(PermissionsComponent.visible[this.id]);
    }
    set visibleChildren(value) {
      PermissionsComponent.visibleChildren[this.id] = Number(value);
    }
    get visibleChildren() {
      return Boolean(PermissionsComponent.visibleChildren[this.id]);
    }
    set depth(value) {
      HierarchyComponent.depth[this.id] = value;
    }
    get depth() {
      return HierarchyComponent.depth[this.id];
    }
    hasParent() {
      return HierarchyComponent.parentID[this.id] > 0;
    }
    getParent() {
      return GetParentGameObject(this.id);
    }
    getChildren() {
      return GetChildren(this.id);
    }
    getNumChildren() {
      return GetNumChildren(this.id);
    }
    destroy(reparentChildren) {
      if (reparentChildren) {
        ReparentChildren(this, reparentChildren);
      } else {
        DestroyChildren(this);
      }
      Emit(this, DestroyEvent, this);
      this.events.clear();
      this.events = null;
    }
  };

  // ../phaser-genesis/src/gameobjects/container/Container.ts
  var Container = class extends GameObject {
    constructor(x = 0, y = 0) {
      super();
      __publicField(this, "_alpha", 1);
      AddTransform2DComponent(this.id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
    }
    updateWorldTransform() {
    }
    getBounds() {
      return this.bounds.get();
    }
    setSize(width, height = width) {
      UpdateExtent(this.id, width, height);
      return this;
    }
    setPosition(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
    setSkew(x, y = x) {
      this.skewX = x;
      this.skewY = y;
      return this;
    }
    setScale(x, y = x) {
      this.scaleX = x;
      this.scaleY = y;
      return this;
    }
    setRotation(value) {
      this.rotation = value;
      return this;
    }
    setOrigin(x, y = x) {
      const id = this.id;
      Transform2DComponent.originX[id] = x;
      Transform2DComponent.originY[id] = y;
      UpdateExtent(id, this.width, this.height);
      return this;
    }
    getSize(out = new Vec2()) {
      return out.set(Extent2DComponent.width[this.id], Extent2DComponent.height[this.id]);
    }
    getPosition(out = new Vec2()) {
      return out.set(this.x, this.y);
    }
    getOrigin(out = new Vec2()) {
      return out.set(this.originX, this.originY);
    }
    getSkew(out = new Vec2()) {
      return out.set(this.skewX, this.skewY);
    }
    getScale(out = new Vec2()) {
      return out.set(this.scaleX, this.scaleY);
    }
    getRotation() {
      return this.rotation;
    }
    set width(value) {
      UpdateExtent(this.id, value, this.height);
    }
    get width() {
      return Extent2DComponent.width[this.id];
    }
    set height(value) {
      UpdateExtent(this.id, this.width, value);
    }
    get height() {
      return Extent2DComponent.height[this.id];
    }
    set x(value) {
      Transform2DComponent.x[this.id] = value;
    }
    get x() {
      return Transform2DComponent.x[this.id];
    }
    set y(value) {
      Transform2DComponent.y[this.id] = value;
    }
    get y() {
      return Transform2DComponent.y[this.id];
    }
    set originX(value) {
      Transform2DComponent.originX[this.id] = value;
      UpdateExtent(this.id, this.width, this.height);
    }
    get originX() {
      return Transform2DComponent.originX[this.id];
    }
    set originY(value) {
      Transform2DComponent.originY[this.id] = value;
      UpdateExtent(this.id, this.width, this.height);
    }
    get originY() {
      return Transform2DComponent.originY[this.id];
    }
    set skewX(value) {
      Transform2DComponent.skewX[this.id] = value;
    }
    get skewX() {
      return Transform2DComponent.skewX[this.id];
    }
    set skewY(value) {
      Transform2DComponent.skewY[this.id] = value;
    }
    get skewY() {
      return Transform2DComponent.skewY[this.id];
    }
    set scaleX(value) {
      Transform2DComponent.scaleX[this.id] = value;
    }
    get scaleX() {
      return Transform2DComponent.scaleX[this.id];
    }
    set scaleY(value) {
      Transform2DComponent.scaleY[this.id] = value;
    }
    get scaleY() {
      return Transform2DComponent.scaleY[this.id];
    }
    set rotation(value) {
      Transform2DComponent.rotation[this.id] = value;
    }
    get rotation() {
      return Transform2DComponent.rotation[this.id];
    }
    get alpha() {
      return this._alpha;
    }
    set alpha(value) {
      this._alpha = value;
      SetDirtyAlpha(this.id);
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
    }
  };

  // ../phaser-genesis/src/renderer/canvas/draw/DrawImage.ts
  function DrawImage(frame2, alpha, worldTransform, transformExtent, renderer) {
    if (!frame2) {
      return;
    }
    const ctx = renderer.ctx;
    const { a, b, c, d, tx, ty } = worldTransform;
    const { x, y } = transformExtent;
    ctx.save();
    ctx.setTransform(a, b, c, d, tx, ty);
    ctx.globalAlpha = alpha;
    ctx.drawImage(frame2.texture.image, frame2.x, frame2.y, frame2.width, frame2.height, x, y, frame2.width, frame2.height);
    ctx.restore();
  }

  // ../phaser-genesis/src/gameobjects/sprite/SetFrame.ts
  function SetFrame(texture, key, ...children) {
    const frame2 = texture.getFrame(key);
    const pivot = frame2.pivot;
    children.forEach((child) => {
      if (!child || frame2 === child.frame) {
        return;
      }
      child.frame = frame2;
      child.hasTexture = true;
      if (pivot) {
        child.setOrigin(pivot.x, pivot.y);
      }
      frame2.copyToExtent(child);
      frame2.copyToVertices(child.id);
    });
    return children;
  }

  // ../phaser-genesis/src/textures/TextureManagerInstance.ts
  var instance3;
  var TextureManagerInstance = {
    get: () => {
      return instance3;
    },
    set: (manager) => {
      instance3 = manager;
    }
  };

  // ../phaser-genesis/src/textures/GetTexture.ts
  function GetTexture(key) {
    return TextureManagerInstance.get().get(key);
  }

  // ../phaser-genesis/src/gameobjects/sprite/SetTexture.ts
  function SetTexture2(key, frame2, ...children) {
    if (!key) {
      children.forEach((child) => {
        child.texture = null;
        child.frame = null;
        child.hasTexture = false;
      });
    } else {
      let texture;
      if (key instanceof Frame) {
        frame2 = key;
        texture = key.texture;
      } else if (key instanceof Texture) {
        texture = key;
      } else {
        texture = GetTexture(key);
      }
      if (!texture) {
        console.warn(`Invalid Texture key: ${key}`);
      } else {
        children.forEach((child) => {
          child.texture = texture;
        });
        SetFrame(texture, frame2, ...children);
      }
    }
    return children;
  }

  // ../phaser-genesis/src/gameobjects/sprite/Sprite.ts
  var Sprite = class extends Container {
    constructor(x, y, texture, frame2) {
      super(x, y);
      __publicField(this, "texture");
      __publicField(this, "frame");
      __publicField(this, "hasTexture", false);
      __publicField(this, "_tint", 16777215);
      const id = this.id;
      addComponent(GameObjectWorld, QuadVertexComponent, id);
      QuadVertexComponent.v1[id] = AddVertex();
      QuadVertexComponent.v2[id] = AddVertex();
      QuadVertexComponent.v3[id] = AddVertex();
      QuadVertexComponent.v4[id] = AddVertex();
      this.setTexture(texture, frame2);
    }
    setTexture(key, frame2) {
      SetTexture2(key, frame2, this);
      return this;
    }
    setFrame(key) {
      SetFrame(this.texture, key, this);
      return this;
    }
    isRenderable() {
      return this.visible && this.hasTexture && WillRender(this.id) && this.alpha > 0;
    }
    renderGL(renderPass) {
      BatchTexturedQuad(this.texture, this.id, renderPass);
    }
    renderCanvas(renderer) {
      PreRenderVertices(this);
      DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
    }
    get tint() {
      return this._tint;
    }
    set tint(value) {
      if (value !== this._tint) {
        this._tint = value;
        SetDirtyVertexColors(this.id);
      }
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.texture = null;
      this.frame = null;
      this.hasTexture = false;
    }
  };

  // ../phaser-genesis/src/textures/CreateCanvas.ts
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // ../phaser-genesis/src/display/IsValidParent.ts
  function IsValidParent(parent, child) {
    return !(child.id === parent.id || parent.id === GetParentID(child.id));
  }

  // ../phaser-genesis/src/display/AddChild.ts
  function AddChild(parent, child) {
    const childID = child.id;
    const parentID = parent.id;
    const worldID = GetWorldID(parentID);
    const world3 = GameObjectCache.get(worldID);
    if (IsValidParent(parent, child)) {
      RemoveChild(child.getParent(), child);
      GameObjectTree.get(parentID).push(childID);
      SetWorldAndParentID(childID, worldID, parentID);
      SetParentID(childID, parentID);
      SetWorld(world3, child);
      SetDirtyDisplayList(worldID);
      UpdateNumChildren(parentID);
    }
    return child;
  }

  // ../phaser-genesis/src/display/RemoveChildren.ts
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

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

  // ../phaser-genesis/src/math/mat2d/Mat2dEquals.ts
  function Mat2dEquals(a, b) {
    return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
  }

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

  // ../phaser-genesis/src/math/Between.ts
  function Between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // ../phaser-genesis/src/dom/AddToDOM.ts
  function AddToDOM(element, parent) {
    const target = GetElement(parent);
    target.appendChild(element);
    return element;
  }

  // ../phaser-genesis/src/dom/DOMContentLoaded.ts
  function DOMContentLoaded(callback) {
    const readyState = document.readyState;
    if (readyState === "complete" || readyState === "interactive") {
      callback();
      return;
    }
    const check = () => {
      document.removeEventListener("deviceready", check, true);
      document.removeEventListener("DOMContentLoaded", check, true);
      window.removeEventListener("load", check, true);
      callback();
    };
    if (!document.body) {
      window.setTimeout(check, 20);
    } else if (window.hasOwnProperty("cordova")) {
      document.addEventListener("deviceready", check, true);
    } else {
      document.addEventListener("DOMContentLoaded", check, true);
      window.addEventListener("load", check, true);
    }
  }

  // ../phaser-genesis/src/events/EventEmitter.ts
  var EventEmitter = class {
    constructor() {
      __publicField(this, "events");
      this.events = new Map();
    }
  };

  // ../phaser-genesis/src/events/EventInstance.ts
  var EventInstance = class {
    constructor(callback, context, once = false) {
      __publicField(this, "callback");
      __publicField(this, "context");
      __publicField(this, "once");
      this.callback = callback;
      this.context = context;
      this.once = once;
    }
  };

  // ../phaser-genesis/src/events/On.ts
  function On(emitter, event, callback, context = emitter, once = false) {
    if (typeof callback !== "function") {
      throw new TypeError("Listener not a function");
    }
    const listener = new EventInstance(callback, context, once);
    const listeners = emitter.events.get(event);
    if (!listeners) {
      emitter.events.set(event, new Set([listener]));
    } else {
      listeners.add(listener);
    }
    return listener;
  }

  // ../phaser-genesis/src/events/Once.ts
  function Once(emitter, event, callback, context = emitter) {
    return On(emitter, event, callback, context, true);
  }

  // ../phaser-genesis/src/config/banner/GetBanner.ts
  function GetBanner() {
    const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
    if (title !== "") {
      const str = version !== "" ? title + " " + version : title;
      console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
    }
  }

  // ../phaser-genesis/src/config/globalvar/GetGlobalVar.ts
  function GetGlobalVar() {
    return ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
  }

  // ../phaser-genesis/src/config/parent/GetParent.ts
  function GetParent() {
    return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
  }

  // ../phaser-genesis/src/config/renderer/GetRenderer.ts
  function GetRenderer() {
    return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
  }

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
  var RenderStatsComponent = RenderStats;

  // ../phaser-genesis/src/scenes/AddRenderStatsComponent.ts
  function AddRenderStatsComponent(id) {
    addComponent(GameObjectWorld, RenderStatsComponent, id);
  }

  // ../phaser-genesis/src/config/scenes/GetScenes.ts
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // ../phaser-genesis/src/scenes/ResetRenderStats.ts
  function ResetRenderStats(id, gameFrame, scenes, worlds2, transforms) {
    RenderStatsComponent.gameFrame[id] = gameFrame;
    RenderStatsComponent.numScenes[id] = scenes;
    RenderStatsComponent.numWorlds[id] = worlds2;
    RenderStatsComponent.numGameObjects[id] = 0;
    RenderStatsComponent.numGameObjectsRendered[id] = 0;
    RenderStatsComponent.numDirtyWorldLists[id] = 0;
    RenderStatsComponent.numDirtyVertices[id] = 0;
    RenderStatsComponent.numDirtyLocalTransforms[id] = transforms;
    RenderStatsComponent.numDirtyWorldTransforms[id] = 0;
    RenderStatsComponent.numDirtyCameras[id] = 0;
  }

  // ../phaser-genesis/src/scenes/SceneManagerInstance.ts
  var instance4;
  var SceneManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      if (instance4) {
        throw new Error("SceneManager should not be instantiated more than once");
      }
      instance4 = manager;
    }
  };

  // ../phaser-genesis/src/scenes/SceneManager.ts
  var SceneManager = class {
    constructor() {
      __publicField(this, "id", addEntity(GameObjectWorld));
      __publicField(this, "game");
      __publicField(this, "scenes", new Map());
      __publicField(this, "sceneIndex", 0);
      __publicField(this, "flush");
      __publicField(this, "changedMatrixQuery", defineQuery([Changed(LocalMatrix2DComponent)]));
      this.game = GameInstance.get();
      SceneManagerInstance.set(this);
      AddRenderStatsComponent(this.id);
      Once(this.game, "boot", () => this.boot());
    }
    boot() {
      GetScenes().forEach((scene) => new scene());
    }
    update(delta, time, gameFrame) {
      let sceneTotal = 0;
      let worldTotal = 0;
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          world3.beforeUpdate(delta, time);
          world3.update(delta, time);
          world3.afterUpdate(delta, time);
          worldTotal++;
        }
        sceneTotal++;
      }
      const localTransforms = UpdateLocalTransform2DSystem(GameObjectWorld);
      ResetRenderStats(this.id, gameFrame, sceneTotal, worldTotal, localTransforms.length);
    }
    preRender(gameFrame) {
      const dirtyTransforms = this.changedMatrixQuery(GameObjectWorld);
      let dirtyWorld = false;
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          if (world3.preRender(gameFrame, dirtyTransforms)) {
            dirtyWorld = true;
          }
        }
      }
      const verts = UpdateVertexPositionSystem(GameObjectWorld);
      RenderStatsComponent.numDirtyVertices[this.id] = verts.length;
      if (dirtyWorld) {
        this.flush = true;
      }
    }
    updateWorldStats(numGameObjects, numRendered, numDisplayLists, numWorldTransforms2) {
      const id = this.id;
      RenderStatsComponent.numGameObjects[id] += numGameObjects;
      RenderStatsComponent.numGameObjectsRendered[id] += numRendered;
      RenderStatsComponent.numDirtyWorldLists[id] += numDisplayLists;
      RenderStatsComponent.numDirtyWorldTransforms[id] += numWorldTransforms2;
    }
  };

  // ../phaser-genesis/src/config/SetConfigDefaults.ts
  function SetConfigDefaults() {
    SetBackgroundColor(0);
    SetBatchSize(4096);
    SetBanner("Phaser", "4.0.0", "https://phaser4.io");
    SetMaxTextures(0);
    SetDefaultOrigin(0.5, 0.5);
    SetSize(800, 600, 1);
    SetWebGLContext({
      antialias: true,
      desynchronized: true,
      preserveDrawingBuffer: true
    });
    SetWorldSize(512);
  }

  // ../phaser-genesis/src/textures/TextureManager.ts
  var TextureManager = class {
    constructor() {
      __publicField(this, "textures");
      this.textures = new Map();
      this.createDefaultTextures();
      TextureManagerInstance.set(this);
    }
    createDefaultTextures() {
      this.add("__BLANK", new Texture(CreateCanvas(32, 32).canvas));
      const missing = CreateCanvas(32, 32);
      missing.strokeStyle = "#0f0";
      missing.moveTo(0, 0);
      missing.lineTo(32, 32);
      missing.stroke();
      missing.strokeRect(0.5, 0.5, 31, 31);
      this.add("__MISSING", new Texture(missing.canvas));
      const white = CreateCanvas(32, 32);
      white.fillStyle = "#fff";
      white.fillRect(0, 0, 32, 32);
      this.add("__WHITE", new Texture(white.canvas));
    }
    get(key) {
      const textures = this.textures;
      if (textures.has(key)) {
        return textures.get(key);
      } else {
        return textures.get("__MISSING");
      }
    }
    has(key) {
      return this.textures.has(key);
    }
    add(key, source, glConfig) {
      let texture;
      const textures = this.textures;
      if (!textures.has(key)) {
        if (source instanceof Texture) {
          texture = source;
        } else {
          texture = new Texture(source, 0, 0, glConfig);
        }
        texture.key = key;
        textures.set(key, texture);
      }
      return texture;
    }
  };

  // ../phaser-genesis/src/Game.ts
  var Game = class extends EventEmitter {
    constructor(...settings) {
      super();
      __publicField(this, "id", addEntity(GameObjectWorld));
      __publicField(this, "VERSION", "4.0.0-beta1");
      __publicField(this, "isBooted", false);
      __publicField(this, "isPaused", false);
      __publicField(this, "willUpdate", true);
      __publicField(this, "willRender", true);
      __publicField(this, "lastTick", 0);
      __publicField(this, "elapsed", 0);
      __publicField(this, "frame", 0);
      __publicField(this, "renderer");
      __publicField(this, "textureManager");
      __publicField(this, "sceneManager");
      GameInstance.set(this);
      SetConfigDefaults();
      DOMContentLoaded(() => this.boot(settings));
    }
    boot(settings) {
      settings.forEach((setting) => setting());
      const renderer = GetRenderer();
      this.renderer = new renderer();
      this.textureManager = new TextureManager();
      this.sceneManager = new SceneManager();
      const parent = GetParent();
      if (parent) {
        AddToDOM(this.renderer.canvas, parent);
      }
      const globalVar = GetGlobalVar();
      if (globalVar && window) {
        window[globalVar] = this;
      }
      this.isBooted = true;
      GetBanner();
      Emit(this, "boot");
      this.lastTick = performance.now();
      this.step(this.lastTick);
    }
    pause() {
      this.isPaused = true;
    }
    resume() {
      this.isPaused = false;
      this.lastTick = performance.now();
    }
    step(time) {
      const delta = time - this.lastTick;
      this.lastTick = time;
      this.elapsed += delta;
      const renderer = this.renderer;
      const sceneManager = this.sceneManager;
      if (!this.isPaused) {
        if (this.willUpdate) {
          sceneManager.update(delta, time, this.frame);
        }
        if (this.willRender) {
          sceneManager.preRender(this.frame);
          renderer.render(sceneManager.flush, sceneManager.scenes);
          sceneManager.flush = false;
        }
      }
      Emit(this, "step");
      this.frame++;
      GameInstance.setFrame(this.frame);
      GameInstance.setElapsed(this.elapsed);
      requestAnimationFrame((now) => this.step(now));
    }
    destroy() {
    }
  };

  // ../phaser-genesis/src/loader/File.ts
  var File = class {
    constructor(key, url, config) {
      __publicField(this, "key");
      __publicField(this, "url");
      __publicField(this, "responseType", "text");
      __publicField(this, "crossOrigin");
      __publicField(this, "data");
      __publicField(this, "error");
      __publicField(this, "config");
      __publicField(this, "skipCache", false);
      __publicField(this, "hasLoaded", false);
      __publicField(this, "loader");
      __publicField(this, "load");
      this.key = key;
      this.url = url;
      this.config = config;
    }
  };

  // ../phaser-genesis/src/loader/GetURL.ts
  function GetURL(key, url, extension, loader) {
    if (!url) {
      url = key + extension;
    }
    if (/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.exec(url)) {
      return url;
    } else if (loader) {
      return loader.baseURL + loader.path + url;
    } else {
      return url;
    }
  }

  // ../phaser-genesis/src/loader/ImageLoader.ts
  function ImageTagLoader(file) {
    const fileCast = file;
    fileCast.data = new Image();
    if (fileCast.crossOrigin) {
      fileCast.data.crossOrigin = file.crossOrigin;
    }
    return new Promise((resolve, reject) => {
      fileCast.data.onload = () => {
        if (fileCast.data.onload) {
          fileCast.data.onload = null;
          fileCast.data.onerror = null;
          resolve(fileCast);
        }
      };
      fileCast.data.onerror = (event) => {
        if (fileCast.data.onload) {
          fileCast.data.onload = null;
          fileCast.data.onerror = null;
          fileCast.error = event;
          reject(fileCast);
        }
      };
      fileCast.data.src = file.url;
      if (fileCast.data.complete && fileCast.data.width && fileCast.data.height) {
        fileCast.data.onload = null;
        fileCast.data.onerror = null;
        resolve(fileCast);
      }
    });
  }

  // ../phaser-genesis/src/loader/files/ImageFile.ts
  function ImageFile(key, url, glConfig) {
    const file = new File(key, url);
    file.load = () => {
      file.url = GetURL(file.key, file.url, ".png", file.loader);
      if (file.loader) {
        file.crossOrigin = file.loader.crossOrigin;
      }
      return new Promise((resolve, reject) => {
        const textureManager = TextureManagerInstance.get();
        if (textureManager.has(file.key)) {
          resolve(file);
        } else {
          ImageTagLoader(file).then((file2) => {
            textureManager.add(file2.key, file2.data, glConfig);
            resolve(file2);
          }).catch((file2) => {
            reject(file2);
          });
        }
      });
    };
    return file;
  }

  // ../phaser-genesis/src/cache/Cache.ts
  var caches = new Map();

  // ../phaser-genesis/src/loader/Loader.ts
  var Loader = class extends EventEmitter {
    constructor() {
      super();
      __publicField(this, "baseURL", "");
      __publicField(this, "path", "");
      __publicField(this, "crossOrigin", "anonymous");
      __publicField(this, "maxParallelDownloads", -1);
      __publicField(this, "isLoading", false);
      __publicField(this, "progress");
      __publicField(this, "queue");
      __publicField(this, "inflight");
      __publicField(this, "completed");
      __publicField(this, "onComplete");
      __publicField(this, "onError");
      this.reset();
    }
    reset() {
      this.isLoading = false;
      this.queue = new Set();
      this.inflight = new Set();
      this.completed = new Set();
      this.progress = 0;
    }
    add(...file) {
      file.forEach((entity) => {
        entity.loader = this;
        this.queue.add(entity);
      });
      return this;
    }
    start() {
      if (this.isLoading) {
        return null;
      }
      return new Promise((resolve, reject) => {
        this.completed.clear();
        this.progress = 0;
        if (this.queue.size > 0) {
          this.isLoading = true;
          this.onComplete = resolve;
          this.onError = reject;
          Emit(this, "start");
          this.nextFile();
        } else {
          this.progress = 1;
          Emit(this, "complete");
          resolve(this);
        }
      });
    }
    nextFile() {
      let limit = this.queue.size;
      if (this.maxParallelDownloads !== -1) {
        limit = Math.min(limit, this.maxParallelDownloads) - this.inflight.size;
      }
      if (limit) {
        const iterator = this.queue.values();
        while (limit > 0) {
          const file = iterator.next().value;
          this.inflight.add(file);
          this.queue.delete(file);
          file.load().then((file2) => this.fileComplete(file2)).catch((file2) => this.fileError(file2));
          limit--;
        }
      } else if (this.inflight.size === 0) {
        this.stop();
      }
    }
    stop() {
      if (!this.isLoading) {
        return;
      }
      this.isLoading = false;
      Emit(this, "complete", this.completed);
      this.onComplete();
      this.completed.clear();
    }
    updateProgress(file) {
      this.inflight.delete(file);
      this.completed.add(file);
      const totalCompleted = this.completed.size;
      const totalQueued = this.queue.size + this.inflight.size;
      if (totalCompleted > 0) {
        this.progress = totalCompleted / (totalCompleted + totalQueued);
      }
      Emit(this, "progress", this.progress, totalCompleted, totalQueued);
      this.nextFile();
    }
    fileComplete(file) {
      Emit(this, "filecomplete", file);
      this.updateProgress(file);
    }
    fileError(file) {
      Emit(this, "fileerror", file);
      this.updateProgress(file);
    }
    totalFilesToLoad() {
      return this.queue.size + this.inflight.size;
    }
    setBaseURL(url = "") {
      if (url !== "" && url.substr(-1) !== "/") {
        url = url.concat("/");
      }
      this.baseURL = url;
      return this;
    }
    setPath(path = "") {
      if (path !== "" && path.substr(-1) !== "/") {
        path = path.concat("/");
      }
      this.path = path;
      return this;
    }
    setCORS(crossOrigin) {
      this.crossOrigin = crossOrigin;
      return this;
    }
    setMaxParallelDownloads(max) {
      this.maxParallelDownloads = max;
      return this;
    }
  };

  // examples/src/display/world transform stats.ts
  var import_tweakpane = __toModule(require_tweakpane());

  // ../phaser-genesis/src/scenes/GetConfigValue.ts
  function GetConfigValue(config, property, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(config, property)) {
      return config[property];
    } else {
      return defaultValue;
    }
  }

  // ../phaser-genesis/src/scenes/Install.ts
  function Install(scene, config = {}) {
    const sceneManager = SceneManagerInstance.get();
    const size = sceneManager.scenes.size;
    const sceneIndex = sceneManager.sceneIndex;
    const firstScene = size === 0;
    if (typeof config === "string") {
      scene.key = config;
    } else if (config || !config && firstScene) {
      scene.key = GetConfigValue(config, "key", "scene" + sceneIndex.toString());
    }
    if (sceneManager.scenes.has(scene.key)) {
      console.warn("Scene key already in use: " + scene.key);
    } else {
      sceneManager.scenes.set(scene.key, scene);
      sceneManager.flush = true;
      sceneManager.sceneIndex++;
    }
    WorldList.set(scene, []);
  }

  // ../phaser-genesis/src/scenes/Scene.ts
  var Scene = class {
    constructor(config) {
      __publicField(this, "key");
      __publicField(this, "game");
      __publicField(this, "events");
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // ../phaser-genesis/src/world/events/WorldAfterUpdateEvent.ts
  var WorldAfterUpdateEvent = "afterupdate";

  // ../phaser-genesis/src/world/events/WorldBeforeUpdateEvent.ts
  var WorldBeforeUpdateEvent = "beforeupdate";

  // ../phaser-genesis/src/world/events/WorldPostRenderEvent.ts
  var WorldPostRenderEvent = "worldpostrender";

  // ../phaser-genesis/src/world/events/WorldRenderEvent.ts
  var WorldRenderEvent = "worldrender";

  // ../phaser-genesis/src/world/events/WorldShutdownEvent.ts
  var WorldShutdownEvent = "worldshutdown";

  // ../phaser-genesis/src/world/events/WorldUpdateEvent.ts
  var WorldUpdateEvent = "update";

  // ../phaser-genesis/src/world/AddRenderDataComponent.ts
  function AddRenderDataComponent(id) {
    addComponent(GameObjectWorld, RenderDataComponent, id);
  }

  // ../phaser-genesis/src/world/CheckDirtyTransforms.ts
  function CheckDirtyTransforms(worldID, list) {
    for (let i = 0; i < list.length; i++) {
      if (GetWorldID(list[i]) === worldID) {
        return true;
      }
    }
    return false;
  }

  // ../phaser-genesis/src/config/worldsize/GetWorldSize.ts
  function GetWorldSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.WORLD_SIZE);
  }

  // ../phaser-genesis/src/world/RebuildWorldList.ts
  function RebuildWorldList(world3, parent) {
    if (WillRender(parent)) {
      if (world3.id !== parent) {
        world3.addToRenderList(parent, 0);
      }
      const children = GameObjectTree.get(parent);
      for (let i = 0; i < children.length; i++) {
        const nodeID = children[i];
        if (WillRender(nodeID)) {
          if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID)) {
            RebuildWorldList(world3, nodeID);
          } else {
            world3.addToRenderList(nodeID, 0);
            world3.addToRenderList(nodeID, 1);
          }
        }
      }
      if (world3.id !== parent) {
        world3.addToRenderList(parent, 1);
      }
    }
  }

  // ../phaser-genesis/src/world/RebuildWorldTransforms.ts
  function RebuildWorldTransforms(world3, parent, transformList, forceUpdate) {
    if (WillRender(parent)) {
      if (!forceUpdate && transformList.indexOf(parent) > -1) {
        forceUpdate = true;
      }
      if (forceUpdate) {
        UpdateWorldTransform(parent);
      }
      const children = GameObjectTree.get(parent);
      for (let i = 0; i < children.length; i++) {
        const nodeID = children[i];
        if (WillRender(nodeID)) {
          if (GetNumChildren(nodeID) > 0) {
            if (WillRenderChildren(nodeID) && WillTransformChildren(nodeID)) {
              RebuildWorldTransforms(world3, nodeID, transformList, forceUpdate);
            }
          } else if (forceUpdate || transformList.indexOf(nodeID) > -1) {
            UpdateWorldTransform(nodeID);
          }
        }
      }
    }
  }

  // ../phaser-genesis/src/scenes/events/SceneDestroyEvent.ts
  var SceneDestroyEvent = "destroy";

  // ../phaser-genesis/src/world/BaseWorld.ts
  var BaseWorld = class extends GameObject {
    constructor(scene) {
      super();
      __publicField(this, "tag", defineComponent());
      __publicField(this, "scene");
      __publicField(this, "sceneManager");
      __publicField(this, "camera");
      __publicField(this, "forceRefresh", false);
      __publicField(this, "is3D", false);
      __publicField(this, "runRender", false);
      __publicField(this, "renderList");
      __publicField(this, "listLength");
      __publicField(this, "totalChildren");
      __publicField(this, "totalChildrenQuery");
      __publicField(this, "dirtyWorldQuery");
      this.scene = scene;
      this.sceneManager = SceneManagerInstance.get();
      this.totalChildren = 0;
      this.totalChildrenQuery = defineQuery([this.tag]);
      this.renderList = new Uint32Array(GetWorldSize() * 4);
      this.listLength = 0;
      const id = this.id;
      AddRenderDataComponent(id);
      AddTransform2DComponent(id);
      SetWorldID(id, id);
      WorldList.get(scene).push(this);
      Once(scene, SceneDestroyEvent, () => this.destroy());
    }
    beforeUpdate(delta, time) {
      Emit(this, WorldBeforeUpdateEvent, delta, time, this);
    }
    update(delta, time) {
      if (!WillUpdate(this.id)) {
        return;
      }
      Emit(this, WorldUpdateEvent, delta, time, this);
      super.update(delta, time);
    }
    afterUpdate(delta, time) {
      Emit(this, WorldAfterUpdateEvent, delta, time, this);
    }
    addToRenderList(id, renderType) {
      let len = this.listLength;
      const list = this.renderList;
      list[len] = id;
      list[len + 1] = renderType;
      this.listLength += 2;
      len += 2;
      if (len === list.length) {
        const newList = new Uint32Array(len + GetWorldSize() * 4);
        newList.set(list, 0);
        this.renderList = newList;
      }
    }
    preRender(gameFrame, transformList) {
      const sceneManager = this.sceneManager;
      if (!this.isRenderable()) {
        this.runRender = false;
        sceneManager.updateWorldStats(this.totalChildren, 0, 0, 0);
        return false;
      }
      const id = this.id;
      const dirtyDisplayList = HasDirtyDisplayList(id);
      ResetWorldRenderData(id, gameFrame);
      let isDirty = false;
      if (dirtyDisplayList) {
        this.listLength = 0;
        RebuildWorldList(this, id);
        ClearDirtyDisplayList(id);
        isDirty = true;
        this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      }
      if (dirtyDisplayList || CheckDirtyTransforms(id, transformList)) {
        RebuildWorldTransforms(this, id, transformList, false);
        isDirty = true;
      }
      this.camera.dirtyRender = false;
      this.runRender = this.listLength > 0;
      sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), GetNumWorldTransforms());
      return isDirty;
    }
    getTotalChildren() {
      if (HasDirtyDisplayList(this.id)) {
        this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      }
      return this.totalChildren;
    }
    renderGL(renderPass) {
      Emit(this, WorldRenderEvent, this);
      const currentCamera = renderPass.current2DCamera;
      const camera = this.camera;
      if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
        Flush(renderPass);
      }
      Begin(renderPass, camera);
      const list = this.renderList;
      for (let i = 0; i < this.listLength; i += 2) {
        const eid = list[i];
        const type = list[i + 1];
        const entry = GameObjectCache.get(eid);
        if (type === 1) {
          entry.postRenderGL(renderPass);
        } else {
          entry.renderGL(renderPass);
        }
      }
    }
    postRenderGL(renderPass) {
      Emit(this, WorldPostRenderEvent, renderPass, this);
    }
    shutdown() {
      RemoveChildren(this);
      Emit(this, WorldShutdownEvent, this);
      ResetWorldRenderData(this.id, 0);
      if (this.camera) {
        this.camera.reset();
      }
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.shutdown();
      if (this.camera) {
        this.camera.destroy();
      }
      this.camera = null;
    }
  };

  // ../phaser-genesis/src/world/CreateWorldRenderData.ts
  function CreateWorldRenderData(world3, camera) {
    return {
      world: world3,
      camera,
      gameFrame: 0,
      dirtyFrame: 0,
      numRendered: 0,
      numRenderable: 0
    };
  }

  // ../phaser-genesis/src/world/StaticWorld.ts
  var StaticWorld = class extends BaseWorld {
    constructor(scene) {
      super(scene);
      __publicField(this, "camera");
      this.camera = new StaticCamera();
      this.renderData = CreateWorldRenderData(this, this.camera);
    }
  };

  // examples/src/display/world transform stats.ts
  var Demo = class extends Scene {
    constructor() {
      super();
      __publicField(this, "pane");
      __publicField(this, "world");
      __publicField(this, "renderStats");
      const loader = new Loader();
      loader.add(ImageFile("frog", "assets/frog.png"));
      loader.add(ImageFile("redfrog", "assets/redfrog.png"));
      loader.start().then(() => {
        this.world = new StaticWorld(this);
        const frogs = [];
        for (let i = 0; i < 100; i++) {
          const x = Between(0, 800);
          const y = Between(0, 600);
          AddChild(this.world, new Sprite(x, y, "frog"));
        }
        for (let i = 0; i < 100; i++) {
          const x = Between(0, 800);
          const y = Between(0, 600);
          frogs.push(AddChild(this.world, new Sprite(x, y, "redfrog")));
        }
        for (let i = 0; i < 100; i++) {
          const x = Between(0, 800);
          const y = Between(0, 600);
          AddChild(this.world, new Sprite(x, y, "frog"));
        }
        this.renderStats = {
          gameFrame: 0,
          numScenes: 0,
          numWorlds: 0,
          numGameObjects: 0,
          numGameObjectsRendered: 0,
          numDirtyLocalTransforms: 0,
          numDirtyWorldTransforms: 0,
          numDirtyVertices: 0,
          numDirtyWorldLists: 0,
          numDirtyCameras: 0
        };
        On(this.world, "update", (delta) => {
          frogs.forEach((frog) => {
            frog.rotation += 0.01;
          });
        });
        On(game, "step", () => {
          const id = this.world.sceneManager.id;
          const stats = this.renderStats;
          stats.gameFrame = RenderStatsComponent.gameFrame[id];
          stats.numScenes = RenderStatsComponent.numScenes[id];
          stats.numWorlds = RenderStatsComponent.numWorlds[id];
          stats.numGameObjects = RenderStatsComponent.numGameObjects[id];
          stats.numGameObjectsRendered = RenderStatsComponent.numGameObjectsRendered[id];
          stats.numDirtyLocalTransforms = RenderStatsComponent.numDirtyLocalTransforms[id];
          stats.numDirtyWorldTransforms = RenderStatsComponent.numDirtyWorldTransforms[id];
          stats.numDirtyVertices = RenderStatsComponent.numDirtyVertices[id];
          stats.numDirtyWorldLists = RenderStatsComponent.numDirtyWorldLists[id];
          stats.numDirtyCamera = RenderStatsComponent.numDirtyCameras[id];
          this.pane.refresh();
        });
        this.createWindow();
        this.testUPlot();
      });
    }
    testUPlot() {
    }
    createWindow() {
      this.pane = new import_tweakpane.Pane();
      const folder = this.pane.addFolder({ title: "Render Stats" });
      folder.addMonitor(this.renderStats, "gameFrame", { label: "Frame" });
      folder.addMonitor(this.renderStats, "numScenes", { label: "Scenes" });
      folder.addMonitor(this.renderStats, "numWorlds", { label: "Worlds" });
      folder.addMonitor(this.renderStats, "numGameObjects", { label: "Total" });
      folder.addMonitor(this.renderStats, "numGameObjectsRendered", { label: "Rendered" });
      folder.addMonitor(this.renderStats, "numDirtyLocalTransforms", { label: "local" });
      folder.addMonitor(this.renderStats, "numDirtyWorldTransforms", { label: "world" });
      folder.addMonitor(this.renderStats, "numDirtyVertices", { label: "vertices" });
      folder.addMonitor(this.renderStats, "numDirtyWorldLists", { label: "lists" });
    }
  };
  var game = new Game(WebGL(), Parent("gameParent"), GlobalVar("Phaser4"), BackgroundColor(657930), Scenes(Demo));
})();
/*! Tweakpane 3.0.2 (c) 2016 cocopon, licensed under the MIT license. */
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
//# sourceMappingURL=world transform stats.js.map
