"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Info, GripVertical } from "lucide-react";

const defaultImages = [
  { id: 1, src: "/images/gallery-1.jpg", alt: "Sessão de ecoterapia com criança e terapeuta" },
  { id: 2, src: "/images/gallery-2.jpg", alt: "Paisagem com cavalo ao amanhecer" },
  { id: 3, src: "/images/gallery-3.jpg", alt: "Close-up do olho do cavalo" },
];

export default function AdminGaleriaPage() {
  const [images, setImages] = useState(defaultImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Galeria de Imagens</h1>
          <p className="font-sans text-sm text-text-medium mt-1">Gerencie as fotos exibidas na galeria do site.</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-primary"
        >
          <Upload size={16} aria-hidden="true" />
          Adicionar imagens
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          aria-label="Selecionar imagens para upload"
          onChange={() => {
            alert("Upload disponível após configurar o Supabase Storage. Por enquanto, substitua manualmente os arquivos na pasta public/images/");
          }}
        />
      </div>

      <div className="admin-card mb-6 flex items-start gap-3 bg-blue-50 border-blue-200">
        <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-sans text-sm text-blue-700 font-medium">Upload de imagens</p>
          <p className="font-sans text-sm text-blue-600 mt-0.5">
            Substitua os arquivos na pasta <code className="bg-blue-100 px-1.5 rounded text-xs">public/images/</code> por suas fotos reais.
            Após configurar o Supabase, o upload de imagens funcionará diretamente por aqui.
          </p>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-nature border border-sand/50"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-text-dark/0 group-hover:bg-text-dark/40 transition-colors duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleRemove(img.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  aria-label={`Remover imagem: ${img.alt}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/80 text-text-dark rounded-lg cursor-grab"
                  aria-label="Arrastar para reordenar"
                  role="button"
                >
                  <GripVertical size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <p className="font-sans text-xs text-text-medium truncate">{img.alt}</p>
            </div>
          </div>
        ))}

        {/* Add new placeholder */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="aspect-[4/3] rounded-2xl border-2 border-dashed border-sand-dark hover:border-moss transition-colors duration-300 flex flex-col items-center justify-center gap-2 text-text-light hover:text-moss"
        >
          <Upload size={24} aria-hidden="true" />
          <span className="font-sans text-sm font-medium">Adicionar foto</span>
        </button>
      </div>
    </div>
  );
}
