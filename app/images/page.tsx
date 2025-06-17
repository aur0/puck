"use client"

import { useRouter } from 'next/navigation';
import ImageUploader from './components/ImageUploader';
import { Dialog, Inset, Table, Flex, Button } from "@radix-ui/themes";

export default function ImagesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Image to ImgBB</h1>
      <ImageUploader />

      

    </div>
  );
}