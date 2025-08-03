import React, { useEffect, useState } from "react"
import { Calendar, Clock, User, FileText, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

interface Session {
  id: string
  subject: string
  tutor: string
  date: string
  time: string
  topic: string
}

interface Assignment {
  id: string
  subject: string
  title: string
  due: string
  completed: boolean
}

interface Resource {
  id: string
  title: string
  type: string
  tutor: string
}

export default function StudentDashboard() {
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const sessionsSnap = await getDocs(collection(db, "upcomingSessions"))
      const assignmentsSnap = await getDocs(collection(db, "assignments"))
      const resourcesSnap = await getDocs(collection(db, "resources"))

      setUpcomingSessions(
        sessionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Session[]
      )
      setAssignments(
        assignmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Assignment[]
      )
      setResources(
        resourcesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Resource[]
      )
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">{session.subject}</h3>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        {session.tutor}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{session.date}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={assignment.completed}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                    readOnly
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${assignment.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {assignment.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{assignment.subject} • Due {assignment.due}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Shared Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="group p-4 bg-muted/30 rounded-lg border border-border/50 hover:shadow-card transition-all duration-200 hover:bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  {resource.type === "PDF" ? (
                    <FileText className="h-8 w-8 text-destructive" />
                  ) : (
                    <Play className="h-8 w-8 text-accent" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{resource.tutor}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {resource.type === "PDF" ? "Download" : "Watch"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
