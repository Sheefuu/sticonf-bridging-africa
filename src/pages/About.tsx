import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Trophy, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About STIConf 2025</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A high-level platform for shaping Africa's path to global competitiveness in Science, Technology and Innovation
          </p>
        </div>

        {/* About the Conference */}
        <section className="mb-16">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">About the Conference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Science, Technology and Innovation (STI) are the backbone of sustainable socio-economic growth in the 21st century. 
                Nations that have successfully harnessed STI are leaders in productivity, knowledge creation, digital transformation, 
                and global trade competitiveness. Africa, however, continues to face a significant technology divide manifested in 
                limited research infrastructure, inadequate innovation ecosystems, weak industry-academia collaboration, and challenges 
                in digital inclusion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The International Conference on Science, Technology and Innovation (STICONF) 2025 seeks to provide a high-level 
                platform for policy makers, researchers, innovators, industry leaders, development partners, and youth innovators 
                to chart Africa's path to global competitiveness. The conference will focus on bridging the technology divide through 
                collaboration, knowledge exchange, investment in research, and scalable innovation ecosystems that position Africa as 
                a global player in STI.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Aims and Objectives */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Aims & Objectives</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Overall Aim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To advance Africa's global competitiveness through Science, Technology and Innovation by fostering 
                  collaboration, building capacity, and shaping inclusive policies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Key Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Artificial intelligence, biotechnology, renewable energy, space science, data-driven governance, 
                  and industrial innovation.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Specific Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Examine Africa's current position in the global STI landscape and identify opportunities for growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Facilitate dialogue between governments, academia, private sector, civil society, and international partners</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Showcase groundbreaking African innovations, start-ups, and research addressing development challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strengthen partnerships for investment in research, infrastructure, and skills development</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide a platform for youth, women, and emerging innovators to network and connect with global markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Develop actionable policy recommendations for integrating STI into Africa's economic transformation agenda</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Conference Goals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Conference Goals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Bridge the Technology Divide</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce gaps in access, infrastructure, and capacity to advance STI across Africa
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Strengthen Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Influence policy frameworks and institutional reforms for innovation-driven economies
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Knowledge Transfer</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance research collaboration, digital skills, and entrepreneurship
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Global Competitiveness</h3>
                <p className="text-sm text-muted-foreground">
                  Position African countries as active contributors in the global STI arena
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Target Audience */}
        <section className="mb-16">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Target Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Government policymakers and regulatory bodies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Industry leaders and entrepreneurs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Scientists, researchers, and academics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Technology developers and innovators
                  </li>
                </ul>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Investors and venture capitalists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Industrialists and manufacturing representatives
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Students and young innovators
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Expected Outcomes */}
        <section>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Expected Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Increased collaboration between researchers, policymakers, and industrial leaders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Policy recommendations for leveraging science and technology in industrial growth</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>New investment opportunities in tech-driven industrial sectors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Showcasing of cutting-edge innovations in industrial technology</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Capacity building opportunities including training and mentorship</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Publication of conference proceedings and research findings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Roadmap for Africa's Global Competitiveness in STI (2025–2035)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Networking opportunities for stakeholders to build partnerships</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;