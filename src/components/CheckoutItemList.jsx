import { useEffect,useState } from 'react';
import apiServices from '../utils/api'
import toast from 'react-hot-toast'


function CheckoutItemList() {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const selected = JSON.parse(localStorage.getItem("selectedCart")) || [];

        if( selected.length === 0) {
          toast.error("Tidak Ada Item Yang Dipilih");
          return;
        }

        const res = await apiServices.get("/cart/myCart", {
          headers : { Authorization : `Bearer ${token}`},
        });

        const filtered = res.data.data.filter((item) => 
          selected.includes(item.id_cart)
        );

        setCheckoutItems(filtered)
      } catch (error) {
        toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Keranjang User from Checkout Item List")
        console.error(error || error.message)
      } finally {
        setLoading(false);
      };
    };

    fetchCheckoutItems();
  }, [])

    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if(loading) return <div className="text-gray-400 text-center text-sm">Loading data cart ....</div>
  if(checkoutItems.length === 0) return <div className="text-gray-500 text-center">Tidak Ada Item Yang Terpilih</div>
  return (
    <div className='bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4'>
      <h2 className="text-lg text-[#333333] font-semibold mb-3">Daftar Buku Checkout</h2>

      {checkoutItems.map((item) => (
        <div 
        key={item.id_cart}
        className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-4">
            <img 
            src={item.book.cover_path}
            alt={item.book.title}
            className="w-16 h-20 object-cover rounded"
            />
            <div>
              <h4 className="font-semibold text-[#333333]">{item.book.title}</h4>
              <p className="text-[#757575] text-sm">Qty : {item.quantity}</p>
            </div>
          </div>

          <p className="font-semibold text-[#da8127]">
            {formatRupiah(item.book.price_cents * item.quantity)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CheckoutItemList