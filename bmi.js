document.getElementById('bmiForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const weight = parseFloat(document.getElementById('weight').value);
  const heightCm = parseFloat(document.getElementById('height').value);
  
  const heightM = heightCm / 100;
  
  const bmi = weight / (heightM * heightM);
  
  const bmiRounded = bmi.toFixed(2);
  
  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }
  
  
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `Your BMI is <strong>${bmiRounded}</strong>. Category: <strong>${category}</strong>.`;
  

  this.reset();
});
