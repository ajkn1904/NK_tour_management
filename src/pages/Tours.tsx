import TourFilters from "@/components/modules/Tours/TourFilters";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function Tours() {
    const [searchParams] = useSearchParams();

    const division = searchParams.get("division") || undefined;
    const tourType = searchParams.get("tourType") || undefined;

    const [currentPage, setCurrentPage] = useState(1);
    //const [limit, setLimit] = useState(5);
    const limit = 5;
    
    const { data } = useGetAllToursQuery({ division, tourType, page: currentPage, limit });
    const totalPage = Math.ceil(data!?.length /2) || 1;
    console.log(totalPage);


    return (
        <>
        <div className="container mx-auto px-5 pt-8 grid grid-cols-12 gap-5">

             <TourFilters />

            <div className="col-span-9 w-full">


                {data?.map((item) => (
                    <div
                    key={item.slug}
                        className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
                        >
                        <div className="w-2/5 bg-red-500 flex-shrink-0">
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className="object-cover w-full h-full "
                                />
                        </div>
                        <div className="p-6 flex-1">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-3">{item.description}</p>

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xl font-bold text-primary">
                                    From ৳{item.costFrom.toLocaleString()}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Max {item.maxGuest} guests
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                    <span className="font-medium">From:</span>{" "}
                                    {item.departureLocation}
                                </div>
                                <div>
                                    <span className="font-medium">To:</span>{" "}
                                    {item.arrivalLocation}
                                </div>
                                <div>
                                    <span className="font-medium">Duration:</span>{" "}
                                    {item.tourPlan.length} days
                                </div>
                                <div>
                                    <span className="font-medium">Min Age:</span> {item.minAge}+
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.amenities.slice(0, 3).map((amenity, index) => (
                                    <span
                                    key={index}
                                        className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                                {item.amenities.length > 3 && (
                                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                                        +{item.amenities.length - 3} more
                                    </span>
                                )}
                            </div>

                            <Button asChild className="w-full">
                                <Link to={`/tours/${item._id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>

        {totalPage > 1 && (
            <div className="flex justify-end mt-4 mr-[35%]">
                <div>
                <Pagination>
                    <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className={
                            currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                        (page) => (
                        <PaginationItem
                            key={page}
                            onClick={() => setCurrentPage(page)}
                        >
                            <PaginationLink isActive={currentPage === page}>
                            {page}
                            </PaginationLink>
                        </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationNext
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={
                            currentPage === totalPage
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        />
                    </PaginationItem>
                    </PaginationContent>
                </Pagination>
                </div>
            </div>
        )}

        </>
    );
}