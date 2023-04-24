/* 
Import these key needed assets:
  promises.js - [all of the promises!]
  utils.js - catchHandler, resetUI, replaceClass
*/

const doService = () => {
  replaceClass("#startBtn", "hide")
  replaceClass("#custMsg", "info")
  /* Launch a promise chain here:
  1. takeOrder
  2. getPayment
  3. updateInventory
  4. cookSandwich
  5. serveMeal

  Also, be sure to include the following:
  1. A 'catch' that leverages the catchHandler() callback
  2. A 'finally' that leverages the resetUI() callback 
  */
}

startBtn.addEventListener("click", () => doService())
