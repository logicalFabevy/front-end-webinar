 $(document).ready(function () {
    var careerSlide = $('.career-slider');
    careerSlide.owlCarousel({
        autoplay: false,
        autoplayHoverPause: false,
        responsiveClass: true,
        margin: 30,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    })
    var careerSlide = $('.industry-slider');
    careerSlide.owlCarousel({
        autoplay: false,
        autoplayHoverPause: false,
        responsiveClass: true,
        margin: 30,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    })

    
    
    var reviewSlide = $('#review-slider');
    reviewSlide.owlCarousel({
        autoplay: false,
        autoplayHoverPause: false,
        responsiveClass: true,
        margin: 30,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    })


})