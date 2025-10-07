"use client";
import { useEffect, useState } from "react";
import Minimilist from "./minimilistPreview";
import MenuForm from "./menuForm";
import { usePathname } from "next/navigation";

function Data({ sectionId }: { sectionId: number }) {
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
      image: " ",
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
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
      setImgUrl(current?.image ?? "");
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
          image: " ",
        },
      ]);
      setImgUrl("");
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
            imgUrl={imgUrl}
            setIspreview={setIspreview}
          />
        ) : null
      ) : (
        <MenuForm
          sectionData={sections[0]}
          imgUrl={imgUrl}
          setImage={setImage}
          setImgUrl={setImgUrl}
          image={image}
          sectionId={sectionId}
          setIspreview={setIspreview}
          setSections={setSections}
          nextId={nextId}
          setNextId={setNextId}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
}

export default Data;
