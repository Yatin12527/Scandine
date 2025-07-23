import Data from "@/components/menuOneData";
import HeadingOne from "@/components/menuOneHeading";

export default function MenuOne() {
  return (
   <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-inter"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <HeadingOne />
      <Data/>
    </div>
  );
}
