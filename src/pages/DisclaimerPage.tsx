
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Logo from '@/components/Logo';

const DisclaimerPage: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAgree = () => {
    if (agreed) {
      // In a real app, you would save this consent to user profile
      // For now, we'll just navigate to the app
      navigate('/app');
      toast({
        title: "Welcome to Muwakkil",
        description: "You have successfully agreed to the terms.",
      });
    } else {
      toast({
        title: "Agreement Required",
        description: "Please check the agreement box to continue.",
        variant: "destructive",
      });
    }
  };

  const handleDisagree = () => {
    // In a real app, you might redirect to a different page or show different content
    toast({
      title: "Agreement Required",
      description: "You must agree to the terms to use Muwakkil.",
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-4xl bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <Logo />
            <h1 className="text-3xl font-bold mt-6 mb-8">Disclaimer</h1>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[60vh]">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Can't Replace Legal Advice</h2>
              <p className="text-gray-700">
                The content generated by this AI platform constitutes general informational guidance only and does not constitute legal
                advice under UAE Federal Law No. 12 of 2021 (Legal Profession Regulation). Users must consult a UAE-licensed attorney for
                binding legal counsel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. No Attorney-Client Relationship</h2>
              <p className="text-gray-700">
                Use of this platform does not establish an attorney-client relationship. Such relationships are formed exclusively through
                written agreements with licensed UAE law firms[1][5].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Data Privacy Compliance</h2>
              <p className="text-gray-700">All user data is processed in accordance with:</p>
              <ul className="list-disc pl-8 mt-2 text-gray-700">
                <li>Federal Decree-Law No. 45 of 2021 (Personal Data Protection Law)</li>
                <li>DIFC Data Protection Law No. 5 of 2020 (for Dubai International Financial Center users)</li>
                <li>ADGM Data Protection Regulations 2021 (for Abu Dhabi Global Market users)</li>
              </ul>
              <p className="text-gray-700 mt-2">
                User consent is required for document analysis, and all files <span className="text-[#855ECB] font-medium">are deleted within 7 days</span> per UAE data residency
                requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
              <p className="text-gray-700">This platform excludes liability for:</p>
              <ul className="list-disc pl-8 mt-2 text-gray-700">
                <li>Errors in AI-generated content (§4, UAE Civil Transactions Law)</li>
                <li>Losses from reliance on automated guidance (Art. 317, UAE Penal Code)</li>
                <li>Third-party website content accessed through citations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Free Zone Compliance</h2>
              <p className="text-gray-700">Guidance for DMCC, DIFC, or ADGM jurisdictions adheres strictly to:</p>
              <ul className="list-disc pl-8 mt-2 text-gray-700">
                <li>DMCC Company Regulations 2022</li>
                <li>DIFC Companies Law 2018</li>
                <li>ADGM Commercial Licensing Rules</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Governing Law</h2>
              <p className="text-gray-700">
                All disputes fall under Dubai Courts jurisdiction per UAE Federal Law No. 11 of 1992 (Civil Procedures Law).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Updates & Amendments</h2>
              <p className="text-gray-700">Terms may change without notice to reflect updates to:</p>
              <ul className="list-disc pl-8 mt-2 text-gray-700">
                <li>UAE Commercial Companies Law (Federal Law No. 32/2021)</li>
                <li>Central Bank regulations on financial disclosures</li>
              </ul>
            </section>
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <Checkbox 
              id="terms" 
              checked={agreed} 
              onCheckedChange={() => setAgreed(!agreed)} 
            />
            <label 
              htmlFor="terms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleDisagree}
            >
              I don't agree
            </Button>
            <Button 
              onClick={handleAgree} 
              className={`flex-1 ${agreed ? 'bg-[#855ECB] hover:bg-[#7346b5]' : 'bg-gray-400 hover:bg-gray-500'}`}
              disabled={!agreed}
            >
              I Agree
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisclaimerPage;
