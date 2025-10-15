import { Section } from "@/types/sectionType";
import { HiPencilSquare } from "react-icons/hi2";
type MinimilistProps = {
  data: Section;
  imgUrl: string;
  setIspreview: (value: boolean) => void;
  hideEdit?: boolean;
};
const Minimilist = ({
  data,
  imgUrl,
  setIspreview,
  hideEdit,
}: MinimilistProps) => {
  return (
    <div>
      <div className="max-w-xl mx-auto sm:p-0 p-10">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer hover:text-green-600 drop-shadow-md">
            {data.sectionTitle}
          </h2>

          {!hideEdit && (
            <HiPencilSquare
              size={28}
              className="text-orange-500 cursor-pointer hover:text-orange-400 transition-colors ml-4 mb-8"
              onClick={() => setIspreview(false)}
            />
          )}
        </div>
        <div className="bg-gray-500 w-full h-0.5 mb-4" />
        <div className="space-y-2">
          {data.items.map((data, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-green-600 text-sm">
                  {data.value}
                </h3>
                <p className="text-xs text-gray-600 cursor-pointer  hover:text-green-600 leading-tight">
                  {data.description}
                </p>
              </div>
              <span className="font-bold text-gray-800 cursor-pointer hover:text-green-600 text-sm whitespace-nowrap">
                {data.price}
              </span>
            </div>
          ))}
        </div>
        {imgUrl && imgUrl.trim() !== "" && (
          <div className="w-full h-60 mt-4">
            <img
              src={imgUrl}
              alt="Uploaded Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Minimilist;
