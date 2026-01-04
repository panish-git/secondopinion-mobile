import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Building2, GraduationCap, MapPin, Clock, Star, CheckCircle2 } from "lucide-react"

export default function ExpertProfilePage() {
  // In a real app, this would fetch data based on the ID
  const expert = {
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
    about:
      "Dr. Priya Sharma is a senior consultant pathologist specializing in breast pathology with over 15 years of experience. She has completed advanced fellowships in diagnostic breast pathology and has published numerous research papers in international journals.",
    qualifications: [
      "MD (Pathology) - Grant Medical College, Mumbai",
      "DNB (Pathology) - National Board of Examinations",
      "Fellowship in Breast Pathology - Memorial Sloan Kettering Cancer Center, USA",
    ],
    expertise: [
      "Breast cancer diagnosis and subtyping",
      "HER2 testing and interpretation",
      "Hormone receptor analysis",
      "Intraoperative frozen section consultation",
      "Fine needle aspiration cytology",
    ],
    affiliations: [
      "Tata Memorial Hospital, Mumbai",
      "Indian Academy of Pathology",
      "Association of Breast Pathologists",
    ],
    languages: ["English", "Hindi", "Marathi"],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/experts">
              <ArrowLeft className="mr-2 size-4" />
              Back to Experts
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <CardTitle className="text-2xl text-balance">{expert.name}</CardTitle>
                  {expert.available && (
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Available
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">{expert.degree}</CardDescription>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-primary text-primary" />
                  <span className="text-lg font-semibold">{expert.rating}</span>
                  <span className="text-sm text-muted-foreground">({expert.reviewCount} reviews)</span>
                </div>
                <div className="text-sm text-muted-foreground">{expert.experience} years of experience</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <span className="font-medium">{expert.subspecialty}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{expert.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">Turnaround: {expert.turnaround}</span>
              </div>
            </div>
            <Button asChild className="w-full md:w-auto" size="lg">
              <Link href="/new-case">Request Second Opinion</Link>
            </Button>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{expert.about}</p>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="size-5" />
              Qualifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {expert.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="leading-relaxed">{qual}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas of Expertise */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="size-5" />
              Areas of Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expert.expertise.map((area, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Affiliations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-5" />
              Professional Affiliations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {expert.affiliations.map((affiliation, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="leading-relaxed">{affiliation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expert.languages.map((lang, idx) => (
                <Badge key={idx} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="/new-case">Request Second Opinion from Dr. {expert.name.split(" ")[1]}</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
