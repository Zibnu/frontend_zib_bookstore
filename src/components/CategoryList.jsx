import economyIcon from "../assets/images/iconEconomy.png";
import biografiIcon from "../assets/images/iconBiografi.png";
import puisiIcon from "../assets/images/iconPuisi.png";
import fiksiIcon from "../assets/images/iconFiksi.png";
import sejarahIcon from "../assets/images/iconSejarah.png";
import cerpenIcon from "../assets/images/iconCerpen.png";
import { useEffect, useState } from "react";
import apiServices from "../utils/api";

const iconMap = {
  Sejarah : sejarahIcon,
  Cerpen : cerpenIcon,
  Fiksi : fiksiIcon,
  Puisi : puisiIcon,
  Biografi : biografiIcon,
  Ekonomi : economyIcon,
};
function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiServices.get("/categories/")
    .then( res => {
      setCategories(res.data?.data || [])
    })
  }, [])
  return (
    <div className="">CategoryList</div>
  )
}

export default CategoryList