'use client'

import { useEffect, useState } from "react"
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface FamilyMember {
  id: string
  serialNumber: string
  name: string
  address: string
  dob: string
  occupation: string
  sonName: string
  daughterName: string
  fatherName: string
  motherName: string
  grandfatherName: string
  grandmotherName: string
}

export default function DataTable() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const q = query(
      collection(db, "familyMembersData"),
      orderBy("serialNumber", "asc")
    )

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FamilyMember[]
        setFamilyMembers(data)
        setLoading(false)
      },
      (err) => {
        console.error("Error fetching documents: ", err)
        setError("Error fetching data. Please try again later.")
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "familyMembersData", id))
      toast({
        title: "Member deleted",
        description: "The family member has been successfully deleted.",
      })
    } catch (err) {
      console.error("Error deleting document: ", err)
      toast({
        title: "Error",
        description: "Failed to delete the family member. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdate = (member: FamilyMember) => {
    setEditingMember(member)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingMember) return

    try {
      await updateDoc(doc(db, "familyMembersData", editingMember.id), { ...editingMember })

      setIsEditModalOpen(false)
      toast({
        title: "Member updated",
        description: "The family member has been successfully updated.",
      })
    } catch (err) {
      console.error("Error updating document: ", err)
      toast({
        title: "Error",
        description: "Failed to update the family member. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>क्र.सं</TableHead>
            <TableHead>नाम</TableHead>
            <TableHead>थेगान</TableHead>
            <TableHead>जन्ममिति (वि सं)</TableHead>
            <TableHead>पेशा</TableHead>
            <TableHead>छोराको नाम</TableHead>
            <TableHead>छोरीको नाम</TableHead>
            <TableHead>बाबुको नाम</TableHead>
            <TableHead>आमाको नाम</TableHead>
            <TableHead>हजुरबुवा</TableHead>
            <TableHead>हजुरआमा</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {familyMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.serialNumber}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.address}</TableCell>
              <TableCell>{member.dob}</TableCell>
              <TableCell>{member.occupation}</TableCell>
              <TableCell>{member.sonName}</TableCell>
              <TableCell>{member.daughterName}</TableCell>
              <TableCell>{member.fatherName}</TableCell>
              <TableCell>{member.motherName}</TableCell>
              <TableCell>{member.grandfatherName}</TableCell>
              <TableCell>{member.grandmotherName}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdate(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingMember && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Family Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                {/** Form fields for editing each property **/}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="serialNumber" className="text-right">
                    Serial Number
                  </Label>
                  <Input
                    id="serialNumber"
                    value={editingMember.serialNumber}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        serialNumber: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                  नाम
                  </Label>
                  <Input
                    id="name"
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                  थेगान
                  </Label>
                  <Input
                    id="address"
                    value={editingMember.address}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        address: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dob" className="text-right">
                  जन्ममिति (वि सं)
                  </Label>
                  <Input
                    id="dob"
                    value={editingMember.dob}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        dob: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="occupation" className="text-right">
                  पेशा
                  </Label>
                  <Input
                    id="occupation"
                    value={editingMember.occupation}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        occupation: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sonName" className="text-right">
                  छोराको नाम
                  </Label>
                  <Input
                    id="sonName"
                    value={editingMember.sonName}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        sonName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="daughterName" className="text-right">
                  छोरीको नाम
                  </Label>
                  <Input
                    id="daughterName"
                    value={editingMember.daughterName}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        daughterName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fatherName" className="text-right">
                  बाबुको नाम
                  </Label>
                  <Input
                    id="fatherName"
                    value={editingMember.fatherName}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        fatherName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="motherName" className="text-right">
                  आमाको नाम
                  </Label>
                  <Input
                    id="motherName"
                    value={editingMember.motherName}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        motherName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grandfatherName" className="text-right">
                  हजुरबुवा
                  </Label>
                  <Input
                    id="grandfatherName"
                    value={editingMember.grandfatherName}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        grandfatherName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grandmotherName" className="text-right">
                  हजुरआमा
                  </Label>
                  <Input
                    id="grandmotherName"
                    value={editingMember.grandmotherName}
                    onChange={(e) =>
                      setEditingMember((prev) => ({
                        ...prev!,
                        grandmotherName: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
