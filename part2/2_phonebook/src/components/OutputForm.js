const OutputForm = ({ persons, filterQuery, deletePerson }) => {
  persons = filterQuery
    ? persons.filter((item) => new RegExp(filterQuery, 'gi').test(item.name))
    : persons;

  return (
    <>
      {persons.map((item, i) => (
        <table key={i}>
          <tbody>
            {item.name && (
              <tr>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>
                    <button
                      className='delete'
                      onClick={deletePerson}
                      value={item.name}
                    >
                      Delete
                    </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ))}
    </>
  );
};

export default OutputForm;
