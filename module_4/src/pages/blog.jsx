import { useEffect } from 'react'

export default function BlogPage() {
  useEffect(() => {
    window.location.href = 'https://clownz.vn/tin-tuc'
  }, [])

  return <p>Đang chuyển đến trang blog...</p>
}
