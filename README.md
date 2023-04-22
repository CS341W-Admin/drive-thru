# 🐔 McCluckel's Drive-Thru
## Project Overview
The owners of the McCluckel's Chicken Sandwich Shop want to offer drive-thru window service. They've hired you to develop a workflow system that automates the process of taking an order, sending an order to the kitchen and receiving a response, accepting payment, and serving the food to the customer. Some parts of this solution have been built, but you need to supply missing elements and tie it all together in a working program. 

### Getting Started
Follow the instructions under [Getting Started](#getting-started--1x-repo-configuration) to clone this repository and set up a dev branch.

## Business Requirements
### 1. User Interface
1. Orders will be submitted via browser, using a simple HTML form.
2. Customers will see the results of processing on the screen for the following:
   1. Order details: customer name, order number, time of order, sandwich type(s), quantity for each, and total price)
   2. Current status of order
3. Customers will "pay" for their orders through the browser interface, typing the amount and clicking a "Pay" button. 
4. Upon completion of the transaction, the customer will receive an appropriate message (e.g., "Thank you," "Sorry we could not complete your order,").

### 2. Payment System
1. Full payment must be received from the customer prior to submitting the order to the kitchen. 
2. Overpayments will be used as tips, whereas underpayment will result in a canceled order and a refund.
3. If a payment is successful but the order cannot be fulfilled, then this will result in a canceled order and a refund.
4. All successful orders/payments are accumulated in the "cash drawer." Accumulate the exact full amount of the purchase only.
5. McCluckels does not give change. Any overpayments go to employees immediately and are not tracked. 

### 3. Process Steps
A successful order will have the following sequence:
1. Take order
2. Accept payment
3. Submit order to kitchen and receive food
4. Serve meal
5. Thank customer

## Technical Requirements
### 1. User Interface
1. Use an HTML form to gather the order details (sandwich types and quantity of each), along with a "submit" button. 
2. Use an HTML form to gather payment amount (input field) along with a "pay" button. 
3. Use an event handler on each button: 
   1. Suppress the default form submit button behavior.
   2. Gather the field values into an object or objects representing the current order.
4. Provide `<div>` tags with unique id attributes for you to target with innerHTML or textContent. 
   1. Greetings
   2. Order status
   3. Amount due
   4. Current amount in the cash drawer

### 2. Payment System
1. The cost of each sandwich will be stored in a pricing table, represented by a JS object. 
2. Your program will dynamically consult the pricing table when determining how much money to require for payment. 
3. Payment status can be tracked as a property on the current order object, e.g., a simple Boolean `payment:true|false`.
4. If an order is rejected, then 
   1. Payment status reverts to `payment:false`.
   2. Dollar amount is not added to the cash drawer amount.
5. If an order is fulfilled and served, then the dollar amount is added to the cash drawer amount and displayed on the screen.

### 3. Process Steps
Promises will be central to your asynchronous program. Each step will exist as a unique "promise" object, for example:
```
// Asynchronous promise event with 3 second timeout
function doSomething(orderNum){
  return new Promise((resolve, reject) => {
    if(orderNum){
      const msg = {
        msg: `Processing order number ${orderNum}!`,
      }
      setTimeout(() => {
        resolve(msg)
      }, 3000)
    } else {
      reject("You need an order number")
    }
  })
}
```
_REMINDER: A promise-based function will always return a `new Promise`._

1. Write a promise for each step in your flow:
   1. Take order - synchronous/blocking; do not use a setTimeout()
   2. Accept payment - asynchronous/blocking; use a setTimeout() delay between 2-5 seconds
   3. Submit order to kitchen and receive food - asynchronous/blocking; use `fetch` API (see below)
   4. Serve meal - synchronous/blocking, use a setTimeout() delay between 2-5 seconds
   5. Thank customer - synchronous/blocking code (this could be done without a promise)
2. Use the `fetch` API to submit your order to the kitchen. Your request will go to the URL as shown below:  
```
function kitchenCall(order){
    return new Promise((resolve, reject) => {
      fetch("https://yylsnf-8080.csb.app/prepare_meal", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => data.json())
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
```
3. Fetch API response handling:
   1. A successful response from the kitchen will include the image URL(s) to display on your HTML page. 
   2. An unsuccessful response from the kitchen will be a status of 2 and a message to display to the customer.
