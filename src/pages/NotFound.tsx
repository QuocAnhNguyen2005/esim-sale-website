import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">404</h1>
      <div className="bg-indigo-600 px-2 text-sm rounded rotate-12 absolute text-white shadow-lg">
        Page Not Found
      </div>
      <p className="mt-8 text-xl text-gray-500 max-w-md">
        Oops! We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Go back home
      </Link>
    </div>
  );
}
