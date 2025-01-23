import propTypes from 'prop-types'

function SectionWrapper(props) {
    const {title1, title2, containerStyles="", children} = props;
  return (
    <div className={`w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-12 p-6 md:p-8 ${containerStyles}`}> 
    <div className='font-sans text-blue-900 text-2xl space-y-1'>
        <h2 className='tracking-wider'>{title1}</h2>
        <h2 className='font-bold tracking-wide'>{title2}</h2>
    </div>
    {children}
    
</div>
  )
}

SectionWrapper.propTypes = {
    title1: propTypes.string.isRequired,
    title2: propTypes.string.isRequired,
    containerStyles: propTypes.string.isRequired,
    children: propTypes.node.isRequired
}

export default SectionWrapper