4. Link together your promises so that their execution relies on the success of the previous promise. Example:
```
takeOrder()
  .then((data) => {
    getPayment(data)
  })
  .then((data) => {
    kitchenCall(data)
  })
  .then((data) => {
    serveMeal(data)
  })
  .catch((err) => {
    document.querySelector("#orderStatus").textContent = err.msg
  })
```
5. Improve your code by using async/await - Which we'll learn about in Week 15
6. Follow the instructions below for [Submitting Your Code via GitHub](#submitting-your-code-via-github).

Upon submittal, the instructor will do the following: 
- Review your code and make any comments on your pull request
- Merge the accepted code into the "main" branch of the remote repo on GitHub
- Close the pull request 

### Additional Advice / ChatGPT
You have a great deal of flexibility with how you fulfill the requirements of this assignment. Your instructor will provide guidance along the way, and you can and should use the Slack channel for Q&A. 

You are permitted to use ChatGPT to help complete this assignment. However, if you use this AI tool, then you must also submit a 250-word essay — **in your own words** — to describe how you used it, what the results were, and whether you found it helpful to your learning experience.

## Getting Started — 1x Repo Configuration

   *NOTE: To execute these steps, you can use the terminal window in VSCode, the standard terminal app (Mac) or command prompt (Windows), or a popular third-party terminal emulator (e.g., iTerm2 for Mac, PuTTy or PowerShell for Windows).*

1. Make sure you have Git installed on your local machine. You can check by typing this command in the terminal window:
    ```
    git status
    ```
2. If the git command is not recognized, then download and install Git for your respective operating system (Mac, Windows, etc.):
    [link to Git download page](https://git-scm.com/downloads)

3. Create a project dev folder called "DriveThru".

    *NOTE: This is where the code project will be housed. If you're on a Mac, then you should create this folder within the 🔨 Developer folder. If you're on Windows, you might want to create your dev folder somewhere within your Documents directory. You can create this folder by using the File Explorer (Windows) or the Finder (Mac). Alternatively, you can create it from the terminal window (like a boss) as follows.*  
    - Run `pwd` to reveal the current folder path. *Move to the desired directory/folder within the terminal shell, as needed.* 
    - Run `mkdir DriveThru`. *The folder is created.*
    - Run `cd DriveThru`. *You are now in the new folder.* 

4. Clone the GitHub assignment repo into your new project dev folder:
    ```
    git clone --single-branch --branch main [assignment repo url] .
    ```
    *NOTE: Be certain to replace this — `[assignment repo URL]` — with your actual GitHub repo URL for this assignment, and **do not forget the trailing space and period**, which tells Git to use the current folder. For example:* 
    > `git clone --single-branch --branch main https://github.com/CS122J/drive-thru-John-Doe .`

5. Create a new branch called "dev-drivethru" and perform a check-out with the following one-line command:
    ```
    git checkout -b dev-drivethru
    ```
**Conclusion:** You are now ready to work in the "dev-drivethru" branch of your local repository. When you have finished making code changes and are ready to submit this assignment, then proceed to *Submitting Your Code via GitHub* below.

## Submitting Your Code via GitHub

1. Confirm that you're on the "dev-drivethru" branch. If you're not sure, then use the following commands to a) see what branch you're on, and b) switch to "dev-drivethru": 
    ```
    git branch
    git checkout dev-drivethru
    ```
2. Make sure any new files have been added to the local repo. Use `git add`... to add files/folders selectively, or use the global command (trailing dot):
   ```
   git add .
   ```
3. Commit any recent changes within your local repo — Do this *before* pushing your code:
   ```
   git commit -a -m "[your custom message]"
   ```
    *NOTE: Remember to replace this `[your custom message]` with your own message, such as, "Adding new code for drive-thru."*

4. Push your code to the "dev-drivethru" branch on the remote GitHub repository.

    *NOTE: If this is a first-time push, this action results in creation of the branch at the remote repo (GitHub) level; otherwise, this updates the existing "dev-drivethru" branch on the remote repo.*
    ```
    git push origin dev-drivethru
    ```
5. Log in at [https://github.com](https://github.com) and access this repo. 

    *NOTE: Your repo should appear in the left column when you log in. For more direct access, just follow the URL for this repo.* 
    
6. Perform the following steps to target your pull request: 
    - Click the "Pull requests" top menu link. *The Pull Requests panel appears.* 
    - Click the "New pull request" button. *The Compare Changes panel appears.*
    - Click the "compare" drop down-menu button. *A list of active branches appears.*
    - Click the "dev-drivethru" branch name. *GitHub automatically evaluates the selected branch against the main branch for any conflicts. If there are no conflicts, then a green "able to merge" message is displayed.*
    - Click the "Create pull request" button. *The "Open a pull request" input panel appears.*
7. Perform the following steps to finalize and submit your pull request:
    - Type a brief 1-line description for the request, such as, "Submitting code for drive-thru."
    - Use the "Write" textbox to leave any comments or questions about this exercise.
    - Click the "Submit" button.

**Conclusion:** You have completed the steps necessary to submit your code. 
