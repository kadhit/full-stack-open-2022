const InputForm = ({
  newName,
  newPhone,
  handleSubmit,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <table className='input'>
          <tbody>
            <tr>
              <td>name:</td>
              <td>
                <input
                  value={newName}
                  onChange={handleNameChange}
                  placeholder='John Doe'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>phone:</td>
              <td>
                <input
                  type='tel'
                  value={newPhone}
                  onChange={handlePhoneChange}
                  placeholder='0123456789'
                  minLength='8'
                  pattern='[0-9]{8,}'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default InputForm;
