import PropTypes from 'prop-types';

function Container({ children }) {
  return <div className='p-5 w-full max-w-[1440px] mx-auto'>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
