"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, PlaneIcon } from "lucide-react"
import { flightData } from './data'
import { useRouter } from 'next/navigation'

// @ts-ignore
const cities = [...new Set(flightData.flatMap(flight => [flight.From, flight.To]))].sort()

export default function FlightSearch() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [searchResults, setSearchResults] = useState(flightData)

  const handleSearch = () => {
    const filteredResults = flightData.filter(flight =>
      (from === "" || flight.From.toLowerCase() === from.toLowerCase()) &&
      (to === "" || flight.To.toLowerCase() === to.toLowerCase())
    )
    setSearchResults(filteredResults)
  }

  const router = useRouter()

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Flight Search</h1>
      <section className="flex flex-col md:flex-row gap-4 mb-8">
        <Select onValueChange={setFrom}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="From" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setTo}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="To" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} className="w-full md:w-auto">Search Flights</Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((flight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{flight.From} to {flight.To}</span>
                <PlaneIcon className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{flight.Price}</p>
              <p className="text-sm text-gray-500 flex items-center mt-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {new Date(flight.Date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push("/book?id="+index)}>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      {searchResults.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No flights found. Please try different search criteria.</p>
      )}
    </section>
  )
}