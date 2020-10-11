import React, { FC, useState } from 'react';

export const Register: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <form>
      <div>
        <label>
          Email
          <input
            onChange={event => {
              setEmail(event.target.value);
            }}
            type="email"
            value={email}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            onChange={event => {
              setPassword(event.target.value);
            }}
            type="password"
            value={password}
          />
        </label>
      </div>
    </form>
  );
};

export default Register;
