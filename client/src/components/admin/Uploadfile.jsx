import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { RemoveFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { LoaderCircle } from 'lucide-react';


export const Uploadfile = ({ form, setForm, clearUpload }) => {
  const token = useEcomStore((state) => state.token)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e) => {
    setIsLoading(true)
    const files = e.target.files
    if (files) {
      setIsLoading(true)
      let allFiles = [...form.images]

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} Not is image!!!`)
          continue
        }

        Resize.imageFileResizer(
          file,
          720,
          720,
          'JPEG',
          80,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                allFiles.push(res.data)
                setForm({ ...form, images: allFiles })
                setIsLoading(false)
                toast.success('Upload image Success!!')
              })
              .catch((err) => {
                console.log(err)
                toast.error('Upload failed')
                setIsLoading(false)
              })
          },
          'base64'
        )
      }
    }
  }

  const handleDelete = (public_id) => {
    const images = form.images
    RemoveFiles(token, public_id)
      .then((res) => {
        const filterimages = images.filter((item) => item.public_id !== public_id)
        setForm({ ...form, images: filterimages })
        toast.error(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // เคลียร์ preview เมื่อ submit เสร็จ
  useEffect(() => {
    if (clearUpload > 0) {
      setForm({ ...form, images: [] })
    }
  }, [clearUpload])

  return (
    <div className="mt-4">
      <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
        {
          isLoading && <LoaderCircle className='w-10 h-10 animate-spin'/>
        }
        
        {form.images.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-32 md:h-36 lg:h-40 rounded-lg overflow-hidden border border-gray-300 shadow-sm hover:shadow-lg transition-shadow duration-200 group"
          >
            <img
              src={item.url}
              alt={`preview-${index}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
            />
            <button
              type="button"
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div>
        <input onChange={handleOnChange} type="file" name="images" multiple />
      </div>
    </div>
  )
}
