# 🐔 McCluckel's Drive-Thru
## Project Overview
The owners of the McCluckel's Chicken Sandwich Shop want to offer drive-thru window service. They've hired you to develop a workflow system that drives the process of taking an order, accepting payment, updating inventory, cooking the food, and serving the meal to the customer. Some parts of this solution have been built, but you need to supply missing elements and tie it all together in a working program. 

### Grading
This project is worth 15 points, weighted as follows:
- __10% — Adherence to Git/GitHub procedures__, including dev branching and pull request submission
- __10% — Setup of HTML page__, including proper boilerplate elements and linking of stylesheet and main JS file
- __40% — JavaScript code__, including proper use of ES6 modules, event handling, promises, object handling, and scope management
- __25% — Overall solution completeness and effectiveness__, as shown by meeting the requirements outlined below
- __15% — Creativity and innovation__, including your custom enhancements that improve the product beyond the requirements

### Getting Started
Follow the instructions under [Getting Started](#getting-started--1x-repo-configuration) to clone this repository and set up a dev branch.

## Business Requirements
### 1. User Interface
1. Orders will be submitted via browser, using a simple HTML form.
2. Customers will see real-time feedback for the following:
   1. Order details: customer name, order number, time of order, sandwich type(s), quantity for each
   2. Current workflow status (e.g., prepping, cooking).
3. Customers will "pay" for their orders through the browser interface, typing the amount and clicking a "Pay" button. 
   1. Failure to pay an adequate amount will result in order failure (see below).
4. Upon completion of the transaction, the customer will receive an appropriate message
   1. Success: Thank you notice with presentation of food (i.e., images of the food) 
   2. Failure: "Sorry" notice (e.g., "Sorry! We could not complete your order").

### 2. Payment System
1. Full payment must be received from the customer prior to submitting the order to the kitchen. 
2. Underpayment will result in a canceled order and a refund.
3. Overpayments get tracked as tips for employees. McCluckels does not give change. 
3. If a payment is successful but the order cannot be fulfilled for any reason, then the order will be canceled. The funds __do not__ get counted as receipts.
4. All successful orders/payments will be accumulated (session totals) in the receipts for the given product (e.g., regular, spicy, deluxe). 
   1. Accumulate the exact amount of the purchases only. (Reminder: Overpayments go as tips to employees.)

### 3. Process Steps
A successful order will have the following sequence:
1. Take order
2. Accept payment
3. Update inventory _Note: This is tracked at a product name level, not at element level (e.g., buns, patties)_
4. Submit order to kitchen and receive food
5. Serve meal and thank customer

## Technical Requirements
### 1. User Interface
1. Use an HTML form to gather the order details (sandwich types and quantity of each), along with a "submit" button. 
2. Use an HTML form to gather payment amount (input field) along with a "pay" button. 
3. Use an event handler on each button: 
   1. Suppress the default form submit button behavior.
4. Gather the order form's field values into the `orderDetails` object.
5. Provide HTML tags with unique id attributes so that you can target them with CSS (e.g., hide/show) and target them with content (e.g., `innerHTML` or `textContent`. 
   1. Messages — Where messages to the customer can be seen
   2. Order status — Where the details of the current order are displayed
   3. Order history — Where you can track orders that have been fulfilled
   4. Current sales totals (admin area in footer) — Where you can see incoming receipts/revenue by sandwich type
   5. Inventory levels (sandwiches remaining) — Where you can see how many sandwiches remain in inventory

### 2. Payment System
1. The price of each sandwich will be stored within the `accounts` JS object. 
2. Your program will dynamically consult the `accounts` object when determining how much money to require for payment. 
3. If an order is __fulfilled__, then the dollar amount is added to "receipts" counter.
4. If an order is __rejected__, then dollar amount __is not__ added to the "receipts" counter. _NOTE: Any sandwich ordered beyond supply levels will be rejected._
5. Use DOM handling techniques (e.g., `querySelector()`) to push to the footer your updated totals on sales figures by sandwich type. This will be the sum (dollar format with two decimals) of all orders taken for the day/session. For example,
   1. Regular Chicken Sandwich: $120.00
   2. Spicy Chicken Sandwich: $52.45
   3. Deluxe Chicken Sandwich: $230.00

### 3. Process Steps
_NOTE: Promises will be central to your asynchronous program. Each step will exist as a unique "promise" object, for example:_
```
// Asynchronous promise event with 3 second timeout
function doSomething(orderNum){
  return new Promise((resolve, reject) => {
    if(orderNum){
      const msg = "Thanks for your order, please standby..."
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

1. Make sure a Promise exists for each step in your flow:
   1. Take order
   2. Accept payment
   3. Update inventory — This is tracked at a product name level (e.g., "regular," "spicy"), not at an ingredient level (e.g., buns, patties)
   4. Submit kitchen order and receive food — This will involve a `fetch()` call to an external API that returns the food [image URLs])
   5. Serve meal and thank customer
2. Give each promise a `setTimeout()` delay to simulate the time it takes to fulfill an order and to give the promise the quality of being an asynchronous event.
   1. Exception: This is not required for the kitchen order promise, which already has a `fetch()` API call that is asynchronous.
3. Use the `fetch` API to submit your order to the kitchen. Your request will go to an external URL as shown below:  
```
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
        reject("Failed to make your meal!")
      )
```
4. Fetch API response handling:
   1. A successful response from the kitchen will include the image URL(s) to display on your HTML page. 
   2. An unsuccessful response from the kitchen will be a status of 2 and a failure message for display to the customer.
5. Once all your promises are ready, then link them together so that their execution relies on the success of the previous promise. Example:
```
takeOrder()
  .then((data) => {
    getPayment(data)
  })
  .then((data) => {
    updateInventory(data)
  })
  /* And so on...
  ...with more promises. */
   .catch((err) => {
     catchHandler(err)
   })
```
6. At the end of your promise chain, include a `finally()` statement that calls the `resetUI()` function so that the system is ready to take the next order.
7. Improve your code by using async/await. _NOTE: This will be discussed on Wednesday._ 

### Submitting Your Code
Follow the instructions below for [Submitting Your Code via GitHub](#submitting-your-code-via-github). Upon submittal, the instructor will do the following: 
- Review your code and make any comments on your pull request
- Merge the accepted code into the "main" branch of the remote repo on GitHub
- Close the pull request 

### Additional Advice / ChatGPT
You have a great deal of flexibility with how you fulfill the requirements of this assignment. Your instructor will provide guidance along the way, and you can and should use the Slack channel for Q&A. 

You are permitted to use ChatGPT to help complete this assignment. However, if you use this AI tool, then you must also submit a 250-word essay — **in your own words** — to describe how you used it, what the results were, and whether you found it helpful to your learning experience.

## Getting Started — One-Time Repo Configuration

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
