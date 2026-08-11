import HistoryView from '@/views/history/HistoryView'
import { Suspense } from 'react'

const page = () => {
  return (
   <Suspense><HistoryView/></Suspense>
  )
}

export default page