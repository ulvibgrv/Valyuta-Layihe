let lPara = document.querySelector(".left-currency-para");
let rPara = document.querySelector(".right-currency-para");
fetch("https://api.exchangerate.host/latest?base=RUB&symbols=USD")
  .then((res) => res.json())
  .then((data) => {
    lPara.innerText = `1 ${data.base} = ${data.rates.USD.toFixed(4)} USD`;
    lInp.addEventListener("keyup", (event) => {
      temp = lInp.value * data.rates.USD;
      rInp.value = temp.toFixed(4);
    });
  })
  .catch((err) => alert("Texniki Xəta (404!)"));

fetch("https://api.exchangerate.host/latest?base=USD&symbols=RUB")
  .then((res) => res.json())
  .then((data) => {
    rPara.innerText = `1 ${data.base} = ${data.rates.RUB.toFixed(4)} RUB`;
    rInp.addEventListener("keyup", (event) => {
      temp = rInp.value * data.rates.RUB;
      lInp.value = temp.toFixed(4);
    });
  })
  .catch((err) => alert("Texniki Xəta (404!)"));
let left = document.querySelector(".converter-left-buttons");
let lBtns = left.querySelectorAll(".btn");
for (let i = 0; i < lBtns.length; i++) {
  let current = document.getElementsByClassName("btn-active");
  lBtns[i].addEventListener("click", function () {
    current[0].className = current[0].className.replace(" btn-active", "");
    this.className += " btn-active";
    rBtns.forEach((rBtn) => {
      let lInp = document.querySelector(".left-inp-convert");
      if (rBtn.classList.contains("btn-active")) {
        let symbols = rBtn.innerText;
        fetch(
          `https://api.exchangerate.host/latest?base=${lBtns[i].innerText}&symbols=${symbols}`
        )
          .then((res) => res.json())
          .then((data) => {
            lPara.innerText = `1 ${lBtns[i].innerText} = ${Object.values(
              data.rates
            )[0].toFixed(4)} ${symbols}`;
            rPara.innerText = `1 ${symbols} = ${(
              1 / Object.values(data.rates)[0]
            ).toFixed(4)} ${lBtns[i].innerText}`;
            lInp.addEventListener("keyup", (event) => {
              temp = lInp.value * Object.values(data.rates)[0];
              rInp.value = temp.toFixed(4);
            });
          })
          .catch((err) => alert("Texniki Xəta (404!)"));
      }
    });
  });
}

let right = document.querySelector(".converter-right-buttons");
let rBtns = right.querySelectorAll(".btn");
for (let j = 0; j < rBtns.length; j++) {
  let current = document.getElementsByClassName("btn-active");
  rBtns[j].addEventListener("click", function () {
    current[1].className = current[1].className.replace(" btn-active", "");
    this.className += " btn-active";
    lBtns.forEach((lBtn) => {
      if (lBtn.classList.contains("btn-active")) {
        let symbols = lBtn.innerText;
        fetch(
          `https://api.exchangerate.host/latest?base=${rBtns[j].innerText}&symbols=${symbols}`
        )
          .then((res) => res.json())
          .then((data) => {
            rPara.innerText = `1 ${rBtns[j].innerText} = ${Object.values(
              data.rates
            )[0].toFixed(4)} ${symbols}`;
            lPara.innerText = `1 ${symbols} = ${(
              1 / Object.values(data.rates)[0]
            ).toFixed(4)} ${rBtns[j].innerText}`;
            rInp.addEventListener("keyup", (event) => {
              temp = rInp.value * Object.values(data.rates)[0];
              lInp.value = temp.toFixed(4);
            });
          })
          .catch((err) => alert("Texniki Xəta (404!)"));
      }
    });
  });
}
let rInp = document.querySelector(".right-inp-convert");
rInp.addEventListener("keyup", (event) => {
  if (event.target.value.includes(",") == true) {
    rInp.value = `${event.target.value.replaceAll(",", ".")}`;
  }
});
let lInp = document.querySelector(".left-inp-convert");
lInp.addEventListener("keyup", (event) => {
  if (event.target.value.includes(",") == true) {
    lInp.value = `${event.target.value.replaceAll(",", ".")}`;
  }
});
