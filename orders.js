// Export these assets

const logHistory = (msg) => {
  let separator = ""
  if (orderHistory.querySelector("p").innerHTML.length) {
    separator = "<hr />"
  }
  orderHistory.querySelector("p").innerHTML += separator + msg
}

const accounts = {
  regular: {
    receipts: 0,
    unitPrice: 3.45,
  },
  deluxe: {
    receipts: 0,
    unitPrice: 6.45,
  },
  spicy: {
    receipts: 0,
    unitPrice: 4.3,
  },
  tips: 0,
  addFunds(orderObj) {
    for (let item of Object.values(orderObj.items)) {
      let price = this[item.itemname].unitPrice
      let total = price * item.count
      this[item.itemname].receipts += total.toFixed(2)
    }
  },
  getCosts(orderObj) {
    let total = 0
    for (let item of Object.values(orderObj.items)) {
      let price = this[item.itemname].unitPrice
      total += price * item.count
    }
    return total
  },
}

const inventory = {
  regular: {
    name: "Regular Chicken Sandwich",
    count: 10,
  },
  deluxe: {
    name: "Deluxe Chicken Sandwich",
    count: 10,
  },
  spicy: {
    name: "Spicy Chicken Sandwich",
    count: 10,
  },
}

const orderDetails = {
  orderNum: 0,
  custName: null,
  items: [],
  timestamp: null,
  show() {
    let msg = `Order #${this.orderNum}: ${this.custName} at ${
      this.timestamp
    }:<br /> ${JSON.stringify(this.items)}`
    Array(orderStatus, orderHistory).forEach((obj) =>
      obj.classList.remove("hide")
    )
    orderStatus.querySelector("p").innerHTML = msg
    logHistory(msg)
  },
  process() {
    const sandwiches = Object.values(this.items)
    // check availability for all sandwiches
    for (let sandwich of sandwiches) {
      let stockitem = inventory[sandwich.itemname]
      if (stockitem.count < sandwich.count) {
        throw new Error(`Oh no! We're out of ${stockitem.name}!`)
      }
    }
    // decrement the sandwich count
    for (let sandwich of sandwiches) {
      let stockitem = inventory[sandwich.itemname]
      stockitem.count -= sandwich.count
    }
    this.orderNum += 1
  },
}
