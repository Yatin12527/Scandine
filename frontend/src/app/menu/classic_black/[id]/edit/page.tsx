"use client";
import MenuEditor from "@/components/menuComponents/menuEditor";
import { useParams } from "next/navigation";
import React from "react";

function EditMenu() {
  const params=useParams<{id:string}>()
  const menuId=params.id

  return (
    <div>
      <MenuEditor mode="edit" menuId={menuId} />
    </div>
  );
}

export default EditMenu;
