"use client";
import { useEffect, useState } from "react";
import Minimilist from "../designs/minimilistPreview";
import { usePathname } from "next/navigation";
import ClassicBlack from "../designs/classicBlackPreview";
import MenuFormClassicBlack from "./menuFormClassicBlack";
import MenuFormMinimalist from "./menuFormMinimilist";

function Data({
  sectionId,
  sectionIndex,
}: {
  sectionId: number;
  sectionIndex?: number;
}) {
  const [currentTheme, setCurrentTheme] = useState<string>("minimilist");
  const [sections, setSections] = useState([
    {
      sectionTitle: "",
      items: [
        {
          id: 0,
          value: "",
          description: "",
          price: "",
        },
      ],
      image: [],
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isPreview, setIspreview] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string>("minimilist");
  const pathname = usePathname();

  useEffect(() => {
    const allSections = JSON.parse(localStorage.getItem("menuItems") || "{}");
    const current = allSections[sectionId];
    const template = pathname.split("/")[2];
    setActiveTemplate(template);
    setCurrentTheme(template);

    // check if data is already present or not
    if (current) {
      setSections([current]);
      setImgUrls(current?.image ?? []);
      setIspreview(true);

      let maxId = 0;
      current?.items?.forEach((item) => {
        if (item.id > maxId) maxId = item.id;
      });
      setNextId(maxId + 1);
    } else {
      setSections([
        {
          sectionTitle: "",
          items: [{ id: 0, value: "", description: "", price: "" }],
          image: [],
        },
      ]);
      setImgUrls([]);
      setIspreview(false);
      setNextId(1);
    }
  }, [sectionId]);

  return (
    <div>
      {isPreview ? (
        activeTemplate === "minimilist" ? (
          <Minimilist
            data={sections[0]}
            imgUrl={imgUrls.length > 0 ? imgUrls[0] : ""}
            setIspreview={setIspreview}
          />
        ) : activeTemplate === "classic_black" ? (
          <ClassicBlack
            data={sections[0]}
            imgUrl={imgUrls.length > 0 ? imgUrls[0] : ""}
            setIspreview={setIspreview}
            sectionIndex={sectionIndex ?? 0}
          />
        ) : null
      ) : activeTemplate === "minimilist" ? (
        <MenuFormMinimalist
          sectionData={sections[0]}
          imgUrls={imgUrls}
          setImages={setImages}
          setImgUrls={setImgUrls}
          images={images}
          sectionId={sectionId}
          setIspreview={setIspreview}
          setSections={setSections}
          nextId={nextId}
          setNextId={setNextId}
          currentTheme={currentTheme}
        />
      ) : activeTemplate === "classic_black" ? (
        <MenuFormClassicBlack
          sectionData={sections[0]}
          imgUrls={imgUrls}
          setImages={setImages}
          setImgUrls={setImgUrls}
          images={images}
          sectionId={sectionId}
          setIspreview={setIspreview}
          setSections={setSections}
          nextId={nextId}
          setNextId={setNextId}
          currentTheme={currentTheme}
        />
      ) : null}
    </div>
  );
}

export default Data;
