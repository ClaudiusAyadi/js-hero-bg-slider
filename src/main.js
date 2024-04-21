import './style.scss';
import data from './slides';

const html = String.raw;

const { slides } = data;

const template = () =>
	html`
		<header>
			<figure>
				<img src="assets/logo.svg" alt="logo" />
			</figure>
		</header>
		<div class="s-container">
			<ul class="slides">
				${slides
					.map(
						(slide, index) => html`
							<li class="slide" style="background-image:url(${slide.bg})">
								<h1>${slide.title}</h1>
								<p>${slide.content}</p>
								<a href="${slide.link}" class="cta">${slide.cta}</a>
							</li>
						`
					)
					.join('')}
			</ul>

			<div class="s-buttons">
				<button type="button" class="prev" aria-label="previous button">&lt;</button>
				<button type="button" class="next" aria-label="next button">&gt;</button>
			</div>
		</div>
	`;

document.querySelector('#app').insertAdjacentHTML('afterbegin', template());

const slider = (() => {
	const slides = document.querySelectorAll('.slide');
	const prevButton = document.querySelector('.prev');
	const nextButton = document.querySelector('.next');
	let currentSlide = 0;

	const setActiveSlide = index => {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
	};

	const slideTo = index => {
		setActiveSlide(index);
		currentSlide = index;
	};

	const slideNext = () => {
		const nextIndex = (currentSlide + 1) % slides.length;
		slideTo(nextIndex);
	};

	const slidePrev = () => {
		const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
		slideTo(prevIndex);
	};

	prevButton.addEventListener('click', slidePrev);
	nextButton.addEventListener('click', slideNext);

	slideTo(currentSlide);
})();
