"use client"

import { ChangeEvent, FormEvent, Suspense, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from 'next/navigation';
import { flightData } from './data';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { CalendarIcon, PlaneIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function BookingPage(): JSX.Element {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BookingForm />
        </Suspense>
    );
}

const BookingForm = (): JSX.Element => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [flight, setFlight] = useState(flightData.filter(
        (flight) => flight.id === parseInt(id!, 0))
    [0])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        tripType: '',
        fromCity: '',
        toCity: '',
        departureDate: '',
        additionalInfo: '',
        flightClass: '',
        email: '',
        phone: ''
    })
    const [showDetails, setShowDetails] = useState(false)
    const router = useRouter()
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowDetails(true);
        console.log('Form submitted:', formData);
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, flightClass: value }))
    }

    return (
        <section className="flex gap-2 justify-between w-full py-4 px-16">
            <section className='container mx-auto py-4'>
                <Card className='p-4 w-3/4'>
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
                </Card>
                {showDetails && (
                    <section className="mt-8 p-4 border rounded-md w-3/4">
                        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                            <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
                            <p><strong>Gender:</strong> {formData.gender}</p>
                            <p><strong>Trip Type:</strong> {formData.tripType}</p>
                            <p><strong>From:</strong> {flight.From}</p>
                            <p><strong>To:</strong> {flight.To}</p>
                            <p><strong>Departure Date:</strong> {formData.departureDate}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                            <p><strong>Class:</strong> {formData.flightClass}</p>
                        </section>
                        <p className="mt-4"><strong>Additional Information:</strong> {formData.additionalInfo}</p>
                    </section>
                )}
            </section>
            <section className="container mx-auto py-4">
                <h1 className="text-2xl font-bold mb-4">Travel Booking Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <section>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" onChange={handleInputChange} required />
                        </section>
                        <section>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" onChange={handleInputChange} required />
                        </section>
                    </section>
                    <section>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" name="dateOfBirth" type="date" onChange={handleInputChange} required />
                    </section>
                    <section>
                        <Label>Gender</Label>
                        {/* @ts-ignore */}
                        <RadioGroup onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } })}>
                            <section className="flex items-center space-x-2">
                                <RadioGroupItem value="Male" id="male" />
                                <Label htmlFor="Male">Male</Label>
                            </section>
                            <section className="flex items-center space-x-2">
                                <RadioGroupItem value="Female" id="female" />
                                <Label htmlFor="Female">Female</Label>
                            </section>
                        </RadioGroup>
                    </section>
                    <section>
                        <section>
                            <Label htmlFor="flightClass">Flight Class</Label>
                            <Select onValueChange={handleSelectChange}>
                                <SelectTrigger id="flightClass">
                                    <SelectValue placeholder="Select flight class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Economy">Economy</SelectItem>
                                    <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                                    <SelectItem value="Business">Business</SelectItem>
                                    <SelectItem value="First Class">First Class</SelectItem>
                                </SelectContent>
                            </Select>
                        </section>
                    </section>
                    <section>
                        <Label>Trip Type</Label>
                        {/* @ts-ignore */}
                        <RadioGroup onValueChange={(value) => handleInputChange({ target: { name: 'tripType', value } })}>
                            <section className="flex items-center space-x-2">
                                <RadioGroupItem value="One Way" id="oneWay" />
                                <Label htmlFor="One Way">One Way</Label>
                            </section>
                            <section className="flex items-center space-x-2">
                                <RadioGroupItem value="Round Trip" id="roundTrip" />
                                <Label htmlFor="Round Trip">Round Trip</Label>
                            </section>
                        </RadioGroup>
                    </section>
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <section>
                            <Label htmlFor="fromCity">From City</Label>
                            <Input disabled={true} defaultValue={flight.From} id="fromCity" name="fromCity" onChange={handleInputChange} required />
                        </section>
                        <section>
                            <Label htmlFor="toCity">To City</Label>
                            <Input disabled={true} defaultValue={flight.To} id="toCity" name="toCity" onChange={handleInputChange} required />
                        </section>
                    </section>
                    <section>
                        <Label htmlFor="departureDate">Departure Date</Label>
                        <Input id="departureDate" name="departureDate" type="date" onChange={handleInputChange} required />
                    </section>
                    <section>
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea id="additionalInfo" name="additionalInfo" onChange={handleInputChange} />
                    </section>
                    <section>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" onChange={handleInputChange} required />
                    </section>
                    <section>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" onChange={handleInputChange} required />
                    </section>
                    <Button type="submit">Submit Booking</Button>
                </form>
            </section>
        </section>
    )
}