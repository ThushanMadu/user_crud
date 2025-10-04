import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">TEST PAGE WORKS!</h1>
        <p className="text-gray-600 mt-4">If you can see this, the routing is working.</p>
      </div>
    </div>
  );
};

export default TestPage;

