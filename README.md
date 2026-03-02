💳 Smart Card Validator (Luhn Algorithm)
Ek high-performance credit card validation system jo standard Luhn's Algorithm (Mod 10) ka istemal karke card numbers verify karta hai. Yeh project real-time UI updates aur robust backend validation ka ek perfect combo hai.

🌟 Key Features
Real-time IIN Detection: Automatically identifies card networks (Visa, MasterCard, Amex, Discover) based on prefix digits.

Dynamic Formatting: Input field mein card numbers automatically format hote hain (spaced groups) jaise-jaise user type karta hai.

Backend Verification: Sirf frontend hi nahi, Node.js API se bhi Luhn Checksum verify hota hai for extra security.

Responsive Professional UI: Clean animations aur success/error modals jo real payment gateways jaisa feel dete hain.

🛠 Tech Stack
Frontend: HTML5, CSS3 (Custom Properties), Vanilla JavaScript (ES6+)

Backend: Node.js, Express.js

Security: Luhn Algorithm Checksum implementation

🧮 How the Algorithm Works
Luhn formula (Mod 10) card errors aur typos ko catch karne ka industry standard hai. Isme hum:

Har dusre digit ko (right side se) double karte hain.

Agar doubling ke baad number >9 ho jaye, toh hum digits ka sum lete hain (e.g., 16→1+6=7).

Sabhi digits ka final sum agar 10 se divisible hai, toh card Valid hai.

🚀 Installation & Setup
Repo Clone Karein:

Bash
git clone https://github.com/your-username/payment-validator.git
cd payment-validator
Backend Setup:

Bash
cd backend
npm install
node server.js
Frontend Launch:
Apne browser mein index.html open karein (Live Server extension use karna best hai).

🧪 Demo Test Data
Card Type	Number (Example)	Status
Visa	4111 1111 1111 1111	✅ Valid
MasterCard	5555 5555 5555 4444	✅ Valid
Invalid	4111 1111 1111 1112	❌ Invalid
🛡️ Disclaimer
Yeh project sirf Educational Purposes ke liye hai. Koi bhi real payment data store nahi kiya jata aur na hi real transaction process hota hai.

👨‍💻 Author
Arman Choudhary
B.Tech in Computer Science & Engineering