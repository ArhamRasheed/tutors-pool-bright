import React, { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FolderOpen,
  CreditCard,
  MessageCircle,
  Users,
  BookOpen,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const studentItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Sessions", url: "/sessions", icon: Calendar },
  { title: "Assignments", url: "/assignments", icon: FileText },
  { title: "Resources", url: "/resources", icon: FolderOpen },
  { title: "Flashcards", url: "/flashcards", icon: BookOpen },
  { title: "Chat", url: "/chat", icon: MessageCircle },
]

const tutorItems = [
  { title: "Dashboard", url: "/tutor-dashboard", icon: LayoutDashboard },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Students", url: "/students", icon: Users },
  { title: "Resources", url: "/tutor-resources", icon: FolderOpen },
  { title: "Earnings", url: "/earnings", icon: TrendingUp },
  { title: "Chat", url: "/chat", icon: MessageCircle },
]

export default function Sidebar({ userId }: { userId: string }) {
  const [userType, setUserType] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUserType(data?.role || "student") // fallback to student
        }
      } catch (error) {
        console.error("Error fetching user role:", error)
      }
    }

    fetchUserType()
  }, [userId])

  if (!userType) {
    return null // or a loader if preferred
  }

  const items = userType === "student" ? studentItems : tutorItems

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          TUTORSPOOL
        </h2>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          {userType} Dashboard
        </p>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.url

            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
