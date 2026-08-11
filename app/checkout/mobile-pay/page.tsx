import MobilePaymentPage from '@/views/mobile-pay/Index'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={null}><MobilePaymentPage/></Suspense>
  )
}

export default page