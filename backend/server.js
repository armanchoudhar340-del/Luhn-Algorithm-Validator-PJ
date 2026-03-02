const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Luhn Algorithm Function
function validateLuhn(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Detect Card Type
function detectCard(cardNumber) {
    if (/^4/.test(cardNumber)) return "VISA";
    if (/^5[1-5]/.test(cardNumber)) return "MASTER";
    if (/^3[47]/.test(cardNumber)) return "AMEX";
    if (/^6(?:011|5)/.test(cardNumber)) return "DISCOVER";
    return "UNKNOWN";
}

app.post("/validate-card", (req, res) => {
    const { cardNumber } = req.body;

    if (!cardNumber) {
        return res.status(400).json({ error: "Card number is required" });
    }

    const cleanNumber = cardNumber.replace(/\s/g, "");

    const isValid = validateLuhn(cleanNumber);
    const cardType = detectCard(cleanNumber);

    res.json({
        valid: isValid,
        cardType: cardType
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
