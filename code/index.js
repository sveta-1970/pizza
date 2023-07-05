const pizza = {
  userName: "",
  phone: "",
  email: "",
  size: 85,
  toppings: [],
  sauce: [],
};

const price = {
  size: {
    small: 50,
    mid: 80,
    big: 85,
  },
  toping: [
    { price: 20, name: "moc1" },
    { price: 45, name: "moc2" },
    { price: 12, name: "moc3" },
    { price: 93, name: "telya" },
    { price: 78, name: "vetch1" },
    { price: 34, name: "vetch2" },
  ],
  sauce: [
    { price: 60, name: "sauceClassic" },
    { price: 70, name: "sauceBBQ" },
    { price: 50, name: "sauceRikotta" },
  ],
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form#pizza").addEventListener("click", (e) => {
    //console.log(e.target.id);
    switch (e.target.id) {
      case "small":
        pizza.size = price.size.small;
        break;
      case "mid":
        pizza.size = price.size.mid;
        break;
      case "big":
        pizza.size = price.size.big;
        break;
    }
    show(pizza);
  });
  show(pizza);
  document.querySelector("#banner").addEventListener("mousemove", (e) => {
    randomPositionBanner(e.target, e.clientX, e.clientY);
  });

  document.querySelector("#banner button").addEventListener("click", () => {
    alert("Ваш промокод : XXXXXX");
  });
});

function randomPositionBanner(banner) {
  const coords = {
    X: Math.floor(Math.random() * document.body.clientWidth),
    Y: Math.floor(Math.random() * document.body.clientHeight),
  };

  const width =
    parseInt(getComputedStyle(document.querySelector("#banner"))["width"]) +
    100;

  if (coords.X + width > document.body.clientWidth) {
    return;
  }

  if (coords.Y + 100 > document.body.clientWidth) {
    return;
  }
  //console.log(coords);
  //banner.style.transform = `translateX(300px)`;
  //console.log();
  //document.body.clientWidth / clientHeight

  banner.style.left = coords.X + "px";
  banner.style.top = coords.Y + "px";
}

//валідація
window.addEventListener("DOMContentLoaded", () => {
  const userName = document.querySelector("[name='name']");
  const userPhone = document.querySelector("[name='phone']");
  const userEmail = document.querySelector("[name='email']");
  const validate = (value, pattern) => pattern.test(value);

  userName.addEventListener("input", () => {
    if (validate(userName.value, /^[а-яіїєґ]{2,}$/i)) {
      userName.classList.add("success");
      userName.classList.remove("error");
      pizza.userName = userName.value;
    } else {
      userName.classList.remove("success");
      userName.classList.add("error");
    }
  });

  userPhone.addEventListener("input", () => {
    if (validate(userPhone.value, /^\+380[0-9]{9}$/)) {
      userPhone.classList.add("success");
      userPhone.classList.remove("error");
      pizza.phone = userPhone.value;
    } else {
      userPhone.classList.remove("success");
      userPhone.classList.add("error");
    }
  });
  userEmail.addEventListener("change", () => {
    if (
      validate(
        userEmail.value,
        /^[a-z0-9._]{3,40}@[a-z0-9-]{1,777}\.[.a-z]{2,10}$/i
      )
    ) {
      userEmail.classList.add("success");
      userEmail.classList.remove("error");
      pizza.email = userEmail.value;
    } else {
      userEmail.classList.remove("success");
      userEmail.classList.add("error");
    }
  });
});

//Відображення складу

let initialLengthTopping = 0;
let initialLengthSauce = 0;
function show(pizza) {
  // topping
  const topping = document.querySelector("#topping");

  const indexTopping = pizza.toppings.length; //длина массива топпингов
  let countTop = 0; //счетчик количества добавленного топинга

  //соус
  const sauce = document.querySelector("#sauce");

  const indexSauce = pizza.sauce.length;
  let countSauce = 0; //счетчик количества добавленного соуса

  if (indexTopping > initialLengthTopping) {
    let topping_name = pizza.toppings[indexTopping - 1].name; //имя последнего элемнта массива
    let topping_html = `<div>${topping_name} - ${++countTop}</div>`;
    initialLengthTopping = indexTopping;
    topping.insertAdjacentHTML("beforeend", topping_html);
  } else if (indexSauce > initialLengthSauce) {
    let sauce_name = pizza.sauce[indexSauce - 1].name;
    let sauce_html = `<div>${sauce_name} - ${++countSauce}</div>`;
    initialLengthSauce = indexSauce;

    sauce.insertAdjacentHTML("beforeend", sauce_html);
  }

  const price = document.querySelector("#price");
  //общая цена
  price.innerText = pizza.size;

  /* +
    pizza.toppings[indexTopping - 1].price +
    pizza.sauce[indexSauce - 1].price;
    */
}

//Перетягування.
window.addEventListener("DOMContentLoaded", () => {
  const ingridients = document.querySelector(".ingridients"),
    table = document.querySelector(".table");

  ingridients.addEventListener("dragstart", (e) => {
    //e.target.classList.add("transfer")
    e.dataTransfer.setData("text", e.target.id);
  });

  table.addEventListener("dragenter", () => {
    table.classList.add("transfer");
  });

  table.addEventListener("dragleave", () => {
    table.classList.remove("transfer");
  });

  table.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  table.addEventListener("drop", (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text"); //id соуса или топинга

    const img = document.createElement("img");
    img.src = document.getElementById(id).src;
    table.append(img);
    table.classList.remove("transfer");

    const arrTopping = getTopping(id); //получаем массив с топингами, где кроме выбранного нами топинга, остальные undefined
    //(6) [undefined, undefined, undefined, 'telya', undefined, undefined]
    const indexToping = getTopping(id).indexOf(id); //узнаем индекс топинга с названием, соответствующим id, в массиве топингов
    //3
    const arrSauce = getSauce(id); //массив с соусами
    const indexSauce = getSauce(id).indexOf(id);

    if (arrTopping.filter((el) => el !== undefined)[0]) {
      //добавляем выбранные соусы в массив топингов в объекте пицца
      pizza.toppings.push(price.toping[indexToping]);
    } else if (arrSauce.filter((el) => el !== undefined)[0]) {
      pizza.sauce.push(price.sauce[indexSauce]);
    }
    show(pizza);
  });
});

function getTopping(id) {
  return price.toping.map((el) => {
    if (id === el.name) {
      return el.name;
    }
  });
}

function getSauce(id) {
  return price.sauce.map((el) => {
    if (id === el.name) {
      return el.name;
    }
  });
}
