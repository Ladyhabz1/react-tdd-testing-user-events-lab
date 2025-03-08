import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const availableInterests = ["Tech", "Science", "Art", "Sports"];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setInterests((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Newsletter Signup</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="name-input"
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="email-input"
            />
          </label>
          <br />

          <fieldset>
            <legend>Select your interests:</legend>
            {availableInterests.map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  value={interest}
                  checked={interests.includes(interest)}
                  onChange={handleCheckboxChange}
                  aria-label={`checkbox-${interest}`}
                />
                {interest}
              </label>
            ))}
          </fieldset>
          <br />

          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <div>
          <h2>Thank you, {name}!</h2>
          <p>Your email: {email} has been registered.</p>
          {interests.length > 0 && (
            <p>Interests: {interests.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
