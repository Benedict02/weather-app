import { useEffect, useState, useRef } from "react";
import "./CarouselEngine.css";

function Carousel() {
  // const [currentPage, setCurrentPage] = useState(0);
  // const carouselItems = [
  //   { title: "Carousel Page 1" },
  //   { title: "Carousel Page 2" },
  //   { title: "Carousel Page 3" },
  //   { title: "Carousel Page 4" },
  //   { title: "Carousel Page 5" },
  // ];

  // useEffect(() => {
  //   sizeCarouselElements();
  //   generateCarouselPagination();
  //   window.addEventListener("resize", sizeCarouselElements);
  //   return () => {
  //     window.removeEventListener("resize", sizeCarouselElements);
  //   };
  // }, []);

  // function sizeCarouselElements() {
  //   const windowWidth = window.innerWidth;
  //   const carouselList = document.querySelector(".carousel-viewport ul");
  //   carouselList.style.width = windowWidth * carouselItems.length + "px";
  //   carouselItems.forEach((item) => {
  //     const el = document.querySelector(`[data-title="${item.title}"]`);
  //     if (el) {
  //       el.style.width = windowWidth + "px";
  //     }
  //   });
  // }

  // function generateCarouselPagination() {
  //   const paginationList = document.querySelector(".carousel-pagination ul");
  //   paginationList.innerHTML = ""; // Clear existing items
  //   carouselItems.forEach((_, index) => {
  //     const paginationItem = document.createElement("li");
  //     if (index === 0) paginationItem.className = "active";
  //     paginationList.appendChild(paginationItem);
  //   });
  // }

  // function updateCarouselPagination() {
  //   const paginationChildren = document.querySelectorAll(
  //     ".carousel-pagination ul li"
  //   );
  //   paginationChildren.forEach((child, index) => {
  //     if (index === currentPage) {
  //       child.className = "active";
  //     } else {
  //       child.className = "";
  //     }
  //   });
  // }

  // function handleCarouselPreviousClicked() {
  //   if (currentPage <= 0) return;
  //   setCurrentPage((prevPage) => prevPage - 1);
  //   updateCarouselPagination();
  // }

  // function handleCarouselNextClicked() {
  //   if (currentPage >= carouselItems.length - 1) return;
  //   setCurrentPage((prevPage) => prevPage + 1);
  //   updateCarouselPagination();
  // }

  // function setViewToCurrentPage() {
  //   const carouselList = document.querySelector(".carousel-viewport ul");
  //   carouselList.className = "";
  //   carouselList.style.left = -(window.innerWidth * currentPage) + "px";
  // }

  // useEffect(() => {
  //   setViewToCurrentPage();
  // }, [currentPage]);

  // // function animateViewToCurrentPage() {
  // //   const carouselList = document.querySelector('.carousel-viewport ul');
  // //   carouselList.className = 'animate';
  // //   carouselList.style.left = -(window.innerWidth * currentPage) + 'px';
  // // }

  // return (
  //   <div className="carousel">
  //     <div className="carousel-viewport">
  //       <ul>
  //         {carouselItems.map((item, index) => (
  //           <li key={index} data-title={item.title}>
  //             <div className="sized-container">
  //               <h1>{item.title}</h1>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div className="carousel-pagination">
  //       <ul></ul>
  //     </div>
  //     <div
  //       className="carousel-previous"
  //       onClick={handleCarouselPreviousClicked}
  //     >
  //       &gt;
  //     </div>
  //     <div className="carousel-next" onClick={handleCarouselNextClicked}>
  //       &lt;
  //     </div>
  //   </div>
  // );

  ///CONTENT OF CAROUSEL
  const content = [
    { id: 0, title: "Slide 1" },
    { id: 1, title: "Slide 2" },
  ];
  /////////////////////////////
  // ///PAGINATION: ASSUME 3 ITEMS - DIPERTIMBANGKAN
  // const pagination = [0, 0, 0];
  // const paginationContent = pagination.map((pagination) => (
  //   <li key={pagination}></li>
  // ));
  // /////////////////////////////
  const carouselItem = useRef([]); //USEREF STILL DOES NOT WORK. TRY TO USE USECALLBACK
  const carouselLength = content.length;
  const [slideIndex, setSlideIndex] = useState(0);

  const listContent = content.map((item, index) => (
    <div
      key={item.id}
      className="carousel__item"
      ref={(el) => {
        carouselItem.current[index] = el;
      }}
    >
      {item.title}
    </div>
  ));

  const prevSlide = () => {
    const newSlideIndex = (slideIndex - 1 + carouselLength) % carouselLength;
    setSlideIndex(newSlideIndex);
    showSlides(newSlideIndex);
  };

  const nextSlide = () => {
    const newSlideIndex = (slideIndex + 1) % carouselLength;
    setSlideIndex(newSlideIndex);
    showSlides(newSlideIndex);
  };

  const currentSlide = (n) => {
    // reason: weird error. the style.display cannot be found
    // setSlideIndex(n);
    // showSlides(n);
  };

  const showSlides = (n) => {
    // I NEED TO USEEFFECT THIS
    let i;
    const slides = document.getElementsByClassName("carousel__item");
    const dots = document.getElementsByClassName("dot");
    if (n >= carouselLength) {
      setSlideIndex(0);
    }
    if (n < 0) {
      setSlideIndex(carouselLength - 1);
    }
    for (i = 0; i < carouselLength; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < carouselLength; i++) {
      dots[i].classList.remove("active");
    }
    slides[slideIndex].style.display = "flex";
    dots[slideIndex].classList.add("active");
  };

  //useEffect changes the style.display to "none" & remove all className with "active" in it; ASAP.
  useEffect(() => {
    if (carouselItem.current) {
      const slides = document.getElementsByClassName("carousel__item");
      const dots = document.getElementsByClassName("dot");
      let i;
      // console.log(carouselItem.current);
      for (i = 0; i < carouselLength; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < carouselLength; i++) {
        dots[i].classList.remove("active");
      }
      slides[slideIndex].style.display = "flex";
      dots[slideIndex].classList.add("active");
    } else {
      console.log("lmao rusak; skill issue");
    }
  });

  return (
    <>
      <div className="carousel-container">
        <div className="carousel">{listContent}</div>
        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="pagination">
          <span className="dot" onClick={currentSlide(0)}></span>
          <span className="dot" onClick={currentSlide(1)}></span>
          <span className="dot" onClick={currentSlide(2)}></span>
        </div>
      </div>
    </>
  );
}

export default Carousel;
