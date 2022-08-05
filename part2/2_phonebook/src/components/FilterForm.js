const FilterForm = ({ filterQuery, handleFilterChange, handleEnter }) => {
  return (
    <form onSubmit={handleEnter}>
      <table className='input'>
        <tbody>
          <tr>
            <td>filter:</td>
            <td>
              <input
                type='search'
                value={filterQuery}
                onChange={handleFilterChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FilterForm;
