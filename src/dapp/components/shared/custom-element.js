export default class CustomElement extends HTMLElement {

    static get METHOD_GET() {
        return 'get'
    }

    static get METHOD_POST() {
        return 'post'
    }

    static get ATTRIBUTE_CATEGORY() {
        return 'category'
    }
    static get ATTRIBUTE_DESCRIPTION() {
        return 'description'
    }

    static get attributes() {
        return [
            CustomElement.ATTRIBUTE_CATEGORY,
            CustomElement.ATTRIBUTE_DESCRIPTION
        ];
    }

    // Creates getters and setters for all custom attributes
    constructor(props, ...args) {
        const self = super(...args);
        
        let allProps = CustomElement.attributes.concat(props);
        allProps.map((prop) => {
            Object.defineProperty(self, prop, {
                get: function () {
                    return self.getAttribute(prop);
                },
                set: function (new_value) {
                    if (new_value) {
                        self.setAttribute(prop, new_value);
                    } else {
                        self.removeAttribute(prop);
                    }
                }
            });
        });    

        self.rendered = false;
    }


    connectedCallback() {
        let self = this;

        if (self.render) {
            self.rendered = true;
            self.render();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let self = this;
        if ((oldValue !== newValue) && (self.rendered)) {
            if (self.render) {
                self.innerHTML = '';
                self.rendered = true;
                self.render();
            }
        }
    }

    disconnectedCallback() {
        //console.log('disconnectedCallback');
    }

    adoptedCallback() {
        // console.log('adoptedCallback');
    }

}


