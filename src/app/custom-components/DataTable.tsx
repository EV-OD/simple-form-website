"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FamilyMember {
  id: string;
  serialNumber: string;
  name: string;
  address: string;
  dob: string;
  occupation: string;
  sonName: string;
  daughterName: string;
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  grandmotherName: string;
}

export default function DataTable() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "familyMembersData"),
          orderBy("serialNumber", "asc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FamilyMember[];
        setFamilyMembers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching documents: ", err);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
