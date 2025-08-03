import React, { useState, useEffect } from 'react';
import { updateOrder, addOrder, deleteOrder, getOrders, validateUserId, validatePaymentId } from '../../../api/api'; // Giả sử bạn đã định nghĩa validateUserId và validatePaymentId

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [formData, setFormData] = useState({
        UserID: '',
        VoucherID: '',
        PaymentID: '',
        Status: 'pending',
        Total_amount: '',
        Receiver_name: '',
        Receiver_phone: '',
        Shipping_address: '',
        order_details: [],
    });
    const [formErrors, setFormErrors] = useState({}); // Trạng thái lưu lỗi

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                setError('Không thể tải danh sách đơn hàng');
            }
        } catch (err) {
            console.error('Lỗi khi tải danh sách đơn hàng:', err);
            setError('Lỗi kết nối server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: '' })); // Xóa lỗi khi người dùng nhập
    };

    const validateForm = async () => {
        const errors = {};
        if (!formData.UserID) errors.UserID = 'ID người dùng là bắt buộc.';
        if (!formData.Total_amount) errors.Total_amount = 'Tổng số tiền là bắt buộc.';
        if (!formData.Receiver_name) errors.Receiver_name = 'Tên người nhận là bắt buộc.';
        if (!formData.Receiver_phone) errors.Receiver_phone = 'Số điện thoại là bắt buộc.';
        if (!formData.Shipping_address) errors.Shipping_address = 'Địa chỉ giao hàng là bắt buộc.';

        // Kiểm tra UserID
        if (formData.UserID) {
            const userValid = await validateUserId(formData.UserID);
            if (!userValid) {
                errors.UserID = 'ID người dùng không hợp lệ.';
            }
        }

        // Kiểm tra PaymentID
        if (formData.PaymentID) {
            const paymentValid = await validatePaymentId(formData.PaymentID);
            if (!paymentValid) {
                errors.PaymentID = 'ID phương thức thanh toán không hợp lệ.';
            }
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationErrors = await validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors); // Cập nhật lỗi nếu có
            return; // Dừng nếu có lỗi
        }

        try {
            let response;
            if (editingOrder) {
                response = await updateOrder(editingOrder.OrderID, formData);
            } else {
                response = await addOrder(formData);
            }

            if (!response.data.success) {
                // Nếu có lỗi từ server, cập nhật formErrors
                setFormErrors(response.data.errors);
                return; // Dừng nếu có lỗi
            }

            // Reset form nếu không có lỗi
            setFormData({
                UserID: '',
                VoucherID: '',
                PaymentID: '',
                Status: 'pending',
                Total_amount: '',
                Receiver_name: '',
                Receiver_phone: '',
                Shipping_address: '',
                order_details: [],
            });
            setEditingOrder(null);
            setShowModal(false);
            fetchOrders();
        } catch (err) {
            setError('Lỗi: ' + (err.response.data.message || 'Có gì đó không ổn'));
        }
    };

    const openAddModal = () => {
        setEditingOrder(null);
        setFormData({
            UserID: '',
            VoucherID: '',
            PaymentID: '',
            Status: 'pending',
            Total_amount: '',
            Receiver_name: '',
            Receiver_phone: '',
            Shipping_address: '',
            order_details: [],
        });
        setFormErrors({}); // Reset lỗi
        setShowModal(true);
    };

    const openEditModal = (orderItem) => {
        setEditingOrder(orderItem);
        setFormData({
            UserID: orderItem.UserID,
            VoucherID: orderItem.VoucherID,
            PaymentID: orderItem.PaymentID,
            Status: orderItem.Status || 'pending',
            Total_amount: orderItem.Total_amount,
            Receiver_name: orderItem.Receiver_name,
            Receiver_phone: orderItem.Receiver_phone,
            Shipping_address: orderItem.Shipping_address,
            order_details: orderItem.order_details,
        });
        setFormErrors({}); // Reset lỗi
        setShowModal(true);
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
            try {
                await deleteOrder(id);
                fetchOrders();
            } catch (err) {
                setError('Lỗi: ' + (err.message || 'Không thể xóa'));
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div style={{ color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div>
            <h2>Quản lý đơn hàng</h2>
            <button onClick={openAddModal} style={{ marginBottom: '20px' }}>
                Thêm đơn hàng
            </button>

            {/* Modal Form */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '500px',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}>
                        <h3>{editingOrder ? 'Sửa đơn hàng' : 'Thêm đơn hàng mới'}</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>ID người dùng *</label>
                                <input
                                    type="text"
                                    name="UserID"
                                    value={formData.UserID}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.UserID && <span style={{ color: 'red' }}>{formErrors.UserID}</span>}
                            </div>
                            <div>
                                <label>ID voucher (nếu có)</label>
                                <input
                                    type="text"
                                    name="VoucherID"
                                    value={formData.VoucherID}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>ID phương thức thanh toán (nếu có)</label>
                                <input
                                    type="text"
                                    name="PaymentID"
                                    value={formData.PaymentID}
                                    onChange={handleChange}
                                />
                                {formErrors.PaymentID && <span style={{ color: 'red' }}>{formErrors.PaymentID}</span>}
                            </div>
                            <div>
                                <label>Trạng thái</label>
                                <select
                                    name="Status"
                                    value={formData.Status}
                                    onChange={handleChange}
                                >
                                    <option value="pending">Chờ xử lý</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="completed">Đã hoàn thành</option>
                                    <option value="cancelled">Đã hủy</option>
                                    <option value="shipped">Đã giao hàng</option>
                                </select>
                            </div>
                            <div>
                                <label>Tổng số tiền *</label>
                                <input
                                    type="number"
                                    name="Total_amount"
                                    value={formData.Total_amount}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.Total_amount && <span style={{ color: 'red' }}>{formErrors.Total_amount}</span>}
                            </div>
                            <div>
                                <label>Tên người nhận *</label>
                                <input
                                    type="text"
                                    name="Receiver_name"
                                    value={formData.Receiver_name}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.Receiver_name && <span style={{ color: 'red' }}>{formErrors.Receiver_name}</span>}
                            </div>
                            <div>
                                <label>Số điện thoại người nhận *</label>
                                <input
                                    type="text"
                                    name="Receiver_phone"
                                    value={formData.Receiver_phone}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.Receiver_phone && <span style={{ color: 'red' }}>{formErrors.Receiver_phone}</span>}
                            </div>
                            <div>
                                <label>Địa chỉ giao hàng *</label>
                                <input
                                    type="text"
                                    name="Shipping_address"
                                    value={formData.Shipping_address}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.Shipping_address && <span style={{ color: 'red' }}>{formErrors.Shipping_address}</span>}
                            </div>
                            <button type="submit">{editingOrder ? 'Cập nhật' : 'Thêm'}</button>
                            <button type="button" onClick={() => setShowModal(false)}>Hủy</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Bảng danh sách đơn hàng */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th>ID</th>
                        <th>ID người dùng</th>
                        <th>Tên người nhận</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Tổng số tiền</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(item => (
                        <tr key={item.OrderID}>
                            <td>{item.OrderID}</td>
                            <td>{item.UserID}</td>
                            <td>{item.Receiver_name}</td>
                            <td>{item.Receiver_phone}</td>
                            <td>{item.Shipping_address}</td>
                            <td>{item.Total_amount}</td>
                            <td>{item.Status}</td>
                            <td>{new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                            <td>
                                <button onClick={() => openEditModal(item)}>Sửa</button>
                                <button onClick={() => handleDeleteOrder(item.OrderID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrder;