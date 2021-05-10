(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/tweakpane/dist/tweakpane.js
  var require_tweakpane = __commonJS({
    "node_modules/tweakpane/dist/tweakpane.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tweakpane = factory());
      })(exports, function() {
        "use strict";
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        function __extends(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }
        var __assign = function() {
          __assign = Object.assign || function __assign2(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        function __spreadArrays() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
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
          for (var i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
              return false;
            }
          }
          return true;
        }
        var CREATE_MESSAGE_MAP = {
          alreadydisposed: function() {
            return "View has been already disposed";
          },
          invalidparams: function(context) {
            return "Invalid parameters for '" + context.name + "'";
          },
          nomatchingcontroller: function(context) {
            return "No matching controller for '" + context.key + "'";
          },
          nomatchingview: function(context) {
            return "No matching view for '" + JSON.stringify(context.params) + "'";
          },
          notbindable: function() {
            return "Value is not bindable";
          },
          propertynotfound: function(context) {
            return "Property '" + context.name + "' not found";
          },
          shouldneverhappen: function() {
            return "This error should never happen";
          }
        };
        var TpError = function() {
          function TpError2(config) {
            var _a;
            this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : "Unexpected error";
            this.name = this.constructor.name;
            this.stack = new Error(this.message).stack;
            this.type = config.type;
          }
          TpError2.alreadyDisposed = function() {
            return new TpError2({type: "alreadydisposed"});
          };
          TpError2.notBindable = function() {
            return new TpError2({
              type: "notbindable"
            });
          };
          TpError2.propertyNotFound = function(name) {
            return new TpError2({
              type: "propertynotfound",
              context: {
                name
              }
            });
          };
          TpError2.shouldNeverHappen = function() {
            return new TpError2({type: "shouldneverhappen"});
          };
          return TpError2;
        }();
        TpError.prototype = Object.create(Error.prototype);
        TpError.prototype.constructor = TpError;
        var Emitter = function() {
          function Emitter2() {
            this.observers_ = {};
          }
          Emitter2.prototype.on = function(eventName, handler) {
            var observers = this.observers_[eventName];
            if (!observers) {
              observers = this.observers_[eventName] = [];
            }
            observers.push({
              handler
            });
            return this;
          };
          Emitter2.prototype.off = function(eventName, handler) {
            var observers = this.observers_[eventName];
            if (observers) {
              this.observers_[eventName] = observers.filter(function(observer) {
                return observer.handler !== handler;
              });
            }
            return this;
          };
          Emitter2.prototype.emit = function(eventName, event) {
            var observers = this.observers_[eventName];
            if (!observers) {
              return;
            }
            observers.forEach(function(observer) {
              observer.handler(event);
            });
          };
          return Emitter2;
        }();
        var BoundValue = function() {
          function BoundValue2(initialValue, config) {
            var _a;
            this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
            this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : function(v1, v2) {
              return v1 === v2;
            };
            this.emitter = new Emitter();
            this.rawValue_ = initialValue;
          }
          Object.defineProperty(BoundValue2.prototype, "constraint", {
            get: function() {
              return this.constraint_;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(BoundValue2.prototype, "rawValue", {
            get: function() {
              return this.rawValue_;
            },
            set: function(rawValue) {
              var constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
              var changed = !this.equals_(this.rawValue_, constrainedValue);
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
            },
            enumerable: false,
            configurable: true
          });
          return BoundValue2;
        }();
        var PrimitiveValue = function() {
          function PrimitiveValue2(initialValue) {
            this.emitter = new Emitter();
            this.value_ = initialValue;
          }
          Object.defineProperty(PrimitiveValue2.prototype, "rawValue", {
            get: function() {
              return this.value_;
            },
            set: function(value) {
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
            },
            enumerable: false,
            configurable: true
          });
          return PrimitiveValue2;
        }();
        function createValue(initialValue, config) {
          var constraint = config === null || config === void 0 ? void 0 : config.constraint;
          var equals = config === null || config === void 0 ? void 0 : config.equals;
          if (!constraint && !equals) {
            return new PrimitiveValue(initialValue);
          }
          return new BoundValue(initialValue, config);
        }
        var ValueMap = function() {
          function ValueMap2(valueMap) {
            var _this = this;
            this.emitter = new Emitter();
            this.valMap_ = valueMap;
            var _loop_1 = function(key2) {
              var v = this_1.valMap_[key2];
              v.emitter.on("change", function() {
                _this.emitter.emit("change", {
                  key: key2,
                  sender: _this
                });
              });
            };
            var this_1 = this;
            for (var key in this.valMap_) {
              _loop_1(key);
            }
          }
          ValueMap2.createCore = function(initialValue) {
            var keys = Object.keys(initialValue);
            return keys.reduce(function(o, key) {
              var _a;
              return Object.assign(o, (_a = {}, _a[key] = createValue(initialValue[key]), _a));
            }, {});
          };
          ValueMap2.fromObject = function(initialValue) {
            var core = this.createCore(initialValue);
            return new ValueMap2(core);
          };
          ValueMap2.prototype.get = function(key) {
            return this.valMap_[key].rawValue;
          };
          ValueMap2.prototype.set = function(key, value) {
            this.valMap_[key].rawValue = value;
          };
          ValueMap2.prototype.value = function(key) {
            return this.valMap_[key];
          };
          ValueMap2.prototype.valueEmitter = function(key) {
            console.warn("ValueMap.valueEmitter is deprecated. Use ValueMap.value.emitter instead.\nThis polyfill will be removed in the next major version.");
            return this.valMap_[key].emitter;
          };
          return ValueMap2;
        }();
        function createBlade$1() {
          return new ValueMap({
            positions: createValue([], {
              equals: deepEqualsArray
            })
          });
        }
        function disposeElement(elem) {
          if (elem && elem.parentElement) {
            elem.parentElement.removeChild(elem);
          }
          return null;
        }
        var PREFIX = "tp";
        function ClassName(viewName) {
          var fn = function(opt_elementName, opt_modifier) {
            return [
              PREFIX,
              "-",
              viewName,
              "v",
              opt_elementName ? "_" + opt_elementName : "",
              opt_modifier ? "-" + opt_modifier : ""
            ].join("");
          };
          return fn;
        }
        function getAllBladePositions() {
          return ["veryfirst", "first", "last", "verylast"];
        }
        var className$q = ClassName("");
        var POS_TO_CLASS_NAME_MAP = {
          veryfirst: "vfst",
          first: "fst",
          last: "lst",
          verylast: "vlst"
        };
        var BladeController = function() {
          function BladeController2(config) {
            var _this = this;
            this.parent_ = null;
            this.blade = config.blade;
            this.view = config.view;
            this.viewProps = config.viewProps;
            var elem = this.view.element;
            this.blade.value("positions").emitter.on("change", function() {
              getAllBladePositions().forEach(function(pos) {
                elem.classList.remove(className$q(void 0, POS_TO_CLASS_NAME_MAP[pos]));
              });
              _this.blade.get("positions").forEach(function(pos) {
                elem.classList.add(className$q(void 0, POS_TO_CLASS_NAME_MAP[pos]));
              });
            });
            this.viewProps.handleDispose(function() {
              if (_this.view.onDispose) {
                console.warn("View.onDispose is deprecated. Use ViewProps.value('disposed').emitter instead.");
                _this.view.onDispose();
              }
              disposeElement(elem);
            });
          }
          Object.defineProperty(BladeController2.prototype, "parent", {
            get: function() {
              return this.parent_;
            },
            enumerable: false,
            configurable: true
          });
          return BladeController2;
        }();
        var SVG_NS = "http://www.w3.org/2000/svg";
        function forceReflow(element) {
          element.offsetHeight;
        }
        function disableTransitionTemporarily(element, callback) {
          var t = element.style.transition;
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
          var globalObj = forceCast(getGlobalObject());
          return globalObj.document;
        }
        function isBrowser() {
          return "document" in getGlobalObject();
        }
        function getCanvasContext(canvasElement) {
          return isBrowser() ? canvasElement.getContext("2d") : null;
        }
        var ICON_ID_TO_INNER_HTML_MAP = {
          check: '<path d="M2 8l4 4l8 -8"/>',
          dropdown: '<path d="M5 7h6l-3 3 z"/>',
          p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
        };
        function createSvgIconElement(document2, iconId) {
          var elem = document2.createElementNS(SVG_NS, "svg");
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
          return function(input) {
            return h2(h1(input));
          };
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
        var className$p = ClassName("lbl");
        function createLabelNode(doc, label) {
          var frag = doc.createDocumentFragment();
          var lineNodes = label.split("\n").map(function(line) {
            return doc.createTextNode(line);
          });
          lineNodes.forEach(function(lineNode, index) {
            if (index > 0) {
              frag.appendChild(doc.createElement("br"));
            }
            frag.appendChild(lineNode);
          });
          return frag;
        }
        var LabelView = function() {
          function LabelView2(doc, config) {
            var _this = this;
            this.element = doc.createElement("div");
            this.element.classList.add(className$p());
            config.viewProps.bindClassModifiers(this.element);
            var labelElem = doc.createElement("div");
            labelElem.classList.add(className$p("l"));
            bindValueMap(config.props, "label", function(value) {
              if (isEmpty(value)) {
                _this.element.classList.add(className$p(void 0, "nol"));
              } else {
                _this.element.classList.remove(className$p(void 0, "nol"));
                removeChildNodes(labelElem);
                labelElem.appendChild(createLabelNode(doc, value));
              }
            });
            this.element.appendChild(labelElem);
            this.labelElement = labelElem;
            var valueElem = doc.createElement("div");
            valueElem.classList.add(className$p("v"));
            this.element.appendChild(valueElem);
            this.valueElement = valueElem;
          }
          return LabelView2;
        }();
        var LabelController = function(_super) {
          __extends(LabelController2, _super);
          function LabelController2(doc, config) {
            var _this = this;
            var viewProps = config.valueController.viewProps;
            _this = _super.call(this, __assign(__assign({}, config), {view: new LabelView(doc, {
              props: config.props,
              viewProps
            }), viewProps})) || this;
            _this.props = config.props;
            _this.valueController = config.valueController;
            _this.view.valueElement.appendChild(_this.valueController.view.element);
            _this.viewProps.handleDispose(function() {
              var vc = _this.valueController;
              if (vc.onDispose) {
                console.warn("Controller.onDispose is deprecated. Use ViewProps.value('disposed').emitter instead.");
                vc.onDispose();
              }
              if (vc.view.onDispose) {
                console.warn("View.onDispose is deprecated. Use ViewProps.value('disposed').emitter instead.");
                vc.view.onDispose();
              }
            });
            return _this;
          }
          return LabelController2;
        }(BladeController);
        var InputBindingController = function(_super) {
          __extends(InputBindingController2, _super);
          function InputBindingController2(doc, config) {
            var _this = _super.call(this, doc, config) || this;
            _this.binding = config.binding;
            return _this;
          }
          return InputBindingController2;
        }(LabelController);
        var InputBinding = function() {
          function InputBinding2(config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.reader = config.reader;
            this.writer = config.writer;
            this.emitter = new Emitter();
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.target = config.target;
            this.read();
          }
          InputBinding2.prototype.read = function() {
            var targetValue = this.target.read();
            if (targetValue !== void 0) {
              this.value.rawValue = this.reader(targetValue);
            }
          };
          InputBinding2.prototype.write_ = function(rawValue) {
            this.writer(this.target, rawValue);
          };
          InputBinding2.prototype.onValueChange_ = function(ev) {
            this.write_(ev.rawValue);
            this.emitter.emit("change", {
              rawValue: ev.rawValue,
              sender: this
            });
          };
          return InputBinding2;
        }();
        function applyClass(elem, className2, active) {
          if (active) {
            elem.classList.add(className2);
          } else {
            elem.classList.remove(className2);
          }
        }
        function valueToClassName(elem, className2) {
          return function(value) {
            applyClass(elem, className2, value);
          };
        }
        function bindValueToTextContent(value, elem) {
          bindValue(value, function(text) {
            elem.textContent = text !== null && text !== void 0 ? text : "";
          });
        }
        var className$o = ClassName("");
        function valueToModifier(elem, modifier) {
          return valueToClassName(elem, className$o(void 0, modifier));
        }
        var ViewProps = function(_super) {
          __extends(ViewProps2, _super);
          function ViewProps2(valueMap) {
            return _super.call(this, valueMap) || this;
          }
          ViewProps2.create = function(opt_initialValue) {
            var _a, _b;
            var initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
            var coreObj = {
              disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
              disposed: false,
              hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false
            };
            var core = ValueMap.createCore(coreObj);
            return new ViewProps2(core);
          };
          ViewProps2.prototype.bindClassModifiers = function(elem) {
            bindValueMap(this, "disabled", valueToModifier(elem, "disabled"));
            bindValueMap(this, "hidden", valueToModifier(elem, "hidden"));
          };
          ViewProps2.prototype.bindDisabled = function(target) {
            bindValueMap(this, "disabled", function(disabled) {
              target.disabled = disabled;
            });
          };
          ViewProps2.prototype.bindTabIndex = function(elem) {
            bindValueMap(this, "disabled", function(disabled) {
              elem.tabIndex = disabled ? -1 : 0;
            });
          };
          ViewProps2.prototype.handleDispose = function(callback) {
            this.value("disposed").emitter.on("change", function(disposed) {
              if (disposed) {
                callback();
              }
            });
          };
          return ViewProps2;
        }(ValueMap);
        var CompositeConstraint = function() {
          function CompositeConstraint2(constraints) {
            this.constraints = constraints;
          }
          CompositeConstraint2.prototype.constrain = function(value) {
            return this.constraints.reduce(function(result, c) {
              return c.constrain(result);
            }, value);
          };
          return CompositeConstraint2;
        }();
        function findConstraint(c, constraintClass) {
          if (c instanceof constraintClass) {
            return c;
          }
          if (c instanceof CompositeConstraint) {
            var result = c.constraints.reduce(function(tmpResult, sc) {
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
        var ListConstraint = function() {
          function ListConstraint2(options) {
            this.options = options;
          }
          ListConstraint2.prototype.constrain = function(value) {
            var opts = this.options;
            if (opts.length === 0) {
              return value;
            }
            var matched = opts.filter(function(item) {
              return item.value === value;
            }).length > 0;
            return matched ? value : opts[0].value;
          };
          return ListConstraint2;
        }();
        var StepConstraint = function() {
          function StepConstraint2(step) {
            this.step = step;
          }
          StepConstraint2.prototype.constrain = function(value) {
            var r = value < 0 ? -Math.round(-value / this.step) : Math.round(value / this.step);
            return r * this.step;
          };
          return StepConstraint2;
        }();
        function mapRange(value, start1, end1, start2, end2) {
          var p = (value - start1) / (end1 - start1);
          return start2 + p * (end2 - start2);
        }
        function getDecimalDigits(value) {
          var text = String(value.toFixed(10));
          var frac = text.split(".")[1];
          return frac.replace(/0+$/, "").length;
        }
        function constrainRange(value, min, max) {
          return Math.min(Math.max(value, min), max);
        }
        function loopRange(value, max) {
          return (value % max + max) % max;
        }
        function normalizeListOptions(options) {
          if (Array.isArray(options)) {
            return options;
          }
          var items = [];
          Object.keys(options).forEach(function(text) {
            items.push({text, value: options[text]});
          });
          return items;
        }
        function createListConstraint(params) {
          if ("options" in params && params.options !== void 0) {
            return new ListConstraint(normalizeListOptions(forceCast(params.options)));
          }
          return null;
        }
        function findListItems(constraint) {
          var c = constraint ? findConstraint(constraint, ListConstraint) : null;
          if (!c) {
            return null;
          }
          return c.options;
        }
        function findStep(constraint) {
          var c = constraint ? findConstraint(constraint, StepConstraint) : null;
          if (!c) {
            return null;
          }
          return c.step;
        }
        function getSuitableDecimalDigits(constraint, rawValue) {
          var sc = constraint && findConstraint(constraint, StepConstraint);
          if (sc) {
            return getDecimalDigits(sc.step);
          }
          return Math.max(getDecimalDigits(rawValue), 2);
        }
        function getBaseStep(constraint) {
          var step = findStep(constraint);
          return step !== null && step !== void 0 ? step : 1;
        }
        function getSuitableDraggingScale(constraint, rawValue) {
          var _a;
          var sc = constraint && findConstraint(constraint, StepConstraint);
          var base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
          return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
        }
        function polyfillViewProps(controller, pluginId) {
          if (!controller.viewProps) {
            controller.viewProps = ViewProps.create();
            console.warn("Missing controller.viewProps (plugin: '" + pluginId + "')\nThis polyfill will be removed in the next major version.");
          }
        }
        function createInputBindingController(plugin, args) {
          var initialValue = plugin.accept(args.target.read(), args.params);
          if (initialValue === null) {
            return null;
          }
          var valueArgs = {
            target: args.target,
            initialValue,
            params: args.params
          };
          var reader = plugin.binding.reader(valueArgs);
          var constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : void 0;
          var value = createValue(reader(initialValue), {
            constraint,
            equals: plugin.binding.equals
          });
          var binding = new InputBinding({
            reader,
            target: args.target,
            value,
            writer: plugin.binding.writer(valueArgs)
          });
          var controller = plugin.controller({
            constraint,
            document: args.document,
            initialValue,
            params: args.params,
            value: binding.value,
            viewProps: ViewProps.create({
              disabled: args.params.disabled,
              hidden: args.params.hidden
            })
          });
          polyfillViewProps(controller, plugin.id);
          return new InputBindingController(args.document, {
            binding,
            blade: createBlade$1(),
            props: ValueMap.fromObject({
              label: args.params.label || args.target.key
            }),
            valueController: controller
          });
        }
        var MonitorBindingController = function(_super) {
          __extends(MonitorBindingController2, _super);
          function MonitorBindingController2(doc, config) {
            var _this = _super.call(this, doc, config) || this;
            _this.binding = config.binding;
            _this.viewProps.bindDisabled(_this.binding.ticker);
            _this.viewProps.handleDispose(function() {
              _this.binding.dispose();
            });
            return _this;
          }
          return MonitorBindingController2;
        }(LabelController);
        function fillBuffer(buffer, bufferSize) {
          while (buffer.length < bufferSize) {
            buffer.push(void 0);
          }
        }
        function initializeBuffer(bufferSize) {
          var buffer = [];
          fillBuffer(buffer, bufferSize);
          return createValue(buffer);
        }
        function createTrimmedBuffer(buffer) {
          var index = buffer.indexOf(void 0);
          return forceCast(index < 0 ? buffer : buffer.slice(0, index));
        }
        function createPushedBuffer(buffer, newValue) {
          var newBuffer = __spreadArrays(createTrimmedBuffer(buffer), [newValue]);
          if (newBuffer.length > buffer.length) {
            newBuffer.splice(0, newBuffer.length - buffer.length);
          } else {
            fillBuffer(newBuffer, buffer.length);
          }
          return newBuffer;
        }
        var MonitorBinding = function() {
          function MonitorBinding2(config) {
            this.onTick_ = this.onTick_.bind(this);
            this.reader_ = config.reader;
            this.target = config.target;
            this.emitter = new Emitter();
            this.value = config.value;
            this.ticker = config.ticker;
            this.ticker.emitter.on("tick", this.onTick_);
            this.read();
          }
          MonitorBinding2.prototype.dispose = function() {
            this.ticker.dispose();
          };
          MonitorBinding2.prototype.read = function() {
            var targetValue = this.target.read();
            if (targetValue === void 0) {
              return;
            }
            var buffer = this.value.rawValue;
            var newValue = this.reader_(targetValue);
            this.value.rawValue = createPushedBuffer(buffer, newValue);
            this.emitter.emit("update", {
              rawValue: newValue,
              sender: this
            });
          };
          MonitorBinding2.prototype.onTick_ = function(_) {
            this.read();
          };
          return MonitorBinding2;
        }();
        var IntervalTicker = function() {
          function IntervalTicker2(doc, interval) {
            this.disabled_ = false;
            this.timerId_ = null;
            this.onTick_ = this.onTick_.bind(this);
            this.doc_ = doc;
            this.emitter = new Emitter();
            this.interval_ = interval;
            this.setTimer_();
          }
          Object.defineProperty(IntervalTicker2.prototype, "disabled", {
            get: function() {
              return this.disabled_;
            },
            set: function(inactive) {
              this.disabled_ = inactive;
              if (this.disabled_) {
                this.clearTimer_();
              } else {
                this.setTimer_();
              }
            },
            enumerable: false,
            configurable: true
          });
          IntervalTicker2.prototype.dispose = function() {
            this.clearTimer_();
          };
          IntervalTicker2.prototype.clearTimer_ = function() {
            if (this.timerId_ === null) {
              return;
            }
            var win = this.doc_.defaultView;
            if (win) {
              win.clearInterval(this.timerId_);
            }
            this.timerId_ = null;
          };
          IntervalTicker2.prototype.setTimer_ = function() {
            this.clearTimer_();
            if (this.interval_ <= 0) {
              return;
            }
            var win = this.doc_.defaultView;
            if (win) {
              this.timerId_ = win.setInterval(this.onTick_, this.interval_);
            }
          };
          IntervalTicker2.prototype.onTick_ = function() {
            if (this.disabled_) {
              return;
            }
            this.emitter.emit("tick", {
              sender: this
            });
          };
          return IntervalTicker2;
        }();
        var ManualTicker = function() {
          function ManualTicker2() {
            this.disabled = false;
            this.emitter = new Emitter();
          }
          ManualTicker2.prototype.dispose = function() {
          };
          ManualTicker2.prototype.tick = function() {
            if (this.disabled) {
              return;
            }
            this.emitter.emit("tick", {
              sender: this
            });
          };
          return ManualTicker2;
        }();
        var Constants = {
          monitor: {
            defaultInterval: 200,
            defaultLineCount: 3
          }
        };
        function createTicker(document2, interval) {
          return interval === 0 ? new ManualTicker() : new IntervalTicker(document2, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
        }
        function createMonitorBindingController(plugin, args) {
          var _a, _b;
          var initialValue = plugin.accept(args.target.read(), args.params);
          if (initialValue === null) {
            return null;
          }
          var valueArgs = {
            target: args.target,
            initialValue,
            params: args.params
          };
          var reader = plugin.binding.reader(valueArgs);
          var bufferSize = (_b = (_a = args.params.bufferSize) !== null && _a !== void 0 ? _a : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(args.params)) !== null && _b !== void 0 ? _b : 1;
          var binding = new MonitorBinding({
            reader,
            target: args.target,
            ticker: createTicker(args.document, args.params.interval),
            value: initializeBuffer(bufferSize)
          });
          var controller = plugin.controller({
            document: args.document,
            params: args.params,
            value: binding.value,
            viewProps: ViewProps.create({
              disabled: args.params.disabled,
              hidden: args.params.hidden
            })
          });
          polyfillViewProps(controller, plugin.id);
          return new MonitorBindingController(args.document, {
            binding,
            blade: createBlade$1(),
            props: ValueMap.fromObject({
              label: args.params.label || args.target.key
            }),
            valueController: controller
          });
        }
        var BladeApi = function() {
          function BladeApi2(controller) {
            this.controller_ = controller;
          }
          Object.defineProperty(BladeApi2.prototype, "disabled", {
            get: function() {
              return this.controller_.viewProps.get("disabled");
            },
            set: function(disabled) {
              this.controller_.viewProps.set("disabled", disabled);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(BladeApi2.prototype, "hidden", {
            get: function() {
              return this.controller_.viewProps.get("hidden");
            },
            set: function(hidden) {
              this.controller_.viewProps.set("hidden", hidden);
            },
            enumerable: false,
            configurable: true
          });
          BladeApi2.prototype.dispose = function() {
            this.controller_.viewProps.set("disposed", true);
          };
          return BladeApi2;
        }();
        var TpEvent = function() {
          function TpEvent2(target) {
            this.target = target;
          }
          return TpEvent2;
        }();
        var TpChangeEvent = function(_super) {
          __extends(TpChangeEvent2, _super);
          function TpChangeEvent2(target, value, presetKey) {
            var _this = _super.call(this, target) || this;
            _this.value = value;
            _this.presetKey = presetKey;
            return _this;
          }
          return TpChangeEvent2;
        }(TpEvent);
        var TpUpdateEvent = function(_super) {
          __extends(TpUpdateEvent2, _super);
          function TpUpdateEvent2(target, value, presetKey) {
            var _this = _super.call(this, target) || this;
            _this.value = value;
            _this.presetKey = presetKey;
            return _this;
          }
          return TpUpdateEvent2;
        }(TpEvent);
        var TpFoldEvent = function(_super) {
          __extends(TpFoldEvent2, _super);
          function TpFoldEvent2(target, expanded) {
            var _this = _super.call(this, target) || this;
            _this.expanded = expanded;
            return _this;
          }
          return TpFoldEvent2;
        }(TpEvent);
        var InputBindingApi = function(_super) {
          __extends(InputBindingApi2, _super);
          function InputBindingApi2(controller) {
            var _this = _super.call(this, controller) || this;
            _this.onBindingChange_ = _this.onBindingChange_.bind(_this);
            _this.emitter_ = new Emitter();
            _this.controller_.binding.emitter.on("change", _this.onBindingChange_);
            return _this;
          }
          InputBindingApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          InputBindingApi2.prototype.refresh = function() {
            this.controller_.binding.read();
          };
          InputBindingApi2.prototype.onBindingChange_ = function(ev) {
            var value = ev.sender.target.read();
            this.emitter_.emit("change", {
              event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
            });
          };
          return InputBindingApi2;
        }(BladeApi);
        var MonitorBindingApi = function(_super) {
          __extends(MonitorBindingApi2, _super);
          function MonitorBindingApi2(controller) {
            var _this = _super.call(this, controller) || this;
            _this.onBindingUpdate_ = _this.onBindingUpdate_.bind(_this);
            _this.emitter_ = new Emitter();
            _this.controller_.binding.emitter.on("update", _this.onBindingUpdate_);
            return _this;
          }
          MonitorBindingApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          MonitorBindingApi2.prototype.refresh = function() {
            this.controller_.binding.read();
          };
          MonitorBindingApi2.prototype.onBindingUpdate_ = function(ev) {
            var value = ev.sender.target.read();
            this.emitter_.emit("update", {
              event: new TpUpdateEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
            });
          };
          return MonitorBindingApi2;
        }(BladeApi);
        function parseObject(value, keyToParserMap) {
          var keys = Object.keys(keyToParserMap);
          var result = keys.reduce(function(tmp, key) {
            var _a;
            if (tmp === void 0) {
              return void 0;
            }
            var parser = keyToParserMap[key];
            var result2 = parser(value[key]);
            return result2.succeeded ? __assign(__assign({}, tmp), (_a = {}, _a[key] = result2.value, _a)) : void 0;
          }, {});
          return forceCast(result);
        }
        function parseArray(value, parseItem) {
          return value.reduce(function(tmp, item) {
            if (tmp === void 0) {
              return void 0;
            }
            var result = parseItem(item);
            if (!result.succeeded || result.value === void 0) {
              return void 0;
            }
            return __spreadArrays(tmp, [result.value]);
          }, []);
        }
        function isObject(value) {
          if (value === null) {
            return false;
          }
          return typeof value === "object";
        }
        function createParamsParserBuilder(parse) {
          return function(optional) {
            return function(v) {
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
              var result = parse(v);
              return result !== void 0 ? {
                succeeded: true,
                value: result
              } : {
                succeeded: false,
                value: void 0
              };
            };
          };
        }
        function createParamsParserBuilders(optional) {
          return {
            custom: function(parse) {
              return createParamsParserBuilder(parse)(optional);
            },
            boolean: createParamsParserBuilder(function(v) {
              return typeof v === "boolean" ? v : void 0;
            })(optional),
            number: createParamsParserBuilder(function(v) {
              return typeof v === "number" ? v : void 0;
            })(optional),
            string: createParamsParserBuilder(function(v) {
              return typeof v === "string" ? v : void 0;
            })(optional),
            function: createParamsParserBuilder(function(v) {
              return typeof v === "function" ? v : void 0;
            })(optional),
            constant: function(value) {
              return createParamsParserBuilder(function(v) {
                return v === value ? value : void 0;
              })(optional);
            },
            raw: createParamsParserBuilder(function(v) {
              return v;
            })(optional),
            object: function(keyToParserMap) {
              return createParamsParserBuilder(function(v) {
                if (!isObject(v)) {
                  return void 0;
                }
                return parseObject(v, keyToParserMap);
              })(optional);
            },
            array: function(itemParser) {
              return createParamsParserBuilder(function(v) {
                if (!Array.isArray(v)) {
                  return void 0;
                }
                return parseArray(v, itemParser);
              })(optional);
            }
          };
        }
        var ParamsParsers = {
          optional: createParamsParserBuilders(true),
          required: createParamsParserBuilders(false)
        };
        function parseParams(value, keyToParserMap) {
          var result = ParamsParsers.required.object(keyToParserMap)(value);
          return result.succeeded ? result.value : void 0;
        }
        function createBladeController(plugin, args) {
          var ac = plugin.accept(args.params);
          if (!ac) {
            return null;
          }
          var disabled = ParamsParsers.optional.boolean(args.params["disabled"]).value;
          var hidden = ParamsParsers.optional.boolean(args.params["hidden"]).value;
          return plugin.controller({
            blade: createBlade$1(),
            document: args.document,
            params: forceCast(__assign(__assign({}, ac.params), {disabled, hidden})),
            viewProps: ViewProps.create({
              disabled,
              hidden
            })
          });
        }
        function addButtonAsBlade(api, params) {
          return api.addBlade_v3_(__assign(__assign({}, params), {view: "button"}));
        }
        function addFolderAsBlade(api, params) {
          return api.addBlade_v3_(__assign(__assign({}, params), {view: "folder"}));
        }
        function addSeparatorAsBlade(api, opt_params) {
          var params = opt_params || {};
          return api.addBlade_v3_(__assign(__assign({}, params), {view: "separator"}));
        }
        function addTabAsBlade(api, params) {
          return api.addBlade_v3_(__assign(__assign({}, params), {view: "tab"}));
        }
        var RackLikeApi = function(_super) {
          __extends(RackLikeApi2, _super);
          function RackLikeApi2(controller, rackApi) {
            var _this = _super.call(this, controller) || this;
            _this.rackApi_ = rackApi;
            return _this;
          }
          return RackLikeApi2;
        }(BladeApi);
        var BindingTarget = function() {
          function BindingTarget2(obj, key, opt_id) {
            this.obj_ = obj;
            this.key_ = key;
            this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
          }
          BindingTarget2.isBindable = function(obj) {
            if (obj === null) {
              return false;
            }
            if (typeof obj !== "object") {
              return false;
            }
            return true;
          };
          Object.defineProperty(BindingTarget2.prototype, "key", {
            get: function() {
              return this.key_;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(BindingTarget2.prototype, "presetKey", {
            get: function() {
              return this.presetKey_;
            },
            enumerable: false,
            configurable: true
          });
          BindingTarget2.prototype.read = function() {
            return this.obj_[this.key_];
          };
          BindingTarget2.prototype.write = function(value) {
            this.obj_[this.key_] = value;
          };
          BindingTarget2.prototype.writeProperty = function(name, value) {
            var valueObj = this.read();
            if (!BindingTarget2.isBindable(valueObj)) {
              throw TpError.notBindable();
            }
            if (!(name in valueObj)) {
              throw TpError.propertyNotFound(name);
            }
            valueObj[name] = value;
          };
          return BindingTarget2;
        }();
        function createBindingTarget(obj, key, opt_id) {
          if (!BindingTarget.isBindable(obj)) {
            throw TpError.notBindable();
          }
          return new BindingTarget(obj, key, opt_id);
        }
        function registerPlugin(r) {
          if (r.type === "blade") {
            Plugins.blades.unshift(r.plugin);
          } else if (r.type === "input") {
            Plugins.inputs.unshift(r.plugin);
          } else if (r.type === "monitor") {
            Plugins.monitors.unshift(r.plugin);
          }
        }
        var NestedOrderedSet = function() {
          function NestedOrderedSet2(extract) {
            this.emitter = new Emitter();
            this.items_ = [];
            this.cache_ = new Set();
            this.onSubListAdd_ = this.onSubListAdd_.bind(this);
            this.onSubListRemove_ = this.onSubListRemove_.bind(this);
            this.extract_ = extract;
          }
          Object.defineProperty(NestedOrderedSet2.prototype, "items", {
            get: function() {
              return this.items_;
            },
            enumerable: false,
            configurable: true
          });
          NestedOrderedSet2.prototype.allItems = function() {
            return Array.from(this.cache_);
          };
          NestedOrderedSet2.prototype.find = function(callback) {
            for (var _i = 0, _a = this.allItems(); _i < _a.length; _i++) {
              var item = _a[_i];
              if (callback(item)) {
                return item;
              }
            }
            return null;
          };
          NestedOrderedSet2.prototype.includes = function(item) {
            return this.cache_.has(item);
          };
          NestedOrderedSet2.prototype.add = function(item, opt_index) {
            var _this = this;
            if (this.includes(item)) {
              throw TpError.shouldNeverHappen();
            }
            var index = opt_index !== void 0 ? opt_index : this.items_.length;
            this.items_.splice(index, 0, item);
            this.cache_.add(item);
            var subList = this.extract_(item);
            if (subList) {
              subList.emitter.on("add", this.onSubListAdd_);
              subList.emitter.on("remove", this.onSubListRemove_);
              subList.allItems().forEach(function(item2) {
                _this.cache_.add(item2);
              });
            }
            this.emitter.emit("add", {
              index,
              item,
              root: this,
              target: this
            });
          };
          NestedOrderedSet2.prototype.remove = function(item) {
            var index = this.items_.indexOf(item);
            if (index < 0) {
              return;
            }
            this.items_.splice(index, 1);
            this.cache_.delete(item);
            var subList = this.extract_(item);
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
          };
          NestedOrderedSet2.prototype.onSubListAdd_ = function(ev) {
            this.cache_.add(ev.item);
            this.emitter.emit("add", {
              index: ev.index,
              item: ev.item,
              root: this,
              target: ev.target
            });
          };
          NestedOrderedSet2.prototype.onSubListRemove_ = function(ev) {
            this.cache_.delete(ev.item);
            this.emitter.emit("remove", {
              index: ev.index,
              item: ev.item,
              root: this,
              target: ev.target
            });
          };
          return NestedOrderedSet2;
        }();
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
          var api = apiSet.find(function(api2) {
            return api2.controller_ === controller;
          });
          if (!api) {
            throw TpError.shouldNeverHappen();
          }
          return api;
        }
        var RackApi = function(_super) {
          __extends(RackApi2, _super);
          function RackApi2(controller) {
            var _this = _super.call(this, controller) || this;
            _this.onRackAdd_ = _this.onRackAdd_.bind(_this);
            _this.onRackRemove_ = _this.onRackRemove_.bind(_this);
            _this.onRackInputChange_ = _this.onRackInputChange_.bind(_this);
            _this.onRackMonitorUpdate_ = _this.onRackMonitorUpdate_.bind(_this);
            _this.emitter_ = new Emitter();
            _this.apiSet_ = new NestedOrderedSet(findSubBladeApiSet);
            var rack = _this.controller_.rack;
            rack.emitter.on("add", _this.onRackAdd_);
            rack.emitter.on("remove", _this.onRackRemove_);
            rack.emitter.on("inputchange", _this.onRackInputChange_);
            rack.emitter.on("monitorupdate", _this.onRackMonitorUpdate_);
            rack.children.forEach(function(bc) {
              _this.setUpApi_(bc);
            });
            return _this;
          }
          Object.defineProperty(RackApi2.prototype, "children", {
            get: function() {
              var _this = this;
              return this.controller_.rack.children.map(function(bc) {
                return getApiByController(_this.apiSet_, bc);
              });
            },
            enumerable: false,
            configurable: true
          });
          RackApi2.prototype.addInput = function(object, key, opt_params) {
            var params = opt_params || {};
            var doc = this.controller_.view.element.ownerDocument;
            var bc = createInput(doc, createBindingTarget(object, key, params.presetKey), params);
            var api = new InputBindingApi(bc);
            return this.add(api, params.index);
          };
          RackApi2.prototype.addMonitor = function(object, key, opt_params) {
            var params = opt_params || {};
            var doc = this.controller_.view.element.ownerDocument;
            var bc = createMonitor(doc, createBindingTarget(object, key), params);
            var api = new MonitorBindingApi(bc);
            return forceCast(this.add(api, params.index));
          };
          RackApi2.prototype.addFolder = function(params) {
            return addFolderAsBlade(this, params);
          };
          RackApi2.prototype.addButton = function(params) {
            return addButtonAsBlade(this, params);
          };
          RackApi2.prototype.addSeparator = function(opt_params) {
            return addSeparatorAsBlade(this, opt_params);
          };
          RackApi2.prototype.addTab = function(params) {
            return addTabAsBlade(this, params);
          };
          RackApi2.prototype.add = function(api, opt_index) {
            this.controller_.rack.add(api.controller_, opt_index);
            var gapi = this.apiSet_.find(function(a) {
              return a.controller_ === api.controller_;
            });
            if (gapi) {
              this.apiSet_.remove(gapi);
            }
            this.apiSet_.add(api);
            return api;
          };
          RackApi2.prototype.remove = function(api) {
            this.controller_.rack.remove(api.controller_);
          };
          RackApi2.prototype.addBlade_v3_ = function(opt_params) {
            var params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
            var doc = this.controller_.view.element.ownerDocument;
            var bc = createBlade(doc, params);
            var api = createBladeApi(bc);
            return this.add(api, params.index);
          };
          RackApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          RackApi2.prototype.setUpApi_ = function(bc) {
            var api = this.apiSet_.find(function(api2) {
              return api2.controller_ === bc;
            });
            if (!api) {
              this.apiSet_.add(createBladeApi(bc));
            }
          };
          RackApi2.prototype.onRackAdd_ = function(ev) {
            this.setUpApi_(ev.bladeController);
          };
          RackApi2.prototype.onRackRemove_ = function(ev) {
            if (ev.isRoot) {
              var api = getApiByController(this.apiSet_, ev.bladeController);
              this.apiSet_.remove(api);
            }
          };
          RackApi2.prototype.onRackInputChange_ = function(ev) {
            var api = getApiByController(this.apiSet_, ev.bindingController);
            var binding = ev.bindingController.binding;
            this.emitter_.emit("change", {
              event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
            });
          };
          RackApi2.prototype.onRackMonitorUpdate_ = function(ev) {
            var api = getApiByController(this.apiSet_, ev.bindingController);
            var binding = ev.bindingController.binding;
            this.emitter_.emit("update", {
              event: new TpUpdateEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
            });
          };
          return RackApi2;
        }(BladeApi);
        var PlainView = function() {
          function PlainView2(doc, config) {
            var className2 = ClassName(config.viewName);
            this.element = doc.createElement("div");
            this.element.classList.add(className2());
            config.viewProps.bindClassModifiers(this.element);
          }
          return PlainView2;
        }();
        var RackLikeController = function(_super) {
          __extends(RackLikeController2, _super);
          function RackLikeController2(config) {
            var _this = _super.call(this, {
              blade: config.blade,
              view: config.view,
              viewProps: config.rackController.viewProps
            }) || this;
            _this.rackController = config.rackController;
            return _this;
          }
          return RackLikeController2;
        }(BladeController);
        function findInputBindingController(bcs, b) {
          for (var i = 0; i < bcs.length; i++) {
            var bc = bcs[i];
            if (bc instanceof InputBindingController && bc.binding === b) {
              return bc;
            }
          }
          return null;
        }
        function findMonitorBindingController(bcs, b) {
          for (var i = 0; i < bcs.length; i++) {
            var bc = bcs[i];
            if (bc instanceof MonitorBindingController && bc.binding === b) {
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
          var rack = findSubRack(bc);
          return rack ? rack["bcSet_"] : null;
        }
        var BladeRack = function() {
          function BladeRack2(blade) {
            var _a;
            this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
            this.onSetAdd_ = this.onSetAdd_.bind(this);
            this.onSetRemove_ = this.onSetRemove_.bind(this);
            this.onChildDispose_ = this.onChildDispose_.bind(this);
            this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
            this.onChildInputChange_ = this.onChildInputChange_.bind(this);
            this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
            this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
            this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
            this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
            this.onDescendaantMonitorUpdate_ = this.onDescendaantMonitorUpdate_.bind(this);
            this.emitter = new Emitter();
            this.blade_ = blade !== null && blade !== void 0 ? blade : null;
            (_a = this.blade_) === null || _a === void 0 ? void 0 : _a.value("positions").emitter.on("change", this.onBladePositionsChange_);
            this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
            this.bcSet_.emitter.on("add", this.onSetAdd_);
            this.bcSet_.emitter.on("remove", this.onSetRemove_);
          }
          Object.defineProperty(BladeRack2.prototype, "children", {
            get: function() {
              return this.bcSet_.items;
            },
            enumerable: false,
            configurable: true
          });
          BladeRack2.prototype.add = function(bc, opt_index) {
            if (bc.parent) {
              bc.parent.remove(bc);
            }
            bc["parent_"] = this;
            this.bcSet_.add(bc, opt_index);
          };
          BladeRack2.prototype.remove = function(bc) {
            bc["parent_"] = null;
            this.bcSet_.remove(bc);
          };
          BladeRack2.prototype.find = function(controllerClass) {
            return forceCast(this.bcSet_.allItems().filter(function(bc) {
              return bc instanceof controllerClass;
            }));
          };
          BladeRack2.prototype.onSetAdd_ = function(ev) {
            this.updatePositions_();
            var isRoot = ev.target === ev.root;
            this.emitter.emit("add", {
              bladeController: ev.item,
              index: ev.index,
              isRoot,
              sender: this
            });
            if (!isRoot) {
              return;
            }
            var bc = ev.item;
            bc.viewProps.emitter.on("change", this.onChildViewPropsChange_);
            bc.blade.value("positions").emitter.on("change", this.onChildPositionsChange_);
            bc.viewProps.handleDispose(this.onChildDispose_);
            if (bc instanceof InputBindingController) {
              bc.binding.emitter.on("change", this.onChildInputChange_);
            } else if (bc instanceof MonitorBindingController) {
              bc.binding.emitter.on("update", this.onChildMonitorUpdate_);
            } else {
              var rack = findSubRack(bc);
              if (rack) {
                var emitter = rack.emitter;
                emitter.on("layout", this.onDescendantLayout_);
                emitter.on("inputchange", this.onDescendantInputChange_);
                emitter.on("monitorupdate", this.onDescendaantMonitorUpdate_);
              }
            }
          };
          BladeRack2.prototype.onSetRemove_ = function(ev) {
            this.updatePositions_();
            var isRoot = ev.target === ev.root;
            this.emitter.emit("remove", {
              bladeController: ev.item,
              isRoot,
              sender: this
            });
            if (!isRoot) {
              return;
            }
            var bc = ev.item;
            if (bc instanceof InputBindingController) {
              bc.binding.emitter.off("change", this.onChildInputChange_);
            } else if (bc instanceof MonitorBindingController) {
              bc.binding.emitter.off("update", this.onChildMonitorUpdate_);
            } else {
              var rack = findSubRack(bc);
              if (rack) {
                var emitter = rack.emitter;
                emitter.off("layout", this.onDescendantLayout_);
                emitter.off("inputchange", this.onDescendantInputChange_);
                emitter.off("monitorupdate", this.onDescendaantMonitorUpdate_);
              }
            }
          };
          BladeRack2.prototype.updatePositions_ = function() {
            var _this = this;
            var visibleItems = this.bcSet_.items.filter(function(bc) {
              return !bc.viewProps.get("hidden");
            });
            var firstVisibleItem = visibleItems[0];
            var lastVisibleItem = visibleItems[visibleItems.length - 1];
            this.bcSet_.items.forEach(function(bc) {
              var ps = [];
              if (bc === firstVisibleItem) {
                ps.push("first");
                if (!_this.blade_ || _this.blade_.get("positions").includes("veryfirst")) {
                  ps.push("veryfirst");
                }
              }
              if (bc === lastVisibleItem) {
                ps.push("last");
                if (!_this.blade_ || _this.blade_.get("positions").includes("verylast")) {
                  ps.push("verylast");
                }
              }
              bc.blade.set("positions", ps);
            });
          };
          BladeRack2.prototype.onChildPositionsChange_ = function() {
            this.updatePositions_();
            this.emitter.emit("layout", {
              sender: this
            });
          };
          BladeRack2.prototype.onChildViewPropsChange_ = function(_ev) {
            this.updatePositions_();
            this.emitter.emit("layout", {
              sender: this
            });
          };
          BladeRack2.prototype.onChildDispose_ = function() {
            var _this = this;
            var disposedUcs = this.bcSet_.items.filter(function(bc) {
              return bc.viewProps.get("disposed");
            });
            disposedUcs.forEach(function(bc) {
              _this.bcSet_.remove(bc);
            });
          };
          BladeRack2.prototype.onChildInputChange_ = function(ev) {
            var ibc = findInputBindingController(this.find(InputBindingController), ev.sender);
            if (!ibc) {
              throw TpError.shouldNeverHappen();
            }
            this.emitter.emit("inputchange", {
              bindingController: ibc,
              sender: this
            });
          };
          BladeRack2.prototype.onChildMonitorUpdate_ = function(ev) {
            var mbc = findMonitorBindingController(this.find(MonitorBindingController), ev.sender);
            if (!mbc) {
              throw TpError.shouldNeverHappen();
            }
            this.emitter.emit("monitorupdate", {
              bindingController: mbc,
              sender: this
            });
          };
          BladeRack2.prototype.onDescendantLayout_ = function(_) {
            this.updatePositions_();
            this.emitter.emit("layout", {
              sender: this
            });
          };
          BladeRack2.prototype.onDescendantInputChange_ = function(ev) {
            this.emitter.emit("inputchange", {
              bindingController: ev.bindingController,
              sender: this
            });
          };
          BladeRack2.prototype.onDescendaantMonitorUpdate_ = function(ev) {
            this.emitter.emit("monitorupdate", {
              bindingController: ev.bindingController,
              sender: this
            });
          };
          BladeRack2.prototype.onBladePositionsChange_ = function() {
            this.updatePositions_();
          };
          return BladeRack2;
        }();
        var RackController = function(_super) {
          __extends(RackController2, _super);
          function RackController2(doc, config) {
            var _this = _super.call(this, __assign(__assign({}, config), {view: new PlainView(doc, {
              viewName: "brk",
              viewProps: config.viewProps
            })})) || this;
            _this.onRackAdd_ = _this.onRackAdd_.bind(_this);
            _this.onRackRemove_ = _this.onRackRemove_.bind(_this);
            var rack = new BladeRack(config.root ? void 0 : config.blade);
            rack.emitter.on("add", _this.onRackAdd_);
            rack.emitter.on("remove", _this.onRackRemove_);
            _this.rack = rack;
            _this.viewProps.handleDispose(function() {
              for (var i = _this.rack.children.length - 1; i >= 0; i--) {
                var bc = _this.rack.children[i];
                bc.viewProps.set("disposed", true);
              }
            });
            return _this;
          }
          RackController2.prototype.onRackAdd_ = function(ev) {
            if (!ev.isRoot) {
              return;
            }
            insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
          };
          RackController2.prototype.onRackRemove_ = function(ev) {
            if (!ev.isRoot) {
              return;
            }
            removeElement(ev.bladeController.view.element);
          };
          return RackController2;
        }(BladeController);
        var Plugins = {
          blades: [],
          inputs: [],
          monitors: []
        };
        function getAllPlugins() {
          return __spreadArrays(Plugins.blades, Plugins.inputs, Plugins.monitors);
        }
        function createInput(document2, target, params) {
          var initialValue = target.read();
          if (isEmpty(initialValue)) {
            throw new TpError({
              context: {
                key: target.key
              },
              type: "nomatchingcontroller"
            });
          }
          var bc = Plugins.inputs.reduce(function(result, plugin) {
            return result || createInputBindingController(plugin, {
              document: document2,
              target,
              params
            });
          }, null);
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
        function createMonitor(document2, target, params) {
          var bc = Plugins.monitors.reduce(function(result, plugin) {
            return result || createMonitorBindingController(plugin, {
              document: document2,
              params,
              target
            });
          }, null);
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
        function createBlade(document2, params) {
          var bc = Plugins.blades.reduce(function(result, plugin) {
            return result || createBladeController(plugin, {
              document: document2,
              params
            });
          }, null);
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
        function createBladeApi(bc) {
          if (bc instanceof InputBindingController) {
            return new InputBindingApi(bc);
          }
          if (bc instanceof MonitorBindingController) {
            return new MonitorBindingApi(bc);
          }
          if (bc instanceof RackController) {
            return new RackApi(bc);
          }
          var api = Plugins.blades.reduce(function(result, plugin) {
            return result || plugin.api(bc);
          }, null);
          if (!api) {
            throw TpError.shouldNeverHappen();
          }
          return api;
        }
        var className$n = ClassName("lst");
        var ListView = function() {
          function ListView2(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.props_ = config.props;
            this.element = doc.createElement("div");
            this.element.classList.add(className$n());
            config.viewProps.bindClassModifiers(this.element);
            var selectElem = doc.createElement("select");
            selectElem.classList.add(className$n("s"));
            bindValueMap(this.props_, "options", function(opts) {
              removeChildElements(selectElem);
              opts.forEach(function(item, index) {
                var optionElem = doc.createElement("option");
                optionElem.dataset.index = String(index);
                optionElem.textContent = item.text;
                optionElem.value = String(item.value);
                selectElem.appendChild(optionElem);
              });
            });
            config.viewProps.bindDisabled(selectElem);
            this.element.appendChild(selectElem);
            this.selectElement = selectElem;
            var markElem = doc.createElement("div");
            markElem.classList.add(className$n("m"));
            markElem.appendChild(createSvgIconElement(doc, "dropdown"));
            this.element.appendChild(markElem);
            config.value.emitter.on("change", this.onValueChange_);
            this.value_ = config.value;
            this.update_();
          }
          ListView2.prototype.update_ = function() {
            this.selectElement.value = String(this.value_.rawValue);
          };
          ListView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          return ListView2;
        }();
        var ListController = function() {
          function ListController2(doc, config) {
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
          ListController2.prototype.onSelectChange_ = function(e) {
            var selectElem = forceCast(e.currentTarget);
            var optElem = selectElem.selectedOptions.item(0);
            if (!optElem) {
              return;
            }
            var itemIndex = Number(optElem.dataset.index);
            this.value.rawValue = this.props.get("options")[itemIndex].value;
          };
          return ListController2;
        }();
        var ListApi = function(_super) {
          __extends(ListApi2, _super);
          function ListApi2(controller) {
            var _this = _super.call(this, controller) || this;
            _this.emitter_ = new Emitter();
            _this.controller_.valueController.value.emitter.on("change", function(ev) {
              _this.emitter_.emit("change", {
                event: new TpChangeEvent(_this, ev.rawValue)
              });
            });
            return _this;
          }
          Object.defineProperty(ListApi2.prototype, "label", {
            get: function() {
              return this.controller_.props.get("label");
            },
            set: function(label) {
              this.controller_.props.set("label", label);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(ListApi2.prototype, "options", {
            get: function() {
              return this.controller_.valueController.props.get("options");
            },
            set: function(options) {
              this.controller_.valueController.props.set("options", options);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(ListApi2.prototype, "value", {
            get: function() {
              return this.controller_.valueController.value.rawValue;
            },
            set: function(value) {
              this.controller_.valueController.value.rawValue = value;
            },
            enumerable: false,
            configurable: true
          });
          ListApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          return ListApi2;
        }(BladeApi);
        function parseOptions(value) {
          var p = ParamsParsers;
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
        var ListBladePlugin = function() {
          return {
            id: "list",
            accept: function(params) {
              var p = ParamsParsers;
              var result = parseParams(params, {
                options: p.required.custom(parseOptions),
                value: p.required.raw,
                view: p.required.constant("list"),
                label: p.optional.string
              });
              return result ? {params: result} : null;
            },
            controller: function(args) {
              var ic = new ListController(args.document, {
                props: ValueMap.fromObject({
                  options: normalizeListOptions(args.params.options)
                }),
                value: createValue(args.params.value),
                viewProps: args.viewProps
              });
              return new LabelController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                  label: args.params.label
                }),
                valueController: ic
              });
            },
            api: function(controller) {
              if (!(controller instanceof LabelController)) {
                return null;
              }
              if (!(controller.valueController instanceof ListController)) {
                return null;
              }
              return new ListApi(controller);
            }
          };
        }();
        var ButtonApi = function(_super) {
          __extends(ButtonApi2, _super);
          function ButtonApi2() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          Object.defineProperty(ButtonApi2.prototype, "disabled", {
            get: function() {
              return this.controller_.viewProps.get("disabled");
            },
            set: function(disabled) {
              this.controller_.viewProps.set("disabled", disabled);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(ButtonApi2.prototype, "hidden", {
            get: function() {
              return this.controller_.viewProps.get("hidden");
            },
            set: function(hidden) {
              this.controller_.viewProps.set("hidden", hidden);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(ButtonApi2.prototype, "label", {
            get: function() {
              return this.controller_.props.get("label");
            },
            set: function(label) {
              this.controller_.props.set("label", label);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(ButtonApi2.prototype, "title", {
            get: function() {
              var _a;
              return (_a = this.controller_.valueController.props.get("title")) !== null && _a !== void 0 ? _a : "";
            },
            set: function(title) {
              this.controller_.valueController.props.set("title", title);
            },
            enumerable: false,
            configurable: true
          });
          ButtonApi2.prototype.on = function(eventName, handler) {
            var emitter = this.controller_.valueController.emitter;
            emitter.on(eventName, forceCast(handler.bind(this)));
            return this;
          };
          return ButtonApi2;
        }(BladeApi);
        var className$m = ClassName("btn");
        var ButtonView = function() {
          function ButtonView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$m());
            config.viewProps.bindClassModifiers(this.element);
            var buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$m("b"));
            config.viewProps.bindDisabled(buttonElem);
            bindValueToTextContent(config.props.value("title"), buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
          }
          return ButtonView2;
        }();
        var ButtonController = function() {
          function ButtonController2(doc, config) {
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
          ButtonController2.prototype.onClick_ = function() {
            this.emitter.emit("click", {
              sender: this
            });
          };
          return ButtonController2;
        }();
        var ButtonBladePlugin = {
          id: "button",
          accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
              title: p.required.string,
              view: p.required.constant("button"),
              label: p.optional.string
            });
            return result ? {params: result} : null;
          },
          controller: function(args) {
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
          api: function(controller) {
            if (!(controller instanceof LabelController)) {
              return null;
            }
            if (!(controller.valueController instanceof ButtonController)) {
              return null;
            }
            return new ButtonApi(controller);
          }
        };
        var FolderApi = function(_super) {
          __extends(FolderApi2, _super);
          function FolderApi2(controller) {
            var _this = _super.call(this, controller, new RackApi(controller.rackController)) || this;
            _this.emitter_ = new Emitter();
            _this.controller_.foldable.value("expanded").emitter.on("change", function(ev) {
              _this.emitter_.emit("fold", {
                event: new TpFoldEvent(_this, ev.sender.rawValue)
              });
            });
            _this.rackApi_.on("change", function(ev) {
              _this.emitter_.emit("change", {
                event: ev
              });
            });
            _this.rackApi_.on("update", function(ev) {
              _this.emitter_.emit("update", {
                event: ev
              });
            });
            return _this;
          }
          Object.defineProperty(FolderApi2.prototype, "expanded", {
            get: function() {
              return this.controller_.foldable.get("expanded");
            },
            set: function(expanded) {
              this.controller_.foldable.set("expanded", expanded);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(FolderApi2.prototype, "title", {
            get: function() {
              return this.controller_.props.get("title");
            },
            set: function(title) {
              this.controller_.props.set("title", title);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(FolderApi2.prototype, "children", {
            get: function() {
              return this.rackApi_.children;
            },
            enumerable: false,
            configurable: true
          });
          FolderApi2.prototype.addInput = function(object, key, opt_params) {
            return this.rackApi_.addInput(object, key, opt_params);
          };
          FolderApi2.prototype.addMonitor = function(object, key, opt_params) {
            return this.rackApi_.addMonitor(object, key, opt_params);
          };
          FolderApi2.prototype.addFolder = function(params) {
            return this.rackApi_.addFolder(params);
          };
          FolderApi2.prototype.addButton = function(params) {
            return this.rackApi_.addButton(params);
          };
          FolderApi2.prototype.addSeparator = function(opt_params) {
            return this.rackApi_.addSeparator(opt_params);
          };
          FolderApi2.prototype.addTab = function(params) {
            return this.rackApi_.addTab(params);
          };
          FolderApi2.prototype.add = function(api, opt_index) {
            return this.rackApi_.add(api, opt_index);
          };
          FolderApi2.prototype.remove = function(api) {
            this.rackApi_.remove(api);
          };
          FolderApi2.prototype.addBlade_v3_ = function(opt_params) {
            return this.rackApi_.addBlade_v3_(opt_params);
          };
          FolderApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          return FolderApi2;
        }(RackLikeApi);
        function createFoldable(expanded) {
          return ValueMap.fromObject({
            expanded,
            expandedHeight: null,
            shouldFixHeight: false,
            temporaryExpanded: null
          });
        }
        function computeExpandedFolderHeight(folder, containerElement) {
          var height = 0;
          disableTransitionTemporarily(containerElement, function() {
            folder.set("expandedHeight", null);
            folder.set("temporaryExpanded", true);
            forceReflow(containerElement);
            height = containerElement.clientHeight;
            folder.set("temporaryExpanded", null);
            forceReflow(containerElement);
          });
          return height;
        }
        function getFoldableStyleExpanded(foldable) {
          var _a;
          return (_a = foldable.get("temporaryExpanded")) !== null && _a !== void 0 ? _a : foldable.get("expanded");
        }
        function getFoldableStyleHeight(foldable) {
          if (!getFoldableStyleExpanded(foldable)) {
            return "0";
          }
          var exHeight = foldable.get("expandedHeight");
          if (foldable.get("shouldFixHeight") && !isEmpty(exHeight)) {
            return exHeight + "px";
          }
          return "auto";
        }
        function applyHeight(foldable, elem) {
          elem.style.height = getFoldableStyleHeight(foldable);
        }
        function bindFoldable(foldable, elem) {
          foldable.value("expanded").emitter.on("beforechange", function() {
            if (isEmpty(foldable.get("expandedHeight"))) {
              foldable.set("expandedHeight", computeExpandedFolderHeight(foldable, elem));
            }
            foldable.set("shouldFixHeight", true);
            forceReflow(elem);
          });
          foldable.emitter.on("change", function() {
            applyHeight(foldable, elem);
          });
          applyHeight(foldable, elem);
          elem.addEventListener("transitionend", function(ev) {
            if (ev.propertyName !== "height") {
              return;
            }
            foldable.set("shouldFixHeight", false);
            foldable.set("expandedHeight", null);
          });
        }
        var bladeContainerClassName = ClassName("cnt");
        var FolderView = function() {
          function FolderView2(doc, config) {
            var _this = this;
            this.onFoldableExpandedChange_ = this.onFoldableExpandedChange_.bind(this);
            this.className_ = ClassName(config.viewName || "fld");
            this.element = doc.createElement("div");
            this.element.classList.add(this.className_(), bladeContainerClassName());
            config.viewProps.bindClassModifiers(this.element);
            this.foldable_ = config.foldable;
            bindValueMap(this.foldable_, "expanded", this.onFoldableExpandedChange_);
            var buttonElem = doc.createElement("button");
            buttonElem.classList.add(this.className_("b"));
            bindValueMap(config.props, "title", function(title) {
              if (isEmpty(title)) {
                _this.element.classList.add(_this.className_(void 0, "not"));
              } else {
                _this.element.classList.remove(_this.className_(void 0, "not"));
              }
            });
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            var titleElem = doc.createElement("div");
            titleElem.classList.add(this.className_("t"));
            bindValueToTextContent(config.props.value("title"), titleElem);
            this.buttonElement.appendChild(titleElem);
            this.titleElement = titleElem;
            var markElem = doc.createElement("div");
            markElem.classList.add(this.className_("m"));
            this.buttonElement.appendChild(markElem);
            var containerElem = config.containerElement;
            containerElem.classList.add(this.className_("c"));
            this.element.appendChild(containerElem);
            this.containerElement = containerElem;
          }
          FolderView2.prototype.onFoldableExpandedChange_ = function() {
            var expanded = getFoldableStyleExpanded(this.foldable_);
            var expandedClass = this.className_(void 0, "expanded");
            if (expanded) {
              this.element.classList.add(expandedClass);
            } else {
              this.element.classList.remove(expandedClass);
            }
          };
          return FolderView2;
        }();
        var FolderController = function(_super) {
          __extends(FolderController2, _super);
          function FolderController2(doc, config) {
            var _a;
            var _this = this;
            var foldable = createFoldable((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
            var rc = new RackController(doc, {
              blade: config.blade,
              root: config.root,
              viewProps: config.viewProps
            });
            _this = _super.call(this, __assign(__assign({}, config), {rackController: rc, view: new FolderView(doc, {
              containerElement: rc.view.element,
              foldable,
              props: config.props,
              viewName: config.root ? "rot" : void 0,
              viewProps: config.viewProps
            })})) || this;
            _this.onTitleClick_ = _this.onTitleClick_.bind(_this);
            _this.props = config.props;
            _this.foldable = foldable;
            bindFoldable(_this.foldable, _this.view.containerElement);
            _this.view.buttonElement.addEventListener("click", _this.onTitleClick_);
            return _this;
          }
          Object.defineProperty(FolderController2.prototype, "document", {
            get: function() {
              return this.view.element.ownerDocument;
            },
            enumerable: false,
            configurable: true
          });
          FolderController2.prototype.onTitleClick_ = function() {
            this.foldable.set("expanded", !this.foldable.get("expanded"));
          };
          return FolderController2;
        }(RackLikeController);
        var FolderBladePlugin = {
          id: "button",
          accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
              title: p.required.string,
              view: p.required.constant("folder"),
              expanded: p.optional.boolean
            });
            return result ? {params: result} : null;
          },
          controller: function(args) {
            return new FolderController(args.document, {
              blade: args.blade,
              expanded: args.params.expanded,
              props: ValueMap.fromObject({
                title: args.params.title
              }),
              viewProps: args.viewProps
            });
          },
          api: function(controller) {
            if (!(controller instanceof FolderController)) {
              return null;
            }
            return new FolderApi(controller);
          }
        };
        var SeparatorApi = function(_super) {
          __extends(SeparatorApi2, _super);
          function SeparatorApi2() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          return SeparatorApi2;
        }(BladeApi);
        var className$l = ClassName("spr");
        var SeparatorView = function() {
          function SeparatorView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$l());
            config.viewProps.bindClassModifiers(this.element);
            var hrElem = doc.createElement("hr");
            hrElem.classList.add(className$l("r"));
            this.element.appendChild(hrElem);
          }
          return SeparatorView2;
        }();
        var SeparatorController = function(_super) {
          __extends(SeparatorController2, _super);
          function SeparatorController2(doc, config) {
            return _super.call(this, __assign(__assign({}, config), {view: new SeparatorView(doc, {
              viewProps: config.viewProps
            })})) || this;
          }
          return SeparatorController2;
        }(BladeController);
        var SeparatorBladePlugin = {
          id: "separator",
          accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
              view: p.required.constant("separator")
            });
            return result ? {params: result} : null;
          },
          controller: function(args) {
            return new SeparatorController(args.document, {
              blade: args.blade,
              viewProps: args.viewProps
            });
          },
          api: function(controller) {
            if (!(controller instanceof SeparatorController)) {
              return null;
            }
            return new SeparatorApi(controller);
          }
        };
        function exportPresetJson(targets) {
          return targets.reduce(function(result, target) {
            var _a;
            return Object.assign(result, (_a = {}, _a[target.presetKey] = target.read(), _a));
          }, {});
        }
        function importPresetJson(targets, preset) {
          targets.forEach(function(target) {
            var value = preset[target.presetKey];
            if (value !== void 0) {
              target.write(value);
            }
          });
        }
        var RootApi = function(_super) {
          __extends(RootApi2, _super);
          function RootApi2(controller) {
            return _super.call(this, controller) || this;
          }
          RootApi2.registerPlugin = function(r) {
            registerPlugin(r);
          };
          Object.defineProperty(RootApi2.prototype, "element", {
            get: function() {
              return this.controller_.view.element;
            },
            enumerable: false,
            configurable: true
          });
          RootApi2.prototype.importPreset = function(preset) {
            var targets = this.controller_.rackController.rack.find(InputBindingController).map(function(ibc) {
              return ibc.binding.target;
            });
            importPresetJson(targets, preset);
            this.refresh();
          };
          RootApi2.prototype.exportPreset = function() {
            var targets = this.controller_.rackController.rack.find(InputBindingController).map(function(ibc) {
              return ibc.binding.target;
            });
            return exportPresetJson(targets);
          };
          RootApi2.prototype.refresh = function() {
            this.controller_.rackController.rack.find(InputBindingController).forEach(function(ibc) {
              ibc.binding.read();
            });
            this.controller_.rackController.rack.find(MonitorBindingController).forEach(function(mbc) {
              mbc.binding.read();
            });
          };
          return RootApi2;
        }(FolderApi);
        function registerDefaultPlugins$1() {
          [ButtonBladePlugin, FolderBladePlugin, SeparatorBladePlugin].forEach(function(p) {
            registerPlugin({
              type: "blade",
              plugin: p
            });
          });
        }
        registerDefaultPlugins$1();
        var RootController = function(_super) {
          __extends(RootController2, _super);
          function RootController2(doc, config) {
            return _super.call(this, doc, {
              expanded: config.expanded,
              blade: config.blade,
              props: config.props,
              root: true,
              viewProps: config.viewProps
            }) || this;
          }
          return RootController2;
        }(FolderController);
        var NumberLiteralNode = function() {
          function NumberLiteralNode2(text) {
            this.text = text;
          }
          NumberLiteralNode2.prototype.evaluate = function() {
            return Number(this.text);
          };
          NumberLiteralNode2.prototype.toString = function() {
            return this.text;
          };
          return NumberLiteralNode2;
        }();
        var BINARY_OPERATION_MAP = {
          "**": function(v1, v2) {
            return Math.pow(v1, v2);
          },
          "*": function(v1, v2) {
            return v1 * v2;
          },
          "/": function(v1, v2) {
            return v1 / v2;
          },
          "%": function(v1, v2) {
            return v1 % v2;
          },
          "+": function(v1, v2) {
            return v1 + v2;
          },
          "-": function(v1, v2) {
            return v1 - v2;
          },
          "<<": function(v1, v2) {
            return v1 << v2;
          },
          ">>": function(v1, v2) {
            return v1 >> v2;
          },
          ">>>": function(v1, v2) {
            return v1 >>> v2;
          },
          "&": function(v1, v2) {
            return v1 & v2;
          },
          "^": function(v1, v2) {
            return v1 ^ v2;
          },
          "|": function(v1, v2) {
            return v1 | v2;
          }
        };
        var BinaryOperationNode = function() {
          function BinaryOperationNode2(operator, left, right) {
            this.left = left;
            this.operator = operator;
            this.right = right;
          }
          BinaryOperationNode2.prototype.evaluate = function() {
            var op = BINARY_OPERATION_MAP[this.operator];
            if (!op) {
              throw new Error("unexpected binary operator: '" + this.operator);
            }
            return op(this.left.evaluate(), this.right.evaluate());
          };
          BinaryOperationNode2.prototype.toString = function() {
            return [
              "b(",
              this.left.toString(),
              this.operator,
              this.right.toString(),
              ")"
            ].join(" ");
          };
          return BinaryOperationNode2;
        }();
        var UNARY_OPERATION_MAP = {
          "+": function(v) {
            return v;
          },
          "-": function(v) {
            return -v;
          },
          "~": function(v) {
            return ~v;
          }
        };
        var UnaryOperationNode = function() {
          function UnaryOperationNode2(operator, expr) {
            this.operator = operator;
            this.expression = expr;
          }
          UnaryOperationNode2.prototype.evaluate = function() {
            var op = UNARY_OPERATION_MAP[this.operator];
            if (!op) {
              throw new Error("unexpected unary operator: '" + this.operator);
            }
            return op(this.expression.evaluate());
          };
          UnaryOperationNode2.prototype.toString = function() {
            return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
          };
          return UnaryOperationNode2;
        }();
        function combineReader(parsers) {
          return function(text, cursor) {
            for (var i = 0; i < parsers.length; i++) {
              var result = parsers[i](text, cursor);
              if (result !== "") {
                return result;
              }
            }
            return "";
          };
        }
        function readWhitespace(text, cursor) {
          var _a;
          var m = text.substr(cursor).match(/^\s+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readNonZeroDigit(text, cursor) {
          var ch = text.substr(cursor, 1);
          return ch.match(/^[1-9]$/) ? ch : "";
        }
        function readDecimalDigits(text, cursor) {
          var _a;
          var m = text.substr(cursor).match(/^[0-9]+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readSignedInteger(text, cursor) {
          var ds = readDecimalDigits(text, cursor);
          if (ds !== "") {
            return ds;
          }
          var sign = text.substr(cursor, 1);
          cursor += 1;
          if (sign !== "-" && sign !== "+") {
            return "";
          }
          var sds = readDecimalDigits(text, cursor);
          if (sds === "") {
            return "";
          }
          return sign + sds;
        }
        function readExponentPart(text, cursor) {
          var e = text.substr(cursor, 1);
          cursor += 1;
          if (e.toLowerCase() !== "e") {
            return "";
          }
          var si = readSignedInteger(text, cursor);
          if (si === "") {
            return "";
          }
          return e + si;
        }
        function readDecimalIntegerLiteral(text, cursor) {
          var ch = text.substr(cursor, 1);
          if (ch === "0") {
            return ch;
          }
          var nzd = readNonZeroDigit(text, cursor);
          cursor += nzd.length;
          if (nzd === "") {
            return "";
          }
          return nzd + readDecimalDigits(text, cursor);
        }
        function readDecimalLiteral1(text, cursor) {
          var dil = readDecimalIntegerLiteral(text, cursor);
          cursor += dil.length;
          if (dil === "") {
            return "";
          }
          var dot = text.substr(cursor, 1);
          cursor += dot.length;
          if (dot !== ".") {
            return "";
          }
          var dds = readDecimalDigits(text, cursor);
          cursor += dds.length;
          return dil + dot + dds + readExponentPart(text, cursor);
        }
        function readDecimalLiteral2(text, cursor) {
          var dot = text.substr(cursor, 1);
          cursor += dot.length;
          if (dot !== ".") {
            return "";
          }
          var dds = readDecimalDigits(text, cursor);
          cursor += dds.length;
          if (dds === "") {
            return "";
          }
          return dot + dds + readExponentPart(text, cursor);
        }
        function readDecimalLiteral3(text, cursor) {
          var dil = readDecimalIntegerLiteral(text, cursor);
          cursor += dil.length;
          if (dil === "") {
            return "";
          }
          return dil + readExponentPart(text, cursor);
        }
        var readDecimalLiteral = combineReader([
          readDecimalLiteral1,
          readDecimalLiteral2,
          readDecimalLiteral3
        ]);
        function parseBinaryDigits(text, cursor) {
          var _a;
          var m = text.substr(cursor).match(/^[01]+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readBinaryIntegerLiteral(text, cursor) {
          var prefix = text.substr(cursor, 2);
          cursor += prefix.length;
          if (prefix.toLowerCase() !== "0b") {
            return "";
          }
          var bds = parseBinaryDigits(text, cursor);
          if (bds === "") {
            return "";
          }
          return prefix + bds;
        }
        function readOctalDigits(text, cursor) {
          var _a;
          var m = text.substr(cursor).match(/^[0-7]+/);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readOctalIntegerLiteral(text, cursor) {
          var prefix = text.substr(cursor, 2);
          cursor += prefix.length;
          if (prefix.toLowerCase() !== "0o") {
            return "";
          }
          var ods = readOctalDigits(text, cursor);
          if (ods === "") {
            return "";
          }
          return prefix + ods;
        }
        function readHexDigits(text, cursor) {
          var _a;
          var m = text.substr(cursor).match(/^[0-9a-f]+/i);
          return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
        }
        function readHexIntegerLiteral(text, cursor) {
          var prefix = text.substr(cursor, 2);
          cursor += prefix.length;
          if (prefix.toLowerCase() !== "0x") {
            return "";
          }
          var hds = readHexDigits(text, cursor);
          if (hds === "") {
            return "";
          }
          return prefix + hds;
        }
        var readNonDecimalIntegerLiteral = combineReader([
          readBinaryIntegerLiteral,
          readOctalIntegerLiteral,
          readHexIntegerLiteral
        ]);
        var readNumericLiteral = combineReader([
          readNonDecimalIntegerLiteral,
          readDecimalLiteral
        ]);
        function parseLiteral(text, cursor) {
          var num = readNumericLiteral(text, cursor);
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
          var op = text.substr(cursor, 1);
          cursor += op.length;
          if (op !== "(") {
            return null;
          }
          var expr = parseExpression(text, cursor);
          if (!expr) {
            return null;
          }
          cursor = expr.cursor;
          cursor += readWhitespace(text, cursor).length;
          var cl = text.substr(cursor, 1);
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
          var expr = parsePrimaryExpression(text, cursor);
          if (expr) {
            return expr;
          }
          var op = text.substr(cursor, 1);
          cursor += op.length;
          if (op !== "+" && op !== "-" && op !== "~") {
            return null;
          }
          var num = parseUnaryExpression(text, cursor);
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
          var op = ops.filter(function(op2) {
            return text.startsWith(op2, cursor);
          })[0];
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
          return function(text, cursor) {
            var firstExpr = exprParser(text, cursor);
            if (!firstExpr) {
              return null;
            }
            cursor = firstExpr.cursor;
            var expr = firstExpr.evaluable;
            for (; ; ) {
              var op = readBinaryOperator(ops, text, cursor);
              if (!op) {
                break;
              }
              cursor = op.cursor;
              var nextExpr = exprParser(text, cursor);
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
        var parseBinaryOperationExpression = [
          ["**"],
          ["*", "/", "%"],
          ["+", "-"],
          ["<<", ">>>", ">>"],
          ["&"],
          ["^"],
          ["|"]
        ].reduce(function(parser, ops) {
          return createBinaryOperationExpressionParser(parser, ops);
        }, parseUnaryExpression);
        function parseExpression(text, cursor) {
          cursor += readWhitespace(text, cursor).length;
          return parseBinaryOperationExpression(text, cursor);
        }
        function parseEcmaNumberExpression(text) {
          var expr = parseExpression(text, 0);
          if (!expr) {
            return null;
          }
          var cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
          if (cursor !== text.length) {
            return null;
          }
          return expr.evaluable;
        }
        function parseNumber(text) {
          var _a;
          var r = parseEcmaNumberExpression(text);
          return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
        }
        function numberFromUnknown(value) {
          if (typeof value === "number") {
            return value;
          }
          if (typeof value === "string") {
            var pv = parseNumber(value);
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
          return function(value) {
            return value.toFixed(Math.max(Math.min(digits, 20), 0));
          };
        }
        var className$k = ClassName("sldtxt");
        var SliderTextView = function() {
          function SliderTextView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$k());
            var sliderElem = doc.createElement("div");
            sliderElem.classList.add(className$k("s"));
            this.sliderView_ = config.sliderView;
            sliderElem.appendChild(this.sliderView_.element);
            this.element.appendChild(sliderElem);
            var textElem = doc.createElement("div");
            textElem.classList.add(className$k("t"));
            this.textView_ = config.textView;
            textElem.appendChild(this.textView_.element);
            this.element.appendChild(textElem);
          }
          return SliderTextView2;
        }();
        function getStepForKey(baseStep, keys) {
          var step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
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
          var win = elem.ownerDocument.defaultView;
          var rect = elem.getBoundingClientRect();
          return {
            x: ev.pageX - ((win && win.scrollX || 0) + rect.left),
            y: ev.pageY - ((win && win.scrollY || 0) + rect.top)
          };
        }
        var PointerHandler = function() {
          function PointerHandler2(element) {
            this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
            this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
            this.onMouseDown_ = this.onMouseDown_.bind(this);
            this.onTouchEnd_ = this.onTouchEnd_.bind(this);
            this.onTouchMove_ = this.onTouchMove_.bind(this);
            this.onTouchStart_ = this.onTouchStart_.bind(this);
            this.elem_ = element;
            this.emitter = new Emitter();
            var doc = this.elem_.ownerDocument;
            if (supportsTouch(doc)) {
              element.addEventListener("touchstart", this.onTouchStart_);
              element.addEventListener("touchmove", this.onTouchMove_);
              element.addEventListener("touchend", this.onTouchEnd_);
            } else {
              element.addEventListener("mousedown", this.onMouseDown_);
            }
          }
          PointerHandler2.prototype.computePosition_ = function(offset) {
            var rect = this.elem_.getBoundingClientRect();
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
          };
          PointerHandler2.prototype.onMouseDown_ = function(ev) {
            var _a;
            ev.preventDefault();
            (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
            var doc = this.elem_.ownerDocument;
            doc.addEventListener("mousemove", this.onDocumentMouseMove_);
            doc.addEventListener("mouseup", this.onDocumentMouseUp_);
            this.emitter.emit("down", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          };
          PointerHandler2.prototype.onDocumentMouseMove_ = function(ev) {
            this.emitter.emit("move", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          };
          PointerHandler2.prototype.onDocumentMouseUp_ = function(ev) {
            var doc = this.elem_.ownerDocument;
            doc.removeEventListener("mousemove", this.onDocumentMouseMove_);
            doc.removeEventListener("mouseup", this.onDocumentMouseUp_);
            this.emitter.emit("up", {
              altKey: ev.altKey,
              data: this.computePosition_(computeOffset(ev, this.elem_)),
              sender: this,
              shiftKey: ev.shiftKey
            });
          };
          PointerHandler2.prototype.onTouchStart_ = function(ev) {
            ev.preventDefault();
            var touch = ev.targetTouches.item(0);
            var rect = this.elem_.getBoundingClientRect();
            this.emitter.emit("down", {
              altKey: ev.altKey,
              data: this.computePosition_(touch ? {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
              } : void 0),
              sender: this,
              shiftKey: ev.shiftKey
            });
          };
          PointerHandler2.prototype.onTouchMove_ = function(ev) {
            var touch = ev.targetTouches.item(0);
            var rect = this.elem_.getBoundingClientRect();
            this.emitter.emit("move", {
              altKey: ev.altKey,
              data: this.computePosition_(touch ? {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
              } : void 0),
              sender: this,
              shiftKey: ev.shiftKey
            });
          };
          PointerHandler2.prototype.onTouchEnd_ = function(ev) {
            var touch = ev.targetTouches.item(0);
            var rect = this.elem_.getBoundingClientRect();
            this.emitter.emit("up", {
              altKey: ev.altKey,
              data: this.computePosition_(touch ? {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
              } : void 0),
              sender: this,
              shiftKey: ev.shiftKey
            });
          };
          return PointerHandler2;
        }();
        var className$j = ClassName("txt");
        var NumberTextView = function() {
          function NumberTextView2(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on("change", this.onChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$j(), className$j(void 0, "num"));
            if (config.arrayPosition) {
              this.element.classList.add(className$j(void 0, config.arrayPosition));
            }
            config.viewProps.bindClassModifiers(this.element);
            var inputElem = doc.createElement("input");
            inputElem.classList.add(className$j("i"));
            inputElem.type = "text";
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            this.onDraggingChange_ = this.onDraggingChange_.bind(this);
            this.dragging_ = config.dragging;
            this.dragging_.emitter.on("change", this.onDraggingChange_);
            this.element.classList.add(className$j());
            this.inputElement.classList.add(className$j("i"));
            var knobElem = doc.createElement("div");
            knobElem.classList.add(className$j("k"));
            this.element.appendChild(knobElem);
            this.knobElement = knobElem;
            var guideElem = doc.createElementNS(SVG_NS, "svg");
            guideElem.classList.add(className$j("g"));
            this.knobElement.appendChild(guideElem);
            var bodyElem = doc.createElementNS(SVG_NS, "path");
            bodyElem.classList.add(className$j("gb"));
            guideElem.appendChild(bodyElem);
            this.guideBodyElem_ = bodyElem;
            var headElem = doc.createElementNS(SVG_NS, "path");
            headElem.classList.add(className$j("gh"));
            guideElem.appendChild(headElem);
            this.guideHeadElem_ = headElem;
            var tooltipElem = doc.createElement("div");
            tooltipElem.classList.add(ClassName("tt")());
            this.knobElement.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on("change", this.onChange_);
            this.value = config.value;
            this.refresh();
          }
          NumberTextView2.prototype.onDraggingChange_ = function(ev) {
            if (ev.rawValue === null) {
              this.element.classList.remove(className$j(void 0, "drg"));
              return;
            }
            this.element.classList.add(className$j(void 0, "drg"));
            var x = ev.rawValue / this.props_.get("draggingScale");
            var aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
            var adx = constrainRange(-aox, -4, 4);
            this.guideHeadElem_.setAttributeNS(null, "d", ["M " + (aox + adx) + ",0 L" + aox + ",4 L" + (aox + adx) + ",8", "M " + x + ",-1 L" + x + ",9"].join(" "));
            this.guideBodyElem_.setAttributeNS(null, "d", "M 0,4 L" + x + ",4");
            var formatter = this.props_.get("formatter");
            this.tooltipElem_.textContent = formatter(this.value.rawValue);
            this.tooltipElem_.style.left = x + "px";
          };
          NumberTextView2.prototype.refresh = function() {
            var formatter = this.props_.get("formatter");
            this.inputElement.value = formatter(this.value.rawValue);
          };
          NumberTextView2.prototype.onChange_ = function() {
            this.refresh();
          };
          return NumberTextView2;
        }();
        var NumberTextController = function() {
          function NumberTextController2(doc, config) {
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
            var ph = new PointerHandler(this.view.knobElement);
            ph.emitter.on("down", this.onPointerDown_);
            ph.emitter.on("move", this.onPointerMove_);
            ph.emitter.on("up", this.onPointerUp_);
          }
          NumberTextController2.prototype.onInputChange_ = function(e) {
            var inputElem = forceCast(e.currentTarget);
            var value = inputElem.value;
            var parsedValue = this.parser_(value);
            if (!isEmpty(parsedValue)) {
              this.value.rawValue = parsedValue;
            }
            this.view.refresh();
          };
          NumberTextController2.prototype.onInputKeyDown_ = function(e) {
            var step = getStepForKey(this.baseStep_, getVerticalStepKeys(e));
            if (step !== 0) {
              this.value.rawValue += step;
            }
          };
          NumberTextController2.prototype.onPointerDown_ = function() {
            this.originRawValue_ = this.value.rawValue;
            this.dragging_.rawValue = 0;
          };
          NumberTextController2.prototype.onPointerMove_ = function(ev) {
            if (!ev.data.point) {
              return;
            }
            var dx = ev.data.point.x - ev.data.bounds.width / 2;
            this.value.rawValue = this.originRawValue_ + dx * this.props.get("draggingScale");
            this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
          };
          NumberTextController2.prototype.onPointerUp_ = function() {
            this.dragging_.rawValue = null;
          };
          return NumberTextController2;
        }();
        var className$i = ClassName("sld");
        var SliderView = function() {
          function SliderView2(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on("change", this.onChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$i());
            config.viewProps.bindClassModifiers(this.element);
            var trackElem = doc.createElement("div");
            trackElem.classList.add(className$i("t"));
            config.viewProps.bindTabIndex(trackElem);
            this.element.appendChild(trackElem);
            this.trackElement = trackElem;
            var knobElem = doc.createElement("div");
            knobElem.classList.add(className$i("k"));
            this.trackElement.appendChild(knobElem);
            this.knobElement = knobElem;
            config.value.emitter.on("change", this.onChange_);
            this.value = config.value;
            this.update_();
          }
          SliderView2.prototype.update_ = function() {
            var p = constrainRange(mapRange(this.value.rawValue, this.props_.get("minValue"), this.props_.get("maxValue"), 0, 100), 0, 100);
            this.knobElement.style.width = p + "%";
          };
          SliderView2.prototype.onChange_ = function() {
            this.update_();
          };
          return SliderView2;
        }();
        var SliderController = function() {
          function SliderController2(doc, config) {
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
          SliderController2.prototype.handlePointerEvent_ = function(d) {
            if (!d.point) {
              return;
            }
            this.value.rawValue = mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get("minValue"), this.props.get("maxValue"));
          };
          SliderController2.prototype.onPoint_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          SliderController2.prototype.onKeyDown_ = function(ev) {
            this.value.rawValue += getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
          };
          return SliderController2;
        }();
        var SliderTextController = function() {
          function SliderTextController2(doc, config) {
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
          Object.defineProperty(SliderTextController2.prototype, "sliderController", {
            get: function() {
              return this.sliderC_;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(SliderTextController2.prototype, "textController", {
            get: function() {
              return this.textC_;
            },
            enumerable: false,
            configurable: true
          });
          return SliderTextController2;
        }();
        var SliderApi = function(_super) {
          __extends(SliderApi2, _super);
          function SliderApi2(controller) {
            var _this = _super.call(this, controller) || this;
            _this.emitter_ = new Emitter();
            _this.controller_.valueController.value.emitter.on("change", function(ev) {
              _this.emitter_.emit("change", {
                event: new TpChangeEvent(_this, ev.rawValue)
              });
            });
            return _this;
          }
          Object.defineProperty(SliderApi2.prototype, "label", {
            get: function() {
              return this.controller_.props.get("label");
            },
            set: function(label) {
              this.controller_.props.set("label", label);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(SliderApi2.prototype, "maxValue", {
            get: function() {
              return this.controller_.valueController.sliderController.props.get("maxValue");
            },
            set: function(maxValue) {
              this.controller_.valueController.sliderController.props.set("maxValue", maxValue);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(SliderApi2.prototype, "minValue", {
            get: function() {
              return this.controller_.valueController.sliderController.props.get("minValue");
            },
            set: function(minValue) {
              this.controller_.valueController.sliderController.props.set("minValue", minValue);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(SliderApi2.prototype, "value", {
            get: function() {
              return this.controller_.valueController.value.rawValue;
            },
            set: function(value) {
              this.controller_.valueController.value.rawValue = value;
            },
            enumerable: false,
            configurable: true
          });
          SliderApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          return SliderApi2;
        }(BladeApi);
        var SliderBladePlugin = {
          id: "slider",
          accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
              max: p.required.number,
              min: p.required.number,
              view: p.required.constant("slider"),
              format: p.optional.function,
              label: p.optional.string,
              value: p.optional.number
            });
            return result ? {params: result} : null;
          },
          controller: function(args) {
            var _a, _b;
            var v = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
            var vc = new SliderTextController(args.document, {
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
            return new LabelController(args.document, {
              blade: args.blade,
              props: ValueMap.fromObject({
                label: args.params.label
              }),
              valueController: vc
            });
          },
          api: function(controller) {
            if (!(controller instanceof LabelController)) {
              return null;
            }
            if (!(controller.valueController instanceof SliderTextController)) {
              return null;
            }
            return new SliderApi(controller);
          }
        };
        var className$h = ClassName("tbi");
        var TabItemView = function() {
          function TabItemView2(doc, config) {
            var _this = this;
            this.element = doc.createElement("div");
            this.element.classList.add(className$h());
            config.viewProps.bindClassModifiers(this.element);
            bindValueMap(config.props, "selected", function(selected) {
              if (selected) {
                _this.element.classList.add(className$h(void 0, "sel"));
              } else {
                _this.element.classList.remove(className$h(void 0, "sel"));
              }
            });
            var buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$h("b"));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            var titleElem = doc.createElement("div");
            titleElem.classList.add(className$h("t"));
            bindValueToTextContent(config.props.value("title"), titleElem);
            this.buttonElement.appendChild(titleElem);
            this.titleElement = titleElem;
          }
          return TabItemView2;
        }();
        var TabItemController = function() {
          function TabItemController2(doc, config) {
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
          TabItemController2.prototype.onClick_ = function() {
            this.emitter.emit("click", {
              sender: this
            });
          };
          return TabItemController2;
        }();
        var TabPageController = function() {
          function TabPageController2(doc, config) {
            var _this = this;
            this.onItemClick_ = this.onItemClick_.bind(this);
            this.ic_ = new TabItemController(doc, {
              props: config.itemProps,
              viewProps: ViewProps.create()
            });
            this.ic_.emitter.on("click", this.onItemClick_);
            this.cc_ = new RackController(doc, {
              blade: createBlade$1(),
              viewProps: ViewProps.create()
            });
            this.props = config.props;
            bindValueMap(this.props, "selected", function(selected) {
              _this.itemController.props.set("selected", selected);
              _this.contentController.viewProps.set("hidden", !selected);
            });
          }
          Object.defineProperty(TabPageController2.prototype, "itemController", {
            get: function() {
              return this.ic_;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(TabPageController2.prototype, "contentController", {
            get: function() {
              return this.cc_;
            },
            enumerable: false,
            configurable: true
          });
          TabPageController2.prototype.onItemClick_ = function() {
            this.props.set("selected", true);
          };
          return TabPageController2;
        }();
        var TabPageApi = function() {
          function TabPageApi2(controller, contentRackApi) {
            this.controller_ = controller;
            this.rackApi_ = contentRackApi;
          }
          Object.defineProperty(TabPageApi2.prototype, "title", {
            get: function() {
              var _a;
              return (_a = this.controller_.itemController.props.get("title")) !== null && _a !== void 0 ? _a : "";
            },
            set: function(title) {
              this.controller_.itemController.props.set("title", title);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(TabPageApi2.prototype, "selected", {
            get: function() {
              return this.controller_.props.get("selected");
            },
            set: function(selected) {
              this.controller_.props.set("selected", selected);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(TabPageApi2.prototype, "children", {
            get: function() {
              return this.rackApi_.children;
            },
            enumerable: false,
            configurable: true
          });
          TabPageApi2.prototype.addButton = function(params) {
            return this.rackApi_.addButton(params);
          };
          TabPageApi2.prototype.addFolder = function(params) {
            return this.rackApi_.addFolder(params);
          };
          TabPageApi2.prototype.addSeparator = function(opt_params) {
            return this.rackApi_.addSeparator(opt_params);
          };
          TabPageApi2.prototype.addTab = function(params) {
            return this.rackApi_.addTab(params);
          };
          TabPageApi2.prototype.add = function(api, opt_index) {
            this.rackApi_.add(api, opt_index);
          };
          TabPageApi2.prototype.remove = function(api) {
            this.rackApi_.remove(api);
          };
          TabPageApi2.prototype.addInput = function(object, key, opt_params) {
            return this.rackApi_.addInput(object, key, opt_params);
          };
          TabPageApi2.prototype.addMonitor = function(object, key, opt_params) {
            return this.rackApi_.addMonitor(object, key, opt_params);
          };
          TabPageApi2.prototype.addBlade_v3_ = function(opt_params) {
            return this.rackApi_.addBlade_v3_(opt_params);
          };
          return TabPageApi2;
        }();
        var TabApi = function(_super) {
          __extends(TabApi2, _super);
          function TabApi2(controller) {
            var _this = _super.call(this, controller, new RackApi(controller.rackController)) || this;
            _this.onPageAdd_ = _this.onPageAdd_.bind(_this);
            _this.onPageRemove_ = _this.onPageRemove_.bind(_this);
            _this.emitter_ = new Emitter();
            _this.pageApiMap_ = new Map();
            _this.rackApi_.on("change", function(ev) {
              _this.emitter_.emit("change", {
                event: ev
              });
            });
            _this.rackApi_.on("update", function(ev) {
              _this.emitter_.emit("update", {
                event: ev
              });
            });
            _this.controller_.pageSet.emitter.on("add", _this.onPageAdd_);
            _this.controller_.pageSet.emitter.on("remove", _this.onPageRemove_);
            _this.controller_.pageSet.items.forEach(function(pc) {
              _this.setUpPageApi_(pc);
            });
            return _this;
          }
          Object.defineProperty(TabApi2.prototype, "pages", {
            get: function() {
              var _this = this;
              return this.controller_.pageSet.items.map(function(pc) {
                var api = _this.pageApiMap_.get(pc);
                if (!api) {
                  throw TpError.shouldNeverHappen();
                }
                return api;
              });
            },
            enumerable: false,
            configurable: true
          });
          TabApi2.prototype.addPage = function(params) {
            var doc = this.controller_.view.element.ownerDocument;
            var pc = new TabPageController(doc, {
              itemProps: ValueMap.fromObject({
                selected: false,
                title: params.title
              }),
              props: ValueMap.fromObject({
                selected: false
              })
            });
            this.controller_.add(pc, params.index);
            var api = this.pageApiMap_.get(pc);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            return api;
          };
          TabApi2.prototype.removePage = function(index) {
            this.controller_.remove(index);
          };
          TabApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          TabApi2.prototype.setUpPageApi_ = function(pc) {
            var rackApi = this.rackApi_["apiSet_"].find(function(api2) {
              return api2.controller_ === pc.contentController;
            });
            if (!rackApi) {
              throw TpError.shouldNeverHappen();
            }
            var api = new TabPageApi(pc, rackApi);
            this.pageApiMap_.set(pc, api);
          };
          TabApi2.prototype.onPageAdd_ = function(ev) {
            this.setUpPageApi_(ev.item);
          };
          TabApi2.prototype.onPageRemove_ = function(ev) {
            var api = this.pageApiMap_.get(ev.item);
            if (!api) {
              throw TpError.shouldNeverHappen();
            }
            this.pageApiMap_.delete(ev.item);
          };
          return TabApi2;
        }(RackLikeApi);
        var className$g = ClassName("tab");
        var TabView = function() {
          function TabView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$g(), bladeContainerClassName());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.empty, valueToClassName(this.element, className$g(void 0, "nop")));
            var itemsElem = doc.createElement("div");
            itemsElem.classList.add(className$g("i"));
            this.element.appendChild(itemsElem);
            this.itemsElement = itemsElem;
            var contentsElem = config.contentsElement;
            contentsElem.classList.add(className$g("c"));
            this.element.appendChild(contentsElem);
            this.contentsElement = contentsElem;
          }
          return TabView2;
        }();
        var TabController = function(_super) {
          __extends(TabController2, _super);
          function TabController2(doc, config) {
            var _this = this;
            var cr = new RackController(doc, {
              blade: config.blade,
              viewProps: config.viewProps
            });
            var empty = createValue(true);
            _this = _super.call(this, {
              blade: config.blade,
              rackController: cr,
              view: new TabView(doc, {
                contentsElement: cr.view.element,
                empty,
                viewProps: config.viewProps
              })
            }) || this;
            _this.onPageAdd_ = _this.onPageAdd_.bind(_this);
            _this.onPageRemove_ = _this.onPageRemove_.bind(_this);
            _this.onPageSelectedChange_ = _this.onPageSelectedChange_.bind(_this);
            _this.pageSet_ = new NestedOrderedSet(function() {
              return null;
            });
            _this.pageSet_.emitter.on("add", _this.onPageAdd_);
            _this.pageSet_.emitter.on("remove", _this.onPageRemove_);
            _this.empty_ = empty;
            _this.applyPages_();
            return _this;
          }
          Object.defineProperty(TabController2.prototype, "pageSet", {
            get: function() {
              return this.pageSet_;
            },
            enumerable: false,
            configurable: true
          });
          TabController2.prototype.add = function(pc, opt_index) {
            this.pageSet_.add(pc, opt_index !== null && opt_index !== void 0 ? opt_index : this.pageSet_.items.length);
          };
          TabController2.prototype.remove = function(index) {
            this.pageSet_.remove(this.pageSet_.items[index]);
          };
          TabController2.prototype.applyPages_ = function() {
            this.keepSelection_();
            this.empty_.rawValue = this.pageSet_.items.length === 0;
          };
          TabController2.prototype.onPageAdd_ = function(ev) {
            var pc = ev.item;
            insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
            this.rackController.rack.add(pc.contentController, ev.index);
            pc.props.value("selected").emitter.on("change", this.onPageSelectedChange_);
            this.applyPages_();
          };
          TabController2.prototype.onPageRemove_ = function(ev) {
            var pc = ev.item;
            removeElement(pc.itemController.view.element);
            this.rackController.rack.remove(pc.contentController);
            pc.props.value("selected").emitter.off("change", this.onPageSelectedChange_);
            this.applyPages_();
          };
          TabController2.prototype.keepSelection_ = function() {
            if (this.pageSet_.items.length === 0) {
              return;
            }
            var firstSelIndex = this.pageSet_.items.findIndex(function(pc) {
              return pc.props.get("selected");
            });
            if (firstSelIndex < 0) {
              this.pageSet_.items.forEach(function(pc, i) {
                pc.props.set("selected", i === 0);
              });
            } else {
              this.pageSet_.items.forEach(function(pc, i) {
                pc.props.set("selected", i === firstSelIndex);
              });
            }
          };
          TabController2.prototype.onPageSelectedChange_ = function(ev) {
            if (ev.rawValue) {
              var index_1 = this.pageSet_.items.findIndex(function(pc) {
                return pc.props.value("selected") === ev.sender;
              });
              this.pageSet_.items.forEach(function(pc, i) {
                pc.props.set("selected", i === index_1);
              });
            } else {
              this.keepSelection_();
            }
          };
          return TabController2;
        }(RackLikeController);
        var TabBladePlugin = {
          id: "tab",
          accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
              pages: p.required.array(p.required.object({title: p.required.string})),
              view: p.required.constant("tab")
            });
            if (!result || result.pages.length === 0) {
              return null;
            }
            return {params: result};
          },
          controller: function(args) {
            var c = new TabController(args.document, {
              blade: args.blade,
              viewProps: args.viewProps
            });
            args.params.pages.forEach(function(p) {
              var pc = new TabPageController(args.document, {
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
          api: function(controller) {
            if (!(controller instanceof TabController)) {
              return null;
            }
            return new TabApi(controller);
          }
        };
        var className$f = ClassName("txt");
        var TextView = function() {
          function TextView2(doc, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.element = doc.createElement("div");
            this.element.classList.add(className$f());
            config.viewProps.bindClassModifiers(this.element);
            this.props_ = config.props;
            this.props_.emitter.on("change", this.onChange_);
            var inputElem = doc.createElement("input");
            inputElem.classList.add(className$f("i"));
            inputElem.type = "text";
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            config.value.emitter.on("change", this.onChange_);
            this.value_ = config.value;
            this.refresh();
          }
          TextView2.prototype.refresh = function() {
            var formatter = this.props_.get("formatter");
            this.inputElement.value = formatter(this.value_.rawValue);
          };
          TextView2.prototype.onChange_ = function() {
            this.refresh();
          };
          return TextView2;
        }();
        var TextController = function() {
          function TextController2(doc, config) {
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
          TextController2.prototype.onInputChange_ = function(e) {
            var inputElem = forceCast(e.currentTarget);
            var value = inputElem.value;
            var parsedValue = this.parser_(value);
            if (!isEmpty(parsedValue)) {
              this.value.rawValue = parsedValue;
            }
            this.view.refresh();
          };
          return TextController2;
        }();
        var TextApi = function(_super) {
          __extends(TextApi2, _super);
          function TextApi2(controller) {
            var _this = _super.call(this, controller) || this;
            _this.emitter_ = new Emitter();
            _this.controller_.valueController.value.emitter.on("change", function(ev) {
              _this.emitter_.emit("change", {
                event: new TpChangeEvent(_this, ev.rawValue)
              });
            });
            return _this;
          }
          Object.defineProperty(TextApi2.prototype, "label", {
            get: function() {
              return this.controller_.props.get("label");
            },
            set: function(label) {
              this.controller_.props.set("label", label);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(TextApi2.prototype, "formatter", {
            get: function() {
              return this.controller_.valueController.props.get("formatter");
            },
            set: function(formatter) {
              this.controller_.valueController.props.set("formatter", formatter);
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(TextApi2.prototype, "value", {
            get: function() {
              return this.controller_.valueController.value.rawValue;
            },
            set: function(value) {
              this.controller_.valueController.value.rawValue = value;
            },
            enumerable: false,
            configurable: true
          });
          TextApi2.prototype.on = function(eventName, handler) {
            var bh = handler.bind(this);
            this.emitter_.on(eventName, function(ev) {
              bh(ev.event);
            });
            return this;
          };
          return TextApi2;
        }(BladeApi);
        var TextBladePlugin = function() {
          return {
            id: "text",
            accept: function(params) {
              var p = ParamsParsers;
              var result = parseParams(params, {
                parse: p.required.function,
                value: p.required.raw,
                view: p.required.constant("text"),
                format: p.optional.function,
                label: p.optional.string
              });
              return result ? {params: result} : null;
            },
            controller: function(args) {
              var _a;
              var ic = new TextController(args.document, {
                parser: args.params.parse,
                props: ValueMap.fromObject({
                  formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : function(v) {
                    return String(v);
                  }
                }),
                value: createValue(args.params.value),
                viewProps: args.viewProps
              });
              return new LabelController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                  label: args.params.label
                }),
                valueController: ic
              });
            },
            api: function(controller) {
              if (!(controller instanceof LabelController)) {
                return null;
              }
              if (!(controller.valueController instanceof TextController)) {
                return null;
              }
              return new TextApi(controller);
            }
          };
        }();
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
        function writePrimitive(target, value) {
          target.write(value);
        }
        var className$e = ClassName("ckb");
        var CheckboxView = function() {
          function CheckboxView2(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.element = doc.createElement("div");
            this.element.classList.add(className$e());
            config.viewProps.bindClassModifiers(this.element);
            var labelElem = doc.createElement("label");
            labelElem.classList.add(className$e("l"));
            this.element.appendChild(labelElem);
            var inputElem = doc.createElement("input");
            inputElem.classList.add(className$e("i"));
            inputElem.type = "checkbox";
            labelElem.appendChild(inputElem);
            this.inputElement = inputElem;
            config.viewProps.bindDisabled(this.inputElement);
            var wrapperElem = doc.createElement("div");
            wrapperElem.classList.add(className$e("w"));
            labelElem.appendChild(wrapperElem);
            var markElem = createSvgIconElement(doc, "check");
            wrapperElem.appendChild(markElem);
            config.value.emitter.on("change", this.onValueChange_);
            this.value = config.value;
            this.update_();
          }
          CheckboxView2.prototype.update_ = function() {
            this.inputElement.checked = this.value.rawValue;
          };
          CheckboxView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          return CheckboxView2;
        }();
        var CheckboxController = function() {
          function CheckboxController2(doc, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new CheckboxView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener("change", this.onInputChange_);
          }
          CheckboxController2.prototype.onInputChange_ = function(e) {
            var inputElem = forceCast(e.currentTarget);
            this.value.rawValue = inputElem.checked;
          };
          return CheckboxController2;
        }();
        function createConstraint$5(params) {
          var constraints = [];
          var lc = createListConstraint(params);
          if (lc) {
            constraints.push(lc);
          }
          return new CompositeConstraint(constraints);
        }
        var BooleanInputPlugin = {
          id: "input-bool",
          accept: function(value) {
            return typeof value === "boolean" ? value : null;
          },
          binding: {
            reader: function(_args) {
              return boolFromUnknown;
            },
            constraint: function(args) {
              return createConstraint$5(args.params);
            },
            writer: function(_args) {
              return writePrimitive;
            }
          },
          controller: function(args) {
            var _a;
            var doc = args.document;
            var value = args.value;
            var c = args.constraint;
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
        var className$d = ClassName("pop");
        var PopupView = function() {
          function PopupView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$d());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.shows, valueToClassName(this.element, className$d(void 0, "v")));
          }
          return PopupView2;
        }();
        var PopupController = function() {
          function PopupController2(doc, config) {
            this.shows = createValue(false);
            this.viewProps = config.viewProps;
            this.view = new PopupView(doc, {
              shows: this.shows,
              viewProps: this.viewProps
            });
          }
          return PopupController2;
        }();
        function connectValues(_a) {
          var primary = _a.primary, secondary = _a.secondary, forward = _a.forward, backward = _a.backward;
          var changing = false;
          function preventFeedback(callback) {
            if (changing) {
              return;
            }
            changing = true;
            callback();
            changing = false;
          }
          primary.emitter.on("change", function() {
            preventFeedback(function() {
              secondary.rawValue = forward(primary, secondary);
            });
          });
          secondary.emitter.on("change", function() {
            preventFeedback(function() {
              primary.rawValue = backward(primary, secondary);
            });
            preventFeedback(function() {
              secondary.rawValue = forward(primary, secondary);
            });
          });
          preventFeedback(function() {
            secondary.rawValue = forward(primary, secondary);
          });
        }
        var className$c = ClassName("col");
        var ColorView = function() {
          function ColorView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$c());
            bindValue(config.expanded, valueToClassName(this.element, className$c(void 0, "expanded")));
            var headElem = doc.createElement("div");
            headElem.classList.add(className$c("h"));
            this.element.appendChild(headElem);
            var swatchElem = doc.createElement("div");
            swatchElem.classList.add(className$c("s"));
            headElem.appendChild(swatchElem);
            this.swatchElement = swatchElem;
            var textElem = doc.createElement("div");
            textElem.classList.add(className$c("t"));
            headElem.appendChild(textElem);
            this.textElement = textElem;
            if (config.pickerLayout === "inline") {
              var pickerElem = doc.createElement("div");
              pickerElem.classList.add(className$c("p"));
              this.element.appendChild(pickerElem);
              this.pickerElement = pickerElem;
            } else {
              this.pickerElement = null;
            }
          }
          return ColorView2;
        }();
        var RangeConstraint = function() {
          function RangeConstraint2(config) {
            this.maxValue = config.max;
            this.minValue = config.min;
          }
          RangeConstraint2.prototype.constrain = function(value) {
            var result = value;
            if (!isEmpty(this.minValue)) {
              result = Math.max(result, this.minValue);
            }
            if (!isEmpty(this.maxValue)) {
              result = Math.min(result, this.maxValue);
            }
            return result;
          };
          return RangeConstraint2;
        }();
        function rgbToHsl(r, g, b) {
          var rp = constrainRange(r / 255, 0, 1);
          var gp = constrainRange(g / 255, 0, 1);
          var bp = constrainRange(b / 255, 0, 1);
          var cmax = Math.max(rp, gp, bp);
          var cmin = Math.min(rp, gp, bp);
          var c = cmax - cmin;
          var h = 0;
          var s = 0;
          var l = (cmin + cmax) / 2;
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
          var _a, _b, _c, _d, _e, _f;
          var hp = (h % 360 + 360) % 360;
          var sp = constrainRange(s / 100, 0, 1);
          var lp = constrainRange(l / 100, 0, 1);
          var c = (1 - Math.abs(2 * lp - 1)) * sp;
          var x = c * (1 - Math.abs(hp / 60 % 2 - 1));
          var m = lp - c / 2;
          var rp, gp, bp;
          if (hp >= 0 && hp < 60) {
            _a = [c, x, 0], rp = _a[0], gp = _a[1], bp = _a[2];
          } else if (hp >= 60 && hp < 120) {
            _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
          } else if (hp >= 120 && hp < 180) {
            _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
          } else if (hp >= 180 && hp < 240) {
            _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
          } else if (hp >= 240 && hp < 300) {
            _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
          } else {
            _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
          }
          return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
        }
        function rgbToHsv(r, g, b) {
          var rp = constrainRange(r / 255, 0, 1);
          var gp = constrainRange(g / 255, 0, 1);
          var bp = constrainRange(b / 255, 0, 1);
          var cmax = Math.max(rp, gp, bp);
          var cmin = Math.min(rp, gp, bp);
          var d = cmax - cmin;
          var h;
          if (d === 0) {
            h = 0;
          } else if (cmax === rp) {
            h = 60 * (((gp - bp) / d % 6 + 6) % 6);
          } else if (cmax === gp) {
            h = 60 * ((bp - rp) / d + 2);
          } else {
            h = 60 * ((rp - gp) / d + 4);
          }
          var s = cmax === 0 ? 0 : d / cmax;
          var v = cmax;
          return [h, s * 100, v * 100];
        }
        function hsvToRgb(h, s, v) {
          var _a, _b, _c, _d, _e, _f;
          var hp = loopRange(h, 360);
          var sp = constrainRange(s / 100, 0, 1);
          var vp = constrainRange(v / 100, 0, 1);
          var c = vp * sp;
          var x = c * (1 - Math.abs(hp / 60 % 2 - 1));
          var m = vp - c;
          var rp, gp, bp;
          if (hp >= 0 && hp < 60) {
            _a = [c, x, 0], rp = _a[0], gp = _a[1], bp = _a[2];
          } else if (hp >= 60 && hp < 120) {
            _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
          } else if (hp >= 120 && hp < 180) {
            _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
          } else if (hp >= 180 && hp < 240) {
            _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
          } else if (hp >= 240 && hp < 300) {
            _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
          } else {
            _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
          }
          return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
        }
        function hslToHsv(h, s, l) {
          var sd = l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100);
          return [
            h,
            sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0,
            l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100)
          ];
        }
        function hsvToHsl(h, s, v) {
          var sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
          return [h, sd !== 0 ? s * v / sd : 0, v * (200 - s) / (2 * 100)];
        }
        function removeAlphaComponent(comps) {
          return [comps[0], comps[1], comps[2]];
        }
        function appendAlphaComponent(comps, alpha) {
          return [comps[0], comps[1], comps[2], alpha];
        }
        var MODE_CONVERTER_MAP = {
          hsl: {
            hsl: function(h, s, l) {
              return [h, s, l];
            },
            hsv: hslToHsv,
            rgb: hslToRgb
          },
          hsv: {
            hsl: hsvToHsl,
            hsv: function(h, s, v) {
              return [h, s, v];
            },
            rgb: hsvToRgb
          },
          rgb: {
            hsl: rgbToHsl,
            hsv: rgbToHsv,
            rgb: function(r, g, b) {
              return [r, g, b];
            }
          }
        };
        function convertColorMode(components, fromMode, toMode) {
          var _a;
          return (_a = MODE_CONVERTER_MAP[fromMode])[toMode].apply(_a, components);
        }
        var CONSTRAINT_MAP = {
          hsl: function(comps) {
            var _a;
            return [
              loopRange(comps[0], 360),
              constrainRange(comps[1], 0, 100),
              constrainRange(comps[2], 0, 100),
              constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
            ];
          },
          hsv: function(comps) {
            var _a;
            return [
              loopRange(comps[0], 360),
              constrainRange(comps[1], 0, 100),
              constrainRange(comps[2], 0, 100),
              constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
            ];
          },
          rgb: function(comps) {
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
        var Color = function() {
          function Color2(comps, mode) {
            this.mode_ = mode;
            this.comps_ = CONSTRAINT_MAP[mode](comps);
          }
          Color2.black = function() {
            return new Color2([0, 0, 0], "rgb");
          };
          Color2.fromObject = function(obj) {
            var comps = "a" in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
            return new Color2(comps, "rgb");
          };
          Color2.toRgbaObject = function(color) {
            return color.toRgbaObject();
          };
          Color2.isRgbColorObject = function(obj) {
            return isRgbColorComponent(obj, "r") && isRgbColorComponent(obj, "g") && isRgbColorComponent(obj, "b");
          };
          Color2.isRgbaColorObject = function(obj) {
            return this.isRgbColorObject(obj) && isRgbColorComponent(obj, "a");
          };
          Color2.isColorObject = function(obj) {
            return this.isRgbColorObject(obj);
          };
          Color2.equals = function(v1, v2) {
            if (v1.mode_ !== v2.mode_) {
              return false;
            }
            var comps1 = v1.comps_;
            var comps2 = v2.comps_;
            for (var i = 0; i < comps1.length; i++) {
              if (comps1[i] !== comps2[i]) {
                return false;
              }
            }
            return true;
          };
          Object.defineProperty(Color2.prototype, "mode", {
            get: function() {
              return this.mode_;
            },
            enumerable: false,
            configurable: true
          });
          Color2.prototype.getComponents = function(opt_mode) {
            return appendAlphaComponent(convertColorMode(removeAlphaComponent(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
          };
          Color2.prototype.toRgbaObject = function() {
            var rgbComps = this.getComponents("rgb");
            return {
              r: rgbComps[0],
              g: rgbComps[1],
              b: rgbComps[2],
              a: rgbComps[3]
            };
          };
          return Color2;
        }();
        var className$b = ClassName("colp");
        var ColorPickerView = function() {
          function ColorPickerView2(doc, config) {
            this.alphaViews_ = null;
            this.element = doc.createElement("div");
            this.element.classList.add(className$b());
            var hsvElem = doc.createElement("div");
            hsvElem.classList.add(className$b("hsv"));
            var svElem = doc.createElement("div");
            svElem.classList.add(className$b("sv"));
            this.svPaletteView_ = config.svPaletteView;
            svElem.appendChild(this.svPaletteView_.element);
            hsvElem.appendChild(svElem);
            var hElem = doc.createElement("div");
            hElem.classList.add(className$b("h"));
            this.hPaletteView_ = config.hPaletteView;
            hElem.appendChild(this.hPaletteView_.element);
            hsvElem.appendChild(hElem);
            this.element.appendChild(hsvElem);
            var rgbElem = doc.createElement("div");
            rgbElem.classList.add(className$b("rgb"));
            this.textView_ = config.textView;
            rgbElem.appendChild(this.textView_.element);
            this.element.appendChild(rgbElem);
            if (config.alphaViews) {
              this.alphaViews_ = {
                palette: config.alphaViews.palette,
                text: config.alphaViews.text
              };
              var aElem = doc.createElement("div");
              aElem.classList.add(className$b("a"));
              var apElem = doc.createElement("div");
              apElem.classList.add(className$b("ap"));
              apElem.appendChild(this.alphaViews_.palette.element);
              aElem.appendChild(apElem);
              var atElem = doc.createElement("div");
              atElem.classList.add(className$b("at"));
              atElem.appendChild(this.alphaViews_.text.element);
              aElem.appendChild(atElem);
              this.element.appendChild(aElem);
            }
          }
          Object.defineProperty(ColorPickerView2.prototype, "allFocusableElements", {
            get: function() {
              var elems = __spreadArrays([
                this.svPaletteView_.element,
                this.hPaletteView_.element,
                this.textView_.modeSelectElement
              ], this.textView_.textViews.map(function(v) {
                return v.inputElement;
              }));
              if (this.alphaViews_) {
                elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
              }
              return elems;
            },
            enumerable: false,
            configurable: true
          });
          return ColorPickerView2;
        }();
        function getBaseStepForColor(forAlpha) {
          return forAlpha ? 0.1 : 1;
        }
        var innerFormatter = createNumberFormatter(0);
        function formatPercentage(value) {
          return innerFormatter(value) + "%";
        }
        function parseCssNumberOrPercentage(text, maxValue) {
          var m = text.match(/^(.+)%$/);
          if (!m) {
            return Math.min(parseFloat(text), maxValue);
          }
          return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
        }
        var ANGLE_TO_DEG_MAP = {
          deg: function(angle) {
            return angle;
          },
          grad: function(angle) {
            return angle * 360 / 400;
          },
          rad: function(angle) {
            return angle * 360 / (2 * Math.PI);
          },
          turn: function(angle) {
            return angle * 360;
          }
        };
        function parseCssNumberOrAngle(text) {
          var m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
          if (!m) {
            return parseFloat(text);
          }
          var angle = parseFloat(m[1]);
          var unit = m[2];
          return ANGLE_TO_DEG_MAP[unit](angle);
        }
        var NOTATION_TO_PARSER_MAP = {
          "func.rgb": function(text) {
            var m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            var comps = [
              parseCssNumberOrPercentage(m[1], 255),
              parseCssNumberOrPercentage(m[2], 255),
              parseCssNumberOrPercentage(m[3], 255)
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
              return null;
            }
            return new Color(comps, "rgb");
          },
          "func.rgba": function(text) {
            var m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            var comps = [
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
          "func.hsl": function(text) {
            var m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            var comps = [
              parseCssNumberOrAngle(m[1]),
              parseCssNumberOrPercentage(m[2], 100),
              parseCssNumberOrPercentage(m[3], 100)
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
              return null;
            }
            return new Color(comps, "hsl");
          },
          "func.hsla": function(text) {
            var m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) {
              return null;
            }
            var comps = [
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
          "hex.rgb": function(text) {
            var mRrggbb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRrggbb) {
              return new Color([
                parseInt(mRrggbb[1] + mRrggbb[1], 16),
                parseInt(mRrggbb[2] + mRrggbb[2], 16),
                parseInt(mRrggbb[3] + mRrggbb[3], 16)
              ], "rgb");
            }
            var mRgb = text.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRgb) {
              return new Color([parseInt(mRgb[1], 16), parseInt(mRgb[2], 16), parseInt(mRgb[3], 16)], "rgb");
            }
            return null;
          },
          "hex.rgba": function(text) {
            var mRrggbb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRrggbb) {
              return new Color([
                parseInt(mRrggbb[1] + mRrggbb[1], 16),
                parseInt(mRrggbb[2] + mRrggbb[2], 16),
                parseInt(mRrggbb[3] + mRrggbb[3], 16),
                mapRange(parseInt(mRrggbb[4] + mRrggbb[4], 16), 0, 255, 0, 1)
              ], "rgb");
            }
            var mRgb = text.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
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
          var notations = Object.keys(NOTATION_TO_PARSER_MAP);
          return notations.reduce(function(result, notation) {
            if (result) {
              return result;
            }
            var subparser = NOTATION_TO_PARSER_MAP[notation];
            return subparser(text) ? notation : null;
          }, null);
        }
        var CompositeColorParser = function(text) {
          var notation = getColorNotation(text);
          return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
        };
        function hasAlphaComponent(notation) {
          return notation === "func.hsla" || notation === "func.rgba" || notation === "hex.rgba";
        }
        function colorFromString(value) {
          if (typeof value === "string") {
            var cv = CompositeColorParser(value);
            if (cv) {
              return cv;
            }
          }
          return Color.black();
        }
        function zerofill(comp) {
          var hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        }
        function colorToHexRgbString(value) {
          var hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
          return "#" + hexes;
        }
        function colorToHexRgbaString(value) {
          var rgbaComps = value.getComponents("rgb");
          var hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
          return "#" + hexes;
        }
        function colorToFunctionalRgbString(value) {
          var formatter = createNumberFormatter(0);
          var comps = removeAlphaComponent(value.getComponents("rgb")).map(function(comp) {
            return formatter(comp);
          });
          return "rgb(" + comps.join(", ") + ")";
        }
        function colorToFunctionalRgbaString(value) {
          var aFormatter = createNumberFormatter(2);
          var rgbFormatter = createNumberFormatter(0);
          var comps = value.getComponents("rgb").map(function(comp, index) {
            var formatter = index === 3 ? aFormatter : rgbFormatter;
            return formatter(comp);
          });
          return "rgba(" + comps.join(", ") + ")";
        }
        function colorToFunctionalHslString(value) {
          var formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage
          ];
          var comps = removeAlphaComponent(value.getComponents("hsl")).map(function(comp, index) {
            return formatters[index](comp);
          });
          return "hsl(" + comps.join(", ") + ")";
        }
        function colorToFunctionalHslaString(value) {
          var formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage,
            createNumberFormatter(2)
          ];
          var comps = value.getComponents("hsl").map(function(comp, index) {
            return formatters[index](comp);
          });
          return "hsla(" + comps.join(", ") + ")";
        }
        var NOTATION_TO_STRINGIFIER_MAP = {
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
        var className$a = ClassName("apl");
        var APaletteView = function() {
          function APaletteView2(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$a());
            config.viewProps.bindTabIndex(this.element);
            var barElem = doc.createElement("div");
            barElem.classList.add(className$a("b"));
            this.element.appendChild(barElem);
            var colorElem = doc.createElement("div");
            colorElem.classList.add(className$a("c"));
            barElem.appendChild(colorElem);
            this.colorElem_ = colorElem;
            var markerElem = doc.createElement("div");
            markerElem.classList.add(className$a("m"));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            var previewElem = doc.createElement("div");
            previewElem.classList.add(className$a("p"));
            this.markerElem_.appendChild(previewElem);
            this.previewElem_ = previewElem;
            this.update_();
          }
          APaletteView2.prototype.update_ = function() {
            var c = this.value.rawValue;
            var rgbaComps = c.getComponents("rgb");
            var leftColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], "rgb");
            var rightColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], "rgb");
            var gradientComps = [
              "to right",
              colorToFunctionalRgbaString(leftColor),
              colorToFunctionalRgbaString(rightColor)
            ];
            this.colorElem_.style.background = "linear-gradient(" + gradientComps.join(",") + ")";
            this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
            var left = mapRange(rgbaComps[3], 0, 1, 0, 100);
            this.markerElem_.style.left = left + "%";
          };
          APaletteView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          return APaletteView2;
        }();
        var APaletteController = function() {
          function APaletteController2(doc, config) {
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
          APaletteController2.prototype.handlePointerEvent_ = function(d) {
            if (!d.point) {
              return;
            }
            var alpha = d.point.x / d.bounds.width;
            var c = this.value.rawValue;
            var _a = c.getComponents("hsv"), h = _a[0], s = _a[1], v = _a[2];
            this.value.rawValue = new Color([h, s, v, alpha], "hsv");
          };
          APaletteController2.prototype.onPointerDown_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          APaletteController2.prototype.onPointerMove_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          APaletteController2.prototype.onPointerUp_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          APaletteController2.prototype.onKeyDown_ = function(ev) {
            var step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            var c = this.value.rawValue;
            var _a = c.getComponents("hsv"), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
            this.value.rawValue = new Color([h, s, v, a + step], "hsv");
          };
          return APaletteController2;
        }();
        var className$9 = ClassName("coltxt");
        function createModeSelectElement(doc) {
          var selectElem = doc.createElement("select");
          var items = [
            {text: "RGB", value: "rgb"},
            {text: "HSL", value: "hsl"},
            {text: "HSV", value: "hsv"}
          ];
          selectElem.appendChild(items.reduce(function(frag, item) {
            var optElem = doc.createElement("option");
            optElem.textContent = item.text;
            optElem.value = item.value;
            frag.appendChild(optElem);
            return frag;
          }, doc.createDocumentFragment()));
          return selectElem;
        }
        var ColorTextView = function() {
          function ColorTextView2(doc, config) {
            var _this = this;
            this.element = doc.createElement("div");
            this.element.classList.add(className$9());
            var modeElem = doc.createElement("div");
            modeElem.classList.add(className$9("m"));
            this.modeElem_ = createModeSelectElement(doc);
            this.modeElem_.classList.add(className$9("ms"));
            modeElem.appendChild(this.modeSelectElement);
            var modeMarkerElem = doc.createElement("div");
            modeMarkerElem.classList.add(className$9("mm"));
            modeMarkerElem.appendChild(createSvgIconElement(doc, "dropdown"));
            modeElem.appendChild(modeMarkerElem);
            this.element.appendChild(modeElem);
            var textsElem = doc.createElement("div");
            textsElem.classList.add(className$9("w"));
            this.element.appendChild(textsElem);
            this.textsElem_ = textsElem;
            this.textViews_ = config.textViews;
            this.applyTextViews_();
            bindValue(config.colorMode, function(mode) {
              _this.modeElem_.value = mode;
            });
          }
          Object.defineProperty(ColorTextView2.prototype, "modeSelectElement", {
            get: function() {
              return this.modeElem_;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(ColorTextView2.prototype, "textViews", {
            get: function() {
              return this.textViews_;
            },
            set: function(textViews) {
              this.textViews_ = textViews;
              this.applyTextViews_();
            },
            enumerable: false,
            configurable: true
          });
          ColorTextView2.prototype.applyTextViews_ = function() {
            var _this = this;
            removeChildElements(this.textsElem_);
            var doc = this.element.ownerDocument;
            this.textViews_.forEach(function(v) {
              var compElem = doc.createElement("div");
              compElem.classList.add(className$9("c"));
              compElem.appendChild(v.element);
              _this.textsElem_.appendChild(compElem);
            });
          };
          return ColorTextView2;
        }();
        var FORMATTER = createNumberFormatter(0);
        var MODE_TO_CONSTRAINT_MAP = {
          rgb: function() {
            return new RangeConstraint({min: 0, max: 255});
          },
          hsl: function(index) {
            return index === 0 ? new RangeConstraint({min: 0, max: 360}) : new RangeConstraint({min: 0, max: 100});
          },
          hsv: function(index) {
            return index === 0 ? new RangeConstraint({min: 0, max: 360}) : new RangeConstraint({min: 0, max: 100});
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
        var ColorTextController = function() {
          function ColorTextController2(doc, config) {
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
          ColorTextController2.prototype.createComponentControllers_ = function(doc) {
            var _this = this;
            var cc = {
              colorMode: this.colorMode.rawValue,
              parser: this.parser_,
              viewProps: this.viewProps
            };
            var ccs = [
              createComponentController(doc, cc, 0),
              createComponentController(doc, cc, 1),
              createComponentController(doc, cc, 2)
            ];
            ccs.forEach(function(cs, index) {
              connectValues({
                primary: _this.value,
                secondary: cs.value,
                forward: function(p) {
                  return p.rawValue.getComponents(_this.colorMode.rawValue)[index];
                },
                backward: function(p, s) {
                  var pickedMode = _this.colorMode.rawValue;
                  var comps = p.rawValue.getComponents(pickedMode);
                  comps[index] = s.rawValue;
                  return new Color(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode);
                }
              });
            });
            return ccs;
          };
          ColorTextController2.prototype.onModeSelectChange_ = function(ev) {
            var selectElem = ev.currentTarget;
            this.colorMode.rawValue = selectElem.value;
            this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
            this.view.textViews = [
              this.ccs_[0].view,
              this.ccs_[1].view,
              this.ccs_[2].view
            ];
          };
          return ColorTextController2;
        }();
        var className$8 = ClassName("hpl");
        var HPaletteView = function() {
          function HPaletteView2(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$8());
            config.viewProps.bindTabIndex(this.element);
            var colorElem = doc.createElement("div");
            colorElem.classList.add(className$8("c"));
            this.element.appendChild(colorElem);
            var markerElem = doc.createElement("div");
            markerElem.classList.add(className$8("m"));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
          }
          HPaletteView2.prototype.update_ = function() {
            var c = this.value.rawValue;
            var h = c.getComponents("hsv")[0];
            this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color([h, 100, 100], "hsv"));
            var left = mapRange(h, 0, 360, 0, 100);
            this.markerElem_.style.left = left + "%";
          };
          HPaletteView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          return HPaletteView2;
        }();
        var HPaletteController = function() {
          function HPaletteController2(doc, config) {
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
          HPaletteController2.prototype.handlePointerEvent_ = function(d) {
            if (!d.point) {
              return;
            }
            var hue = mapRange(d.point.x, 0, d.bounds.width, 0, 360);
            var c = this.value.rawValue;
            var _a = c.getComponents("hsv"), s = _a[1], v = _a[2], a = _a[3];
            this.value.rawValue = new Color([hue, s, v, a], "hsv");
          };
          HPaletteController2.prototype.onPointerDown_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          HPaletteController2.prototype.onPointerMove_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          HPaletteController2.prototype.onPointerUp_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          HPaletteController2.prototype.onKeyDown_ = function(ev) {
            var step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            var c = this.value.rawValue;
            var _a = c.getComponents("hsv"), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
            this.value.rawValue = new Color([h + step, s, v, a], "hsv");
          };
          return HPaletteController2;
        }();
        var className$7 = ClassName("svp");
        var CANVAS_RESOL = 64;
        var SvPaletteView = function() {
          function SvPaletteView2(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on("change", this.onValueChange_);
            this.element = doc.createElement("div");
            this.element.classList.add(className$7());
            config.viewProps.bindTabIndex(this.element);
            var canvasElem = doc.createElement("canvas");
            canvasElem.height = CANVAS_RESOL;
            canvasElem.width = CANVAS_RESOL;
            canvasElem.classList.add(className$7("c"));
            this.element.appendChild(canvasElem);
            this.canvasElement = canvasElem;
            var markerElem = doc.createElement("div");
            markerElem.classList.add(className$7("m"));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
          }
          SvPaletteView2.prototype.update_ = function() {
            var ctx = getCanvasContext(this.canvasElement);
            if (!ctx) {
              return;
            }
            var c = this.value.rawValue;
            var hsvComps = c.getComponents("hsv");
            var width = this.canvasElement.width;
            var height = this.canvasElement.height;
            var imgData = ctx.getImageData(0, 0, width, height);
            var data = imgData.data;
            for (var iy = 0; iy < height; iy++) {
              for (var ix = 0; ix < width; ix++) {
                var s = mapRange(ix, 0, width, 0, 100);
                var v = mapRange(iy, 0, height, 100, 0);
                var rgbComps = hsvToRgb(hsvComps[0], s, v);
                var i = (iy * width + ix) * 4;
                data[i] = rgbComps[0];
                data[i + 1] = rgbComps[1];
                data[i + 2] = rgbComps[2];
                data[i + 3] = 255;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            var left = mapRange(hsvComps[1], 0, 100, 0, 100);
            this.markerElem_.style.left = left + "%";
            var top = mapRange(hsvComps[2], 0, 100, 100, 0);
            this.markerElem_.style.top = top + "%";
          };
          SvPaletteView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          return SvPaletteView2;
        }();
        var SvPaletteController = function() {
          function SvPaletteController2(doc, config) {
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
          SvPaletteController2.prototype.handlePointerEvent_ = function(d) {
            if (!d.point) {
              return;
            }
            var saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
            var value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
            var _a = this.value.rawValue.getComponents("hsv"), h = _a[0], a = _a[3];
            this.value.rawValue = new Color([h, saturation, value, a], "hsv");
          };
          SvPaletteController2.prototype.onPointerDown_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          SvPaletteController2.prototype.onPointerMove_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          SvPaletteController2.prototype.onPointerUp_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          SvPaletteController2.prototype.onKeyDown_ = function(ev) {
            if (isArrowKey(ev.key)) {
              ev.preventDefault();
            }
            var _a = this.value.rawValue.getComponents("hsv"), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
            var baseStep = getBaseStepForColor(false);
            this.value.rawValue = new Color([
              h,
              s + getStepForKey(baseStep, getHorizontalStepKeys(ev)),
              v + getStepForKey(baseStep, getVerticalStepKeys(ev)),
              a
            ], "hsv");
          };
          return SvPaletteController2;
        }();
        var ColorPickerController = function() {
          function ColorPickerController2(doc, config) {
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
                  constraint: new RangeConstraint({min: 0, max: 1})
                }),
                viewProps: this.viewProps
              })
            } : null;
            if (this.alphaIcs_) {
              connectValues({
                primary: this.value,
                secondary: this.alphaIcs_.text.value,
                forward: function(p) {
                  return p.rawValue.getComponents()[3];
                },
                backward: function(p, s) {
                  var comps = p.rawValue.getComponents();
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
          Object.defineProperty(ColorPickerController2.prototype, "textController", {
            get: function() {
              return this.textC_;
            },
            enumerable: false,
            configurable: true
          });
          return ColorPickerController2;
        }();
        var className$6 = ClassName("colsw");
        var ColorSwatchView = function() {
          function ColorSwatchView2(doc, config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            config.value.emitter.on("change", this.onValueChange_);
            this.value = config.value;
            this.element = doc.createElement("div");
            this.element.classList.add(className$6());
            config.viewProps.bindClassModifiers(this.element);
            var swatchElem = doc.createElement("div");
            swatchElem.classList.add(className$6("sw"));
            this.element.appendChild(swatchElem);
            this.swatchElem_ = swatchElem;
            var buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$6("b"));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            this.update_();
          }
          ColorSwatchView2.prototype.update_ = function() {
            var value = this.value.rawValue;
            this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
          };
          ColorSwatchView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          return ColorSwatchView2;
        }();
        var ColorSwatchController = function() {
          function ColorSwatchController2(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new ColorSwatchView(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
          }
          return ColorSwatchController2;
        }();
        var ColorController = function() {
          function ColorController2(doc, config) {
            var _this = this;
            this.onButtonBlur_ = this.onButtonBlur_.bind(this);
            this.onButtonClick_ = this.onButtonClick_.bind(this);
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = createFoldable(config.expanded);
            this.swatchC_ = new ColorSwatchController(doc, {
              value: this.value,
              viewProps: this.viewProps
            });
            var buttonElem = this.swatchC_.view.buttonElement;
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
              expanded: this.foldable_.value("expanded"),
              pickerLayout: config.pickerLayout
            });
            this.view.swatchElement.appendChild(this.swatchC_.view.element);
            this.view.textElement.appendChild(this.textC_.view.element);
            this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
              viewProps: this.viewProps
            }) : null;
            var pickerC = new ColorPickerController(doc, {
              supportsAlpha: config.supportsAlpha,
              value: this.value,
              viewProps: this.viewProps
            });
            pickerC.view.allFocusableElements.forEach(function(elem) {
              elem.addEventListener("blur", _this.onPopupChildBlur_);
              elem.addEventListener("keydown", _this.onPopupChildKeydown_);
            });
            this.pickerC_ = pickerC;
            if (this.popC_) {
              this.view.element.appendChild(this.popC_.view.element);
              this.popC_.view.element.appendChild(pickerC.view.element);
              connectValues({
                primary: this.foldable_.value("expanded"),
                secondary: this.popC_.shows,
                forward: function(p) {
                  return p.rawValue;
                },
                backward: function(_, s) {
                  return s.rawValue;
                }
              });
            } else if (this.view.pickerElement) {
              this.view.pickerElement.appendChild(this.pickerC_.view.element);
              bindFoldable(this.foldable_, this.view.pickerElement);
            }
          }
          Object.defineProperty(ColorController2.prototype, "textController", {
            get: function() {
              return this.textC_;
            },
            enumerable: false,
            configurable: true
          });
          ColorController2.prototype.onButtonBlur_ = function(e) {
            if (!this.popC_) {
              return;
            }
            var elem = this.view.element;
            var nextTarget = forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
              this.popC_.shows.rawValue = false;
            }
          };
          ColorController2.prototype.onButtonClick_ = function() {
            this.foldable_.set("expanded", !this.foldable_.get("expanded"));
            if (this.foldable_.get("expanded")) {
              this.pickerC_.view.allFocusableElements[0].focus();
            }
          };
          ColorController2.prototype.onPopupChildBlur_ = function(ev) {
            if (!this.popC_) {
              return;
            }
            var elem = this.popC_.view.element;
            var nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
              return;
            }
            if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
              return;
            }
            this.popC_.shows.rawValue = false;
          };
          ColorController2.prototype.onPopupChildKeydown_ = function(ev) {
            if (this.popC_) {
              if (ev.key === "Escape") {
                this.popC_.shows.rawValue = false;
              }
            } else if (this.view.pickerElement) {
              if (ev.key === "Escape") {
                this.swatchC_.view.buttonElement.focus();
              }
            }
          };
          return ColorController2;
        }();
        function colorFromObject(value) {
          if (Color.isColorObject(value)) {
            return Color.fromObject(value);
          }
          return Color.black();
        }
        function colorToRgbNumber(value) {
          return removeAlphaComponent(value.getComponents("rgb")).reduce(function(result, comp) {
            return result << 8 | Math.floor(comp) & 255;
          }, 0);
        }
        function colorToRgbaNumber(value) {
          return value.getComponents("rgb").reduce(function(result, comp, index) {
            var hex = Math.floor(index === 3 ? comp * 255 : comp) & 255;
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
          var stringify = getColorStringifier(notation);
          return function(target, value) {
            writePrimitive(target, stringify(value));
          };
        }
        function createColorNumberWriter(supportsAlpha) {
          var colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
          return function(target, value) {
            writePrimitive(target, colorToNumber(value));
          };
        }
        function writeRgbaColorObject(target, value) {
          var obj = value.toRgbaObject();
          target.writeProperty("r", obj.r);
          target.writeProperty("g", obj.g);
          target.writeProperty("b", obj.b);
          target.writeProperty("a", obj.a);
        }
        function writeRgbColorObject(target, value) {
          var obj = value.toRgbaObject();
          target.writeProperty("r", obj.r);
          target.writeProperty("g", obj.g);
          target.writeProperty("b", obj.b);
        }
        function createColorObjectWriter(supportsAlpha) {
          return supportsAlpha ? writeRgbaColorObject : writeRgbColorObject;
        }
        function shouldSupportAlpha$1(inputParams) {
          return "input" in inputParams && inputParams.input === "color.rgba";
        }
        var NumberColorInputPlugin = {
          id: "input-color-number",
          accept: function(value, params) {
            if (typeof value !== "number") {
              return null;
            }
            if (!("input" in params)) {
              return null;
            }
            if (params.input !== "color" && params.input !== "color.rgb" && params.input !== "color.rgba") {
              return null;
            }
            return value;
          },
          binding: {
            reader: function(args) {
              return shouldSupportAlpha$1(args.params) ? colorFromRgbaNumber : colorFromRgbNumber;
            },
            equals: Color.equals,
            writer: function(args) {
              return createColorNumberWriter(shouldSupportAlpha$1(args.params));
            }
          },
          controller: function(args) {
            var supportsAlpha = shouldSupportAlpha$1(args.params);
            var expanded = "expanded" in args.params ? args.params.expanded : void 0;
            var picker = "picker" in args.params ? args.params.picker : void 0;
            var formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
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
        var ObjectColorInputPlugin = {
          id: "input-color-object",
          accept: function(value, _params) {
            return Color.isColorObject(value) ? value : null;
          },
          binding: {
            reader: function(_args) {
              return colorFromObject;
            },
            equals: Color.equals,
            writer: function(args) {
              return createColorObjectWriter(shouldSupportAlpha(args.initialValue));
            }
          },
          controller: function(args) {
            var supportsAlpha = Color.isRgbaColorObject(args.initialValue);
            var expanded = "expanded" in args.params ? args.params.expanded : void 0;
            var picker = "picker" in args.params ? args.params.picker : void 0;
            var formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
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
        var StringColorInputPlugin = {
          id: "input-color-string",
          accept: function(value, params) {
            if (typeof value !== "string") {
              return null;
            }
            if ("input" in params && params.input === "string") {
              return null;
            }
            var notation = getColorNotation(value);
            if (!notation) {
              return null;
            }
            return value;
          },
          binding: {
            reader: function(_args) {
              return colorFromString;
            },
            equals: Color.equals,
            writer: function(args) {
              var notation = getColorNotation(args.initialValue);
              if (!notation) {
                throw TpError.shouldNeverHappen();
              }
              return createColorStringWriter(notation);
            }
          },
          controller: function(args) {
            var notation = getColorNotation(args.initialValue);
            if (!notation) {
              throw TpError.shouldNeverHappen();
            }
            var stringifier = getColorStringifier(notation);
            var expanded = "expanded" in args.params ? args.params.expanded : void 0;
            var picker = "picker" in args.params ? args.params.picker : void 0;
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
          var constraints = [];
          var sc = createStepConstraint(params);
          if (sc) {
            constraints.push(sc);
          }
          var rc = createRangeConstraint(params);
          if (rc) {
            constraints.push(rc);
          }
          var lc = createListConstraint(params);
          if (lc) {
            constraints.push(lc);
          }
          return new CompositeConstraint(constraints);
        }
        function findRange(constraint) {
          var c = constraint ? findConstraint(constraint, RangeConstraint) : null;
          if (!c) {
            return [void 0, void 0];
          }
          return [c.minValue, c.maxValue];
        }
        function estimateSuitableRange(constraint) {
          var _a = findRange(constraint), min = _a[0], max = _a[1];
          return [min !== null && min !== void 0 ? min : 0, max !== null && max !== void 0 ? max : 100];
        }
        var NumberInputPlugin = {
          id: "input-number",
          accept: function(value) {
            return typeof value === "number" ? value : null;
          },
          binding: {
            reader: function(_args) {
              return numberFromUnknown;
            },
            constraint: function(args) {
              return createConstraint$4(args.params);
            },
            writer: function(_args) {
              return writePrimitive;
            }
          },
          controller: function(args) {
            var _a, _b;
            var value = args.value;
            var c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) {
              return new ListController(args.document, {
                props: ValueMap.fromObject({
                  options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value,
                viewProps: args.viewProps
              });
            }
            var formatter = (_b = "format" in args.params ? args.params.format : void 0) !== null && _b !== void 0 ? _b : createNumberFormatter(getSuitableDecimalDigits(c, value.rawValue));
            if (c && findConstraint(c, RangeConstraint)) {
              var _c = estimateSuitableRange(c), min = _c[0], max = _c[1];
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
        var PointNdConstraint = function() {
          function PointNdConstraint2(config) {
            this.components = config.components;
            this.asm_ = config.assembly;
          }
          PointNdConstraint2.prototype.constrain = function(value) {
            var _this = this;
            var comps = this.asm_.toComponents(value).map(function(comp, index) {
              var _a, _b;
              return (_b = (_a = _this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
            });
            return this.asm_.fromComponents(comps);
          };
          return PointNdConstraint2;
        }();
        var className$5 = ClassName("pndtxt");
        var PointNdTextView = function() {
          function PointNdTextView2(doc, config) {
            var _this = this;
            this.textViews = config.textViews;
            this.element = doc.createElement("div");
            this.element.classList.add(className$5());
            this.textViews.forEach(function(v) {
              var axisElem = doc.createElement("div");
              axisElem.classList.add(className$5("a"));
              axisElem.appendChild(v.element);
              _this.element.appendChild(axisElem);
            });
          }
          return PointNdTextView2;
        }();
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
        var PointNdTextController = function() {
          function PointNdTextController2(doc, config) {
            var _this = this;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.acs_ = config.axes.map(function(_, index) {
              return createAxisController(doc, config, index);
            });
            this.acs_.forEach(function(c, index) {
              connectValues({
                primary: _this.value,
                secondary: c.value,
                forward: function(p) {
                  return config.assembly.toComponents(p.rawValue)[index];
                },
                backward: function(p, s) {
                  var comps = config.assembly.toComponents(p.rawValue);
                  comps[index] = s.rawValue;
                  return config.assembly.fromComponents(comps);
                }
              });
            });
            this.view = new PointNdTextView(doc, {
              textViews: this.acs_.map(function(ac) {
                return ac.view;
              })
            });
          }
          return PointNdTextController2;
        }();
        var Point2d = function() {
          function Point2d2(x, y) {
            if (x === void 0) {
              x = 0;
            }
            if (y === void 0) {
              y = 0;
            }
            this.x = x;
            this.y = y;
          }
          Point2d2.prototype.getComponents = function() {
            return [this.x, this.y];
          };
          Point2d2.isObject = function(obj) {
            if (isEmpty(obj)) {
              return false;
            }
            var x = obj.x;
            var y = obj.y;
            if (typeof x !== "number" || typeof y !== "number") {
              return false;
            }
            return true;
          };
          Point2d2.equals = function(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y;
          };
          Point2d2.prototype.toObject = function() {
            return {
              x: this.x,
              y: this.y
            };
          };
          return Point2d2;
        }();
        var Point2dAssembly = {
          toComponents: function(p) {
            return p.getComponents();
          },
          fromComponents: function(comps) {
            return new (Point2d.bind.apply(Point2d, __spreadArrays([void 0], comps)))();
          }
        };
        var className$4 = ClassName("p2d");
        var Point2dView = function() {
          function Point2dView2(doc, config) {
            this.element = doc.createElement("div");
            this.element.classList.add(className$4());
            config.viewProps.bindClassModifiers(this.element);
            bindValue(config.expanded, valueToClassName(this.element, className$4(void 0, "expanded")));
            var headElem = doc.createElement("div");
            headElem.classList.add(className$4("h"));
            this.element.appendChild(headElem);
            var buttonElem = doc.createElement("button");
            buttonElem.classList.add(className$4("b"));
            buttonElem.appendChild(createSvgIconElement(doc, "p2dpad"));
            config.viewProps.bindDisabled(buttonElem);
            headElem.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            var textElem = doc.createElement("div");
            textElem.classList.add(className$4("t"));
            headElem.appendChild(textElem);
            this.textElement = textElem;
            if (config.pickerLayout === "inline") {
              var pickerElem = doc.createElement("div");
              pickerElem.classList.add(className$4("p"));
              this.element.appendChild(pickerElem);
              this.pickerElement = pickerElem;
            } else {
              this.pickerElement = null;
            }
          }
          return Point2dView2;
        }();
        var className$3 = ClassName("p2dp");
        var Point2dPickerView = function() {
          function Point2dPickerView2(doc, config) {
            this.onFoldableChange_ = this.onFoldableChange_.bind(this);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.invertsY_ = config.invertsY;
            this.maxValue_ = config.maxValue;
            this.element = doc.createElement("div");
            this.element.classList.add(className$3());
            if (config.layout === "popup") {
              this.element.classList.add(className$3(void 0, "p"));
            }
            var padElem = doc.createElement("div");
            padElem.classList.add(className$3("p"));
            config.viewProps.bindTabIndex(padElem);
            this.element.appendChild(padElem);
            this.padElement = padElem;
            var svgElem = doc.createElementNS(SVG_NS, "svg");
            svgElem.classList.add(className$3("g"));
            this.padElement.appendChild(svgElem);
            this.svgElem_ = svgElem;
            var xAxisElem = doc.createElementNS(SVG_NS, "line");
            xAxisElem.classList.add(className$3("ax"));
            xAxisElem.setAttributeNS(null, "x1", "0");
            xAxisElem.setAttributeNS(null, "y1", "50%");
            xAxisElem.setAttributeNS(null, "x2", "100%");
            xAxisElem.setAttributeNS(null, "y2", "50%");
            this.svgElem_.appendChild(xAxisElem);
            var yAxisElem = doc.createElementNS(SVG_NS, "line");
            yAxisElem.classList.add(className$3("ax"));
            yAxisElem.setAttributeNS(null, "x1", "50%");
            yAxisElem.setAttributeNS(null, "y1", "0");
            yAxisElem.setAttributeNS(null, "x2", "50%");
            yAxisElem.setAttributeNS(null, "y2", "100%");
            this.svgElem_.appendChild(yAxisElem);
            var lineElem = doc.createElementNS(SVG_NS, "line");
            lineElem.classList.add(className$3("l"));
            lineElem.setAttributeNS(null, "x1", "50%");
            lineElem.setAttributeNS(null, "y1", "50%");
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            var markerElem = doc.createElement("div");
            markerElem.classList.add(className$3("m"));
            this.padElement.appendChild(markerElem);
            this.markerElem_ = markerElem;
            config.value.emitter.on("change", this.onValueChange_);
            this.value = config.value;
            this.update_();
          }
          Object.defineProperty(Point2dPickerView2.prototype, "allFocusableElements", {
            get: function() {
              return [this.padElement];
            },
            enumerable: false,
            configurable: true
          });
          Point2dPickerView2.prototype.update_ = function() {
            var _a = this.value.rawValue.getComponents(), x = _a[0], y = _a[1];
            var max = this.maxValue_;
            var px = mapRange(x, -max, +max, 0, 100);
            var py = mapRange(y, -max, +max, 0, 100);
            var ipy = this.invertsY_ ? 100 - py : py;
            this.lineElem_.setAttributeNS(null, "x2", px + "%");
            this.lineElem_.setAttributeNS(null, "y2", ipy + "%");
            this.markerElem_.style.left = px + "%";
            this.markerElem_.style.top = ipy + "%";
          };
          Point2dPickerView2.prototype.onValueChange_ = function() {
            this.update_();
          };
          Point2dPickerView2.prototype.onFoldableChange_ = function() {
            this.update_();
          };
          return Point2dPickerView2;
        }();
        var Point2dPickerController = function() {
          function Point2dPickerController2(doc, config) {
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
          Point2dPickerController2.prototype.handlePointerEvent_ = function(d) {
            if (!d.point) {
              return;
            }
            var max = this.maxValue_;
            var px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
            var py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
            this.value.rawValue = new Point2d(px, py);
          };
          Point2dPickerController2.prototype.onPointerDown_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          Point2dPickerController2.prototype.onPointerMove_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          Point2dPickerController2.prototype.onPointerUp_ = function(ev) {
            this.handlePointerEvent_(ev.data);
          };
          Point2dPickerController2.prototype.onPadKeyDown_ = function(ev) {
            if (isArrowKey(ev.key)) {
              ev.preventDefault();
            }
            this.value.rawValue = new Point2d(this.value.rawValue.x + getStepForKey(this.baseSteps_[0], getHorizontalStepKeys(ev)), this.value.rawValue.y + getStepForKey(this.baseSteps_[1], getVerticalStepKeys(ev)) * (this.invertsY_ ? 1 : -1));
          };
          return Point2dPickerController2;
        }();
        var Point2dController = function() {
          function Point2dController2(doc, config) {
            var _this = this;
            var _a, _b;
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
            this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = createFoldable(config.expanded);
            this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
              viewProps: this.viewProps
            }) : null;
            var padC = new Point2dPickerController(doc, {
              baseSteps: [config.axes[0].baseStep, config.axes[1].baseStep],
              invertsY: config.invertsY,
              layout: config.pickerLayout,
              maxValue: config.maxValue,
              value: this.value,
              viewProps: this.viewProps
            });
            padC.view.allFocusableElements.forEach(function(elem) {
              elem.addEventListener("blur", _this.onPopupChildBlur_);
              elem.addEventListener("keydown", _this.onPopupChildKeydown_);
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
                forward: function(p) {
                  return p.rawValue;
                },
                backward: function(_, s) {
                  return s.rawValue;
                }
              });
            } else if (this.view.pickerElement) {
              this.view.pickerElement.appendChild(this.pickerC_.view.element);
              bindFoldable(this.foldable_, this.view.pickerElement);
            }
          }
          Point2dController2.prototype.onPadButtonBlur_ = function(e) {
            if (!this.popC_) {
              return;
            }
            var elem = this.view.element;
            var nextTarget = forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
              this.popC_.shows.rawValue = false;
            }
          };
          Point2dController2.prototype.onPadButtonClick_ = function() {
            this.foldable_.set("expanded", !this.foldable_.get("expanded"));
            if (this.foldable_.get("expanded")) {
              this.pickerC_.view.allFocusableElements[0].focus();
            }
          };
          Point2dController2.prototype.onPopupChildBlur_ = function(ev) {
            if (!this.popC_) {
              return;
            }
            var elem = this.popC_.view.element;
            var nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
              return;
            }
            if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
              return;
            }
            this.popC_.shows.rawValue = false;
          };
          Point2dController2.prototype.onPopupChildKeydown_ = function(ev) {
            if (this.popC_) {
              if (ev.key === "Escape") {
                this.popC_.shows.rawValue = false;
              }
            } else if (this.view.pickerElement) {
              if (ev.key === "Escape") {
                this.view.buttonElement.focus();
              }
            }
          };
          return Point2dController2;
        }();
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
          var constraints = [];
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
          var rc = constraint && findConstraint(constraint, RangeConstraint);
          if (rc) {
            return Math.max(Math.abs(rc.minValue || 0), Math.abs(rc.maxValue || 0));
          }
          var step = getBaseStep(constraint);
          return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
        }
        function getSuitableMaxValue(initialValue, constraint) {
          var xc = constraint instanceof PointNdConstraint ? constraint.components[0] : void 0;
          var yc = constraint instanceof PointNdConstraint ? constraint.components[1] : void 0;
          var xr = getSuitableMaxDimensionValue(xc, initialValue.x);
          var yr = getSuitableMaxDimensionValue(yc, initialValue.y);
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
          var yParams = params.y;
          if (!yParams) {
            return false;
          }
          return "inverted" in yParams ? !!yParams.inverted : false;
        }
        var Point2dInputPlugin = {
          id: "input-point2d",
          accept: function(value, _params) {
            return Point2d.isObject(value) ? value : null;
          },
          binding: {
            reader: function(_args) {
              return point2dFromUnknown;
            },
            constraint: function(args) {
              return createConstraint$3(args.params);
            },
            equals: Point2d.equals,
            writer: function(_args) {
              return writePoint2d;
            }
          },
          controller: function(args) {
            var doc = args.document;
            var value = args.value;
            var c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
              throw TpError.shouldNeverHappen();
            }
            var expanded = "expanded" in args.params ? args.params.expanded : void 0;
            var picker = "picker" in args.params ? args.params.picker : void 0;
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
        var Point3d = function() {
          function Point3d2(x, y, z) {
            if (x === void 0) {
              x = 0;
            }
            if (y === void 0) {
              y = 0;
            }
            if (z === void 0) {
              z = 0;
            }
            this.x = x;
            this.y = y;
            this.z = z;
          }
          Point3d2.prototype.getComponents = function() {
            return [this.x, this.y, this.z];
          };
          Point3d2.isObject = function(obj) {
            if (isEmpty(obj)) {
              return false;
            }
            var x = obj.x;
            var y = obj.y;
            var z = obj.z;
            if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
              return false;
            }
            return true;
          };
          Point3d2.equals = function(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
          };
          Point3d2.prototype.toObject = function() {
            return {
              x: this.x,
              y: this.y,
              z: this.z
            };
          };
          return Point3d2;
        }();
        var Point3dAssembly = {
          toComponents: function(p) {
            return p.getComponents();
          },
          fromComponents: function(comps) {
            return new (Point3d.bind.apply(Point3d, __spreadArrays([void 0], comps)))();
          }
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
          var constraints = [];
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
        var Point3dInputPlugin = {
          id: "input-point3d",
          accept: function(value, _params) {
            return Point3d.isObject(value) ? value : null;
          },
          binding: {
            reader: function(_args) {
              return point3dFromUnknown;
            },
            constraint: function(args) {
              return createConstraint$2(args.params);
            },
            equals: Point3d.equals,
            writer: function(_args) {
              return writePoint3d;
            }
          },
          controller: function(args) {
            var value = args.value;
            var c = args.constraint;
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
        var Point4d = function() {
          function Point4d2(x, y, z, w) {
            if (x === void 0) {
              x = 0;
            }
            if (y === void 0) {
              y = 0;
            }
            if (z === void 0) {
              z = 0;
            }
            if (w === void 0) {
              w = 0;
            }
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
          }
          Point4d2.prototype.getComponents = function() {
            return [this.x, this.y, this.z, this.w];
          };
          Point4d2.isObject = function(obj) {
            if (isEmpty(obj)) {
              return false;
            }
            var x = obj.x;
            var y = obj.y;
            var z = obj.z;
            var w = obj.w;
            if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number" || typeof w !== "number") {
              return false;
            }
            return true;
          };
          Point4d2.equals = function(v1, v2) {
            return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
          };
          Point4d2.prototype.toObject = function() {
            return {
              x: this.x,
              y: this.y,
              z: this.z,
              w: this.w
            };
          };
          return Point4d2;
        }();
        var Point4dAssembly = {
          toComponents: function(p) {
            return p.getComponents();
          },
          fromComponents: function(comps) {
            return new (Point4d.bind.apply(Point4d, __spreadArrays([void 0], comps)))();
          }
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
          var constraints = [];
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
        var Point4dInputPlugin = {
          id: "input-point4d",
          accept: function(value, _params) {
            return Point4d.isObject(value) ? value : null;
          },
          binding: {
            reader: function(_args) {
              return point4dFromUnknown;
            },
            constraint: function(args) {
              return createConstraint$1(args.params);
            },
            equals: Point4d.equals,
            writer: function(_args) {
              return writePoint4d;
            }
          },
          controller: function(args) {
            var value = args.value;
            var c = args.constraint;
            if (!(c instanceof PointNdConstraint)) {
              throw TpError.shouldNeverHappen();
            }
            return new PointNdTextController(args.document, {
              assembly: Point4dAssembly,
              axes: value.rawValue.getComponents().map(function(comp, index) {
                return createAxis(comp, c.components[index]);
              }),
              parser: parseNumber,
              value,
              viewProps: args.viewProps
            });
          }
        };
        function stringFromUnknown(value) {
          return String(value);
        }
        function formatString(value) {
          return value;
        }
        function createConstraint(params) {
          var constraints = [];
          var lc = createListConstraint(params);
          if (lc) {
            constraints.push(lc);
          }
          return new CompositeConstraint(constraints);
        }
        var StringInputPlugin = {
          id: "input-string",
          accept: function(value, _params) {
            return typeof value === "string" ? value : null;
          },
          binding: {
            reader: function(_args) {
              return stringFromUnknown;
            },
            constraint: function(args) {
              return createConstraint(args.params);
            },
            writer: function(_args) {
              return writePrimitive;
            }
          },
          controller: function(args) {
            var _a;
            var doc = args.document;
            var value = args.value;
            var c = args.constraint;
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
              parser: function(v) {
                return v;
              },
              props: ValueMap.fromObject({
                formatter: formatString
              }),
              value,
              viewProps: args.viewProps
            });
          }
        };
        var Semver = function() {
          function Semver2(text) {
            var _a = text.split("-"), core = _a[0], prerelease = _a[1];
            var coreComps = core.split(".");
            this.major = parseInt(coreComps[0], 10);
            this.minor = parseInt(coreComps[1], 10);
            this.patch = parseInt(coreComps[2], 10);
            this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
          }
          Semver2.prototype.toString = function() {
            var core = [this.major, this.minor, this.patch].join(".");
            return this.prerelease !== null ? [core, this.prerelease].join("-") : core;
          };
          return Semver2;
        }();
        var className$2 = ClassName("mll");
        var MultiLogView = function() {
          function MultiLogView2(doc, config) {
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement("div");
            this.element.classList.add(className$2());
            config.viewProps.bindClassModifiers(this.element);
            var textareaElem = doc.createElement("textarea");
            textareaElem.classList.add(className$2("i"));
            textareaElem.style.height = "calc(var(--bld-h) * " + config.lineCount + ")";
            textareaElem.readOnly = true;
            config.viewProps.bindDisabled(textareaElem);
            this.element.appendChild(textareaElem);
            this.textareaElem_ = textareaElem;
            config.value.emitter.on("change", this.onValueUpdate_);
            this.value = config.value;
            this.update_();
          }
          MultiLogView2.prototype.update_ = function() {
            var _this = this;
            var elem = this.textareaElem_;
            var shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
            var lines = [];
            this.value.rawValue.forEach(function(value) {
              if (value !== void 0) {
                lines.push(_this.formatter_(value));
              }
            });
            elem.textContent = lines.join("\n");
            if (shouldScroll) {
              elem.scrollTop = elem.scrollHeight;
            }
          };
          MultiLogView2.prototype.onValueUpdate_ = function() {
            this.update_();
          };
          return MultiLogView2;
        }();
        var MultiLogController = function() {
          function MultiLogController2(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new MultiLogView(doc, {
              formatter: config.formatter,
              lineCount: config.lineCount,
              value: this.value,
              viewProps: this.viewProps
            });
          }
          return MultiLogController2;
        }();
        var className$1 = ClassName("sgl");
        var SingleLogView = function() {
          function SingleLogView2(doc, config) {
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement("div");
            this.element.classList.add(className$1());
            config.viewProps.bindClassModifiers(this.element);
            var inputElem = doc.createElement("input");
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
          SingleLogView2.prototype.update_ = function() {
            var values = this.value.rawValue;
            var lastValue = values[values.length - 1];
            this.inputElem_.value = lastValue !== void 0 ? this.formatter_(lastValue) : "";
          };
          SingleLogView2.prototype.onValueUpdate_ = function() {
            this.update_();
          };
          return SingleLogView2;
        }();
        var SingleLogMonitorController = function() {
          function SingleLogMonitorController2(doc, config) {
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new SingleLogView(doc, {
              formatter: config.formatter,
              value: this.value,
              viewProps: this.viewProps
            });
          }
          return SingleLogMonitorController2;
        }();
        var BooleanMonitorPlugin = {
          id: "monitor-bool",
          accept: function(value, _params) {
            return typeof value === "boolean" ? value : null;
          },
          binding: {
            reader: function(_args) {
              return boolFromUnknown;
            }
          },
          controller: function(args) {
            var _a;
            if (args.value.rawValue.length === 1) {
              return new SingleLogMonitorController(args.document, {
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
        var GraphCursor = function() {
          function GraphCursor2() {
            this.emitter = new Emitter();
            this.index_ = -1;
          }
          Object.defineProperty(GraphCursor2.prototype, "index", {
            get: function() {
              return this.index_;
            },
            set: function(index) {
              var changed = this.index_ !== index;
              if (changed) {
                this.index_ = index;
                this.emitter.emit("change", {
                  index,
                  sender: this
                });
              }
            },
            enumerable: false,
            configurable: true
          });
          return GraphCursor2;
        }();
        var className = ClassName("grl");
        var GraphLogView = function() {
          function GraphLogView2(doc, config) {
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
            var svgElem = doc.createElementNS(SVG_NS, "svg");
            svgElem.classList.add(className("g"));
            svgElem.style.height = "calc(var(--bld-h) * " + config.lineCount + ")";
            this.element.appendChild(svgElem);
            this.svgElem_ = svgElem;
            var lineElem = doc.createElementNS(SVG_NS, "polyline");
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            var tooltipElem = doc.createElement("div");
            tooltipElem.classList.add(className("t"), ClassName("tt")());
            this.element.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on("change", this.onValueUpdate_);
            this.value = config.value;
            this.update_();
          }
          Object.defineProperty(GraphLogView2.prototype, "graphElement", {
            get: function() {
              return this.svgElem_;
            },
            enumerable: false,
            configurable: true
          });
          GraphLogView2.prototype.update_ = function() {
            var bounds = this.svgElem_.getBoundingClientRect();
            var maxIndex = this.value.rawValue.length - 1;
            var min = this.minValue_;
            var max = this.maxValue_;
            var points = [];
            this.value.rawValue.forEach(function(v, index) {
              if (v === void 0) {
                return;
              }
              var x = mapRange(index, 0, maxIndex, 0, bounds.width);
              var y = mapRange(v, min, max, bounds.height, 0);
              points.push([x, y].join(","));
            });
            this.lineElem_.setAttributeNS(null, "points", points.join(" "));
            var tooltipElem = this.tooltipElem_;
            var value = this.value.rawValue[this.cursor_.index];
            if (value === void 0) {
              tooltipElem.classList.remove(className("t", "a"));
              return;
            }
            var tx = mapRange(this.cursor_.index, 0, maxIndex, 0, bounds.width);
            var ty = mapRange(value, min, max, bounds.height, 0);
            tooltipElem.style.left = tx + "px";
            tooltipElem.style.top = ty + "px";
            tooltipElem.textContent = "" + this.formatter_(value);
            if (!tooltipElem.classList.contains(className("t", "a"))) {
              tooltipElem.classList.add(className("t", "a"), className("t", "in"));
              forceReflow(tooltipElem);
              tooltipElem.classList.remove(className("t", "in"));
            }
          };
          GraphLogView2.prototype.onValueUpdate_ = function() {
            this.update_();
          };
          GraphLogView2.prototype.onCursorChange_ = function() {
            this.update_();
          };
          return GraphLogView2;
        }();
        var GraphLogController = function() {
          function GraphLogController2(doc, config) {
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
              var ph = new PointerHandler(this.view.element);
              ph.emitter.on("down", this.onGraphPointerDown_);
              ph.emitter.on("move", this.onGraphPointerMove_);
              ph.emitter.on("up", this.onGraphPointerUp_);
            }
          }
          GraphLogController2.prototype.onGraphMouseLeave_ = function() {
            this.cursor_.index = -1;
          };
          GraphLogController2.prototype.onGraphMouseMove_ = function(ev) {
            var bounds = this.view.element.getBoundingClientRect();
            this.cursor_.index = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
          };
          GraphLogController2.prototype.onGraphPointerDown_ = function(ev) {
            this.onGraphPointerMove_(ev);
          };
          GraphLogController2.prototype.onGraphPointerMove_ = function(ev) {
            if (!ev.data.point) {
              this.cursor_.index = -1;
              return;
            }
            this.cursor_.index = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
          };
          GraphLogController2.prototype.onGraphPointerUp_ = function() {
            this.cursor_.index = -1;
          };
          return GraphLogController2;
        }();
        function createFormatter() {
          return createNumberFormatter(2);
        }
        function createTextMonitor(args) {
          var _a;
          if (args.value.rawValue.length === 1) {
            return new SingleLogMonitorController(args.document, {
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
        var NumberMonitorPlugin = {
          id: "monitor-number",
          accept: function(value, _params) {
            return typeof value === "number" ? value : null;
          },
          binding: {
            defaultBufferSize: function(params) {
              return shouldShowGraph(params) ? 64 : 1;
            },
            reader: function(_args) {
              return numberFromUnknown;
            }
          },
          controller: function(args) {
            if (shouldShowGraph(args.params)) {
              return createGraphMonitor(args);
            }
            return createTextMonitor(args);
          }
        };
        var StringMonitorPlugin = {
          id: "monitor-string",
          accept: function(value, _params) {
            return typeof value === "string" ? value : null;
          },
          binding: {
            reader: function(_args) {
              return stringFromUnknown;
            }
          },
          controller: function(args) {
            var _a;
            var value = args.value;
            var multiline = value.rawValue.length > 1 || "multiline" in args.params && args.params.multiline;
            if (multiline) {
              return new MultiLogController(args.document, {
                formatter: formatString,
                lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
                value,
                viewProps: args.viewProps
              });
            }
            return new SingleLogMonitorController(args.document, {
              formatter: formatString,
              value,
              viewProps: args.viewProps
            });
          }
        };
        function createDefaultWrapperElement(doc) {
          var elem = doc.createElement("div");
          elem.classList.add(ClassName("dfw")());
          if (doc.body) {
            doc.body.appendChild(elem);
          }
          return elem;
        }
        function embedStyle(doc, id, css) {
          if (doc.querySelector("style[data-tp-style=" + id + "]")) {
            return;
          }
          var styleElem = doc.createElement("style");
          styleElem.dataset.tpStyle = id;
          styleElem.textContent = css;
          doc.head.appendChild(styleElem);
        }
        function embedDefaultStyleIfNeeded(doc) {
          embedStyle(doc, "default", ".tp-lstv_s,.tp-btnv_b,.tp-p2dv_b,.tp-fldv_b,.tp-rotv_b,.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-ckbv_i,.tp-coltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-h);line-height:var(--bld-h);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dv_b:disabled{opacity:0.5}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-h) + 4px);line-height:calc(var(--bld-h) + 4px);overflow:hidden;padding-left:calc(var(--cnt-h-p) + 8px);padding-right:calc(2px * 2 + var(--bld-h) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:'';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-h) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-h);line-height:var(--bld-h);min-width:0;width:100%}.tp-colswv_sw:hover,.tp-p2dpv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-colswv_sw:focus,.tp-p2dpv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-colswv_sw:active,.tp-p2dpv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-colswv_sw:disabled,.tp-p2dpv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-coltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-coltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-coltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-coltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-h);width:100%}.tp-coltxtv_w,.tp-pndtxtv{display:flex}.tp-coltxtv_c,.tp-pndtxtv_a{width:100%}.tp-coltxtv_c+.tp-coltxtv_c,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-h);position:relative;width:var(--bld-h)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-h)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-h)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:'';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-h) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-h);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-h);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-colswv.tp-v-disabled{opacity:0.5}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-h);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-h)}.tp-colswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:'';display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-h);line-height:var(--bld-h);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-h) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--value-width)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv.tp-v-disabled .tp-lstv_s{opacity:0.5}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-h) * 3);line-height:var(--bld-h);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-h);margin-right:4px;position:relative;width:var(--bld-h)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-h)}.tp-p2dpv{padding-left:calc(var(--bld-h) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius-v3, 6px);--cnt-h-p: var(--tp-container-horizontal-padding-v3, 4px);--cnt-v-p: var(--tp-container-vertical-padding-v3, 4px);--elm-br: var(--tp-element-border-radius-v3, 2px);--bld-h: var(--tp-blade-height-v3, 20px);--bld-s: var(--tp-blade-spacing-v3, 4px);--value-width: var(--tp-value-width-v3, 160px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, var(--tp-folder-background-color, rgba(187,188,196,0.1)));--cnt-bg-a: var(--tp-container-background-color-active, var(--tp-folder-background-color-active, rgba(187,188,196,0.25)));--cnt-bg-f: var(--tp-container-background-color-focus, var(--tp-folder-background-color-focus, rgba(187,188,196,0.2)));--cnt-bg-h: var(--tp-container-background-color-hover, var(--tp-folder-background-color-hover, rgba(187,188,196,0.15)));--cnt-fg: var(--tp-container-foreground-color, var(--tp-folder-foreground-color, #bbbcc4));--in-bg: var(--tp-input-background-color, rgba(0,0,0,0.2));--in-bg-a: var(--tp-input-background-color-active, rgba(0,0,0,0.35));--in-bg-f: var(--tp-input-background-color-focus, rgba(0,0,0,0.3));--in-bg-h: var(--tp-input-background-color-hover, rgba(0,0,0,0.25));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, var(--tp-separator-color, rgba(0,0,0,0.2)));--button-background-color: var(--btn-bg);--button-background-color-active: var(--btn-bg-a);--button-background-color-focus: var(--btn-bg-f);--button-background-color-hover: var(--btn-bg-h);--button-foreground-color: var(--btn-fg);--folder-background-color: var(--cnt-bg);--folder-background-color-active: var(--cnt-bg-a);--folder-background-color-focus: var(--cnt-bg-f);--folder-background-color-hover: var(--cnt-bg-h);--folder-foreground-color: var(--cnt-fg);--input-background-color: var(--in-bg);--input-background-color-active: var(--in-bg-a);--input-background-color-focus: var(--in-bg-f);--input-background-color-hover: var(--in-bg-h);--input-foreground-color: var(--in-fg);--label-foregound-color: var(--lbl-fg);--monitor-background-color: var(--mo-bg);--monitor-foreground-color: var(--mo-fg);--separator-color: var(--grv-fg);--unit-size: var(--bld-h)}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-h) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-h);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:'';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-h) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:'';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-h) + 4px);line-height:calc(var(--bld-h) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:'';height:calc(var(--bld-h) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:'';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}");
          getAllPlugins().forEach(function(plugin) {
            if (plugin.css) {
              embedStyle(doc, "plugin-" + plugin.id, plugin.css);
            }
          });
        }
        var Tweakpane2 = function(_super) {
          __extends(Tweakpane3, _super);
          function Tweakpane3(opt_config) {
            var _a;
            var _this = this;
            var config = opt_config || {};
            var doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
            var rootController = new RootController(doc, {
              expanded: config.expanded,
              blade: createBlade$1(),
              props: ValueMap.fromObject({
                title: config.title
              }),
              viewProps: ViewProps.create()
            });
            _this = _super.call(this, rootController) || this;
            _this.containerElem_ = config.container || createDefaultWrapperElement(doc);
            _this.containerElem_.appendChild(_this.element);
            _this.doc_ = doc;
            _this.usesDefaultWrapper_ = !config.container;
            embedDefaultStyleIfNeeded(_this.document);
            return _this;
          }
          Object.defineProperty(Tweakpane3.prototype, "document", {
            get: function() {
              if (!this.doc_) {
                throw TpError.alreadyDisposed();
              }
              return this.doc_;
            },
            enumerable: false,
            configurable: true
          });
          Tweakpane3.prototype.dispose = function() {
            var containerElem = this.containerElem_;
            if (!containerElem) {
              throw TpError.alreadyDisposed();
            }
            if (this.usesDefaultWrapper_) {
              var parentElem = containerElem.parentElement;
              if (parentElem) {
                parentElem.removeChild(containerElem);
              }
            }
            this.containerElem_ = null;
            this.doc_ = null;
            _super.prototype.dispose.call(this);
          };
          Tweakpane3.version = new Semver("2.4.3");
          return Tweakpane3;
        }(RootApi);
        function registerDefaultPlugins() {
          [
            Point2dInputPlugin,
            Point3dInputPlugin,
            Point4dInputPlugin,
            StringInputPlugin,
            NumberInputPlugin,
            StringColorInputPlugin,
            ObjectColorInputPlugin,
            NumberColorInputPlugin,
            BooleanInputPlugin
          ].forEach(function(p) {
            registerPlugin({
              type: "input",
              plugin: p
            });
          });
          [BooleanMonitorPlugin, StringMonitorPlugin, NumberMonitorPlugin].forEach(function(p) {
            registerPlugin({
              type: "monitor",
              plugin: p
            });
          });
          [SliderBladePlugin, ListBladePlugin, TabBladePlugin, TextBladePlugin].forEach(function(p) {
            registerPlugin({
              type: "blade",
              plugin: p
            });
          });
        }
        registerDefaultPlugins();
        return Tweakpane2;
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
    WEBGL: "WebGL"
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
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, {title, version, url, color, background});
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
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, {width, height, resolution});
  }

  // ../phaser-genesis/src/renderer/BindingQueue.ts
  var queue = [];
  var BindingQueue = {
    add: (texture, glConfig) => {
      queue.push({texture, glConfig});
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
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, {x, y});
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
    const {framebuffer, viewport} = entry;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
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
    const entry = {framebuffer, viewport};
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
    const {parent, flipY, unpackPremultiplyAlpha, minFilter, magFilter, wrapS, wrapT, generateMipmap, isPOT} = binding;
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
      this.index = 0;
      this.indexCounter = -1;
      this.dirtyIndex = true;
      this.unpackPremultiplyAlpha = true;
      this.flipY = false;
      this.isPOT = false;
      this.generateMipmap = false;
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
      const {texture, glConfig} = entry;
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
      this.indexed = false;
      this.isDynamic = false;
      this.count = 0;
      this.offset = 0;
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
      attributes.set(name, {index, size, type, normalized, stride, offset});
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
    aVertexPosition: {size: 2, type: FLOAT, normalized: false, offset: 0},
    aTextureCoord: {size: 2, type: FLOAT, normalized: false, offset: 8},
    aTextureId: {size: 1, type: FLOAT, normalized: false, offset: 16},
    aTintColor: {size: 4, type: UNSIGNED_BYTE, normalized: true, offset: 20}
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

  // ../phaser-genesis/src/textures/Frame.ts
  var Frame = class {
    constructor(texture, key, x, y, width, height) {
      this.trimmed = false;
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
      this.pivot = {x, y};
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
      return {left, right, top, bottom};
    }
    copyToExtent(child) {
      const transform = child.transform;
      const originX = transform.origin.x;
      const originY = transform.origin.y;
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
      transform.setExtent(x, y, width, height);
      return this;
    }
    copyToVertices(vertices, offset = 0) {
      const {u0, u1, v0, v1} = this;
      vertices[offset + 0].setUV(u0, v0);
      vertices[offset + 1].setUV(u0, v1);
      vertices[offset + 2].setUV(u1, v1);
      vertices[offset + 3].setUV(u1, v0);
      return this;
    }
    updateUVs() {
      const {x, y, width, height} = this;
      const baseTextureWidth = this.texture.width;
      const baseTextureHeight = this.texture.height;
      this.u0 = x / baseTextureWidth;
      this.v0 = y / baseTextureHeight;
      this.u1 = (x + width) / baseTextureWidth;
      this.v1 = (y + height) / baseTextureHeight;
    }
  };

  // ../phaser-genesis/src/textures/Texture.ts
  var Texture = class {
    constructor(image, width, height, glConfig) {
      this.key = "";
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
      this.renderToFramebuffer = false;
      this.renderToDepthbuffer = false;
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
    }
    updateUniforms(renderPass) {
    }
    bind(renderPass) {
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
    const entry = {enable, sfactor, dfactor};
    renderPass.blendModeStack[0] = entry;
    renderPass.currentBlendMode = entry;
    renderPass.defaultBlendMode = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultFramebuffer.ts
  function SetDefaultFramebuffer(renderPass, framebuffer = null, viewport) {
    const entry = {framebuffer, viewport};
    renderPass.framebufferStack[0] = entry;
    renderPass.currentFramebuffer = entry;
    renderPass.defaultFramebuffer = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultShader.ts
  function SetDefaultShader(renderPass, shader, textureID) {
    const entry = {shader, textureID};
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

  // ../phaser-genesis/src/GameInstance.ts
  var instance;
  var frame = 0;
  var elapsed = 0;
  var GameInstance = {
    get: () => {
      return instance;
    },
    set: (game) => {
      instance = game;
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

  // ../phaser-genesis/src/math/mat4/Mat4Identity.ts
  function Mat4Identity(matrix = new Matrix4()) {
    return matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  // ../phaser-genesis/src/math/mat2d/Matrix2D.ts
  var Matrix2D = class {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
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
      const {a, b, c, d, tx, ty} = this;
      return [a, b, c, d, tx, ty];
    }
    fromArray(src) {
      return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
    }
  };

  // ../phaser-genesis/src/math/vec2/Vec2Callback.ts
  var Vec2Callback = class {
    constructor(onChange, x = 0, y = 0) {
      this._x = x;
      this._y = y;
      this.onChange = onChange;
    }
    destroy() {
      this.onChange = NOOP;
    }
    set(x = 0, y = 0) {
      this._x = x;
      this._y = y;
      if (this.onChange) {
        this.onChange(this);
      }
      return this;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      const prev = this._x;
      this._x = value;
      if (prev !== value) {
        this.onChange(this);
      }
    }
    get y() {
      return this._y;
    }
    set y(value) {
      const prev = this._y;
      this._y = value;
      if (prev !== value) {
        this.onChange(this);
      }
    }
    toArray(dst = [], index = 0) {
      const {x, y} = this;
      dst[index] = x;
      dst[index + 1] = y;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1]);
    }
    toString() {
      const {x, y} = this;
      return `{ x=${x}, y=${y} }`;
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
      this.type = "StaticCamera";
      this.dirtyRender = true;
      const game = GameInstance.get();
      this.renderer = game.renderer;
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
      this.count = 0;
      this.prevCount = 0;
      this.flushTotal = 0;
      this.maxTextures = 0;
      this.currentActiveTexture = 0;
      this.startActiveTexture = 0;
      this.tempTextures = [];
      this.textureIndex = [];
      this.framebufferStack = [];
      this.currentFramebuffer = null;
      this.defaultFramebuffer = null;
      this.vertexBufferStack = [];
      this.currentVertexBuffer = null;
      this.defaultVertexBuffer = null;
      this.shaderStack = [];
      this.currentShader = null;
      this.defaultShader = null;
      this.viewportStack = [];
      this.currentViewport = null;
      this.defaultViewport = null;
      this.blendModeStack = [];
      this.currentBlendMode = null;
      this.defaultBlendMode = null;
      this.renderer = renderer;
      this.projectionMatrix = new Matrix4();
      this.reset();
    }
    reset() {
      const gl2 = this.renderer.gl;
      const indexLayout = [0, 1, 2, 2, 3, 0];
      this.quadShader = new QuadShader();
      this.quadBuffer = new IndexedVertexBuffer({isDynamic: false, indexLayout});
      this.quadCamera = new StaticCamera();
      CreateTempTextures(this);
      SetDefaultFramebuffer(this);
      SetDefaultBlendMode(this, true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
      SetDefaultVertexBuffer(this, new IndexedVertexBuffer({batchSize: GetBatchSize(), indexLayout}));
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
    if (!entry) {
      entry = renderPass.currentShader;
    }
    const success = entry.shader.bind(renderPass, entry.textureID);
    if (success) {
      entry.shader.setAttributes(renderPass);
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
      gl.enable(gl.BLEND);
      gl.blendFunc(entry.sfactor, entry.dfactor);
    } else {
      gl.disable(gl.BLEND);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindVertexBuffer.ts
  function BindVertexBuffer(renderPass, buffer) {
    if (!buffer) {
      buffer = renderPass.currentVertexBuffer;
    }
    const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
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

  // ../phaser-genesis/src/renderer/webgl1/WebGLRenderer.ts
  var WebGLRenderer = class {
    constructor() {
      this.clearColor = [0, 0, 0, 1];
      this.clearBeforeRender = true;
      this.optimizeRedraw = false;
      this.autoResize = true;
      this.contextLost = false;
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
    render(renderData) {
      if (this.contextLost) {
        return;
      }
      const gl2 = this.gl;
      const renderPass = this.renderPass;
      ProcessBindingQueue();
      if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
        return;
      }
      if (this.clearBeforeRender) {
        const cls = this.clearColor;
        gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
        gl2.clear(gl2.COLOR_BUFFER_BIT);
      }
      const worlds = renderData.worldData;
      Start(renderPass);
      for (let i = 0; i < worlds.length; i++) {
        const {world} = worlds[i];
        world.renderGL(renderPass);
        world.postRenderGL(renderPass);
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
    return parent.children.indexOf(child);
  }

  // ../phaser-genesis/src/display/RemoveChildAt.ts
  function RemoveChildAt(parent, index) {
    const children = parent.children;
    let child;
    if (index >= 0 && index < children.length) {
      const removed = children.splice(index, 1);
      if (removed[0]) {
        child = removed[0];
        child.parent = null;
      }
    }
    return child;
  }

  // ../phaser-genesis/src/display/RemoveChild.ts
  function RemoveChild(parent, child) {
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex > -1) {
      RemoveChildAt(parent, currentIndex);
    }
    return child;
  }

  // ../phaser-genesis/src/gameobjects/events/AddedToWorldEvent.ts
  var AddedToWorldEvent = "addedtoworld";

  // ../phaser-genesis/src/gameobjects/events/DestroyEvent.ts
  var DestroyEvent = "destroy";

  // ../phaser-genesis/src/gameobjects/events/PostUpdateEvent.ts
  var PostUpdateEvent = "postupdate";

  // ../phaser-genesis/src/gameobjects/events/RemovedFromWorldEvent.ts
  var RemovedFromWorldEvent = "removedfromworld";

  // ../phaser-genesis/src/gameobjects/events/UpdateEvent.ts
  var UpdateEvent = "update";

  // ../phaser-genesis/src/events/Emit.ts
  function Emit(emitter, event, ...args) {
    if (emitter.events.size === 0 || !emitter.events.has(event)) {
      return false;
    }
    const listeners = emitter.events.get(event);
    for (const ee of listeners) {
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

  // ../phaser-genesis/src/display/SetWorld.ts
  function SetWorld(world, ...children) {
    children.forEach((child) => {
      if (child.world) {
        Emit(child.world, RemovedFromWorldEvent, child, child.world);
        Emit(child, RemovedFromWorldEvent, child, child.world);
      }
      child.world = world;
      Emit(world, AddedToWorldEvent, child, world);
      Emit(child, AddedToWorldEvent, child, world);
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

  // ../phaser-genesis/src/display/AddChild.ts
  function AddChild(parent, child) {
    parent.children.push(child);
    SetParent2(parent, child);
    child.transform.updateWorld();
    return child;
  }

  // ../phaser-genesis/src/display/AddChildren.ts
  function AddChildren(parent, ...children) {
    children.forEach((child) => {
      AddChild(parent, child);
    });
    return children;
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

  // ../phaser-genesis/src/display/RemoveChildrenBetween.ts
  function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const children = parent.children;
    if (endIndex === void 0) {
      endIndex = children.length;
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const removed = children.splice(beginIndex, range);
      removed.forEach((child) => {
        child.parent = null;
      });
      return removed;
    } else {
      return [];
    }
  }

  // ../phaser-genesis/src/display/DestroyChildren.ts
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed.forEach((child) => {
      child.destroy();
    });
  }

  // ../phaser-genesis/src/display/RemoveChildren.ts
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

  // ../phaser-genesis/src/display/ReparentChildren.ts
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    SetParent2(newParent, ...moved);
    moved.forEach((child) => {
      child.transform.updateWorld();
    });
    return moved;
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
      this.events = new Map();
    }
  };

  // ../phaser-genesis/src/events/EventInstance.ts
  var EventInstance = class {
    constructor(callback, context, once = false) {
      this.callback = callback;
      this.context = context;
      this.once = once;
    }
  };

  // ../phaser-genesis/src/events/Off.ts
  function Off(emitter, event, callback, context, once) {
    const events = emitter.events;
    const listeners = events.get(event);
    if (!callback) {
      events.delete(event);
    } else if (callback instanceof EventInstance) {
      listeners.delete(callback);
    } else {
      const hasContext = !context;
      const hasOnce = once !== void 0;
      for (const listener of listeners) {
        if (listener.callback === callback && (hasContext && listener.context === context) && (hasOnce && listener.once === once)) {
          listeners.delete(listener);
        }
      }
    }
    if (listeners.size === 0) {
      events.delete(event);
    }
    return emitter;
  }

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
    const {title, version, url, color, background} = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
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

  // ../phaser-genesis/src/scenes/CreateSceneRenderData.ts
  function CreateSceneRenderData() {
    return {
      gameFrame: 0,
      numTotalFrames: 0,
      numDirtyFrames: 0,
      numDirtyCameras: 0,
      worldData: []
    };
  }

  // ../phaser-genesis/src/config/scenes/GetScenes.ts
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // ../phaser-genesis/src/scenes/ResetSceneRenderData.ts
  function ResetSceneRenderData(renderData, gameFrame = 0) {
    renderData.gameFrame = gameFrame;
    renderData.numTotalFrames = 0;
    renderData.numDirtyFrames = 0;
    renderData.numDirtyCameras = 0;
    renderData.worldData.length = 0;
  }

  // ../phaser-genesis/src/scenes/SceneManagerInstance.ts
  var instance3;
  var SceneManagerInstance = {
    get: () => {
      return instance3;
    },
    set: (manager) => {
      instance3 = manager;
    }
  };

  // ../phaser-genesis/src/scenes/SceneManager.ts
  var SceneManager = class {
    constructor() {
      this.scenes = new Map();
      this.sceneIndex = 0;
      this.flush = false;
      this.renderResult = CreateSceneRenderData();
      this.game = GameInstance.get();
      SceneManagerInstance.set(this);
      Once(this.game, "boot", () => this.boot());
    }
    boot() {
      GetScenes().forEach((scene) => new scene());
    }
    update(delta, time) {
      for (const scene of this.scenes.values()) {
        Emit(scene, "update", delta, time);
      }
    }
    render(gameFrame) {
      const results = this.renderResult;
      ResetSceneRenderData(results, gameFrame);
      for (const scene of this.scenes.values()) {
        Emit(scene, "render", results);
      }
      if (this.flush) {
        results.numDirtyFrames++;
        this.flush = false;
      }
      return results;
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
  }

  // ../phaser-genesis/src/textures/CreateCanvas.ts
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // ../phaser-genesis/src/textures/TextureManagerInstance.ts
  var instance4;
  var TextureManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      instance4 = manager;
    }
  };

  // ../phaser-genesis/src/textures/TextureManager.ts
  var TextureManager = class {
    constructor() {
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
      this.VERSION = "4.0.0-beta1";
      this.isBooted = false;
      this.isPaused = false;
      this.willUpdate = true;
      this.willRender = true;
      this.lastTick = 0;
      this.elapsed = 0;
      this.frame = 0;
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
      if (!this.isPaused) {
        if (this.willUpdate) {
          this.sceneManager.update(delta, time);
          Emit(this, "update", delta, time);
        }
        if (this.willRender) {
          this.renderer.render(this.sceneManager.render(this.frame));
        }
      }
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
      this.responseType = "text";
      this.crossOrigin = void 0;
      this.skipCache = false;
      this.hasLoaded = false;
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

  // ../phaser-genesis/src/loader/ImageTagLoader.ts
  function ImageTagLoader(file) {
    file.data = new Image();
    if (file.crossOrigin) {
      file.data.crossOrigin = file.crossOrigin;
    }
    return new Promise((resolve, reject) => {
      file.data.onload = () => {
        if (file.data.onload) {
          file.data.onload = null;
          file.data.onerror = null;
          resolve(file);
        }
      };
      file.data.onerror = (event) => {
        if (file.data.onload) {
          file.data.onload = null;
          file.data.onerror = null;
          file.error = event;
          reject(file);
        }
      };
      file.data.src = file.url;
      if (file.data.complete && file.data.width && file.data.height) {
        file.data.onload = null;
        file.data.onerror = null;
        resolve(file);
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

  // ../phaser-genesis/src/loader/Loader.ts
  var Loader = class extends EventEmitter {
    constructor() {
      super();
      this.baseURL = "";
      this.path = "";
      this.crossOrigin = "anonymous";
      this.maxParallelDownloads = -1;
      this.isLoading = false;
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
  }

  // ../phaser-genesis/src/scenes/Scene.ts
  var Scene = class {
    constructor(config) {
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // ../phaser-genesis/src/gameobjects/components/transform/GetVertices.ts
  function GetVertices(transform) {
    const {a, b, c, d, tx, ty} = transform.world;
    const {x, y, right, bottom} = transform.extent;
    const x0 = x * a + y * c + tx;
    const y0 = x * b + y * d + ty;
    const x1 = x * a + bottom * c + tx;
    const y1 = x * b + bottom * d + ty;
    const x2 = right * a + bottom * c + tx;
    const y2 = right * b + bottom * d + ty;
    const x3 = right * a + y * c + tx;
    const y3 = right * b + y * d + ty;
    return {x0, y0, x1, y1, x2, y2, x3, y3};
  }

  // ../phaser-genesis/src/gameobjects/components/bounds/BoundsComponent.ts
  var BoundsComponent = class {
    constructor(entity) {
      this.fixed = false;
      this.includeChildren = true;
      this.visibleOnly = true;
      this.entity = entity;
      this.area = new Rectangle();
    }
    set(x, y, width, height) {
      this.area.set(x, y, width, height);
    }
    get() {
      if (this.entity.isDirty(DIRTY_CONST.BOUNDS) && !this.fixed) {
        this.update();
      }
      return this.area;
    }
    updateLocal() {
      const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(this.entity.transform);
      const x = Math.min(x0, x1, x2, x3);
      const y = Math.min(y0, y1, y2, y3);
      const right = Math.max(x0, x1, x2, x3);
      const bottom = Math.max(y0, y1, y2, y3);
      return this.area.set(x, y, right - x, bottom - y);
    }
    update() {
      const bounds = this.updateLocal();
      this.entity.clearDirty(DIRTY_CONST.BOUNDS);
      if (!this.includeChildren || !this.entity.numChildren) {
        return bounds;
      }
      const visibleOnly = this.visibleOnly;
      const children = this.entity.children;
      let x = bounds.x;
      let y = bounds.y;
      let right = bounds.right;
      let bottom = bounds.bottom;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child || visibleOnly && !child.visible) {
          continue;
        }
        const childBounds = child.bounds.get();
        if (childBounds.x < x) {
          x = childBounds.x;
        }
        if (childBounds.y < y) {
          y = childBounds.y;
        }
        if (childBounds.right > right) {
          right = childBounds.right;
        }
        if (childBounds.bottom > bottom) {
          bottom = childBounds.bottom;
        }
      }
      return bounds.set(x, y, right - x, bottom - y);
    }
    destroy() {
      this.entity = null;
      this.area = null;
    }
  };

  // ../phaser-genesis/src/gameobjects/components/input/InputComponent.ts
  var InputComponent = class {
    constructor(entity) {
      this.enabled = false;
      this.enabledChildren = true;
      this.entity = entity;
    }
    destroy() {
      this.entity = null;
      this.hitArea = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColors.ts
  function PackColors(vertices) {
    vertices.forEach((vertex) => {
      vertex.packColor();
    });
  }

  // ../phaser-genesis/src/gameobjects/components/transform/UpdateVertices.ts
  function UpdateVertices(gameObject) {
    const vertices = gameObject.vertices;
    const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(gameObject.transform);
    vertices[0].setPosition(x0, y0);
    vertices[1].setPosition(x1, y1);
    vertices[2].setPosition(x2, y2);
    vertices[3].setPosition(x3, y3);
    return gameObject;
  }

  // ../phaser-genesis/src/gameobjects/components/transform/PreRenderVertices.ts
  function PreRenderVertices(gameObject) {
    if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
      PackColors(gameObject.vertices);
      gameObject.clearDirty(DIRTY_CONST.COLORS);
    }
    if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
      UpdateVertices(gameObject);
      gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
    }
    return gameObject;
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginX.ts
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginY.ts
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // ../phaser-genesis/src/math/vec2/Vec2.ts
  var Vec2 = class {
    constructor(x = 0, y = 0) {
      this.set(x, y);
    }
    set(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      return this;
    }
    toArray(dst = [], index = 0) {
      const {x, y} = this;
      dst[index] = x;
      dst[index + 1] = y;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1]);
    }
    toString() {
      const {x, y} = this;
      return `{ x=${x}, y=${y} }`;
    }
  };

  // ../phaser-genesis/src/geom/rectangle/GetRectangleSize.ts
  function GetRectangleSize(rect, out = new Vec2()) {
    return out.set(rect.width, rect.height);
  }

  // ../phaser-genesis/src/gameobjects/components/transform/UpdateLocalTransform.ts
  function UpdateLocalTransform(transform) {
    const local = transform.local;
    const x = transform.position.x;
    const y = transform.position.y;
    const rotation = transform.rotation;
    const scaleX = transform.scale.x;
    const scaleY = transform.scale.y;
    const skewX = transform.skew.x;
    const skewY = transform.skew.y;
    local.set(Math.cos(rotation + skewY) * scaleX, Math.sin(rotation + skewY) * scaleX, -Math.sin(rotation - skewX) * scaleY, Math.cos(rotation - skewX) * scaleY, x, y);
  }

  // ../phaser-genesis/src/math/mat2d/Mat2dCopyFrom.ts
  function Mat2dCopyFrom(src, target) {
    const {a, b, c, d, tx, ty} = src;
    return target.set(a, b, c, d, tx, ty);
  }

  // ../phaser-genesis/src/gameobjects/components/transform/UpdateWorldTransform.ts
  function UpdateWorldTransform(gameObject) {
    const parent = gameObject.parent;
    const transform = gameObject.transform;
    const lt = transform.local;
    const wt = transform.world;
    if (!parent) {
      Mat2dCopyFrom(lt, wt);
    } else if (transform.passthru) {
      Mat2dCopyFrom(parent.transform.world, wt);
    } else {
      const {a, b, c, d, tx, ty} = lt;
      const {a: pa, b: pb, c: pc, d: pd, tx: ptx, ty: pty} = parent.transform.world;
      wt.set(a * pa + b * pc, a * pb + b * pd, c * pa + d * pc, c * pb + d * pd, tx * pa + ty * pc + ptx, tx * pb + ty * pd + pty);
    }
  }

  // ../phaser-genesis/src/gameobjects/components/transform/TransformComponent.ts
  var TransformComponent = class {
    constructor(entity, x = 0, y = 0) {
      this.passthru = false;
      this._rotation = 0;
      this.entity = entity;
      this.local = new Matrix2D();
      this.world = new Matrix2D();
      const update = () => this.update();
      const updateExtent = () => this.updateExtent();
      this.position = new Vec2Callback(update, x, y);
      this.scale = new Vec2Callback(update, 1, 1);
      this.skew = new Vec2Callback(update);
      this.origin = new Vec2Callback(updateExtent, GetDefaultOriginX(), GetDefaultOriginY());
      this.extent = new Rectangle();
    }
    update() {
      this.updateLocal();
      this.updateWorld();
    }
    updateLocal() {
      this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
      UpdateLocalTransform(this);
    }
    updateWorld() {
      const entity = this.entity;
      entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
      UpdateWorldTransform(entity);
      if (entity.numChildren) {
        this.updateChildren();
      }
    }
    updateChildren() {
      const children = this.entity.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.transform.updateWorld();
      }
    }
    globalToLocal(x, y, out = new Vec2()) {
      const {a, b, c, d, tx, ty} = this.world;
      const id = 1 / (a * d + c * -b);
      out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
      out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;
      return out;
    }
    localToGlobal(x, y, out = new Vec2()) {
      const {a, b, c, d, tx, ty} = this.world;
      out.x = a * x + c * y + tx;
      out.y = b * x + d * y + ty;
      return out;
    }
    setExtent(x, y, width, height) {
      this.extent.set(x, y, width, height);
      this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }
    updateExtent(width, height) {
      const extent = this.extent;
      const entity = this.entity;
      if (width !== void 0) {
        extent.width = width;
      }
      if (height !== void 0) {
        extent.height = height;
      }
      extent.x = -this.origin.x * extent.width;
      extent.y = -this.origin.y * extent.height;
      entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }
    set rotation(value) {
      if (value !== this._rotation) {
        this._rotation = value;
        this.update();
      }
    }
    get rotation() {
      return this._rotation;
    }
    destroy() {
      this.position.destroy();
      this.scale.destroy();
      this.skew.destroy();
      this.origin.destroy();
      this.entity = null;
      this.local = null;
      this.world = null;
      this.position = null;
      this.scale = null;
      this.skew = null;
      this.origin = null;
      this.extent = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColor.ts
  function PackColor(rgb, alpha) {
    const ua = (alpha * 255 | 0) & 255;
    return (ua << 24 | rgb) >>> 0;
  }

  // ../phaser-genesis/src/gameobjects/components/Vertex.ts
  var Vertex = class {
    constructor(x = 0, y = 0, z = 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.u = 0;
      this.v = 0;
      this.texture = 0;
      this.tint = 16777215;
      this.alpha = 1;
      this.color = 4294967295;
      this.x = x;
      this.y = y;
      this.z = z;
    }
    setPosition(x, y, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    setUV(u, v) {
      this.u = u;
      this.v = v;
      return this;
    }
    setColor(color, alpha = 1) {
      this.tint = color;
      this.alpha = alpha;
      this.packColor();
      return this;
    }
    setAlpha(value) {
      this.alpha = value;
      return this;
    }
    setTint(value) {
      this.tint = value;
      return this;
    }
    packColor() {
      this.color = PackColor(this.tint, this.alpha);
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuad.ts
  function BatchTexturedQuad(texture, vertices, renderPass) {
    const {F32, U32, offset} = GetVertexBufferEntry(renderPass, 1);
    const textureIndex = SetTexture(renderPass, texture);
    let vertOffset = offset;
    vertices.forEach((vertex) => {
      F32[vertOffset + 0] = vertex.x;
      F32[vertOffset + 1] = vertex.y;
      F32[vertOffset + 2] = vertex.u;
      F32[vertOffset + 3] = vertex.v;
      F32[vertOffset + 4] = textureIndex;
      U32[vertOffset + 5] = vertex.color;
      vertOffset += 6;
    });
  }

  // ../phaser-genesis/src/gameobjects/GameObject.ts
  var GameObject = class {
    constructor(x = 0, y = 0) {
      this.type = "GameObject";
      this.name = "";
      this.willUpdate = true;
      this.willUpdateChildren = true;
      this.willRender = true;
      this.willRenderChildren = true;
      this.willCacheChildren = false;
      this.dirty = 0;
      this.dirtyFrame = 0;
      this.visible = true;
      this.children = [];
      this.vertices = [];
      this.events = new Map();
      this.transform = new TransformComponent(this, x, y);
      this.bounds = new BoundsComponent(this);
      this.input = new InputComponent(this);
      this.dirty = DIRTY_CONST.DEFAULT;
      this.transform.update();
    }
    isRenderable() {
      return this.visible && this.willRender;
    }
    isDirty(flag) {
      return (this.dirty & flag) !== 0;
    }
    clearDirty(flag) {
      if (this.isDirty(flag)) {
        this.dirty ^= flag;
      }
      return this;
    }
    setDirty(flag, flag2) {
      if (!this.isDirty(flag)) {
        this.dirty ^= flag;
        this.dirtyFrame = GameInstance.getFrame();
      }
      if (!this.isDirty(flag2)) {
        this.dirty ^= flag2;
      }
      return this;
    }
    update(delta, time) {
      if (this.willUpdateChildren) {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child && child.willUpdate) {
            child.update(delta, time);
          }
        }
      }
      this.postUpdate(delta, time);
    }
    postUpdate(delta, time) {
    }
    renderGL(renderPass) {
    }
    renderCanvas(renderer) {
    }
    postRenderGL(renderPass) {
    }
    postRenderCanvas(renderer) {
    }
    get numChildren() {
      return this.children.length;
    }
    destroy(reparentChildren) {
      if (reparentChildren) {
        ReparentChildren(this, reparentChildren);
      } else {
        DestroyChildren(this);
      }
      Emit(this, DestroyEvent, this);
      this.transform.destroy();
      this.bounds.destroy();
      this.input.destroy();
      this.events.clear();
      this.world = null;
      this.parent = null;
      this.children = null;
      this.vertices = [];
    }
  };

  // ../phaser-genesis/src/gameobjects/container/Container.ts
  var Container = class extends GameObject {
    constructor(x = 0, y = 0) {
      super(x, y);
      this._alpha = 1;
      this.type = "Container";
    }
    setSize(width, height = width) {
      this.transform.updateExtent(width, height);
      return this;
    }
    getSize(out = new Vec2()) {
      return GetRectangleSize(this.transform.extent, out);
    }
    setPosition(x, y) {
      this.transform.position.set(x, y);
      return this;
    }
    getPosition(out = new Vec2()) {
      const position = this.transform.position;
      return out.set(position.x, position.y);
    }
    setOrigin(x, y = x) {
      this.transform.origin.set(x, y);
      return this;
    }
    getOrigin(out = new Vec2()) {
      const origin = this.transform.origin;
      return out.set(origin.x, origin.y);
    }
    setSkew(x, y = x) {
      this.transform.skew.set(x, y);
      return this;
    }
    getSkew(out = new Vec2()) {
      const skew = this.transform.skew;
      return out.set(skew.x, skew.y);
    }
    setScale(x, y = x) {
      this.transform.scale.set(x, y);
      return this;
    }
    getScale(out = new Vec2()) {
      const scale = this.transform.scale;
      return out.set(scale.x, scale.y);
    }
    setRotation(value) {
      this.transform.rotation = value;
      return this;
    }
    getRotation() {
      return this.transform.rotation;
    }
    set width(value) {
      this.transform.updateExtent(value);
    }
    get width() {
      return this.transform.extent.width;
    }
    set height(value) {
      this.transform.updateExtent(void 0, value);
    }
    get height() {
      return this.transform.extent.height;
    }
    set x(value) {
      this.transform.position.x = value;
    }
    get x() {
      return this.transform.position.x;
    }
    set y(value) {
      this.transform.position.y = value;
    }
    get y() {
      return this.transform.position.y;
    }
    set originX(value) {
      this.transform.origin.x = value;
    }
    get originX() {
      return this.transform.origin.x;
    }
    set originY(value) {
      this.transform.origin.y = value;
    }
    get originY() {
      return this.transform.origin.y;
    }
    set skewX(value) {
      this.transform.skew.x = value;
    }
    get skewX() {
      return this.transform.skew.x;
    }
    set skewY(value) {
      this.transform.skew.y = value;
    }
    get skewY() {
      return this.transform.skew.y;
    }
    set scaleX(value) {
      this.transform.scale.x = value;
    }
    get scaleX() {
      return this.transform.scale.x;
    }
    set scaleY(value) {
      this.transform.scale.y = value;
    }
    get scaleY() {
      return this.transform.scale.y;
    }
    set rotation(value) {
      this.transform.rotation = value;
    }
    get rotation() {
      return this.transform.rotation;
    }
    get alpha() {
      return this._alpha;
    }
    set alpha(value) {
      if (value !== this._alpha) {
        this._alpha = value;
        this.vertices.forEach((vertex) => {
          vertex.setAlpha(value);
        });
        this.setDirty(DIRTY_CONST.COLORS);
      }
    }
  };

  // ../phaser-genesis/src/renderer/canvas/draw/DrawTexturedQuad.ts
  function DrawTexturedQuad(frame2, alpha, transform, renderer) {
    if (!frame2) {
      return;
    }
    const ctx = renderer.ctx;
    const {a, b, c, d, tx, ty} = transform.world;
    const {x, y} = transform.extent;
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
      frame2.copyToVertices(child.vertices);
    });
    return children;
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
      if (key instanceof Texture) {
        texture = key;
      } else {
        texture = TextureManagerInstance.get().get(key);
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
      this.hasTexture = false;
      this._tint = 16777215;
      this.type = "Sprite";
      this.vertices = [new Vertex(), new Vertex(), new Vertex(), new Vertex()];
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
      return this.visible && this.willRender && this.hasTexture && this.alpha > 0;
    }
    renderGL(renderPass) {
      PreRenderVertices(this);
      BatchTexturedQuad(this.texture, this.vertices, renderPass);
    }
    renderCanvas(renderer) {
      PreRenderVertices(this);
      DrawTexturedQuad(this.frame, this.alpha, this.transform, renderer);
    }
    get tint() {
      return this._tint;
    }
    set tint(value) {
      if (value !== this._tint) {
        this._tint = value;
        this.vertices.forEach((vertex) => {
          vertex.setTint(value);
        });
        this.setDirty(DIRTY_CONST.COLORS);
      }
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.texture = null;
      this.frame = null;
      this.hasTexture = false;
    }
  };

  // examples/live/libs/phaser4debugkit/SpriteEditor.js
  var import_tweakpane = __toModule(require_tweakpane());
  var SpriteEditor = class {
    constructor(spriteRef) {
      this.target = spriteRef;
      this.transform = spriteRef.transform;
      this.createWindow();
    }
    createWindow() {
      const pane = new import_tweakpane.default({
        container: document.getElementById("spriteEd")
      });
      const transformFolder = pane.addFolder({title: "Transform"});
      const step01 = {step: 0.1};
      transformFolder.addInput(this.transform, "position");
      transformFolder.addInput(this.transform, "rotation", step01);
      transformFolder.addInput(this.transform, "scale", {x: step01, y: step01});
      transformFolder.addInput(this.transform, "skew", {x: step01, y: step01});
      transformFolder.addInput(this.transform, "origin", {min: 0, max: 1, step: 0.1});
      const displayFolder = pane.addFolder({title: "Display"});
      displayFolder.addInput(this.target, "visible");
      displayFolder.addInput(this.target, "alpha", {min: 0, max: 1, step: 0.1});
    }
  };

  // ../phaser-genesis/src/world/events/WorldRenderEvent.ts
  var WorldRenderEvent = "worldrender";

  // ../phaser-genesis/src/world/events/WorldShutdownEvent.ts
  var WorldShutdownEvent = "worldshutdown";

  // ../phaser-genesis/src/world/CalculateTotalRenderable.ts
  function CalculateTotalRenderable(entry, renderData) {
    renderData.numRendered++;
    renderData.numRenderable++;
    if (entry.node.dirtyFrame >= renderData.gameFrame) {
      renderData.dirtyFrame++;
    }
    entry.children.forEach((child) => {
      if (child.children.length > 0) {
        CalculateTotalRenderable(child, renderData);
      }
    });
  }

  // ../phaser-genesis/src/world/HasDirtyChildren.ts
  function HasDirtyChildren(parent) {
    if (parent.node.isDirty(DIRTY_CONST.CHILD_CACHE)) {
      return true;
    }
    const stack = [parent];
    while (stack.length > 0) {
      const entry = stack.pop();
      if (entry.node.isDirty(DIRTY_CONST.TRANSFORM)) {
        return true;
      }
      const numChildren = entry.children.length;
      if (numChildren > 0) {
        for (let i = 0; i < numChildren; i++) {
          stack.push(entry.children[i]);
        }
      }
    }
    stack.length = 0;
    return false;
  }

  // ../phaser-genesis/src/world/UpdateCachedLayers.ts
  function UpdateCachedLayers(cachedLayers, dirtyCamera) {
    cachedLayers.forEach((layer) => {
      if (dirtyCamera || HasDirtyChildren(layer)) {
        layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
      } else {
        layer.children.length = 0;
      }
    });
  }

  // ../phaser-genesis/src/world/WorldDepthFirstSearch.ts
  function WorldDepthFirstSearch(cachedLayers, parent, output = []) {
    for (let i = 0; i < parent.numChildren; i++) {
      const node = parent.children[i];
      if (node.isRenderable()) {
        const children = [];
        const entry = {node, children};
        output.push(entry);
        if (node.willRenderChildren && node.numChildren > 0) {
          if (node.willCacheChildren) {
            cachedLayers.push(entry);
          }
          WorldDepthFirstSearch(cachedLayers, node, children);
        }
      }
    }
    return output;
  }

  // ../phaser-genesis/src/world/BuildRenderList.ts
  function BuildRenderList(world) {
    const cachedLayers = [];
    const stack = [];
    const entries = WorldDepthFirstSearch(cachedLayers, world, stack);
    const renderData = world.renderData;
    if (cachedLayers.length > 0) {
      UpdateCachedLayers(cachedLayers, world.camera.dirtyRender);
    }
    entries.forEach((entry) => {
      if (entry.children.length > 0) {
        CalculateTotalRenderable(entry, renderData);
      } else {
        renderData.numRendered++;
        renderData.numRenderable++;
        if (entry.node.dirtyFrame >= renderData.gameFrame) {
          renderData.dirtyFrame++;
        }
      }
    });
    world.renderList = entries;
    if (world.forceRefresh) {
      renderData.dirtyFrame++;
      world.forceRefresh = false;
    }
  }

  // ../phaser-genesis/src/math/mat2d/Mat2dEquals.ts
  function Mat2dEquals(a, b) {
    return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
  }

  // ../phaser-genesis/src/world/MergeRenderData.ts
  function MergeRenderData(sceneRenderData, worldRenderData) {
    sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
    sceneRenderData.numTotalFrames += worldRenderData.numRendered;
    if (worldRenderData.camera.dirtyRender) {
      sceneRenderData.numDirtyCameras++;
    }
    sceneRenderData.worldData.push(worldRenderData);
  }

  // ../phaser-genesis/src/world/ResetWorldRenderData.ts
  function ResetWorldRenderData(renderData, gameFrame) {
    renderData.gameFrame = gameFrame;
    renderData.dirtyFrame = 0;
    renderData.numRendered = 0;
    renderData.numRenderable = 0;
  }

  // ../phaser-genesis/src/world/BaseWorld.ts
  var BaseWorld = class extends GameObject {
    constructor(scene) {
      super();
      this.forceRefresh = false;
      this.is3D = false;
      this.type = "BaseWorld";
      this.scene = scene;
      this.world = this;
      this.events = new Map();
      this.renderList = [];
      this._updateListener = On(scene, "update", (delta, time) => this.update(delta, time));
      this._renderListener = On(scene, "render", (renderData) => this.render(renderData));
      this._shutdownListener = On(scene, "shutdown", () => this.shutdown());
      Once(scene, "destroy", () => this.destroy());
    }
    update(delta, time) {
      if (!this.willUpdate) {
        return;
      }
      Emit(this, UpdateEvent, delta, time, this);
      super.update(delta, time);
    }
    postUpdate(delta, time) {
      Emit(this, PostUpdateEvent, delta, time, this);
    }
    render(sceneRenderData) {
      const renderData = this.renderData;
      ResetWorldRenderData(renderData, sceneRenderData.gameFrame);
      if (!this.willRender || !this.visible) {
        return;
      }
      BuildRenderList(this);
      Emit(this, WorldRenderEvent, renderData, this);
      MergeRenderData(sceneRenderData, renderData);
      this.camera.dirtyRender = false;
    }
    renderGL(renderPass) {
      const currentCamera = renderPass.current2DCamera;
      const camera = this.camera;
      if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
        Flush(renderPass);
      }
      Begin(renderPass, camera);
      this.renderList.forEach((entry) => {
        if (entry.children.length > 0) {
          this.renderNode(entry, renderPass);
        } else {
          entry.node.renderGL(renderPass);
        }
      });
    }
    renderNode(entry, renderPass) {
      entry.node.renderGL(renderPass);
      entry.children.forEach((child) => {
        if (child.children.length > 0) {
          this.renderNode(child, renderPass);
        } else {
          child.node.renderGL(renderPass);
        }
      });
      entry.node.postRenderGL(renderPass);
    }
    postRenderGL(renderPass) {
    }
    shutdown() {
      const scene = this.scene;
      Off(scene, "update", this._updateListener);
      Off(scene, "render", this._renderListener);
      Off(scene, "shutdown", this._shutdownListener);
      RemoveChildren(this);
      Emit(this, WorldShutdownEvent, this);
      ResetWorldRenderData(this.renderData, 0);
      if (this.camera) {
        this.camera.reset();
      }
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      Emit(this, DestroyEvent, this);
      ResetWorldRenderData(this.renderData, 0);
      if (this.camera) {
        this.camera.destroy();
      }
      this.events.clear();
      this.camera = null;
      this.renderData = null;
      this.events = null;
    }
  };

  // ../phaser-genesis/src/world/CreateWorldRenderData.ts
  function CreateWorldRenderData(world, camera) {
    return {
      world,
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
      this.type = "StaticWorld";
      this.camera = new StaticCamera();
      this.renderData = CreateWorldRenderData(this, this.camera);
    }
  };

  // examples/src/gameobjects/sprite/debug sprite.ts
  var Demo = class extends Scene {
    constructor() {
      super();
      const world = new StaticWorld(this);
      const loader = new Loader();
      loader.add(ImageFile("logo", "assets/logo.png"));
      loader.start().then(() => {
        const logo = new Sprite(400, 300, "logo");
        AddChildren(world, logo);
        new SpriteEditor(logo);
      });
    }
  };
  new Game(WebGL(), Parent("gameParent"), GlobalVar("Phaser4"), BackgroundColor(4033837), Scenes(Demo));
})();
/*! Tweakpane 2.4.3 (c) 2016 cocopon, licensed under the MIT license. */
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
//# sourceMappingURL=debug sprite.js.map
