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
}

export default CoreRender;
