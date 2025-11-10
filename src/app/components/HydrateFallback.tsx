import { Spinner } from '@src/shared/ui/Spinner'

export const HydrateFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="w-8 h-8" />
    </div>
  )
}
