import { SalaryCalculator } from "./irpf.js";

function showSalary() {

    const salaryInput = document.getElementById('salary');
    const resultDiv = document.getElementById('result');

    if(salaryInput.value === '') {
        resultDiv.innerHTML = '<b style="color:crimson">Por favor, introduzca un salario.</b>';
        return;
    }

    let result = SalaryCalculator.calcWithTaxes(salaryInput.value);
    let extra = SalaryCalculator.extraPayment(salaryInput.value);
    let irpf = SalaryCalculator.getIrpf(salaryInput.value);

    resultDiv.innerHTML = `<b>Salario neto mensual: ${result}€</b>`;
    resultDiv.innerHTML += `<br><b>Paga extra: ${extra}€</b>`;
    resultDiv.innerHTML += `<br><b>Porcentaje IRPF: ${irpf}%</b>`;
}

function setDarkMode() {
    document.documentElement.dataset.theme = 'dark';
}

function setLightMode() {
    document.documentElement.dataset.theme = 'light';
}

function toggleTheme() {

    if(document.documentElement.dataset.theme === 'dark') {
        setLightMode();
    } else {
        setDarkMode();
    }

}

async function load() {
    await SalaryCalculator.load();

    const footer = document.querySelector('footer');
    footer.innerHTML = footer.innerHTML.replace('$year', new Date().getFullYear());

    const themeButton = document.getElementById('theme');
    themeButton.onclick = toggleTheme;

    const calculateButton = document.getElementById('calculate');
    calculateButton.onclick = showSalary;

    const salaryInput = document.getElementById('salary');
    salaryInput.focus();
}

window.onload = load();
