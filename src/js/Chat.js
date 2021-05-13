import templateEngine from './TemplateEngine';
import ModalWithForm from './ModalWithForm';
import eventBus from './EventBus';

export default class Chat {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.bindToDOM();
    this.registerEvents();
    this.modalWithForm = new ModalWithForm(this.container);
    this.modalWithForm.bindToDOM();
  }

  bindToDOM() {
    const template = templateEngine.generate({
      type: 'div',
      attr: {
        class: ['container'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['chat__header'],
          },
          content: {
            type: 'h1',
            attr: {
              class: ['chat__title'],
            },
            content: 'AstroMessenger',
          },
        },
        {
          type: 'div',
          attr: {
            class: ['chat__connect'],
          },
          content: 'Chat connect',
        },
        {
          type: 'div',
          attr: {
            class: ['chat__container'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['chat__area'],
              },
              content: [
                {
                  type: 'div',
                  attr: {
                    class: ['chat__messages-container'],
                  },
                  content: '',
                },

                {
                  type: 'div',
                  attr: {
                    class: ['chat__messages-input'],
                  },
                  content: {
                    type: 'form',
                    attr: {
                      class: ['form'],
                      name: 'form',
                    },
                    content: {
                      type: 'div',
                      attr: {
                        class: ['form__group'],
                      },
                      content: {
                        type: 'input',
                        attr: {
                          class: ['form__input'],
                          id: 'username-field',
                          name: 'username',
                          placeholder: 'Please enter your message...',
                          disabled: true
                        },
                        content: '',
                      },
                    },
                  },
                },
              ],
            },
            {
              type: 'div',
              attr: {
                class: ['chat__userlist'],
              },
              content: [
                {
                  type: 'div',
                  attr: {
                    class: ['chat__user'],
                  },
                  content: 'Kate',
                },
                {
                  type: 'div',
                  attr: {
                    class: ['chat__user'],
                  },
                  content: 'Art',
                }
              ],
            },
          ],
        },
      ],
    });
    this.container.appendChild(template);
  }

  registerEvents() {
    const connectButtonElement = this.container.querySelector('.chat__connect');
    connectButtonElement.addEventListener('click', () => this.modalWithForm.showModal());
  }
}
