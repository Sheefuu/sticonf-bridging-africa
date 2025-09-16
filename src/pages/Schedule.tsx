import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Calendar } from "lucide-react";

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
                March 15, 2026 - Opening & Keynotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Registration & Welcome Reception</h4>
                  <p className="text-muted-foreground">Registration desk opens, welcome coffee, and networking</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Opening Ceremony</h4>
                  <p className="text-muted-foreground">Welcome addresses, conference overview, and official opening</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">12:00 PM - 1:30 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Keynote: "Africa's Digital Transformation"</h4>
                  <p className="text-muted-foreground">Exploring opportunities and challenges in Africa's digital journey</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2:30 PM - 4:00 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Panel: "Policy Frameworks for Innovation"</h4>
                  <p className="text-muted-foreground">Government representatives discuss policy initiatives</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">4:30 PM - 6:00 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Innovation Showcase</h4>
                  <p className="text-muted-foreground">African startups and innovations presentation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day 2 */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Badge variant="outline" className="text-lg px-3 py-1">Day 2</Badge>
                March 16, 2026 - Technology & Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Keynote: "AI and Machine Learning in Africa"</h4>
                  <p className="text-muted-foreground">Exploring artificial intelligence applications across African industries</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">11:00 AM - 12:30 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Workshop: "Biotechnology & Healthcare Innovation"</h4>
                  <p className="text-muted-foreground">Interactive session on biotech solutions for African healthcare</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Panel: "Renewable Energy & Sustainability"</h4>
                  <p className="text-muted-foreground">Sustainable energy solutions for Africa's future</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">4:00 PM - 5:30 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Youth Innovation Pitch Session</h4>
                  <p className="text-muted-foreground">Young innovators present their solutions</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Networking Dinner</h4>
                  <p className="text-muted-foreground">Evening networking event with industry leaders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day 3 */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Badge variant="outline" className="text-lg px-3 py-1">Day 3</Badge>
                March 17, 2026 - Collaboration & Future
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Keynote: "Global Partnerships for African Innovation"</h4>
                  <p className="text-muted-foreground">Building international collaborations for technological advancement</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">11:00 AM - 12:30 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Panel: "Investment & Funding Opportunities"</h4>
                  <p className="text-muted-foreground">Venture capitalists and investors discuss funding landscape</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Workshop: "Building Innovation Ecosystems"</h4>
                  <p className="text-muted-foreground">Practical strategies for creating supportive innovation environments</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">4:00 PM - 5:00 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Conference Recommendations</h4>
                  <p className="text-muted-foreground">Presentation of policy recommendations and action plans</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">5:00 PM - 6:00 PM</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Closing Ceremony</h4>
                  <p className="text-muted-foreground">Closing remarks, awards, and future outlook</p>
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
    </div>
  );
};

export default Schedule;