const imageUrls = [
  "/Resurer/Varumärken/Mask group-4.png",
  "/Resurer/Varumärken/frame-1.png",
  "/Resurer/Varumärken/Mask group-3.png",
  "/Resurer/Varumärken/Frame-1.png",
  // Add more image URLs here
];

const slidesToPreload = 20; // Number of slides to preload on each side
let slideCursor = 0; // Track the current slide cursor position
let dragStartX = 0;
let dragEndX = 0;
let totalSlides = 0; // Track the total number of slides
let autoInterval; // Variable to store the auto interval

// Function to add a slide to the slider
function addSlide(index) {
  const slide = $('<div class="slide"></div>');
  const img = $("<img>");
  img.attr("src", imageUrls[index]);
  img.attr("alt", "Image");
  slide.append(img);
  $(".slider").append(slide);

  totalSlides++; // Increment the total slide count

  // Check if the total slide count surpasses the limit
  if (totalSlides > slidesToPreload * 2 + 1) {
    removeOldestSlide();
  }
}

// Function to remove the oldest slide relative to the slide cursor
function removeOldestSlide() {
  const slides = $(".slider").find(".slide");
  slides.eq(slideCursor).remove(); // Remove the oldest slide relative to the slide cursor
  totalSlides--; // Decrement the total slide count
}

// Function to handle the slider update based on drag distance
function updateSliderByDrag() {
  const slideWidth = $(".slider").find(".slide").outerWidth();
  const dragDistance = dragEndX - dragStartX;

  if (dragDistance > 0) {
    // Dragged to the right, move the slide cursor to the left
    const slidesToMove = Math.floor(dragDistance / slideWidth);
    slideCursor =
      (slideCursor - slidesToMove + imageUrls.length) % imageUrls.length;
    $(".slider").css("left", `-=${slidesToMove * slideWidth}px`);
  } else if (dragDistance < 0) {
    // Dragged to the left, move the slide cursor to the right
    const slidesToMove = Math.floor(-dragDistance / slideWidth);
    slideCursor = (slideCursor + slidesToMove) % imageUrls.length;
    $(".slider").css("left", `+=${slidesToMove * slideWidth}px`);
  }

  // Reset drag values
  dragStartX = 0;
  dragEndX = 0;

  // Remove excess slides on both sides
  const slidesToRemove = totalSlides - (slidesToPreload * 2 + 1);
  if (slidesToRemove > 0) {
    for (let i = 0; i < slidesToRemove; i++) {
      removeOldestSlide();
    }
  }
}

// Function to start the auto interval
function startAutoInterval() {
  autoInterval = setInterval(() => {
    slideCursor = (slideCursor + 1) % imageUrls.length;

    $(".slider").animate(
      { left: `-=${$(".slide").outerWidth()}px` },
      500,
      () => {
        addSlide(slideCursor);
        removeOldestSlide();
        $(".slider").css("left", `+=${$(".slide").outerWidth()}px`);
      }
    );
  }, 3000);
}

// Function to stop the auto interval
function stopAutoInterval() {
  clearInterval(autoInterval);
}

// Initial slide setup
for (let i = slidesToPreload; i > 0; i--) {
  addSlide(slideCursor);
  slideCursor = (slideCursor + 1) % imageUrls.length; // Loop back to the first image
}

for (let i = slidesToPreload; i > 0; i--) {
  slideCursor = (slideCursor - 1 + imageUrls.length) % imageUrls.length; // Loop back to the last image
  addSlide(slideCursor);
}

// Make the slider draggable with custom drag behavior
$(".slider").draggable({
  axis: "x", // Only allow horizontal dragging
  cursor: "grabbing",
  start: function (event, ui) {
    dragStartX = event.clientX || event.originalEvent.touches[0].clientX;
    $(".slider").stop(true, false);
    stopAutoInterval(); // Stop auto interval on drag start
  },
  drag: function (event, ui) {
    // Restrict vertical movement
    ui.position.top = 0;
    dragEndX = event.clientX || event.originalEvent.touches[0].clientX;
  },
  stop: function () {
    updateSliderByDrag();
    startAutoInterval(); // Start auto interval on drag stop
  },
});

// Start the auto interval initially
startAutoInterval();
