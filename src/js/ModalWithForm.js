import templateEngine from './TemplateEngine';
import eventBus from './EventBus';

export default class ModalWithForm {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
  }

  render() {
    return templateEngine.generate({
      type: 'div',
      attr: {
        class: ['modal__form'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['modal__background'],
          },
          content: '',
        },
        {
          type: 'div',
          attr: {
            class: ['modal__content'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['modal__header'],
              },
              content: '',
            },
            {
              type: 'div',
              attr: {
                class: ['modal__body'],
              },
              content: {
                type: 'form',
                attr: {
                  class: ['modal__form'],
                  name: 'modal-form',
                },
                content: [
                  {
                    type: 'div',
                    attr: {
                      class: ['form__group'],
                    },
                    content: [
                      {
                        type: 'label',
                        attr: {
                          class: ['form__label'],
                          for: 'username-field',
                        },
                        content: 'Username',
                      },
                      {
                        type: 'input',
                        attr: {
                          class: ['form__input'],
                          id: 'username-field',
                          name: 'username',
                          placeholder: 'Please enter your name...',
                        },
                        content: '',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'div',
              attr: {
                class: ['modal__footer'],
              },
              content: [
                {
                  type: 'div',
                  attr: {
                    class: ['modal__close'],
                  },
                  listener: {
                    type: 'click',
                    cb: (event) => this.close(event),
                  },
                  content: 'Close',
                },
                {
                  type: 'div',
                  attr: {
                    class: ['modal__ok'],
                  },
                  listener: {
                    type: 'click',
                    cb: () => this.submit(),
                  },
                  content: 'Ok',
                },
              ],
            },
          ],
        },
      ],
    });
  }

  bindToDOM() {
    this.container.appendChild(this.render());
  }

  submit() {
    const { formElement } = this;
    const data = {
      username: formElement.elements.username.value,
    };
    this.modalElement.querySelector('.modal__header').textContent = '';
    this.close();
    eventBus.emit('submit', data);
  }

  close() {
    this.clearForm();
    this.modalElement.classList.remove('active');
  }

  showModal() {
      this.modalElement.classList.add('active');
  }

  get modalElement() {
    return this.container.querySelector('.modal__form');
  }

  get formElement() {
    return this.modalElement.querySelector('form');
  }

  clearForm() {
    const { formElement } = this;
    formElement.elements.username.value = '';
  }
}
