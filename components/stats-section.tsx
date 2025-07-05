import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, GraduationCap, Heart, Briefcase } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      title: "Demografi",
      icon: Users,
      data: [
        { label: "Laki-laki", value: 1623, percentage: 50 },
        { label: "Perempuan", value: 1624, percentage: 50 },
        { label: "Usia Produktif", value: 2156, percentage: 66 },
        { label: "Anak-anak", value: 651, percentage: 20 },
      ],
    },
    {
      title: "Pendidikan",
      icon: GraduationCap,
      data: [
        { label: "SD/Sederajat", value: 1298, percentage: 40 },
        { label: "SMP/Sederajat", value: 974, percentage: 30 },
        { label: "SMA/Sederajat", value: 649, percentage: 20 },
        { label: "Perguruan Tinggi", value: 326, percentage: 10 },
      ],
    },
    {
      title: "Kesehatan",
      icon: Heart,
      data: [
        { label: "Posyandu Aktif", value: 8, percentage: 100 },
        { label: "Balita Sehat", value: 234, percentage: 95 },
        { label: "Lansia Sehat", value: 187, percentage: 85 },
        { label: "Keluarga Sehat", value: 756, percentage: 92 },
      ],
    },
    {
      title: "Ekonomi",
      icon: Briefcase,
      data: [
        { label: "Petani", value: 1298, percentage: 45 },
        { label: "Pedagang", value: 432, percentage: 15 },
        { label: "Buruh", value: 649, percentage: 25 },
        { label: "PNS/Swasta", value: 433, percentage: 15 },
      ],
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Data Kependudukan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Statistik terkini mengenai demografi, pendidikan, kesehatan, dan ekonomi masyarakat Desa Kaliwungu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stat.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value.toLocaleString()}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
