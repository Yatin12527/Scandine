"use client";
import MenuOne from "@/components/menuEditor";
import { useParams } from "next/navigation";
import React from "react";

function EditMenu() {
  const params=useParams<{id:string}>()
  const menuId=params.id
  return (
    <div>
      <MenuOne mode="edit" menuId={menuId} />
    </div>
  );
}

export default EditMenu;
