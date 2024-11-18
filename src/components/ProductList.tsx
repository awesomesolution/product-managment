import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Product {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdBy: {
        fullName: string;
        _id: string;
    };
    createdAt: string;
    status: string;
    onEdit: (product: any) => void; // Add the onEdit prop type
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1); // Current page
    const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages
    const [, setTotalProducts] = useState<number>(0); // Total products count
    const [pageSize, ] = useState<number>(10); // Products per page  
    const navigate = useNavigate();
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}admin/products`, {
                params: {
                    name,
                    description,
                    status,
                    startDate,
                    endDate,
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            
            setProducts(response?.data?.products);
            setTotalProducts(response?.data?.totalProducts);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            toast.error("Error fetching products: " + error);
        }
    };

    // Fetch products when filters change
    useEffect(() => {
        fetchProducts();
    }, [name, description, status, startDate, endDate, currentPage, pageSize]);
    
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };
    // Delete product
    const deleteProduct = async (id: string) => {
        try {
            await axios.delete(`${API_BASE_URL}admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Product deleted successfully!'); // Show success message
            fetchProducts();
            // setProducts((prev) => prev.filter((product) => product._id !== id));
            setDeleteProductId(null); // Close confirmation dialog
        } catch (error) {
            toast.error('Error deleting product ' + error); // Show error message
        }
    };

    return (
        <div>
            <h2>Filter</h2>
            <form style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>
                        Search by Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="description" style={labelStyle}>
                        Search by Description:
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="startDate" style={labelStyle}>
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="endDate" style={labelStyle}>
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="status" style={labelStyle}>
                        Filter by Status:
                    </label>
                    <select
                        id="status-filter"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="Deleted">Deleted</option>
                    </select>
                </div>
            </form>
            <div style={{ margin: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Product List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
                            <th style={tableHeaderStyle}>#</th>
                            <th style={tableHeaderStyle}>Name</th>
                            <th style={tableHeaderStyle}>Description</th>
                            <th style={tableHeaderStyle}>Created By</th>
                            <th style={tableHeaderStyle}>Created At</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product._id} style={tableRowStyle}>
                                    <td style={tableCellStyle}>{index + 1}</td>
                                    <td style={tableCellStyle}>{product.name}</td>
                                    <td style={tableCellStyle}>{product.description}</td>
                                    <td style={tableCellStyle}>{product?.createdBy?.fullName}</td>
                                    <td style={tableCellStyle}>{product.createdAt}</td>
                                    <td style={tableCellStyle}>{product.status}</td>
                                    <td style={tableCellStyle}>
                                        <button
                                            onClick={() => navigate(`/menu/edit/${product._id}`)} // Navigate to edit page with product ID
                                            style={editButtonStyle}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteProductId(product._id)} // Trigger confirmation dialog
                                            style={deleteButtonStyle}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Confirmation Dialog */}
                {deleteProductId && (
                    <div style={dialogOverlayStyle}>
                        <div style={dialogBoxStyle}>
                            <h3>Are you sure you want to delete this product?</h3>
                            <button
                                onClick={() => deleteProduct(deleteProductId)}
                                style={dialogDeleteButtonStyle}
                            >
                                Yes
                            </button>
                            <button onClick={() => setDeleteProductId(null)} style={dialogCancelButtonStyle}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={paginationButtonStyle}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle}
        >
          Next
        </button>
      </div>
        </div>
    );
};

// Inline Styles
const formStyle = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
};

const formGroupStyle = {
    display: "flex",
    flexDirection: "column" as const,
    flex: "1 1 45%",
    minWidth: "200px",
};

const labelStyle = {
    marginBottom: "8px",
    fontWeight: "bold" as const,
    color: "#333",
};

const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "box-shadow 0.3s",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

// Inline styles for table and buttons
const tableHeaderStyle = {
    padding: '10px',
    textAlign: 'left' as const,
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
};

const tableRowStyle = {
    borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'left' as const,
};

const editButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
};

const deleteButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
};

// Styles for confirmation dialog
const dialogOverlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const dialogBoxStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
};

const dialogDeleteButtonStyle = {
    ...deleteButtonStyle,
    marginRight: '10px',
};

const dialogCancelButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#ddd',
    border: 'none',
    cursor: 'pointer',
};

const paginationButtonStyle = {
    padding: "5px 10px",
    borderRadius: "4px",
    backgroundColor: "#ddd",
    color: "black",
    border: "none",
    cursor: "pointer",
};
export default ProductList;