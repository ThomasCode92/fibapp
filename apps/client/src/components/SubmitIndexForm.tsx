import { FormEvent, Fragment, useState } from "react";

export default function SubmitIndexForm() {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted with index:", inputValue);
  }

  return (
    <Fragment>
      <h2>Submit a new index</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Enter your index:
            <input
              type="number"
              name="inputField"
              placeholder="Enter a number"
              min="1"
              onChange={e => setInputValue(e.target.value)}
            />
          </label>
        </fieldset>
        <input type="submit" value="Submit" disabled={inputValue === ""} />
      </form>
    </Fragment>
  );
}
