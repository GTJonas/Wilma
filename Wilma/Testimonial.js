$(document).ready(function () {
  const testimonialSlider = $(".testimonial-slider");
  const pagination = $(".pagination");
  const testimonialData = [
    {
      imageUrl: "",
      text: "Jill is very professional and great customer service. Highly recommended.",
      shortmob:
        "Jill is very professional and great customer service. Highly recommended",
      Link: "https://maps.app.goo.gl/mk9eR1e9XekTUpLK6",
      User: "@Kaneez Fatima",
      rating: 3, // Add the rating for this testimonial (e.g., 1 to 5)
    },
    {
      imageUrl: "",
      text: "I gave my sister a spa anti stress treatment. She was very pleased! Thank you very much Agnes and Wilmas! See you later. Recommended!",
      shortmob:
        "I gave my sister a spa anti stress treatment. She was very pleased! Thank you very much Agnes and Wilmas. Recommended! ",
      Link: "https://maps.app.goo.gl/o6w3N67fGwLgAYd57",
      User: "@Sanna Perkiö",
      rating: 5, // Add the rating for this testimonial (e.g., 1 to 5)
    },
    {
      imageUrl: "",
      text: "Salon Wilma is the best salon I have been to. Have been to many salons in, among other places, Stockholm and Gothenburg, but no salon has the same class and professionalism as Salon Wilma! Fantastically talented staff and lovely premises. Highly recommend!",
      shortmob: "1",
      Link: "https://maps.app.goo.gl/hnNZUASFxLir3xP36",
      User: "@Lina Nilsson",
      rating: 5, // Add the rating for this testimonial (e.g., 1 to 5)
    },
    // Add more testimonial data objects as needed
  ];

  const totalTestimonials = testimonialData.length;
  let currentIndex = 0;

  function createTestimonialSlide(index) {
    const data = testimonialData[index];
    const filledStars = Array(data.rating)
      .fill('<span class="star">&#9733;</span>')
      .join("");
    const emptyStars = Array(5 - data.rating)
      .fill('<span class="emptystar">&#9734;</span>') // Use an empty star character (☆)
      .join("");

    return `
    <div class="testimonial-item">
      <p>${data.text}</p>
      <a href="${data.Link}" target="_blank">
      <div class="rating">
          <p>${filledStars}${emptyStars}</p>
        </div>  
      
      <p>${data.User}</p>
        
      </a>
    </div>
  `;
  }

  function createPaginationItems() {
    let paginationItems = "";
    for (let i = 0; i < totalTestimonials; i++) {
      paginationItems += createPaginationItem(i);
    }
    return paginationItems;
  }

  function createPaginationItem(index) {
    return `<div class="pagination-item" data-index="${index}"></div>`;
  }

  function updateSliderPosition(index) {
    testimonialSlider.html(createTestimonialSlide(index));
  }

  function updateActivePaginationItem(index) {
    pagination.find(".pagination-item").removeClass("active");
    pagination
      .find(`.pagination-item[data-index="${index}"]`)
      .addClass("active");
  }

  // Initialize the testimonial slider with the first testimonial
  updateSliderPosition(currentIndex);
  pagination.html(createPaginationItems());
  pagination
    .find(`.pagination-item[data-index="${currentIndex}"]`)
    .addClass("active");

  // Initialize pagination
  pagination.on("click", ".pagination-item", function () {
    const index = $(this).data("index");
    updateSliderPosition(index);
    updateActivePaginationItem(index);
  });

  // Automatically update the testimonial slider
  const interval = 7000;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateSliderPosition(currentIndex);
    updateActivePaginationItem(currentIndex);
  }

  setInterval(nextSlide, interval);
});
