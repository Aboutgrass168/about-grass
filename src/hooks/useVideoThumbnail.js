import { useState, useEffect } from 'react'

const useVideoThumbnail = (videoUrl) => {
  const [thumbnail, setThumbnail] = useState(null)

  useEffect(() => {
    if (!videoUrl) return

    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.src = videoUrl

    video.addEventListener('loadeddata', () => {
      video.currentTime = 1 // Seek to 1 second to avoid black frame
    })

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const thumbnailUrl = canvas.toDataURL('image/jpeg')
      setThumbnail(thumbnailUrl)
    })

    // Cleanup
    return () => {
      video.remove()
    }
  }, [videoUrl])

  return thumbnail
}

export default useVideoThumbnail
