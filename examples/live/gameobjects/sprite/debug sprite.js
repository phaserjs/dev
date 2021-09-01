(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // d:/wamp/www/dev/node_modules/tweakpane/dist/tweakpane.js
  var require_tweakpane = __commonJS({
    "d:/wamp/www/dev/node_modules/tweakpane/dist/tweakpane.js"(exports, module) {
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
          constructor(target, value, presetKey, last) {
            super(target);
            this.value = value;
            this.presetKey = presetKey;
            this.last = last !== null && last !== void 0 ? last : true;
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
        const className$q = ClassName("btn");
        class ButtonView {
          constructor(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$q());
            config.viewProps.bindClassModifiers(this.element);
            const buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$q("b"));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            const titleElem = doc.createElement("div");
            titleElem.classList.add(className$q("t"));
            bindValueToTextContent(config.props.value("title"), titleElem);
            this.buttonElement.appendChild(titleElem);
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
            this.setRawValue(rawValue, {
              forceEmit: false,
              last: true
            });
          }
          setRawValue(rawValue, options) {
            const opts = options !== null && options !== void 0 ? options : {
              forceEmit: false,
              last: true
            };
            const constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
            const changed = !this.equals_(this.rawValue_, constrainedValue);
            if (!changed && !opts.forceEmit) {
              return;
            }
            this.emitter.emit("beforechange", {
              sender: this
            });
            this.rawValue_ = constrainedValue;
            this.emitter.emit("change", {
              options: opts,
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
            this.setRawValue(value, {
              forceEmit: false,
              last: true
            });
          }
          setRawValue(value, options) {
            const opts = options !== null && options !== void 0 ? options : {
              forceEmit: false,
              last: true
            };
            if (this.value_ === value && !opts.forceEmit) {
              return;
            }
            this.emitter.emit("beforechange", {
              sender: this
            });
            this.value_ = value;
            this.emitter.emit("change", {
              options: opts,
              rawValue: this.value_,
              sender: this
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
        function getAllBladePositions() {
          return ["veryfirst", "first", "last", "verylast"];
        }
        const className$p = ClassName("");
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
                elem.classList.remove(className$p(void 0, POS_TO_CLASS_NAME_MAP[pos]));
              });
              this.blade.get("positions").forEach((pos) => {
                elem.classList.add(className$p(void 0, POS_TO_CLASS_NAME_MAP[pos]));
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
        const className$o = ClassName("lbl");
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
            this.element.classList.add(className$o());
            config.viewProps.bindClassModifiers(this.element);
            const labelElem = doc.createElement("div");
            labelElem.classList.add(className$o("l"));
            bindValueMap(config.props, "label", (value) => {
              if (isEmpty(value)) {
                this.element.classList.add(className$o(void 0, "nol"));
              } else {
                this.element.classList.remove(className$o(void 0, "nol"));
                removeChildNodes(labelElem);
                labelElem.appendChild(createLabelNode(doc, value));
              }
            });
            this.element.appendChild(labelElem);
            this.labelElement = labelElem;
            const valueElem = doc.createElement("div");
            valueElem.classList.add(className$o("v"));
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
              event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey, ev.options.last)
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
                event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey, ev.options.last)
              });
            } else if (bc instanceof ValueBladeController) {
              const api = getApiByController(this.apiSet_, bc);
              this.emitter_.emit("change", {
                event: new TpChangeEvent(api, bc.value.rawValue, void 0, ev.options.last)
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
              options: ev.options,
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
              options: ev.options,
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
              options: ev.options,
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
          primary.emitter.on("change", (ev) => {
            preventFeedback(() => {
              secondary.setRawValue(forward(primary, secondary), ev.options);
            });
          });
          secondary.emitter.on("change", (ev) => {
            preventFeedback(() => {
              primary.setRawValue(backward(primary, secondary), ev.options);
            });
            preventFeedback(() => {
              secondary.setRawValue(forward(primary, secondary), ev.options);
            });
          });
          preventFeedback(() => {
            secondary.setRawValue(forward(primary, secondary), {
              forceEmit: false,
              last: true
            });
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
        function computeOffset$1(ev, elem) {
          const win = elem.ownerDocument.defaultView;
          const rect = elem.getBoundingClientRect();
          return {
            x: ev.pageX - ((win && win.scrollX || 0) + rect.left),
            y: ev.pageY - ((win && win.scrollY || 0) + rect.top)
          };
        }
        class PointerHandler {
          constructor(element) {
            this.lastTouch_ = null;
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
              data: this.computePosition_(computeOffset$1(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          }
          onDocumentMouseMove_(ev) {
            this.emitter.emit("move", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset$1(ev, this.elem_)),
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
              data: this.computePosition_(computeOffset$1(ev, this.elem_)),
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
            this.lastTouch_ = touch;
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
            this.lastTouch_ = touch;
          }
          onTouchEnd_(ev) {
            var _a;
            const touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
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
            this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
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
            this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
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
          onInputKeyDown_(ev) {
            const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
            if (step === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue + step, {
              forceEmit: false,
              last: false
            });
          }
          onInputKeyUp_(ev) {
            const step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
            if (step === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue, {
              forceEmit: true,
              last: true
            });
          }
          onPointerDown_() {
            this.originRawValue_ = this.value.rawValue;
            this.dragging_.rawValue = 0;
          }
          computeDraggingValue_(data) {
            if (!data.point) {
              return null;
            }
            const dx = data.point.x - data.bounds.width / 2;
            return this.originRawValue_ + dx * this.props.get("draggingScale");
          }
          onPointerMove_(ev) {
            const v = this.computeDraggingValue_(ev.data);
            if (v === null) {
              return;
            }
            this.value.setRawValue(v, {
              forceEmit: false,
              last: false
            });
            this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
          }
          onPointerUp_(ev) {
            const v = this.computeDraggingValue_(ev.data);
            if (v === null) {
              return;
            }
            this.value.setRawValue(v, {
              forceEmit: true,
              last: true
            });
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
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
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
            this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_);
            this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_);
            this.ptHandler_.emitter.on("up", this.onPointerUp_);
            this.view.trackElement.addEventListener("keydown", this.onKeyDown_);
            this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
          }
          handlePointerEvent_(d, opts) {
            if (!d.point) {
              return;
            }
            this.value.setRawValue(mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get("minValue"), this.props.get("maxValue")), opts);
          }
          onPointerDownOrMove_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: true,
              last: true
            });
          }
          onKeyDown_(ev) {
            const step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
            if (step === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue + step, {
              forceEmit: false,
              last: false
            });
          }
          onKeyUp_(ev) {
            const step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
            if (step === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue, {
              forceEmit: true,
              last: true
            });
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
        class Color2 {
          constructor(comps, mode) {
            this.mode_ = mode;
            this.comps_ = CONSTRAINT_MAP[mode](comps);
          }
          static black() {
            return new Color2([0, 0, 0], "rgb");
          }
          static fromObject(obj) {
            const comps = "a" in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
            return new Color2(comps, "rgb");
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
            return new Color2(comps, "rgb");
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
            return new Color2(comps, "rgb");
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
            return new Color2(comps, "hsl");
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
            return new Color2(comps, "hsl");
          },
          "hex.rgb": (text) => {
            const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRgb) {
              return new Color2([
                parseInt(mRgb[1] + mRgb[1], 16),
                parseInt(mRgb[2] + mRgb[2], 16),
                parseInt(mRgb[3] + mRgb[3], 16)
              ], "rgb");
            }
            const mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRrggbb) {
              return new Color2([
                parseInt(mRrggbb[1], 16),
                parseInt(mRrggbb[2], 16),
                parseInt(mRrggbb[3], 16)
              ], "rgb");
            }
            return null;
          },
          "hex.rgba": (text) => {
            const mRgb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRgb) {
              return new Color2([
                parseInt(mRgb[1] + mRgb[1], 16),
                parseInt(mRgb[2] + mRgb[2], 16),
                parseInt(mRgb[3] + mRgb[3], 16),
                mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1)
              ], "rgb");
            }
            const mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRrggbb) {
              return new Color2([
                parseInt(mRrggbb[1], 16),
                parseInt(mRrggbb[2], 16),
                parseInt(mRrggbb[3], 16),
                mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1)
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
          return Color2.black();
        }
        function zerofill(comp) {
          const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
          return hex.length === 1 ? `0${hex}` : hex;
        }
        function colorToHexRgbString(value, prefix = "#") {
          const hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
          return `${prefix}${hexes}`;
        }
        function colorToHexRgbaString(value, prefix = "#") {
          const rgbaComps = value.getComponents("rgb");
          const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
          return `${prefix}${hexes}`;
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
            const leftColor = new Color2([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], "rgb");
            const rightColor = new Color2([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], "rgb");
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
            this.onKeyUp_ = this.onKeyUp_.bind(this);
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
            this.view.element.addEventListener("keyup", this.onKeyUp_);
          }
          handlePointerEvent_(d, opts) {
            if (!d.point) {
              return;
            }
            const alpha = d.point.x / d.bounds.width;
            const c = this.value.rawValue;
            const [h, s, v] = c.getComponents("hsv");
            this.value.setRawValue(new Color2([h, s, v, alpha], "hsv"), opts);
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: true,
              last: true
            });
          }
          onKeyDown_(ev) {
            const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            if (step === 0) {
              return;
            }
            const c = this.value.rawValue;
            const [h, s, v, a] = c.getComponents("hsv");
            this.value.setRawValue(new Color2([h, s, v, a + step], "hsv"), {
              forceEmit: false,
              last: false
            });
          }
          onKeyUp_(ev) {
            const step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            if (step === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue, {
              forceEmit: true,
              last: true
            });
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
                  return new Color2(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode);
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
            this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color2([h, 100, 100], "hsv"));
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
            this.onKeyUp_ = this.onKeyUp_.bind(this);
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
            this.view.element.addEventListener("keyup", this.onKeyUp_);
          }
          handlePointerEvent_(d, opts) {
            if (!d.point) {
              return;
            }
            const hue = mapRange(d.point.x, 0, d.bounds.width, 0, 360);
            const c = this.value.rawValue;
            const [, s, v, a] = c.getComponents("hsv");
            this.value.setRawValue(new Color2([hue, s, v, a], "hsv"), opts);
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: true,
              last: true
            });
          }
          onKeyDown_(ev) {
            const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            if (step === 0) {
              return;
            }
            const c = this.value.rawValue;
            const [h, s, v, a] = c.getComponents("hsv");
            this.value.setRawValue(new Color2([h + step, s, v, a], "hsv"), {
              forceEmit: false,
              last: false
            });
          }
          onKeyUp_(ev) {
            const step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            if (step === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue, {
              forceEmit: true,
              last: true
            });
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
            this.onKeyUp_ = this.onKeyUp_.bind(this);
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
            this.view.element.addEventListener("keyup", this.onKeyUp_);
          }
          handlePointerEvent_(d, opts) {
            if (!d.point) {
              return;
            }
            const saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
            const value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
            const [h, , , a] = this.value.rawValue.getComponents("hsv");
            this.value.setRawValue(new Color2([h, saturation, value, a], "hsv"), opts);
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: true,
              last: true
            });
          }
          onKeyDown_(ev) {
            if (isArrowKey(ev.key)) {
              ev.preventDefault();
            }
            const [h, s, v, a] = this.value.rawValue.getComponents("hsv");
            const baseStep = getBaseStepForColor(false);
            const ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
            const dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
            if (ds === 0 && dv === 0) {
              return;
            }
            this.value.setRawValue(new Color2([h, s + ds, v + dv, a], "hsv"), {
              forceEmit: false,
              last: false
            });
          }
          onKeyUp_(ev) {
            const baseStep = getBaseStepForColor(false);
            const ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
            const dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
            if (ds === 0 && dv === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue, {
              forceEmit: true,
              last: true
            });
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
                  return new Color2(comps, p.rawValue.mode);
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
          if (Color2.isColorObject(value)) {
            return Color2.fromObject(value);
          }
          return Color2.black();
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
          return new Color2([num >> 16 & 255, num >> 8 & 255, num & 255], "rgb");
        }
        function numberToRgbaColor(num) {
          return new Color2([
            num >> 24 & 255,
            num >> 16 & 255,
            num >> 8 & 255,
            mapRange(num & 255, 0, 255, 0, 1)
          ], "rgb");
        }
        function colorFromRgbNumber(value) {
          if (typeof value !== "number") {
            return Color2.black();
          }
          return numberToRgbColor(value);
        }
        function colorFromRgbaNumber(value) {
          if (typeof value !== "number") {
            return Color2.black();
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
        function createFormatter$1(supportsAlpha) {
          return supportsAlpha ? (v) => colorToHexRgbaString(v, "0x") : (v) => colorToHexRgbString(v, "0x");
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
            equals: Color2.equals,
            writer: (args) => {
              return createColorNumberWriter(shouldSupportAlpha$1(args.params));
            }
          },
          controller: (args) => {
            const supportsAlpha = shouldSupportAlpha$1(args.params);
            const expanded = "expanded" in args.params ? args.params.expanded : void 0;
            const picker = "picker" in args.params ? args.params.picker : void 0;
            return new ColorController(args.document, {
              expanded: expanded !== null && expanded !== void 0 ? expanded : false,
              formatter: createFormatter$1(supportsAlpha),
              parser: CompositeColorParser,
              pickerLayout: picker !== null && picker !== void 0 ? picker : "popup",
              supportsAlpha,
              value: args.value,
              viewProps: args.viewProps
            });
          }
        };
        function shouldSupportAlpha(initialValue) {
          return Color2.isRgbaColorObject(initialValue);
        }
        const ObjectColorInputPlugin = {
          id: "input-color-object",
          type: "input",
          accept: (value, params) => {
            if (!Color2.isColorObject(value)) {
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
            equals: Color2.equals,
            writer: (args) => createColorObjectWriter(shouldSupportAlpha(args.initialValue))
          },
          controller: (args) => {
            const supportsAlpha = Color2.isRgbaColorObject(args.initialValue);
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
            equals: Color2.equals,
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
        function computeOffset(ev, baseSteps, invertsY) {
          return [
            getStepForKey(baseSteps[0], getHorizontalStepKeys(ev)),
            getStepForKey(baseSteps[1], getVerticalStepKeys(ev)) * (invertsY ? 1 : -1)
          ];
        }
        class Point2dPickerController {
          constructor(doc, config) {
            this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
            this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
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
            this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
          }
          handlePointerEvent_(d, opts) {
            if (!d.point) {
              return;
            }
            const max = this.maxValue_;
            const px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
            const py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
            this.value.setRawValue(new Point2d(px, py), opts);
          }
          onPointerDown_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerMove_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: false,
              last: false
            });
          }
          onPointerUp_(ev) {
            this.handlePointerEvent_(ev.data, {
              forceEmit: true,
              last: true
            });
          }
          onPadKeyDown_(ev) {
            if (isArrowKey(ev.key)) {
              ev.preventDefault();
            }
            const [dx, dy] = computeOffset(ev, this.baseSteps_, this.invertsY_);
            if (dx === 0 && dy === 0) {
              return;
            }
            this.value.setRawValue(new Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
              forceEmit: false,
              last: false
            });
          }
          onPadKeyUp_(ev) {
            const [dx, dy] = computeOffset(ev, this.baseSteps_, this.invertsY_);
            if (dx === 0 && dy === 0) {
              return;
            }
            this.value.setRawValue(this.value.rawValue, {
              forceEmit: true,
              last: true
            });
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
            this.inputElement = inputElem;
            config.value.emitter.on("change", this.onValueUpdate_);
            this.value = config.value;
            this.update_();
          }
          update_() {
            const values = this.value.rawValue;
            const lastValue = values[values.length - 1];
            this.inputElement.value = lastValue !== void 0 ? this.formatter_(lastValue) : "";
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
        function createFormatter(params) {
          return "format" in params && !isEmpty(params.format) ? params.format : createNumberFormatter(2);
        }
        function createTextMonitor(args) {
          var _a;
          if (args.value.rawValue.length === 1) {
            return new SingleLogController(args.document, {
              formatter: createFormatter(args.params),
              value: args.value,
              viewProps: args.viewProps
            });
          }
          return new MultiLogController(args.document, {
            formatter: createFormatter(args.params),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            value: args.value,
            viewProps: args.viewProps
          });
        }
        function createGraphMonitor(args) {
          var _a, _b, _c;
          return new GraphLogController(args.document, {
            formatter: createFormatter(args.params),
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
              format: p.optional.function,
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
              options: ev.options,
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
            embedStyle(this.document, "default", ".tp-lstv_s,.tp-btnv_b,.tp-p2dv_b,.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-fldv_b,.tp-rotv_b,.tp-ckbv_i,.tp-coltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dv_b:disabled{opacity:0.5}.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-colswv_sw:hover,.tp-p2dpv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-colswv_sw:focus,.tp-p2dpv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-colswv_sw:active,.tp-p2dpv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-colswv_sw:disabled,.tp-p2dpv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);width:100%}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, rgba(187,188,196,0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187,188,196,0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187,188,196,0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187,188,196,0.15));--cnt-fg: var(--tp-container-foreground-color, #bbbcc4);--in-bg: var(--tp-input-background-color, rgba(0,0,0,0.2));--in-bg-a: var(--tp-input-background-color-active, rgba(0,0,0,0.35));--in-bg-f: var(--tp-input-background-color-focus, rgba(0,0,0,0.3));--in-bg-h: var(--tp-input-background-color-hover, rgba(0,0,0,0.25));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(0,0,0,0.2))}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:calc(var(--cnt-h-p) + 8px);padding-right:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:'';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c,.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c{display:none}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-coltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-coltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-coltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-coltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-coltxtv_w,.tp-pndtxtv{display:flex}.tp-coltxtv_c,.tp-pndtxtv_a{width:100%}.tp-coltxtv_c+.tp-coltxtv_c,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:'';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-colswv.tp-v-disabled{opacity:0.5}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:'';display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-us) * 3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:'';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:'';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}");
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
        const VERSION = new Semver("3.0.5");
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

  // d:/wamp/www/phaser-genesis/src/config/const.ts
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
    WORLD_SIZE: "WorldSize",
    WORLD_WIDTH: "WorldWidth",
    WORLD_HEIGHT: "WorldHeight"
  };

  // d:/wamp/www/phaser-genesis/src/config/ConfigStore.ts
  var ConfigStore = new Map();

  // d:/wamp/www/phaser-genesis/src/config/backgroundcolor/SetBackgroundColor.ts
  function SetBackgroundColor(color) {
    ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
  }

  // d:/wamp/www/phaser-genesis/src/config/backgroundcolor/BackgroundColor.ts
  function BackgroundColor(color) {
    return () => {
      SetBackgroundColor(color);
    };
  }

  // d:/wamp/www/phaser-genesis/src/config/banner/SetBanner.ts
  function SetBanner(title = "", version = "", url = "", color = "#fff", background = "linear-gradient(#3e0081 40%, #00bcc3)") {
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, { title, version, url, color, background });
  }

  // d:/wamp/www/phaser-genesis/src/config/batchsize/SetBatchSize.ts
  function SetBatchSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
  }

  // d:/wamp/www/phaser-genesis/src/renderer/BindingQueue.ts
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

  // d:/wamp/www/phaser-genesis/src/config/backgroundcolor/GetBackgroundColor.ts
  function GetBackgroundColor() {
    return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
  }

  // d:/wamp/www/phaser-genesis/src/config/size/GetHeight.ts
  function GetHeight() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
  }

  // d:/wamp/www/phaser-genesis/src/config/size/GetResolution.ts
  function GetResolution() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
  }

  // d:/wamp/www/phaser-genesis/src/config/size/GetWidth.ts
  function GetWidth() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
  }

  // d:/wamp/www/phaser-genesis/src/config/renderer/SetRenderer.ts
  function SetRenderer(renderer) {
    ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
  }

  // d:/wamp/www/phaser-genesis/src/config/defaultorigin/SetDefaultOrigin.ts
  function SetDefaultOrigin(x = 0.5, y = x) {
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x, y });
  }

  // d:/wamp/www/phaser-genesis/src/config/globalvar/SetGlobalVar.ts
  function SetGlobalVar(name) {
    ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
  }

  // d:/wamp/www/phaser-genesis/src/config/globalvar/GlobalVar.ts
  function GlobalVar(name) {
    return () => {
      SetGlobalVar(name);
    };
  }

  // d:/wamp/www/phaser-genesis/src/config/maxtextures/SetMaxTextures.ts
  function SetMaxTextures(max) {
    ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
  }

  // d:/wamp/www/phaser-genesis/src/dom/GetElement.ts
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

  // d:/wamp/www/phaser-genesis/src/config/parent/SetParent.ts
  function SetParent(parentElement) {
    if (parentElement) {
      ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
    }
  }

  // d:/wamp/www/phaser-genesis/src/config/parent/Parent.ts
  function Parent(parentElement) {
    return () => {
      SetParent(parentElement);
    };
  }

  // d:/wamp/www/phaser-genesis/src/config/scenes/SetScenes.ts
  function SetScenes(scenes) {
    ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
  }

  // d:/wamp/www/phaser-genesis/src/config/scenes/Scenes.ts
  function Scenes(scenes) {
    return () => {
      SetScenes(scenes);
    };
  }

  // d:/wamp/www/phaser-genesis/src/config/size/SetSize.ts
  function SetSize(width = 800, height = 600, resolution = 1) {
    if (resolution === 0) {
      resolution = window.devicePixelRatio;
    }
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width, height, resolution });
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/GL.ts
  var gl;
  var GL = {
    get: () => {
      return gl;
    },
    set: (context) => {
      gl = context;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/Draw.ts
  function Draw(renderPass) {
    const count = renderPass.count;
    if (count === 0) {
      return;
    }
    const currentBuffer = renderPass.vertexbuffer.current;
    const currentShader = renderPass.shader.current;
    const renderToFramebuffer = currentShader.shader.renderToFramebuffer;
    if (renderToFramebuffer) {
      renderPass.framebuffer.set(currentShader.shader.framebuffer, true);
    }
    if (count === currentBuffer.batchSize) {
      const type = currentBuffer.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
    } else {
      const subsize = count * currentBuffer.entryElementSize;
      const view = currentBuffer.vertexViewF32.subarray(0, subsize);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    if (currentBuffer.indexed) {
      gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, count * currentBuffer.elementsPerEntry);
    }
    if (renderToFramebuffer) {
      renderPass.framebuffer.pop();
    }
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/Flush.ts
  function Flush(renderPass, forceCount) {
    if (forceCount) {
      renderPass.count = forceCount;
    }
    const count = renderPass.count;
    if (count === 0) {
      return false;
    }
    Draw(renderPass);
    renderPass.flush();
    return true;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/End.ts
  function End(renderPass) {
    Flush(renderPass);
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/textures/GetCompressedTextures.ts
  function GetCompressedTextures(gl2) {
    const extString = "WEBGL_compressed_texture_";
    const wkExtString = "WEBKIT_" + extString;
    const hasExt = (format) => {
      const results = gl2.getExtension(extString + format) || gl2.getExtension(wkExtString + format);
      if (results) {
        const glEnums = {};
        for (const key in results) {
          glEnums[results[key]] = key;
        }
        return glEnums;
      }
    };
    return {
      ETC: hasExt("etc"),
      ETC1: hasExt("etc1"),
      ATC: hasExt("atc"),
      ASTC: hasExt("astc"),
      BPTC: hasExt("bptc"),
      RGTC: hasExt("rgtc"),
      PVRTC: hasExt("pvrtc"),
      S3TC: hasExt("s3tc"),
      S3TCSRGB: hasExt("s3tc_srgb"),
      IMG: true
    };
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/colors/GetRGBArray.ts
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

  // d:/wamp/www/phaser-genesis/src/config/webglcontext/GetWebGLContext.ts
  function GetWebGLContext() {
    return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/fbo/CreateFramebuffer.ts
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/textures/CreateGLTexture.ts
  function CreateGLTexture(binding, mipmaps) {
    const { generateMipmap, minFilter, parent, compressed, internalFormat, flipY, unpackPremultiplyAlpha, magFilter, wrapS, wrapT, isPOT } = binding;
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
    } else if (compressed && mipmaps) {
      for (let i = 0; i < mipmaps.length; i++) {
        gl.compressedTexImage2D(gl.TEXTURE_2D, i, internalFormat, mipmaps[i].width, mipmaps[i].height, 0, mipmaps[i].data);
      }
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/fbo/DeleteFramebuffer.ts
  function DeleteFramebuffer(framebuffer) {
    if (gl && gl.isFramebuffer(framebuffer)) {
      gl.deleteFramebuffer(framebuffer);
    }
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/textures/DeleteGLTexture.ts
  function DeleteGLTexture(texture) {
    if (gl.isTexture(texture)) {
      gl.deleteTexture(texture);
    }
  }

  // d:/wamp/www/phaser-genesis/src/math/pow2/IsSizePowerOfTwo.ts
  function IsSizePowerOfTwo(width, height) {
    if (width < 1 || height < 1) {
      return false;
    }
    return (width & width - 1) === 0 && (height & height - 1) === 0;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/textures/SetGLTextureFilterMode.ts
  function SetGLTextureFilterMode(texture, linear = true) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const mode = linear ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/textures/UpdateGLTexture.ts
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/textures/GLTextureBinding.ts
  var GLTextureBinding = class {
    parent;
    texture;
    framebuffer;
    depthbuffer;
    format;
    internalFormat;
    compressed;
    mipmaps;
    isBound = false;
    textureUnit = 0;
    unpackPremultiplyAlpha = true;
    minFilter;
    magFilter;
    wrapS;
    wrapT;
    flipY = false;
    isPOT = false;
    generateMipmap = false;
    constructor(parent, config = {}) {
      this.parent = parent;
      this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
      const {
        mipmaps = null,
        compressed = false,
        format = "IMG",
        internalFormat = 0,
        texture = null,
        framebuffer = null,
        createFramebuffer = false,
        depthbuffer = null,
        unpackPremultiplyAlpha = true,
        minFilter = this.isPOT ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
        magFilter = gl.LINEAR,
        wrapS = gl.CLAMP_TO_EDGE,
        wrapT = gl.CLAMP_TO_EDGE,
        generateMipmap = this.isPOT,
        flipY = false
      } = config;
      this.compressed = compressed;
      this.format = format;
      this.internalFormat = internalFormat;
      this.mipmaps = mipmaps;
      if (compressed) {
        this.minFilter = gl.LINEAR;
      } else {
        this.minFilter = minFilter;
      }
      this.magFilter = magFilter;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.generateMipmap = generateMipmap;
      this.flipY = flipY;
      this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
      if (texture) {
        this.texture = texture;
      } else {
        CreateGLTexture(this, mipmaps);
      }
      if (framebuffer) {
        this.framebuffer = framebuffer;
      } else if (createFramebuffer) {
        this.framebuffer = CreateFramebuffer(this.texture);
      }
      if (depthbuffer) {
        this.depthbuffer = depthbuffer;
      }
      parent.binding = this;
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
    bind(index) {
      this.isBound = true;
      this.textureUnit = index;
    }
    unbind() {
      this.isBound = false;
      this.textureUnit = 0;
    }
    destroy() {
      this.unbind();
      DeleteGLTexture(this.texture);
      DeleteFramebuffer(this.framebuffer);
      this.parent = null;
      this.texture = null;
      this.framebuffer = null;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/ProcessBindingQueue.ts
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

  // d:/wamp/www/phaser-genesis/src/colormatrix/const.ts
  var DEFAULT_COLOR_MATRIX = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  var DEFAULT_COLOR_OFFSET = new Float32Array(4);

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/BlendModeStack.ts
  var BlendModeStack = class {
    renderPass;
    stack;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(enable, sfactor, dfactor) {
      const entry = { enable, sfactor, dfactor };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(entry) {
      if (!entry) {
        entry = this.current;
      }
      if (entry.enable) {
        if (!gl.isEnabled(gl.BLEND) || (this.current.sfactor !== entry.sfactor || this.current.dfactor !== entry.dfactor)) {
          gl.enable(gl.BLEND);
          gl.blendFunc(entry.sfactor, entry.dfactor);
        }
      } else {
        gl.disable(gl.BLEND);
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(enable, sfactor, dfactor) {
      const entry = this.add(enable, sfactor, dfactor);
      this.bind(entry);
    }
    setDefault(enable, sfactor, dfactor) {
      const entry = { enable, sfactor, dfactor };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // d:/wamp/www/phaser-genesis/src/components/color/CompareColorMatrix.ts
  function CompareColorMatrix(srcMatrix, srcOffset, targetMatrix, targetOffset) {
    for (let i = 0; i < srcOffset.length; i++) {
      if (srcOffset[i] !== targetOffset[i]) {
        return false;
      }
    }
    for (let i = 0; i < srcMatrix.length; i++) {
      if (srcMatrix[i] !== targetMatrix[i]) {
        return false;
      }
    }
    return true;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/ColorMatrixStack.ts
  var ColorMatrixStack = class {
    renderPass;
    stack;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(colorMatrix, colorOffset) {
      const entry = { colorMatrix, colorOffset };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(entry) {
      if (!entry) {
        entry = this.current;
      }
      const shader = this.renderPass.getCurrentShader();
      Flush(this.renderPass);
      shader.setUniform("uColorMatrix", entry.colorMatrix);
      shader.setUniform("uColorOffset", entry.colorOffset);
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(color) {
      const current = this.current;
      const entry = this.add(color.colorMatrix, color.colorOffset);
      if (!CompareColorMatrix(entry.colorMatrix, entry.colorOffset, current.colorMatrix, current.colorOffset)) {
        this.bind(entry);
      }
    }
    setDefault(colorMatrix, colorOffset) {
      const entry = { colorMatrix, colorOffset };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/FramebufferStack.ts
  var FramebufferStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(framebuffer, viewport) {
      const entry = { framebuffer, viewport };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(false, this.default);
    }
    bind(clear = true, entry) {
      if (!entry) {
        entry = this.current;
      }
      const { framebuffer, viewport } = entry;
      if (this.active !== framebuffer) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      }
      if (clear) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
      if (viewport) {
        this.renderPass.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);
      }
      this.active = framebuffer;
    }
    pop() {
      if (this.current.viewport) {
        this.renderPass.viewport.pop();
      }
      this.index--;
      this.bind(false);
    }
    set(framebuffer, clear = true, viewport) {
      const entry = this.add(framebuffer, viewport);
      this.bind(clear, entry);
    }
    setDefault(framebuffer = null, viewport) {
      const entry = { framebuffer, viewport };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // d:/wamp/www/phaser-genesis/src/config/batchsize/GetBatchSize.ts
  function GetBatchSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
  }

  // d:/wamp/www/phaser-genesis/src/config/maxtextures/GetMaxTextures.ts
  function GetMaxTextures() {
    return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
  }

  // d:/wamp/www/phaser-genesis/src/math/mat4/Mat4Ortho.ts
  function Mat4Ortho(matrix, left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    matrix.set([
      -2 * lr,
      0,
      0,
      0,
      0,
      -2 * bt,
      0,
      0,
      0,
      0,
      2 * nf,
      0,
      (left + right) * lr,
      (top + bottom) * bt,
      (far + near) * nf,
      1
    ]);
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/glsl/MULTI_QUAD_FRAG.ts
  var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG
#define numTextures %count%

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

vec4 getSampler (int index, vec2 uv)
{
    for (int i = 0; i < numTextures; ++i)
    {
        vec4 color = texture2D(uTexture[i], uv);

        if (i == index)
        {
            return color * vec4(vTintColor.rgb * vTintColor.a, vTintColor.a);
        }
    }

    //  Return black
    return vec4(0);
}

void main (void)
{
    vec4 color = getSampler(int(vTextureId), vTextureCoord);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
  var DefaultQuadAttributes = {
    aVertexPosition: { size: 2 },
    aTextureCoord: { size: 2 },
    aTextureId: { size: 1 },
    aTintColor: { size: 4 }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/GL_CONST.ts
  var BYTE = 5120;
  var UNSIGNED_BYTE = 5121;
  var SHORT = 5122;
  var UNSIGNED_SHORT = 5123;
  var FLOAT = 5126;

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/CreateAttributes.ts
  function CreateAttributes(program, attribs) {
    const attributes = new Map();
    const defaultSettings = {
      size: 1,
      type: FLOAT,
      normalized: false,
      stride: 0
    };
    let offset = 0;
    for (const [name, entry] of Object.entries(attribs)) {
      const index = gl.getAttribLocation(program, name);
      if (index !== -1) {
        gl.enableVertexAttribArray(index);
        const {
          size = defaultSettings.size,
          type = defaultSettings.type,
          normalized = defaultSettings.normalized,
          stride = defaultSettings.stride
        } = entry;
        attributes.set(name, { index, size, type, normalized, stride, offset });
        let typeSize = 4;
        if (type === UNSIGNED_SHORT || type === SHORT) {
          typeSize = 2;
        } else if (type === UNSIGNED_BYTE || type === BYTE) {
          typeSize = 1;
        }
        offset += size * typeSize;
      }
    }
    return attributes;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/fbo/CreateDepthBuffer.ts
  function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return depthBuffer;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/DeleteShaders.ts
  function DeleteShaders(...shaders) {
    shaders.forEach((shader) => {
      gl.deleteShader(shader);
    });
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/CreateProgram.ts
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/CreateShader.ts
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/CreateUniformSetter.ts
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/CreateUniforms.ts
  function CreateUniforms(program) {
    const uniforms = new Map();
    const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < total; i++) {
      const uniform = gl.getActiveUniform(program, i);
      let name = uniform.name;
      if (name.startsWith("gl_") || name.startsWith("webgl_")) {
        continue;
      }
      const location = gl.getUniformLocation(program, name);
      if (location) {
        let isArray = false;
        if (name.endsWith("[0]")) {
          name = name.slice(0, -3);
          isArray = uniform.size > 1;
        }
        uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
      }
    }
    return uniforms;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.ts
  var SINGLE_QUAD_FRAG = `#define SHADER_NAME SINGLE_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_VERT.ts
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

  // d:/wamp/www/phaser-genesis/src/textures/UpdateFrameUVs.ts
  function UpdateFrameUVs(frame2) {
    const { x, y, width, height } = frame2;
    const baseTextureWidth = frame2.texture.width;
    const baseTextureHeight = frame2.texture.height;
    frame2.u0 = x / baseTextureWidth;
    frame2.v0 = y / baseTextureHeight;
    frame2.u1 = (x + width) / baseTextureWidth;
    frame2.v1 = (y + height) / baseTextureHeight;
    return frame2;
  }

  // d:/wamp/www/phaser-genesis/src/textures/Frame.ts
  var Frame = class {
    texture;
    key;
    x;
    y;
    width;
    height;
    trimmed = false;
    sourceSizeWidth;
    sourceSizeHeight;
    spriteSourceSizeX;
    spriteSourceSizeY;
    spriteSourceSizeWidth;
    spriteSourceSizeHeight;
    pivot;
    u0;
    v0;
    u1;
    v1;
    constructor(texture, key, x, y, width, height) {
      this.texture = texture;
      this.key = key;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      UpdateFrameUVs(this);
    }
    destroy() {
      this.texture = null;
    }
  };

  // d:/wamp/www/phaser-genesis/src/textures/SetFrameSize.ts
  function SetFrameSize(frame2, width, height) {
    frame2.width = width;
    frame2.height = height;
    frame2.sourceSizeWidth = width;
    frame2.sourceSizeHeight = height;
    return UpdateFrameUVs(frame2);
  }

  // d:/wamp/www/phaser-genesis/src/textures/Texture.ts
  var Texture = class {
    key = "";
    locked = true;
    width;
    height;
    image;
    binding;
    firstFrame;
    frames;
    data;
    constructor(image, width, height, glConfig) {
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
      SetFrameSize(frame2, width, height);
    }
    update(image, glConfig) {
      this.image = image;
      this.setSize(image.width, image.height);
      BindingQueue.add(this, glConfig);
    }
    destroy() {
      if (this.binding) {
        this.binding.destroy();
      }
      this.frames.clear();
      this.binding = null;
      this.data = null;
      this.image = null;
      this.firstFrame = null;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/Shader.ts
  var Shader = class {
    program;
    attributes;
    uniforms;
    uniformSetters;
    texture;
    framebuffer;
    renderToFramebuffer = false;
    renderToDepthbuffer = false;
    isActive = false;
    constructor(config) {
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
        if (this.uniformSetters.has(key)) {
          this.uniforms.set(key, value);
        }
      }
      this.attributes = CreateAttributes(program, attribs);
      gl.useProgram(currentProgram);
      this.isActive = false;
    }
    updateUniforms(renderPass) {
    }
    bind(renderPass) {
      const uniforms = this.uniforms;
      uniforms.set("uProjectionMatrix", renderPass.projectionMatrix);
      uniforms.set("uCameraMatrix", renderPass.cameraMatrix);
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
        const stride = renderPass.vertexbuffer.current.vertexByteSize;
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/QuadShader.ts
  var QuadShader = class extends Shader {
    constructor(config = {}) {
      config.attributes = config?.attributes || DefaultQuadAttributes;
      super(config);
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/shaders/MultiTextureQuadShader.ts
  var MultiTextureQuadShader = class extends QuadShader {
    constructor(config = {}) {
      config.fragmentShader = config?.fragmentShader || MULTI_QUAD_FRAG;
      super(config);
    }
    create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
      const maxTextures = GetMaxTextures();
      fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
      super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
    }
    bind(renderPass) {
      this.uniforms.set("uTexture", renderPass.textures.textureIndex);
      return super.bind(renderPass);
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/ShaderStack.ts
  var ShaderStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(shader, textureID) {
      const entry = { shader, textureID };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(entry) {
      if (!entry) {
        entry = this.current;
      }
      if (!entry.shader.isActive) {
        const success = entry.shader.bind(this.renderPass, entry.textureID);
        if (success) {
          entry.shader.setAttributes(this.renderPass);
          if (this.active && this.active !== entry.shader) {
            this.active.isActive = false;
          }
          this.active = entry.shader;
        }
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(shader, textureID) {
      const entry = this.add(shader, textureID);
      this.bind(entry);
    }
    setDefault(shader, textureID) {
      const entry = { shader, textureID };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // d:/wamp/www/phaser-genesis/node_modules/bitecs/dist/index.mjs
  var TYPES_ENUM = {
    i8: "i8",
    ui8: "ui8",
    ui8c: "ui8c",
    i16: "i16",
    ui16: "ui16",
    i32: "i32",
    ui32: "ui32",
    f32: "f32",
    f64: "f64",
    eid: "eid"
  };
  var TYPES_NAMES = {
    i8: "Int8",
    ui8: "Uint8",
    ui8c: "Uint8Clamped",
    i16: "Int16",
    ui16: "Uint16",
    i32: "Int32",
    ui32: "Uint32",
    eid: "Uint32",
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
    f64: Float64Array,
    eid: Uint32Array
  };
  var UNSIGNED_MAX = {
    uint8: 2 ** 8,
    uint16: 2 ** 16,
    uint32: 2 ** 32
  };
  var roundToMultiple = (mul) => (x) => Math.ceil(x / mul) * mul;
  var roundToMultiple4 = roundToMultiple(4);
  var $storeRef = Symbol("storeRef");
  var $storeSize = Symbol("storeSize");
  var $storeMaps = Symbol("storeMaps");
  var $storeFlattened = Symbol("storeFlattened");
  var $storeBase = Symbol("storeBase");
  var $storeType = Symbol("storeType");
  var $storeArrayCounts = Symbol("storeArrayCount");
  var $storeSubarrays = Symbol("storeSubarrays");
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
  var $isEidType = Symbol("isEidType");
  var stores = {};
  var resize = (ta, size) => {
    const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
    const newTa = new ta.constructor(newBuffer);
    newTa.set(ta, 0);
    return newTa;
  };
  var createShadow = (store, key) => {
    if (!ArrayBuffer.isView(store)) {
      const shadowStore = store[$parentArray].slice(0).fill(0);
      store[key] = store.map((_, eid) => {
        const from = store[eid][$subarrayFrom];
        const to = store[eid][$subarrayTo];
        return shadowStore.subarray(from, to);
      });
    } else {
      store[key] = store.slice(0).fill(0);
    }
  };
  var resizeSubarray = (metadata, store, size) => {
    const cursors = metadata[$subarrayCursors];
    let type = store[$storeType];
    const length = store[0].length;
    const indexType = length <= UNSIGNED_MAX.uint8 ? "ui8" : length <= UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    const arrayCount = metadata[$storeArrayCounts][type];
    const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
    const array = new TYPES[type](roundToMultiple4(summedLength * size));
    array.set(metadata[$storeSubarrays][type]);
    metadata[$storeSubarrays][type] = array;
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
      store[eid][$subarray] = true;
      store[eid][$indexType] = TYPES_NAMES[indexType];
      store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
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
    const store = new TYPES[type](buffer);
    store[$isEidType] = type === TYPES_ENUM.eid;
    return store;
  };
  var createArrayStore = (metadata, type, length) => {
    const size = metadata[$storeSize];
    const store = Array(size).fill(0);
    store[$storeType] = type;
    store[$isEidType] = type === TYPES_ENUM.eid;
    const cursors = metadata[$subarrayCursors];
    const indexType = length < UNSIGNED_MAX.uint8 ? "ui8" : length < UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    if (!length)
      throw new Error("bitECS - Must define component array length");
    if (!TYPES[type])
      throw new Error(`bitECS - Invalid component array property type ${type}`);
    if (!metadata[$storeSubarrays][type]) {
      const arrayCount = metadata[$storeArrayCounts][type];
      const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
      const array = new TYPES[type](roundToMultiple4(summedLength * size));
      metadata[$storeSubarrays][type] = array;
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
      [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => ({ ...a, [type]: 0 }), {}),
      [$storeFlattened]: [],
      [$storeArrayCounts]: arrayCounts
    };
    if (schema instanceof Object && Object.keys(schema).length) {
      const recursiveTransform = (a, k) => {
        if (typeof a[k] === "string") {
          a[k] = createTypeStore(a[k], size);
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
    dense.sort = function(comparator) {
      const result = Array.prototype.sort.call(this, comparator);
      for (let i = 0; i < dense.length; i++) {
        sparse[dense[i]] = i;
      }
      return result;
    };
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
  var $entityComponents = Symbol("entityComponents");
  var $entitySparseSet = Symbol("entitySparseSet");
  var $entityArray = Symbol("entityArray");
  var $entityIndices = Symbol("entityIndices");
  var $removedEntities = Symbol("removedEntities");
  var defaultSize = 1e5;
  var globalEntityCursor = 0;
  var globalSize = defaultSize;
  var getGlobalSize = () => globalSize;
  var removed = [];
  var resetGlobals = () => {
    globalSize = defaultSize;
    globalEntityCursor = 0;
    removed.length = 0;
  };
  var getDefaultSize = () => defaultSize;
  var setDefaultSize = (size) => {
    defaultSize = size;
    resetGlobals();
  };
  var getEntityCursor = () => globalEntityCursor;
  var eidToWorld = new Map();
  var addEntity = (world2) => {
    const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
    world2[$entitySparseSet].add(eid);
    eidToWorld.set(eid, world2);
    if (globalEntityCursor >= defaultSize) {
      console.error(`bitECS - max entities of ${defaultSize} reached, increase with setDefaultSize function.`);
    }
    world2[$notQueries].forEach((q) => {
      const match = queryCheckEntity(world2, q, eid);
      if (match)
        queryAddEntity(q, eid);
    });
    world2[$entityComponents].set(eid, new Set());
    return eid;
  };
  var removeEntity = (world2, eid) => {
    if (!world2[$entitySparseSet].has(eid))
      return;
    world2[$queries].forEach((q) => {
      queryRemoveEntity(world2, q, eid);
    });
    removed.push(eid);
    world2[$entitySparseSet].remove(eid);
    world2[$entityComponents].delete(eid);
    for (let i = 0; i < world2[$entityMasks].length; i++)
      world2[$entityMasks][i][eid] = 0;
  };
  function Any(...comps) {
    return function QueryAny() {
      return comps;
    };
  }
  function All(...comps) {
    return function QueryAll() {
      return comps;
    };
  }
  function None(...comps) {
    return function QueryNone() {
      return comps;
    };
  }
  var $queries = Symbol("queries");
  var $notQueries = Symbol("notQueries");
  var $queryAny = Symbol("queryAny");
  var $queryAll = Symbol("queryAll");
  var $queryNone = Symbol("queryNone");
  var $queryMap = Symbol("queryMap");
  var $dirtyQueries = Symbol("$dirtyQueries");
  var $queryComponents = Symbol("queryComponents");
  var $enterQuery = Symbol("enterQuery");
  var $exitQuery = Symbol("exitQuery");
  var registerQuery = (world2, query) => {
    const components2 = [];
    const notComponents = [];
    const changedComponents = [];
    query[$queryComponents].forEach((c) => {
      if (typeof c === "function") {
        const [comp, mod] = c();
        if (!world2[$componentMap].has(comp))
          registerComponent(world2, comp);
        if (mod === "not") {
          notComponents.push(comp);
        }
        if (mod === "changed") {
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
    const notMasks = notComponents.map(mapComponents).reduce(reduceBitflags, {});
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
    allComponents.forEach((c) => {
      c.queries.add(q);
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
      q.changed = [];
    const { flatProps, shadows } = q;
    for (let i = 0; i < q.dense.length; i++) {
      const eid = q.dense[i];
      let dirty = false;
      for (let pid = 0; pid < flatProps.length; pid++) {
        const prop = flatProps[pid];
        const shadow = shadows[pid];
        if (ArrayBuffer.isView(prop[eid])) {
          for (let i2 = 0; i2 < prop[eid].length; i2++) {
            if (prop[eid][i2] !== shadow[eid][i2]) {
              dirty = true;
              shadow[eid][i2] = prop[eid][i2];
              break;
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
  var flatten = (a, v) => a.concat(v);
  var aggregateComponentsFor = (mod) => (x) => x.filter((f) => f.name === mod().constructor.name).reduce(flatten);
  var getAnyComponents = aggregateComponentsFor(Any);
  var getAllComponents = aggregateComponentsFor(All);
  var getNoneComponents = aggregateComponentsFor(None);
  var defineQuery = (...args) => {
    let components2;
    let any, all, none;
    if (Array.isArray(args[0])) {
      components2 = args[0];
    } else {
      any = getAnyComponents(args);
      all = getAllComponents(args);
      none = getNoneComponents(args);
    }
    if (components2 === void 0 || components2[$componentMap] !== void 0) {
      return (world2) => world2 ? world2[$entityArray] : components2[$entityArray];
    }
    const query = function(world2, clearDiff = true) {
      if (!world2[$queryMap].has(query))
        registerQuery(world2, query);
      const q = world2[$queryMap].get(query);
      commitRemovals(world2);
      if (q.changedComponents.length)
        return diff(q, clearDiff);
      return q.dense;
    };
    query[$queryComponents] = components2;
    query[$queryAny] = any;
    query[$queryAll] = all;
    query[$queryNone] = none;
    return query;
  };
  var queryCheckEntity = (world2, q, eid) => {
    const { masks, notMasks, generations } = q;
    let or = 0;
    for (let i = 0; i < generations.length; i++) {
      const generationId = generations[i];
      const qMask = masks[generationId];
      const qNotMask = notMasks[generationId];
      const eMask = world2[$entityMasks][generationId][eid];
      if (qNotMask && (eMask & qNotMask) > 0) {
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
    if (world2[$bitflag] >= 2 ** 31) {
      world2[$bitflag] = 1;
      world2[$entityMasks].push(new Uint32Array(world2[$size]));
    }
  };
  var registerComponent = (world2, component) => {
    if (!component)
      throw new Error(`bitECS - Cannot register null or undefined component`);
    const queries = new Set();
    const notQueries = new Set();
    const changedQueries = new Set();
    world2[$queries].forEach((q) => {
      if (q.components.includes(component)) {
        queries.add(q);
      }
    });
    world2[$componentMap].set(component, {
      generationId: world2[$entityMasks].length - 1,
      bitflag: world2[$bitflag],
      store: component,
      queries,
      notQueries,
      changedQueries
    });
    if (component[$storeSize] < world2[$size]) {
      resizeStore(component, world2[$size]);
    }
    incrementBitflag(world2);
  };
  var hasComponent = (world2, component, eid) => {
    const registeredComponent = world2[$componentMap].get(component);
    if (!registeredComponent)
      return;
    const { generationId, bitflag } = registeredComponent;
    const mask = world2[$entityMasks][generationId][eid];
    return (mask & bitflag) === bitflag;
  };
  var addComponent = (world2, component, eid, reset = true) => {
    if (!world2[$componentMap].has(component))
      registerComponent(world2, component);
    if (hasComponent(world2, component, eid))
      return;
    const c = world2[$componentMap].get(component);
    const { generationId, bitflag, queries, notQueries } = c;
    world2[$entityMasks][generationId][eid] |= bitflag;
    queries.forEach((q) => {
      const match = queryCheckEntity(world2, q, eid);
      if (match)
        queryAddEntity(q, eid);
      else
        queryRemoveEntity(world2, q, eid);
    });
    world2[$entityComponents].get(eid).add(component);
    if (reset)
      resetStoreFor(component, eid);
  };
  var removeComponent = (world2, component, eid, reset = false) => {
    const c = world2[$componentMap].get(component);
    const { generationId, bitflag, queries, notQueries } = c;
    if (!(world2[$entityMasks][generationId][eid] & bitflag))
      return;
    world2[$entityMasks][generationId][eid] &= ~bitflag;
    queries.forEach((q) => {
      const match = queryCheckEntity(world2, q, eid);
      if (match)
        queryAddEntity(q, eid);
      else
        queryRemoveEntity(world2, q, eid);
    });
    world2[$entityComponents].get(eid).delete(component);
    if (reset)
      resetStoreFor(component, eid);
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
    world2[$entityComponents] = new Map();
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
  var Types = TYPES_ENUM;

  // d:/wamp/www/phaser-genesis/src/components/transform/Transform2DComponent.ts
  var TRANSFORM = {
    IS_ROOT: 0,
    DIRTY: 1,
    X: 2,
    Y: 3,
    ROTATION: 4,
    SCALE_X: 5,
    SCALE_Y: 6,
    SKEW_X: 7,
    SKEW_Y: 8,
    AXIS_ALIGNED: 9,
    FRAME_X1: 10,
    FRAME_Y1: 11,
    FRAME_X2: 12,
    FRAME_Y2: 13,
    LOCAL_A: 14,
    LOCAL_B: 15,
    LOCAL_C: 16,
    LOCAL_D: 17,
    LOCAL_TX: 18,
    LOCAL_TY: 19,
    BOUNDS_X1: 20,
    BOUNDS_Y1: 21,
    BOUNDS_X2: 22,
    BOUNDS_Y2: 23,
    ORIGIN_X: 24,
    ORIGIN_Y: 25,
    WORLD_A: 26,
    WORLD_B: 27,
    WORLD_C: 28,
    WORLD_D: 29,
    WORLD_TX: 30,
    WORLD_TY: 31,
    FRAME_WIDTH: 32,
    FRAME_HEIGHT: 33,
    DIRTY_WORLD: 34,
    IN_VIEW: 35,
    UPDATED: 36
  };
  var Transform2DComponent = defineComponent({
    data: [Types.f32, 37]
  });

  // d:/wamp/www/phaser-genesis/src/GameObjectWorld.ts
  if (window["defaultSize"]) {
    setDefaultSize(parseInt(window["defaultSize"]));
  } else {
    setDefaultSize(1e4);
  }
  var world = createWorld();
  var GameObjectWorld = world;

  // d:/wamp/www/phaser-genesis/src/components/transform/AddTransform2DComponent.ts
  function AddTransform2DComponent(id, x = 0, y = 0, originX = 0, originY = 0) {
    addComponent(GameObjectWorld, Transform2DComponent, id);
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.IS_ROOT] = 0;
    data[TRANSFORM.DIRTY] = 1;
    data[TRANSFORM.X] = x;
    data[TRANSFORM.Y] = y;
    data[TRANSFORM.SCALE_X] = 1;
    data[TRANSFORM.SCALE_Y] = 1;
    data[TRANSFORM.ORIGIN_X] = originX;
    data[TRANSFORM.ORIGIN_Y] = originY;
    data[TRANSFORM.AXIS_ALIGNED] = 1;
    data[TRANSFORM.IN_VIEW] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/utils/NOOP.ts
  function NOOP() {
  }

  // d:/wamp/www/phaser-genesis/src/math/mat4/Matrix4.ts
  var Matrix4 = class {
    data;
    onChange;
    constructor(src) {
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
      this.data.set([
        m00,
        m01,
        m02,
        m03,
        m10,
        m11,
        m12,
        m13,
        m20,
        m21,
        m22,
        m23,
        m30,
        m31,
        m32,
        m33
      ]);
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

  // d:/wamp/www/phaser-genesis/src/components/transform/SetBounds.ts
  function SetBounds(id, x, y, right, bottom) {
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.BOUNDS_X1] = x;
    data[TRANSFORM.BOUNDS_Y1] = y;
    data[TRANSFORM.BOUNDS_X2] = right;
    data[TRANSFORM.BOUNDS_Y2] = bottom;
  }

  // d:/wamp/www/phaser-genesis/src/camera/StaticCamera.ts
  var StaticCamera = class {
    id = addEntity(GameObjectWorld);
    type = "StaticCamera";
    name = "";
    isDirty = true;
    matrix;
    constructor(width, height) {
      const id = this.id;
      AddTransform2DComponent(id, 0, 0, 0, 0);
      this.matrix = new Matrix4();
      this.reset(width, height);
    }
    getBoundsX() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X1];
    }
    getBoundsY() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y1];
    }
    getBoundsRight() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X2];
    }
    getBoundsBottom() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y2];
    }
    getMatrix() {
      return this.matrix.data;
    }
    updateBounds() {
      this.isDirty = true;
      return true;
    }
    update() {
      return false;
    }
    reset(width, height) {
      SetBounds(this.id, 0, 0, width, height);
    }
    destroy() {
      const id = this.id;
      removeComponent(GameObjectWorld, Transform2DComponent, id);
      removeEntity(GameObjectWorld, id);
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/CreateTempTextures.ts
  function CreateTempTextures() {
    let maxGPUTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    let maxCombinedGPUTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    console.log("MAX GPU", maxGPUTextures, "MAX COMBINED", maxCombinedGPUTextures);
    const maxConfigTextures = GetMaxTextures();
    if (maxConfigTextures === 0 || maxConfigTextures > maxGPUTextures) {
      SetMaxTextures(maxGPUTextures);
    } else {
      maxGPUTextures = maxConfigTextures;
    }
    const textures = [];
    for (let i = 0; i < maxGPUTextures; i++) {
      const tempTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, tempTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      textures.push([i, tempTexture]);
    }
    return textures;
  }

  // d:/wamp/www/phaser-genesis/src/textures/WhiteTexture.ts
  var instance;
  var WhiteTexture = {
    get: () => {
      return instance;
    },
    set: (texture) => {
      instance = texture;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/TextureStack.ts
  var TextureStack = class {
    renderPass;
    textures;
    tempTextures;
    textureIndex;
    maxTextures;
    constructor(renderPass) {
      this.renderPass = renderPass;
    }
    bind(texture, index = 0) {
      const binding = texture.binding;
      binding.bind(index);
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    }
    unbind(index = 0) {
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, this.tempTextures[index]);
    }
    unbindTexture(texture) {
      const index = texture.binding.textureUnit;
      const binding = texture.binding;
      binding.unbind();
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, this.tempTextures[index]);
    }
    setWhite() {
      return this.set(WhiteTexture.get());
    }
    set(texture) {
      if (!texture.binding) {
        return -1;
      }
      const binding = texture.binding;
      const textures = this.textures;
      if (!binding.isBound) {
        if (textures.size === this.maxTextures) {
          Flush(this.renderPass);
          this.clear();
        }
        const textureUnit = textures.size;
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
        textures.set(textureUnit, texture);
        binding.bind(textureUnit);
      }
      return binding.textureUnit;
    }
    setDefault() {
      if (this.textures) {
        this.reset();
      }
      const tempTextures = CreateTempTextures();
      this.maxTextures = tempTextures.length;
      this.tempTextures = new Map(tempTextures);
      this.textures = new Map();
      this.textureIndex = [];
      this.tempTextures.forEach((texture, index) => {
        this.textureIndex.push(index);
      });
    }
    clear() {
      this.textures.forEach((texture) => texture.binding.unbind());
      this.textures.clear();
    }
    reset() {
      this.tempTextures.forEach((texture, index) => {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, texture);
      });
      this.clear();
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/buffers/DeleteGLBuffer.ts
  function DeleteGLBuffer(buffer) {
    if (gl.isBuffer(buffer)) {
      gl.deleteBuffer(buffer);
    }
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/buffers/VertexBuffer.ts
  var VertexBuffer = class {
    name;
    batchSize;
    dataSize;
    vertexElementSize;
    vertexByteSize;
    entryByteSize;
    bufferByteSize;
    data;
    vertexViewF32;
    vertexBuffer;
    entryElementSize;
    indexed = false;
    isDynamic = false;
    count = 0;
    offset = 0;
    elementsPerEntry;
    isBound = false;
    constructor(config = {}) {
      const {
        name = "VBO",
        batchSize = 1,
        dataSize = 4,
        isDynamic = true,
        elementsPerEntry = 3,
        vertexElementSize = 9
      } = config;
      this.name = name;
      this.batchSize = batchSize;
      this.dataSize = dataSize;
      this.vertexElementSize = vertexElementSize;
      this.isDynamic = isDynamic;
      this.elementsPerEntry = elementsPerEntry;
      this.vertexByteSize = vertexElementSize * dataSize;
      this.entryByteSize = this.vertexByteSize * elementsPerEntry;
      this.bufferByteSize = batchSize * this.entryByteSize;
      this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
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
      this.vertexBuffer = null;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/VertexBufferStack.ts
  var VertexBufferStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(buffer) {
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(buffer);
      } else {
        this.stack[this.index] = buffer;
      }
      return buffer;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(buffer) {
      if (!buffer) {
        buffer = this.current;
      }
      if (!buffer.isBound) {
        const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
        buffer.isBound = true;
        if (this.active && this.active !== buffer) {
          this.active.isBound = false;
        }
        this.active = buffer;
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(buffer) {
      const entry = this.add(buffer);
      this.bind(entry);
    }
    setDefault(buffer) {
      this.stack[0] = buffer;
      this.index = 0;
      this.default = buffer;
    }
  };

  // d:/wamp/www/phaser-genesis/src/geom/rectangle/RectangleContains.ts
  function RectangleContains(rect, x, y) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
  }

  // d:/wamp/www/phaser-genesis/src/geom/rectangle/Rectangle.ts
  var Rectangle = class {
    x;
    y;
    width;
    height;
    constructor(x = 0, y = 0, width = 0, height = 0) {
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

  // d:/wamp/www/phaser-genesis/src/geom/rectangle/RectangleEquals.ts
  function RectangleEquals(rect, toCompare) {
    return rect.x === toCompare.x && rect.y === toCompare.y && rect.width === toCompare.width && rect.height === toCompare.height;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/ViewportStack.ts
  var ViewportStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(x = 0, y = 0, width = 0, height = 0) {
      const entry = new Rectangle(x, y, width, height);
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(viewport) {
      if (!viewport) {
        viewport = this.current;
      }
      if (!this.active || !RectangleEquals(this.active, viewport)) {
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        this.active = viewport;
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(x = 0, y = 0, width = 0, height = 0) {
      const entry = this.add(x, y, width, height);
      this.bind(entry);
    }
    setDefault(x = 0, y = 0, width = 0, height = 0) {
      const entry = new Rectangle(x, y, width, height);
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/RenderPass.ts
  var RenderPass = class {
    renderer;
    projectionMatrix;
    cameraMatrix;
    count = 0;
    prevCount = 0;
    flushTotal = 0;
    framebuffer;
    vertexbuffer;
    blendMode;
    shader;
    viewport;
    textures;
    colorMatrix;
    quadShader;
    quadCamera;
    current2DCamera;
    constructor(renderer) {
      this.renderer = renderer;
      this.projectionMatrix = new Float32Array(16);
      this.framebuffer = new FramebufferStack(this);
      this.vertexbuffer = new VertexBufferStack(this);
      this.blendMode = new BlendModeStack(this);
      this.shader = new ShaderStack(this);
      this.viewport = new ViewportStack(this);
      this.textures = new TextureStack(this);
      this.colorMatrix = new ColorMatrixStack(this);
      this.reset();
    }
    getCurrentShader() {
      return this.shader.current.shader;
    }
    flush() {
      this.prevCount = this.count;
      this.count = 0;
      this.flushTotal++;
    }
    reset() {
      const gl2 = this.renderer.gl;
      this.quadShader = new QuadShader();
      this.quadCamera = new StaticCamera(this.renderer.width, this.renderer.height);
      this.textures.setDefault();
      this.framebuffer.setDefault();
      this.blendMode.setDefault(true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
      this.colorMatrix.setDefault(DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET);
      this.vertexbuffer.setDefault(new VertexBuffer({ batchSize: GetBatchSize() }));
      this.shader.setDefault(GetMaxTextures() === 1 ? new QuadShader() : new MultiTextureQuadShader());
    }
    resize(width, height) {
      Mat4Ortho(this.projectionMatrix, 0, width, height, 0, -1e3, 1e3);
      this.quadCamera.reset(width, height);
      this.viewport.setDefault(0, 0, width, height);
    }
    isCameraDirty() {
      return this.current2DCamera.isDirty;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/Start.ts
  function Start(renderPass) {
    if (!renderPass.current2DCamera) {
      renderPass.current2DCamera = renderPass.quadCamera;
      renderPass.cameraMatrix = renderPass.quadCamera.getMatrix();
    }
    renderPass.count = 0;
    renderPass.flushTotal = 0;
    renderPass.framebuffer.bindDefault();
    renderPass.blendMode.bindDefault();
    renderPass.viewport.bindDefault();
    renderPass.vertexbuffer.bindDefault();
    renderPass.shader.bindDefault();
    renderPass.colorMatrix.bindDefault();
    return renderPass;
  }

  // d:/wamp/www/phaser-genesis/src/renderer/RendererInstance.ts
  var instance2;
  var RendererInstance = {
    get: () => {
      return instance2;
    },
    set: (renderer) => {
      instance2 = renderer;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/WebGLRendererInstance.ts
  var instance3;
  var WebGLRendererInstance = {
    get: () => {
      return instance3;
    },
    set: (renderer) => {
      instance3 = renderer;
      RendererInstance.set(renderer);
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/WebGLRenderer.ts
  var WebGLRenderer = class {
    canvas;
    gl;
    renderPass;
    clearColor = [0, 0, 0, 1];
    width;
    height;
    resolution;
    clearBeforeRender = true;
    optimizeRedraw = true;
    autoResize = true;
    contextLost = false;
    compression;
    constructor() {
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
      ProcessBindingQueue();
    }
    initContext() {
      const gl2 = this.canvas.getContext("webgl", GetWebGLContext());
      GL.set(gl2);
      this.gl = gl2;
      this.compression = GetCompressedTextures(gl2);
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
    begin(willRedraw) {
      if (this.contextLost) {
        return;
      }
      const gl2 = this.gl;
      gl2.getContextAttributes();
      ProcessBindingQueue();
      if (this.optimizeRedraw && !willRedraw) {
      }
      if (this.clearBeforeRender) {
        const cls = this.clearColor;
        gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
        gl2.clear(gl2.COLOR_BUFFER_BIT);
      }
      return Start(this.renderPass);
    }
    end() {
      End(this.renderPass);
    }
    destroy() {
      WebGLRendererInstance.set(void 0);
    }
  };

  // d:/wamp/www/phaser-genesis/src/config/webgl/WebGL.ts
  function WebGL() {
    return () => {
      SetRenderer(WebGLRenderer);
    };
  }

  // d:/wamp/www/phaser-genesis/src/config/webglcontext/SetWebGLContext.ts
  function SetWebGLContext(contextAttributes) {
    ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/HierarchyComponent.ts
  var HIERARCHY = {
    WORLD: 0,
    PARENT: 1,
    NEXT: 2,
    PREV: 3,
    FIRST: 4,
    LAST: 5,
    NUM_CHILDREN: 6,
    DEPTH: 7
  };
  var HierarchyComponent = defineComponent({
    data: [Types.ui32, 8]
  });

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetLastChildID.ts
  function GetLastChildID(parentID) {
    return HierarchyComponent.data[parentID][HIERARCHY.LAST];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetNumChildren.ts
  function GetNumChildren(id) {
    return HierarchyComponent.data[id][HIERARCHY.NUM_CHILDREN];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetParentID.ts
  function GetParentID(id) {
    return HierarchyComponent.data[id][HIERARCHY.PARENT];
  }

  // d:/wamp/www/phaser-genesis/src/display/IsValidParent.ts
  function IsValidParent(parent, child) {
    const childID = child.id;
    const parentID = parent.id;
    return !(parentID === 0 || childID === parentID || parentID === GetParentID(childID));
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetNextSiblingID.ts
  function SetNextSiblingID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.NEXT] = childID;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetPreviousSiblingID.ts
  function SetPreviousSiblingID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.PREV] = childID;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/LinkSiblings.ts
  function LinkSiblings(childA, childB) {
    SetNextSiblingID(childA, childB);
    SetPreviousSiblingID(childB, childA);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetFirstChildID.ts
  function GetFirstChildID(parentID) {
    return HierarchyComponent.data[parentID][HIERARCHY.FIRST];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetNextSiblingID.ts
  function GetNextSiblingID(id) {
    return HierarchyComponent.data[id][HIERARCHY.NEXT];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetPreviousSiblingID.ts
  function GetPreviousSiblingID(id) {
    return HierarchyComponent.data[id][HIERARCHY.PREV];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/AddHierarchyComponent.ts
  function AddHierarchyComponent(id) {
    addComponent(GameObjectWorld, HierarchyComponent, id);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/DecreaseNumChildren.ts
  function DecreaseNumChildren(parentID, total = 1) {
    const data = HierarchyComponent.data[parentID];
    data[HIERARCHY.NUM_CHILDREN] -= total;
    if (data[HIERARCHY.NUM_CHILDREN] < 0) {
      data[HIERARCHY.NUM_CHILDREN] = 0;
    }
  }

  // d:/wamp/www/phaser-genesis/src/gameobjects/GameObjectCache.ts
  var GameObjectCache = {
    local: [],
    set: function(index, object) {
      this.local[index] = object;
    },
    get: function(index) {
      return this.local[index];
    },
    clear: function() {
      this.local.length = 0;
    },
    remove: function(index) {
      this.local[index] = null;
    }
  };

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetWorldID.ts
  function GetWorldID(id) {
    return HierarchyComponent.data[id][HIERARCHY.WORLD];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetParents.ts
  function GetParents(id) {
    const results = [];
    let currentParent = GetParentID(id);
    while (currentParent) {
      results.push(currentParent);
      currentParent = GetParentID(currentParent);
    }
    return results;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/DirtyComponent.ts
  var DIRTY = {
    CHILD: 0,
    CHILD_CACHE: 1,
    CHILD_TRANSFORM: 2,
    CHILD_WORLD_TRANSFORM: 3,
    CHILD_COLOR: 4,
    DISPLAY_LIST: 5,
    COLOR: 6
  };
  var DirtyComponent = defineComponent({
    data: [Types.ui8, 7]
  });

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyChild.ts
  function SetDirtyChild(id) {
    DirtyComponent.data[id][DIRTY.CHILD] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyChildCache.ts
  function SetDirtyChildCache(id) {
    DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyChildTransform.ts
  function SetDirtyChildTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyTransform.ts
  function SetDirtyTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 1;
    SetDirtyParents(id);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/PermissionsComponent.ts
  var PERMISSION = {
    VISIBLE: 0,
    VISIBLE_CHILDREN: 1,
    WILL_UPDATE: 2,
    WILL_UPDATE_CHILDREN: 3,
    WILL_RENDER: 4,
    WILL_RENDER_CHILDREN: 5,
    WILL_CACHE_CHILDREN: 6,
    WILL_TRANSFORM_CHILDREN: 7,
    WILL_COLOR_CHILDREN: 8
  };
  var PermissionsComponent = defineComponent({
    data: [Types.ui8, 9]
  });

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillCacheChildren.ts
  function WillCacheChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN]);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillTransformChildren.ts
  function WillTransformChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyParents.ts
  function SetDirtyParents(childID) {
    const worldID = GetWorldID(childID);
    const parents = GetParents(childID);
    for (let i = 0; i < parents.length; i++) {
      const id = parents[i];
      SetDirtyChild(id);
      if (WillTransformChildren(id)) {
        SetDirtyTransform(id);
      }
      if (WillCacheChildren(id)) {
        SetDirtyChildCache(id);
      }
      if (id === worldID) {
        SetDirtyChildTransform(id);
      }
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/ClearWorldAndParentID.ts
  function ClearWorldAndParentID(id) {
    const worldID = GetWorldID(id);
    const parentID = GetParentID(id);
    const world2 = GameObjectCache.get(worldID);
    HierarchyComponent.data[id][HIERARCHY.WORLD] = 0;
    HierarchyComponent.data[id][HIERARCHY.PARENT] = 0;
    if (world2 && hasComponent(GameObjectWorld, world2.tag, id)) {
      removeComponent(GameObjectWorld, world2.tag, id);
    }
    DecreaseNumChildren(parentID);
    SetDirtyParents(id);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/MoveNext.ts
  function MoveNext(id, rootID) {
    const firstChild = GetFirstChildID(id);
    if (firstChild > 0) {
      return firstChild;
    } else {
      const sibling = GetNextSiblingID(id);
      if (sibling === 0) {
        const parent = GetParentID(id);
        if (parent === rootID) {
          return 0;
        } else {
          return GetNextSiblingID(parent);
        }
      } else {
        return sibling;
      }
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/DepthFirstSearchFromParentID.ts
  function DepthFirstSearchFromParentID(parentID, removeParent = true) {
    const output = [parentID];
    let next = GetFirstChildID(parentID);
    while (next > 0) {
      output.push(next);
      next = MoveNext(next, parentID);
    }
    if (removeParent) {
      output.shift();
    }
    return output;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetChildIDsFromParent.ts
  function GetChildIDsFromParent(parent) {
    let next = GetFirstChildID(parent.id);
    const output = [];
    while (next > 0) {
      output.push(next);
      next = GetNextSiblingID(next);
    }
    return output;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetChildrenFromParentID.ts
  function GetChildrenFromParentID(id) {
    const out = [];
    let next = GetFirstChildID(id);
    while (next > 0) {
      out.push(GameObjectCache.get(next));
      next = GetNextSiblingID(next);
    }
    return out;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetDepth.ts
  function GetDepth(id) {
    return HierarchyComponent.data[id][HIERARCHY.DEPTH];
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetParentGameObject.ts
  function GetParentGameObject(id) {
    return GameObjectCache.get(HierarchyComponent.data[id][HIERARCHY.PARENT]);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetWorldFromID.ts
  function GetWorldFromID(childID) {
    const worldID = GetWorldID(childID);
    if (worldID) {
      return GameObjectCache.get(worldID);
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/GetWorldFromParentID.ts
  function GetWorldFromParentID(parentID) {
    const worldID = GetWorldID(parentID);
    return GameObjectCache.get(worldID);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetDepth.ts
  function SetDepth(id, depth) {
    HierarchyComponent.data[id][HIERARCHY.DEPTH] = depth;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetNumChildren.ts
  function SetNumChildren(parentID, total) {
    HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] = total;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetParentID.ts
  function SetParentID(childID, parentID) {
    HierarchyComponent.data[childID][HIERARCHY.PARENT] = parentID;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetWorldID.ts
  function SetWorldID(id, worldID) {
    HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/RemoveWorldTag.ts
  function RemoveWorldTag(id) {
    const world2 = GetWorldFromParentID(id);
    const children = DepthFirstSearchFromParentID(id, false);
    children.map((childID) => {
      removeComponent(GameObjectWorld, world2.tag, childID);
      SetWorldID(childID, 0);
    });
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetFirstChildID.ts
  function SetFirstChildID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.FIRST] = childID;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetLastChildID.ts
  function SetLastChildID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.LAST] = childID;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/RemoveChildIDFromCurrentParent.ts
  function RemoveChildIDFromCurrentParent(childID, newParentID) {
    const parentID = GetParentID(childID);
    if (parentID) {
      const firstID = GetFirstChildID(parentID);
      const lastID = GetLastChildID(parentID);
      const nextID = GetNextSiblingID(childID);
      const prevID = GetPreviousSiblingID(childID);
      if (childID === firstID) {
        SetFirstChildID(parentID, nextID);
      }
      if (childID === lastID) {
        SetLastChildID(parentID, prevID);
      }
      if (nextID) {
        SetPreviousSiblingID(nextID, prevID);
      }
      if (prevID) {
        SetNextSiblingID(prevID, nextID);
      }
      SetDirtyParents(childID);
      SetParentID(childID, 0);
      SetNumChildren(parentID, GetNumChildren(parentID) - 1);
    }
    const oldWorld = GetWorldFromID(childID);
    const newWorld = newParentID ? GetWorldFromID(newParentID) : null;
    if (oldWorld && oldWorld !== newWorld) {
      RemoveWorldTag(childID);
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyChildColor.ts
  function SetDirtyChildColor(id) {
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyDisplayList.ts
  function SetDirtyDisplayList(id) {
    DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetWorldTag.ts
  function SetWorldTag(world2, id) {
    const worldID = world2.id;
    const worldTag = world2.tag;
    const children = DepthFirstSearchFromParentID(id, false);
    children.map((childID) => {
      addComponent(GameObjectWorld, worldTag, childID);
      SetWorldID(childID, worldID);
    });
    SetDirtyDisplayList(worldID);
    SetDirtyChildColor(worldID);
    SetDirtyChildTransform(worldID);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/UpdateRootTransform.ts
  function UpdateRootTransform(id) {
    const worldID = GetWorldID(id);
    let currentParent = GetParentID(id);
    let isRootTransform = true;
    while (currentParent && currentParent !== worldID) {
      if (WillTransformChildren(currentParent)) {
        isRootTransform = false;
        break;
      }
      currentParent = GetParentID(currentParent);
    }
    Transform2DComponent.data[id][TRANSFORM.IS_ROOT] = Number(isRootTransform);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/SetAndUpdateParent.ts
  function SetAndUpdateParent(parentID, childID, addChildren = 1) {
    SetParentID(childID, parentID);
    SetDirtyTransform(childID);
    SetDirtyParents(childID);
    UpdateRootTransform(childID);
    SetNumChildren(parentID, GetNumChildren(parentID) + addChildren);
    const world2 = GetWorldFromParentID(parentID);
    if (world2) {
      SetWorldTag(world2, childID);
    }
  }

  // d:/wamp/www/phaser-genesis/src/display/AddChild.ts
  function AddChild(parent, child) {
    if (IsValidParent(parent, child)) {
      const childID = child.id;
      const parentID = parent.id;
      const numChildren = GetNumChildren(parentID);
      RemoveChildIDFromCurrentParent(childID, parentID);
      if (numChildren === 0) {
        SetFirstChildID(parentID, childID);
      } else {
        const lastChild = GetLastChildID(parentID);
        LinkSiblings(lastChild, childID);
      }
      SetLastChildID(parentID, childID);
      SetAndUpdateParent(parentID, childID);
    }
    return child;
  }

  // d:/wamp/www/phaser-genesis/src/display/AddChildren.ts
  function AddChildren(parent, ...children) {
    children.forEach((child) => {
      AddChild(parent, child);
    });
    return children;
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/RelinkChildren.ts
  function RelinkChildren(parentID, children) {
    const len = children.length;
    if (len === 0) {
      SetNumChildren(parentID, 0);
      SetFirstChildID(parentID, 0);
      SetLastChildID(parentID, 0);
      return;
    }
    let total = 1;
    let childA = children[0];
    SetFirstChildID(parentID, childA);
    if (len === 1) {
      SetLastChildID(parentID, childA);
      SetNumChildren(parentID, total);
      return;
    }
    for (let i = 1; i < len; i++) {
      const childB = children[i];
      LinkSiblings(childA, childB);
      childA = childB;
      total++;
    }
    SetLastChildID(parentID, childA);
    SetNumChildren(parentID, total);
  }

  // d:/wamp/www/phaser-genesis/src/display/RemoveChildrenBetween.ts
  function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const parentID = parent.id;
    if (endIndex === void 0) {
      endIndex = GetNumChildren(parentID);
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const children = GetChildIDsFromParent(parent);
      const removed2 = children.splice(beginIndex, range);
      removed2.forEach((childID) => {
        ClearWorldAndParentID(childID);
      });
      RelinkChildren(parentID, children);
      return removed2.map((id) => GameObjectCache.get(id));
    } else {
      return [];
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyWorldDisplayList.ts
  function SetDirtyWorldDisplayList(id) {
    const worldID = GetWorldID(id);
    if (worldID > 0) {
      DirtyComponent.data[worldID][DIRTY.DISPLAY_LIST];
    }
  }

  // d:/wamp/www/phaser-genesis/src/display/DestroyChildren.ts
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed2 = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed2.forEach((child) => {
      child.destroy();
    });
    SetDirtyWorldDisplayList(parent.id);
  }

  // d:/wamp/www/phaser-genesis/src/components/color/ColorComponent.ts
  var ColorComponent = defineComponent({
    r: Types.ui8c,
    g: Types.ui8c,
    b: Types.ui8c,
    a: Types.f32,
    colorMatrix: [Types.f32, 16],
    colorOffset: [Types.f32, 4]
  });

  // d:/wamp/www/phaser-genesis/src/components/color/AddColorComponent.ts
  function AddColorComponent(id) {
    addComponent(GameObjectWorld, ColorComponent, id);
    ColorComponent.r[id] = 255;
    ColorComponent.g[id] = 255;
    ColorComponent.b[id] = 255;
    ColorComponent.a[id] = 1;
    ColorComponent.colorMatrix[id].set(DEFAULT_COLOR_MATRIX);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyColor.ts
  function SetDirtyColor(id) {
    DirtyComponent.data[id][DIRTY.COLOR] = 1;
    const world2 = GetWorldID(id);
    if (world2) {
      DirtyComponent.data[world2][DIRTY.CHILD_COLOR] = 1;
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/AddDirtyComponent.ts
  function AddDirtyComponent(id) {
    addComponent(GameObjectWorld, DirtyComponent, id);
    SetDirtyColor(id);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyChild.ts
  function ClearDirtyChild(id) {
    DirtyComponent.data[id][DIRTY.CHILD] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyColor.ts
  function ClearDirtyColor(id) {
    DirtyComponent.data[id][DIRTY.COLOR] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyDisplayList.ts
  function ClearDirtyDisplayList(id) {
    DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyTransform.ts
  function ClearDirtyTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyChildCache.ts
  function HasDirtyChildCache(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_CACHE]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyColor.ts
  function HasDirtyColor(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.COLOR]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyDisplayList.ts
  function HasDirtyDisplayList(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.DISPLAY_LIST]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyTransform.ts
  function HasDirtyTransform(id) {
    return Boolean(Transform2DComponent.data[id][TRANSFORM.DIRTY]);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/SetWillColorChildren.ts
  function SetWillColorChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillColorChildren.ts
  function WillColorChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN]);
  }

  // d:/wamp/www/phaser-genesis/src/components/color/Color.ts
  var Color = class {
    id;
    colorMatrixEnabled = false;
    constructor(id, red = 255, green = 255, blue = 255, alpha = 1) {
      AddColorComponent(id);
      this.id = id;
      this.set(red, green, blue, alpha);
    }
    set(red, green, blue, alpha) {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
    }
    set tint(value) {
      this.red = value >> 16 & 255;
      this.green = value >> 8 & 255;
      this.blue = value & 255;
    }
    get tint() {
      return this.red << 16 | this.green << 8 | this.blue;
    }
    set willColorChildren(value) {
      SetWillColorChildren(this.id, value);
    }
    get willColorChildren() {
      return WillColorChildren(this.id);
    }
    set colorMatrix(value) {
      ColorComponent.colorMatrix[this.id].set(value);
      SetDirtyColor(this.id);
      this.colorMatrixEnabled = true;
    }
    get colorMatrix() {
      return ColorComponent.colorMatrix[this.id];
    }
    set colorOffset(value) {
      ColorComponent.colorOffset[this.id].set(value);
      SetDirtyColor(this.id);
    }
    get colorOffset() {
      return ColorComponent.colorOffset[this.id];
    }
    set red(value) {
      ColorComponent.r[this.id] = value;
      SetDirtyColor(this.id);
    }
    get red() {
      return ColorComponent.r[this.id];
    }
    set green(value) {
      ColorComponent.g[this.id] = value;
      SetDirtyColor(this.id);
    }
    get green() {
      return ColorComponent.g[this.id];
    }
    set blue(value) {
      ColorComponent.b[this.id] = value;
      SetDirtyColor(this.id);
    }
    get blue() {
      return ColorComponent.b[this.id];
    }
    set alpha(value) {
      ColorComponent.a[this.id] = value;
      SetDirtyColor(this.id);
    }
    get alpha() {
      return ColorComponent.a[this.id];
    }
  };

  // d:/wamp/www/phaser-genesis/src/components/permissions/AddPermissionsComponent.ts
  function AddPermissionsComponent(id) {
    addComponent(GameObjectWorld, PermissionsComponent, id);
    PermissionsComponent.data[id].set([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  }

  // d:/wamp/www/phaser-genesis/src/gameobjects/events/DestroyEvent.ts
  var DestroyEvent = "destroy";

  // d:/wamp/www/phaser-genesis/src/events/Emit.ts
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

  // d:/wamp/www/phaser-genesis/src/components/permissions/GetVisible.ts
  function GetVisible(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/GetVisibleChildren.ts
  function GetVisibleChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN]);
  }

  // d:/wamp/www/phaser-genesis/src/display/ReparentChildren.ts
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    moved.forEach((child) => {
      AddChild(newParent, child);
    });
    return moved;
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/SetVisible.ts
  function SetVisible(id, value) {
    PermissionsComponent.data[id][PERMISSION.VISIBLE] = Number(value);
    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/SetVisibleChildren.ts
  function SetVisibleChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN] = Number(value);
    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillRender.ts
  function WillRender(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]) && Boolean(PermissionsComponent.data[id][PERMISSION.WILL_RENDER]);
  }

  // d:/wamp/www/phaser-genesis/src/gameobjects/GameObject.ts
  var GameObject = class {
    id = addEntity(GameObjectWorld);
    type = "GameObject";
    name = "";
    events;
    constructor() {
      const id = this.id;
      AddHierarchyComponent(id);
      AddPermissionsComponent(id);
      AddDirtyComponent(id);
      GameObjectCache.set(id, this);
      this.events = new Map();
    }
    isRenderable() {
      return WillRender(this.id);
    }
    beforeUpdate(delta, time) {
    }
    update(delta, time) {
    }
    afterUpdate(delta, time) {
    }
    preRenderGL(renderPass) {
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
      SetVisible(this.id, value);
    }
    get visible() {
      return GetVisible(this.id);
    }
    set visibleChildren(value) {
      SetVisibleChildren(this.id, value);
    }
    get visibleChildren() {
      return GetVisibleChildren(this.id);
    }
    set depth(value) {
      SetDepth(this.id, value);
    }
    get depth() {
      return GetDepth(this.id);
    }
    hasParent(id) {
      const parentID = GetParentID(this.id);
      if (id) {
        return parentID === id;
      } else {
        return parentID > 0;
      }
    }
    getParent() {
      return GetParentGameObject(this.id);
    }
    getChildren() {
      return GetChildrenFromParentID(this.id);
    }
    getNumChildren() {
      return GetNumChildren(this.id);
    }
    toString() {
      return `${this.type} id="${this.id}" name="${this.name}"`;
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

  // d:/wamp/www/phaser-genesis/src/config/defaultorigin/GetDefaultOriginX.ts
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // d:/wamp/www/phaser-genesis/src/config/defaultorigin/GetDefaultOriginY.ts
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/UpdateExtent.ts
  function UpdateExtent(id, width, height) {
    const data = Transform2DComponent.data[id];
    const x = -data[TRANSFORM.ORIGIN_X] * width;
    const y = -data[TRANSFORM.ORIGIN_Y] * height;
    data[TRANSFORM.FRAME_X1] = x;
    data[TRANSFORM.FRAME_Y1] = y;
    data[TRANSFORM.FRAME_X2] = x + width;
    data[TRANSFORM.FRAME_Y2] = y + height;
    data[TRANSFORM.FRAME_WIDTH] = width;
    data[TRANSFORM.FRAME_HEIGHT] = height;
    data[TRANSFORM.WORLD_A] = x;
    data[TRANSFORM.WORLD_B] = y;
    data[TRANSFORM.WORLD_C] = x + width;
    data[TRANSFORM.WORLD_D] = y + height;
    data[TRANSFORM.WORLD_TX] = width;
    data[TRANSFORM.WORLD_TY] = height;
    SetDirtyTransform(id);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/Origin.ts
  var Origin = class {
    id;
    constructor(id, x = 0, y = 0) {
      this.id = id;
      this.x = x;
      this.y = y;
    }
    set(x, y = x) {
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = x;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = y;
      UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
      return this;
    }
    set x(value) {
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = value;
      UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
    }
    get x() {
      return Transform2DComponent.data[this.id][TRANSFORM.ORIGIN_X];
    }
    set y(value) {
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = value;
      UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
    }
    get y() {
      return Transform2DComponent.data[this.id][TRANSFORM.ORIGIN_Y];
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/PopColor.ts
  function PopColor(renderPass, color) {
    if (color.colorMatrixEnabled && color.willColorChildren) {
      renderPass.colorMatrix.pop();
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/Position.ts
  var Position = class {
    id;
    _x;
    _y;
    constructor(id, x = 0, y = 0) {
      this.id = id;
      this.set(x, y);
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      this._x = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.X] = value;
      SetDirtyTransform(id);
    }
    get x() {
      return this._x;
    }
    set y(value) {
      this._y = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.Y] = value;
      SetDirtyTransform(id);
    }
    get y() {
      return this._y;
    }
  };

  // d:/wamp/www/phaser-genesis/src/components/transform/Scale.ts
  var Scale = class {
    id;
    _x;
    _y;
    constructor(id, x = 1, y = 1) {
      this.id = id;
      this.set(x, y);
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      this._x = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SCALE_X] = value;
      SetDirtyTransform(id);
    }
    get x() {
      return this._x;
    }
    set y(value) {
      this._y = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SCALE_Y] = value;
      SetDirtyTransform(id);
    }
    get y() {
      return this._y;
    }
  };

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/SetColor.ts
  function SetColor(renderPass, color) {
    if (color.colorMatrixEnabled && color.willColorChildren) {
      renderPass.colorMatrix.set(color);
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/Size.ts
  var Size = class {
    id;
    constructor(id, width = 0, height = 0) {
      this.id = id;
      this.set(width, height);
    }
    set(width, height = width) {
      this.width = width;
      this.height = height;
      return this;
    }
    set width(value) {
      UpdateExtent(this.id, value, this.height);
    }
    get width() {
      return Transform2DComponent.data[this.id][TRANSFORM.FRAME_WIDTH];
    }
    set height(value) {
      UpdateExtent(this.id, this.width, value);
    }
    get height() {
      return Transform2DComponent.data[this.id][TRANSFORM.FRAME_HEIGHT];
    }
    set x(value) {
      this.width = value;
    }
    get x() {
      return this.width;
    }
    set y(value) {
      this.height = value;
    }
    get y() {
      return this.height;
    }
  };

  // d:/wamp/www/phaser-genesis/src/components/transform/UpdateAxisAligned.ts
  function UpdateAxisAligned(id) {
    const data = Transform2DComponent.data[id];
    const rotation = data[TRANSFORM.ROTATION];
    const skewX = data[TRANSFORM.SKEW_X];
    const skewY = data[TRANSFORM.SKEW_Y];
    data[TRANSFORM.AXIS_ALIGNED] = Number(rotation === 0 && skewX === 0 && skewY === 0);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/Skew.ts
  var Skew = class {
    id;
    _x;
    _y;
    constructor(id, x = 0, y = 0) {
      this.id = id;
      this.set(x, y);
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      this._x = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SKEW_X] = value;
      UpdateAxisAligned(id);
      SetDirtyTransform(id);
    }
    get x() {
      return this._x;
    }
    set y(value) {
      this._y = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SKEW_Y] = value;
      UpdateAxisAligned(id);
      SetDirtyTransform(id);
    }
    get y() {
      return this._y;
    }
  };

  // d:/wamp/www/phaser-genesis/src/gameobjects/container/Container.ts
  var Container = class extends GameObject {
    type = "Container";
    position;
    scale;
    skew;
    origin;
    size;
    color;
    shader;
    _rotation = 0;
    constructor(x = 0, y = 0) {
      super();
      const id = this.id;
      AddTransform2DComponent(id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
      this.position = new Position(id, x, y);
      this.scale = new Scale(id);
      this.skew = new Skew(id);
      this.size = new Size(id);
      this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
      this.color = new Color(id);
    }
    renderGL(renderPass) {
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.set(this.shader, 0);
      }
      SetColor(renderPass, this.color);
      this.preRenderGL(renderPass);
    }
    postRenderGL(renderPass) {
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.pop();
      }
      PopColor(renderPass, this.color);
    }
    set x(value) {
      this.position.x = value;
    }
    get x() {
      return this.position.x;
    }
    set y(value) {
      this.position.y = value;
    }
    get y() {
      return this.position.y;
    }
    set rotation(value) {
      this._rotation = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ROTATION] = value;
      UpdateAxisAligned(id);
      SetDirtyTransform(id);
    }
    get rotation() {
      return this._rotation;
    }
    get alpha() {
      return this.color.alpha;
    }
    set alpha(value) {
      this.color.alpha = value;
    }
    setAlpha(value) {
      this.alpha = value;
      return this;
    }
    setPosition(x, y) {
      this.position.set(x, y);
      return this;
    }
    setScale(x, y) {
      this.scale.set(x, y);
      return this;
    }
    setRotation(value) {
      this.rotation = value;
      return this;
    }
    setSkew(x, y) {
      this.skew.set(x, y);
      return this;
    }
    setOrigin(x, y) {
      this.origin.set(x, y);
      return this;
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
    }
  };

  // d:/wamp/www/phaser-genesis/src/textures/TextureManagerInstance.ts
  var instance4;
  var TextureManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      if (instance4) {
        throw new Error("Cannot instantiate TextureManager more than once");
      }
      instance4 = manager;
    }
  };

  // d:/wamp/www/phaser-genesis/src/textures/GetTexture.ts
  function GetTexture(key) {
    return TextureManagerInstance.get().get(key);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/ClearSiblings.ts
  function ClearSiblings(childID) {
    SetNextSiblingID(childID, 0);
    SetPreviousSiblingID(childID, 0);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/RemoveChildID.ts
  function RemoveChildID(childID) {
    const parentID = GetParentID(childID);
    const first = GetFirstChildID(parentID);
    const last = GetLastChildID(parentID);
    const prevID = GetPreviousSiblingID(childID);
    const nextID = GetNextSiblingID(childID);
    LinkSiblings(prevID, nextID);
    if (first === childID) {
      SetFirstChildID(parentID, nextID);
    }
    if (last === childID) {
      SetLastChildID(parentID, prevID);
    }
    ClearSiblings(childID);
  }

  // d:/wamp/www/phaser-genesis/src/display/RemoveChild.ts
  function RemoveChild(parent, child) {
    const childID = child.id;
    const parentID = parent.id;
    if (child.hasParent(parentID)) {
      RemoveChildID(childID);
      DecreaseNumChildren(parentID);
    }
    return child;
  }

  // d:/wamp/www/phaser-genesis/src/display/RemoveChildren.ts
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

  // d:/wamp/www/phaser-genesis/src/components/vertices/QuadVertexComponent.ts
  var QuadVertexComponent = defineComponent({
    values: [Types.f32, 54]
  });

  // d:/wamp/www/phaser-genesis/src/components/vertices/SetQuadColor.ts
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

  // d:/wamp/www/phaser-genesis/src/components/vertices/SetQuadPosition.ts
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

  // d:/wamp/www/phaser-genesis/src/components/vertices/SetUV.ts
  function SetUV(id, u0, v0, u1, v1) {
    const data = QuadVertexComponent.values[id];
    data[2] = u0;
    data[3] = v0;
    data[11] = u0;
    data[12] = v1;
    data[20] = u1;
    data[21] = v1;
    data[29] = u0;
    data[30] = v0;
    data[38] = u1;
    data[39] = v1;
    data[47] = u1;
    data[48] = v0;
  }

  // d:/wamp/www/phaser-genesis/src/components/vertices/AddQuadVertex.ts
  function AddQuadVertex(id, width = 0, height = 0, flipY = true) {
    addComponent(GameObjectWorld, QuadVertexComponent, id);
    if (width || height) {
      if (flipY) {
        SetUV(id, 0, 1, 1, 0);
      } else {
        SetUV(id, 0, 0, 1, 1);
      }
      SetQuadColor(id, 1, 1, 1, 1);
      SetQuadPosition(id, 0, 0, 0, height, width, height, width, 0);
    }
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
  var bufferEntry = {
    buffer: null,
    F32: null,
    offset: 0
  };
  function GetVertexBufferEntry(renderPass, addToCount = 0) {
    const buffer = renderPass.vertexbuffer.current;
    if (renderPass.count + addToCount >= buffer.batchSize) {
      Flush(renderPass);
    }
    bufferEntry.buffer = buffer;
    bufferEntry.F32 = buffer.vertexViewF32;
    bufferEntry.offset = renderPass.count * buffer.entryElementSize;
    renderPass.count += addToCount;
    return bufferEntry;
  }

  // d:/wamp/www/phaser-genesis/src/components/vertices/SetQuadTextureIndex.ts
  function SetQuadTextureIndex(id, textureIndex) {
    const data = QuadVertexComponent.values[id];
    if (data[4] !== textureIndex) {
      data[4] = textureIndex;
      data[13] = textureIndex;
      data[22] = textureIndex;
      data[31] = textureIndex;
      data[40] = textureIndex;
      data[49] = textureIndex;
    }
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuadBuffer.ts
  function BatchTexturedQuadBuffer(texture, id, renderPass) {
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
    const textureIndex = renderPass.textures.set(texture);
    SetQuadTextureIndex(id, textureIndex);
    F32.set(QuadVertexComponent.values[id], offset);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/SetExtent.ts
  function SetExtent(id, x, y, width, height) {
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.FRAME_X1] = x;
    data[TRANSFORM.FRAME_Y1] = y;
    data[TRANSFORM.FRAME_X2] = x + width;
    data[TRANSFORM.FRAME_Y2] = y + height;
    data[TRANSFORM.FRAME_WIDTH] = width;
    data[TRANSFORM.FRAME_HEIGHT] = height;
    SetDirtyTransform(id);
  }

  // d:/wamp/www/phaser-genesis/src/textures/SetExtentFromFrame.ts
  function SetExtentFromFrame(child, frame2) {
    const originX = child.origin.x;
    const originY = child.origin.y;
    const sourceSizeWidth = frame2.sourceSizeWidth;
    const sourceSizeHeight = frame2.sourceSizeHeight;
    let x;
    let y;
    let width;
    let height;
    if (frame2.trimmed) {
      x = frame2.spriteSourceSizeX - originX * sourceSizeWidth;
      y = frame2.spriteSourceSizeY - originY * sourceSizeHeight;
      width = frame2.spriteSourceSizeWidth;
      height = frame2.spriteSourceSizeHeight;
    } else {
      x = -originX * sourceSizeWidth;
      y = -originY * sourceSizeHeight;
      width = sourceSizeWidth;
      height = sourceSizeHeight;
    }
    SetExtent(child.id, x, y, width, height);
    return child;
  }

  // d:/wamp/www/phaser-genesis/src/textures/SetVertexUVsFromFrame.ts
  function SetVertexUVsFromFrame(id, frame2) {
    SetUV(id, frame2.u0, frame2.v0, frame2.u1, frame2.v1);
    return frame2;
  }

  // d:/wamp/www/phaser-genesis/src/gameobjects/sprite/SetFrame.ts
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
        child.origin.set(pivot.x, pivot.y);
      }
      SetExtentFromFrame(child, frame2);
      SetVertexUVsFromFrame(child.id, frame2);
    });
    return children;
  }

  // d:/wamp/www/phaser-genesis/src/gameobjects/sprite/SetTexture.ts
  function SetTexture(key, frame2, ...children) {
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

  // d:/wamp/www/phaser-genesis/src/gameobjects/sprite/Sprite.ts
  var Sprite = class extends Container {
    type = "Sprite";
    texture;
    frame;
    hasTexture = false;
    constructor(x, y, texture = "__BLANK", frame2) {
      super(x, y);
      AddQuadVertex(this.id);
      this.setTexture(texture, frame2);
    }
    setTexture(key, frame2) {
      SetTexture(key, frame2, this);
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
      const color = this.color;
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.set(this.shader, 0);
      }
      if (color.colorMatrixEnabled) {
        renderPass.colorMatrix.set(color);
      }
      this.preRenderGL(renderPass);
      BatchTexturedQuadBuffer(this.texture, this.id, renderPass);
      if (color.colorMatrixEnabled && !color.willColorChildren) {
        Flush(renderPass);
        renderPass.colorMatrix.pop();
      }
    }
    renderCanvas(renderer) {
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.texture = null;
      this.frame = null;
      this.hasTexture = false;
    }
  };

  // d:/wamp/www/phaser-genesis/src/config/banner/AddBanner.ts
  function AddBanner() {
    const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
    if (title !== "") {
      const str = `${title} ${version}`.trimEnd();
      console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
    }
  }

  // d:/wamp/www/phaser-genesis/src/config/globalvar/AddGlobalVar.ts
  function AddGlobalVar(game) {
    const globalVar = ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
    if (globalVar && window) {
      window[globalVar] = game;
    }
  }

  // d:/wamp/www/phaser-genesis/src/dom/AddToDOM.ts
  function AddToDOM(element, parent) {
    const target = GetElement(parent);
    target.appendChild(element);
    return element;
  }

  // d:/wamp/www/phaser-genesis/src/config/parent/AddToParent.ts
  function AddToParent() {
    const parent = ConfigStore.get(CONFIG_DEFAULTS.PARENT);
    const canvas = RendererInstance.get().canvas;
    if (parent && canvas) {
      AddToDOM(canvas, parent);
    }
  }

  // d:/wamp/www/phaser-genesis/src/config/renderer/CreateRenderer.ts
  function CreateRenderer() {
    const renderer = ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
    if (renderer) {
      new renderer();
    }
  }

  // d:/wamp/www/phaser-genesis/src/GameInstance.ts
  var instance5;
  var frame = 0;
  var elapsed = 0;
  var GameInstance = {
    get: () => {
      return instance5;
    },
    set: (game) => {
      instance5 = game;
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

  // d:/wamp/www/phaser-genesis/src/config/scenes/GetScenes.ts
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // d:/wamp/www/phaser-genesis/src/events/EventInstance.ts
  var EventInstance = class {
    callback;
    context;
    once;
    constructor(callback, context, once = false) {
      this.callback = callback;
      this.context = context;
      this.once = once;
    }
  };

  // d:/wamp/www/phaser-genesis/src/events/On.ts
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

  // d:/wamp/www/phaser-genesis/src/events/Once.ts
  function Once(emitter, event, callback, context = emitter) {
    return On(emitter, event, callback, context, true);
  }

  // d:/wamp/www/phaser-genesis/src/scenes/RenderStats.ts
  var RenderStats = {
    fps: 0,
    delta: 0,
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

  // d:/wamp/www/phaser-genesis/src/scenes/ResetRenderStats.ts
  function ResetRenderStats(gameFrame, scenes) {
    RenderStats.gameFrame = gameFrame;
    RenderStats.numScenes = scenes;
    RenderStats.numWorlds = 0;
    RenderStats.numGameObjects = 0;
    RenderStats.numGameObjectsRendered = 0;
    RenderStats.numDirtyWorldLists = 0;
    RenderStats.numDirtyVertices = 0;
    RenderStats.numDirtyLocalTransforms = 0;
    RenderStats.numDirtyWorldTransforms = 0;
    RenderStats.numDirtyCameras = 0;
  }

  // d:/wamp/www/phaser-genesis/src/scenes/SceneManagerInstance.ts
  var instance6;
  var SceneManagerInstance = {
    get: () => {
      return instance6;
    },
    set: (manager) => {
      if (instance6) {
        throw new Error("Cannot instantiate SceneManager more than once");
      }
      instance6 = manager;
    }
  };

  // d:/wamp/www/phaser-genesis/src/world/WorldList.ts
  var WorldList = new Map();

  // d:/wamp/www/phaser-genesis/src/scenes/SceneManager.ts
  var SceneManager = class {
    id = addEntity(GameObjectWorld);
    game;
    scenes = new Map();
    sceneIndex = 0;
    flush;
    constructor() {
      SceneManagerInstance.set(this);
      this.game = GameInstance.get();
      Once(this.game, "boot", () => this.boot());
    }
    boot() {
      const scenes = GetScenes();
      if (scenes) {
        scenes.forEach((scene) => new scene());
      }
    }
    update() {
      const time = this.game.time;
      const delta = time.delta;
      const now = time.lastTick;
      const gameFrame = time.frame;
      ResetRenderStats(gameFrame, this.scenes.size);
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world2 of worlds2) {
          world2.beforeUpdate(delta, now);
        }
        if (scene.update) {
          scene.update(delta, now);
        }
        for (const world2 of worlds2) {
          world2.update(delta, now);
        }
        for (const world2 of worlds2) {
          world2.afterUpdate(delta, now);
        }
      }
    }
    preRender() {
      const gameFrame = this.game.time.frame;
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world2 of worlds2) {
          if (world2.preRender(gameFrame)) {
            this.flush = true;
          }
        }
      }
    }
    render(renderPass) {
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world2 of worlds2) {
          world2.renderGL(renderPass);
        }
      }
      this.flush = false;
    }
  };

  // d:/wamp/www/phaser-genesis/src/scenes/CreateSceneManager.ts
  function CreateSceneManager() {
    new SceneManager();
  }

  // d:/wamp/www/phaser-genesis/src/textures/CreateCanvas.ts
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // d:/wamp/www/phaser-genesis/src/textures/TextureManager.ts
  var TextureManager = class {
    textures;
    constructor() {
      TextureManagerInstance.set(this);
      this.textures = new Map();
      this.createDefaultTextures();
    }
    createDefaultTextures() {
      this.add("__BLANK", new Texture(CreateCanvas(2, 2).canvas));
      const missing = CreateCanvas(32, 32);
      missing.strokeStyle = "#0f0";
      missing.moveTo(0, 0);
      missing.lineTo(32, 32);
      missing.stroke();
      missing.strokeRect(0.5, 0.5, 31, 31);
      this.add("__MISSING", new Texture(missing.canvas));
      const white = CreateCanvas(2, 2);
      white.fillStyle = "#fff";
      white.fillRect(0, 0, 2, 2);
      const whiteTexture = this.add("__WHITE", new Texture(white.canvas));
      WhiteTexture.set(whiteTexture);
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
      if (!this.textures.has(key)) {
        if (source instanceof Texture) {
          texture = source;
        } else {
          texture = new Texture(source, 0, 0, glConfig);
        }
        texture.key = key;
        this.textures.set(key, texture);
      }
      return texture;
    }
    update(key, source, glConfig) {
      const texture = this.textures.get(key);
      if (texture) {
        texture.update(source, glConfig);
      }
      return texture;
    }
  };

  // d:/wamp/www/phaser-genesis/src/textures/CreateTextureManager.ts
  function CreateTextureManager() {
    new TextureManager();
  }

  // d:/wamp/www/phaser-genesis/src/dom/DOMContentLoaded.ts
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

  // d:/wamp/www/phaser-genesis/src/events/EventEmitter.ts
  var EventEmitter = class {
    events;
    constructor() {
      this.events = new Map();
    }
  };

  // d:/wamp/www/phaser-genesis/src/scenes/GetConfigValue.ts
  function GetConfigValue(config, property, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(config, property)) {
      return config[property];
    } else {
      return defaultValue;
    }
  }

  // d:/wamp/www/phaser-genesis/src/scenes/Install.ts
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

  // d:/wamp/www/phaser-genesis/src/scenes/Scene.ts
  var Scene = class {
    key;
    game;
    events;
    constructor(config) {
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // d:/wamp/www/phaser-genesis/src/config/SetConfigDefaults.ts
  function SetConfigDefaults() {
    SetBackgroundColor(0);
    SetBatchSize(2048);
    SetBanner("Phaser", "4.0.0", "https://phaser4.io");
    SetMaxTextures(0);
    SetDefaultOrigin(0.5, 0.5);
    SetSize(800, 600, 1);
    SetWebGLContext({
      antialias: true,
      desynchronized: true,
      preserveDrawingBuffer: true
    });
  }

  // d:/wamp/www/phaser-genesis/src/components/timer/Time.ts
  var Time = class {
    lastTick = 0;
    elapsed = 0;
    delta = 0;
    fps = 60;
    fpsCount = 0;
    frame = 0;
    ms = 0;
    prevFrame = 0;
    constructor() {
      const now = performance.now();
      this.lastTick = now;
      this.prevFrame = now;
    }
    update(time) {
      this.ms = time - this.lastTick;
    }
    updateDelta(time) {
      const now = performance.now();
      const elapsed2 = now - time;
      this.fpsCount++;
      if (now >= this.prevFrame + 1e3) {
        this.fps = this.fpsCount * 1e3 / (now - this.prevFrame);
        this.prevFrame = now;
        this.fpsCount = 0;
      }
      this.lastTick = now;
      this.elapsed += elapsed2;
      this.delta = 1e3 / this.fps;
      this.frame++;
      GameInstance.setFrame(this.frame);
      RenderStats.fps = this.fps;
      RenderStats.delta = 1e3 / this.fps;
      return this.frame;
    }
    resetLastTick() {
      this.lastTick = performance.now();
    }
  };

  // d:/wamp/www/phaser-genesis/src/Game.ts
  var Game = class extends EventEmitter {
    id = addEntity(GameObjectWorld);
    time;
    isBooted = false;
    isPaused = false;
    willUpdate = true;
    willRender = true;
    constructor(...settings) {
      super();
      this.time = new Time();
      GameInstance.set(this);
      SetConfigDefaults();
      DOMContentLoaded(() => this.boot(settings));
    }
    boot(settings) {
      settings.forEach((setting) => setting());
      CreateRenderer();
      CreateTextureManager();
      CreateSceneManager();
      AddBanner();
      AddGlobalVar(this);
      AddToParent();
      this.isBooted = true;
      Emit(this, "boot");
      requestAnimationFrame((now) => this.step(now));
    }
    pause() {
      this.isPaused = true;
    }
    resume() {
      this.isPaused = false;
      this.time.resetLastTick();
    }
    update(delta, time) {
    }
    render(renderPass, delta, time) {
    }
    step(now) {
      const renderer = RendererInstance.get();
      const sceneManager = SceneManagerInstance.get();
      const time = this.time;
      time.update(now);
      if (!this.isPaused) {
        const delta = time.delta;
        if (this.willUpdate) {
          sceneManager.update();
          this.update(delta, now);
          Emit(this, "update", delta, now);
        }
        if (this.willRender) {
          sceneManager.preRender();
          renderer.begin(sceneManager.flush);
          const renderPass = renderer.renderPass;
          sceneManager.render(renderPass);
          this.render(renderPass, delta, now);
          Emit(this, "render", renderPass, delta, now);
          renderer.end();
        }
      }
      time.updateDelta(now);
      Emit(this, "step");
      requestAnimationFrame((now2) => this.step(now2));
    }
    destroy() {
    }
  };

  // d:/wamp/www/phaser-genesis/src/loader/CreateFile.ts
  function CreateFile(key, url, skipCache = false) {
    return {
      key,
      url,
      skipCache
    };
  }

  // d:/wamp/www/phaser-genesis/src/loader/IsAbsoluteURI.ts
  function IsAbsoluteURI(url) {
    return /^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.test(url);
  }

  // d:/wamp/www/phaser-genesis/src/loader/GetURL.ts
  function GetURL(key, url, extension, loader) {
    if (!url) {
      url = `${key}.${extension}`;
    }
    if (IsAbsoluteURI(url)) {
      return url;
    } else if (loader) {
      return `${loader.baseURL}${loader.path}${url}`;
    } else {
      return url;
    }
  }

  // d:/wamp/www/phaser-genesis/src/loader/RequestFile.ts
  async function RequestFile(file, preload, onload, fileData) {
    if (!preload(file)) {
      return Promise.reject(file);
    }
    try {
      const request = new Request(file.url, fileData?.requestInit);
      file.response = await fetch(request);
      if (file.response.ok && await onload(file)) {
        return Promise.resolve(file);
      } else {
        return Promise.reject(file);
      }
    } catch (error) {
      file.error = error;
      return Promise.reject(file);
    }
  }

  // d:/wamp/www/phaser-genesis/src/loader/files/ImageFile.ts
  function ImageFile(key, url, fileData = {}) {
    return (loader) => {
      const file = CreateFile(key, GetURL(key, url, "png", loader), fileData?.skipCache);
      const textureManager = TextureManagerInstance.get();
      const preload = () => {
        return textureManager && (!textureManager.has(key) || !textureManager.get(key).locked);
      };
      const onload = async (file2) => {
        const blob = await file2.response.blob();
        let image;
        if (window && "createImageBitmap" in window && !fileData?.getImage) {
          image = await createImageBitmap(blob);
        } else {
          image = await new Promise((resolve, reject) => {
            const url2 = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
              URL.revokeObjectURL(url2);
              resolve(img);
            };
            img.onerror = () => {
              reject();
            };
            img.src = url2;
            if (img.complete && img.width && img.height) {
              img.onload = null;
              img.onerror = null;
              resolve(img);
            }
          });
        }
        if (!image) {
          return false;
        }
        if (fileData.skipCache) {
          file2.data = image;
        } else if (textureManager.has(key)) {
          file2.data = textureManager.update(key, image, fileData?.glConfig);
        } else {
          file2.data = textureManager.add(key, image, fileData?.glConfig);
        }
        return true;
      };
      return RequestFile(file, preload, onload, fileData);
    };
  }

  // d:/wamp/www/phaser-genesis/src/loader/Loader.ts
  var Loader = class extends EventEmitter {
    baseURL = "";
    path = "";
    crossOrigin = "anonymous";
    maxParallelDownloads = -1;
    isLoading = false;
    progress;
    queue;
    inflight;
    completed;
    onComplete;
    onError;
    constructor() {
      super();
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
          const loadFile = iterator.next().value;
          this.inflight.add(loadFile);
          this.queue.delete(loadFile);
          loadFile(this).then((file) => {
            this.fileComplete(file);
            this.updateProgress(file, loadFile);
          }).catch((file) => {
            this.fileError(file);
            this.updateProgress(file, loadFile);
          });
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
    updateProgress(file, queueEntry) {
      this.inflight.delete(queueEntry);
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
    }
    fileError(file) {
      Emit(this, "fileerror", file);
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

  // d:/wamp/www/phaser-genesis/src/components/color/UpdateQuadColorSystem.ts
  function UpdateQuadColorSystem(entities) {
    let total = 0;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      if (HasDirtyColor(id)) {
        const r = ColorComponent.r[id] / 255;
        const g = ColorComponent.g[id] / 255;
        const b = ColorComponent.b[id] / 255;
        const a = ColorComponent.a[id];
        SetQuadColor(id, r, g, b, a);
        ClearDirtyColor(id);
        total++;
      }
    }
    return total;
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillRenderChildren.ts
  function WillRenderChildren(id) {
    return GetVisibleChildren(id) && Boolean(PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN]);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/HasRenderableChildren.ts
  function HasRenderableChildren(id, dirtyCamera) {
    const numChildren = GetNumChildren(id);
    if (numChildren === 0 || !WillRenderChildren(id)) {
      return 0;
    }
    if (dirtyCamera || !WillCacheChildren(id) || WillCacheChildren(id) && HasDirtyChildCache(id)) {
      return numChildren;
    }
    return 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/SetWillCacheChildren.ts
  function SetWillCacheChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/SetWillTransformChildren.ts
  function SetWillTransformChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillUpdate.ts
  function WillUpdate(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE]);
  }

  // d:/wamp/www/phaser-genesis/src/components/permissions/WillUpdateChildren.ts
  function WillUpdateChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyTransforms.ts
  function ClearDirtyTransforms(id) {
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.DIRTY] = 0;
    data[TRANSFORM.DIRTY_WORLD] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyChildWorldTransform.ts
  function SetDirtyChildWorldTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/UpdateLocalTransform.ts
  function UpdateLocalTransform(worldID, entities, camera, gameFrame) {
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    let total = 0;
    let prevParent = 0;
    let dirtyWorld = false;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      const data = Transform2DComponent.data[id];
      if (data[TRANSFORM.DIRTY] === 0) {
        continue;
      }
      const isRoot = data[TRANSFORM.IS_ROOT];
      const tx = data[TRANSFORM.X];
      const ty = data[TRANSFORM.Y];
      const rotation = data[TRANSFORM.ROTATION];
      const scaleX = data[TRANSFORM.SCALE_X];
      const scaleY = data[TRANSFORM.SCALE_Y];
      const skewX = data[TRANSFORM.SKEW_X];
      const skewY = data[TRANSFORM.SKEW_Y];
      const axisAligned = data[TRANSFORM.AXIS_ALIGNED];
      const x = data[TRANSFORM.FRAME_X1];
      const y = data[TRANSFORM.FRAME_Y1];
      const right = data[TRANSFORM.FRAME_X2];
      const bottom = data[TRANSFORM.FRAME_Y2];
      let a = scaleX;
      let b = 0;
      let c = 0;
      let d = scaleY;
      if (!axisAligned) {
        a = Math.cos(rotation + skewY) * scaleX;
        b = Math.sin(rotation + skewY) * scaleX;
        c = -Math.sin(rotation - skewX) * scaleY;
        d = Math.cos(rotation - skewX) * scaleY;
      }
      data[TRANSFORM.LOCAL_A] = a;
      data[TRANSFORM.LOCAL_B] = b;
      data[TRANSFORM.LOCAL_C] = c;
      data[TRANSFORM.LOCAL_D] = d;
      data[TRANSFORM.LOCAL_TX] = tx;
      data[TRANSFORM.LOCAL_TY] = ty;
      if (isRoot) {
        data[TRANSFORM.WORLD_A] = a;
        data[TRANSFORM.WORLD_B] = b;
        data[TRANSFORM.WORLD_C] = c;
        data[TRANSFORM.WORLD_D] = d;
        data[TRANSFORM.WORLD_TX] = tx;
        data[TRANSFORM.WORLD_TY] = ty;
        data[TRANSFORM.UPDATED] = gameFrame;
        if (axisAligned) {
          const x0 = x * a + tx;
          const y0 = y * d + ty;
          const x1 = x * a + tx;
          const y1 = bottom * d + ty;
          const x2 = right * a + tx;
          const y2 = bottom * d + ty;
          const x3 = right * a + tx;
          const y3 = y * d + ty;
          data[TRANSFORM.BOUNDS_X1] = x0;
          data[TRANSFORM.BOUNDS_Y1] = y0;
          data[TRANSFORM.BOUNDS_X2] = x2;
          data[TRANSFORM.BOUNDS_Y2] = y2;
          data[TRANSFORM.IN_VIEW] = Number(!(cright < x0 || cbottom < y0 || cx > x2 || cy > y2));
          SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
        } else {
          const x0 = x * a + y * c + tx;
          const y0 = x * b + y * d + ty;
          const x1 = x * a + bottom * c + tx;
          const y1 = x * b + bottom * d + ty;
          const x2 = right * a + bottom * c + tx;
          const y2 = right * b + bottom * d + ty;
          const x3 = right * a + y * c + tx;
          const y3 = right * b + y * d + ty;
          const bx = Math.min(x0, x1, x2, x3);
          const by = Math.min(y0, y1, y2, y3);
          const br = Math.max(x0, x1, x2, x3);
          const bb = Math.max(y0, y1, y2, y3);
          data[TRANSFORM.BOUNDS_X1] = bx;
          data[TRANSFORM.BOUNDS_Y1] = by;
          data[TRANSFORM.BOUNDS_X2] = br;
          data[TRANSFORM.BOUNDS_Y2] = bb;
          data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
          SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
        }
        ClearDirtyTransforms(id);
      } else {
        const parentID = GetParentID(id);
        if (parentID !== prevParent) {
          SetDirtyParents(id);
          prevParent = parentID;
        }
        dirtyWorld = true;
      }
      SetDirtyChildTransform(id);
      total++;
    }
    if (dirtyWorld) {
      SetDirtyChildWorldTransform(worldID);
    }
    return total;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/SetDirtyWorldTransform.ts
  function SetDirtyWorldTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD] = 1;
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/CopyLocalToWorld.ts
  function CopyLocalToWorld(source, target) {
    const targetData = Transform2DComponent.data[target];
    const sourceData = Transform2DComponent.data[source];
    targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.LOCAL_A];
    targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.LOCAL_B];
    targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.LOCAL_C];
    targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.LOCAL_D];
    targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.LOCAL_TX];
    targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.LOCAL_TY];
    SetDirtyWorldTransform(target);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/CopyWorldToWorld.ts
  function CopyWorldToWorld(source, target) {
    const targetData = Transform2DComponent.data[target];
    const sourceData = Transform2DComponent.data[source];
    targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.WORLD_A];
    targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.WORLD_B];
    targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.WORLD_C];
    targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.WORLD_D];
    targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.WORLD_TX];
    targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.WORLD_TY];
    SetDirtyWorldTransform(target);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/MultiplyLocalWithWorld.ts
  function MultiplyLocalWithWorld(parentID, childID) {
    const parentData = Transform2DComponent.data[parentID];
    const childData = Transform2DComponent.data[childID];
    const pa = parentData[TRANSFORM.WORLD_A];
    const pb = parentData[TRANSFORM.WORLD_B];
    const pc = parentData[TRANSFORM.WORLD_C];
    const pd = parentData[TRANSFORM.WORLD_D];
    const ptx = parentData[TRANSFORM.WORLD_TX];
    const pty = parentData[TRANSFORM.WORLD_TY];
    const a = childData[TRANSFORM.LOCAL_A];
    const b = childData[TRANSFORM.LOCAL_B];
    const c = childData[TRANSFORM.LOCAL_C];
    const d = childData[TRANSFORM.LOCAL_D];
    const tx = childData[TRANSFORM.LOCAL_TX];
    const ty = childData[TRANSFORM.LOCAL_TY];
    childData[TRANSFORM.WORLD_A] = a * pa + b * pc;
    childData[TRANSFORM.WORLD_B] = a * pb + b * pd;
    childData[TRANSFORM.WORLD_C] = c * pa + d * pc;
    childData[TRANSFORM.WORLD_D] = c * pb + d * pd;
    childData[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
    childData[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;
    SetDirtyWorldTransform(childID);
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/UpdateWorldTransform.ts
  function UpdateWorldTransform(id) {
    const parentID = GetParentID(id);
    if (!hasComponent(GameObjectWorld, Transform2DComponent, parentID)) {
      CopyLocalToWorld(id, id);
    } else if (!WillTransformChildren(id)) {
      CopyWorldToWorld(parentID, id);
    } else {
      MultiplyLocalWithWorld(parentID, id);
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyChildTransform.ts
  function ClearDirtyChildTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyWorldTransform.ts
  function ClearDirtyWorldTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyWorldTransform.ts
  function HasDirtyWorldTransform(id) {
    return Boolean(Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD]);
  }

  // d:/wamp/www/phaser-genesis/src/components/vertices/SetQuadFromWorld.ts
  function SetQuadFromWorld(id, gameFrame, cx, cy, cright, cbottom) {
    const data = Transform2DComponent.data[id];
    const a = data[TRANSFORM.WORLD_A];
    const b = data[TRANSFORM.WORLD_B];
    const c = data[TRANSFORM.WORLD_C];
    const d = data[TRANSFORM.WORLD_D];
    const tx = data[TRANSFORM.WORLD_TX];
    const ty = data[TRANSFORM.WORLD_TY];
    const x = data[TRANSFORM.FRAME_X1];
    const y = data[TRANSFORM.FRAME_Y1];
    const right = data[TRANSFORM.FRAME_X2];
    const bottom = data[TRANSFORM.FRAME_Y2];
    const x0 = x * a + y * c + tx;
    const y0 = x * b + y * d + ty;
    const x1 = x * a + bottom * c + tx;
    const y1 = x * b + bottom * d + ty;
    const x2 = right * a + bottom * c + tx;
    const y2 = right * b + bottom * d + ty;
    const x3 = right * a + y * c + tx;
    const y3 = right * b + y * d + ty;
    const bx = Math.min(x0, x1, x2, x3);
    const by = Math.min(y0, y1, y2, y3);
    const br = Math.max(x0, x1, x2, x3);
    const bb = Math.max(y0, y1, y2, y3);
    data[TRANSFORM.BOUNDS_X1] = bx;
    data[TRANSFORM.BOUNDS_Y1] = by;
    data[TRANSFORM.BOUNDS_X2] = br;
    data[TRANSFORM.BOUNDS_Y2] = bb;
    data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
    data[TRANSFORM.UPDATED] = gameFrame;
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
  }

  // d:/wamp/www/phaser-genesis/src/components/vertices/UpdateVertexPositionSystem.ts
  function UpdateVertexPositionSystem(entities, camera, gameFrame) {
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    let total = 0;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      if (HasDirtyWorldTransform(id)) {
        SetQuadFromWorld(id, gameFrame, cx, cy, cright, cbottom);
        ClearDirtyWorldTransform(id);
        ClearDirtyChildTransform(id);
        total++;
      }
    }
    return total;
  }

  // d:/wamp/www/dev/examples/live/libs/phaser4debugkit/SpriteEditor.js
  var import_tweakpane = __toModule(require_tweakpane());
  var SpriteEditor = class {
    constructor(spriteRef) {
      this.target = spriteRef;
      this.transform = spriteRef.transform;
      this.createWindow();
    }
    createWindow() {
      const pane = new import_tweakpane.Pane();
      const transformFolder = pane.addFolder({ title: "Transform" });
      const step01 = { step: 0.1 };
      transformFolder.addInput(this.target, "position");
      transformFolder.addInput(this.target, "rotation", step01);
      transformFolder.addInput(this.target, "scale", { x: step01, y: step01 });
      transformFolder.addInput(this.target, "skew", { x: step01, y: step01 });
      transformFolder.addInput(this.target, "origin", { min: 0, max: 1, step: 0.1 });
      const displayFolder = pane.addFolder({ title: "Display" });
      displayFolder.addInput(this.target, "visible");
      displayFolder.addInput(this.target, "alpha", { min: 0, max: 1, step: 0.1 });
    }
  };

  // d:/wamp/www/phaser-genesis/src/world/events/WorldAfterUpdateEvent.ts
  var WorldAfterUpdateEvent = "afterupdate";

  // d:/wamp/www/phaser-genesis/src/world/events/WorldBeforeUpdateEvent.ts
  var WorldBeforeUpdateEvent = "beforeupdate";

  // d:/wamp/www/phaser-genesis/src/world/events/WorldPostRenderEvent.ts
  var WorldPostRenderEvent = "worldpostrender";

  // d:/wamp/www/phaser-genesis/src/world/events/WorldRenderEvent.ts
  var WorldRenderEvent = "worldrender";

  // d:/wamp/www/phaser-genesis/src/world/events/WorldShutdownEvent.ts
  var WorldShutdownEvent = "worldshutdown";

  // d:/wamp/www/phaser-genesis/src/world/events/WorldUpdateEvent.ts
  var WorldUpdateEvent = "update";

  // d:/wamp/www/phaser-genesis/src/components/transform/IsInView.ts
  function IsInView(id) {
    return Boolean(Transform2DComponent.data[id][TRANSFORM.IN_VIEW]);
  }

  // d:/wamp/www/phaser-genesis/src/world/RenderChild.ts
  var RENDER_CHILD_TOTAL = 0;
  function GetRenderChildTotal() {
    return RENDER_CHILD_TOTAL;
  }
  function ResetRenderChildTotal() {
    RENDER_CHILD_TOTAL = 0;
  }
  function RenderChild(renderPass, id) {
    const inView = IsInView(id) || WillCacheChildren(id);
    let gameObject;
    if (inView) {
      gameObject = GameObjectCache.get(id);
      gameObject.renderGL(renderPass);
      RENDER_CHILD_TOTAL++;
    }
    const numChildren = HasRenderableChildren(id, renderPass.isCameraDirty());
    if (numChildren) {
      let childID = GetFirstChildID(id);
      for (let i = 0; i < numChildren; i++) {
        if (WillRender(childID)) {
          if (GetNumChildren(childID)) {
            RenderChild(renderPass, childID);
          } else if (IsInView(childID)) {
            const childGameObject = GameObjectCache.get(childID);
            childGameObject.renderGL(renderPass);
            childGameObject.postRenderGL(renderPass);
            RENDER_CHILD_TOTAL++;
          }
        }
        childID = GetNextSiblingID(childID);
      }
    }
    if (inView) {
      gameObject.postRenderGL(renderPass);
    }
  }

  // d:/wamp/www/phaser-genesis/src/scenes/events/SceneDestroyEvent.ts
  var SceneDestroyEvent = "destroy";

  // d:/wamp/www/phaser-genesis/src/world/BaseWorld.ts
  var BaseWorld = class extends GameObject {
    type = "BaseWorld";
    tag = defineComponent();
    scene;
    camera;
    is3D = false;
    color;
    totalChildren = 0;
    totalChildrenQuery;
    constructor(scene) {
      super();
      const id = this.id;
      const tag = this.tag;
      this.scene = scene;
      this.totalChildrenQuery = defineQuery([tag]);
      SetWorldID(id, id);
      WorldList.get(scene).push(this);
      this.color = new Color(id);
      Once(scene, SceneDestroyEvent, () => this.destroy());
    }
    getNumChildren() {
      if (HasDirtyDisplayList(this.id)) {
        this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      }
      return this.totalChildren;
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
    preRender(gameFrame) {
      return true;
    }
    renderGL(renderPass) {
    }
    shutdown() {
      RemoveChildren(this);
      Emit(this, WorldShutdownEvent, this);
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

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/SetCamera.ts
  function SetCamera(renderPass, camera) {
    if (renderPass.current2DCamera !== camera) {
      Flush(renderPass);
      renderPass.current2DCamera = camera;
      renderPass.cameraMatrix = camera.getMatrix();
    }
    if (camera.update()) {
      renderPass.getCurrentShader().bind(renderPass);
    }
  }

  // d:/wamp/www/phaser-genesis/src/renderer/webgl1/renderpass/Begin.ts
  function Begin(renderPass, camera) {
    renderPass.shader.bindDefault();
    SetCamera(renderPass, camera);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyChildColor.ts
  function ClearDirtyChildColor(id) {
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/ClearDirtyChildWorldTransform.ts
  function ClearDirtyChildWorldTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM] = 0;
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyChildColor.ts
  function HasDirtyChildColor(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_COLOR]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyChildTransform.ts
  function HasDirtyChildTransform(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM]);
  }

  // d:/wamp/www/phaser-genesis/src/components/dirty/HasDirtyChildWorldTransform.ts
  function HasDirtyChildWorldTransform(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM]);
  }

  // d:/wamp/www/phaser-genesis/src/components/hierarchy/MoveNextUpdatable.ts
  function MoveNextUpdatable(id) {
    const firstChild = GetFirstChildID(id);
    if (firstChild > 0 && WillUpdateChildren(id)) {
      return firstChild;
    } else {
      const sibling = GetNextSiblingID(id);
      if (sibling === 0) {
        const parent = GetParentID(id);
        if (parent === GetWorldID(id)) {
          return 0;
        } else {
          return GetNextSiblingID(parent);
        }
      } else {
        return sibling;
      }
    }
  }

  // d:/wamp/www/phaser-genesis/src/world/RebuildWorldTransforms.ts
  function RebuildWorldTransforms(entities) {
    let total = 0;
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      const parentID = GetParentID(id);
      if (HasDirtyTransform(id) || HasDirtyChildTransform(parentID)) {
        UpdateWorldTransform(id);
        ClearDirtyTransform(id);
        total++;
      }
    }
    return total;
  }

  // d:/wamp/www/phaser-genesis/src/components/transform/SetInViewFromBounds.ts
  function SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom) {
    const data = Transform2DComponent.data[id];
    if (data[TRANSFORM.UPDATED] < gameFrame) {
      const bx = data[TRANSFORM.BOUNDS_X1];
      const by = data[TRANSFORM.BOUNDS_Y1];
      const br = data[TRANSFORM.BOUNDS_X2];
      const bb = data[TRANSFORM.BOUNDS_Y2];
      data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
      data[TRANSFORM.UPDATED] = gameFrame;
    }
  }

  // d:/wamp/www/phaser-genesis/src/components/vertices/UpdateInViewSystem.ts
  function UpdateInViewSystem(entities, camera, gameFrame) {
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    let total = 0;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      if (WillRender(id)) {
        SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom);
        total++;
      }
    }
    return total;
  }

  // d:/wamp/www/phaser-genesis/src/camera/WorldCamera.ts
  var WorldCamera = class {
    id = addEntity(GameObjectWorld);
    type = "WorldCamera";
    name = "";
    size;
    position;
    isDirty = true;
    matrix;
    constructor(width, height) {
      const id = this.id;
      AddTransform2DComponent(id, 0, 0, 0, 0);
      this.matrix = new Matrix4();
      this.position = new Position(id, 0, 0);
      this.size = new Size(id, width, height);
      this.reset(width, height);
    }
    set x(value) {
      this.position.x = value;
      this.isDirty = true;
    }
    get x() {
      return this.position.x;
    }
    set y(value) {
      this.position.y = value;
      this.isDirty = true;
    }
    get y() {
      return this.position.y;
    }
    setPosition(x, y) {
      this.position.set(x, y);
      this.isDirty = true;
      return this;
    }
    updateBounds() {
      const id = this.id;
      if (HasDirtyTransform(id)) {
        const x = this.x;
        const y = this.y;
        const w = this.size.width;
        const h = this.size.height;
        const ox = -x + w / 2;
        const oy = -y + h / 2;
        const bx = ox - w / 2;
        const by = oy - h / 2;
        SetBounds(id, bx, by, bx + w, by + h);
        ClearDirtyTransform(id);
        this.isDirty = true;
        return true;
      }
      return false;
    }
    update() {
      if (this.isDirty) {
        const data = this.matrix.data;
        data[12] = this.x;
        data[13] = this.y;
        return true;
      }
      return false;
    }
    getBoundsX() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X1];
    }
    getBoundsY() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y1];
    }
    getBoundsRight() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X2];
    }
    getBoundsBottom() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y2];
    }
    getMatrix() {
      return this.matrix.data;
    }
    reset(width, height) {
      this.size.set(width, height);
      this.isDirty = true;
    }
    destroy() {
      const id = this.id;
      removeComponent(GameObjectWorld, Transform2DComponent, id);
      removeEntity(GameObjectWorld, id);
    }
  };

  // d:/wamp/www/phaser-genesis/src/world/StaticWorld.ts
  var StaticWorld = class extends BaseWorld {
    type = "StaticWorld";
    colorQuery;
    transformQuery;
    renderData;
    constructor(scene) {
      super(scene);
      const tag = this.tag;
      this.colorQuery = defineQuery([tag, ColorComponent, QuadVertexComponent]);
      this.transformQuery = defineQuery([tag, Transform2DComponent]);
      const renderer = RendererInstance.get();
      this.camera = new WorldCamera(renderer.width, renderer.height);
      this.renderData = {
        gameFrame: 0,
        dirtyLocal: 0,
        dirtyWorld: 0,
        dirtyQuad: 0,
        dirtyColor: 0,
        dirtyView: 0,
        numChildren: 0,
        rendered: 0,
        renderMs: 0,
        updated: 0,
        updateMs: 0,
        fps: 0
      };
      SetWillTransformChildren(this.id, false);
      SetWillCacheChildren(this.id, false);
    }
    preRender(gameFrame) {
      const id = this.id;
      const renderData = this.renderData;
      renderData.gameFrame = gameFrame;
      renderData.rendered = 0;
      ClearDirtyChild(id);
      const camera = this.camera;
      const cameraUpdated = camera.updateBounds();
      const entities = this.transformQuery(GameObjectWorld);
      let dirtyLocal = 0;
      let dirtyWorld = 0;
      let dirtyQuad = 0;
      let dirtyColor = 0;
      let dirtyView = 0;
      if (HasDirtyChildTransform(id)) {
        dirtyLocal = UpdateLocalTransform(id, entities, camera, gameFrame);
        ClearDirtyChildTransform(id);
      }
      if (HasDirtyChildWorldTransform(id)) {
        dirtyWorld = RebuildWorldTransforms(entities);
        dirtyQuad = UpdateVertexPositionSystem(entities, camera, gameFrame);
        ClearDirtyChildWorldTransform(id);
      }
      if (HasDirtyChildColor(id)) {
        dirtyColor = UpdateQuadColorSystem(this.colorQuery(GameObjectWorld));
        ClearDirtyChildColor(id);
      }
      if (HasDirtyDisplayList(id)) {
        this.getNumChildren();
        ClearDirtyDisplayList(id);
      }
      const totalUpdated = dirtyLocal + dirtyQuad;
      if (cameraUpdated && totalUpdated !== entities.length) {
        dirtyView = UpdateInViewSystem(entities, camera, gameFrame);
      }
      renderData.dirtyLocal = dirtyLocal;
      renderData.dirtyWorld = dirtyWorld;
      renderData.dirtyQuad = dirtyQuad;
      renderData.dirtyColor = dirtyColor;
      renderData.dirtyView = dirtyView;
      renderData.rendered = GetRenderChildTotal();
      return true;
    }
    update(delta, time) {
      Emit(this, WorldBeforeUpdateEvent, delta, time);
      const start = performance.now();
      let next = GetFirstChildID(this.id);
      let total = 0;
      while (next > 0) {
        if (WillUpdate(next)) {
          GameObjectCache.get(next).update(delta, time);
          total++;
        }
        next = MoveNextUpdatable(next);
      }
      this.renderData.updated = total;
      this.renderData.updateMs = performance.now() - start;
      Emit(this, WorldUpdateEvent, delta, time);
    }
    renderGL(renderPass) {
      SetColor(renderPass, this.color);
      Emit(this, WorldRenderEvent, this);
      const camera = this.camera;
      const renderData = this.renderData;
      const start = performance.now();
      Begin(renderPass, camera);
      ResetRenderChildTotal();
      let id = GetFirstChildID(this.id);
      while (id > 0) {
        if (WillRender(id)) {
          RenderChild(renderPass, id);
        }
        id = GetNextSiblingID(id);
      }
      camera.isDirty = false;
      PopColor(renderPass, this.color);
      renderData.renderMs = performance.now() - start;
      renderData.numChildren = this.getNumChildren();
      renderData.fps = this.scene.game.time.fps;
      window["renderStats"] = renderData;
      Emit(this, WorldPostRenderEvent, renderPass, this);
    }
  };

  // d:/wamp/www/dev/examples/src/gameobjects/sprite/debug sprite.ts
  var Demo = class extends Scene {
    constructor() {
      super();
      const world2 = new StaticWorld(this);
      const loader = new Loader();
      loader.add(ImageFile("logo", "assets/logo.png"));
      loader.start().then(() => {
        const logo = new Sprite(400, 300, "logo");
        AddChildren(world2, logo);
        new SpriteEditor(logo);
      });
    }
  };
  new Game(WebGL(), Parent("gameParent"), GlobalVar("Phaser4"), BackgroundColor(4033837), Scenes(Demo));
})();
/*! Tweakpane 3.0.5 (c) 2016 cocopon, licensed under the MIT license. */
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
//# sourceMappingURL=debug sprite.js.map
