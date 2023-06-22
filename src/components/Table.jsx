import PropTypes from 'prop-types';
function Table({ data = [] }) {
  return (
    <div className='overflow-x-auto'>
      <table className='table max-w-[600px] mx-auto'>
        <thead>
          <tr>
            <th>Over</th>
            <th>Run</th>
          </tr>
        </thead>
        <tbody>
          {data.map((over) => {
            return (
              <tr key={over} className='bg-base-200 '>
                <td>{over.bowl}</td>
                <td>{over.score}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className='bg-base-200 '>
            <td className='font-bold'>Total</td>
            <td className='font-bold'>
              {data.reduce((acc, curr) => curr?.score + acc, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array,
};

export default Table;
