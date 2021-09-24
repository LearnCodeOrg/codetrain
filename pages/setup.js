import { useState } from 'react';

export default function SignUp() {

  const [username, setUsername] = useState('');

  return (
    <div>
      <h1>New User</h1>
      <form onSubmit={e => {
        e.preventDefault();
        createUser();
      }}>
        <label>
          Username
          <input
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <button>Create</button>
      </form>
    </div>
  );
}
