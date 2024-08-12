import { useCallback } from 'react';

const useTypewriter = () => {
  return useCallback((htmlContent, index, t) => {
    let i = 0
    const speed = t
    const tempElement = document.createElement('div')
    tempElement.innerHTML = htmlContent

    const textContent = Array.from(tempElement.childNodes).reduce((acc, node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return acc + node.textContent
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
        return acc + '\n'
      }
      return acc
    }, '')

    const type = () => {
      if (i < textContent.length) {
        if (textContent.charAt(i) === '\n') {
          index.innerHTML += '<br/>'
        } else {
          index.innerHTML += textContent.charAt(i)
        }
        i++
        setTimeout(type, speed)
      }
    }
    type()

  }, []);
};

export default useTypewriter;
