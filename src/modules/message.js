class Message {
    constructor(props) {
        this.message = props.message;
        this.type = props.type;
        this.options = props.options;
        this.container = props.container;
        this.el = document.createElement('div');
        this.el.className = `update-message update-${this.type} fade ${this.options.placement}`;

        if (props.options.element) {
            this.el.className += ' in-container';
        }

        // this.el.setAttribute('role', 'alert');
        const html = this.template();
        this.el.innerHTML = html;
    }
    mount() {
        let context = this;
        if (this.options.placement.indexOf('top') !== -1) {
            this.container.insertBefore(this.el, this.container.firstChild);
        } else {
            this.container.appendChild(this.el);
        }

        //addclass show to trigger bootstrap show animation 
        this.el.className += ' show';

        if (this.options.dismissible) {
            this.el.className += ' update-message-dismissible';
            const closeBtn = this.el.querySelector('button.close');
            closeBtn.addEventListener('click', (e) => {
                const el = e.currentTarget.parentElement;
                context.removeMessage(el);
            })
        }

        if (!this.options.isSticky) {
            setTimeout((context) => {
                context.removeMessage(context.el);
            }, this.options.duration, this);
        }
    }
    removeMessage(messageElement) {
        messageElement.addEventListener("transitionend", function (e) {
            //e.target.remove(); //This is not supported by IE
            e.target.parentElement.removeChild(e.target);
        });

        //remove class show to trigger bootstrap hide animation
        messageElement.className = messageElement.className.replace(/\bshow\b/g, "");
        //currentNode.classList.remove('show'); //classList not working in IE11
    }
    hide() {
        if (this.el.parentElement) {
            this.el.parentElement.removeChild(this.el);
        }
    }
    template() {
        let dismissButton = '';

        if (this.options.dismissible) {
            dismissButton = this.dismissBtnTemplate;
        }

        return `${this.message} ${dismissButton}`
    }

    dismissBtnTemplate = `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>`;
}

export default Message;