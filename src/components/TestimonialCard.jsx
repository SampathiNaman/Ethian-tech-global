import propTypes from 'prop-types';

function TestimonialCard(props) {
    const {testimonial} = props;
  return (
    <div className="text-center space-y-4 min-w-52 w-full max-w-80 border border-black rounded-xl shadow-sm shadow-neutral-300 mx-auto p-4">
    <img className="w-full" src={testimonial.img.url} alt={testimonial.img.alt} />
    <p className='font-sans text-base line-clamp-5'>{"⭐".repeat(testimonial.rating)}</p>
    <h1 className='font-sans text-black-900 font-bold text-xl'>{testimonial.name}</h1>
    <p className='font-sans text-base line-clamp-5'>{testimonial.content}</p>
</div>
  )
}

TestimonialCard.propTypes = {
    testimonial: propTypes.shape({
        rating: propTypes.number.isRequired,
        img: propTypes.shape({
            url: propTypes.string.isRequired,
            alt: propTypes.string.isRequired,
        }).isRequired,
        name: propTypes.string.isRequired,
        content: propTypes.string.isRequired,
    }).isRequired
}

export default TestimonialCard