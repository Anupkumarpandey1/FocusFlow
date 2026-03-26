import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

export default function Login({ isRegister, toggleMode }) {
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex h-screen w-full bg-darker text-white font-sans items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex justify-center mb-8 text-focus">
          <CheckCircle className="w-16 h-16"/>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Join FocusFlow' : 'Welcome Back'}
        </h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input 
                type="text" required 
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-focus transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              type="email" required 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-focus transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input 
              type="password" required 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-focus transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-focus hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors mt-4">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={toggleMode} className="text-focus hover:underline focus:outline-none">
            {isRegister ? 'Log in here' : 'Sign up now'}
          </button>
        </p>
      </div>
    </div>
  );
}
