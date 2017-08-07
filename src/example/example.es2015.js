'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
    var ExampleComponent = function (_HTMLElement) {
        _inherits(ExampleComponent, _HTMLElement);

        _createClass(ExampleComponent, null, [{
            key: 'is',

            /**
             * is returns the name of the component.  This is what the end-user
             * will use in their markup.  The is method is not spec, but convention
             * created by the Polymer framework.
             */
            get: function get() {
                return 'example-element';
            }
            /** 
             * Spec - observedAttributes defined what attributes should
             * the attributeChangedCallback function should be called for.
             * Note this should be defined as a static get method according
             * to the spec.
             */

        }, {
            key: 'observedAttributes',
            get: function get() {
                return [];
            }
            /** 
             * Lifecycle - Constructor is called during defineElement.  
             * It has not been add into the DOM yet.  Use the 
             * constructor to setup your local state, but not to
             * interact with inputs/outputs.  You must call super
             * constructor for HTMLElement first.
             */

        }]);

        function ExampleComponent() {
            _classCallCheck(this, ExampleComponent);

            var _this = _possibleConstructorReturn(this, (ExampleComponent.__proto__ || Object.getPrototypeOf(ExampleComponent)).call(this));

            var shadowRoot = _this.attachShadow({
                mode: 'open'
            });
            // https://github.com/webcomponents/html-imports#linkimport-is-not-a-document
            var ownerDoc = HTMLImports.importForElement(currentScript);
            var template = ownerDoc.querySelector('#example-element-template');
            var instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            _this.pEl = _this.shadowRoot.querySelector('.example-text');
            return _this;
        }
        /**
         * Lifecycle - The conconnectedCallback function is called once the 
         * component is added into the DOM.  This is where you will begin 
         * your applications logic and working with input.
         */


        _createClass(ExampleComponent, [{
            key: 'connectedCallback',
            value: function connectedCallback() {
                this.pEl.textContent = 'Example: After Connected Callback.';
            }
            /**
             * Lifecycle - The diconnectedCallback function is called once the compoennt
             * is removed from the DOM.  This is where you do any component cleanup.
             */

        }, {
            key: 'disconnectedCallback',
            value: function disconnectedCallback() {}
            /** 
             * Spec - The attributeChangedCallback is called mutations to any attribute 
             * defined in observedAttributes.  Note that this includes events where the new
             * value still equals the old value.  Be careful with recursive calls.
             */

        }, {
            key: 'attributeChangedCallback',
            value: function attributeChangedCallback(attrName, oldVal, newVal) {}
        }]);

        return ExampleComponent;
    }(HTMLElement);

    // document._currentScript is not availble inside the class scope.


    var currentScript = window.document._currentScript || window.document.currentScript;
    // Check if HTMLImports loaded is ready before defining component.
    // This is required because it is used to find the template document.
    if (window.HTMLImports !== undefined) {
        window.customElements.define(ExampleComponent.is, ExampleComponent);
    } else {
        // If not ready, listen for the custom event to signal it is.
        window.addEventListener('HTMLImportsLoaded', function () {
            window.customElements.define(ExampleComponent.is, ExampleComponent);
        });
    }
})();