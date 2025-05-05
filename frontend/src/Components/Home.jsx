import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';

export const Home = ({ onAuthSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUpAction, setIsSignUpAction] = useState(true);

    const handleModeChange = () => {
        setIsSignUpAction(!isSignUpAction);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }

        console.log("Submitting:", { email, password });

        if (isSignUpAction) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User signed up:", user);
                    alert("Sign-up successful!");
                    onAuthSuccess(user); // Notify parent component
                })
                .catch((error) => {
                    console.error("Sign-up Error:", error);
                    alert(`Sign-up Error: ${error.message}`);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User signed in:", user);
                    alert("Sign-in successful!");
                    onAuthSuccess(user); // Notify parent component
                })
                .catch((error) => {
                    console.error("Sign-in Error:", error);
                    alert(`Sign-in Error: ${error.message}`);
                });
        }
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">{isSignUpAction ? "Sign Up Page" : "Login Page"}</h2>
            <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleSubmit}>
                <fieldset>
                    <ul className="space-y-4">
                        <li>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                onChange={handleEmailChange}
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </li>
                        <li>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={handlePasswordChange}
                                name="password"
                                placeholder="Enter your password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </li>
                        <li>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {isSignUpAction ? "Sign up" : "Sign in"}
                            </button>
                        </li>
                    </ul>
                </fieldset>
                <div className="mt-4 text-center">
                    {isSignUpAction ? (
                        <a onClick={handleModeChange} className="text-indigo-600 hover:underline cursor-pointer">Already have an account? Login</a>
                    ) : (
                        <a onClick={handleModeChange} className="text-indigo-600 hover:underline cursor-pointer">Don't have an account? Sign up</a>
                    )}
                </div>
            </form>
        </section>
    );
};
