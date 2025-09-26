import { LogoTable } from '@/components/adminComponents/table/LogoTable';
import WorkInProgressMessage from '@/components/WorkInProgress';
import { getAllLogoAPI } from '@/service/adminService/logo.service';
import React from 'react'

const page = async() => {

  const logos = await getAllLogoAPI(); 

  return (
    <div className="max-w-[67rem]">
      <LogoTable data={logos} />
      <WorkInProgressMessage/>
    </div>
  );
}

export default page