import { motion } from "framer-motion";
import { FaSpaceShuttle } from "react-icons/fa";

export default function Loader() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <FaSpaceShuttle className="text-6xl md:text-9xl animate-pulse animate-infinite animate-slow" />
        </div>
    );
}
