export default function validateCardNumber(cardNumber) {
  // Разбиваем номер карты на цифры и переворачиваем его
  const digits = cardNumber.split('').map(Number).reverse();

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];

    if (i % 2 === 1) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  // Номер карты валиден, если сумма делится на 10 без остатка
  return sum % 10 === 0;
}
