'use client'
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Image from "next/image";

export function Carouzela() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, })
    );

    const rooms = ['/rooms/home1.jpg', '/rooms/home2.jpg', '/rooms/home3.jpg'];

    return (
        <Carousel

            plugins={[plugin.current]}
            className="w-full h-screen"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.reset()}
        >
            <CarouselContent className="h-[900px] ">
                {rooms.map((room, index) => (
                    <CarouselItem key={index} className="w-full h-full">
                        <div className="p-1 h-full">
                            <Card className="h-full">
                                <CardContent className="flex items-center justify-center h-full relative">
                                    <Image
                                        src={room}
                                        alt={`Image ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
