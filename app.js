//select location from html file start
const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const slide_dot = document.getElementById('slide_dot');
//select location from html file end

// selected image  array
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images start
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery of images start
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    // create new div start
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    //onclick pass image with event instruction
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
    // create new div end
    // show gallery of images end
  })

}
// show images end
//get images from api start
const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}
//get images from api end

let slideIndex = 0;

//select clicked items start
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  //check duplicate select
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    alert('Hey, Already added !')
  }
}
//select clicked items end

var timer;

// create slider from selected items start
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous and next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  //set slide passing time and default time set 1000 ms using logical or
  const duration = document.getElementById('duration').value * 1000 || 1000;

  // set new crate slides dot "" for avoid previous creation 
  slide_dot.innerHTML = "";
  //set new counter = 0 
  let counter = 0;

  //crate slides with bottom dot
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item);
    let dot = document.createElement('span');
    dot.className = "dot";
    dot.setAttribute('onclick', `changeSlide(${counter})`)
    slide_dot.appendChild(dot);
    counter++;
  })

  changeSlide(0)
  //timing functionality add
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}
// create slider from selected items end

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item and style start
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  //identify next slide position cycling way
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  }
  //identify next slide position cycling way
  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }
  //set every items none display
  items.forEach(item => {
    item.style.display = "none"
  })
  //show specific item using display block
  items[index].style.display = "block"
}
// change slide item and style end
// image searching according to search button click start
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})
// image searching according to search button click end

// slide making start according to slide button click start
sliderBtn.addEventListener('click', function () {
  createSlider()
})
// slide making start according to slide button click end