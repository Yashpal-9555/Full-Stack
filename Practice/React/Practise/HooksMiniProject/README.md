Random Password Generation: Automatically generates a password when the application loads.

Custom Password Length: Adjust the password length using a range slider from 8 to 24 characters.

Include Numbers: Option to include numeric characters (0–9) in the password.

Include Special Characters: Option to include special characters in the password.

Copy to Clipboard: Copy the generated password with a single click.

Dynamic Updates: Automatically generates a new password when the length or character options change.

Responsive UI: Clean interface styled using Tailwind CSS.

🛠️ Tech Stack

React.js – Building the user interface.

JavaScript (ES6+) – Password generation logic.

Tailwind CSS – Styling and responsive layout.

React Hooks:

useState – Manages password length, selected options, and generated password.

useCallback – Memoizes the password generation and copy functions.

useEffect – Generates a password when the application loads or relevant settings change.

useRef – References the password input for selection and copying.


🧠 How It Works

1. State Management

The application uses React's useState hook to manage the password length, character options, and generated password.

2. Password Generation

The passwordGenerator function creates a character pool containing uppercase and lowercase letters. Depending on the selected options, it adds numbers and special characters.

It then randomly selects characters from the pool until the selected password length is reached.

3. Automatic Password Updates

The useEffect hook calls the password generator when the component loads or when the password length, number option, or special-character option changes.

4. Copy to Clipboard

The useRef hook provides access to the password input element. The copy function selects the password and uses the browser Clipboard API to copy it.