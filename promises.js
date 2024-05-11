/* 
1. Import key needed assets:
  orders.js - orderDetails, accounts
  utils.js - msgUpdate, replaceClass
  selectors.js - orderForm, payForm, presentFood

2. Write a promise function: 'updateInventory(order)', based on the instructions starting around line 63
*/

function takeOrder() {
  return new Promise((resolve, reject) => {
    presentFood.innerHTML = ""
    msgUpdate("May I have your name and your order?")
    replaceClass("#orderForm", "show")
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault() // Prevent form submission
      const inputs = event.target.querySelectorAll("select")

      orderDetails.custName = event.target.custName.value
      orderDetails.timestamp = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
      orderDetails.items = []
      inputs.forEach(({ name: itemname, value }) => {
        if (value > 0) {
          orderDetails.items.push({ itemname: itemname, count: value })
        }
      })

      if (orderDetails.items.length) {
        resolve(orderDetails)
      } else {
        msgUpdate("No items selected! Please try again.")
        reject("No items were selected.")
      }
    })
  })
}

function getPayment(order) {
  return new Promise((resolve, reject) => {
    msgUpdate("Getting get your total...")
    replaceClass("#orderForm", "hide")
    let due = 0
    due = accounts.getCosts(order)
    setTimeout(() => {
      msgUpdate(`Your total today is $${due}.`)
      replaceClass("#payForm", "show")
    }, 2000)
    payForm.addEventListener("submit", (event) => {
      // WARNING: Adding an event listener within a function is problematic because a new listener is added every time
      event.preventDefault()
      const tendered = Number(event.target.querySelector("#USD").value)
      if (tendered >= due) {
        replaceClass("#payForm", "hide")
        resolve(order)
      } else {
        reject("Sorry, you didn't pay enough!")
      }
    })
  })
}

/* Write a promise function: 'updateInventory(order)'
1. It will take as its sole argument the orderDetails
2. It will use a try/catch pattern to invoke a series of methods: 
  a. order.process()
  b. accounts.addFunds(order)
  c. order.show()
3. Also within the try, do the following:
  a. Use the msgUpdate imported function to say, "Thanks! We're prepping your order..."
  b. Use the resolve callback to send the order object - you can also wrap the resolve call in a setTimeout() for 5 seconds
4. Within the catch, invoke the reject callback, using the catch error data as its argument
*/

function cookSandwich(order) {
  return new Promise((resolve, reject) => {
    msgUpdate(`Your food is cooking...`)
    fetch("https://1ouruk-8080.csb.app/prepare_meal", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.json()) //.json() is a promise
      .then((data) => {
        data.status === 1 ? resolve(data) : reject(data)
      })
      .catch((err) =>
        reject({
          msg: `FAILED TO MAKE YOUR MEAL! ${err}`,
          status: 2,
        })
      )
  })
}

function serveMeal(cookedOrder) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cookedOrder.foodImgs.forEach((imgURL) => {
        presentFood.innerHTML += `<img src=${imgURL} />`
      })
      msgUpdate(`It has been our pleasure to serve you!`)
      resolve("Success!")
    }, 3000)
  })
}

export default {
  updateInventory,
  getPayment,
  cookSandwich,
  serveMeal,
  takeOrder,
}
