"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Skeleton } from "@/components/atoms";
import IconSpan from "@/components/atoms/IconSpan";
import { DeleteIcon, EditIcon } from "@/components/icons";

interface Props {
  id: string;
  title: string;
  imageSrc?: string;
  alt?: string;
  edit?: () => void;  // Función opcional para editar
  delete?: () => void;  // Función opcional para eliminar
}

export default function GestionCard({ id, title, imageSrc, alt, edit, delete: del }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleEdit = () => {
    if (edit) {
      edit(); // Ejecuta la función de edición si está disponible
    }
  };

  const handleDelete = () => {
    if (del) {

      del(); // Ejecuta la función de eliminación si está disponible
    }
  };

  return (
    <>
      {isLoading ? (
        <Card className="w-full mx-auto px-5 mb-4 overflow-hidden">
          <CardContent className="flex items-center p-4">
            <Skeleton className="h-12 w-12 rounded-full mr-4" />
            <div className="flex-grow">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20 ml-2" />
          </CardContent>
        </Card>
      ) : (
        <Card className={`w-full mx-auto px-5 mb-4 overflow-hidden border-l-8 border-l-base-primary`}>
          <CardContent className="flex items-center p-4">
            {imageSrc && (
              <img
                className="rounded-full mr-4"
                src={imageSrc}
                alt={alt ?? `Profile picture of ${title}`}
                width={50}
                height={50}
              />
            )}
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <IconSpan>
              <button
                onClick={handleEdit}
                className="hover:scale-110 active:scale-100 transition-transform duration-200"
              >
                <EditIcon />
              </button>
              <button
                onClick={handleDelete}
                className="hover:scale-110 active:scale-100 transition-transform duration-200"
              >
                <DeleteIcon />
              </button>
            </IconSpan>
          </CardContent>
        </Card>
      )}
    </>
  );
}
