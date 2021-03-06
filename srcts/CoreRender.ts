class CoreRender {
  protected createElement(tag: string, classList: string[], html: string = ''): HTMLElement {
    const element: HTMLElement = document.createElement(tag);
    classList.forEach((className) => {
      element.classList.add(className);
    });
    if (html) {
      element.innerHTML = html;
    }
    return element;
  }

  protected createInputElement(classList: string[], html: string = ''): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    classList.forEach((className) => {
      element.classList.add(className);
    });
    if (html) {
      element.innerHTML = html;
    }
    return element;
  }
}

export default CoreRender;
