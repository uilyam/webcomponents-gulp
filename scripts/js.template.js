module.exports = `
(function(){
    class {{ component }} extends HTMLElement {
        /**
         * is returns the name of the component.  This is what the end-user
         * will use in their markup.  The is method is not spec, but convention
         * created by the Polymer framework.
         */
        static get is() {
            return '{{ element }}';
        }
        /** 
         * Spec - observedAttributes defined what attributes should
         * the attributeChangedCallback function should be called for.
         * Note this should be defined as a static get method according
         * to the spec.
         */
        static get observedAttributes() {
            return [];
        }
        /** 
         * Lifecycle - Constructor is called during defineElement.  
         * It has not been add into the DOM yet.  Use the 
         * constructor to setup your local state, but not to
         * interact with inputs/outputs.  You must call super
         * constructor for HTMLElement first.
         */
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });
            // https://github.com/webcomponents/html-imports#linkimport-is-not-a-document
            const ownerDoc = HTMLImports.importForElement(currentScript);
            const template = ownerDoc.querySelector('#{{ element }}-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }
        /**
         * Lifecycle - The conconnectedCallback function is called once the 
         * component is added into the DOM.  This is where you will begin 
         * your applications logic and working with input.
         */
        connectedCallback() {}
        
        /**
         * Lifecycle - The diconnectedCallback function is called once the compoennt
         * is removed from the DOM.  This is where you do any component cleanup.
         */
        disconnectedCallback() {}
       
        /** 
         * Spec - The attributeChangedCallback is called mutations to any attribute 
         * defined in observedAttributes.  Note that this includes events where the new
         * value still equals the old value.  Be careful with recursive calls.
         */
        attributeChangedCallback(attrName, oldVal, newVal) {}
    }

    // document._currentScript is not availble inside the class scope.
    const currentScript = window.document._currentScript || window.document.currentScript;
    // Check if HTMLImports loaded is ready before defining component.
    // This is required because it is used to find the template document.
    if (window.HTMLImports !== undefined) {
        window.customElements.define({{ component }}.is, {{ component }});
    } else {
        // If not ready, listen for the custom event to signal it is.
        window.addEventListener('HTMLImportsLoaded', function() {
            window.customElements.define({{ component }}.is, {{ component }});
        });
    }
}())
`