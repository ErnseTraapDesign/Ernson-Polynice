const carousel = document.querySelector('.project-carousel')
const firstImg = carousel.querySelectorAll('img') [0]
const arrowIcons = document.querySelectorAll('.wrapper button')

let maxScroll = carousel.scrollWidth - carousel.clientWidth
let isDragStart = false, prevPageX, prevScrollLeft
let firstImgWidth = firstImg.scrollWidth + 14

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let direction = icon.id === "prev" ? -firstImgWidth : firstImgWidth
        carousel.scrollBy({left: direction, behavior: "smooth"})
    })
})

const handleSlideIcons = () => {
    carousel.scrollLeft <= 0 ? arrowIcons[0].classList.add('noScroll') : arrowIcons[0].classList.remove('noScroll')
    carousel.scrollLeft >= maxScroll ? arrowIcons[1].classList.add('noScroll') : arrowIcons[1].classList.remove('noScroll')
}

carousel.addEventListener('scroll', () => {
    handleSlideIcons()
})

const dragStart = (e) => {
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if(!isDragStart) return
    e.preventDefault()
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
}

const dragStop = () => {
    isDragStart = false
}

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

carousel.addEventListener('mouseup', dragStop)
carousel.addEventListener('touchend', dragStop)




// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// SCROLLSPY

const navLink = document.querySelectorAll('.navigation a')

const path = window.location.pathname

    if(path.includes('article')) {
        navLink.forEach(l => l.classList.remove('active'))
        document.querySelector('.navigation a[href*="blog"]')
        .classList.add('active')
    }