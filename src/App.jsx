import { useState } from 'react';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    service: 'Cuci Komplit'
  });

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.weight) return;

    const newOrder = {
      id: Date.now(),
      name: formData.name,
      weight: formData.weight,
      service: formData.service,
      status: 'Antrean',
      date: new Date().toLocaleDateString('id-ID')
    };

    setOrders([...orders, newOrder]);
    setFormData({ name: '', weight: '', service: 'Cuci Komplit' });
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    );
  };

  const handleDelete = (id) => {
    if (confirm('Hapus pesanan ini?')) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Antrean':
        return 'bg-gray-200 text-gray-800';
      case 'Dicuci':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Disetrika':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Selesai':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">AIRR Laundry Manager</h1>
          <p className="text-gray-600 mt-2">Sistem Pelacakan Pesanan MVP</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel Form Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Pesanan Baru</h2>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Contoh: Budi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Berat (Kg)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Contoh: 2.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Layanan
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Cuci Komplit">Cuci Komplit (Cuci + Setrika)</option>
                  <option value="Cuci Kering">Cuci Kering Saja</option>
                  <option value="Setrika Saja">Setrika Saja</option>
                  <option value="Express 24 Jam">Express 24 Jam</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
              >
                Simpan Pesanan
              </button>
            </form>
          </div>

          {/* Panel Daftar Pesanan */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <h2 className="text-xl font-semibold text-gray-800">Daftar & Pelacakan</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Total: {orders.length} Pesanan
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                      <th className="p-4 font-medium">Tanggal</th>
                      <th className="p-4 font-medium">Pelanggan</th>
                      <th className="p-4 font-medium">Detail</th>
                      <th className="p-4 font-medium">Status & Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-400">
                          Belum ada data pesanan.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                          <td className="p-4 text-sm text-gray-600">{order.date}</td>
                          <td className="p-4">
                            <p className="font-semibold text-gray-800">{order.name}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium text-gray-700">{order.service}</p>
                            <p className="text-sm text-gray-500">{order.weight} Kg</p>
                          </td>
                          <td className="p-4 flex gap-2 items-center">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`text-sm font-medium px-3 py-1.5 rounded-full border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                            >
                              <option value="Antrean">Antrean</option>
                              <option value="Dicuci">Dicuci</option>
                              <option value="Disetrika">Disetrika</option>
                              <option value="Selesai">Selesai</option>
                            </select>
                            
                            <button 
                              onClick={() => handleDelete(order.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition ml-2"
                              title="Hapus Pesanan"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}