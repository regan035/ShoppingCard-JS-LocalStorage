// variables
const courses = document.querySelector("#courses-list");
const shoppoingCartContent = document.querySelector("#cart-content tbody");
const clearCartBtn = document.querySelector("#clear-cart");

//functions

const buyCourse = (e) => {
  e.preventDefault();
  //use delegation to find the course
  if (e.target.classList.contains("add-to-cart")) {
    //read course information
    const course = e.target.parentElement.parentElement;
    //get the valuse
    getCourseInfo(course);
  }
};

const getCourseInfo = (course) => {
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };

  addIntoCart(courseInfo);
};

const addIntoCart = (courseInfo) => {
  const row = document.createElement("tr");
  row.innerHTML = `
  <tr>
      <td><img src = "${courseInfo.image}" width=100></td>
      <td>${courseInfo.title}</td>
      <td>${courseInfo.price}</td>
      <td>
          <a a href="#" class="remove" data-id="${courseInfo.id}">X</a>
      </td>
    </tr>
  `;

  shoppoingCartContent.appendChild(row);
  saveLocalStorage(courseInfo);
};

const removeCourse = (e) => {
  let course, courseId;
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");
    console.log(courseId);
  }
  removeItemLocalStorage(courseId);
};

const clearCart = () => {
  while (shoppoingCartContent.children.length > 0) {
    shoppoingCartContent.removeChild(shoppoingCartContent.firstChild);
  }
  clearLocalStorage();
};

const getItemFromLocalStorage = () => {
  let courses;
  if (localStorage.getItem("courses") === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
};

const localStorageOnLoad = () => {
  let courses = getItemFromLocalStorage();
  courses.forEach((course) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
        <td><img src = "${course.image}" width=100></td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
      </tr>
    `;

    shoppoingCartContent.appendChild(row);
  });
};

const saveLocalStorage = (course) => {
  let courses = getItemFromLocalStorage();
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const removeItemLocalStorage = (courseId) => {
  console.log("object removed", courseId);
  let courses = getItemFromLocalStorage();
  courses.forEach((course, index) => {
    if (course.id === courseId) {
      courses.splice(index, 1);
    }
  });
  //add rest to local storage
  localStorage.setItem("courses", JSON.stringify(courses));
};
//listeners

const loadEventListeners = () => {
  //add item to cart
  courses.addEventListener("click", buyCourse);
  //reomove item from cart
  shoppoingCartContent.addEventListener("click", removeCourse);
  //clear cart
  clearCartBtn.addEventListener("click", clearCart);
  //load from local storage
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
};
loadEventListeners();
