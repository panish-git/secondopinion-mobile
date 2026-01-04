"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, MapPin, Award, Clock, Star } from "lucide-react"

const MOCK_EXPERTS = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    degree: "MD, DNB (Pathology)",
    subspecialty: "Breast Pathology",
    experience: 15,
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviewCount: 127,
    turnaround: "2-3 days",
    hospital: "Tata Memorial Hospital",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    degree: "MD (Pathology), FRCPath",
    subspecialty: "Hematopathology",
    experience: 18,
    location: "Delhi, NCR",
    rating: 4.8,
    reviewCount: 103,
    turnaround: "2-3 days",
    hospital: "AIIMS Delhi",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Anita Desai",
    degree: "MD, DCP",
    subspecialty: "GI Pathology",
    experience: 12,
    location: "Bangalore, Karnataka",
    rating: 4.9,
    reviewCount: 95,
    turnaround: "2-3 days",
    hospital: "Manipal Hospital",
    available: true,
  },
  {
    id: 4,
    name: "Dr. Suresh Menon",
    degree: "MD (Pathology)",
    subspecialty: "Pulmonary Pathology",
    experience: 20,
    location: "Chennai, Tamil Nadu",
    rating: 4.7,
    reviewCount: 88,
    turnaround: "3-4 days",
    hospital: "Apollo Hospital",
    available: false,
  },
  {
    id: 5,
    name: "Dr. Neha Gupta",
    degree: "MD, DNB (Pathology)",
    subspecialty: "Dermatopathology",
    experience: 10,
    location: "Pune, Maharashtra",
    rating: 4.8,
    reviewCount: 76,
    turnaround: "2-3 days",
    hospital: "Ruby Hall Clinic",
    available: true,
  },
  {
    id: 6,
    name: "Dr. Arjun Mehta",
    degree: "MD (Pathology), FIAC",
    subspecialty: "Cytopathology",
    experience: 14,
    location: "Ahmedabad, Gujarat",
    rating: 4.9,
    reviewCount: 112,
    turnaround: "2-3 days",
    hospital: "Sterling Hospital",
    available: true,
  },
]

const SUBSPECIALTIES = [
  "All Subspecialties",
  "Breast Pathology",
  "Hematopathology",
  "GI Pathology",
  "Pulmonary Pathology",
  "Dermatopathology",
  "Cytopathology",
  "Oncopathology",
]

function ExpertsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subspecialtyFilter, setSubspecialtyFilter] = useState("All Subspecialties")

  const filteredExperts = MOCK_EXPERTS.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.subspecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubspecialty =
      subspecialtyFilter === "All Subspecialties" || expert.subspecialty === subspecialtyFilter

    return matchesSearch && matchesSubspecialty
  })

  return (
    <>
      <main className="container max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance">Find an Expert Pathologist</h1>
          <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">
            Browse our network of verified subspecialist pathologists
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, subspecialty, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={subspecialtyFilter} onValueChange={setSubspecialtyFilter}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Select subspecialty" />
            </SelectTrigger>
            <SelectContent>
              {SUBSPECIALTIES.map((subspecialty) => (
                <SelectItem key={subspecialty} value={subspecialty}>
                  {subspecialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredExperts.length} {filteredExperts.length === 1 ? "expert" : "experts"}
        </div>

        {/* Expert Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-balance">{expert.name}</CardTitle>
                    <CardDescription className="mt-1">{expert.degree}</CardDescription>
                  </div>
                  {expert.available ? (
                    <Badge variant="default" className="shrink-0 bg-primary/10 text-primary hover:bg-primary/20">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="shrink-0">
                      Busy
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Award className="size-4 text-primary" />
                  <span>{expert.subspecialty}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{expert.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{expert.turnaround}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-primary text-primary" />
                    <span className="font-semibold">{expert.rating}</span>
                    <span className="text-muted-foreground">({expert.reviewCount} reviews)</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{expert.experience} years exp.</div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Affiliated with: {expert.hospital}</div>
                  <Button asChild className="w-full" disabled={!expert.available}>
                    <Link href={`/experts/${expert.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No experts found matching your search criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("")
                setSubspecialtyFilter("All Subspecialties")
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </Card>
        )}
      </main>
    </>
  )
}

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <Suspense fallback={null}>
        <ExpertsContent />
      </Suspense>
    </div>
  )
}
