document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("close")[0];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById("income").value);
    const extraIncome =
      parseFloat(document.getElementById("extraIncome").value) || 0;
    const deductions =
      parseFloat(document.getElementById("deductions").value) || 0;
    const age = document.getElementById("age").value;

    let tax = 0;
    let netIncome = income + extraIncome - deductions;
    if (netIncome > 800000) {
      if (age === "<40") {
        tax = 0.3 * (netIncome - 800000);
      } else if (age === "≥40 & <60") {
        tax = 0.4 * (netIncome - 800000);
      } else if (age === "≥60") {
        tax = 0.1 * (netIncome - 800000);
      }
      netIncome -= tax;
    }

    document.getElementById(
      "taxResult"
    ).innerText = `Net Income after Tax Deduction: ${netIncome.toFixed(
      2
    )} Lakhs`;
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorIcon = this.nextElementSibling;
      if (!this.checkValidity()) {
        errorIcon.style.display = "inline-block";
      } else {
        errorIcon.style.display = "none";
      }
    });
  });
});
