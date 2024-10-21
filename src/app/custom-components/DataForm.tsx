import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DataFormProps {
  onClose: () => void;
}

export default function DataForm({ onClose }: DataFormProps) {
  const [formData, setFormData] = useState({
    serialNumber: "",
    name: "",
    address: "",
    dob: "",
    occupation: "",
    sonName: "",
    daughterName: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    grandmotherName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white pb-4 mb-4 border-b">
          <h2 className="text-2xl font-bold">डाटा फारम</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="serialNumber">क्र.सं</Label>
            <Input
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">नाम</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">थेगान</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="dob">जन्ममिति (वि सं)</Label>
            <Input
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="occupation">पेशा</Label>
            <Input
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="sonName">छोराको नाम</Label>
            <Input
              id="sonName"
              name="sonName"
              value={formData.sonName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="daughterName">छोरीको नाम</Label>
            <Input
              id="daughterName"
              name="daughterName"
              value={formData.daughterName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="fatherName">बाबुको नाम</Label>
            <Input
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="motherName">आमाको नाम</Label>
            <Input
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="grandfatherName">हजुरबुवा</Label>
            <Input
              id="grandfatherName"
              name="grandfatherName"
              value={formData.grandfatherName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="grandmotherName">हजुरआमा</Label>
            <Input
              id="grandmotherName"
              name="grandmotherName"
              value={formData.grandmotherName}
              onChange={handleChange}
            />
          </div>
          <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              रद्द गर्नुहोस्
            </Button>
            <Button type="submit">पेश गर्नुहोस्</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
