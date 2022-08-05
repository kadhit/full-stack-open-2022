const OutputForm = ({ persons, filterQuery }) => {
  persons = filterQuery
    ? persons.filter((item) => new RegExp(filterQuery, "gi").test(item.name))
    : persons;

  return (
    <>
      {persons.map((item, i) => (
        <table key={i}>
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.phone}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};

export default OutputForm;
