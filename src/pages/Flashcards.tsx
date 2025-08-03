import { useState, useEffect } from "react"
import { Plus, RotateCcw, Shuffle, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"

interface Flashcard {
  id: string
  question: string
  answer: string
}

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [mode, setMode] = useState<"create" | "review">("create")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  useEffect(() => {
    const fetchCards = async () => {
      const snapshot = await getDocs(collection(db, "flashcards"))
      const cardsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Flashcard, "id">),
      }))
      setCards(cardsData)
    }
    fetchCards()
  }, [])

  const addCard = async () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const docRef = await addDoc(collection(db, "flashcards"), {
        question: newQuestion,
        answer: newAnswer,
      })
      setCards([...cards, { id: docRef.id, question: newQuestion, answer: newAnswer }])
      setNewQuestion("")
      setNewAnswer("")
    }
  }

  const deleteCard = async (id: string) => {
    await deleteDoc(doc(db, "flashcards", id))
    setCards(cards.filter(card => card.id !== id))
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length)
    setIsFlipped(false)
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const currentCard = cards[currentCardIndex]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Flashcards</h1>
          <p className="text-muted-foreground">Create and review your study cards</p>
        </div>
        <div className="flex gap-2">
          <Button variant={mode === "create" ? "default" : "outline"} onClick={() => setMode("create")}>Create Mode</Button>
          <Button variant={mode === "review" ? "default" : "outline"} onClick={() => setMode("review")}>Review Mode</Button>
        </div>
      </div>

      {mode === "create" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Flashcard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  placeholder="Enter your question here..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  placeholder="Enter the answer here..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={addCard} className="w-full" variant="default">
                Add Card
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Cards ({cards.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cards.map((card) => (
                  <div key={card.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{card.question}</p>
                        <p className="text-muted-foreground text-xs mt-1">{card.answer}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCard(card.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                {cards.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No cards yet. Create your first flashcard!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {cards.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Card {currentCardIndex + 1} of {cards.length}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={shuffleCards} className="gap-2">
                    <Shuffle className="h-4 w-4" /> Shuffle
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setCurrentCardIndex(0)
                    setIsFlipped(false)
                  }} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
              <div className="perspective-1000">
                <Card className={`w-full h-64 shadow-elegant cursor-pointer transition-transform duration-600 preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`} onClick={flipCard}>
                  <CardContent className="h-full p-0 relative">
                    <div className={`absolute inset-0 p-6 flex items-center justify-center backface-hidden ${isFlipped ? "opacity-0" : "opacity-100"}`}>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Question</h3>
                        <p className="text-foreground">{currentCard?.question}</p>
                        <p className="text-sm text-muted-foreground mt-4">Click to reveal answer</p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 p-6 flex items-center justify-center backface-hidden rotate-y-180 bg-muted/20 ${isFlipped ? "opacity-100" : "opacity-0"}`}>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Answer</h3>
                        <p className="text-foreground">{currentCard?.answer}</p>
                        <p className="text-sm text-muted-foreground mt-4">Click to see question</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" onClick={prevCard} className="gap-2">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                <Button variant="default" onClick={flipCard}>
                  {isFlipped ? "Show Question" : "Show Answer"}
                </Button>
                <Button variant="outline" onClick={nextCard} className="gap-2">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <Card className="shadow-card">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No flashcards available. Switch to Create Mode to add some!</p>
                <Button variant="default" onClick={() => setMode("create")} className="mt-4">
                  Create Flashcards
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
