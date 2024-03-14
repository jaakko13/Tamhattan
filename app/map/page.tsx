'use client'

import React, { useEffect, useMemo, useState } from 'react'
import NavBar from '../components/navBar'
import Image from 'next/image'
import nam from '../../public/nam.gif'
import { createClient } from "../../utils/supabase/client";
import { cookies } from 'next/headers'
import { Loader } from '@googlemaps/js-api-loader';



export default function Map() {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');

            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            const position = {
                lat: 61.499486563134575,
                lng: 23.779374168252566
            }

            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAPID'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

            const marker = new Marker({
                map: map,
                position: position
            })
        }
        initMap()
    }, [])

    return (
        <div className='bg'>
            <NavBar />

            <div className='h-full' ref={mapRef} />
        </div>
    )
}


