import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVouchers, addVoucher, updateVoucher, deleteVoucher } from '../../../api/api';
import '../../../../public/css/AdminVoucher.css'; 

const AdminVoucher = () => { 
    const [vouchers, setVouchers] = useState([]);
    const [formData, setFormData] = useState({
        Code: '',
        Value: '',
        Quantity: '',
        Status: true,
        Description: '',
        Expiry_date: '',
    });
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = 'http://localhost:8000/api';

    // Hàm lấy danh sách voucher
    const fetchVouchers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/vouchers`);
            const data = await response.json();
            if (data.success) {
                setVouchers(data.data || []);
            } else {
                setError('Failed to fetch vouchers');
            }
        } catch (err) {
            setError('Error fetching vouchers: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (selectedVoucher) {
                await updateVoucher({ ...formData, id: selectedVoucher.VoucherID });
            } else {
                await addVoucher(formData);
            }
            setFormData({ Code: '', Value: '', Quantity: '', Status: true, Description: '', Expiry_date: '' });
            setSelectedVoucher(null);
            fetchVouchers(); // Cập nhật lại danh sách voucher
        } catch (err) {
            setError('Error: ' + (err.response?.data?.message || 'Something went wrong'));
        }
    };

    const handleEdit = (voucher) => {
        setSelectedVoucher(voucher);
        setFormData(voucher);
    };

    const handleDelete = async (id) => {
        try {
            await deleteVoucher(id);
            fetchVouchers(); // Cập nhật lại danh sách voucher
        } catch (err) {
            setError('Error: ' + (err.response?.data?.message || 'Could not delete'));
        }
    };

    return (
        <div className="voucher-management">
            <h2>Voucher Management</h2>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <button onClick={() => setSelectedVoucher(null)}>Add New Voucher</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Value</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Expiry Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(vouchers) && vouchers.map(voucher => (
                                <tr key={voucher.VoucherID}>
                                    <td>{voucher.Code}</td>
                                    <td>{voucher.Value}</td>
                                    <td>{voucher.Quantity}</td>
                                    <td>{voucher.Status ? 'Active' : 'Inactive'}</td>
                                    <td>{voucher.Description}</td>
                                    <td>{new Date(voucher.Expiry_date).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(voucher)}>Edit</button>
                                        <button onClick={() => handleDelete(voucher.VoucherID)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <form onSubmit={handleSubmit}>
                <h3>{selectedVoucher ? 'Edit Voucher' : 'Add Voucher'}</h3>
                <input
                    name="Code"
                    placeholder="Voucher Code"
                    value={formData.Code}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="Value"
                    placeholder="Value"
                    value={formData.Value}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="Quantity"
                    placeholder="Quantity"
                    value={formData.Quantity}
                    onChange={handleChange}
                    required
                />
                <select name="Status" value={formData.Status} onChange={handleChange}>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>
                <textarea
                    name="Description"
                    placeholder="Description"
                    value={formData.Description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Expiry_date"
                    value={formData.Expiry_date}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{selectedVoucher ? 'Update' : 'Add'} Voucher</button>
            </form>
        </div>
    );
};

export default AdminVoucher;