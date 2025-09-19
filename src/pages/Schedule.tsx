import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar } from "lucide-react";
import Footer from "@/components/Footer";

const Schedule = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Schedule</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive program featuring keynote speeches, panel discussions, workshops, and networking sessions
          </p>
        </div>

        {/* Conference Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-border/50 text-center">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Date</h3>
              <p className="text-muted-foreground">March 15-17, 2026</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-6">
              <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Venue</h3>
              <p className="text-muted-foreground">Abuja, Nigeria</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Duration</h3>
              <p className="text-muted-foreground">3 Days</p>
            </CardContent>
          </Card>
        </div>

        {/* Day-by-Day Schedule */}
        <div className="space-y-8">
          {/* Day 1 */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Badge variant="outline" className="text-lg px-3 py-1">Day 1</Badge>
                March 15, 2026 - Opening & High-Level Plenary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Opening Ceremony */}
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold mb-3">Opening Ceremony</h4>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• Welcome Remarks by National Coordinator, W2NP</p>
                    <div>
                      <p className="font-medium">Ministerial Addresses:</p>
                      <div className="ml-4 space-y-1">
                        <p>- Hon Minister, Federal Ministry of Innovation, Science And Technology</p>
                        <p>- Hon Minister, Federal Ministry of Innovation, Communication and Digital Technology</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Diplomatic Addresses:</p>
                      <div className="ml-4 space-y-1">
                        <p>- Country Director, UNDP</p>
                        <p>- Country Director</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-lg font-semibold mb-1">Special Presentation</h4>
                  <p className="text-muted-foreground">Global Perspectives on Africa's Innovation Trajectory by ECOWAS</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold mb-1">Keynote Address</h4>
                  <p className="text-muted-foreground">Africa's Readiness for the Global Tech Future by UNIDO</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-lg font-semibold mb-1">Science, Technology and Innovation as Drivers of Africa's Economic Transformation</h4>
                </div>

                {/* Sub-sector 1 */}
                <div className="border-l-4 border-primary pl-6 bg-muted/20 p-4 rounded-r-lg">
                  <div className="mb-2">
                    <Badge variant="secondary" className="mb-2">Sub-sector: Science & Research</Badge>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Plenary Topic: From Research to Market – Closing the Gap in Africa's Innovation Value Chain</h4>
                  <p className="text-muted-foreground">Session: ARCN, NIPRD, NARRICT, RMRDC</p>
                </div>

                {/* Sub-sector 2 */}
                <div className="border-l-4 border-accent pl-6 bg-muted/20 p-4 rounded-r-lg">
                  <div className="mb-2">
                    <Badge variant="secondary" className="mb-2">Sub-sector: Space Research, Telecomm, Digital Economy & AI</Badge>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Topic: Expanding Space tech, Telecom And Digital Infrastructure for Inclusive Growth</h4>
                  <p className="text-muted-foreground">Session: NITDA, NASDRA, NCC, NIGCOMSAT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day 2 */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Badge variant="outline" className="text-lg px-3 py-1">Day 2</Badge>
                March 16, 2026 - Sectoral Innovation Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sub-sector 1 */}
                <div className="border-l-4 border-primary pl-6 bg-muted/20 p-4 rounded-r-lg">
                  <div className="mb-2">
                    <Badge variant="secondary" className="mb-2">Sub-sector: Biotechnology And Safety</Badge>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Plenary: Biotechnology for Food Security, Health and Sustainability</h4>
                  <p className="text-muted-foreground">Composition: NABDA, NBMA, NAFDAC, NIMR</p>
                </div>

                {/* Sub-sector 2 */}
                <div className="border-l-4 border-accent pl-6 bg-muted/20 p-4 rounded-r-lg">
                  <div className="mb-2">
                    <Badge variant="secondary" className="mb-2">Sub-sector: Engineering & Manufacturing</Badge>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Keynotes: By NASENI, ECN</h4>
                  <h4 className="text-lg font-semibold mb-2">Topic: Energy, Infrastructure Tech Development, Smart Manufacturing for industrial Transformation In Africa</h4>
                  <p className="text-muted-foreground">Plenary: NASENI, UNIDO, ECN, MAN</p>
                </div>

                {/* Sub-sector 3 */}
                <div className="border-l-4 border-primary pl-6 bg-muted/20 p-4 rounded-r-lg">
                  <div className="mb-2">
                    <Badge variant="secondary" className="mb-2">Sub-sector: Solid Minerals & Natural Resources</Badge>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Topic: Value Chain Development: From Raw Materials to Finished Products</h4>
                  <p className="text-muted-foreground">Panel Session: RMRDC, SRMEA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day 3 */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Badge variant="outline" className="text-lg px-3 py-1">Day 3</Badge>
                March 17, 2026 - Agriculture & Policy Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">9:00 AM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Paper 1 - Agricultural Tech</h4>
                  <p className="text-muted-foreground">Topic: AgriTech and Precision Farming for Sustainable Agriculture</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">9:45 AM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Paper 2: Agro-Processing</h4>
                  <p className="text-muted-foreground">Topic: Agro-processing, Value Addition and Global Trade</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold mb-1">Tea Break</h4>
                </div>

                <div className="border-l-4 border-accent pl-6 bg-muted/20 p-4 rounded-r-lg">
                  <h4 className="text-xl font-semibold mb-3">Closing & Policy Engagement</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">Plenary Session</h5>
                      <p className="text-muted-foreground mb-2">Topic: Policy, Investment and Capacity Building for Africa's STI Transformation</p>
                      
                      <div className="ml-4 space-y-2">
                        <p className="text-sm"><strong>Keynotes:</strong></p>
                        <div className="ml-4 space-y-1 text-sm">
                          <p>• Policy by Federal Ministry of Innovation, Science and Technology</p>
                          <p>• Investment by Federal Ministry of Industry, Trade and Investment</p>
                          <p>• Capacity Building by Federal Ministry of Education</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">High-Level Panel: Government, Academia, Industry and Development Partners</h5>
                      <p className="text-muted-foreground text-sm">Composition: FMITI, FMIST, FME, NUC, MAN, NASENI, UNIDO</p>
                      <p className="text-muted-foreground text-sm">Moderator: ECOWAS</p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-1">Launch of Conference Declaration/Communiqué</h5>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">8:00 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Closing Ceremony/Award</h4>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-lg font-semibold mb-1">Closing Keynote: Innovating Africa's Future Together</h4>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-lg font-semibold mb-1">Vote of Thanks & Networking Reception</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <Card className="border-border/50 bg-muted/30">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      All conference sessions and workshops
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Conference materials and proceedings
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Welcome reception and networking dinner
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Coffee breaks and refreshments
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Note:</h4>
                  <p className="text-muted-foreground">
                    The schedule is subject to change. Registered participants will be notified of any updates. 
                    Please check your email regularly for the latest information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Schedule;