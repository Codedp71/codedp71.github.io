import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Legal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            Legal Information
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Important legal documents and policies governing your use of our services.
          </p>
        </div>
      </section>

      {/* Legal Documents */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="mt-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    Terms of Service
                  </CardTitle>
                  <p className="text-slate-600">Last updated: January 2024</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6 text-slate-700">
                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">1. Acceptance of Terms</h3>
                      <p className="leading-relaxed">
                        By accessing and using Aerospace Academy's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">2. Course Enrollment and Payment</h3>
                      <div className="space-y-2">
                        <p className="leading-relaxed">
                          Course fees must be paid in full before course commencement unless otherwise agreed in writing. Refund policies apply as per our refund terms outlined in your enrollment agreement.
                        </p>
                        <p className="leading-relaxed">
                          Students are responsible for maintaining regular attendance and completing all required coursework within the specified timeframe.
                        </p>
                      </div>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">3. Intellectual Property</h3>
                      <p className="leading-relaxed">
                        All course materials, including but not limited to lectures, presentations, software, and documentation, are the intellectual property of Aerospace Academy and are protected by copyright laws.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">4. Code of Conduct</h3>
                      <p className="leading-relaxed">
                        Students and participants are expected to maintain professional behavior and respect for fellow students, instructors, and staff. Violation of our code of conduct may result in immediate termination from courses.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">5. Limitation of Liability</h3>
                      <p className="leading-relaxed">
                        Aerospace Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    Privacy Policy
                  </CardTitle>
                  <p className="text-slate-600">Last updated: January 2024</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6 text-slate-700">
                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Information We Collect</h3>
                      <div className="space-y-2">
                        <p className="leading-relaxed">
                          We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Personal identification information (Name, email, phone number)</li>
                          <li>Educational background and professional experience</li>
                          <li>Payment information (processed securely through third-party providers)</li>
                          <li>Course progress and assessment data</li>
                        </ul>
                      </div>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">How We Use Your Information</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>To provide and maintain our educational services</li>
                        <li>To process payments and send transaction notifications</li>
                        <li>To communicate with you about courses and services</li>
                        <li>To improve our services and develop new features</li>
                        <li>To comply with legal obligations</li>
                      </ul>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Information Sharing</h3>
                      <p className="leading-relaxed">
                        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Data Security</h3>
                      <p className="leading-relaxed">
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Your Rights</h3>
                      <p className="leading-relaxed">
                        You have the right to access, update, or delete your personal information. Contact us to exercise these rights or if you have any questions about our privacy practices.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disclaimer" className="mt-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    Disclaimer
                  </CardTitle>
                  <p className="text-slate-600">Last updated: January 2024</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6 text-slate-700">
                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Educational Purpose</h3>
                      <p className="leading-relaxed">
                        The information and courses provided by Aerospace Academy are for educational purposes only. While we strive for accuracy and current information, the aerospace industry is rapidly evolving, and regulations may change.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Professional Advice</h3>
                      <p className="leading-relaxed">
                        Our courses and consultancy services do not constitute professional engineering advice. Students and clients should seek appropriate professional consultation for specific projects and regulatory compliance.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Certification and Accreditation</h3>
                      <p className="leading-relaxed">
                        Course completion certificates are issued by Aerospace Academy and indicate successful completion of our training programs. These certificates do not constitute official government or industry licenses unless specifically stated.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Regulatory Compliance</h3>
                      <p className="leading-relaxed">
                        Students and clients are responsible for ensuring compliance with local and international regulations relevant to their specific use cases and jurisdictions.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Third-Party Content</h3>
                      <p className="leading-relaxed">
                        Our courses may reference third-party tools, software, or methodologies. Aerospace Academy is not responsible for the availability, accuracy, or performance of third-party services.
                      </p>
                    </section>

                    <Separator />

                    <section>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Contact Information</h3>
                      <p className="leading-relaxed">
                        If you have any questions about these legal terms, please contact us at legal@aerospaceacademy.com or through our contact page.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}