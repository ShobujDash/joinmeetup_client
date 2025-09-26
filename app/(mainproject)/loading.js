import { CategoriesSkeleton } from '@/components/loading/CategoriesSkeleton'
import { HeroSkeleton } from '@/components/loading/HeroSkeleton'
import { JoinMeetupSkeleton } from '@/components/loading/JoinMeetupSkeleton'
import { UpcomingEventsSkeleton } from '@/components/loading/UpcomingEventsSkeleton'
import React from 'react'

const loading = () => {
  return (
    <div>
      <HeroSkeleton/>
      <UpcomingEventsSkeleton />
      <CategoriesSkeleton />
      <JoinMeetupSkeleton/>
    </div>
  )
}

export default loading