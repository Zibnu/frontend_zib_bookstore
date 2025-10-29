import React, { useEffect, useState } from 'react'
import CheckoutStepBar from '../components/CheckoutStepBar'
import AddressSection from '../components/AddressSection'
import CheckoutItemList from '../components/CheckoutItemList'
import PaymentSection from '../components/PaymentSection'
import CheckoutSummaryCard from '../components/CheckoutSummaryCard'
import apiServices from '../utils/api'
import toast from 'react-hot-toast'


function Checkout() {
  const [currentStep, setCurrentStep] = useState("shipping");
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const selected = JSON.parse(localStorage.getItem("selectedCart")) || [];

        if(selected.length === 0) {
          toast.error("Tidak Ada Item Yang Dipilih Untuk Checkout");
          return;
        }

        const res = await apiServices.get("/cart/myCart", {
          headers : { Authorization : `Bearer ${token}`},
        });

        const filtered = res.data.data.filter((item) => 
          selected.includes(item.id_cart)
        );
        setSelectedItems(filtered);
      } catch (error) {
        toast.error(error.response?.data?.message || "Gagal Memuat Data Checkout from Checkout Pages");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutItems();
  }, []);


  const handleNextStep = () => {
    console.log(activeAddress)
    if(!activeAddress) {
      toast.error("Silahkan Pilih Alamat Terlebih Dahulu");
      return;
    }
    setCurrentStep("payment");
  };

  if(loading) return <div className="text-center text-gray-400 text-sm">Memuat Data Checkout....</div>

  return (
    <div className='max-w-6xl ms-auto px-4 py-10'>
      <CheckoutStepBar currentStep={currentStep}/>

      <div className={`grid gap-6 ${
        currentStep === "shipping"
        ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"
      }`}>
        {/* Bagian Kiri */}
        <div className="lg:col-span-2 space-y-5">
          {currentStep === "shipping" && (
            <>
              <AddressSection
              activeAddress={activeAddress}
              setActiveAddress={setActiveAddress}
              />
              <CheckoutItemList/>
            </>
          )}

          {currentStep === "payment" && (
            <PaymentSection
            selectedItems={selectedItems}
            address={activeAddress}
            />
          )}
        </div>

        {/* Bagian kanan */}
        <div className='self-start sticky top-25'>
          {currentStep === "shipping" &&(
            <CheckoutSummaryCard
            cartItems={selectedItems}
            step={currentStep}
            onNext={handleNextStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout