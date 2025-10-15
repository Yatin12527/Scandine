import { Section } from "@/types/sectionType";
import React from "react";
import { HiPencilSquare } from "react-icons/hi2";

type ClassicBlackProps = {
  data: Section;
  imgUrl: string[];
  setIspreview: (value: boolean) => void;
  sectionIndex: number;
  hideEdit?: boolean;
};

const ClassicBlack = ({
  data,
  imgUrl,
  setIspreview,
  sectionIndex,
  hideEdit,
}: ClassicBlackProps) => {
  const getLayoutType = (index: number) => {
    const patterns = [1, 2, 3, 4, 3, 2, 1];
    return patterns[index % patterns.length];
  };

  const layoutType = getLayoutType(sectionIndex);
  const images = Array.isArray(imgUrl)
    ? imgUrl.filter(Boolean)
    : imgUrl
    ? [imgUrl]
    : [];
  // Layout 1
  const Layout1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold">{item.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.description}</p>
            </div>
            <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
              {item.price}
            </span>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {images.map((img, i) => (
            <div key={i} className="w-full h-64">
              <img
                src={img}
                alt="Menu item"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Layout 2
  const Layout2 = () => {
    return (
      <>
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {images.slice(0, 3).map((img, idx) => (
              <div key={idx}>
                <div className="flex justify-center w-full h-40 mb-3">
                  <img
                    src={img}
                    alt="Menu item"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {data.items[idx] && (
                  <>
                    <div className="flex justify-between items-start">
                      <h3 className="text-white text-lg font-semibold">
                        {data.items[idx].value}
                      </h3>
                      <span className="text-yellow-600 font-bold ml-4 font-captureit">
                        {data.items[idx].price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {data.items[idx].description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.slice(images.length).map((item, idx) => (
            <div key={idx} className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold">
                  {item.value}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              </div>
              <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };
  // Layout 3
  const Layout3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {images.map((img, i) => (
            <div key={i} className="w-full h-64">
              <img
                src={img}
                alt="Menu item"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
      <div
        className={`${
          images.length > 0 ? "lg:col-span-2" : "lg:col-span-3"
        } grid grid-cols-1 md:grid-cols-2 gap-6`}
      >
        {data.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold">{item.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.description}</p>
            </div>
            <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Layout 4
  const Layout4 = () => (
    <div className="grid grid-cols-1 gap-6">
      {images.length > 0 &&
        images.map((img, i) => (
          <div key={i} className="w-full h-64">
            <img
              src={img}
              alt="Menu item"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      <div className="space-y-6">
        {data.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold">{item.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.description}</p>
            </div>
            <span className="text-yellow-600 font-bold ml-4 whitespace-nowrap font-captureit">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (layoutType) {
      case 1:
        return <Layout1 />;
      case 2:
        return <Layout2 />;
      case 3:
        return <Layout3 />;
      case 4:
        return <Layout4 />;
      default:
        return <Layout1 />;
    }
  };

  return (
    <section className="mb-12 px-4 ">
      <div className="flex justify-center items-center mb-2">
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-center flex-1 tracking-wider text-white font-captureit">
            {data.sectionTitle}
          </h2>
          <div className="w-32 h-0.5 bg-orange-400 mx-auto mb-8"></div>
        </div>

        {!hideEdit && (
          <HiPencilSquare
            size={28}
            className="text-orange-500 cursor-pointer hover:text-orange-400 transition-colors ml-4 mb-8"
            onClick={() => setIspreview(false)}
          />
        )}
      </div>

      {renderLayout()}
    </section>
  );
};

export default ClassicBlack;
