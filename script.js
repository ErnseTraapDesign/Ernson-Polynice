// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// SHOW NAV BAR

const menuIcon = document.querySelector('.menu-icon i')
const navigation = document.querySelector('.navigation-container')
const closeNav = document.querySelector('.navigation-container .fa-xmark')
const navLinks = document.querySelectorAll('.navigation a')

menuIcon.addEventListener('click', () => {
    navigation.classList.toggle('showNav')
})
closeNav.addEventListener('click', () => {
    navigation.classList.remove('showNav')
})



const filterLink = (e) => {
    const activeClass = document.querySelector('.active')
    activeClass.classList.remove('active')
    e.target.classList.add('active')
    navigation.classList.remove('showNav')
}

navLinks.forEach(link => {
    link.addEventListener('click', filterLink)
})




// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// PROJECT DESCRIPTION FULL TEXT

const projectDescription = document.querySelectorAll('.project-card p')

projectDescription.forEach(description => {
    description.addEventListener('click', () => {
        description.classList.toggle('fullText')
    })
})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// SHOW AND HIDE SERVICE AN PROJECT CARD

const parentCard = document.querySelectorAll('.services, .project')

parentCard.forEach(parent => {
    const cards = parent.querySelector('.project-card, .service-card')
    const hideCards = parent.querySelectorAll('.hide-service-card, .hide-project-card')
    const showHideBtn = parent.querySelectorAll('.services button, .project button')

    showHideBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            hideCards.forEach(card => {
                card.classList.toggle('show-cards')

                if (card.classList.contains('show-cards')) {
                    showHideBtn.forEach(btn => {
                        btn.innerHTML = "Voir Moins"
                    })
                } else {
                    showHideBtn.forEach(btn => {
                        btn.innerHTML = "Voir Tout"
                    })
                }
            })
        })
    })
})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// INTERSECTION OBSERVER ANIMATION

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.animate([
                { transform: 'translateY(20%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], {
                duration: 800
            })
        }
    })
})

const elements = document.querySelectorAll('.observation')
elements.forEach(element => {
    observer.observe(element)
})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// SCROLLSPY

const curentPage = window.location.pathname.split('/').pop()

if (curentPage === 'index.html' || curentPage === '') {
    const sections = document.querySelectorAll('main section[id]')

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY
            let offset = sec.offsetTop - 300
            let height = sec.offsetHeight
            let id = sec.getAttribute('id')

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active')
                    document.querySelector(`.navigation a[href*="${id}"]`).classList.add('active')
                })
            }
        })
    }
}
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('#')[0]
    if (linkPage === curentPage) {
        navLinks.forEach(l => l.classList.remove('active'))
        link.classList.add('active')
    }

})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// TESTIMONIALS CAROUSEL

const swiper = new Swiper(".card-wrapper", {
    spaceBetween: 20,
    loop: false,

    // pagination bullets
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamic: true
    },

    // Naviagtion arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    // slidesPerView: 3,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        550: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// QUESTION FREQUEMENT POSEES

const questions = document.querySelectorAll('.faq-question')

questions.forEach(question => {
    question.addEventListener('click', function () {
        this.classList.toggle('active')
        const response = this.nextElementSibling
        const chevronUp = this.querySelector('.fa-chevron-up')
        const chevronDown = this.querySelector('.fa-chevron-down')

        if (response.style.maxHeight) {
            response.style.maxHeight = null
            chevronDown.style.display = "block"
            chevronUp.style.display = "none"
        } else {
            response.style.maxHeight = response.scrollHeight + "px"
            chevronDown.style.display = "none"
            chevronUp.style.display = "block"
        }
    })
})


const titre = document.querySelectorAll('.web-card h3, .graphic-card h3')

titre.forEach(t => {
    t.addEventListener('click', (e) => {
        e.target.classList.toggle('full')
    })
})



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// CONTACT FORM

const popUpContact = document.querySelector('.popUp-Bg')
const closePopUpContact = document.querySelector('.popUp-card button')

closePopUpContact.addEventListener('click', () => {
    popUpContact.classList.remove('pop')
})

document.getElementById('form-contact').addEventListener('submit', function (e) {
    e.preventDefault()
    emailjs.send("service_tv77d7d", "template_lvnca0q", {
        name: document.querySelector("[name='name']").value,
        email: document.querySelector("[name='email']").value,
        phone: document.querySelector("[name='phone']").value,
        message: document.querySelector("[name='message']").value
    })
        .then(() => {
            popUpContact.classList.add('pop')
            this.reset()
        })
})
