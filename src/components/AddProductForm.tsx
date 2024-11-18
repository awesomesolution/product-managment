import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// interface Product {
//     _id?: string;
//     name: string;
//     description: string;
//     image?: File | null;
// }
const loggedInUserId = localStorage.getItem('userId');

const AddProductForm = () => {
    // const [createdBy,] = useState(''); // Get this from user context or state
    // const [image, setImage] = useState<File | null>(null);
    const [productData, setProductData] = useState<any>({
            name: '',
            description: '',
            createdBy: loggedInUserId,
        });
    const { productId } = useParams<{ productId: string }>(); // Retrieve productId from the URL
    const navigate = useNavigate();
    // Fetch product details for editing
    useEffect(() => {
        if (!productId) {
            setProductData({
              name: '',
              description: '',
            });
          }
        if (productId) {
            axios
                .get(`${API_BASE_URL}admin/products/${productId}`)
                .then((response) => {
                    const productData = response.data;
                    setProductData(productData);
                })
                .catch((error) => console.error('Error fetching product:', error));
        }
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('description', description);
        // if (image) formData.append('image', image);

        const product = {
            name: productData.name,
            description: productData.description,
            createdBy: loggedInUserId,
        };

        try {
            if (productId) {
                const response = await axios.put(`${API_BASE_URL}admin/products/${productId}`, product, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' },
                });
                if (response.status === 200) {
                    navigate('/menu/product-list');
                }
                console.log('Product updated:', response.data);
            } else {
                // If productId doesn't exist, create a new product
                const response = await axios.post(`${API_BASE_URL}admin/products/add`, product, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.status === 201) {
                    navigate('/menu/product-list');
                }
                console.log('Product added:', response.data);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Display loading state while fetching product data
    if (productId && !productData?._id) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div style={formStyle}>
            <h2 style={headingStyle}>{productId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" style={labelStyle}>Product Name:</label>
                    <input type="text" style={inputStyle} placeholder="Product Name" 
                    value={productData.name} 
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })} 
                    required />
                </div>
                <div>
                    <label htmlFor="description" style={labelStyle}>Description:</label>
                    <textarea
                        style={inputStyle}
                        placeholder="Description"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        minLength={10}
                        maxLength={200}
                        required
                    />
                </div>
                {/* <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} required />

            {existingProduct?.image && (
                <div>
                    <img
                        src={`http://localhost:3300/${existingProduct.image}`} // Adjust path if needed
                        alt="Product"
                        width={100}
                        height={100}
                    />
                </div>
            )} */}
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    {productId ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

const headingStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
};

// Inline styles for the form
const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
    backgroundColor: '#0056b3',
};

const labelStyle = {
    display: 'flex',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
};
export default AddProductForm;