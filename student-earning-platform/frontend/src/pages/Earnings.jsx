import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import api from '../api/api';

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ amount: '', source: '', notes: '' });

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await api.get('users/earnings/');
      setEarnings(res.data.items);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('users/earnings/', formData);
      setFormData({ amount: '', source: '', notes: '' });
      setShowForm(false);
      fetchEarnings(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">Earnings Tracker</h1>
            <p className="text-gray-500">Track your freelance income</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark"
          >
            <PlusCircle size={18} /> Add Earning
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="font-semibold mb-4">Log New Income</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  placeholder="Amount (₹)" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="border border-gray-200 rounded-lg p-3 w-full outline-none focus:ring-primary"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Source (e.g. Upwork)" 
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="border border-gray-200 rounded-lg p-3 w-full outline-none focus:ring-primary"
                />
              </div>
              <textarea 
                placeholder="Notes (Optional)" 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="border border-gray-200 rounded-lg p-3 w-full outline-none focus:ring-primary"
              ></textarea>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
                Save Income
              </button>
            </form>
          </div>
        )}

        <div className="bg-gradient-to-r from-primary to-purple-700 p-8 rounded-xl text-white mb-8 shadow-lg">
          <p className="text-sm opacity-80">Total Earnings</p>
          <h2 className="text-4xl font-bold mt-1">₹{total.toLocaleString()}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="font-semibold p-4 border-b bg-gray-50">History</h3>
          {earnings.length === 0 ? (
            <p className="p-6 text-center text-gray-400">No earnings recorded yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {earnings.map((item) => (
                <li key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{item.source}</p>
                    <p className="text-xs text-gray-400">{item.date_received} {item.notes && `• ${item.notes}`}</p>
                  </div>
                  <span className="text-green-600 font-bold">+₹{item.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Earnings;