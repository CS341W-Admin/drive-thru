// Export all of these utilities

function msgUpdate(text) {
  document.querySelector("#custMsg p").textContent = text
}

function resetUI() {
  Array(orderForm, payForm).forEach((obj) => {
    obj.classList.add("hide")
    obj.reset()
  })
  orderStatus.classList.add("hide")
  startBtn.classList.remove("hide")
}

function replaceClass(classSelector, newClassName) {
  const matchedElements = document.querySelectorAll(classSelector)
  matchedElements.forEach((element) => {
    element.classList = ""
    element.classList.add(newClassName)
  })
}

function catchHandler(err) {
  msgUpdate(err.message || err)
  replaceClass("custMsg", "warning")
}
