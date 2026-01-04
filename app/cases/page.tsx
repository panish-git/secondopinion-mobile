"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Clock, CheckCircle2, AlertCircle, Eye, Plus } from "lucide-react"

const MOCK_CASES = [
  {
    id: "SO-2026-001234",
    diagnosis: "Breast Carcinoma",
    status: "in-review",
    submittedDate: "2026-01-02",
    expectedDate: "2026-01-05",
    expert: "Dr. Priya Sharma",
    expertSpecialty: "Breast Pathology",
    progress: 60,
  },
  {
    id: "SO-2026-001189",
    diagnosis: "Lung Adenocarcinoma",
    status: "completed",
    submittedDate: "2025-12-28",
    completedDate: "2025-12-31",
    expert: "Dr. Suresh Menon",
    expertSpecialty: "Pulmonary Pathology",
    progress: 100,
  },
  {
    id: "SO-2026-001145",
    diagnosis: "Colorectal Polyp",
    status: "pending",
    submittedDate: "2026-01-04",
    expectedDate: "2026-01-07",
    expert: null,
    expertSpecialty: null,
    progress: 20,
  },
]

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex w-fit items-center gap-1">
            <Clock className="size-3" />
            Pending Match
          </Badge>
        )
      case "in-review":
        return (
          <Badge
            variant="default"
            className="flex w-fit items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Eye className="size-3" />
            In Review
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="default"
            className="flex w-fit items-center gap-1 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20"
          >
            <CheckCircle2 className="size-3" />
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredCases = MOCK_CASES.filter((caseItem) => {
    if (activeTab === "all") return true
    return caseItem.status === activeTab
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/new-case">
              <Plus className="mr-2 size-4" />
              New Case
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance">My Cases</h1>
          <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">
            Track the status of your submitted cases and view reports
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-review">In Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-4">
            {filteredCases.length === 0 ? (
              <Card className="p-8 text-center">
                <FileText className="mx-auto size-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No cases found in this category.</p>
                <Button asChild className="mt-4 bg-transparent" variant="outline">
                  <Link href="/new-case">Submit Your First Case</Link>
                </Button>
              </Card>
            ) : (
              filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <CardTitle className="text-lg text-balance">{caseItem.diagnosis}</CardTitle>
                        </div>
                        <CardDescription>Case ID: {caseItem.id}</CardDescription>
                      </div>
                      {getStatusBadge(caseItem.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    {caseItem.status !== "completed" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{caseItem.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${caseItem.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Case Details */}
                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <span className="text-muted-foreground">Submitted:</span>
                        <span className="ml-2 font-medium">
                          {new Date(caseItem.submittedDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {caseItem.status === "completed" ? (
                        <div>
                          <span className="text-muted-foreground">Completed:</span>
                          <span className="ml-2 font-medium">
                            {caseItem.completedDate &&
                              new Date(caseItem.completedDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-muted-foreground">Expected:</span>
                          <span className="ml-2 font-medium">
                            {new Date(caseItem.expectedDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Expert Info */}
                    {caseItem.expert && (
                      <div className="rounded-lg border border-border bg-muted/30 p-3">
                        <div className="text-xs text-muted-foreground">Assigned Expert</div>
                        <div className="mt-1 font-medium">{caseItem.expert}</div>
                        <div className="text-xs text-muted-foreground">{caseItem.expertSpecialty}</div>
                      </div>
                    )}

                    {!caseItem.expert && caseItem.status === "pending" && (
                      <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
                        <AlertCircle className="size-4 shrink-0 text-primary mt-0.5" />
                        <span className="leading-relaxed">
                          We're matching your case with the best subspecialist. You'll be notified once an expert is
                          assigned.
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button asChild variant="outline" className="flex-1 bg-transparent">
                        <Link href={`/cases/${caseItem.id}`}>View Details</Link>
                      </Button>
                      {caseItem.status === "completed" && (
                        <Button asChild className="flex-1">
                          <Link href={`/cases/${caseItem.id}/report`}>View Report</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
