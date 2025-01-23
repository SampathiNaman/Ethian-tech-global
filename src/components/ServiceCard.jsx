import propTypes from 'prop-types';

function ServiceCard(props) {
    const {service} = props;
    return (
        <div className="text-center space-y-4 min-w-52 w-full max-w-80 cursor-pointer border border-black rounded-xl shadow-md shadow-neutral-300 mx-auto p-4 transition duration-900 ease-out hover:shadow-2xl hover:-scale-1 hover:-translate-y-1">
            <img className="w-full" src={service.img.url} alt={service.img.alt} />
            <h1 className='font-sans text-black-900 font-bold text-xl'>{service.title}</h1>
            <p className='font-sans text-base line-clamp-5'>{service.description}</p>
        </div>
    )
}
ServiceCard.propTypes = {
    service: propTypes.shape({
        img: propTypes.shape({
            url: propTypes.string.isRequired,
            alt: propTypes.string.isRequired
        }).isRequired,
        title: propTypes.string.isRequired,
        description: propTypes.string.isRequired
    }).isRequired
};

export default ServiceCard  
