function BookCard({ image, title, price}) {
  const formatRupiah = (value) => {
    if(!value) return "0";
  
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div 
    className="min-w-[140px]  bg-[#FFFFFF] rounded-xl shadow-xl hover:shadow-lg transition-all duration-300 hover:translate-y-1 cursor-pointer flex flex-col h-full">
      <div className="w-full aspect-[3/4] overflow-hidden rounded-t-xl">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm text-[#333333] font-medium line-clamp-2 mb-2">{title}</h3>
        <p className="text-[#da8127] font-semibold mt-auto">{formatRupiah(price)}</p>
      </div>
    </div>
  )
}

export default BookCard