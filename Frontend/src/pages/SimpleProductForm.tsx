import React from 'react';

const SimpleProductForm: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Add New Product
        </h1>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Product Name
            </label>
            <input 
              type="text" 
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
              placeholder="Enter product name"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Description
            </label>
            <textarea 
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', height: '100px' }}
              placeholder="Enter product description"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Price
            </label>
            <input 
              type="number" 
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
              placeholder="Enter price"
            />
          </div>
          <button 
            type="submit" 
            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleProductForm;

