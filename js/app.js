// variables
const courses = document.querySelector("#courses-list");
const shoppoingCardContent = document.querySelector("#cart-content tbody");

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

  shoppoingCardContent.appendChild(row); //
};

//listeners

const loadEventListeners = () => {
  courses.addEventListener("click", buyCourse);
};
loadEventListeners();
