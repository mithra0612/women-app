import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
const disposalMethods = [
  { icon: "🚽", name: "Flush", path: "/disposals/flush" },
  { icon: "🔥", name: "Burn", path: "/disposals/burn" },
  { icon: "🗑", name: "Wrap & Bin", path: "/disposals/wrap" },
  { icon: "🌱", name: "Bury", path: "/disposals/bury" },
  { icon: "♻️", name: "Compost", path: "/disposals" },
  { icon: "♨️", name: "Medical Incineration", path: "/disposals" },
  { icon: "🚮", name: "Throw in Open Waste", path: "/disposals/openwaste" },
  { icon: "🏭", name: "Industrial Recycling", path: "/disposals/recycle" }
];

function CustomCard({ icon, name, link }) {
  return (
    <Link to={link} aria-label={name}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all rounded-lg p-6 flex flex-col items-center text-center w-72 h-80"
      >
        <div className="text-[100px] mb-4">{icon}</div>
        <p className="text-2xl font-bold mt-4">{name}</p>
      </motion.div>
    </Link>
  );
}

export default function DisposalsPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 flex-1">
        {disposalMethods.map((method, index) => (
          <CustomCard 
            key={index} 
            icon={method.icon} 
            name={method.name} 
            link={method.path} 
          />
        ))}
      </div>
    </div>
  );
}