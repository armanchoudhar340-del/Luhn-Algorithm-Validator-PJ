/**
 * Luhn Algorithm Manual Implementation
 * 1. Reverse the digits.
 * 2. Multiply every second digit by 2.
 * 3. If the result is > 9, subtract 9.
 * 4. Sum all digits.
 * 5. If total % 10 is 0, it's valid.
 */
const validateLuhn = (number) => {
    // Remove all non-digit characters
    const sanitized = number.replace(/\D/g, "");
    if (!sanitized || sanitized.length < 13) return false;

    let sum = 0;
    let shouldDouble = false;

    // Iterate from right to left
    for (let i = sanitized.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitized.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

// Validation Helpers
const validateExpiry = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(value)) return false;

    // Check if date is in the future
    const parts = value.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt("20" + parts[1], 10);
    const now = new Date();
    const expiry = new Date(year, month);
    return expiry > now;
};

const validateCVV = (value) => /^\d{3,4}$/.test(value);

// API Integration
async function validateCardWithAPI(cardNumber) {
    try {
        const response = await fetch("http://localhost:5000/validate-card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cardNumber })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

// UI Logic
document.addEventListener("DOMContentLoaded", () => {
    const cardInput = document.getElementById("cardNumber");
    const expiryInput = document.getElementById("expiry");
    const cvvInput = document.getElementById("cvv");
    const validateBtn = document.getElementById("validateBtn");

    // Real-time Card Number Formatting & Auto-Detection
    const cardButtons = document.querySelectorAll(".card-btn");

    cardInput.addEventListener("input", (e) => {
        let cursorPosition = cardInput.selectionStart;

        // 1. Formatting Logic
        let rawValue = e.target.value.replace(/\D/g, "");
        rawValue = rawValue.substring(0, 16);
        let formatted = rawValue.replace(/(.{4})/g, "$1 ").trim();
        e.target.value = formatted;

        // Restore cursor position properly
        cardInput.setSelectionRange(cursorPosition, cursorPosition);

        // 2. Auto-Detection Logic
        let cardType = "";

        if (/^4/.test(rawValue)) {
            cardType = "VISA";
        } else if (/^5[1-5]/.test(rawValue)) {
            cardType = "MASTER";
        } else if (/^3[47]/.test(rawValue)) {
            cardType = "AMEX";
        } else if (/^6(?:011|5)/.test(rawValue)) {
            cardType = "DISCOVER";
        }

        // Update active button
        cardButtons.forEach(btn => btn.classList.remove("active"));
        cardButtons.forEach(btn => {
            if (btn.innerText === cardType) {
                btn.classList.add("active");
            }
        });
    });

    // Manual selection still allowed
    cardButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            cardButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Real-time Expiry Formatting (MM/YY)
    expiryInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
        } else {
            e.target.value = value;
        }
    });

    validateBtn.addEventListener("click", () => {
        let isValid = true;

        // Reset UI
        document.querySelectorAll("input").forEach(input => input.classList.remove("error-border"));
        document.querySelectorAll(".error").forEach(err => err.textContent = "");

        // Validate Card
        if (!validateLuhn(cardInput.value)) {
            cardInput.parentElement.parentElement.querySelector(".error").textContent = "Invalid card number.";
            cardInput.classList.add("error-border");
            isValid = false;
        }

        // Validate Expiry
        if (!validateExpiry(expiryInput.value)) {
            expiryInput.parentElement.parentElement.querySelector(".error").textContent = "Invalid expiry (MM/YY).";
            expiryInput.classList.add("error-border");
            isValid = false;
        }

        // Validate CVV
        if (!validateCVV(cvvInput.value)) {
            cvvInput.parentElement.parentElement.querySelector(".error").textContent = "Invalid CVV.";
            cvvInput.classList.add("error-border");
            isValid = false;
        }

        if (isValid) {
            // Call API for final confirmation
            validateCardWithAPI(cardInput.value).then(result => {
                if (result && result.valid) {
                    showModal();
                } else {
                    cardInput.parentElement.parentElement.querySelector(".error").textContent = "Invalid card (Backend failed).";
                    cardInput.classList.add("error-border");
                }
            });
        }
    });
});

// Modal Control Functions
function showModal() {
    document.getElementById("successModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("successModal").style.display = "none";
}
