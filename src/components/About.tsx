import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, Globe, TrendingUp, Award } from "lucide-react";

const About = () => {
  const objectives = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global STI Landscape",
      description: "Examine Africa's current position in the global STI landscape and identify opportunities for growth."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Stakeholder Dialogue",
      description: "Facilitate dialogue between governments, academia, private sector, and international partners on innovative solutions."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation Showcase",
      description: "Showcase groundbreaking African innovations, start-ups, and research addressing development challenges."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Investment Partnerships",
      description: "Strengthen partnerships for investment in research, infrastructure, and skills development."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Youth Empowerment",
      description: "Provide a platform for youth, women, and emerging innovators to network and connect with global markets."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Policy Framework",
      description: "Develop actionable policy recommendations for integrating STI into Africa's economic transformation agenda."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">About STIConf 2026</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Science, Technology and Innovation (STI) are the backbone of sustainable socio-economic growth in the 21st century. 
            The International Conference on Science, Technology and Innovation (STICONF) 2026 seeks to provide a high-level platform 
            for policy makers, researchers, innovators, industry leaders, development partners, and youth innovators to chart Africa's 
            path to global competitiveness.
          </p>
        </div>

        {/* Conference Theme */}
        <div className="bg-gradient-primary text-white rounded-lg p-8 mb-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Conference Theme</h3>
          <p className="text-xl">
            "Bridging the Tech Divide – Africa's Path to Global Competitiveness in Science, Technology and Innovation"
          </p>
        </div>

        {/* Objectives */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Conference Objectives</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{objective.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-primary">{objective.title}</h4>
                <p className="text-muted-foreground">{objective.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Conference Goals */}
        <div className="bg-muted rounded-lg p-8">
          <h3 className="text-3xl font-bold text-center text-primary mb-8">Conference Goals</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-primary mb-3">Bridge the Technology Divide</h4>
              <p className="text-muted-foreground mb-6">
                Reduce gaps in access, infrastructure, and capacity to advance STI across Africa.
              </p>
              
              <h4 className="text-xl font-semibold text-primary mb-3">Strengthen Policy and Institutions</h4>
              <p className="text-muted-foreground">
                Influence policy frameworks and institutional reforms that promote innovation-driven economies.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-primary mb-3">Promote Knowledge Transfer</h4>
              <p className="text-muted-foreground mb-6">
                Encourage partnerships that enhance research collaboration, digital skills, and entrepreneurship.
              </p>
              
              <h4 className="text-xl font-semibold text-primary mb-3">Accelerate Global Competitiveness</h4>
              <p className="text-muted-foreground">
                Position African countries as active contributors and competitors in the global STI arena.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;