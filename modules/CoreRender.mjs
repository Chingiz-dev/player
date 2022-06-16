class CoreRender {
  createElement(tag, classList, html) {
    const element = document.createElement(tag);
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
