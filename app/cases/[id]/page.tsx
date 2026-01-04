import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Download, Eye, Clock, CheckCircle2, User, Calendar } from "lucide-react"

export default function CaseDetailPage() {
  // In a real app, this would fetch data based on the case ID
  const caseData = {
    id: "SO-2026-001234",
    diagnosis: "Breast Carcinoma",
    status: "in-review",
    submittedDate: "2026-01-02",
    expectedDate: "2026-01-05",
    expert: {
      name: "Dr. Priya Sharma",
      specialty: "Breast Pathology",
      hospital: "Tata Memorial Hospital",
    },
    patient: {
      name: "Jane Doe",
      age: 45,
    },
    clinicalHistory:
      "Patient presented with a palpable mass in the right breast. Mammography showed a suspicious lesion. Core needle biopsy was performed. Seeking second opinion on diagnosis and treatment recommendations.",
    files: [
      { name: "Pathology_Report.pdf", type: "report", uploadDate: "2026-01-02", size: "2.4 MB" },
      { name: "Slide_01.jpg", type: "slide", uploadDate: "2026-01-02", size: "1.8 MB" },
      { name: "Slide_02.jpg", type: "slide", uploadDate: "2026-01-02", size: "1.6 MB" },
    ],
    timeline: [
      { date: "2026-01-02 10:30 AM", event: "Case submitted", status: "completed" },
      { date: "2026-01-02 12:15 PM", event: "Expert matched - Dr. Priya Sharma", status: "completed" },
      { date: "2026-01-03 09:00 AM", event: "Expert started review", status: "completed" },
      { date: "2026-01-05 05:00 PM", event: "Expected completion", status: "pending" },
    ],
    urgency: "standard",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cases">
              <ArrowLeft className="mr-2 size-4" />
              Back to Cases
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-8">
        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl text-balance">{caseData.diagnosis}</CardTitle>
                <CardDescription className="mt-1">Case ID: {caseData.id}</CardDescription>
              </div>
              <Badge variant="default" className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
                <Eye className="mr-1 size-3" />
                In Review
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-sm font-medium">Submitted</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(caseData.submittedDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-sm font-medium">Expected Completion</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(caseData.expectedDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{caseData.patient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{caseData.patient.age} years</span>
                </div>
              </CardContent>
            </Card>

            {/* Clinical History */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{caseData.clinicalHistory}</p>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Uploaded Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {caseData.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {file.size} • Uploaded{" "}
                          {new Date(file.uploadDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="size-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex size-8 items-center justify-center rounded-full ${
                            item.status === "completed"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.status === "completed" ? (
                            <CheckCircle2 className="size-4" />
                          ) : (
                            <Clock className="size-4" />
                          )}
                        </div>
                        {idx < caseData.timeline.length - 1 && <div className="h-full w-px bg-border mt-2" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-sm font-medium">{item.event}</div>
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Expert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assigned Expert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold">{caseData.expert.name}</div>
                  <div className="text-sm text-muted-foreground">{caseData.expert.specialty}</div>
                  <div className="text-xs text-muted-foreground mt-1">{caseData.expert.hospital}</div>
                </div>
                <Separator />
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/experts/1">View Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Have questions about your case? Contact our support team.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
