"use client"
import { useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { CarProps } from '@/types'
import { calculateCarRent } from '@/utils'
import CarDetails from './CarDetails'

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }:CarCardProps) => {
    
    const carImage="/cars/"+car.make+".png";
    const[isOpen,setIsOpen]=useState(false)
    // console.log("carrr   ",car);
    
    const {city_mpg,year,make,model,transmission,drive }=car;

    const carRent = parseInt(calculateCarRent(city_mpg,year));
    const RupeeRent=carRent*80;

  return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card__content-title'>
                {make} {model}
            </h2>
        </div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px] font-semibold'>
            ₹
            </span>
                {RupeeRent}
                <span className='self-end text-[14px] font-medium'>/day</span>                 
        </p>
        <div className='relative object-contain w-full h-40 my-3'>
            <Image src={carImage} alt="car" fill priority className='object-contain' />
        </div>

        <div className='relative flex w-full mt-2'>
            <div className='flex justify-between w-full group-hover:invisible text-gray'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <Image src="/steering-wheel.svg" width={20} height={20} alt='steering wheel' />
                    <p className='text-[14px]'>
                        {transmission==='a'?'Automatic':'Manual'} 
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <Image src="/tire.svg" width={20} height={20} alt='steering wheel' />
                    <p className='text-[14px]'>
                        {drive.toUpperCase()} 
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <Image src="/gas.svg" width={20} height={20} alt='steering wheel' />
                    <p className='text-[14px]'>
                        {city_mpg} MPG 
                    </p>
                </div>
            </div>
            <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue px-[8px]'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            // rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
            
        </div>
        <CarDetails isOpen={isOpen} closeModal={()=> setIsOpen(false)} car={car}  />
    </div>
  )
}

export default CarCard