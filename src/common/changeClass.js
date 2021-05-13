export const changeClass = (element, newClass) => {
  element.removeAttribute('class')
  element.setAttribute('class', `${newClass}`)
}

